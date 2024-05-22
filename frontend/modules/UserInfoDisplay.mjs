let userId;

try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const userEmail = userInfo.email;
    const userName = userInfo.username;
    userId = userInfo.id;
    document.getElementById('userEmail').textContent = `Email: ${userEmail}`;
    document.getElementById('userName').textContent = `Name: ${userName}`;
}
catch(error) {
    console.log(error);
}

export default userId