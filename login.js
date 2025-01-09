// Sample user data (you can replace this with a real authentication system)
const users = [
    { username: 'markus', password: '123' },
    { username: 'max', password: '123' },
    { username: 'lasse', password: '123' }
];

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Set login flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        // Redirect to the main application page
        window.location.href = 'index.html';
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
});