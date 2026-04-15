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

function openVeg() {
  document.getElementById("vegSection").style.display = "flex";
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
