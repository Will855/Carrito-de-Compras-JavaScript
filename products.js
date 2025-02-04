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
    
    // Limpiar contenedor antes de renderizar
    productsContainer.innerHTML = '';

    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image" style="background-image: url('${product.image}')"></div>
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        const addToCartButton = productCard.querySelector(".add-to-cart");
        addToCartButton.addEventListener("click", () => addToCart(product));
        productsContainer.appendChild(productCard);

        // Animación individual para cada tarjeta
        gsap.from(productCard, {
            scrollTrigger: {
                trigger: productCard,
                start: "top 90%", // Inicia la animación cuando el 90% del elemento está visible
                end: "bottom 20%",
                toggleActions: "play none none reverse", // Reproduce hacia adelante y reversa
                invalidateOnRefresh: true, // Importante para responsividad
                markers: false // Cambiar a true para debug
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            delay: index * 0.1 // Mejor stagger basado en índice
        });
    });

    // Animación de escala para el contenedor
    gsap.from(productsContainer, {
        scrollTrigger: {
            trigger: "#products",
            start: "top bottom",
            end: "top 30%",
            scrub: 1,
            toggleActions: "play none none none"
        },
        scale: 0.95,
        opacity: 0,
        duration: 2
    });
}

    initAddToCartButtons();

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