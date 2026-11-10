import fitz

pdf_path = r"C:\Users\jewel\Desktop\helena\master_book\The_Natal_Crucible_Master_Book_Complete.pdf"
doc = fitz.open(pdf_path)

print(f"Total Pages: {len(doc)}")
print(f"Total AcroForm Widgets: {sum(len(list(p.widgets())) for p in doc)}")

words = ['noelle', 'shakti', 'worst-day', 'natal mind']
found = False

for i, page in enumerate(doc):
    txt = page.get_text()
    for w in words:
        if w in txt.lower():
            found = True
            lines = [l for l in txt.splitlines() if w in l.lower()]
            print(f"Page {i+1} mentions '{w}': {lines}")

if not found:
    print("ZERO occurrences of noelle, shakti, worst-day, or natal mind!")
