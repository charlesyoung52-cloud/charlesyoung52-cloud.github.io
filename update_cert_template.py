import shutil
import base64
import pymupdf

src_pdf = r"C:\Users\charl\.gemini\antigravity\brain\e4142f6a-a30b-401f-859f-d288a99a814b\.user_uploaded\media_1791686929888_7cbe6c7f.pdf"
dst_pdf = r"D:\Online Course\assets\Unarmed_Certificate_Template.pdf"

# Copy file
shutil.copy2(src_pdf, dst_pdf)
print("Copied updated PDF template to assets!")

# Generate new base64
with open(dst_pdf, "rb") as f:
    b64 = base64.b64encode(f.read()).decode("ascii")

with open(r"D:\Online Course\assets\cert_template_base64.js", "w", encoding="utf-8") as f:
    f.write("// Platforms Training Academy - Base64 Official Unarmed Certificate Template (IL486-0486 with Instructor Signature)\n")
    f.write('var UNARMED_CERT_TEMPLATE_BASE64 = "' + b64 + '";\n')

print(f"Updated cert_template_base64.js, length: {len(b64)}")

# Render blank template preview image
doc = pymupdf.open(dst_pdf)
page = doc[0]
pix = page.get_pixmap(dpi=150)
pix.save(r"D:\Online Course\assets\cert_blank_template.png")
print(f"Updated cert_blank_template.png, size: {pix.width}x{pix.height}")
