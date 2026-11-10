import os
import docx

doc_path = r"C:\Users\jewel\Desktop\helena\master_book\The_Natal_Crucible_Master_Book.docx"
doc = docx.Document(doc_path)

print(f"Loaded document: {len(doc.paragraphs)} paragraphs, {len(doc.tables)} tables.")

# 1. Update Title & Headers in paragraphs
for p in doc.paragraphs:
    if "THE NATAL MIND" in p.text:
        for run in p.runs:
            if "THE NATAL MIND" in run.text:
                run.text = run.text.replace("THE NATAL MIND", "THE NATAL CRUCIBLE")
    if "A Self-Discovery of Your Cosmic Blueprint" in p.text:
        for run in p.runs:
            if "A Self-Discovery of Your Cosmic Blueprint" in run.text:
                run.text = run.text.replace("A Self-Discovery of Your Cosmic Blueprint", "How to Read Your Birth Chart & Alchemize Pain into Power")
    if "The Natal Mind is engineered" in p.text:
        for run in p.runs:
            if "The Natal Mind" in run.text:
                run.text = run.text.replace("The Natal Mind", "The Natal Crucible")
    if "Noelle" in p.text:
        for run in p.runs:
            if "Noelle" in run.text:
                run.text = run.text.replace("Noelle", "Helena Hathor")

# 2. Update Signature at the end (Paragraph 320 or similar)
for p in doc.paragraphs[-10:]:
    if "Noelle" in p.text or "cosmic sisterhood" in p.text.lower():
        p.text = "With unyielding fire, truth, and alchemical sovereignty,\nHelena Hathor ✦\n@helenahathorastrology444"

