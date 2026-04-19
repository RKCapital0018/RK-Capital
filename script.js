console.log("JS Loaded");
let cart = [];

// Show products
function openVeg(){
  document.getElementById("vegGrid").style.display = "block";
}

// Add to cart
function addToCart(name, price, id){
  let qty = document.getElementById(id).value;

  if(qty > 0){
    cart.push({name, price, qty});
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
        <span>${item.name} (${item.qty})</span>
        <span>₹${item.price * item.qty}</span>
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
  alert("Order placed!");
}

// Search
function searchProducts(val){
  let items = document.querySelectorAll(".product-item");

  items.forEach(item => {
    let name = item.innerText.toLowerCase();
    item.style.display = name.includes(val.toLowerCase()) ? "block" : "none";
  });
}

const fadeElements = document.querySelectorAll(".product-card, .category, .testimonial");

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

fadeElements.forEach(el => {
  el.classList.add("fade-in");
  fadeObserver.observe(el);
});
