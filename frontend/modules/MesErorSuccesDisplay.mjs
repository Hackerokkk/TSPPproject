export function showError(message, errorDisplay) {
    errorDisplay.textContent = message;
    errorDisplay.style.display = 'inline-block';
    setTimeout(function() {
        errorDisplay.style.display = 'none';
    }, 5000); 
}

export function showSuccess(message, successDisplay) {
    successDisplay.textContent = message;
    successDisplay.style.display = 'inline-block';
    setTimeout(function() {
        successDisplay.style.display = 'none';
    }, 5000); 
}
