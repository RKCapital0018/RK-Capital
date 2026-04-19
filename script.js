console.log("JS Loaded");

let cart = [];

// Open vegetable grid
function openVeg(){
  const veg = document.getElementById("vegGrid");
  veg.style.display = "block";

  veg.scrollIntoView({
    behavior: "smooth"
  });
}

// Add to cart
function addToCart(name, price, id){
  let qty = document.getElementById(id).value;

  if(qty > 0){
    cart.push({
      name,
      price,
      qty
    });

    updateCart();
  } else {
    alert("Please select quantity");
  }
}

// Update cart
function updateCart(){
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
  });

  document.getElementById("cartTotal").innerText = "₹" + total;
}
