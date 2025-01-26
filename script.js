document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('main section');

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            navButtons.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active-section'));

            // Add active class to clicked button and corresponding section
            btn.classList.add('active');
            const sectionId = btn.id.replace('Btn', 'Section');
            document.getElementById(sectionId).classList.add('active-section');
        });
    });

    // Contact Management
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    let contacts = JSON.parse(localStorage.getItem('emergencyContacts')) || [];

    function renderContacts() {
        contactList.innerHTML = '';
        contacts.forEach((contact, index) => {
            const contactItem = document.createElement('div');
            contactItem.classList.add('contact-item');
            contactItem.innerHTML = `
                <span>${contact.name} - ${contact.phone}</span>
                <button onclick="removeContact(${index})">Remove</button>
            `;
            contactList.appendChild(contactItem);
        });
    }

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('contactName');
        const phoneInput = document.getElementById('contactPhone');

        const newContact = {
            name: nameInput.value,
            phone: phoneInput.value
        };

        contacts.push(newContact);
        localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
        
        nameInput.value = '';
        phoneInput.value = '';
        renderContacts();
    });

    window.removeContact = (index) => {
        contacts.splice(index, 1);
        localStorage.setItem('emergencyContacts', JSON.stringify(contacts));
        renderContacts();
    };

    // Location Tracking
    const startTrackingBtn = document.getElementById('startTracking');
    const stopTrackingBtn = document.getElementById('stopTracking');
    const locationDisplay = document.getElementById('locationDisplay');
    let trackingInterval;

    startTrackingBtn.addEventListener('click', () => {
        if (!trackingInterval) {
            trackingInterval = setInterval(updateLocation, 60000);
            updateLocation();
            locationDisplay.textContent = 'Tracking active...';
        }
    });

    stopTrackingBtn.addEventListener('click', () => {
        if (trackingInterval) {
            clearInterval(trackingInterval);
            trackingInterval = null;
            locationDisplay.textContent = 'No active tracking';
        }
    });

    function updateLocation() {
        const timestamp = new Date().toLocaleString();
        const mockLocation = `
            Latitude: ${(Math.random() * 180 - 90).toFixed(4)}
            Longitude: ${(Math.random() * 360 - 180).toFixed(4)}
            Time: ${timestamp}
        `;
        
        locationDisplay.textContent = mockLocation;
    }

    // Panic Button
    const panicButton = document.getElementById('panicButton');
    const safetyStatus = document.getElementById('safetyStatus');

    panicButton.addEventListener('click', () => {
        safetyStatus.textContent = 'EMERGENCY ALERT!';
        safetyStatus.classList.remove('safe');
        safetyStatus.classList.add('danger');

        // Simulate alert to contacts
        contacts.forEach(contact => {
            console.log(`Alert sent to ${contact.name} at ${contact.phone}`);
        });

        // Stop tracking
        if (trackingInterval) {
            stopTrackingBtn.click();
        }

        // Optional: You could add more emergency response logic here
        alert('Emergency alert activated! Contacts have been notified.');
    });

    // Initialize contacts on page load
    renderContacts();
});