// River Art Website - Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <h3>Ευχαριστούμε για το μήνυμά σας!</h3>
                <p>Λάβαμε το μήνυμά σας και θα απαντήσουμε το συντομότερο δυνατό.</p>
                <p>Συνήθως απαντάμε εντός 24-48 ωρών κατά τις εργάσιμες ημέρες.</p>
            `;
            successMessage.style.backgroundColor = 'var(--sage-green)';
            successMessage.style.color = 'white';
            successMessage.style.padding = '20px';
            successMessage.style.borderRadius = 'var(--border-radius-md)';
            successMessage.style.marginTop = '20px';
            successMessage.style.textAlign = 'center';
            
            // Clear previous messages
            const previousMessage = this.parentNode.querySelector('.form-success');
            if (previousMessage) {
                previousMessage.remove();
            }
            
            // Add success message
            this.parentNode.appendChild(successMessage);
            
            // Clear form
            this.reset();
            
            // Remove message after 10 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transition = 'opacity 0.5s';
                
                setTimeout(() => {
                    successMessage.remove();
                }, 500);
            }, 10000);
        });
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            
            // Set initial state
            answer.style.maxHeight = '0';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease';
            
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    faqItem.querySelector('.faq-answer').style.maxHeight = '0';
                    faqItem.querySelector('.faq-icon').textContent = '+';
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.textContent = '-';
                }
            });
        });
    }
    
    // Map actions
    const mapActions = document.querySelectorAll('.map-actions button');
    
    if (mapActions.length > 0) {
        mapActions.forEach(button => {
            button.addEventListener('click', function() {
                if (this.textContent === 'Προσθέστε στα Αγαπημένα') {
                    // In a real implementation, this would add the location to favorites
                    this.textContent = 'Προστέθηκε στα Αγαπημένα';
                    this.style.backgroundColor = 'var(--sage-green)';
                    this.disabled = true;
                    
                    // Show a message
                    const message = document.createElement('div');
                    message.className = 'favorite-message';
                    message.textContent = 'Προστέθηκε στα αγαπημένα!';
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
                }
            });
        });
    }
    
    // Contact methods hover effects
    const contactMethods = document.querySelectorAll('.contact-method');
    
    if (contactMethods.length > 0) {
        contactMethods.forEach(method => {
            method.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });
            
            method.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Info cards hover effects
    const infoCards = document.querySelectorAll('.info-card');
    
    if (infoCards.length > 0) {
        infoCards.forEach(card => {
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
    
    // Planning tips hover effects
    const tips = document.querySelectorAll('.tip');
    
    if (tips.length > 0) {
        tips.forEach(tip => {
            tip.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });
            
            tip.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    
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
    const animatedElements = document.querySelectorAll('.contact-method, .info-card, .faq-item, .tip');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.contact-method, .info-card, .faq-item, .tip');
        
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
    const contactHeader = document.querySelector('.contact-header');
    
    if (contactHeader) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            contactHeader.style.backgroundPositionY = `${scrollPosition * parallaxSpeed}px`;
        });
    }
    
    // Form validation
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    if (formInputs.length > 0) {
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                // Remove error styling when user starts typing again
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    const errorMsg = this.parentNode.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
        });
    }
    
    function validateInput(input) {
        let isValid = true;
        let errorMessage = '';
        
        // Remove previous error styling
        input.classList.remove('error');
        const previousErrorMsg = input.parentNode.querySelector('.error-message');
        if (previousErrorMsg) {
            previousErrorMsg.remove();
        }
        
        // Validate based on input type
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            errorMessage = 'Αυτό το πεδίο είναι υποχρεωτικό';
        } else if (input.type === 'email' && input.value.trim()) {
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                isValid = false;
                errorMessage = 'Παρακαλώ εισάγετε ένα έγκυρο email';
            }
        } else if (input.type === 'tel' && input.value.trim()) {
            // Simple phone validation for Greek numbers
            const phoneRegex = /^(\+30|0)?(69\d{8}|2\d{9})$/;
            if (!phoneRegex.test(input.value.trim())) {
                isValid = false;
                errorMessage = 'Παρακαλώ εισάγετε έναν έγκυρο αριθμό τηλεφώνου';
            }
        }
        
        // Show error if not valid
        if (!isValid) {
            input.classList.add('error');
            
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.textContent = errorMessage;
            errorMsg.style.color = 'var(--dusty-rose)';
            errorMsg.style.fontSize = '14px';
            errorMsg.style.marginTop = '5px';
            
            input.parentNode.appendChild(errorMsg);
        }
        
        return isValid;
    }
    
    // Validate form on submit
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isFormValid = true;
            
            formInputs.forEach(input => {
                if (!validateInput(input)) {
                    isFormValid = false;
                }
            });
            
            if (!isFormValid) {
                e.preventDefault();
                
                // Scroll to first error
                const firstError = document.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
});