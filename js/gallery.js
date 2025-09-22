// River Art Website - Gallery Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const artworkItems = document.querySelectorAll('.artwork-item');
    
    if (filterButtons.length > 0 && artworkItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter artwork items
                artworkItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        
                        // Add animation
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        
                        // Hide item after animation
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Sort functionality
    const sortSelect = document.getElementById('sort');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortValue = this.value;
            const artworkGrid = document.querySelector('.artwork-grid');
            const items = Array.from(artworkItems);
            
            // Sort items based on selected value
            let sortedItems;
            
            switch(sortValue) {
                case 'newest':
                    // In a real implementation, you would sort by date
                    // For demo, we'll just reverse the current order
                    sortedItems = items.reverse();
                    break;
                case 'artist':
                    // Sort by artist name
                    sortedItems = items.sort((a, b) => {
                        const artistA = a.querySelector('.artwork-info p:nth-child(2)').textContent;
                        const artistB = b.querySelector('.artwork-info p:nth-child(2)').textContent;
                        return artistA.localeCompare(artistB);
                    });
                    break;
                case 'popular':
                    // In a real implementation, you would sort by popularity
                    // For demo, we'll use a random order
                    sortedItems = items.sort(() => Math.random() - 0.5);
                    break;
                default:
                    sortedItems = items;
            }
            
            // Clear the grid
            artworkGrid.innerHTML = '';
            
            // Add sorted items back to grid
            sortedItems.forEach((item, index) => {
                // Add animation delay
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                // Add item back to grid
                artworkGrid.appendChild(item);
                
                // Animate item in
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        });
    }
    
    // Artwork lightbox
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    
    if (viewDetailsButtons.length > 0) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'artwork-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <div class="lightbox-image-container">
                    <img src="" alt="" class="lightbox-image">
                </div>
                <div class="lightbox-details">
                    <h2 class="lightbox-title"></h2>
                    <div class="lightbox-meta">
                        <p class="lightbox-artist"></p>
                        <p class="lightbox-medium"></p>
                        <p class="lightbox-dimensions"></p>
                        <p class="lightbox-year"></p>
                        <p class="lightbox-price"></p>
                    </div>
                    <div class="lightbox-description">
                        <h3>Περιγραφή</h3>
                        <p class="lightbox-description-text"></p>
                    </div>
                    <div class="lightbox-actions">
                        <button class="btn btn-primary inquire-btn">Ενδιαφέρομαι για αυτό το Έργο</button>
                        <button class="btn btn-secondary artist-profile-btn">Προβολή Προφίλ Καλλιτέχνη</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add lightbox styles
        const lightboxStyles = document.createElement('style');
        lightboxStyles.textContent = `
            .artwork-lightbox {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                z-index: 2000;
                overflow-y: auto;
                padding: 20px;
            }
            
            .artwork-lightbox.active {
                display: flex;
                justify-content: center;
                align-items: flex-start;
            }
            
            .lightbox-content {
                background-color: var(--warm-off-white);
                border-radius: var(--border-radius-lg);
                max-width: 1200px;
                width: 100%;
                position: relative;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            .lightbox-close {
                position: absolute;
                top: 15px;
                right: 15px;
                font-size: 30px;
                color: var(--deep-charcoal);
                cursor: pointer;
                z-index: 1;
                transition: color var(--transition-fast);
            }
            
            .lightbox-close:hover {
                color: var(--dusty-rose);
            }
            
            .lightbox-image-container {
                width: 50%;
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: var(--soft-beige);
            }
            
            .lightbox-image {
                max-width: 100%;
                max-height: 80vh;
                border: 5px solid white;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            .lightbox-details {
                width: 50%;
                padding: 40px;
                display: flex;
                flex-direction: column;
            }
            
            .lightbox-title {
                font-size: 28px;
                margin-bottom: 20px;
                color: var(--deep-charcoal);
            }
            
            .lightbox-meta p {
                margin-bottom: 8px;
                font-size: 16px;
                color: var(--warm-gray);
            }
            
            .lightbox-price {
                font-weight: 700;
                color: var(--sage-green);
                font-size: 18px;
                margin: 15px 0;
            }
            
            .lightbox-description {
                margin-top: 20px;
            }
            
            .lightbox-description h3 {
                font-size: 20px;
                margin-bottom: 10px;
                color: var(--deep-charcoal);
            }
            
            .lightbox-description-text {
                line-height: 1.6;
            }
            
            .lightbox-actions {
                margin-top: 30px;
                display: flex;
                gap: 15px;
            }
            
            @media (max-width: 768px) {
                .lightbox-content {
                    flex-direction: column;
                }
                
                .lightbox-image-container,
                .lightbox-details {
                    width: 100%;
                }
                
                .lightbox-image-container {
                    padding: 10px;
                }
                
                .lightbox-details {
                    padding: 20px;
                }
                
                .lightbox-actions {
                    flex-direction: column;
                }
            }
        `;
        
        document.head.appendChild(lightboxStyles);
        document.body.appendChild(lightbox);
        
        const lightboxImage = lightbox.querySelector('.lightbox-image');
        const lightboxTitle = lightbox.querySelector('.lightbox-title');
        const lightboxArtist = lightbox.querySelector('.lightbox-artist');
        const lightboxMedium = lightbox.querySelector('.lightbox-medium');
        const lightboxDimensions = lightbox.querySelector('.lightbox-dimensions');
        const lightboxYear = lightbox.querySelector('.lightbox-year');
        const lightboxPrice = lightbox.querySelector('.lightbox-price');
        const lightboxDescription = lightbox.querySelector('.lightbox-description-text');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        const inquireBtn = lightbox.querySelector('.inquire-btn');
        const artistProfileBtn = lightbox.querySelector('.artist-profile-btn');
        
        // Artwork data (in a real implementation, this would come from a database)
        const artworkData = {
            1: {
                title: "Αφηρημένη Σύνθεση",
                artist: "Γιώργος Νικολάου",
                medium: "Λάδι σε καμβά",
                dimensions: "70cm x 50cm",
                year: "2023",
                price: "€380",
                description: "Αυτή η αφηρημένη σύνθεση εξερευνά τη σχέση between χρώμα και μορφή, δημιουργώντας μια δυναμική και συναισθηματική εμπειρία για τον θεατή. Ο καλλιτέχνης χρησιμοποιεί πλούσιες υφές και έντονες χρωματικούς συνδυασμούς για να μεταφέρει μια αίσθηση κίνησης και ενέργειας."
            },
            2: {
                title: "Φυσικές Μορφές",
                artist: "Ελένη Παπαδοπούλου",
                medium: "Φωτογραφία",
                dimensions: "60cm x 40cm",
                year: "2023",
                price: "€220",
                description: "Αυτή η φωτογραφική σειρά αιχμαλωτίζει την ομορφιά της φυσικής αρχιτεκτονικής του Καρπενησίου. Μέσα από προσεκτική σύνθεση και φωτισμό, η καλλιτέχνης αποκαλύπτει τις κρυμμένες λεπτομέρειες και τις οργανικές γραμμές που καθορίζουν το τοπίο."
            },
            3: {
                title: "Οργανική Μορφή",
                artist: "Νίκος Παπαδόπουλος",
                medium: "Ξύλο και μέταλλο",
                dimensions: "45cm x 30cm x 25cm",
                year: "2022",
                price: "€650",
                description: "Αυτή η γλυπτική σύνθεση συνδυάζει ξύλο και μέταλλο για να δημιουργήσει μια οργανική μορφή που εμπνέεται από τα φυσικά σχήματα του Καρπενησίου. Ο καλλιτέχνης εξερευνά την ένθεση και την αντίθεση μεταξύ των δύο υλικών, δημιουργώντας ένα έργο που είναι ταυτόχρονα τραχύ και λείο, ζεστό και ψυχρό."
            },
            4: {
                title: "Αστικές Αναζητήσεις",
                artist: "Ανδρέας Κωνσταντίνου",
                medium: "Μικτά μέσα",
                dimensions: "80cm x 60cm",
                year: "2023",
                price: "€420",
                description: "Αυτή η σειρά μικτών μέσων εξερευνά την αστική τοπία του Καρπενησίου, συνδυάζοντας φωτογραφία, ζωγραφική και κολάζ για να δημιουργήσει μια πολύεπίπεδη αφήγηση. Ο καλλιτέχνης χρησιμοποιεί αυτά τα μέσα για να καταγράψει την αλλαγή και την εξέλιξη της πόλης με την πάροδο του χρόνου."
            },
            5: {
                title: "Θαλασσινά Όνειρα",
                artist: "Σοφία Αλεξίου",
                medium: "Ακουαρέλα",
                dimensions: "55cm x 75cm",
                year: "2023",
                price: "€350",
                description: "Αυτή η ακουαρέλα σειρά εμπνέεται από τα θαλάσσια τοπία της περιοχής του Καρπενησίου. Η καλλιτέχνης χρησιμοποιεί τη διαφάνεια και τη ρευστότητα της ακουαρέλας για να δημιουργήσει μια αίσθηση κίνησης και ροής, αιχμαλωτίζοντας τη φωτεινότητα και το χρώμα του νερού."
            },
            6: {
                title: "Ψηφιακή Αφηρημένη",
                artist: "Δημήτρης Παπαδόπουλος",
                medium: "Ψηφιακή τέχνη",
                dimensions: "Παραμετροποιήσιμο",
                year: "2023",
                price: "€280",
                description: "Αυτή η ψηφιακή αφηρημένη σύνθεση εξερευνά τα όρια της ψηφιακής τέχνης, χρησιμοποιώντας προηγμένες τεχνικές για να δημιουργήσει πολύπλοκα μοτίβα και υφές. Ο καλλιτέχνης πειραματίζεται με χρώμα, φωτεινότητα και μορφή για να δημιουργήσει μια δυναμική και συναρπαστική οπτική εμπειρία."
            },
            7: {
                title: "Ασπρόμαυρη Σύνθεση",
                artist: "Κατερίνα Ιωάννου",
                medium: "Φωτογραφία",
                dimensions: "50cm x 70cm",
                year: "2022",
                price: "€250",
                description: "Αυτή η ασπρόμαυρη φωτογραφική σειρά εστιάζει στη δομή και τη μορφή, αφαιρώντας το χρώμα για να αποκαλύψει την ουσία του αντικειμένου. Η καλλιτέχνης χρησιμοποιεί φως και σκιά για να δημιουργήσει δραματική αντίθεση και βάθος, μεταφέροντας μια αίσθηση διαχρονικότητας και ευελιξίας."
            },
            8: {
                title: "Χρωματιστή Εκφραση",
                artist: "Πάνος Γεωργίου",
                medium: "Ακρυλική σε καμβά",
                dimensions: "90cm x 70cm",
                year: "2023",
                price: "€520",
                description: "Αυτή η ζωγραφική σύνθεση είναι μια έκφραση του συναισθήματος και της ενέργειας, χρησιμοποιώντας έντονα χρώματα και δυναμικές πινελιές για να δημιουργήσει μια αίσθηση κίνησης και ζωντάνιας. Ο καλλιτέχνης εστιάζει στη συναισθηματική δύναμη του χρώματος, χρησιμοποιώντας το ως μέσο έκφρασης και επικοινωνίας."
            }
        };
        
        // Open lightbox when clicking on view details
        viewDetailsButtons.forEach((button, index) => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const artworkItem = this.closest('.artwork-item');
                const imageSrc = artworkItem.querySelector('img').src;
                const artworkId = index + 1; // IDs start from 1
                
                // Get artwork data
                const artwork = artworkData[artworkId];
                
                if (artwork) {
                    // Populate lightbox with artwork data
                    lightboxImage.src = imageSrc;
                    lightboxTitle.textContent = artwork.title;
                    lightboxArtist.textContent = `Καλλιτέχνης: ${artwork.artist}`;
                    lightboxMedium.textContent = `Μέσο: ${artwork.medium}`;
                    lightboxDimensions.textContent = `Διαστάσεις: ${artwork.dimensions}`;
                    lightboxYear.textContent = `Έτος: ${artwork.year}`;
                    lightboxPrice.textContent = `Τιμή: ${artwork.price}`;
                    lightboxDescription.textContent = artwork.description;
                    
                    // Show lightbox
                    lightbox.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
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
        
        // Inquire button functionality
        inquireBtn.addEventListener('click', function() {
            // In a real implementation, this would open an inquiry form
            alert('Σε μια πραγματική εφαρμογή, αυτό θα άνοιγε μια φόρμα ερωτήματος για αυτό το έργο.');
        });
        
        // Artist profile button functionality
        artistProfileBtn.addEventListener('click', function() {
            // In a real implementation, this would navigate to the artist's profile
            alert('Σε μια πραγματική εφαρμογή, αυτό θα πήγαινε στο προφίλ του καλλιτέχνη.');
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });
    }
    
    // Add to favorites functionality
    const favoriteButtons = document.querySelectorAll('.add-to-favorites');
    
    if (favoriteButtons.length > 0) {
        favoriteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle favorite state
                this.classList.toggle('active');
                
                // Change appearance based on state
                if (this.classList.contains('active')) {
                    this.style.color = 'var(--dusty-rose)';
                    this.textContent = '♥';
                } else {
                    this.style.color = 'var(--warm-gray)';
                    this.textContent = '♥';
                }
                
                // In a real implementation, you would save this to a database or local storage
            });
        });
    }
    
    // Load more functionality
    const loadMoreButton = document.querySelector('.load-more');
    
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function() {
            // In a real implementation, this would load more artwork from a database
            // For demo, we'll just show a message
            this.textContent = 'Φόρτωση...';
            
            setTimeout(() => {
                this.textContent = 'Όλα τα έργα έχουν φορτωθεί';
                this.disabled = true;
                this.style.opacity = '0.6';
            }, 1500);
        });
    }
    
    // Accordion functionality for exhibitions
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const accordionItem = this.parentNode;
                const accordionContent = accordionItem.querySelector('.accordion-content');
                const accordionIcon = this.querySelector('.accordion-icon');
                
                // Toggle active class
                accordionItem.classList.toggle('active');
                
                // Toggle content visibility
                if (accordionItem.classList.contains('active')) {
                    accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
                    accordionIcon.textContent = '-';
                } else {
                    accordionContent.style.maxHeight = '0';
                    accordionIcon.textContent = '+';
                }
            });
        });
        
        // Initialize accordion state
        accordionHeaders.forEach(header => {
            const accordionItem = header.parentNode;
            const accordionContent = accordionItem.querySelector('.accordion-content');
            const accordionIcon = header.querySelector('.accordion-icon');
            
            // Set initial max-height to 0
            accordionContent.style.maxHeight = '0';
            accordionContent.style.overflow = 'hidden';
            accordionContent.style.transition = 'max-height 0.3s ease';
        });
    }
    
    // Additional works hover effect
    const additionalWorks = document.querySelectorAll('.additional-work');
    
    if (additionalWorks.length > 0) {
        additionalWorks.forEach(work => {
            work.addEventListener('mouseenter', function() {
                const overlay = this.querySelector('.work-overlay');
                if (overlay) {
                    overlay.style.opacity = '1';
                }
            });
            
            work.addEventListener('mouseleave', function() {
                const overlay = this.querySelector('.work-overlay');
                if (overlay) {
                    overlay.style.opacity = '0';
                }
            });
        });
    }
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.artwork-item, .artist-card, .exhibition-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.artwork-item, .artist-card, .exhibition-card');
        
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
});