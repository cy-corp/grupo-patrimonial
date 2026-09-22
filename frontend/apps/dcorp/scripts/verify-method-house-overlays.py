"""Acceptance test for the DCORP method hover overlays.

Checks, for each house-<stage>.png:
  1. canvas is exactly 1152x864 and has an alpha channel
  2. alpha is 0 everywhere outside the house silhouette (no fog plate, no second house)
  3. RGB is bit-identical to house-original-beauty.png wherever the overlay is opaque and
     outside the gold rim band -> proves zero shift / zero scale / no re-render
  4. the gold rim stays inside the cut and stays subtle
  5. the stage masks tile the silhouette exactly (fundacao + estrutura + entrega) and
     revestimentos + instalacoes reconstruct estrutura
"""

from __future__ import annotations

import sys
from pathlib import Path

import cv2
import numpy as np
from scipy import ndimage

HERE = Path(__file__).resolve().parents[1] / "public" / "dcorp" / "method"
BEAUTY = HERE / "house-original-beauty.png"
SIZE = (1152, 864)
STAGES = ["fundacao", "estrutura", "instalacoes", "revestimentos", "entrega"]
RIM_BAND = 8  # px from the cut edge where the gold rim is allowed to change RGB

fails: list[str] = []


def check(ok: bool, msg: str) -> None:
    print(("  PASS  " if ok else "  FAIL  ") + msg)
    if not ok:
        fails.append(msg)


def main() -> None:
    beauty = cv2.imread(str(BEAUTY), cv2.IMREAD_COLOR)
    lum = cv2.cvtColor(beauty, cv2.COLOR_BGR2GRAY).astype(np.int32)
    core = ndimage.binary_opening(lum < 200, np.ones((3, 3)))
    lab, n = ndimage.label(core)
    sizes = ndimage.sum(core, lab, range(1, n + 1))
    silhouette = ndimage.binary_fill_holes(lab == (int(np.argmax(sizes)) + 1))
    outside = ~ndimage.binary_dilation(silhouette, np.ones((3, 3)), iterations=2)

    masks: dict[str, np.ndarray] = {}
    cores: dict[str, np.ndarray] = {}
    for stage in STAGES:
        path = HERE / f"house-{stage}.png"
        print(f"\n{path.name}")
        im = cv2.imread(str(path), cv2.IMREAD_UNCHANGED)

        check(im is not None and im.shape[1::-1] == SIZE,
              f"canvas is {im.shape[1::-1] if im is not None else None}, expected {SIZE}")
        check(im.ndim == 3 and im.shape[2] == 4, "has an alpha channel (RGBA)")

        a = im[..., 3]
        rgb = im[..., :3]
        opaque = a == 255
        masks[stage] = a > 0
        cores[stage] = a >= 128

        check(int(a[outside].max()) == 0,
              f"alpha is 0 outside the silhouette (max {int(a[outside].max())})")

        inner = opaque & ~ndimage.binary_dilation(~opaque, np.ones((3, 3)), iterations=RIM_BAND)
        diff = np.abs(rgb.astype(np.int32) - beauty.astype(np.int32)).max(axis=2)
        check(inner.sum() > 1000 and int(diff[inner].max()) == 0,
              f"RGB bit-identical to beauty on {int(inner.sum())} interior px "
              f"(max delta {int(diff[inner].max())})")

        rim = opaque & ~inner
        check(int(diff[~masks[stage]].max()) == 0, "RGB untouched outside the cut")
        check(int(diff[rim].max()) <= 60 if rim.any() else True,
              f"gold rim stays subtle (max delta {int(diff[rim].max()) if rim.any() else 0})")

        ys, xs = np.nonzero(masks[stage])
        print(f"          bbox=({xs.min()},{ys.min()})-({xs.max()},{ys.max()})  "
              f"px={int(masks[stage].sum())}")

    print("\ncomposition")
    stages_union = masks["fundacao"] | masks["estrutura"] | masks["entrega"]
    check(int((silhouette & ~stages_union).sum()) == 0,
          f"fundacao+estrutura+entrega cover the silhouette "
          f"(uncovered {int((silhouette & ~stages_union).sum())})")
    # Neighbouring stages share their anti-aliased boundary pixels on purpose, so the
    # disjointness test is on the opaque cores; the soft overlap must stay a thin seam.
    for a_, b_ in (("entrega", "estrutura"), ("entrega", "fundacao"), ("estrutura", "fundacao")):
        ov = int((cores[a_] & cores[b_]).sum())
        check(ov == 0, f"{a_} and {b_} opaque cores do not overlap ({ov} px)")
        seam = masks[a_] & masks[b_]
        width = 2.0 * ndimage.distance_transform_edt(seam).max() if seam.any() else 0.0
        check(width <= 4.0,
              f"{a_}/{b_} soft seam is a thin anti-aliasing band "
              f"({int(seam.sum())} px, max width {width:.1f}px)")
    resid = int((masks["estrutura"] ^ (masks["revestimentos"] | masks["instalacoes"])).sum())
    check(resid == 0, f"revestimentos + instalacoes == estrutura ({resid} px differ)")

    print("\n" + ("ALL CHECKS PASSED" if not fails else f"{len(fails)} CHECK(S) FAILED"))
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
