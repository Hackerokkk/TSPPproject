import { showError, showSuccess } from "../modules/MesErorSuccesDisplay.mjs";
import userId from "../modules/UserInfoDisplay.mjs";

document.addEventListener('DOMContentLoaded', function () {
    const submitAddReminder = document.getElementById('submitAddReminder');
    const errorDisplay = document.getElementById('errorDisplay');
    const successDisplay = document.getElementById('succesDisplay');
    const carSelect = document.getElementById('carSelect');

    submitAddReminder.addEventListener('click', handleSubmitAddReminder);
    
    let cars;
    let selectedCarId;

    async function handleSubmitAddReminder() {
        const { serviceTitle, serviceCenter, carsBrand, serviceDate, serviceTime } = getFormData();
        
        try {
            const reminderData = await addReminder({userId, serviceTitle, serviceCenter, carsBrand, serviceDate, serviceTime });
            if (reminderData.success) {
                    showSuccess(reminderData.message, successDisplay);
            }
        } catch (error) {
            showError(reminderData.message, errorDisplay);
            console.error('Помилка:', error);
        }
    }

    function getFormData() {
        return {
            serviceTitle: document.getElementById('serviceTitle').value,
            serviceCenter: document.getElementById('serviceCenter').value,
            carsBrand: document.getElementById('carSelect').value,
            serviceDate: document.getElementById('serviceDate').value,
            serviceTime: document.getElementById('serviceTime').value
        };
    }

    async function addReminder(reminderData) {
        const response = await fetch('http://localhost:5000/reminder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reminderData)
        });
    
        const responseData = await response.json();
        console.log(responseData);
        if (!response.ok) {
            return { success: false, message: responseData.message };
        }
        return { success: true, remId: responseData.reminder._id, message: responseData.message };
    }

    async function displayCars() {    
        try {
            const response = await fetch(`http://localhost:5000/userCars?userId=${userId}`);
            cars = await response.json(); 
    
            carSelect.innerHTML = ''; 
            
            if (cars.length > 0) {
                cars.forEach(car => {
                    const option = document.createElement('option');
                    option.textContent = `${car.brand} ${car.model}`;
                    option.value = `${car.brand} ${car.model}`;
                    carSelect.appendChild(option);
                    
                });
            } else {
                const defaultOption = doWcument.createElement('option');
                defaultOption.textContent = 'Для цього користувача не знайдено автомобілі.';
                defaultOption.disabled = true;
                carSelect.appendChild(defaultOption);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
            const errorOption = document.createElement('option');
            errorOption.textContent = 'Для цього користувача не знайдено автомобілі.';
            errorOption.disabled = true;
            carSelect.appendChild(errorOption);
        }
        carSelect.value = selectedCarId;
    }

    displayCars();
});
