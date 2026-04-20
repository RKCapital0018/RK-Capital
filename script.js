console.log("JS Loaded");
let cart = [];

// Show products
function openVeg(){
  document.getElementById("vegGrid").style.display = "block";
}

// Add to cart
function addToCart(name, price, id){
  let qty = document.getElementById(id).value;

  // Get image from product card
  let productCard = document.getElementById(id).closest(".product-card");
  let img = productCard.querySelector("img").src;

  if(qty > 0){
    cart.push({
      name,
      price,
      qty,
      img
    });

    updateCart();
  }
}

// Update cart
function updateCart(){
  let total = 0;
  let html = "";

  cart.forEach(item => {
    total += item.price * item.qty;

    html += `
      <div class="cart-item">
        <img src="${item.img}" class="cart-img">

        <div class="cart-details">
          <h4>${item.name}</h4>
          <p>₹${item.price} × ${item.qty}</p>
        </div>

        <div class="cart-price">
          ₹${item.price * item.qty}
        </div>
      </div>
    `;
  });

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("cartTotal").innerText = "₹" + total;
  document.getElementById("cartTotalPage").innerText = "₹" + total;
}

// Toggle cart
function toggleCart(){
  document.getElementById("cartPage").classList.toggle("active");
}

// Checkout
function checkout(){
  alert("🎉 Order Confirmed!\nYour fresh groceries will arrive tomorrow morning.");
}

// Search
function searchProducts(val){
  let items = document.querySelectorAll(".product-item");

  items.forEach(item => {
    let name = item.innerText.toLowerCase();
    item.style.display = name.includes(val.toLowerCase()) ? "block" : "none";
  });
}

const items = document.querySelectorAll(".product-card, .category, .testimonial");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

items.forEach(el => {
  el.classList.add("fade-in");
  observer.observe(el);
});

fadeElements.forEach(el => {
  el.classList.add("fade-in");
  fadeObserver.observe(el);
});
