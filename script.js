window.addEventListener("scroll", function(){
  document.querySelector("header").classList.toggle("sticky", window.scrollY > 50);
});

 
