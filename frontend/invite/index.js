document.getElementById('invite-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const messageDiv = document.getElementById('message');
    
    try {
        const response = await fetch('https://my-birthday.onrender.com/invites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });

        if (!response.ok) {
            throw new Error('Failed to send invite');
        }
        
        const data = await response.json();
        
        messageDiv.textContent = data.message;
        messageDiv.style.display = 'block';

        setTimeout(() => {
            window.location.href = '/my-birthday/frontend';
        }, 3000);
    } catch (error) {
        console.error(error);
        messageDiv.textContent = 'An error occurred';
        messageDiv.style.display = 'block';
    }

    return false;
});