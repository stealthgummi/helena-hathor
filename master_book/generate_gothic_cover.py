import math
from PIL import Image, ImageDraw, ImageFont

W, H = 1545, 2000
img = Image.new("RGB", (W, H), "#07080b")
draw = ImageDraw.Draw(img)

# 1. Background radial gradient
for r in range(900, 0, -2):
    alpha = int(35 * (1 - r / 900))
    # Crimson velvet glow in center
    draw.ellipse([W//2 - r, H//2 - r - 100, W//2 + r, H//2 + r - 100], fill=(74 + alpha, 4 + alpha//2, 78 + alpha//2))

# 2. Celestial orbit rings & sacred geometry
cx, cy = W // 2, H // 2 - 80
radii = [580, 520, 440, 360, 240, 140]

for idx, rad in enumerate(radii):
    stroke = 2 if idx in [0, 2, 4] else 1
    color = (226, 232, 240, 120) if idx % 2 == 0 else (136, 19, 55, 180)
    draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], outline=color, width=stroke)

# Orbital tick marks (360 degrees)
for deg in range(0, 360, 5):
    rad_angle = math.radians(deg)
    r1 = 580
    r2 = 595 if deg % 30 == 0 else 587
    x1 = cx + int(r1 * math.cos(rad_angle))
    y1 = cy + int(r1 * math.sin(rad_angle))
    x2 = cx + int(r2 * math.cos(rad_angle))
    y2 = cy + int(r2 * math.sin(rad_angle))
    tick_color = (226, 232, 240, 200) if deg % 30 == 0 else (148, 163, 184, 120)
    draw.line([(x1, y1), (x2, y2)], fill=tick_color, width=2 if deg % 30 == 0 else 1)

# Diagonal aspect lines
for angle in [0, 45, 90, 135, 180, 225, 270, 315]:
    rad_angle = math.radians(angle)
    x = cx + int(520 * math.cos(rad_angle))
    y = cy + int(520 * math.sin(rad_angle))
    draw.line([(cx, cy), (x, y)], fill=(136, 19, 55, 70), width=1)

# Outer decorative border
inset = 60
draw.rectangle([inset, inset, W - inset, H - inset], outline=(226, 232, 240, 90), width=2)
draw.rectangle([inset + 14, inset + 14, W - inset - 14, H - inset - 14], outline=(136, 19, 55, 140), width=1)

# 3. Typography
font_title = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 94)
font_sub = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 36)
font_badge = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 26)
font_author = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 52)
font_handle = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 28)

def draw_centered_text(y, text, font, fill):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    draw.text(((W - tw) // 2, y), text, font=font, fill=fill)

# Top Badge
draw_centered_text(160, "✦   A N   U N C E N S O R E D   N A T A L   G U I D E   ✦", font_badge, (226, 232, 240))
draw_centered_text(205, "&   I N T E R A C T I V E   A C T I O N   W O R K B O O K", font_badge, (148, 163, 184))

# Center Alchemical Sigil
font_sigil = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 110)
draw_centered_text(cy - 65, "☿", font_sigil, (244, 63, 94))

# Main Title
draw_centered_text(1180, "THE NATAL CRUCIBLE", font_title, (248, 250, 252))

# Subtitle
draw_centered_text(1295, "HOW TO READ YOUR BIRTH CHART", font_sub, (203, 213, 225))
draw_centered_text(1345, "& ALCHEMIZE PAIN INTO POWER", font_sub, (244, 63, 94))

# Divider Line
draw.line([(W//2 - 250, 1440), (W//2 + 250, 1440)], fill=(136, 19, 55), width=2)
draw.text((W//2 - 10, 1430), "✦", font=font_badge, fill=(226, 232, 240))

# Companion Engine Badge
font_comp = ImageFont.truetype("C:/Windows/Fonts/georgia.ttf", 24)
draw_centered_text(1520, "FEATURING THE 360° LIVE VECTOR WHEEL & COMPANION SHADOW FLASHCARDS", font_comp, (148, 163, 184))

# Author Section
draw_centered_text(1680, "H E L E N A   H A T H O R", font_author, (248, 250, 252))
draw_centered_text(1750, "@helenahathorastrology444", font_handle, (203, 213, 225))

# Save full res and thumbnail
cover_path = r"C:\Users\jewel\Desktop\helena\master_book\plates\cover.png"
thumb_path = r"C:\Users\jewel\Desktop\helena\master_book\plates\cover-350x450.png"

img.save(cover_path, "PNG")
thumb = img.resize((350, int(350 * H / W)), Image.Resampling.LANCZOS)
thumb.save(thumb_path, "PNG")

print("Generated Gothic Occult cover for The Natal Crucible successfully!")

