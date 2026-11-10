import re

with open('C:/Users/jewel/Desktop/helena/web/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

tags = ['style.css', 'app.js', 'public/videos/featured.mp4']
for t in tags:
    if t in html:
        print('VERIFIED ASSET REF:', t)
    else:
        print('MISSING ASSET REF:', t)

anchors = re.findall(r'href="(#[a-zA-Z0-9_-]+)"', html)
ids = re.findall(r'id="([a-zA-Z0-9_-]+)"', html)

print('\nUnique Anchors:', sorted(list(set(anchors))))
print('Unique IDs:', len(set(ids)))

all_ok = True
for a in set(anchors):
    clean = a.replace('#', '')
    if clean in ids:
        print(f'Anchor {a} -> matched #{clean} [OK]')
    else:
        print(f'Anchor {a} -> MISSING #{clean} [ERROR]')
        all_ok = False

if all_ok:
    print('\nALL ANCHORS AND IDS ARE 100% MATCHED!')
