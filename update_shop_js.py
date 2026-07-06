import re

with open('shop.html', 'r') as f:
    html = f.read()

# Fix the display style bug and add animation logic
# Replace display: block with display: flex
html = html.replace("card.style.display = 'block'", "card.style.display = 'flex'")

# Inject staggered animation logic into the filterBtns click event
# We will find the filterBtns.forEach block
old_filter_block_end = "productCards.forEach((card, index) => {"
if "productCards.forEach(card => {" in html:
    html = html.replace("productCards.forEach(card => {", old_filter_block_end)

# After filtering, we need to apply animation delays to the visible cards.
# Wait, the easiest way is just to append a function that re-applies the animation.
animation_js = """
// Re-apply animations with stagger
let visibleCount = 0;
productCards.forEach(card => {
    if (card.style.display !== 'none') {
        card.style.animation = 'none';
        card.offsetHeight; /* trigger reflow */
        card.style.animation = null; 
        card.style.animationDelay = (visibleCount * 0.1) + 's';
        visibleCount++;
    }
});
"""

if "visibleCount" not in html:
    # Inject it right before the end of the filter click handler (which ends with `});`)
    # Let's just find the exact spot using regex or string replacement.
    # We can replace the end of the subFilterBtns logic as well.
    # Both filterBtns and subFilterBtns have a similar structure.
    
    html = html.replace("card.style.display = 'flex';", "card.style.display = 'flex';")
    # Actually, let's inject it after the inner productCards.forEach loops finish.
    
    # It's easier to just do a smart regex replacement on the productCards.forEach loop inside the click handlers.
    def inject_stagger(match):
        code = match.group(0)
        return code + "\n" + animation_js
        
    html = re.sub(r'(productCards\.forEach\(\(card, index\) => \{.*?\}\);)', inject_stagger, html, flags=re.DOTALL)

with open('shop.html', 'w') as f:
    f.write(html)
print("Updated JS animation logic")
