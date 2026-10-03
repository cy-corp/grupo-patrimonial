import numpy as np, heapq
from scipy.ndimage import gaussian_filter
h=gaussian_filter(np.load("bocaina3.npy"),1.5)
H,W=h.shape
# priority flood fill
filled=h.copy(); closed=np.zeros_like(h,bool); pq=[]
for y in range(H):
    for x in range(W):
        if y in (0,H-1) or x in (0,W-1):
            heapq.heappush(pq,(h[y,x],y,x)); closed[y,x]=True
nb=[(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]
while pq:
    z,y,x=heapq.heappop(pq)
    for dy,dx in nb:
        ny,nx=y+dy,x+dx
        if 0<=ny<H and 0<=nx<W and not closed[ny,nx]:
            closed[ny,nx]=True; filled[ny,nx]=max(filled[ny,nx],z+1e-3); heapq.heappush(pq,(filled[ny,nx],ny,nx))
# D8 receivers
rec=-np.ones((H,W),int)
pad=np.pad(filled,1,constant_values=-1e9)
best=np.zeros((H,W)); bi=-np.ones((H,W),int)
for i,(dy,dx) in enumerate(nb):
    d=(filled-pad[1+dy:1+dy+H,1+dx:1+dx+W])/np.hypot(dy,dx)
    m=d>best; best[m]=d[m]; bi[m]=i
acc=np.ones(H*W); order=np.argsort(-filled,axis=None)
for idx in order:
    i=bi.flat[idx]
    if i<0: continue
    y,x=divmod(idx,W); dy,dx=nb[i]; ny,nx=y+dy,x+dx
    if 0<=ny<H and 0<=nx<W: acc[ny*W+nx]+=acc[idx]
acc=acc.reshape(H,W)
np.save("filled.npy",filled); np.save("acc.npy",acc); np.save("bi.npy",bi)
print(acc.max())
