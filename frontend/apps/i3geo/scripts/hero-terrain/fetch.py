import math, urllib.request, io, numpy as np, sys
from PIL import Image
def tile(lat,lon,z):
    n=2**z; x=(lon+180)/360*n; y=(1-math.asinh(math.tan(math.radians(lat)))/math.pi)/2*n; return x,y
def fetch(name,lat,lon,z=13,k=2):
    x,y=tile(lat,lon,z); x0,y0=int(x-k/2+0.5),int(y-k/2+0.5)
    im=np.zeros((256*k,256*k,3),np.uint8)
    for dx in range(k):
        for dy in range(k):
            u=f"https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x0+dx}/{y0+dy}.png"
            im[dy*256:(dy+1)*256,dx*256:(dx+1)*256]=np.array(Image.open(io.BytesIO(urllib.request.urlopen(u).read())).convert("RGB"))
    h=im[...,0]*256.0+im[...,1]+im[...,2]/256-32768
    np.save(f"{name}.npy",h); np.save(f"{name}.meta.npy",np.array([z,x0,y0,k]))
    print(name,"min",h.min().round(),"max",h.max().round())
if __name__=="__main__":
    for c in [("bocaina3",-22.76,-44.63)]:
        fetch(*c, 13, 4)
