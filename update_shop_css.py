import re

with open('shop.html', 'r') as f:
    html = f.read()

# Replace .products-grid template
new_grid = '''
.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 3rem;
    margin-bottom: 4rem;
    padding: 0 2rem;
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
}
'''
html = re.sub(r'\.products-grid \{.*?\}', new_grid.strip(), html, flags=re.DOTALL)

# Replace .product-card
new_card = '''
.product-card {
    background: var(--surface-light);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    transition: var(--transition-smooth);
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 450px;
    width: 100%;
    border: 1px solid rgba(0,0,0,0.03);
    animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}

.product-image-container {
    overflow: hidden;
    width: 100%;
    height: 280px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
}

.product-image-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    padding: 20px;
}

.product-card:hover .product-image-img {
    transform: scale(1.08);
}
'''
html = re.sub(r'\.product-card \{.*?\}', new_card.strip()[:new_card.find('.product-card:hover')], html, flags=re.DOTALL)
html = re.sub(r'\.product-card:hover \{.*?\}', new_card[new_card.find('.product-card:hover'):new_card.find('.product-image-img')], html, flags=re.DOTALL)
html = re.sub(r'\.product-image-img \{.*?\}', new_card[new_card.find('.product-image-container'):], html, flags=re.DOTALL)

# Because we added .product-image-container to CSS, we must also add it to HTML!
html = html.replace('<img src=', '<div class="product-image-container"><img src=')
html = html.replace('class="product-image-img">', 'class="product-image-img"></div>')

# Replace .filter-btn
new_filter_btn = '''
.filter-btn {
    padding: 0.8rem 1.5rem;
    border: none;
    background: #ffffff;
    color: var(--text-secondary);
    border-radius: 50px;
    cursor: pointer;
    transition: var(--transition-smooth);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 0.8rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.filter-btn.active,
.filter-btn:hover {
    background: var(--primary);
    color: #ffffff;
    box-shadow: 0 8px 25px rgba(194,0,0,0.25);
    transform: translateY(-2px);
}
'''
html = re.sub(r'\.filter-btn \{.*?\}', new_filter_btn.strip()[:new_filter_btn.find('.filter-btn.active')], html, flags=re.DOTALL)
html = re.sub(r'\.filter-btn\.active,\s*\.filter-btn:hover \{.*?\}', new_filter_btn[new_filter_btn.find('.filter-btn.active'):], html, flags=re.DOTALL)

# Replace .sub-filter-btn
new_sub_filter_btn = '''
.sub-filter-btn {
    padding: 0.6rem 1.2rem;
    border: 1px solid rgba(0,0,0,0.1);
    background: transparent;
    color: var(--text-secondary);
    border-radius: 50px;
    cursor: pointer;
    transition: var(--transition-smooth);
    font-weight: 500;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
}

.sub-filter-btn.active,
.sub-filter-btn:hover {
    background: var(--text-primary);
    color: white;
    border-color: var(--text-primary);
    transform: scale(1.05);
}
'''
html = re.sub(r'\.sub-filter-btn \{.*?\}', new_sub_filter_btn.strip()[:new_sub_filter_btn.find('.sub-filter-btn.active')], html, flags=re.DOTALL)
html = re.sub(r'\.sub-filter-btn\.active,\s*\.sub-filter-btn:hover \{.*?\}', new_sub_filter_btn[new_sub_filter_btn.find('.sub-filter-btn.active'):], html, flags=re.DOTALL)

# Refine Info Typography
new_info = '''
.product-info {
    padding: 2rem 1.5rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.product-category {
    color: var(--primary);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
}

.product-title {
    font-size: 1.4rem;
    color: var(--text-primary);
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 1rem;
    font-family: var(--font-heading);
}
'''
html = re.sub(r'\.product-info \{.*?\}', new_info.strip()[:new_info.find('.product-category')], html, flags=re.DOTALL)
html = re.sub(r'\.product-category \{.*?\}', new_info[new_info.find('.product-category'):new_info.find('.product-title')], html, flags=re.DOTALL)
html = re.sub(r'\.product-title \{.*?\}', new_info[new_info.find('.product-title'):], html, flags=re.DOTALL)

# Refine Buy Button
new_buy = '''
.buy-btn {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, var(--text-primary) 0%, #333333 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: var(--transition-smooth);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-top: 1.5rem;
}

.buy-btn:hover {
    background: linear-gradient(135deg, var(--primary) 0%, #990000 100%);
    box-shadow: 0 8px 25px rgba(194,0,0,0.3);
    transform: translateY(-2px);
}
'''
html = re.sub(r'\.buy-btn \{.*?\}', new_buy.strip()[:new_buy.find('.buy-btn:hover')], html, flags=re.DOTALL)
html = re.sub(r'\.buy-btn:hover \{.*?\}', new_buy[new_buy.find('.buy-btn:hover'):], html, flags=re.DOTALL)

with open('shop.html', 'w') as f:
    f.write(html)
print("Updated shop.html with modern UI")
