import os
import zipfile
from PIL import Image

docx_path = r"C:\Users\jewel\Desktop\helena\master_book\The_Natal_Crucible_Master_Book_Complete.docx"
julias_dir = r"C:\Users\jewel\Desktop\helena\master_book\plates\julias"

blueprint_img = os.path.join(julias_dir, "The_Astrological_Blueprint_Guide.png")
unplugging_img = os.path.join(julias_dir, "Unplugging Karma Astrological Guide.png")
karmic_img = os.path.join(julias_dir, "The_Karmic_Blueprint_Infographic.png")
reset_img = os.path.join(julias_dir, "The_Cosmic_Reset_Infographic.png")

# Create a small jpg version for image3.jpg from karmic_img
im_karmic = Image.open(karmic_img).convert("RGB")
temp_thumb_jpg = os.path.join(julias_dir, "temp_karmic_thumb.jpg")
im_karmic.save(temp_thumb_jpg, "JPEG", quality=85)

# Map media names to Julia's images
replacements = {
    "word/media/image2.png": blueprint_img,
    "word/media/image3.jpg": temp_thumb_jpg,
    "word/media/image4.png": karmic_img,
    "word/media/image5.png": unplugging_img,
    "word/media/image6.png": reset_img,
    "word/media/image7.png": reset_img
}

temp_zip = docx_path + ".temp"

with zipfile.ZipFile(docx_path, 'r') as zin:
    with zipfile.ZipFile(temp_zip, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if item.filename in replacements:
                target_path = replacements[item.filename]
                with open(target_path, 'rb') as tf:
                    new_bytes = tf.read()
                zout.writestr(item, new_bytes)
                print(f"Replaced {item.filename} with {os.path.basename(target_path)} ({len(new_bytes)} bytes)")
            else:
                zout.writestr(item, zin.read(item.filename))

os.remove(docx_path)
os.rename(temp_zip, docx_path)
print("Successfully hot-swapped all plates in DOCX with Julia's custom infographics!")

if os.path.exists(temp_thumb_jpg):
    os.remove(temp_thumb_jpg)

