const name = document.getElementById('name');
const jobRole = document.getElementById('title');
const otherRole = document.getElementById('other-job-role');
const design = document.getElementById('design');
const color = document.getElementById('color');
const inputAll = document.querySelectorAll('input');
const colorOptions = color.children;
color.disabled = true;
// Gives focus to the name field on page load
name.focus();
// Hides the 'Other role' section on page load
otherRole.style.display = 'none';

// Handles the 'Job Role' selection menu
jobRole.onchange = function(e){
    if(e.target.value === 'other'){
        otherRole.style.display = 'block';
        otherRole.focus();
    }
    else {
    otherRole.style.display = 'none';
    }
    
}
// Handles the "T-Shirt" selection menu 
design.addEventListener('change', (e) => {
     color.disabled = false;
     let colorSelected = [];
     for (let i = 0; i < colorOptions.length; i++) {
        const value = e.target.value;
        const theme = colorOptions[i].getAttribute('data-theme');
        if (value === theme) {
            colorOptions[i].disabled = false;
            colorOptions[i].hidden = false;
            colorSelected.push(colorOptions[i]);
            
        } else {
            colorOptions[i].disabled = true;
            colorOptions[i].hidden = true;
        }
     }
      colorSelected[0].selected = true;
 });

// Handles the "Register for Activities" section
const acts = document.getElementById('activities');
const total = document.getElementById('activities-cost');
const actInput = acts.querySelectorAll('input[type = "checkbox"]');
let totalCost = 0;

acts.addEventListener('change', (e) => {
    // this makes sure there are no time conflicts within activities
    // and if so, disables as required
    const conflicts = (activity, action) => {
    let name = activity.getAttribute('name');
    let timeFrame = activity.getAttribute('data-day-and-time');
    let actChecks = acts.querySelectorAll('input[type = "checkbox"]');
    for (let actActive of actChecks){
        if( name !== actActive.getAttribute('name') && timeFrame === actActive.getAttribute('data-day-and-time')){
           if (action === 'disable') {
               actActive.disabled = true;
               actActive.parentElement.classList.add('disabled');
           } else if (action === 'enable'){
                actActive.disabled = false;
                actActive.parentElement.classList.remove('disabled');
           }
        }


        
    }
}


    const dataCost = parseInt(e.target.getAttribute('data-cost'));
    if (e.target.checked){
        conflicts(e.target, 'disable');
        totalCost += dataCost;

    } else {
        conflicts(e.target, 'enable');
        totalCost -= dataCost;
    }

    total.innerHTML = `Total = $${totalCost}`;
});
// Handles the "Payment Info" section
const payment = document.getElementById('payment');
const credit = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');
paypal.hidden = true;
bitcoin.hidden = true;
payment.children[1].setAttribute('selected', true);

payment.addEventListener('change', (e) => {
    const selection = e.target.value;
    if (selection === 'credit-card'){
        credit.hidden = false;
        paypal.hidden = true;
        bitcoin.hidden = true;

    } else if (selection === 'paypal'){
        credit.hidden = true;
        paypal.hidden = false;
        bitcoin.hidden = true;
    } else if (selection === 'bitcoin'){
        credit.hidden = true;
        paypal.hidden = true;
        bitcoin.hidden = false;
    }

});

// Handles form validation
const email = document.getElementById('email');
const cardNum = document.getElementById('cc-num');
const zip = document.getElementById('zip');
const cvv = document.getElementById('cvv');
const form = document.querySelector('form');


const nameValidator = () => {
    const nameValue = name.value;
    const validName = /^[a-zA-Z]+ ?[a-zA-Z]*?$/.test(nameValue);
    if (nameValue === '') {
        name.parentElement.lastElementChild.innerHTML = 'Name field cannot be blank';
        return invalid(name);
    }else {
        if (validName) return valid(name);
    }
    name.parentElement.lastElementChild.innerHTML = 'Name only, no symbols or numbers';
    return invalid(name);

}
const emailValidator = () => {
    const emailValue = email.value;
    const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]/.test(emailValue);
    if (emailValue === '') {
        email.parentElement.lastElementChild.innerHTML = 'Email address cannot be left blank';
        return invalid(email);
    }else {
        if (validEmail) return valid(email);
    email.parentElement.lastElementChild.innerHTML = 'Email address must be formatted correctly';
    return invalid(email);
    }
}
const actValidator = () => {
    const actChecks = acts.querySelectorAll('input[type = "checkbox"]');
    for (const i in actChecks){
        if (actChecks[i].checked) 
        return valid(acts.firstElementChild);
    }
    return invalid(acts.firstElementChild);
}
const cardValidator = () => {
    const cardValue = cardNum.value;
    // This checks between Visa, Amex, Mastercard, Discover, Diners Club, and JCB cards
    // Varifying they all start with the correct digit(s), and have the correct numeric length. 
    // I would have loved to add HTML to the project to show card type text when detected, but alas.
    const validCard = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.test(cardValue);
    const zipValue = zip.value;
    const validZip = /^[0-9]{5}(?:-[0-9]{4})?$/.test(zipValue);
    const cvvValue = cvv.value;
    const validCvv = /^[0-9]{3,4}$/.test(cvvValue);
    const expDate = document.getElementById('exp-month');
    const expYear = document.getElementById('exp-year');

    if(payment.value === 'credit-card'){
        let isTrue = true;
        if (validCard){ 
            valid(cardNum);
        } else { isTrue = invalid(cardNum);}
        if (validZip){
            valid(zip);
        } else { isTrue = invalid(zip);}
        if (validCvv){
            valid(cvv);
        }else {isTrue = invalid(cvv);}
        if (expDate.value === 'Select Date'){
            expDate.parentElement.classList.add('not-valid');
            expDate.parentElement.classList.remove('valid');
            isTrue = invalid(expDate);
        }else {
            expDate.parentElement.classList.add('valid');
            expDate.parentElement.classList.remove('not-valid');
        }
        if (expYear.value === 'Select Year'){
            expYear.parentElement.classList.add('not-valid');
            expYear.parentElement.classList.remove('valid');
            isTrue = invalid(expYear);
        } else{
            expYear.parentElement.classList.add('valid');
            expYear.parentElement.classList.remove('not-valid');
        }
        return isTrue;
    }



    return true;
}
const invalid = (e) => {
    e.parentElement.classList.add("not-valid");
    e.parentElement.classList.remove("valid");
    e.parentElement.lastElementChild.style.display = "block";
    return false;
}
const valid = (e) => {
    e.parentElement.classList.add("valid");
    e.parentElement.classList.remove("not-valid");
    e.parentElement.lastElementChild.style.display = "none";
    return true;
  }
form.addEventListener('submit', (e) => {
    if (!nameValidator()) e.preventDefault();
    if (!emailValidator()) e.preventDefault();
    if (!actValidator()) e.preventDefault();
    if(!cardValidator()) e.preventDefault();

});

// Handles checkbox interactions and focuses/blurs where required
actInput.forEach((input) => {
    input.addEventListener('focus', (e) => {
        e.target.parentElement.className = 'focus';
    });
});
actInput.forEach((input) => {
    input.addEventListener('blur', (e) => {
        e.target.parentElement.className = '';
    });
});
// Handles on the fly error checking for name and email fields
for (let input of inputAll) {
    input.addEventListener('keyup', (e) =>{
        switch (input.getAttribute('name')) {
            case "user-name":
                nameValidator();
                break;
            case 'user-email':
                emailValidator();
                break;
                default:
                    break;
        }
    });
};
