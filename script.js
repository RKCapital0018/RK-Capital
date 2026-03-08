function applyLoan(){
alert("Loan Application feature coming soon!");
}

document.querySelectorAll('nav a').forEach(anchor => {

anchor.addEventListener('click', function(e) {

e.preventDefault();

document.querySelector(this.getAttribute('href')).scrollIntoView({
behavior:'smooth'
});

});

});


/* COUNTER */

const counters=document.querySelectorAll('.counter');

counters.forEach(counter=>{

const update=()=>{

const target=+counter.getAttribute('data-target');
const count=+counter.innerText;

const speed=50;
const increment=target/speed;

if(count<target){

counter.innerText=Math.ceil(count+increment);

setTimeout(update,40);

}else{

counter.innerText=target;

}

};

update();

});


/* TESTIMONIAL SLIDER */

let index=0;

setInterval(()=>{

let testimonials=document.querySelectorAll(".testimonial");

testimonials.forEach(t=>t.classList.remove("active"));

index++;

if(index>=testimonials.length){
index=0;
}

testimonials[index].classList.add("active");

},4000);


/* DARK MODE */

document.getElementById("themeToggle").onclick=function(){

document.body.classList.toggle("dark-mode");

}
/* LOAN ELIGIBILITY CHECKER */

function checkEligibility(){

let salary=document.getElementById("salary").value;
let emi=document.getElementById("existingEMI").value;
let tenure=document.getElementById("tenure").value;

let disposable=salary*0.5-emi;

let eligibleLoan=disposable*tenure;

document.getElementById("eligibilityResult").innerHTML=
"Estimated Eligible Loan Amount: ₹"+eligibleLoan.toFixed(0);

}


/* EMI CALCULATOR */

function calculateEMI(){

let P=document.getElementById("loanAmount").value;
let R=document.getElementById("interestRate").value/12/100;
let N=document.getElementById("loanTenure").value;

let EMI=P*R*Math.pow((1+R),N)/(Math.pow((1+R),N)-1);

document.getElementById("emiResult").innerHTML=
"Monthly EMI: ₹"+EMI.toFixed(2);

}


/* OPEN FORM */

function openLoanForm(){
document.getElementById("loanModal").style.display="flex";
}

/* CLOSE FORM */

function closeLoanForm(){
document.getElementById("loanModal").style.display="none";
}

/* FORM SUBMIT */

document.getElementById("loanForm").addEventListener("submit",function(e){

e.preventDefault();

alert("Thank you! Our team will contact you shortly.");

document.getElementById("loanModal").style.display="none";

});
