const form = document.querySelector('form');
const formInputs = document.querySelectorAll('.form-input');
const privacyCheckbox = document.querySelector('.form-checkbox');
const submitBtn = document.querySelector('.form-btn');

const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const inputDOB = document.querySelector('#dob');
const inputPhone = document.querySelector('#phone');
const inputPrivacy = document.querySelector('#privacy-agreement');

console.log(formInputs)
let inputStates = {
    hasName: false,
    hasEmail: false,
    hasDOB: false,
    hasPhone: false,
    hasAgree: false,
};
console.log(`inputStates:`);
console.log(inputStates)

const checkInputs = (event) => {
    //let { hasName, hasEmail, hasDOB, hasPhone, hasAgree } = inputStates;
    inputStates.hasName = inputName.value != '' ? true : false;
    inputStates.hasEmail = inputEmail.value != '' ? true : false;
    inputStates.hasDOB = inputDOB.value != '' ? true : false;
    inputStates.hasPhone = inputPhone.value != '' ? true : false;
    inputStates.hasAgree = inputPrivacy.checked;

    console.log(`inputStates:`);
    console.table(inputStates);
    let { hasName, hasEmail, hasDOB, hasPhone, hasAgree } = inputStates

    if (hasName && hasEmail && hasDOB && hasPhone && hasAgree) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
    return event;
}

privacyCheckbox.addEventListener('change', checkInputs);
formInputs.forEach(input => {
    input.addEventListener('input', checkInputs);
});


function resetInputs() {
    formInputs.forEach(input => {
        input.value = '';
    })
    privacyCheckbox.checked = false;
    submitBtn.disabled = true;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    newUser = {
        name: inputName.value,
        email: inputEmail.value,
        dob:inputDOB.value,
        phone:inputPhone.value,
        privacyAgreement: inputPrivacy.checked
    };
    sendUserData(newUser);
    resetInputs();
    console.log(`submited:`);
    console.log(newUser);
});

async function sendUserData(userData) {
    console.log(':D POST');
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    }
    return await fetch(`/user`, request);
}