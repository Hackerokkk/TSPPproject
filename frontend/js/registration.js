import { showError, showSuccess } from "../modules/MesErorSuccesDisplay.mjs";

document.addEventListener('DOMContentLoaded', function () {
    const submitReg = document.querySelector('#submitReg');
    const errorDisplay = document.getElementById('errorDisplay');
    const successDisplay = document.getElementById('succesDisplay');

    submitReg.addEventListener('click', async () => {
        const username = document.querySelector('#username').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        try {
            const response = await fetch('http://localhost:5000/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password})
            });          
            const data = await response.json();
            console.log(data); 
            if (!response.ok) {
                showError(data.message, errorDisplay);
            } else {
                showSuccess(data.message, successDisplay);
                setTimeout(function() {
                window.location.href = 'index.html';
                }, 5000); 
            }
        } catch (error) {
            console.error('Помилка:', error);
        }
    });
});
