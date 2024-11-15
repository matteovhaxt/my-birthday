
document.addEventListener('DOMContentLoaded', async () => {
    const guestList = document.getElementById('guest-list');

    try {
        const response = await fetch('https://my-birthday.onrender.com/invites');

        if (!response.ok) {
            throw new Error('Failed to fetch guest list');
        }

        const data = await response.json();
        
        if (data.length > 0) {
            guestList.innerHTML = data.map(guest => `<li>${guest.name}</li>`).join('');
        } else {
            guestList.innerHTML = '<li>No guests yet</li>';
        }
    } catch (error) {
        console.error(error);
    }
});