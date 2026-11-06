"""Generate brand-aligned atmospheric backgrounds for the clinic site."""
from __future__ import annotations

import os
import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

OUT = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "public",
    "images",
)
os.makedirs(OUT, exist_ok=True)
W, H = 1920, 1080

TEAL = np.array([17, 94, 89], dtype=np.float32)
TEAL_DARK = np.array([12, 74, 70], dtype=np.float32)
SAND = np.array([196, 165, 116], dtype=np.float32)
TEXT = np.array([22, 48, 56], dtype=np.float32)
MUTED = np.array([78, 100, 107], dtype=np.float32)
BG = np.array([243, 246, 245], dtype=np.float32)


def to_img(arr: np.ndarray) -> Image.Image:
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")


def radial(c_in, c_out, cx=0.5, cy=0.4, power=1.2):
    ys, xs = np.mgrid[0:H, 0:W]
    dx = (xs / W - cx) * 1.4
    dy = (ys / H - cy) * 1.1
    t = np.minimum(1.0, (dx * dx + dy * dy) ** 0.5) ** power
    t = t[..., None]
    return c_in * (1 - t) + c_out * t


def vertical_grad(top, bottom):
    t = np.linspace(0, 1, H, dtype=np.float32)[:, None, None]
    col = top * (1 - t) + bottom * t  # (H, 1, 3)
    return np.broadcast_to(col, (H, W, 3)).copy()


def soft_noise(arr, amount=8.0, seed=0):
    rng = np.random.default_rng(seed)
    n = rng.normal(0, amount, arr.shape).astype(np.float32)
    return arr + n


def left_wash(arr, width_frac=0.55, alpha=0.72):
    xs = np.linspace(0, 1, W, dtype=np.float32)[None, :, None]
    fade = np.clip((width_frac - xs) / (width_frac * 0.55), 0, 1)
    fade = fade**1.2 * alpha
    return arr * (1 - fade) + BG * fade


def top_wash(arr, height_frac=0.42, alpha=0.7):
    ys = np.linspace(0, 1, H, dtype=np.float32)[:, None, None]
    fade = np.clip((height_frac - ys) / (height_frac * 0.6), 0, 1)
    fade = fade**1.1 * alpha
    return arr * (1 - fade) + BG * fade


def window_light(arr, left=False):
    ys, xs = np.mgrid[0:H, 0:W].astype(np.float32)
    nx, ny = xs / W, ys / H
    anchor = 0.28 if left else 0.72
    beam = np.maximum(0.0, 1.0 - np.abs((nx - anchor) - (ny - 0.2) * 0.35) / 0.28)
    beam *= np.maximum(0.0, 1.0 - ny * 0.85)
    warm = np.array([255, 250, 235], dtype=np.float32)
    a = (beam * 0.22)[..., None]
    out = arr * (1 - a) + warm * a

    # soft pane rectangles
    x0 = 0.08 if left else 0.55
    pane = np.zeros((H, W), dtype=np.float32)
    for i in range(2):
        x1 = x0 + i * 0.18
        x2 = x1 + 0.16
        mask = (nx >= x1) & (nx <= x2) & (ny >= 0.08) & (ny <= 0.55)
        pane = np.maximum(pane, mask.astype(np.float32))
    # blur panes via box filter approximation
    pane_img = Image.fromarray((pane * 255).astype(np.uint8), "L").filter(
        ImageFilter.GaussianBlur(22)
    )
    pane = np.asarray(pane_img, dtype=np.float32) / 255.0
    a2 = (pane * 0.12)[..., None]
    return out * (1 - a2) + warm * a2


def vignette(arr, strength=0.22):
    ys, xs = np.mgrid[0:H, 0:W].astype(np.float32)
    cx, cy = W / 2, H / 2
    d = np.sqrt((xs - cx) ** 2 + (ys - cy) ** 2)
    d /= np.sqrt(cx**2 + cy**2)
    factor = (1 - strength * (d**1.6))[..., None]
    return arr * factor + TEXT * (1 - factor)


def composite_rgba(base_arr, overlay: Image.Image):
    base = to_img(base_arr).convert("RGBA")
    overlay = overlay.convert("RGBA")
    if overlay.size != base.size:
        overlay = overlay.resize(base.size, Image.Resampling.LANCZOS)
    out = Image.alpha_composite(base, overlay)
    return np.asarray(out.convert("RGB"), dtype=np.float32)


def chair_overlay():
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle((1190, 518, 1690, 670), radius=40, fill=(17, 94, 89, 78))
    d.rounded_rectangle((1420, 302, 1728, 594), radius=48, fill=(12, 74, 70, 68))
    d.ellipse((1305, 648, 1651, 778), fill=(78, 100, 107, 52))
    return layer.filter(ImageFilter.GaussianBlur(18))


def plant_overlay(x, y, scale=1.0):
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    r = int(90 * scale)
    rng = np.random.default_rng(7)
    colors = [(17, 94, 89, 88), (12, 74, 70, 70), (80, 120, 100, 72)]
    for col in colors:
        ox = int(rng.integers(-20, 20))
        oy = int(rng.integers(-30, 10))
        d.ellipse((x - r + ox, y - r + oy - 20, x + r + ox, y + r + oy), fill=col)
    return layer.filter(ImageFilter.GaussianBlur(14))


