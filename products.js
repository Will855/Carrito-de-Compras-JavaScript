// ==========================
// DINAMIZACIÓN DE PRODUCTOS (Manteniendo clases y animaciones)
// ==========================

// Datos de productos (pueden venir de una API/JSON)
const productContainer = document.getElementById("product-container");

const products = [
    {
        id: 1,
        name: "Tempest Cataclysm",
        price: 199.99,
        image: "./images/products/keyboard-1.jpg",
    },
    {
        id: 2,
        name: "Stealth Pro Series",
        price: 249.99,
        image: "./images/products/keyboard-2.jpg",
    },
    {
        id: 3,
        name: "Stealth Pro Series",
        price: 249.99,
        image: "./images/products/keyboard-2.jpg",
    },
    {
        id: 3,
        name: "Stealth Pro Series",
        price: 249.99,
        image: "./images/products/keyboard-2.jpg",
    },
    {
        id: 4,
        name: "Stealth Pro Series",
        price: 249.99,
        image: "./images/products/keyboard-2.jpg",
    },
];

function renderProducts() {
    const productsContainer = document.querySelector('.products-grid');
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;
        
        // Agregar el evento onClick al botón
        const addToCartButton = productCard.querySelector(".add-to-cart");
        addToCartButton.addEventListener("click", () => addToCart(product));
        productsContainer.appendChild(productCard);
    });

// Re-iniciar animaciones
gsap.from(".product-card", {
    scrollTrigger: {
        trigger: "#products",
        start: "top bottom", 
        end: "50% 50%", 
        scrub: 0.3 // Suaviza la animación mientras se hace scroll
    },
    y: 100,
    stagger: 1, // Aplica un retraso entre las animaciones de cada tarjeta
    opacity: 0.5
});

    initAddToCartButtons();
}
// Función para inicializar botones (llamar después de renderizar)
function initAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const product = {
                id: card.dataset.id,
                name: card.querySelector('.product-title').textContent,
                price: parseFloat(card.querySelector('.price span').textContent)
            };

            addToCart(product);
            showFeedback('¡Producto añadido!');

            // Animación del card (igual que antes)
            gsap.from(card, {
                scale: 1.1,
                duration: 0.1,
                ease: "back.out(1.7)"
            });
        });
    });
}

// Llamar al renderizado inicial
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    ScrollTrigger.refresh();
});