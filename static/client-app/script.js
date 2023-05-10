const form = document.querySelector('form');
const formInputs = document.querySelectorAll('.form-input');
const inputName = document.querySelector('#name');
const privacyCheckbox = document.querySelector('.form-checkbox');
const submitBtn = document.querySelector('.form-btn');

function checkInputs() {
    let filledUp = true;

    formInputs.forEach(input => {
        if (input.value === '') {
            filledUp = false;
        }
    });

    if (filledUp && privacyCheckbox.checked) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

function resetInputs() {
    formInputs.forEach(input => {
        input.value = '';
    });
    privacyCheckbox.checked = false;
    submitBtn.disabled = true;
}

formInputs.forEach(input => {
    input.addEventListener('input', checkInputs());
});

privacyCheckbox.addEventListener('change', checkInputs);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    newUser = { name: inputName.value, email: `${inputName.value}@gmail.com` };

    console.log(`submited: ${inputName.value}`);

    resetInputs();
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
    return await fetch(`/user/${userData.user}`, request);
}