"""
Gera frontend/src/lib/rendal/content/materias-shapes.ts.

Uso: python frontend/scripts/gen-materias-shapes.py <logo-bruta-transparente.png> [saida.ts]

Entrada: o MESMO render 2172x724, mas com canal alfa (a versão sobre preto não serve:
é o alfa que separa o EPS e as fendas de baixo). Requer: pillow numpy scipy scikit-image opencv-python.

Terra = alfa + duas retas (as fendas do render). Concreto, Aço e EPS = watershed no alfa.
Se o render mudar, reveja SEAM_* e SEEDS.
"""
import sys
import numpy as np, cv2
from PIL import Image
from scipy import ndimage as ndi
from skimage.segmentation import watershed
from skimage.filters import sobel

src = sys.argv[1]
dst = sys.argv[2] if len(sys.argv) > 2 else "materias-shapes.ts"

a = np.array(Image.open(src).convert("RGBA"))
al = a[..., 3].astype(float)
H, W = al.shape
assert (W, H) == (2172, 724), f"esperava 2172x724, veio {W}x{H}"

# região do símbolo (exclui o wordmark, que começa perto de y=72%)
M = al > 128
M[int(H * .715):] = False
M[:, :int(W * .33)] = False
M[:, int(W * .68):] = False
l0, n = ndi.label(M)
sz = ndi.sum(M, l0, range(1, n + 1))
M = np.isin(l0, [i + 1 for i, z in enumerate(sz) if z > 5000])

yy, xx = np.mgrid[0:H, 0:W]
X0 = 738  # offset do recorte onde as retas foram medidas
SEAM_TERRA_CONCRETO = lambda y: X0 + 330 + (y - 25) * (48 / 275.0)        # x da reta em função de y
SEAM_TERRA_ACO = lambda x: 186 + ((x - X0) - 150) * (117 / 230.0)         # y da reta em função de x
T = M & (xx < SEAM_TERRA_CONCRETO(yy)) & (yy < SEAM_TERRA_ACO(xx))

SEEDS = {2: (.575, .20), 3: (.396, .366), 4: (.594, .47)}  # concreto, aço, eps (fração do PNG)
mk = np.zeros((H, W), int)
for i, (x, y) in SEEDS.items():
    cx, cy = int(x * W), int(y * H)
    mk[cy - 6:cy + 7, cx - 6:cx + 7] = i
sm = ndi.gaussian_filter(al / 255, 1.5)
lab = watershed(sobel(sm) * 4 + (1 - sm) * 2, mk, mask=M & ~T)
lab[T] = 1

k = lambda d: cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (d, d))
names = {1: "terra", 2: "concreto", 3: "aco", 4: "eps"}
out = []
for i, name in names.items():
    m = (lab == i).astype(np.uint8)
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, k(9))
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, k(15))
    l, n = ndi.label(m)
    sz = ndi.sum(m, l, range(1, n + 1))
    m = ndi.binary_fill_holes(l == (np.argmax(sz) + 1)).astype(np.uint8) * 255
    m = cv2.GaussianBlur(m, (0, 0), 2.2)
    m = (m > 127).astype(np.uint8)
    m = cv2.dilate(m, k(3))
    cs, _ = cv2.findContours(m, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    c = max(cs, key=cv2.contourArea)
    ap = cv2.approxPolyDP(c, 1.3, True)[:, 0, :]
    d = " ".join(("M" if j == 0 else "L") + f"{x} {y}" for j, (x, y) in enumerate(ap)) + "Z"
    mo = cv2.moments(c)
    out.append((name, d, round(mo["m10"] / mo["m00"]), round(mo["m01"] / mo["m00"])))

lines = [
    "/**",
    " * GERADO por frontend/scripts/gen-materias-shapes.py. Não editar à mão.",
    " * Contornos das quatro pedras no espaço do PNG 2172x724, extraídos da máscara alfa do mesmo render.",
    " */",
    "",
    'import type { MateriaId } from "./materias";',
    "",
    "export const SHAPES: Record<MateriaId, { d: string; cx: number; cy: number }> = {",
]
for name, d, cx, cy in out:
    lines += [f"  {name}: {{", f'    d: "{d}",', f"    cx: {cx},", f"    cy: {cy},", "  },"]
lines.append("};")
open(dst, "w").write("\n".join(lines) + "\n")
print("ok ->", dst)
