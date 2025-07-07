// About Hero Section Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animated counter for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // Animation duration in ms
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            
            let current = start;
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(counter);
                    current = target;
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Intersection Observer to trigger animation when section is visible
    const heroSection = document.querySelector('.about-hero');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(heroSection);
    
    // Smooth scroll for the explore button
    const scrollBtn = document.querySelector('.btn-scroll');
    
    if (scrollBtn) {
        scrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Parallax effect for background
    const heroBackground = document.querySelector('.hero-background');
    
    window.addEventListener('scroll', function() {
        if (heroBackground) {
            const scrollPosition = window.pageYOffset;
            heroBackground.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });
});

// Timeline Section Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animation on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const animateOnScroll = () => {
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    };
    
    // Set initial state for animation
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Image hover effect enhancement
    const timelineCards = document.querySelectorAll('.timeline-card');
    
    timelineCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            card.style.transform = `translateY(-5px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-5px) rotateY(0) rotateX(0)';
        });
    });
});

// Team Section Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animation on scroll
    const teamMembers = document.querySelectorAll('.team-member');
    
    const animateOnScroll = () => {
        teamMembers.forEach((member, index) => {
            const memberPosition = member.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (memberPosition < screenPosition) {
                setTimeout(() => {
                    member.style.opacity = '1';
                    member.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    };
    
    // Set initial state for animation
    teamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(50px)';
        member.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Image hover effect enhancement
    const memberImages = document.querySelectorAll('.member-image');
    
    memberImages.forEach(image => {
        image.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            image.querySelector('img').style.transform = `scale(1.05) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        image.addEventListener('mouseleave', () => {
            image.querySelector('img').style.transform = 'scale(1.05) rotateY(0) rotateX(0)';
        });
    });
});

// Values Section Interactions
document.addEventListener('DOMContentLoaded', function() {
    const valuesOrbit = document.querySelector('.values-orbit');
    const valueCards = document.querySelectorAll('.value-card');
    
    // Animate cards on scroll
    const animateOnScroll = () => {
        const sectionPosition = valuesOrbit.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            valuesOrbit.style.opacity = '1';
            valuesOrbit.style.transform = 'translateY(0)';
            
            valueCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, index * 200);
            });
        }
    };
    
    // Set initial state for animation
    valuesOrbit.style.opacity = '0';
    valuesOrbit.style.transform = 'translateY(50px)';
    valuesOrbit.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    valueCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Mobile touch interaction for orbit
    let isDragging = false;
    let startX, scrollLeft;
    
    if (window.matchMedia("(max-width: 992px)").matches) {
        valuesOrbit.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - valuesOrbit.offsetLeft;
            scrollLeft = valuesOrbit.scrollLeft;
        });
        
        valuesOrbit.addEventListener('mouseleave', () => {
            isDragging = false;
        });
        
        valuesOrbit.addEventListener('mouseup', () => {
            isDragging = false;
        });
        
        valuesOrbit.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - valuesOrbit.offsetLeft;
            const walk = (x - startX) * 2;
            valuesOrbit.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        valuesOrbit.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - valuesOrbit.offsetLeft;
            scrollLeft = valuesOrbit.scrollLeft;
        });
        
        valuesOrbit.addEventListener('touchend', () => {
            isDragging = false;
        });
        
        valuesOrbit.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].pageX - valuesOrbit.offsetLeft;
            const walk = (x - startX) * 2;
            valuesOrbit.scrollLeft = scrollLeft - walk;
        });
    }
    
    // Card hover effects
    valueCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.matchMedia("(min-width: 993px)").matches) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const angleX = (y - centerY) / 20;
                const angleY = (centerX - x) / 20;
                
                card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.05)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (window.matchMedia("(min-width: 993px)").matches) {
                card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
            }
        });
    });
});

