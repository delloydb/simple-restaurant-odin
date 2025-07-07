// Mobile menu toggle functionality for navbar
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.navbar .hamburger');
    const navLinks = document.querySelector('.navbar .nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger to X
            const bars = document.querySelectorAll('.navbar .bar');
            if(navLinks.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars[0].style.transform = 'rotate(0) translate(0)';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'rotate(0) translate(0)';
            }
        });
    }
});

//hero section
// Hero Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const sliderImages = document.querySelectorAll('.slider-image');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds
    
    // Function to change slide
    function changeSlide(slideIndex) {
        // Remove active class from all slides and dots
        sliderImages.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        sliderImages[slideIndex].classList.add('active');
        dots[slideIndex].classList.add('active');
        currentSlide = slideIndex;
    }
    
    // Auto slide change
    function autoSlide() {
        const nextSlide = (currentSlide + 1) % sliderImages.length;
        changeSlide(nextSlide);
    }
    
    // Set interval for auto sliding
    let slideTimer = setInterval(autoSlide, slideInterval);
    
    // Add click event to dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            changeSlide(slideIndex);
            
            // Reset the auto slide timer
            clearInterval(slideTimer);
            slideTimer = setInterval(autoSlide, slideInterval);
        });
    });
    
    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideTimer);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideTimer = setInterval(autoSlide, slideInterval);
    });
});

//menu section
// Menu Preview Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-item');
            const itemPrice = this.getAttribute('data-price');
            
            // Visual feedback
            this.innerHTML = '<span>Added!</span>';
            this.style.backgroundColor = '#4CAF50';
            this.style.borderColor = '#4CAF50';
            
            // Reset after animation
            setTimeout(() => {
                this.innerHTML = `<span>Add to Order</span>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 4V20M4 12H20" stroke="currentColor" stroke-width="2"/>
                                </svg>`;
                this.style.backgroundColor = '';
                this.style.borderColor = '';
            }, 1500);
            
            // In a real implementation, you would add to cart here
            console.log(`Added ${itemName} ($${itemPrice}) to cart`);
            
            // You would typically call a function like:
            // addToCart(itemName, itemPrice);
        });
    });
    
    // Animation on scroll
    const menuItems = document.querySelectorAll('.menu-item');
    
    const animateOnScroll = () => {
        menuItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// About Section Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animation on scroll
    const aboutSection = document.querySelector('.about-section');
    const featureItems = document.querySelectorAll('.feature-item');
    
    const animateOnScroll = () => {
        const sectionPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            aboutSection.style.opacity = '1';
            aboutSection.style.transform = 'translateY(0)';
            
            featureItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    };
    
    // Set initial state for animation
    aboutSection.style.opacity = '0';
    aboutSection.style.transform = 'translateY(50px)';
    aboutSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    featureItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Image hover effect enhancement
    const imageContainer = document.querySelector('.image-container');
    const mainImage = document.querySelector('.main-image');
    
    imageContainer.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        mainImage.style.transform = `scale(1.03) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    imageContainer.addEventListener('mouseleave', () => {
        mainImage.style.transform = 'scale(1.03) rotateY(0) rotateX(0)';
    });
});

// Testimonials Slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    const intervalTime = 5000; // 5 seconds
    let slideInterval;

    // Function to show current slide
    function showSlide(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }

    // Next slide function
    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showSlide(currentIndex);
    }

    // Previous slide function
    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        showSlide(currentIndex);
    }

    // Auto slide
    function startSlider() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Event listeners
    nextBtn.addEventListener('click', function() {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', function() {
        prevSlide();
        resetInterval();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
            resetInterval();
        });
    });

    // Reset timer on manual slide change
    function resetInterval() {
        clearInterval(slideInterval);
        startSlider();
    }

    // Initialize slider
    showSlide(0);
    startSlider();

    // Pause on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    sliderContainer.addEventListener('mouseleave', () => {
        startSlider();
    });

    // Animation on scroll
    const testimonialSection = document.querySelector('.testimonials-section');
    
    const animateOnScroll = () => {
        const sectionPosition = testimonialSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            testimonialSection.style.opacity = '1';
            testimonialSection.style.transform = 'translateY(0)';
        }
    };
    
    // Set initial state for animation
    testimonialSection.style.opacity = '0';
    testimonialSection.style.transform = 'translateY(50px)';
    testimonialSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});

// Footer Newsletter Form
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            // Simple validation
            if (emailInput.value === '' || !emailInput.value.includes('@')) {
                emailInput.style.border = '1px solid #e63946';
                return;
            }
            
            // In a real implementation, you would submit the form here
            console.log('Newsletter subscription:', emailInput.value);
            
            // Visual feedback
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            submitBtn.style.backgroundColor = '#4CAF50';
            
            // Reset after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                `;
                submitBtn.style.backgroundColor = '';
                emailInput.value = '';
                emailInput.style.border = 'none';
            }, 3000);
        });
    }
    
    // Animation on scroll
    const footer = document.querySelector('.footer');
    
    const animateOnScroll = () => {
        const sectionPosition = footer.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            footer.style.opacity = '1';
            footer.style.transform = 'translateY(0)';
        }
    };
    
    // Set initial state for animation
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(50px)';
    footer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});