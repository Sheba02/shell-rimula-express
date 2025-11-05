// Product data
const products = [
    // Groceries
    { id: 1, name: "Fresh Milk", price: 3.50, category: "groceries", image: "🥛", discount: 0 },
    { id: 2, name: "Whole Wheat Bread", price: 2.75, category: "groceries", image: "🍞", discount: 10 },
    // ... (all other products with discount property)
    
    // Add discount property to some products for deals
    { id: 25, name: "Potato Chips", price: 2.50, category: "snacks", image: "🥔", discount: 15 },
    { id: 37, name: "Shampoo", price: 5.99, category: "personal-care", image: "🧴", discount: 20 },
    // ... etc
];

// Load featured products on home page
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    featuredContainer.innerHTML = '';
    const featuredProducts = products.slice(0, 8);
    
    featuredProducts.forEach(product => {
        featuredContainer.appendChild(createProductCard(product));
    });
}

// Load deals products
function loadDealsProducts() {
    const dealsContainer = document.getElementById('deals-products');
    if (!dealsContainer) return;
    
    dealsContainer.innerHTML = '';
    const dealProducts = products.filter(product => product.discount > 0);
    
    dealProducts.forEach(product => {
        dealsContainer.appendChild(createProductCard(product, true));
    });
}

// Load category products
function loadCategoryProducts(category) {
    const container = document.getElementById('category-products');
    if (!container) return;
    
    container.innerHTML = '';
    let categoryProducts = products;
    
    if (category !== 'all') {
        categoryProducts = products.filter(product => product.category === category);
    }
    
    categoryProducts.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

// Create product card
function createProductCard(product, showDiscount = false) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const discountPrice = product.discount > 0 ? 
        (product.price * (1 - product.discount / 100)).toFixed(2) : null;
    
    card.innerHTML = `
        ${product.discount > 0 && showDiscount ? `<div class="deal-badge">${product.discount}% OFF</div>` : ''}
        <div class="product-image">${product.image}</div>
        <h3>${product.name}</h3>
        <div class="product-price">
            ${discountPrice && showDiscount ? 
                `<span class="original-price">$${product.price.toFixed(2)}</span>
                 <span class="discount-price">$${discountPrice}</span>` :
                `$${product.price.toFixed(2)}`
            }
        </div>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', () => addToCart(product));
    
    return card;
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    // Load featured products on home page
    if (document.getElementById('featured-products')) {
        loadFeaturedProducts();
    }
    
    // Load deals on home page
    if (document.getElementById('deals-products') && window.location.pathname.includes('index.html')) {
        loadDealsProducts();
    }
});