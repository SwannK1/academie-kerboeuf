import sys, json, base64, os

src, dest = sys.argv[1], sys.argv[2]
with open(src) as f:
    data = json.load(f)
os.makedirs(os.path.dirname(dest), exist_ok=True)
with open(dest, "wb") as f:
    f.write(base64.b64decode(data["content"]))
print(dest, os.path.getsize(dest))
