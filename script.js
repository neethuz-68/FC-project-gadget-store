document.addEventListener("DOMContentLoaded", function () {
    updateCartCount(); // Update cart count when page loads

    let cartButtons = document.querySelectorAll(".cart-btn");

    cartButtons.forEach(button => {
        button.addEventListener("click", function () {
            let productId = this.getAttribute("data-id");
            let productName = this.getAttribute("data-name");
            let productPrice = this.getAttribute("data-price");
            let productImage = this.getAttribute("data-image");

            addToCart(productId, productName, productPrice, productImage);
        });
    });

    if (document.getElementById("cart-items")) {
        loadCart(); // Load cart items on the Checkout page
    }
});

// Function to add a product to the cart
function addToCart(productId, productName, productPrice, productImage) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        alert("This item is already in your cart! 🛒");
        return;
    }

    let product = {
        id: productId,
        name: productName,
        price: parseFloat(productPrice),
        image: productImage
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert("Product added to cart! 🛒");
}

// Function to update cart count in navbar
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCountElement = document.getElementById("cart-count");

    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

// Function to load cart items in Checkout page
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");
    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartContainer.innerHTML = "";

    cart.forEach(product => {
        totalPrice += product.price;

        let cartItem = `
            <li class="cart-item">
                <img src="${product.image}" alt="${product.name}" width="50">
                <span>${product.name} - ₹${product.price.toFixed(2)}</span>
                <button onclick="removeFromCart('${product.id}')">Remove</button>
            </li>
        `;
        cartContainer.innerHTML += cartItem;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(product => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    loadCart();
}

