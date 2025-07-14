// 🏷️ Format price in INR
const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(amount);

// 📦 Product list
const products = [
  {
    id: 1,
    name: "Beginner Robotics Kit",
    price: 4999,
    description: "Perfect for kids aged 8+ to start building robots.",
    image: "images/beginner-kit.jpg",
  },
  {
    id: 2,
    name: "Advanced AI Bot Kit",
    price: 9999,
    description: "Includes sensors and AI logic modules for smart bots.",
    image: "images/advanced-kit.jpg",
  },
];

// 🔄 Render product cards
function renderProducts(list) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  if (list.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  list.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("product-card");

    // ✅ This contains everything: image + details
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}"
        onerror="this.src='https://via.placeholder.com/250x180?text=Image+Not+Found'"
        style="width:100%; height:180px; object-fit:cover; border-radius:6px; margin-bottom:0.5rem;"
      >
      <h3 style="margin:0.5rem 0; color:#004080;">${product.name}</h3>
      <p style="margin:0.3rem 0; color:#333;">${product.description}</p>
      <strong style="color:#222;">${formatINR(product.price)}</strong><br>
      <a href="product.html?id=${product.id}">
        <button style="margin-top:0.5rem; padding: 0.5rem 1rem; background: #004080; color: white; border: none; border-radius: 4px;">View Details</button>
      </a>
    `;

    // Optional extra styling
    div.style.background = "white";
    div.style.border = "1px solid #ccc";
    div.style.padding = "1rem";
    div.style.borderRadius = "8px";
    div.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
    div.style.width = "250px";
    div.style.flex = "1 1 250px";

    productList.appendChild(div);
  });
}

// 🔍 Search
document.getElementById("search-input").addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(keyword) ||
      p.description.toLowerCase().includes(keyword)
  );
  renderProducts(filtered);
});

// 🚀 Load all initially
renderProducts(products);
