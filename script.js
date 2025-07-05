// DOM Elements
const mainLogo = document.getElementById('mainLogo');
const stickyLogo = document.getElementById('stickyLogo');
const stickyNav = document.getElementById('stickyNav');
const heroSection = document.getElementById('hero');

// Scroll-based logo behavior
function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroHeight = heroSection.offsetHeight;
    const scrollThreshold = heroHeight * 0.3; // Show sticky elements after 30% of hero
    
    if (scrollTop > scrollThreshold) {
        // Show sticky logo and nav
        stickyLogo.classList.add('show');
        stickyNav.classList.add('show');
        
        // Scale down main logo
        if (mainLogo) {
            mainLogo.style.transform = 'scale(0.8)';
            mainLogo.style.opacity = '0.8';
        }
    } else {
        // Hide sticky logo and nav
        stickyLogo.classList.remove('show');
        stickyNav.classList.remove('show');
        
        // Reset main logo
        if (mainLogo) {
            mainLogo.style.transform = 'scale(1)';
            mainLogo.style.opacity = '1';
        }
    }
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for sticky nav
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .mentor-card, .testimonial-card, .step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Mobile menu toggle (if needed)
function setupMobileMenu() {
    // Add mobile menu functionality if needed
    // For now, we'll hide the menu on mobile as per the responsive design
}

// Initialize all functions
function init() {
    // Set up event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', () => {
        setupSmoothScrolling();
        animateOnScroll();
        setupMobileMenu();
    });
    
    // Run initial scroll check
    handleScroll();
}

// Start the application
init();

// WhatsApp button interaction
document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function(e) {
            // Add a small bounce animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});

// Add loading animation for images
function setupImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Initialize image loading
document.addEventListener('DOMContentLoaded', setupImageLoading);

// Form submission handling (if needed)
function setupFormHandling() {
    // Add form validation or submission logic here if needed
    // For now, we're using a Google Form link
}

// Testimonial slider (simple version for mobile)
function setupTestimonialSlider() {
    const testimonialGrid = document.querySelector('.testimonials-grid');
    
    if (window.innerWidth <= 768) {
        // Add touch/swipe functionality for mobile if needed
        // For now, we'll keep the basic grid layout
    }
}

// Handle window resize
window.addEventListener('resize', function() {
    setupTestimonialSlider();
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
