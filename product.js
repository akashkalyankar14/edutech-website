// ✅ Product list (same structure as homepage)
const products = [
  {
    id: 1,
    name: "Beginner Robotics Kit",
    price: 4999,
    description: "Perfect for kids aged 8+ to start building robots.",
    longDesc: "This kit includes everything a beginner needs to start building robots — motors, sensors, chassis, wiring, and a beginner-friendly guidebook with video tutorials.",
    image: "images/beginner-kit.jpg"
  },
  {
    id: 2,
    name: "Advanced AI Bot Kit",
    price: 9999,
    description: "Includes sensors and AI logic modules for smart bots.",
    longDesc: "Take your robotics to the next level! This kit features AI-ready modules, vision sensors, wireless communication boards, and Python-based programmable logic.",
    image: "images/advanced-kit.jpg"
  }
];

// 💰 Format INR
const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(amount);

// 🔍 Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

// 🔎 Find the product
const product = products.find(p => p.id === productId);
const container = document.getElementById("product-container");

if (product && container) {
  container.innerHTML = `
    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/600x400?text=Image+Not+Found'" />
    <h2>${product.name}</h2>
    <p>${product.longDesc}</p>
    <p><strong>${formatINR(product.price)}</strong></p>
    <button id="add-to-cart">Add to Cart</button>
    <p id="cart-message" style="margin-top: 1rem;"></p>
  `;

  // 🛒 Add to cart logic
  document.getElementById("add-to-cart").addEventListener("click", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(item => item.id === product.id);
    const msg = document.getElementById("cart-message");

    if (exists) {
      msg.textContent = "✅ Already in cart!";
      msg.style.color = "orange";
    } else {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      msg.textContent = "🛒 Added to cart!";
      msg.style.color = "green";
    }
  });
} else {
  container.innerHTML = `<p style="color:red;">❌ Product not found.</p>`;
}
