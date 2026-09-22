"""Cut the DCORP method hover overlays straight out of house-original-beauty.png.

Each overlay is a full-canvas 1152x864 RGBA whose RGB is copied verbatim from the beauty
render; only the alpha channel differs. Dropping an overlay at 0,0 over the beauty is
therefore pixel-identical to the region it covers -- no shift, no scale, no re-render.

Segmentation is a marker watershed over the render's own edges. The markers are pinned to
boundary lines measured off the render itself (see _qa_profile.py / _qa_lines.py):

  eave            roof -> front wall      y = 318.5 + 0.0300 * (x -  500)
  gable rake      roof -> gable wall      y = 175.0 + 1.0940 * (x -  205)
  back rake       roof underside          y = 198.0 - 1.5560 * (x -  200)
  wall bottom     front wall -> slab      y = 651.0 - 0.0708 * (x -  350)
  wall bottom     gable wall -> slab      y = 599.0 + 0.3097 * (x -  140)
  slab front      slab -> background      y = 722.0 - 0.0951 * (x -  290)
  slab left       slab -> background      y = 630.0 + 0.4330 * (x -   77)
  door assembly   leaf + jamb + sill      x 583..687, y 356..630

Run this file to regenerate house-{fundacao,estrutura,instalacoes,revestimentos,entrega}.png,
then check the result with verify-method-house-overlays.py.

    python scripts/build-method-house-overlays.py
    python scripts/verify-method-house-overlays.py

Requires numpy, scipy and opencv-python.
"""

from __future__ import annotations

from pathlib import Path

import cv2
import numpy as np
from scipy import ndimage

HERE = Path(__file__).resolve().parents[1] / "public" / "dcorp" / "method"
BEAUTY = HERE / "house-original-beauty.png"
SIZE = (1152, 864)  # w, h

BG, ROOF, WALL, SLAB, DOOR, OPENING = 1, 2, 3, 4, 5, 6

GOLD = np.array([106, 169, 201], dtype=np.float32)  # #C9A96A as BGR
RIM_STRENGTH = 0.30
RIM_WIDTH = 3.5

DOOR_BOX = (583, 356, 687, 630)  # x0, y0, x1, y1 inclusive, outer jamb


def eave_y(x):
    return 318.5 + 0.0300 * (x - 500.0)


def gable_rake_y(x):
    return 175.0 + 1.0940 * (x - 205.0)


def back_rake_y(x):
    return 198.0 - 1.5560 * (x - 200.0)


def wall_bottom_y(x):
    """Bottom of the wall body: front face and gable face meet near the x=316 corner."""
    return np.minimum(651.0 - 0.0708 * (x - 350.0), 599.0 + 0.3097 * (x - 140.0))


def slab_bottom_y(x):
    """Bottom of the slab: front face and left return face meet at the x=290 corner."""
    return np.minimum(722.0 - 0.0951 * (x - 290.0), 630.0 + 0.4330 * (x - 77.0))


def ridge_y(x):
    return 170.0 + 0.0709 * (x - 203.0)


def roof_lower_y(x):
    """Bottom edge of the whole roof assembly (tiles + fascia + rake board)."""
    return np.maximum(back_rake_y(x), np.minimum(gable_rake_y(x), eave_y(x)))


# ---------------------------------------------------------------- foreground


def foreground_mask(lum: np.ndarray) -> np.ndarray:
    """House silhouette only -- the soft contact shadow stays in the background."""
    core = ndimage.binary_opening(lum < 200, np.ones((3, 3)))
    lab, n = ndimage.label(core)
    if n:
        sizes = ndimage.sum(core, lab, range(1, n + 1))
        core = lab == (int(np.argmax(sizes)) + 1)
    return ndimage.binary_fill_holes(core)


# ---------------------------------------------------------------- markers


def build_markers(lum: np.ndarray, fg: np.ndarray) -> np.ndarray:
    h, w = lum.shape
    yy, xx = np.mgrid[0:h, 0:w]
    m = np.zeros((h, w), np.int32)

    m[~ndimage.binary_dilation(fg, np.ones((3, 3)), iterations=14)] = BG

    lo = roof_lower_y(xx)  # roof bottom
    wb = wall_bottom_y(xx)
    sb = slab_bottom_y(xx)
    rg = ridge_y(xx)
    dx0, dy0, dx1, dy1 = DOOR_BOX

    # --- roof: up to 4px shy of its measured bottom edge, so the watershed has to
    #     settle on that edge rather than on a tile seam higher up.
    roof = (yy < lo - 4) & (yy > np.minimum(rg, back_rake_y(xx)) + 6)
    roof |= (xx >= 100) & (xx <= 203) & (yy > back_rake_y(xx) + 6) & (yy < lo - 4)
    m[roof & fg] = ROOF

    # --- walls: gable face and front face, from just under the roof to just above the slab.
    #     x >= 138 keeps the seed off the slab's left corner, where no wall exists.
    wall = (xx >= 138) & (yy > lo + 4) & (yy < wb - 10)
    wall &= ~((xx >= dx0 - 6) & (xx <= dx1 + 6) & (yy >= dy0 - 6) & (yy <= dy1 + 6))
    m[wall & fg] = WALL

    # --- slab: everything below the wall line; left of the wall it runs to the silhouette
    slab = (yy > wb + 8) & ((yy < sb - 8) | (xx < 120))
    m[slab & fg] = SLAB

    # --- door: seeded right up to the outer jamb so the cut keeps the frame
    m[(xx >= dx0 + 3) & (xx <= dx1 - 3) & (yy >= dy0 + 3) & (yy <= dy1 - 3)] = DOOR

    # --- windows: on the front wall (x >= 340) the only bright pixels are frames and glass.
    #     The gable face has no openings, and the slab's left return face also runs bright.
    bright = fg & (lum > 188) & (xx >= 340) & (yy > lo) & (yy < wb - 6)
    m[ndimage.binary_opening(bright, np.ones((3, 3)))] = OPENING

    m[(m > BG) & ~fg] = 0
    return m


