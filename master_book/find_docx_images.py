import docx

doc = docx.Document(r"C:\Users\jewel\Desktop\helena\master_book\The_Natal_Crucible_Master_Book_Complete.docx")

for i, p in enumerate(doc.paragraphs):
    for r in p.runs:
        if 'graphic' in r._r.xml:
            nearby = [doc.paragraphs[j].text.strip() for j in range(max(0, i-2), min(len(doc.paragraphs), i+3)) if doc.paragraphs[j].text.strip()]
            print(f"Image at P{i}: nearby context -> {nearby}")

