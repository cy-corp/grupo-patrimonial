import numpy as np, math, json
from PIL import Image
from scipy.ndimage import gaussian_filter
import contourpy
raw=np.load("bocaina3.npy"); acc=np.load("acc.npy"); bi=np.load("bi.npy")
z,tx0,ty0,k=np.load("bocaina3.meta.npy")
CX,CY,CW,CH=256,224,768,512
hs=gaussian_filter(raw,1.2)
h=hs[CY:CY+CH,CX:CX+CW]
hmin,hmax=float(np.floor(h.min())),float(np.ceil(h.max()))
# quantize to 0.25 m
q=np.round((h-hmin)*4).astype(np.uint32); assert q.max()<65536
img=np.zeros((CH,CW,3),np.uint8); img[...,0]=q>>8; img[...,1]=q&255
Image.fromarray(img).save("terrain.png",optimize=True)
def latlon(gx,gy):
    n=256*2**int(z); X=tx0*256+gx; Y=ty0*256+gy
    lon=X/n*360-180; lat=math.degrees(math.atan(math.sinh(math.pi*(1-2*Y/n)))); return lat,lon
def utm(lat,lon,zone=23):
    a=6378137.0; f=1/298.257222101; e2=f*(2-f); k0=0.9996
    lon0=math.radians(-183+6*zone); phi=math.radians(lat); lam=math.radians(lon)
    N=a/math.sqrt(1-e2*math.sin(phi)**2); T=math.tan(phi)**2; ep2=e2/(1-e2); C=ep2*math.cos(phi)**2; A=math.cos(phi)*(lam-lon0)
    M=a*((1-e2/4-3*e2**2/64-5*e2**3/256)*phi-(3*e2/8+3*e2**2/32+45*e2**3/1024)*math.sin(2*phi)+(15*e2**2/256+45*e2**3/1024)*math.sin(4*phi)-(35*e2**3/3072)*math.sin(6*phi))
    E=500000+k0*N*(A+(1-T+C)*A**3/6+(5-18*T+T*T+72*C-58*ep2)*A**5/120)
    Nn=k0*(M+N*math.tan(phi)*(A*A/2+(5-T+9*C+4*C*C)*A**4/24+(61-58*T+T*T+600*C-330*ep2)*A**6/720))
    return E,Nn+10000000
lat_c,_=latlon(CX+CW/2,CY+CH/2)
mpp=156543.03392*math.cos(math.radians(lat_c))/2**int(z)
def hz(gx,gy):
    x=min(max(gx-CX,0),CW-1.001); y=min(max(gy-CY,0),CH-1.001); x0,y0=int(x),int(y); fx,fy=x-x0,y-y0
    return float(h[y0,x0]*(1-fx)*(1-fy)+h[y0,x0+1]*fx*(1-fy)+h[y0+1,x0]*(1-fx)*fy+h[y0+1,x0+1]*fx*fy)
