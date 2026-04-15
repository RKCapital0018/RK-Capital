const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});

document.querySelectorAll(".card, .product, .hero-text").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});
let cart = [];

function openVeg(){
  const vegSection = document.getElementById("vegGrid");

  if(vegSection){
    vegSection.style.display = "block";

    vegSection.scrollIntoView({
      behavior: "smooth"
    });
  } else {
    console.log("vegGrid not found");
  }
}

function closeVeg() {
  document.getElementById("vegSection").style.display = "none";
}

function addToCart(name, price, id) {
  let qty = document.getElementById(id).value;

  if(qty > 0){
    cart.push({
      name: name,
      price: price,
      quantity: qty
    });

    alert(name + " added to cart!");
  } else {
    alert("Please select quantity");
  }
}
let cart = [];

// Open vegetable section
function openVeg(){
  document.getElementById("vegGrid").style.display = "block";

  window.scrollTo({
    top: document.getElementById("vegGrid").offsetTop,
    behavior: "smooth"
  });
}

// Add to cart
function addToCart(name, price, id){
  let qty = document.getElementById(id).value;

  if(qty > 0){
    cart.push({
      name: name,
      price: price,
      qty: qty
    });

    updateCart();
  } else {
    alert("Please select quantity");
  }
}

// Update cart total
function updateCart(){
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
  });

  document.getElementById("cartTotal").innerText = "₹" + total;
}
