// River Art Website - Events Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Calendar functionality
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    const calendarHeader = document.querySelector('.calendar-header h3');
    const eventDays = document.querySelectorAll('.event-day');
    const selectedEvents = document.querySelector('.selected-events');
    
    if (prevMonthBtn && nextMonthBtn && calendarHeader) {
        // Sample month data for demonstration
        const months = [
            'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος',
            'Ιούλιος', 'Αύγουστος', 'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'
        ];
        
        let currentMonth = 9; // October (0-indexed)
        let currentYear = 2023;
        
        // Update calendar header
        function updateCalendarHeader() {
            calendarHeader.textContent = `${months[currentMonth]} ${currentYear}`;
        }
        
        // Previous month button
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendarHeader();
            updateCalendarDays();
        });
        
        // Next month button
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendarHeader();
            updateCalendarDays();
        });
        
        // Update calendar days (simplified for demo)
        function updateCalendarDays() {
            // In a real implementation, this would update the calendar based on the selected month/year
            // For demo, we'll just keep the existing days
        }
    }
    
    // Event day click functionality
    if (eventDays.length > 0 && selectedEvents) {
        // Sample event data for demonstration
        const eventsData = {
            '15': [
                {
                    time: '10:00 πμ - 1:00 μμ',
                    title: 'Workshop: Ακουαρέλα για Αρχάριους',
                    description: 'Μάθετε τις βασικές τεχνικές της ακουαρέλας με την καλλιτέχνη Ελένη Παπαδοπούλου.',
                    type: 'Workshop',
                    price: '€45'
                }
            ],
            '22': [
                {
                    time: '7:00 μμ - 10:00 μμ',
                    title: 'Βραδιά Ποίησης & Μουσικής',
                    description: 'Απολαύστε ζωντανές αναγνώσεις ποιημάτων και ακουστική μουσική από τοπικούς καλλιτέχνες.',
                    type: 'Πολιτιστική',
                    price: 'Δωρεάν είσοδος'
                }
            ],
            '29': [
                {
                    time: '10:00 πμ - 4:00 μμ',
                    title: 'Workshop: Φωτογραφία Φύσης',
                    description: 'Ελάτε σε ένα διήμερο workshop φωτογραφίας φύσης με τον επαγγελματία φωτογράφο Γιώργο Νικολάου.',
                    type: 'Workshop',
                    price: '€80'
                }
            ]
        };
        
        eventDays.forEach(day => {
            day.addEventListener('click', function() {
                // Remove active class from all days
                eventDays.forEach(d => d.classList.remove('active'));
                
                // Add active class to clicked day
                this.classList.add('active');
                
                // Get day number
                const dayNumber = this.textContent;
                
                // Update selected events
                const events = eventsData[dayNumber];
                if (events) {
                    let eventsHTML = `<h3>Εκδηλώσεις για ${dayNumber} ${months[currentMonth]}</h3>`;
                    
                    events.forEach(event => {
                        eventsHTML += `
                            <div class="selected-event">
                                <div class="event-date-time">
                                    <div class="event-time">${event.time}</div>
                                </div>
                                <div class="event-info">
                                    <h4>${event.title}</h4>
                                    <p>${event.description}</p>
                                    <div class="event-details">
                                        <span class="event-type">${event.type}</span>
                                        <span class="event-price">${event.price}</span>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    
                    selectedEvents.innerHTML = eventsHTML;
                } else {
                    selectedEvents.innerHTML = `
                        <h3>Εκδηλώσεις για ${dayNumber} ${months[currentMonth]}</h3>
                        <p>Δεν υπάρχουν προγραμματισμένες εκδηλώσεις για αυτή την ημέρα.</p>
                    `;
                }
            });
        });
    }
    
    // Event filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    if (filterButtons.length > 0 && eventCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter event cards
                eventCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        
                        // Add animation
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        
                        // Hide card after animation
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Event cards hover effects
    if (eventCards.length > 0) {
        eventCards.forEach(card => {
            const image = card.querySelector('.event-image img');
            
            card.addEventListener('mouseenter', function() {
                if (image) {
                    image.style.transform = 'scale(1.05)';
                }
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                if (image) {
                    image.style.transform = 'scale(1)';
                }
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Category cards hover effects
    const categoryCards = document.querySelectorAll('.category-card');
    
    if (categoryCards.length > 0) {
        categoryCards.forEach(card => {
            const image = card.querySelector('.category-image img');
            
            card.addEventListener('mouseenter', function() {
                if (image) {
                    image.style.transform = 'scale(1.05)';
                }
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                if (image) {
                    image.style.transform = 'scale(1)';
                }
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // Registration steps functionality
    const steps = document.querySelectorAll('.step');
    
    if (steps.length > 0) {
        // Initialize steps
        steps.forEach((step, index) => {
            if (index > 0) {
                step.classList.add('inactive');
            }
        });
        
        // Add click event to steps (for demo purposes)
        steps.forEach((step, index) => {
            step.addEventListener('click', function() {
                // Remove active class from all steps
                steps.forEach(s => {
                    s.classList.remove('active');
                    s.classList.add('inactive');
                });
                
                // Add active class to clicked step
                this.classList.add('active');
                
                // Add inactive class to previous steps
                for (let i = 0; i < index; i++) {
                    steps[i].classList.remove('inactive');
                }
            });
        });
    }
    
    // Event registration form
    const eventRegistrationForm = document.getElementById('eventRegistrationForm');
    
    if (eventRegistrationForm) {
        eventRegistrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send this data to a server
            // For now, we'll just show a success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Η εγγραφή σας υποβλήθηκε με επιτυχία! Θα λάβετε επιβεβαίωση στο email σας σύντομα.';
            successMessage.style.backgroundColor = 'var(--sage-green)';
            successMessage.style.color = 'white';
            successMessage.style.padding = '15px';
            successMessage.style.borderRadius = 'var(--border-radius-md)';
            successMessage.style.marginTop = '20px';
            successMessage.style.textAlign = 'center';
            successMessage.style.fontWeight = 'bold';
            
            // Clear previous messages
            const previousMessage = this.parentNode.querySelector('.form-success');
            if (previousMessage) {
                previousMessage.remove();
            }
            
            // Add success message
            this.parentNode.appendChild(successMessage);
            
            // Clear form
            this.reset();
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Load more functionality
    const loadMoreButton = document.querySelector('.load-more');
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            // In a real implementation, this would load more events from a database
            // For demo, we'll just show a message
            this.textContent = 'Φόρτωση...';
            
            setTimeout(() => {
                this.textContent = 'Όλες οι εκδηλώσεις έχουν φορτωθεί';
                this.disabled = true;
                this.style.opacity = '0.6';
            }, 1500);
        });
    }
    
    // Past events filter functionality
    const yearFilter = document.getElementById('yearFilter');
    const monthFilter = document.getElementById('monthFilter');
    
    if (yearFilter && monthFilter) {
        // Add change event listeners
        yearFilter.addEventListener('change', filterPastEvents);
        monthFilter.addEventListener('change', filterPastEvents);
        
        function filterPastEvents() {
            // In a real implementation, this would filter the past events based on the selected year and month
            // For demo, we'll just log the selected values
            console.log('Year:', yearFilter.value);
            console.log('Month:', monthFilter.value);
        }
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
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.event-card, .category-card, .step, .past-event');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.event-card, .category-card, .step, .past-event');
        
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
    const eventsHeader = document.querySelector('.events-header');
    
    if (eventsHeader) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            eventsHeader.style.backgroundPositionY = `${scrollPosition * parallaxSpeed}px`;
        });
    }
});