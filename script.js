document.addEventListener("DOMContentLoaded", function () {
  loadCart();
});

// Load cart items from localStorage
function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart-items");
  let totalPriceElement = document.getElementById("total-price");
  let totalPrice = 0;

  if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
  }

  fetch("../data/products.json") // Adjust path if needed
      .then(response => response.json())
      .then(products => {
          cartContainer.innerHTML = ""; // Clear previous content
          cart.forEach(itemId => {
              let product = products.find(p => p.id === itemId);
              if (product) {
                  totalPrice += product.price; // Update total price
                  let cartItem = `
                      <li class="cart-item">
                          <img src="${product.image}" alt="${product.name}" width="50">
                          <span>${product.name} - $${product.price.toFixed(2)}</span>
                          <button onclick="removeFromCart(${product.id})">Remove</button>
                      </li>
                  `;
                  cartContainer.innerHTML += cartItem;
              }
          });
          totalPriceElement.textContent = totalPrice.toFixed(2); // Update total price
      });
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(id => id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart(); // Reload cart after removing an item
}

// Mock Payment Function
function mockPayment() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
      alert("Your cart is empty! Add items before proceeding to payment.");
      return;
  }

  alert("Processing payment... ✅\nThank you for your purchase!");
  localStorage.removeItem("cart"); // Clear the cart after payment
  loadCart(); // Refresh the cart display
}
