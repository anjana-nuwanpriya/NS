import re

with open('style.css', 'r') as f:
    css = f.read()

# Add heading font
heading_css = """
h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
    font-weight: 600;
    line-height: 1.2;
    color: var(--text-primary);
}
"""
css = re.sub(r'(body \{.*?\})', r'\1\n' + heading_css, css, flags=re.DOTALL)

with open('style.css', 'w') as f:
    f.write(css)

print("CSS updated with heading font")