# 3. Comprehensive rewrite of all 8 Coaching / Diagnostic Tables
helena_coaching = {
    0: (
        "✦ HELENA'S CLINICAL DIAGNOSTIC: WELCOME TO THE CRUCIBLE",
        "Listen to me right now: this is not a dusty 1980s astrology textbook meant to collect dust on your coffee table. And this is definitely not a collection of generic, surface-level horoscopes telling you 'Geminis talk too much' or 'Scorpios are intense.' What we are doing here is putting your birth chart under the microscope.\n\n"
        "Most people spend decades paralyzed in chronic guilt, relationship burnout, and financial anxiety simply because they are carrying 18-to-20-year structural karmic cycles that don't even belong to them. Suffering is not arbitrary misfortune—it is dense, valuable karmic lead waiting to be violently shed so that you can step into self-sovereignty, financial abundance, and raw personal power.\n\n"
        "Open your chart, stop making excuses, and let's clean up your shit.\n\n"
        "— Helena Hathor (@helenahathorastrology444)"
    ),
    1: (
        "✦ HELENA'S CLINICAL DIAGNOSTIC: WHY EXACT BIRTH TIME IS NON-NEGOTIABLE",
        "People tell me all the time: 'Helena, my mom thinks I was born around dinner time, can't we just wing it?' Absolutely not! Don't make me get violent. The Earth rotates on its axis at 1 degree every 4 minutes. In four minutes, your Ascendant shifts degree, and in two hours, an entirely new zodiac sign takes the wheel—completely rearranging your 12 houses, your second-house money ruler, and your eighth-house karmic debts.\n\n"
        "If you want generic pop horoscopes, go look at a meme page. If you want to put your life under the microscope and uncover what the f*** you are actually supposed to be doing on Earth, get your birth certificate and find the exact minute.\n\n"
        "— Helena Hathor"
    ),
    14: (
        "✦ HELENA'S CLINICAL DIAGNOSTIC: STOP CRYING OVER YOUR SQUARES — ALCHEMIZE YOUR PAIN",
        "I need you to hear this loud and clear: if you have a chart full of easy trines and sextiles, life might be comfortable, but you might also spend 30 years sitting on the couch doing nothing with your gifts. Easy aspects don't build empires or sovereign leaders. The masters, the disruptors, and the unapologetic powerhouses are built out of ferocious squares, brutal oppositions, and Mars-Pluto conjunctions.\n\n"
        "Friction is the fuel of alchemy. Stop looking at your tough placements like a victim. Your suffering is valuable material meant to be transmuted. What do you need to release so you can be f***ing powerful, bitch?\n\n"
        "— Helena Hathor"
    ),
    21: (
        "✦ HELENA'S CLINICAL DIAGNOSTIC: UNPLUG THE KARMIC LOOPS & CONFRONT YOUR NORTH NODE",
        "Desperation and victimhood repel power! Clinging to obsolete relationships or repeating the same 9-month Mars retrograde holding patterns is a clear sign that you are stuck in your South Node baggage. Your South Node is where you've been comfy for multiple lifetimes—and it's rotting.\n\n"
        "The North Node in astrology tells you what the f*** you're supposed to be doing on Earth right now. Unplug the karma, sever the cord to what is draining you, and execute your soul's purpose with surgical precision.\n\n"
        "— Helena Hathor"
    ),
    26: (
        "✦ HELENA'S CLINICAL DIAGNOSTIC: THE EMERGENCY WORST-DAY PROTOCOL (SOMATIC TRIAGE)",
        "Life isn't always incense and calm meditations. When Mars retrogrades through Leo and squares your natal placements, or the South Node conjuncts your personal planets, your nervous system can feel like it's riddled with anxiety. Here is my rule for the bad days: You don't abandon yourself, and you don't blow up your life.\n\n"
        "You engage the Worst-Day Protocol. You strip down your demands to the absolute baseline, ground your physical body, drink water, take a salt bath, and refuse to make major structural decisions while dysregulated. Save the empire-building for when the celestial storm clears.\n\n"
        "— Helena Hathor"
    ),
    33: (
        "✦ HELENA'S CLINICAL DIAGNOSTIC: CLEAN UP YOUR SHIT, YOU MESSY BITCH (ENERGETIC BOUNDARIES)",
        "Let's have an unfiltered diagnostic moment: how many times have you kept your mouth shut, smiled through disrespect, and called it 'being polite'—when in reality you were abandoning your own sovereignty? False peace is toxic rot. Speaking truth to power means lies and secrets will be exposed, starting with the lies you tell yourself to stay comfortable with people who drain you.\n\n"
        "Clean up your shit, you messy bitch. Set ruthless boundaries around your time, your money, and your energetic field.\n\n"
        "— Helena Hathor"
    ),
    40: (
        "✦ HELENA'S CLINICAL DIAGNOSTIC: TURNING YOUR WOUNDS INTO UNDENIABLE SOVEREIGNTY",
        "Every single betrayal, financial crash, failed venture, or karmic heartbreak you ever endured was not meaningless trauma. In true alchemy, heavy lead must enter the crucible before it turns into gold. Your 10th-house Midheaven calling and your 2nd/8th-house financial axis are forged directly in the fire of what you survived.\n\n"
        "People don't follow gurus who lived in a glass castle; they follow leaders who went to the underworld, burned the dead weight, and walked back out crowned in sovereignty. Turn your pain into purpose.\n\n"
        "— Helena Hathor"
    ),
    47: (
        "✦ HELENA'S CLINICAL DIAGNOSTIC: THE GREAT EXHALE & THE BALI SANCTUARY",
        "Look at how far you've come. You were never broken; you were just navigating this chaotic world without your diagnostic blueprint. Now you have your chart in your hands. You know your Big Three, your karmic nodes, and your house rulers. But reading the blueprint is only phase one.\n\n"
        "If you are ready to take this deep into somatic reality, put your chart under the microscope in private 1-on-1 sessions, and unplug multi-lifetime baggage in an opulent private sanctuary (flower baths, sound healing, zero shared rooms), come join me in Bali in April 2027. We are going to spoil you, recalibrate your nervous system, and launch you into your next 20-year cycle of unapologetic power.\n\n"
        "— Helena Hathor (@helenahathorastrology444)"
    )
}

for table_idx, (title, content) in helena_coaching.items():
    if table_idx < len(doc.tables):
        t = doc.tables[table_idx]
        for row in t.rows:
            for cell in row.cells:
                # Clear existing text cleanly and set Helena's diagnostic
                p = cell.paragraphs[0]
                p.text = title + "\n\n" + content

# 4. Sweep entire docx for any stray "Noelle" or "The Natal Mind"
for p in doc.paragraphs:
    if "Noelle" in p.text:
        p.text = p.text.replace("Noelle", "Helena")
    if "Natal Mind" in p.text:
        p.text = p.text.replace("Natal Mind", "Natal Crucible")

for t in doc.tables:
    for row in t.rows:
        for cell in row.cells:
            for p in cell.paragraphs:
                if "Noelle" in p.text:
                    p.text = p.text.replace("Noelle", "Helena")
                if "Natal Mind" in p.text:
                    p.text = p.text.replace("Natal Mind", "Natal Crucible")

output_docx = r"C:\Users\jewel\Desktop\helena\master_book\The_Natal_Crucible_Master_Book_Complete.docx"
doc.save(output_docx)
print(f"Successfully saved updated Helena Master Book: {output_docx}")
