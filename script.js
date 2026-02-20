const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const loanTenure = document.getElementById("loanTenure");

const emiText = document.getElementById("emi");
const totalInterestText = document.getElementById("totalInterest");
const totalPaymentText = document.getElementById("totalPayment");

const loanAmountValue = document.getElementById("loanAmountValue");
const interestRateValue = document.getElementById("interestRateValue");
const loanTenureValue = document.getElementById("loanTenureValue");

let emiChart;

function calculateEMI() {
    let P = parseFloat(loanAmount.value);
    let R = parseFloat(interestRate.value) / 12 / 100;
    let N = parseFloat(loanTenure.value) * 12;

    let EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    let totalPayment = EMI * N;
    let totalInterest = totalPayment - P;

    emiText.innerText = "₹ " + EMI.toFixed(0);
    totalInterestText.innerText = "₹ " + totalInterest.toFixed(0);
    totalPaymentText.innerText = "₹ " + totalPayment.toFixed(0);

    updateChart(P, totalInterest);
}

function updateChart(principal, interest) {
    const ctx = document.getElementById("emiChart").getContext("2d");

    if (emiChart) {
        emiChart.destroy();
    }

    emiChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Principal", "Interest"],
            datasets: [{
                data: [principal, interest],
                backgroundColor: ["#0a1f44", "#d4af37"]
            }]
        },
        options: {
            responsive: true
        }
    });
}

function updateValues() {
    loanAmountValue.innerText = loanAmount.value;
    interestRateValue.innerText = interestRate.value;
    loanTenureValue.innerText = loanTenure.value;
    calculateEMI();
}

loanAmount.addEventListener("input", updateValues);
interestRate.addEventListener("input", updateValues);
loanTenure.addEventListener("input", updateValues);

updateValues();

// TRUST COUNTER ANIMATION - FINAL FIXED VERSION

document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector(".trust-section");
    const counters = document.querySelectorAll(".counter");

    if (!section || counters.length === 0) return;

    let counterStarted = false;

    const startCounter = () => {
        if (counterStarted) return;
        counterStarted = true;

        counters.forEach(counter => {
            counter.innerText = "0";

            const target = +counter.getAttribute("data-target");
            const increment = target / 100;

            const updateCounter = () => {
                const current = +counter.innerText;

                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.innerText = target;
                }
            };

            updateCounter();
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter();
                }
            });
        },
        { threshold: 0.4 }
    );

    observer.observe(section);

});
// Run animation when section appears on screen
window.addEventListener("scroll", function () {
    const section = document.querySelector(".trust-section");

    if (!section) return;

    const sectionPosition = section.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (sectionPosition < screenPosition - 100) {
        startCounterAnimation();
    }
});
