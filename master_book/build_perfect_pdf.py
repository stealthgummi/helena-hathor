import os
import fitz
from PIL import Image

pdf_in = r"C:\Users\jewel\Desktop\helena\master_book\The_Natal_Crucible_Master_Book_Complete.pdf"
pdf_out = r"C:\Users\jewel\Desktop\helena\master_book\The_Natal_Crucible_Master_Book_Complete_Perfect.pdf"
julias_dir = r"C:\Users\jewel\Desktop\helena\master_book\plates\julias"

cover_src = os.path.join(julias_dir, "cover_highres.png")
blueprint_src = os.path.join(julias_dir, "The_Astrological_Blueprint_Guide.png")
karmic_src = os.path.join(julias_dir, "The_Karmic_Blueprint_Infographic.png")
unplugging_src = os.path.join(julias_dir, "Unplugging Karma Astrological Guide.png")
reset_src = os.path.join(julias_dir, "The_Cosmic_Reset_Infographic.png")

doc = fitz.open(pdf_in)

# 1. Page 1: PERFECT EDGE-TO-EDGE COVER
p1 = doc[0]
# Clean page 1
p1.draw_rect(fitz.Rect(0, 0, 612, 792), color=(0.04, 0.04, 0.05), fill=(0.04, 0.04, 0.05))
# Place cover filling full bleed (0, 0, 612, 792)
p1.insert_image(fitz.Rect(0, 0, 612, 792), filename=cover_src)
print("Page 1: Full-bleed Gothic Cover applied successfully.")

# 2. Fix all other pages that have squashed images
# Ratio of 1536 x 2752 is 0.5581395
ratio = 1536.0 / 2752.0

def replace_with_proportional_image(page_idx, image_path):
    p = doc[page_idx]
    info = p.get_image_info()
    if info:
        old_bb = info[0]['bbox']
        # White out old squashed box
        p.draw_rect(fitz.Rect(old_bb[0] - 8, old_bb[1] - 8, old_bb[2] + 8, old_bb[3] + 8), color=(1, 1, 1), fill=(1, 1, 1))
        # Calculate proportional unskewed box
        h = old_bb[3] - old_bb[1]
        w = h * ratio
        x0 = (612.0 - w) / 2.0
        y0 = old_bb[1]
        new_bb = fitz.Rect(x0, y0, x0 + w, y0 + h)
        p.insert_image(new_bb, filename=image_path)
        print(f"Page {page_idx + 1}: Un-skewed image replaced at {w:.1f}x{h:.1f} pt (ratio={w/h:.3f})")

# Page 8: Already full-page Plate 1 (The Astrological Blueprint)
# Page 20 (idx 19): The Karmic Blueprint
replace_with_proportional_image(19, karmic_src)
# Page 21 (idx 20): Emergency Triage / Karmic Purge
replace_with_proportional_image(20, karmic_src)
# Page 28 (idx 27): Unplugging Karma (Career & Life Purpose)
replace_with_proportional_image(27, unplugging_src)
# Page 33 (idx 32): The Cosmic Reset (14-Day Rebrand Season)
replace_with_proportional_image(32, reset_src)

doc.save(pdf_out)
doc.close()
print("Saved perfect unskewed master PDF:", pdf_out)
