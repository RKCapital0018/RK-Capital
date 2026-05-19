// Smooth reveal animation

const cards = document.querySelectorAll(".product-card");

window.addEventListener("scroll", () => {

    cards.forEach(card => {

        const position = card.getBoundingClientRect().top;

        const screenPosition = window.innerHeight / 1.2;

        if(position < screenPosition){
            card.classList.add("active");
        }

    });

});
