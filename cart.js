// 🧾 Format price in INR
const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

// 🛒 Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cart-items");
const totalPriceDiv = document.getElementById("total-price");

// 🧱 Render cart items
function renderCart() {
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceDiv.textContent = "Total: ₹0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const quantity = item.quantity || 1;
    const subtotal = item.price * quantity;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <div>
        <strong>${item.name}</strong><br>
        Price: ${formatINR(item.price)}<br>
        Quantity:
        <button onclick="updateQuantity(${index}, -1)">➖</button>
        <span>${quantity}</span>
        <button onclick="updateQuantity(${index}, 1)">➕</button>
      </div>
      <button onclick="removeItem(${index})">Remove</button>
    `;

    cartItemsDiv.appendChild(div);
  });

  totalPriceDiv.textContent = `Total: ${formatINR(total)}`;
}

// 🔢 Update quantity
function updateQuantity(index, change) {
  if (!cart[index].quantity) cart[index].quantity = 1;
  cart[index].quantity += change;

  if (cart[index].quantity < 1) cart[index].quantity = 1;
  // Optional max limit
  if (cart[index].quantity > 10) cart[index].quantity = 10;

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// 🗑️ Remove item from cart
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// 🧹 Clear entire cart
document.getElementById("clear-cart").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear your cart?")) {
    localStorage.removeItem("cart");
    cart = [];
    renderCart();
  }
});

// 🚀 Initial render
renderCart();
