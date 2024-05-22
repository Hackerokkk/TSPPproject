document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.clear();
    window.location.href = "index.html";
});