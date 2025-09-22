// River Art Website - Cafe Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Menu category navigation
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuCategoryContents = document.querySelectorAll('.menu-category-content');
    
    if (menuCategories.length > 0 && menuCategoryContents.length > 0) {
        menuCategories.forEach(category => {
            category.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all categories
                menuCategories.forEach(cat => cat.classList.remove('active'));
                
                // Add active class to clicked category
                this.classList.add('active');
                
                // Get target category ID
                const targetId = this.getAttribute('href').substring(1);
                
                // Hide all category contents
                menuCategoryContents.forEach(content => {
                    content.style.display = 'none';
                });
                
                // Show target category content
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.style.display = 'block';
                }
                
                // Smooth scroll to menu section
                const menuSection = document.getElementById('menu');
                if (menuSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = menuSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Menu item hover effects
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Special cards hover effects
    const specialCards = document.querySelectorAll('.special-card');
    
    if (specialCards.length > 0) {
        specialCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const image = this.querySelector('.special-image img');
                if (image) {
                    image.style.transform = 'scale(1.05)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const image = this.querySelector('.special-image img');
                if (image) {
                    image.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // Philosophy images hover effect
    const philosophyImages = document.querySelectorAll('.philosophy-image');
    
    if (philosophyImages.length > 0) {
        philosophyImages.forEach(image => {
            image.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });
            
            image.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Cafe events hover effect
    const eventItems = document.querySelectorAll('.event-item');
    
    if (eventItems.length > 0) {
        eventItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.backgroundColor = 'rgba(245, 209, 199, 0.3)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.backgroundColor = '';
            });
        });
    }
    
    // Visit cards hover effect
    const visitCards = document.querySelectorAll('.visit-card');
    
    if (visitCards.length > 0) {
        visitCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Menu download functionality
    const menuDownloadLink = document.querySelector('.menu-download a');
    
    if (menuDownloadLink) {
        menuDownloadLink.addEventListener('click', function(e) {
            // In a real implementation, this would download a PDF file
            // For demo, we'll just show a message
            e.preventDefault();
            
            const message = document.createElement('div');
            message.className = 'download-message';
            message.textContent = 'Σε μια πραγματική εφαρμογή, αυτό θα κατέβαζε το PDF του μενού.';
            message.style.position = 'fixed';
            message.style.bottom = '20px';
            message.style.right = '20px';
            message.style.backgroundColor = 'var(--sage-green)';
            message.style.color = 'white';
            message.style.padding = '15px 20px';
            message.style.borderRadius = 'var(--border-radius-md)';
            message.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            message.style.zIndex = '1000';
            message.style.opacity = '0';
            message.style.transform = 'translateY(20px)';
            message.style.transition = 'opacity 0.3s, transform 0.3s';
            
            document.body.appendChild(message);
            
            // Animate in
            setTimeout(() => {
                message.style.opacity = '1';
                message.style.transform = 'translateY(0)';
            }, 10);
            
            // Remove after 3 seconds
            setTimeout(() => {
                message.style.opacity = '0';
                message.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    document.body.removeChild(message);
                }, 300);
            }, 3000);
        });
    }
    
    // Newsletter form in footer
    const newsletterForm = document.querySelector('.footer-newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
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
                const previousMessage = this.parentNode.querySelector('.form-success');
                if (previousMessage) {
                    previousMessage.remove();
                }
                
                // Add success message
                this.parentNode.appendChild(successMessage);
                
                // Clear form
                emailInput.value = '';
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if this is a menu category link (handled separately)
            if (this.classList.contains('menu-category')) {
                return;
            }
            
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
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.cafe-feature, .menu-item, .special-card, .event-item, .visit-card, .philosophy-image');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.cafe-feature, .menu-item, .special-card, .event-item, .visit-card, .philosophy-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Add parallax effect to hero section
    const cafeHeader = document.querySelector('.cafe-header');
    
    if (cafeHeader) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            cafeHeader.style.backgroundPositionY = `${scrollPosition * parallaxSpeed}px`;
        });
    }
    
    // Menu sidebar remains static - no sticky behavior
    const menuSidebar = document.querySelector('.menu-sidebar');
    
    if (menuSidebar) {
        // Ensure sidebar stays in its natural position
        menuSidebar.style.position = 'relative';
        menuSidebar.style.top = '';
        menuSidebar.style.width = '';
        menuSidebar.style.zIndex = '';
        menuSidebar.style.backgroundColor = '';
    }
});