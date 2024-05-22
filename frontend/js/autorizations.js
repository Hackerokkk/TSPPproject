import { showError, showSuccess } from "../modules/MesErorSuccesDisplay.mjs";

document.addEventListener('DOMContentLoaded', function () {
    const submitAutor = document.querySelector('#submitAutor');
    const errorDisplay = document.getElementById('errorDisplay');
    const successDisplay = document.getElementById('succesDisplay');

    submitAutor.addEventListener('click', async () => {
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            });          
            const data = await response.json();
            console.log(data); 
            if (!response.ok) {
                showError(data.message, errorDisplay);
            } else {
                const MesAutorTrue = "Авторизація успішна";
                successDisplay.textContent = MesAutorTrue;
                showSuccess(MesAutorTrue, successDisplay);
                localStorage.setItem('userInfo', JSON.stringify(data));
                window.location.href = '/frontend/main.html';
            }
        } catch (error) {
            console.error('Помилка:', error);
        }
    });
});
