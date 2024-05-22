import { showError, showSuccess } from "../modules/MesErorSuccesDisplay.mjs";
import userId from "../modules/UserInfoDisplay.mjs";

const intervalOilInput = document.getElementById("intervalOil");
const intervalCoolantInput = document.getElementById("intervalCoolant");
const intervalBrakePadsInput = document.getElementById("intervalBrakePads");
const intervalBrakeFluidInput = document.getElementById("intervalBrakeFluid");
const intervalFuelFilterInput = document.getElementById("intervalFuelFilter");
const intervalAirFilterInput = document.getElementById("intervalAirFilter");
const intervalSparkPlugsInput = document.getElementById("intervalSparkPlugs");
const intervalTimingChainInput = document.getElementById("intervalTimingChain");
const errorDisplay = document.getElementById("errorDisplay");
const successDisplay = document.getElementById("succesDisplay");
const submitChangeIntervalBtn = document.getElementById("submitChangeInterval");

let intervalId;

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const intervalData = await getInterval();
        intervalId = intervalData._id;
        populateIntervalFields(intervalData);
    } catch (error) {
        showError(error.message, document.getElementById("errorDisplay"));
    }
});

async function getInterval() {
    const response = await fetch(`http://localhost:5000/inteval?userId=${userId}`);
    const responseData = await response.json();

    if (!response.ok) {
        throw new Error(responseData.message);
    }
    return responseData;
}

function populateIntervalFields(intervalData) {
    intervalOilInput.value = intervalData.oil;
    intervalCoolantInput.value = intervalData.coolant;
    intervalBrakePadsInput.value = intervalData.brakePads;
    intervalBrakeFluidInput.value = intervalData.brakeFluid;
    intervalFuelFilterInput.value = intervalData.fuelFilter;
    intervalAirFilterInput.value = intervalData.airFilter;
    intervalSparkPlugsInput.value = intervalData.sparkPlugs;
    intervalTimingChainInput.value = intervalData.timingChain;
}

submitChangeIntervalBtn.addEventListener("click", async () => {
    try {
        const intervalData = {
            intervalId: intervalId,
            intervals: {
                oil: intervalOilInput.value,
                coolant: intervalCoolantInput.value,
                brakePads: intervalBrakePadsInput.value,
                brakeFluid: intervalBrakeFluidInput.value,
                fuelFilter: intervalFuelFilterInput.value,
                airFilter: intervalAirFilterInput.value,
                sparkPlugs: intervalSparkPlugsInput.value,
                timingChain: intervalTimingChainInput.value
            }
        };

        const response = await fetch('http://localhost:5000/inteval', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(intervalData)
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message);
        }

        showSuccess(responseData.message, successDisplay);
    } catch (error) {
        console.log(error);
        showError(error.message, errorDisplay);
    }
});
