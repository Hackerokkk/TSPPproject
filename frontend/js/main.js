import userId from "../modules/UserInfoDisplay.mjs";
import { showError, showSuccess } from "../modules/MesErorSuccesDisplay.mjs";

const errorDisplay = document.getElementById('errorDisplay');
const successDisplay = document.getElementById('succesDisplay');
const carSelect = document.getElementById('carSelect');
const deleteCarBtn = document.getElementById('deleteCarBtn');
const updateMilageCarBtn = document.getElementById('updateMilageCarBtn');
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];

let mileageCar;
let oldMileageCar;
let selectedCarId;
let cars;
const intervalVal = await getInterval();

async function updateMilageCar() {
    try {
        if (!selectedCarId) {
            alert('Не вибрано жодного автомобіля');
            return;
        }

        modal.style.display = "block";

        const confirmUpdateBtn = document.getElementById('confirmUpdateBtn');
        confirmUpdateBtn.onclick = async function() {
            const newMileage = document.getElementById('newMileage').value;
            modal.style.display = "none";

            try {
                const response = await fetch(`http://localhost:5000/cars`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ carId: selectedCarId, mileage: parseInt(newMileage) })
                });

                const data = await response.json();
                if (response.ok) {
                    showSuccess(data.message, successDisplay);
                    displayCars();
                } else {
                    showError(data.message, errorDisplay);
                }
            } catch (error) {
                console.error('Помилка оновлення пробігу автомобіля:', error);
            }
        };
    } catch (error) {
        console.error('Помилка оновлення пробігу автомобіля:', error);
    }
}

async function deleteSelectedCar() {
    if (!selectedCarId) {
        alert('Будь ласка, виберіть автомобіль для видалення.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/cars`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ carId: selectedCarId })
        });
        
        const data = await response.json();
        if (response.ok) {
            const delUserData = await delUserIdCar(selectedCarId);
            if (delUserData.success) {
                location.reload();
                showSuccess(data.message, successDisplay);
            } else {
                showError(delUserData.message, errorDisplay);
            }
        } else {
            showError(data.message, errorDisplay);
        }
    } catch (error) {
        console.error('Помилка видалення автомобіля:', error);
    }
}




async function delUserIdCar(selectedCarId) {
    try {
        const response = await fetch(`http://localhost:5000/userCars`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId, carId: selectedCarId})
        });
        const responseData = await response.json();
        if (!response.ok) {
            showError(responseData.message, errorDisplay);
            return { success: false, message: responseData.message };
        }
        return { success: true, message: responseData.message };
    } catch (error) {
        console.error('Помилка видалення індентифікатора автомобіля:', error);
    }
}

async function displayCars() {    
    try {
        const response = await fetch(`http://localhost:5000/userCars?userId=${userId}`);
        cars = await response.json(); 

        carSelect.innerHTML = ''; 
        
        if (cars.length > 0) {
            cars.forEach(car => {
                const option = document.createElement('option');
                option.textContent = `${car.brand} ${car.model} (${car.year}), Пробіг: ${car.mileage}`;
                option.value = car._id; 
                carSelect.appendChild(option);
                
            });
            deleteCarBtn.style.display = 'inline-block';
            updateMilageCarBtn.style.display = 'inline-block';
            calcDisplayCar()
            if (selectedCarId === undefined) {
            updateMileageCarValue()
            }
        } else {
            const h2Text = document.getElementById('text');
            h2Text.textContent = 'Для цього користувача не знайдено автомобілів!';
            h2Text.style.color = 'red';
            carSelect.style.display = 'none';
            const defaultOption = doWcument.createElement('option');
            defaultOption.textContent = 'Для цього користувача не знайдено автомобілі.';
            defaultOption.disabled = true;
            carSelect.appendChild(defaultOption);
            deleteCarBtn.style.display = 'none';
            updateMilageCarBtn.style.display = 'none';
            document.querySelectorAll('.maintenance-info').forEach(infoDiv => {
                infoDiv.style.border = 'none';
            });
        }
    } catch (error) {
        console.error('Error fetching cars:', error);
        const errorOption = document.createElement('option');
        errorOption.textContent = 'Для цього користувача не знайдено автомобілі.';
        errorOption.disabled = true;
        carSelect.appendChild(errorOption);
        deleteCarBtn.style.display = 'none';
        document.querySelectorAll('.maintenance-info').forEach(infoDiv => {
            infoDiv.style.border = 'none';
        });
    }
    carSelect.value = selectedCarId;
}


span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  function calcDisplayCar () {
    const selectedCar = cars.find(car => car._id === selectedCarId);
    if (selectedCar) {
        oldMileageCar = mileageCar;
        mileageCar = selectedCar.mileage;
    }
        calcMaintenanceChange(intervalVal.oil, 'oilChangeInfoDiv', 'масла');
        calcMaintenanceChange(intervalVal.coolant, 'coolantChangeInfoDiv', 'охолоджуючої рідини');
        calcMaintenanceChange(intervalVal.brakePads, 'brakePadsChangeInfoDiv', 'тормозних колодок');
        calcMaintenanceChange(intervalVal.brakeFluid, 'brakeFluidChangeInfoDiv', 'гальмівної рідини');
        calcMaintenanceChange(intervalVal.fuelFilter, 'fuelFilterChangeInfoDiv', 'паливного фільтра');
        calcMaintenanceChange(intervalVal.airFilter, 'airFilterChangeInfoDiv', 'повітряного фільтра');
        calcMaintenanceChange(intervalVal.sparkPlugs, 'sparkPlugsChangeInfoDiv', 'свічок запалювання');
        calcMaintenanceChange(intervalVal.timingChain, 'timingChainChangeInfoDiv', 'ланцюга газорозподільного механізму');
}

function calcMaintenanceChange(interval, divId, itemName) {
    const changeCount = Math.floor(mileageCar / interval);
    const currentMileage = interval * changeCount;
    const infoDiv = document.getElementById(divId);
    let message;
    const remainingDistance = currentMileage + interval - mileageCar;
    if (remainingDistance > 0) {
        if (oldMileageCar !== 0) {
            const oldRemainingDistance = interval * Math.ceil(oldMileageCar / interval) - oldMileageCar;
            if (remainingDistance <= oldRemainingDistance) {
                message = `До наступної заміни ${itemName} залишилося ${remainingDistance} км.`;
            } else {
                message = `Рекомендується замінити ${itemName}.`;
            }
        } else {
            message = `До наступної заміни ${itemName} залишилося ${remainingDistance} км.`;
        }
    } else {
        message = `Рекомендується замінити ${itemName}.`;
    }
    infoDiv.textContent = message;
}

function updateMileageCarValue() {
    selectedCarId = carSelect.value;
    oldMileageCar = 0;
    mileageCar = 0;
    calcDisplayCar(); 
}

async function getInterval() {
    const response = await fetch(`http://localhost:5000/inteval?userId=${userId}`);

    const responseData = await response.json();

    if (!response.ok) {
        showError(responseData.message, errorDisplay);
    }
    return responseData;
}

displayCars();
deleteCarBtn.addEventListener('click', deleteSelectedCar);
updateMilageCarBtn.addEventListener('click', updateMilageCar);
carSelect.addEventListener('change', updateMileageCarValue);