def segment() -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    bgr = cv2.imread(str(BEAUTY), cv2.IMREAD_COLOR)
    assert bgr.shape[1::-1] == SIZE, f"beauty is {bgr.shape[1::-1]}, expected {SIZE}"
    lum = cv2.cvtColor(bgr, cv2.COLOR_BGR2GRAY).astype(np.int32)

    fg = foreground_mask(lum)
    labels = build_markers(lum, fg)
    cv2.watershed(cv2.bilateralFilter(bgr, 7, 40, 7), labels)
    labels[labels <= 0] = BG
    labels[~fg] = BG
    return bgr, labels, fg


# ---------------------------------------------------------------- parts


def part_masks(labels: np.ndarray, fg: np.ndarray) -> dict[str, np.ndarray]:
    def clean(mask: np.ndarray) -> np.ndarray:
        return ndimage.binary_closing(mask, np.ones((3, 3)), iterations=2) & fg

    roof = clean(labels == ROOF)
    wall = clean(labels == WALL)
    slab = clean(labels == SLAB)
    openings = ndimage.binary_fill_holes(clean((labels == DOOR) | (labels == OPENING))) & fg

    roof &= ~openings
    slab &= ~openings & ~roof
    wall &= ~roof & ~slab

    # The watershed leaves a 1px ridge between basins, and the slab's left return face
    # runs a few px past its seed. Hand every leftover silhouette pixel to its nearest
    # part so the five stages together rebuild the house exactly.
    stack = [roof, wall, slab, openings]
    owner = np.zeros(fg.shape, np.int32)
    for i, mask in enumerate(stack, start=1):
        owner[mask] = i
    gap = fg & (owner == 0)
    if gap.any():
        _, (iy, ix) = ndimage.distance_transform_edt(owner == 0, return_indices=True)
        filled = owner[iy[gap], ix[gap]]
        for i, mask in enumerate(stack, start=1):
            mask[gap] |= filled == i

    # the wall plane as a solid panel body: openings healed shut
    shell = ndimage.binary_fill_holes(wall | openings) & fg & ~roof & ~slab

    return {
        "fundacao": slab,
        "estrutura": shell,
        "instalacoes": openings,
        "revestimentos": shell & ~openings,
        "entrega": roof,
    }


# ---------------------------------------------------------------- output


def write_part(bgr: np.ndarray, mask: np.ndarray, path: Path) -> None:
    alpha = cv2.GaussianBlur(mask.astype(np.float32) * 255.0, (0, 0), 0.6)
    alpha[~ndimage.binary_dilation(mask, np.ones((3, 3)))] = 0.0

    rim = np.clip(1.0 - ndimage.distance_transform_edt(mask) / RIM_WIDTH, 0.0, 1.0)
    rim[~mask] = 0.0
    rim = cv2.GaussianBlur(rim.astype(np.float32), (0, 0), 1.0) * RIM_STRENGTH
    rim[alpha <= 0] = 0.0  # never tint pixels this overlay does not own
    rim = rim[..., None]

    rgb = bgr.astype(np.float32) * (1.0 - rim) + GOLD * rim
    out = np.dstack([np.clip(rgb, 0, 255), np.clip(alpha, 0, 255)]).astype(np.uint8)
    cv2.imwrite(str(path), out, [cv2.IMWRITE_PNG_COMPRESSION, 9])


def main() -> None:
    bgr, labels, fg = segment()
    masks = part_masks(labels, fg)

    for name, mask in masks.items():
        write_part(bgr, mask, HERE / f"house-{name}.png")
        ys, xs = np.nonzero(mask)
        print(f"house-{name}.png  px={int(mask.sum()):7d}  "
              f"bbox=({xs.min()},{ys.min()})-({xs.max()},{ys.max()})")

    covered = masks["fundacao"] | masks["estrutura"] | masks["entrega"]
    print("silhouette px:", int(fg.sum()), "| uncovered:", int((fg & ~covered).sum()))
    for a, b in (("entrega", "estrutura"), ("entrega", "fundacao"), ("estrutura", "fundacao")):
        print(f"overlap {a}/{b}:", int((masks[a] & masks[b]).sum()))


if __name__ == "__main__":
    main()
