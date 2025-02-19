document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    
    if (document.getElementById("cart-items")) {
        loadCart();
    }
    let addToCartButtons = document.querySelectorAll(".cart-btn");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            let productCard = button.closest(".product-card");
            let product = {
                id: button.getAttribute("data-id"),
                name: productCard.querySelector("h3").textContent,
                price: parseFloat(productCard.querySelector(".price").textContent.replace("₹", "").replace(",", "")..replace(",", "")),
                image: productCard.querySelector("img").src
            };
            addToCart(product);
        });
    });


    let checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", processPayment);
    }
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(product.name + " has been added to your cart!");
}


function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartContainer = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");
    let totalPrice = 0;

    
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceElement.textContent = "0";
        return;
    }

    
    cartContainer.innerHTML = "";

    
    cart.forEach((product, index) => {
        totalPrice += product.price;

        let cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <div class="cart-product">
                <img src="${product.image}" alt="${product.name}" width="50">
                <span>${product.name} - ₹${product.price.toLocaleString()}</span>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = totalPrice.toLocaleString();

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            removeFromCart(index);
        });
    });
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1); 
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

function processPayment() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before proceeding.");
        return;
    }

    let paymentMethod = document.querySelector('input[name="payment"]:checked');

    if (!paymentMethod) {
        alert("Please select a payment method.");
        return;
    }

    alert(`Payment Successful using ${paymentMethod.value}! 🎉`);

    localStorage.removeItem("cart");


    updateCartCount();

    window.location.href = "index.html";
}