# rivers: network cells with acc>T traced as polylines from heads
nb=[(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
T=2500
H,W=acc.shape
chan=acc>=T
donors=np.zeros((H,W),int)
for y in range(H):
    for x in range(W):
        if chan[y,x]:
            i=bi[y,x]
            if i>=0:
                ny,nx=y+nb[i][0],x+nb[i][1]
                if 0<=ny<H and 0<=nx<W and chan[ny,nx]: donors[ny,nx]+=1
heads=[(y,x) for y in range(H) for x in range(W) if chan[y,x] and donors[y,x]==0]
seen=np.zeros((H,W),bool); lines=[]
heads.sort(key=lambda p:-acc[p])
for (y,x) in sorted(heads,key=lambda p:acc[p]):
    pass
# trace each head downstream until hitting seen cell (include it) — process biggest first so main stems are long
order=sorted(heads,key=lambda p:-acc[p])
def downstream(y,x):
    path=[(y,x)]
    while True:
        i=bi[y,x]
        if i<0: return path,False
        y,x=y+nb[i][0],x+nb[i][1]
        if not(0<=y<H and 0<=x<W): return path,False
        path.append((y,x))
        if seen[y,x]: return path,True
# sort heads by length of path to outlet desc approximated by acc at end: simpler: trace main river first
main=[tuple(p) for p in np.load("river.npy")]
for p in main: seen[p]=True
lines.append(main)
for (y,x) in order:
    if seen[y,x]: continue
    p,_=downstream(y,x)
    for q in p: seen[q]=True
    lines.append(p)
def smooth(pts,it=3):
    a=np.array(pts,float)
    for _ in range(it):
        if len(a)<3: break
        b=a.copy(); b[1:-1]=(a[:-2]+2*a[1:-1]+a[2:])/4; a=b
    return a
def to_crop(a):  # a in (y,x) global -> list of [x,y,h] crop
    out=[]
    for y,x in a:
        cx,cy=x-CX+0.5,y-CY+0.5
        out.append([round(cx,1),round(cy,1),round(hz(x+0.5,y+0.5),1)])
    return out
def clip(poly):
    segs=[];cur=[]
    for p in poly:
        if 0<=p[0]<=CW and 0<=p[1]<=CH: cur.append(p)
        else:
            if len(cur)>2: segs.append(cur)
            cur=[]
    if len(cur)>2: segs.append(cur)
    return segs
rivers=[]
for i,l in enumerate(lines):
    if len(l)<6: continue
    sm=smooth(l,4); s=np.vstack([sm[:-1:2],sm[-1:]])
    a=np.array(l,float); seg=np.diff(a,axis=0); ln=np.hypot(*seg.T).sum(); ch=np.hypot(*(a[-1]-a[0]))
    from collections import Counter
    mode=Counter(map(tuple,np.sign(seg).astype(int).tolist())).most_common(1)[0][1]/len(seg)
    if i>0 and mode>0.6 and ln>25: continue
    for seg in clip(to_crop(s)):
        rivers.append({"main":i==0,"points":seg,"acc":int(acc[l[0]])})
# parcel (global px). east side follows main river
fence=[(733,534),(682,522),(662,566),(672,622),(714,654),(772,652)]
mi=[i for i,(y,x) in enumerate(main)]
def nearest_main(px,py):
    d=[(x-px)**2+(y-py)**2 for y,x in main]; return int(np.argmin(d))
a_i=nearest_main(*fence[0]); b_i=nearest_main(*fence[-1])
fence[0]=(main[a_i][1],main[a_i][0]); fence[-1]=(main[b_i][1],main[b_i][0])
river_edge=smooth(main[a_i:b_i+1],4)
river_edge=[(x,y) for y,x in river_edge[::3]]
poly=fence+river_edge[::-1][1:-1]
def area(pts):
    s=0
    for i in range(len(pts)):
        x1,y1=pts[i];x2,y2=pts[(i+1)%len(pts)]; s+=x1*y2-x2*y1
    return abs(s)/2
A=area(poly)*mpp*mpp/1e4
rl=[(684,526),(706,532),(712,566),(694,592),(668,598),(663,566)]
RL=area(rl)*mpp*mpp/1e4
verts=[]
for i,(x,y) in enumerate(fence):
    lat,lon=latlon(x+0.5,y+0.5); E,N=utm(lat,lon)
    verts.append({"id":f"V-{i+1:02d}","x":round(x-CX+0.5,1),"y":round(y-CY+0.5,1),"h":round(hz(x+0.5,y+0.5),1),"e":round(E,2),"n":round(N,2)})
# APP area within parcel: rasterize
from matplotlib.path import Path
pp=Path(poly); yy,xx=np.mgrid[440:720,600:820]; inside=pp.contains_points(np.c_[xx.ravel()+0.5,yy.ravel()+0.5]).reshape(xx.shape)
rv=np.array([(x,y) for y,x in main],float)
from scipy.spatial import cKDTree
d,_=cKDTree(rv).query(np.c_[xx.ravel(),yy.ravel()]); d=d.reshape(xx.shape)*mpp
APP=(inside&(d<=30)).sum()*mpp*mpp/1e4
cp=lambda pts:[[round(x-CX+0.5,1),round(y-CY+0.5,1)] for x,y in pts]
data={"width":CW,"height":CH,"metersPerPixel":round(mpp,3),"hMin":hmin,"hMax":hmax,
 "datum":"SIRGAS 2000 / UTM 23S","rivers":rivers,"parcel":{"vertices":verts,"polygon":cp(poly),"riverEdge":cp(river_edge),"areaHa":round(A,2)},
 "reserve":{"polygon":cp(rl),"areaHa":round(RL,2)},"app":{"widthM":30,"areaHa":round(APP,2)}}
json.dump(data,open("terrain.json","w"))
print("mpp",mpp,"h",hmin,hmax,"parcel ha",A,"RL ha",RL,RL/A,"APP ha",APP,"rivers",len(rivers),"verts",len(poly))
for v in verts: print(v)
# contour svg
gen=contourpy.contour_generator(z=h,line_type="Separate")
paths=[];
def simplify(l,tol=0.5):
    # RDP
    if len(l)<3: return l
    def rdp(pts):
        a,b=pts[0],pts[-1]; ab=b-a; n=np.hypot(*ab)
        if n==0: d=np.hypot(*(pts-a).T)
        else: d=np.abs(ab[0]*(pts[:,1]-a[1])-ab[1]*(pts[:,0]-a[0]))/n
        i=int(np.argmax(d))
        if d[i]>tol: return np.vstack([rdp(pts[:i+1])[:-1],rdp(pts[i:])])
        return np.vstack([a,b])
    return rdp(np.asarray(l))
minor=[];major=[]
for lv in np.arange(np.ceil(hmin/20)*20,hmax,20):
    for l in gen.lines(lv):
        if len(l)<4: continue
        s=simplify(l,0.45)
        d="M"+"L".join(f"{x:.1f} {y:.1f}" for x,y in s)
        (major if lv%100==0 else minor).append(d)
svg=(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {CW} {CH}" preserveAspectRatio="xMidYMid slice" fill="none" stroke-linejoin="round">'
 f'<path stroke="#005C74" stroke-opacity="0.38" stroke-width="0.6" vector-effect="non-scaling-stroke" d="{"".join(minor)}"/>'
 f'<path stroke="#005C74" stroke-opacity="0.75" stroke-width="1.1" vector-effect="non-scaling-stroke" d="{"".join(major)}"/></svg>')
open("contours.svg","w").write(svg); print("svg bytes",len(svg))
