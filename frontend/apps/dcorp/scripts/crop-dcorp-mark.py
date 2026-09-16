from PIL import Image
import numpy as np
from pathlib import Path

root = Path(r"C:\Users\yagod\Documents\Develop\grupo-patrimonial-1\frontend\apps\dcorp")
src = root / "public" / "brands" / "dcorp-logo.png"
im = Image.open(src).convert("RGBA")
arr = np.array(im)
lum = arr[:, :, :3].astype(int).max(axis=2)
mask = lum > 25

# Symbol only: cut before the gap above the wordmark (~767)
MARK_BOTTOM = 752
band = mask[:MARK_BOTTOM]
ys, xs = np.where(band)
left, right = int(xs.min()), int(xs.max())
top, bot = int(ys.min()), int(ys.max())
print("mark tight", left, top, right, bot)

# Square around mark, clamped so we never include text
pad = int(max(right - left, bot - top) * 0.06)
left = max(0, left - pad)
right = min(arr.shape[1] - 1, right + pad)
top = max(0, top - pad)
bot = min(MARK_BOTTOM, bot + pad)

w = right - left + 1
h = bot - top + 1
side = max(w, h)
cx = (left + right) / 2
cy = (top + bot) / 2
x0 = int(round(cx - side / 2))
y0 = int(round(cy - side / 2))
x1 = x0 + side
y1 = y0 + side

# Keep inside image and above text
if y1 > MARK_BOTTOM:
    shift = y1 - MARK_BOTTOM
    y0 -= shift
    y1 -= shift
if y0 < 0:
    y1 -= y0
    y0 = 0
    y1 = min(y1, MARK_BOTTOM)
    side = y1 - y0
    x0 = int(round(cx - side / 2))
    x1 = x0 + side
if x0 < 0:
    x1 -= x0
    x0 = 0
if x1 > arr.shape[1]:
    diff = x1 - arr.shape[1]
    x0 -= diff
    x1 -= diff

crop_box = (x0, y0, x1, y1)
print("crop_box", crop_box, "side", x1 - x0)

crop = im.crop(crop_box)
c = np.array(crop)
near_black = c[:, :, :3].max(axis=2) < 18
c[near_black, 3] = 0
mark = Image.fromarray(c)

app_dir = root / "src" / "app"
public_mark = root / "public" / "brands" / "dcorp-mark.png"
mark.save(public_mark)
mark.resize((512, 512), Image.Resampling.LANCZOS).save(
    root / "public" / "brands" / "dcorp-mark-preview.png"
)

mark.resize((64, 64), Image.Resampling.LANCZOS).save(app_dir / "icon.png")
mark.resize((32, 32), Image.Resampling.LANCZOS).save(root / "public" / "favicon.ico")
# ico via png is ok for modern browsers; also keep png favicon in public
mark.resize((32, 32), Image.Resampling.LANCZOS).save(root / "public" / "favicon.png")

apple = Image.new("RGBA", (180, 180), (31, 31, 31, 255))
apple_mark = mark.resize((142, 142), Image.Resampling.LANCZOS)
apple.alpha_composite(apple_mark, ((180 - 142) // 2, (180 - 142) // 2))
apple.convert("RGB").save(app_dir / "apple-icon.png")

og = Image.new("RGB", (1200, 630), (31, 31, 31))
mark_og = mark.resize((380, 380), Image.Resampling.LANCZOS)
og.paste(mark_og, ((1200 - 380) // 2, (630 - 380) // 2), mark_og)
og.save(app_dir / "opengraph-image.png", quality=95)
og.save(app_dir / "twitter-image.png", quality=95)

print("ok", mark.size)
