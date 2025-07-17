// Reservations Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Form submission
    const bookingForm = document.getElementById('bookingForm');
    const confirmationModal = document.getElementById('confirmationModal');
    const closeModal = document.querySelector('.close-modal');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            const name = document.getElementById('name').value;
            
            // Format date
            const formattedDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            });
            
            // Set confirmation details
            document.getElementById('confirmationDetails').innerHTML = `
                <strong>${name}</strong>, your reservation for <strong>${guests} ${guests === '1' ? 'person' : 'people'}</strong> 
                on <strong>${formattedDate}</strong> at <strong>${formatTime(time)}</strong> has been confirmed.
            `;
            
            // Show modal
            confirmationModal.style.display = 'flex';
            
            // Reset form
            bookingForm.reset();
        });
    }
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            confirmationModal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });
    
    // Format time to AM/PM
    function formatTime(time) {
        const [hours, minutes] = time.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes} ${period}`;
    }
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Initialize Google Map
    function initMap() {
        const location = { lat: 40.7128, lng: -74.0060 }; // NYC coordinates
        const map = new google.maps.Map(document.getElementById('restaurantMap'), {
            zoom: 15,
            center: location,
            styles: [
                {
                    "featureType": "poi",
                    "stylers": [{"visibility": "off"}]
                },
                {
                    "featureType": "transit",
                    "stylers": [{"visibility": "off"}]
                }
            ]
        });
        
        new google.maps.Marker({
            position: location,
            map: map,
            title: 'Foodites Restaurant',
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
            }
        });
    }
    
    // Animation on scroll
    const sections = document.querySelectorAll('section');
    
    const animateOnScroll = () => {
        sections.forEach(section => {
            const sectionPosition = section.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (sectionPosition < screenPosition) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
