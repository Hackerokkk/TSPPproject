import { showError, showSuccess } from "../modules/MesErorSuccesDisplay.mjs";
import userId from "../modules/UserInfoDisplay.mjs";

document.addEventListener('DOMContentLoaded', function () {
    const submitAddCar = document.querySelector('#submitAddCar');
    const errorDisplay = document.getElementById('errorDisplay');
    const successDisplay = document.getElementById('succesDisplay');

    submitAddCar.addEventListener('click', handleSubmitAddCar);
    
    async function handleSubmitAddCar() {
        const { brand, model, mileage, year } = getFormData();
        
        try {
            const carData = await addCar({userId, brand, model, mileage, year });
            if (carData.success) {
                const { carId } = carData;

                const updateUserResponse = await updateUserCar(userId, carId);
                const {message} = updateUserResponse;
        
                if (updateUserResponse.success) {
                    showSuccess(message, successDisplay);
                }
            }
        } catch (error) {
            console.error('Помилка:', error);
        }
    }

    function getFormData() {
        return {
            brand: document.querySelector('#carsBrand').value,
            model: document.querySelector('#carsModel').value,
            mileage: document.querySelector('#carsMileage').value,
            year: document.querySelector('#carsYear').value
        };
    }

    async function addCar(carData) {
        const response = await fetch('http://localhost:5000/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carData)
        });
    
        const responseData = await response.json();
    
        if (!response.ok) {
            showError(responseData.message, errorDisplay);
            return { success: false, message: responseData.message };
        }
        return { success: true, carId: responseData.cars._id, message: responseData.message };
    }
    
    

    async function updateUserCar(userId, carId) {
        const response = await fetch('http://localhost:5000/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, carId })
        });

        const responseData = await response.json();
    
        if (!response.ok) {
            showError(responseData.message, errorDisplay);
            return { success: false, message: responseData.message };
        }
        return { success: true,  message: responseData.message};
    }
});