def bench_overlay():
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rounded_rectangle((346, 670, 998, 756), radius=12, fill=(180, 140, 95, 110))
    d.rectangle((384, 756, 461, 842), fill=(140, 110, 75, 90))
    d.rectangle((883, 756, 960, 842), fill=(140, 110, 75, 90))
    d.rounded_rectangle((576, 626, 806, 713), radius=8, fill=(245, 242, 235, 120))
    return layer.filter(ImageFilter.GaussianBlur(10))


def doorway_overlay():
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((1190, 194, 1651, 842), fill=(17, 94, 89, 78))
    d.rectangle((1248, 238, 1594, 842), fill=(255, 250, 240, 110))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse((1267, 324, 1574, 756), fill=(255, 245, 220, 95))
    glow = glow.filter(ImageFilter.GaussianBlur(35))
    layer = Image.alpha_composite(layer, glow)
    return layer.filter(ImageFilter.GaussianBlur(6))


def desk_overlay():
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.rectangle((0, 594, W, H), fill=(230, 220, 200, 70))
    d.rounded_rectangle((422, 626, 806, 842), radius=6, fill=(250, 248, 242, 170))
    d.rounded_rectangle((922, 648, 1190, 778), radius=10, fill=(17, 94, 89, 140))
    d.ellipse((998, 562, 1114, 648), fill=(12, 74, 70, 110))
    d.ellipse((1306, 691, 1574, 799), fill=(196, 165, 116, 120))
    d.line([(538, 756), (768, 713)], fill=(196, 165, 116, 180), width=5)
    return layer.filter(ImageFilter.GaussianBlur(8))


def calm_accents():
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse((1190, 518, 1498, 670), fill=(196, 165, 116, 95))
    d.ellipse((1382, 410, 1536, 594), fill=(17, 94, 89, 78))
    for i in range(5):
        x = int(W * (0.15 + i * 0.06))
        y = int(H * (0.35 + (i % 2) * 0.08))
        d.ellipse((x, y, x + 70, y + 120), fill=(17, 94, 89, 48 + i * 6))
    return layer.filter(ImageFilter.GaussianBlur(22))


def finish(arr, seed):
    arr = soft_noise(arr, amount=5.5, seed=seed)
    img = to_img(arr)
    img = ImageEnhance.Color(img).enhance(0.92)
    img = ImageEnhance.Contrast(img).enhance(1.04)
    img = img.filter(ImageFilter.GaussianBlur(0.55))
    arr = vignette(np.asarray(img, dtype=np.float32), 0.2)
    return to_img(arr)


def save(img: Image.Image, name: str):
    path = os.path.join(OUT, name)
    img.save(path, "JPEG", quality=86, optimize=True)
    print(f"wrote {name} ({os.path.getsize(path)} bytes)")


def main():
    # 1. Home hero — consultation atmosphere, text-safe left
    arr = radial(
        np.array([236, 242, 240], dtype=np.float32),
        np.array([200, 214, 210], dtype=np.float32),
        cx=0.35,
        cy=0.35,
        power=1.1,
    )
    arr = left_wash(arr, 0.52, 0.62)
    arr = window_light(arr, left=False)
    arr = composite_rgba(arr, chair_overlay())
    arr = composite_rgba(arr, plant_overlay(1690, 842, 0.8))
    save(finish(arr, 1), "bg-home-hero.jpg")

    # 2. Calm mid-section — soft still life field
    arr = vertical_grad(
        np.array([238, 244, 242], dtype=np.float32),
        np.array([220, 230, 228], dtype=np.float32),
    )
    arr = composite_rgba(arr, calm_accents())
    ys, xs = np.mgrid[0:H, 0:W].astype(np.float32)
    nx, ny = xs / W, ys / H
    edge = np.maximum(0, 0.55 - np.minimum(np.minimum(nx, 1 - nx), np.minimum(ny, 1 - ny)) * 2.2)
    arr = arr * (1 - (edge * 0.2)[..., None]) + TEXT * (edge * 0.2)[..., None]
    save(finish(arr, 2), "bg-home-calm.jpg")

    # 3. About hero — waiting corridor suggestion
    arr = radial(
        np.array([242, 245, 243], dtype=np.float32),
        np.array([205, 218, 214], dtype=np.float32),
        cx=0.4,
        cy=0.3,
        power=1.0,
    )
    arr = window_light(arr, left=True)
    arr = composite_rgba(arr, doorway_overlay())
    arr = composite_rgba(arr, bench_overlay())
    arr = composite_rgba(arr, plant_overlay(922, 594, 0.7))
    arr = left_wash(arr, 0.48, 0.66)
    save(finish(arr, 3), "bg-about-hero.jpg")

    # 4. Contact — reception still-life atmosphere
    arr = vertical_grad(
        np.array([245, 247, 245], dtype=np.float32),
        np.array([228, 234, 230], dtype=np.float32),
    )
    ys, xs = np.mgrid[0:H, 0:W].astype(np.float32)
    nx, ny = xs / W, ys / H
    t = np.maximum(0.0, 1.0 - nx / 0.55) * np.maximum(0.0, 1.0 - np.abs(ny - 0.35) / 0.55)
    warm = np.array([255, 252, 245], dtype=np.float32)
    a = (t * 0.22)[..., None]
    arr = arr * (1 - a) + warm * a
    arr = composite_rgba(arr, desk_overlay())
    arr = top_wash(arr, 0.42, 0.72)
    save(finish(arr, 4), "bg-contact.jpg")


if __name__ == "__main__":
    main()
