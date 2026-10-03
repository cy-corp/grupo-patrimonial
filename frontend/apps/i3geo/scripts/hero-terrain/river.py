import numpy as np
acc=np.load("acc.npy"); bi=np.load("bi.npy"); H,W=acc.shape
nb=[(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
def trace(y,x,minacc):
    down=[(y,x)]; yy,xx=y,x
    while True:
        i=bi[yy,xx]
        if i<0: break
        yy,xx=yy+nb[i][0],xx+nb[i][1]
        if not(0<=yy<H and 0<=xx<W): break
        down.append((yy,xx))
    up=[]; yy,xx=y,x
    while True:
        best=None
        for k,(dy,dx) in enumerate(nb):
            ny,nx=yy-dy,xx-dx
            if 0<=ny<H and 0<=nx<W and bi[ny,nx]==k and (best is None or acc[ny,nx]>acc[best]): best=(ny,nx)
        if best is None or acc[best]<minacc: break
        yy,xx=best; up.append(best)
    return up[::-1]+down
row=acc[580,600:760]; x=600+int(row.argmax()); print("main river at y580 x",x,int(row.max()))
p=trace(580,x,1500); np.save("river.npy",np.array(p)); print(len(p),p[0],p[-1])
for q in p:
    if 520<=q[0]<=660 and len(p)%1==0: pass
print([ (int(a),int(b)) for a,b in p if 500<=a<=680][::4])
