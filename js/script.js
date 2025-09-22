// River Art Website - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (hamburger && navbarMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const menuLinks = document.querySelectorAll('.navbar-menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navbarMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        });
    }
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add background when scrolled
        if (scrollTop > 50) {
            navbar.style.backgroundColor = 'rgba(248, 245, 240, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(248, 245, 240, 0.9)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gallery Image Lightbox (Basic Implementation)
    const galleryImages = document.querySelectorAll('.gallery-image img');
    
    if (galleryImages.length > 0) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="" alt="" class="lightbox-image">
                <div class="lightbox-caption"></div>
                <div class="lightbox-nav">
                    <span class="lightbox-prev"><</span>
                    <span class="lightbox-next">></span>
                </div>
            </div>
        `;
        
        // Add lightbox styles
        const lightboxStyles = document.createElement('style');
        lightboxStyles.textContent = `
            .lightbox {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 2000;
                overflow: hidden;
            }
            
            .lightbox.active {
                display: flex;
                justify-content: center;
                align-items: center;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .lightbox-image {
                display: block;
                max-width: 100%;
                max-height: 80vh;
                border: 5px solid white;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
            }
            
            .lightbox-close {
                position: absolute;
                top: -40px;
                right: 0;
                font-size: 40px;
                color: white;
                cursor: pointer;
                transition: color 0.3s;
            }
            
            .lightbox-close:hover {
                color: var(--gentle-peach);
            }
            
            .lightbox-caption {
                color: white;
                text-align: center;
                margin-top: 15px;
                font-family: var(--lato);
            }
            
            .lightbox-nav {
                position: absolute;
                top: 50%;
                width: 100%;
                transform: translateY(-50%);
                display: flex;
                justify-content: space-between;
            }
            
            .lightbox-prev, .lightbox-next {
                color: white;
                font-size: 40px;
                cursor: pointer;
                padding: 0 20px;
                transition: color 0.3s;
            }
            
            .lightbox-prev:hover, .lightbox-next:hover {
                color: var(--gentle-peach);
            }
        `;
        
        document.head.appendChild(lightboxStyles);
        document.body.appendChild(lightbox);
        
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        const lightboxPrev = lightbox.querySelector('.lightbox-prev');
        const lightboxNext = lightbox.querySelector('.lightbox-next');
        
        let currentImageIndex = 0;
        const galleryItems = Array.from(galleryImages);
        
        // Open lightbox when clicking on gallery image
        galleryItems.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                currentImageIndex = index;
                updateLightbox();
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Navigate images
        function updateLightbox() {
            const currentItem = galleryItems[currentImageIndex];
            const galleryItem = currentItem.closest('.gallery-item');
            const overlay = galleryItem.querySelector('.gallery-overlay');
            
            lightboxImage.src = currentItem.src;
            lightboxImage.alt = currentItem.alt;
            
            if (overlay) {
                const title = overlay.querySelector('h3').textContent;
                const artist = overlay.querySelector('p').textContent;
                lightboxCaption.textContent = `${title} - ${artist}`;
            }
        }
        
        lightboxPrev.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightbox();
        });
        
        lightboxNext.addEventListener('click', function() {
            currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
            updateLightbox();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                lightboxPrev.click();
            } else if (e.key === 'ArrowRight') {
                lightboxNext.click();
            }
        });
    }
    
    // Newsletter Form
    const newsletterForms = document.querySelectorAll('.newsletter-form, .footer-newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // In a real implementation, you would send this data to a server
                // For now, we'll just show a success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Ευχαριστούμε για την εγγραφή σας!';
                successMessage.style.color = 'var(--sage-green)';
                successMessage.style.marginTop = '10px';
                successMessage.style.fontWeight = 'bold';
                
                // Clear previous messages
                const previousMessage = form.parentNode.querySelector('.form-success');
                if (previousMessage) {
                    previousMessage.remove();
                }
                
                // Add success message
                form.parentNode.appendChild(successMessage);
                
                // Clear form
                emailInput.value = '';
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    });
    
    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.gallery-item, .cafe-feature, .event-item, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.gallery-item, .cafe-feature, .event-item, .testimonial');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Contact Form (if it exists on the page)
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Το μήνυμά σας στάλθηκε με επιτυχία!';
            successMessage.style.color = 'var(--sage-green)';
            successMessage.style.marginTop = '20px';
            successMessage.style.fontWeight = 'bold';
            successMessage.style.textAlign = 'center';
            
            // Clear previous messages
            const previousMessage = contactForm.parentNode.querySelector('.form-success');
            if (previousMessage) {
                previousMessage.remove();
            }
            
            // Add success message
            contactForm.parentNode.appendChild(successMessage);
            
            // Clear form
            contactForm.reset();
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Add current year to footer
    const currentYearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    currentYearElements.forEach(element => {
        element.textContent = currentYear;
    });
});