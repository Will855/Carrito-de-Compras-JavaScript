// ==========================
// CÓDIGO DE ANIMACIONES (GSAP/ScrollTrigger)
// ==========================

// Registrar el plugin ScrollTrigger de GSAP
gsap.registerPlugin(ScrollTrigger);

// Animaciones de la sección Hero
const heroTimeline = gsap.timeline();
heroTimeline.from("#animated-text", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out"
}).from(".cta-button", {
    scrollTrigger: {
        trigger: "#hero",
        start: "top center",
        end: "bottom top",
        scrub: 0.3
    },
});

// Animación de texto dinámico
gsap.to("#animated-text", {
    text: {
        value: ["Welcome to the Future", "Discover Cutting-Edge Keyboards", "Elevate Your Typing Experience"],
        delimiter: " "
    },
    duration: 3,
    repeat: -1,
    repeatDelay: 1,
    ease: "none"
});

// Partículas flotantes
const particlesContainer = document.createElement("div");
particlesContainer.className = "particles-container";
document.getElementById("hero").appendChild(particlesContainer);

for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particlesContainer.appendChild(particle);

    gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: Math.random() * 0.5 + 0.5
    });

    gsap.to(particle, {
        x: "+=100",
        y: "+=100",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: Math.random() * 4 + 4
    });
}

// // Re-iniciar animaciones
// gsap.from(".product-card", {
//     scrollTrigger: {
//         trigger: "#products",
//         start: "top bottom", 
//         end: "50% 50%", 
//         scrub: 0.3 // Suaviza la animación mientras se hace scroll
//     },
//     y: 100,
//     opacity: 0.5,
//     stagger: 1 // Aplica un retraso entre las animaciones de cada tarjeta
// });

// Efecto de brillo en tarjetas
const glowTimeline = gsap.timeline({ repeat: -1 });
glowTimeline.to(".product-card", {
    boxShadow: "0 0 20px rgba(193, 232, 255, 0.5)",
    duration: 2,
    stagger: 0.1
}).to(".product-card", {
    boxShadow: "0 0 10px rgba(193, 232, 255, 0.2)",
    duration: 2,
    stagger: 0.1
});

// Interactividad del botón CTA
const ctaButton = document.querySelector('.cta-button');
ctaButton.addEventListener('mouseenter', () => {
    gsap.to(ctaButton, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)" });
});
ctaButton.addEventListener('mouseleave', () => {
    gsap.to(ctaButton, { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
});
ctaButton.addEventListener('click', () => {
    gsap.to(window, { duration: 1, scrollTo: "#products", ease: "power3.inOut" });
});

// ==========================
// CÓDIGO DE LÓGICA DEL CARRITO
// ==========================

// Sistema de carrito principal
// ==========================
// MEJORAS PARA LA LÓGICA DEL CARRITO
// ==========================

let cartItems = [];
let cartTotal = 0;
let existingItem;
// Función mejorada para añadir productos

function addToCart(product) {
    existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({...product, quantity: 1});
    }
    
    cartTotal += product.price;
    updateCart();
    console.log(cartItems);
    
}
// Función para eliminar un item individual
function removeItem(productId) {
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    
    if (itemIndex > -1) {
        const removedItem = cartItems.splice(itemIndex, 1)[0];
        cartTotal -= removedItem.price * removedItem.quantity;
        updateCart();
    }
}

// Función para vaciar completamente el carrito
function clearCart() {
    if (cartItems.length === 0) return;
    
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
        cartItems = [];
        cartTotal = 0;
        updateCart();
        showFeedback('Carrito vaciado');
    }
}

// Función de compra final
function checkout() {
    if (cartItems.length === 0) {
        showFeedback('¡El carrito está vacío!');
        return;
    }

    showPurchaseModal();
    cartItems = [];
    cartTotal = 0;
    updateCart();
}

// Modal de compra completada
function showPurchaseModal() {
    const modal = document.createElement('div');
    modal.className = 'purchase-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>🎉 Compra exitosa!</h3>
            <p>Productos adquiridos: ${existingItem.quantity}</p>
            <p>Total pagado: $${cartTotal.toFixed(2)}</p>
            <button onclick="this.parentElement.parentElement.remove()">Cerrar</button>
        </div>
    `;
    //console.log(cartItems);
    
    document.body.appendChild(modal);
    gsap.from(modal, { opacity: 0, duration: 0.3 });
}

// Panel lateral
function showCart() {
    document.getElementById('cart').classList.add('open');
    gsap.from("#cart", { x: 300, duration: 0.5, ease: "power3.out" });
}

function closeCart() {
    gsap.to("#cart", {
        x: 0,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => document.getElementById('cart').classList.remove('open')
    });
}


// Feedback visual mejorado
function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback';
    feedback.textContent = message;
    
    document.body.appendChild(feedback);
    gsap.from(feedback, { y: 20, opacity: 0, duration: 0.3 })
        .to(feedback, { delay: 2, opacity: 0, onComplete: () => feedback.remove() });
}

// Función actualizada para mostrar el carrito
function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.querySelector('.cart-count');

    // Limpiar y actualizar items
    cartItemsElement.innerHTML = '';
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-item" onclick="removeItem('${item.id}')">🗑️</button>
        `;
        cartItemsElement.appendChild(itemElement);
    });

    // Actualizar totales
    cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
    cartCountElement.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Animación de actualización
    gsap.from('.cart-item', {
        x: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.3
    });
}

// Modificar el event listener para botones de añadir
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.product-card');
        const product = {
            id: card.dataset.id,
            name: card.querySelector('h3').textContent,
            price: parseFloat(card.querySelector('.price').textContent.replace('$', ''))
        };
        
        addToCart(product);
        showFeedback('Producto añadido al carrito!');
        
        // Animación del producto
        gsap.from(card, {
            scale: 1.1,
            duration: 0.3,
            ease: "back.out(1.7)"
        });
    });
});
// Inicializaciones
updateCart();

