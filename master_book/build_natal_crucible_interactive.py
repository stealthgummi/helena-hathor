import os
import fitz
from docx2pdf import convert

base_dir = r"C:\Users\jewel\Desktop\helena\master_book"
docx_path = os.path.join(base_dir, "The_Natal_Crucible_Master_Book_Complete.docx")
ws_pdf_path = os.path.join(base_dir, "The_Natal_Crucible_Worksheets.pdf")
final_pdf_path = os.path.join(base_dir, "The_Natal_Crucible_Master_Book_Complete.pdf")

def assemble():
    reading_source = os.path.join(base_dir, "temp_reading_clean.pdf")
    print("Converting Helena Edition DOCX to clean temporary reading PDF...")
    convert(docx_path, reading_source)

    print(f"Reading source generated: {reading_source}")
    final_doc = fitz.open()

    def add_reading(from_p, to_p):
        d = fitz.open(reading_source)
        final_doc.insert_pdf(d, from_page=from_p, to_page=to_p)
        d.close()

    def add_ws(from_p, to_p):
        d = fitz.open(ws_pdf_path)
        final_doc.insert_pdf(d, from_page=from_p, to_page=to_p)
        d.close()

    # Part 1: Cover, Title/Coaching, TOC 1, TOC 2/Intro, Chap 1, Plate 1 (pages 0..8)
    add_reading(0, 8)
    # Chapter 1 typable worksheets (1.1, 1.2, 1.3 Wheel) (pages 0..2)
    add_ws(0, 2)

    # Part 2: Chapter 2 (pages 12..13)
    add_reading(12, 13)
    # Chapter 2 typable worksheets (2.1, 2.2) (pages 3..4)
    add_ws(3, 4)

    # Part 3: Chapter 3 (page 16)
    add_reading(16, 16)
    # Chapter 3 typable worksheet (3.1) (page 5)
    add_ws(5, 5)

    # Part 4: Chapter 4 & 2 Plates (pages 18..20)
    add_reading(18, 20)
    # Chapter 4 typable worksheets (4.1, 4.2) (pages 6..7)
    add_ws(6, 7)

    # Part 5: Chapter 5 (page 23)
    add_reading(23, 23)
    # Chapter 5 typable worksheets (5.1, 5.2) (pages 8..9)
    add_ws(8, 9)

    # Part 6: Chapter 6 & Plate 3 (pages 26..27)
    add_reading(26, 27)
    # Chapter 6 typable worksheets (6.1, 6.2) (pages 10..11)
    add_ws(10, 11)

    # Part 7: Chapter 7 & 2 Plates (pages 30..32)
    add_reading(30, 32)
    # Chapter 7 typable worksheets (7.1, 7.2, 7.3 wk1, 7.3 wk2, 7.4) (pages 12..17)
    add_ws(12, 17)

    # Part 8: Epilogue (page 37)
    add_reading(37, 37)

    print(f"Total compiled pages: {len(final_doc)}")
    total_widgets = sum(len(list(p.widgets())) for p in final_doc)
    print(f"Total typable AcroForm fields: {total_widgets}")

    # ==========================================
    # 2. ADD MOBILE TOC LINKS & DOCUMENT OUTLINE
    # ==========================================
    print("Wiring mobile TOC tap links and PDF outline...")
    
    toc_entries = [
        (1, "Introduction: How This Blueprint Works", 3, "Introduction: How This Blueprint Works"),
        (1, "Chapter 1: Understanding Your Birth Chart Basics", 4, "Chapter 1: Understanding Your Birth Chart Basics"),
        (2, "Study Plate 1: The Cosmic Big Three", 7, "Study Plate 1: The Cosmic Big Three & Architecture"),
        (2, "Worksheet 1.1: Your Birth Chart Data", 9, "Worksheet 1.1: Your Birth Chart Data"),
        (2, "Worksheet 1.2: Planets, Signs & Houses", 10, "Worksheet 1.2: Planets, Signs & Houses"),
        (2, "Worksheet 1.3: Your Visual Birth Chart Map", 11, "Worksheet 1.3: Your Visual Birth Chart Map (Wheel)"),
        (1, "Chapter 2: Identifying Key Strengths & Challenges", 12, "Chapter 2: Identifying Key Strengths & Challenges"),
        (2, "Worksheet 2.1: My Three Strengths", 14, "Worksheet 2.1: My Three Strengths"),
        (2, "Worksheet 2.2: My Three Challenges", 15, "Worksheet 2.2: My Three Challenges & Adaptations"),
        (1, "Chapter 3: Setting Astrological Intentions", 16, "Chapter 3: Setting Astrological Intentions"),
        (2, "Worksheet 3.1: My Three Personal Intentions", 17, "Worksheet 3.1: My Three Personal Intentions"),
        (1, "Chapter 4: Daily Practices for Self-Awareness", 18, "Chapter 4: Daily Practices for Self-Awareness"),
        (2, "Study Plate 5: The Daily Grounding", 19, "Study Plate 5: Daily Somatic Baseline & Worst-Day"),
        (2, "Study Plate: 4-Step Somatic Emergency Triage", 20, "Study Plate: 4-Step Emergency Triage"),
        (2, "Worksheet 4.1: My Daily Grounding Routine", 21, "Worksheet 4.1: Daily Grounding Routine"),
        (2, "Worksheet 4.2: 7-Day Journal Tracker", 22, "Worksheet 4.2: 7-Day Journal Tracker"),
        (1, "Chapter 5: Navigating Relationships Through Astrology", 23, "Chapter 5: Navigating Relationships Through Astrology"),
        (2, "Worksheet 5.1: Chart Comparison", 24, "Worksheet 5.1: Chart Comparison (Synastry)"),
        (2, "Worksheet 5.2: Relationship Patterns", 25, "Worksheet 5.2: Relationship Patterns & Boundaries"),
        (1, "Chapter 6: Harnessing Career & Life Purpose Insights", 26, "Chapter 6: Harnessing Career & Life Purpose Insights"),
        (2, "Study Plate 3: The Vocational Alchemical Refinery", 27, "Study Plate 3: The Vocational Alchemical Refinery"),
        (2, "Worksheet 6.1: Career Indicators in My Chart", 28, "Worksheet 6.1: Career Indicators in My Chart"),
        (2, "Worksheet 6.2: Turning Wounds into Authority", 29, "Worksheet 6.2: Turning Wounds into Sovereignty"),
        (1, "Chapter 7: Creating a Personalized 14-Day Action Plan", 30, "Chapter 7: Creating a Personalized 14-Day Action Plan"),
        (2, "Study Plate 2: The Somatic Mirror & 6-Domain Audit", 31, "Study Plate 2: The Somatic Mirror & 6-Domain Life Audit"),
        (2, "Study Plate 4: The Daily Spiral Notepad Matrix", 32, "Study Plate 4: The Daily Spiral Notepad Matrix"),
        (2, "Worksheet 7.1: Synthesizing My Insights", 33, "Worksheet 7.1: Synthesizing My Insights"),
        (2, "Worksheet 7.2: Setting Meaningful Standards", 34, "Worksheet 7.2: Setting Meaningful Standards"),
        (2, "Worksheet 7.3: 14-Day Action Plan (Week 1)", 35, "Worksheet 7.3: 14-Day Action Plan (Week 1)"),
        (2, "Worksheet 7.3: 14-Day Action Plan (Week 2)", 36, "Worksheet 7.3: 14-Day Action Plan (Week 2)"),
        (2, "Worksheet 7.4: Reflect, Adjust & Graduate", 37, "Worksheet 7.4: Reflect, Adjust & Graduate"),
        (1, "Epilogue: Unapologetic Sovereignty", 39, "Epilogue: Unapologetic Sovereignty")
    ]

    outline_list = []
    for level, search_title, target_pno, outline_title in toc_entries:
        outline_list.append([level, outline_title, target_pno + 1])
        query = search_title.split(":")[0]
        for toc_pno in [2, 3]:
            p = final_doc[toc_pno]
            rects = p.search_for(query)
            if rects:
                r = rects[0]
                touch_rect = fitz.Rect(60, r.y0 - 2, 550, r.y1 + 2)
                p.insert_link({
                    'kind': fitz.LINK_GOTO,
                    'page': target_pno,
                    'from': touch_rect
                })
                break

    final_doc.set_toc(outline_list)

    # ==========================================
    # 3. ADD "✦ CONTENTS" RETURN LINK ON ALL PAGES
    # ==========================================
    for pno in range(3, len(final_doc)):
        p = final_doc[pno]
        rect = fitz.Rect(470, 16, 555, 34)
        p.draw_rect(rect, color=(0.55, 0.15, 0.25), fill=(0.98, 0.95, 0.95), width=0.75)
        p.insert_text(fitz.Point(478, 28), "✦ CONTENTS", fontname="helv", fontsize=8.5, color=(0.45, 0.10, 0.20))
        p.insert_link({
            'kind': fitz.LINK_GOTO,
            'page': 2,
            'from': rect
        })

    # ==========================================
    # 4. STAMP LIVE WEB COMPANION LINKS IN HELENA'S VOICE
    # ==========================================
    # Page 4: Shadow Companion & Web Portal Box
    p4 = final_doc[3]
    card_rect = fitz.Rect(60, 420, 552, 555)
    p4.draw_rect(card_rect, color=(0.55, 0.10, 0.25), fill=(0.98, 0.95, 0.96), width=1.2)
    p4.insert_text(fitz.Point(76, 444), "✦ LIVE SHADOW ALCHEMY & COMPANION ENGINE", fontname="helv", fontsize=10.5, color=(0.45, 0.08, 0.18))
    p4.insert_text(fitz.Point(76, 462), '"Unplug the karma and get to your soul\'s purpose." — Helena Hathor', fontname="tiit", fontsize=9.5, color=(0.40, 0.15, 0.22))
    p4.insert_text(fitz.Point(76, 477), "Bridge this crucible workbook with our live vector ephemeris and mobile suite:", fontname="helv", fontsize=8.5, color=(0.35, 0.35, 0.35))

    btn_fc = fitz.Rect(76, 495, 296, 535)
    p4.draw_rect(btn_fc, color=(0.55, 0.10, 0.25), fill=(0.55, 0.10, 0.25))
    p4.insert_text(fitz.Point(88, 519), "✦ LAUNCH SHADOW FLASHCARDS (PWA) ↗", fontname="helv", fontsize=8.0, color=(1, 1, 1))
    p4.insert_link({
        'kind': fitz.LINK_URI,
        'uri': 'https://helena-hathor.vercel.app/flashcards/',
        'from': btn_fc
    })

    btn_calc = fitz.Rect(312, 495, 536, 535)
    p4.draw_rect(btn_calc, color=(0.15, 0.18, 0.25), fill=(0.15, 0.18, 0.25))
    p4.insert_text(fitz.Point(322, 519), "✦ CALCULATE 360° CHART WHEEL ↗", fontname="helv", fontsize=8.0, color=(1, 1, 1))
    p4.insert_link({
        'kind': fitz.LINK_URI,
        'uri': 'https://helena-hathor.vercel.app/#chart-calculator',
        'from': btn_calc
    })

    # Page 12: Worksheet 1.3 Chart Wheel Calculator Button
    p12 = final_doc[11]
    btn_wheel = fitz.Rect(54, 678, 558, 716)
    p12.draw_rect(btn_wheel, color=(0.55, 0.10, 0.25), fill=(0.98, 0.95, 0.96), width=1.0)
    p12.insert_text(fitz.Point(70, 695), "✦ LIVE CHART ENGINE: Generate your 360° wheel at helena-hathor.vercel.app ↗", fontname="helv", fontsize=8.5, color=(0.45, 0.08, 0.18))
    p12.insert_text(fitz.Point(70, 708), '"Look at your birth chart under the microscope." — Tap here to calculate live wheel', fontname="tiit", fontsize=7.5, color=(0.50, 0.20, 0.25))
    p12.insert_link({
        'kind': fitz.LINK_URI,
        'uri': 'https://helena-hathor.vercel.app/#chart-calculator',
        'from': btn_wheel
    })

    # Page 40: Epilogue Master Web Portal & Community Button
    p40 = final_doc[39]
    btn_epilogue = fitz.Rect(60, 675, 552, 725)
    p40.draw_rect(btn_epilogue, color=(0.55, 0.10, 0.25), fill=(0.55, 0.10, 0.25))
    p40.insert_text(fitz.Point(66, 696), "✦ \"CLEAN UP YOUR SHIT, YOU MESSY BITCH. PUT YOUR CHART UNDER THE MICROSCOPE.\" ✦", fontname="helv", fontsize=7.8, color=(1, 1, 1))
    p40.insert_text(fitz.Point(95, 712), "Tap here for live web portal, 1:1 sessions & Bali Retreat at helena-hathor.vercel.app ↗", fontname="helv", fontsize=7.5, color=(0.95, 0.92, 0.90))
    p40.insert_link({
        'kind': fitz.LINK_URI,
        'uri': 'https://helena-hathor.vercel.app/',
        'from': btn_epilogue
    })

    # ==========================================
    # 5. SAVE FINAL ASSEMBLED MASTER PDF
    # ==========================================
    tmp_out = final_pdf_path + ".tmp"
    final_doc.save(tmp_out)
    final_doc.close()

    if os.path.exists(final_pdf_path):
        os.remove(final_pdf_path)
    os.rename(tmp_out, final_pdf_path)
    print(f"SUCCESS! Mobile-optimized Interactive Master PDF saved: {final_pdf_path}")

    if os.path.exists(reading_source):
        os.remove(reading_source)

if __name__ == "__main__":
    assemble()
