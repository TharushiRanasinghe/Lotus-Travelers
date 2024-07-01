var nameError=document.getElementById('name-error');
var emailError=document.getElementById('email-error');
var submitError=document.getElementById('submit-error');
var rateError=document.getElementById('rate-error');
var improveError = document.getElementById('improve-error');
var ratingError = document.getElementById('rating-number-error');
var referralError = document.getElementById('referral-error');
var deliveryError = document.getElementById('delivery-error');
var submitError = document.getElementById('submit-error');

function validateName(){
    var name = document.getElementById('contact-name').value;

    if(name.length ==0){
        nameError.innerHTML = 'Name is required';
        return false;
    }
    if(!name.match(/^[A-za-z]*\s{1}[A-Za-z]*$/)){
        nameError.innerHTML = 'Write full name';
        return false; 
    }
    nameError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}

function validateEmail(){
    var email = document.getElementById('contact-email').value;

    if(email.length == 0){
        emailError.innerHTML = 'Email is required';
        return false;
    }
    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        emailError.innerHTML = 'Email is invalid';
        return false; 
    }
    emailError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}

function validateRating(){
    var rating = document.querySelector('input[name="rating"]:checked');
    if (!rating) {
         // If no rating is selected, show error message and return false
        ratingError.innerHTML = 'Please select a rating';
        return false;
    } else {
        // If a rating is selected, clear error message and return true
        ratingError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
        return true;
    }
}

function validateRate(){
    var rate = document.getElementById('contact-rate').value;

    if(rate.length == 0){
        rateError.innerHTML = 'rating is required';
        return false;
    }
    rateError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
} 


function validateReferral() {
    var referral = document.getElementById('referral').value;
  
    if (referral === '') {
      referralError.innerHTML = 'Please select a referral option';
      return false;
    }
    referralError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}

function validateDelivery(){
    var delivery = document.querySelector('input[name="delivery"]:checked');
    if(!delivery){
        deliveryError.innerHTML = 'Please select yes or no';
        return false;
    } else {
        // If a rating is selected, clear error message and return true
        deliveryError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
        return true;
    }
}

function validateImprove(){
    var improve = document.getElementById('contact-improve').value;

    if(improve.length == 0){
        improveError.innerHTML = 'idea is required';
        return false;
    }
    improveError.innerHTML = '<i class="fa-sharp fa-solid fa-circle-check"></i>';
    return true;
}    

function validateForm(){

    if(!validateName() || !validateEmail() || !validateRating() || !validateRate() || !validateReferral() || !validateDelivery() || !validateImprove()){
        submitError.style.display = 'block';
        submitError.innerHTML = 'Please fix error to submit';
        setTimeout(function(){submitError.style.display = 'none';}, 3000);
        return false;   
    }else{
        myButton();
        submitError.style.display = 'none';
        return true;
    }    
}

function myButton(){
    alert("Thank you, Your form has been submitted successfully !!");
    document.getElementById('contact-form').reset();
}
