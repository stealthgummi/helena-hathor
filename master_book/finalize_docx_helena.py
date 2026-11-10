import os
import zipfile
import docx

docx_path = r"C:\Users\jewel\Desktop\helena\master_book\The_Natal_Crucible_Master_Book_Complete.docx"
cover_path = r"C:\Users\jewel\Desktop\helena\master_book\plates\cover.png"

# 1. Update text in python-docx
doc = docx.Document(docx_path)

replacements = [
    ("Worst-Day Lifeline", "Karmic Purge Lifeline"),
    ("Worst-Day Baseline", "Transit Crisis Baseline"),
    ("Worst-Day Protocol", "Karmic Purge Protocol"),
    ("WORST-DAY LIFELINE", "KARMIC PURGE LIFELINE"),
    ("WORST-DAY PROTOCOL", "KARMIC PURGE PROTOCOL"),
    ("Worst-Day", "Karmic Purge"),
    ("worst-day", "karmic purge"),
    ("Worst Day", "Karmic Purge"),
    ("worst day", "karmic purge")
]

for p in doc.paragraphs:
    for old, new in replacements:
        if old in p.text:
            p.text = p.text.replace(old, new)

for t in doc.tables:
    for row in t.rows:
        for cell in row.cells:
            for p in cell.paragraphs:
                for old, new in replacements:
                    if old in p.text:
                        p.text = p.text.replace(old, new)

doc.save(docx_path)
print("Updated all text occurrences in docx successfully.")

# 2. Replace cover image inside docx zip archive
temp_zip = docx_path + ".temp"

with open(cover_path, "rb") as cf:
    new_cover_bytes = cf.read()

with zipfile.ZipFile(docx_path, 'r') as zin:
    with zipfile.ZipFile(temp_zip, 'w', compression=zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            if item.filename == "word/media/image1.png":
                zout.writestr(item, new_cover_bytes)
                print(f"Replaced word/media/image1.png with new Gothic cover ({len(new_cover_bytes)} bytes)")
            else:
                zout.writestr(item, zin.read(item.filename))

os.remove(docx_path)
os.rename(temp_zip, docx_path)
print("Updated docx with Gothic cover image successfully.")

