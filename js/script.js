      // Highlight nav icon for section in view
      document.addEventListener('DOMContentLoaded', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        // Get max scroll position across browsers
        function getScrollPos() {
          return Math.max(
            document.documentElement.scrollTop,
            document.body.scrollTop,
            window.scrollY
          );
        }

        // Update active nav link based on scroll position
        function onScroll() {
          let currentSection = sections[0];
          let scrollPos = getScrollPos() + 250; // offset of the position
          
          // Find the current section based on scroll position
          sections.forEach(section => {
            if (section.offsetTop <= scrollPos) {
              currentSection = section;
            }
          });
          
          // Update nav links active state
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection.id) {
              link.classList.add('active');
            }
          });
        }

        // Add scroll event listeners for cross-browser support
        window.addEventListener('scroll', onScroll);
        document.addEventListener('scroll', onScroll);
        document.documentElement.addEventListener('scroll', onScroll);
        document.body.addEventListener('scroll', onScroll);
        onScroll(); // run on load

        
        // Toggle light/dark mode icon
        const lightModeIcon = document.getElementById('light-mode-toggle');
        const darkModeIcon = document.getElementById('dark-mode-toggle');
        if (lightModeIcon && darkModeIcon) {
          // Switch profile image
          const profileImage = document.querySelector('.profile-image');
          
          // Switch to light theme and update assets
          lightModeIcon.addEventListener('click', function() {
            lightModeIcon.hidden = true;
            darkModeIcon.hidden = false;
            document.body.style.backgroundImage = "url('images/light_background.webp')";
            document.body.classList.add('light-mode');
            if (profileImage) profileImage.src = 'images/AngelikaWysocka_bright.webp';
          });
          
          // Switch to dark theme and update assets
          darkModeIcon.addEventListener('click', function() {
            darkModeIcon.hidden = true;
            lightModeIcon.hidden = false;
            document.body.style.backgroundImage = "url('images/dark_background.webp')";
            document.body.classList.remove('light-mode');
            if (profileImage) profileImage.src = 'images/AngelikaWysocka_dark.webp';
          });
        }

        // Testimonials Carousel
        const slides = document.querySelectorAll('.testimonial-slide');
        const prevButton = document.querySelector('.prev-arrow');
        const nextButton = document.querySelector('.next-arrow');
        let currentSlide = 0;

        // Handle slide transitions and navigation
        function showSlide(index) {
            // Remove active class from all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Handle circular navigation for continuous flow
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }
            
            // Show the current slide
            slides[currentSlide].classList.add('active');
        }

        // Setup carousel navigation buttons
        if (prevButton && nextButton && slides.length > 0) {
            // Previous slide button
            prevButton.addEventListener('click', () => {
                showSlide(currentSlide - 1);
            });
            
            // Next slide button
            nextButton.addEventListener('click', () => {
                showSlide(currentSlide + 1);
            });
            
            // Show first slide on load
            showSlide(0);
        }

        // Initialize dynamic UI elements
        startTitleTypewriter(); // Start title animation sequence
        positionTimerContainer(); // Set initial timer position

        // Add click handler for talk button
        const talkButton = document.querySelector('.left-column .talk-button');
        if (talkButton) {
            talkButton.addEventListener('click', function(e) {
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Social media icons tooltips
        function setupTooltip(selector, tooltipText, tooltipClass) {
            const element = document.querySelector(selector);
            if (element) {
                let tooltip = null;

                // Create and show tooltip on hover
                element.addEventListener('mouseover', function() {
                    tooltip = document.createElement('div');
                    tooltip.className = tooltipClass;
                    tooltip.textContent = tooltipText;
                    this.appendChild(tooltip);
                });

                // Remove tooltip when mouse leaves
                element.addEventListener('mouseout', function() {
                    if (tooltip) {
                        tooltip.remove();
                        tooltip = null;
                    }
                });
            }
        }

        // Setup social media link tooltips
        setupTooltip('.github-icon-link', 'Open GitHub Profile', 'github-tooltip');
        setupTooltip('.linkedin-icon-link', 'Open LinkedIn Profile', 'linkedin-tooltip');

        // Setup email copy functionality
        const emailLink = document.querySelector('.email-icon-link');
        if (emailLink) {
            let tooltip = null;

            // Create and show copy tooltip
            emailLink.addEventListener('mouseover', function() {
                tooltip = document.createElement('div');
                tooltip.className = 'email-tooltip';
                tooltip.textContent = 'Click to copy email';
                this.appendChild(tooltip);
            });

            // Remove tooltip on mouse out
            emailLink.addEventListener('mouseout', function() {
                if (tooltip) {
                    tooltip.remove();
                    tooltip = null;
                }
            });

            // Handle email copy and feedback
            emailLink.addEventListener('click', function(e) {
                e.preventDefault();
                const email = this.getAttribute('data-email');
                navigator.clipboard.writeText(email).then(() => {
                    if (tooltip) {
                        // Show copy success message
                        tooltip.textContent = 'Email copied!';
                        setTimeout(() => {
                            if (tooltip) {
                                tooltip.textContent = 'Click to copy email';
                            }
                        }, 1500);
                    }
                });
            });
        }
      });

// Timer for widget layout
function updateTimerWidget() {
    // Get timer elements
    const timerTime = document.getElementById('timerTime');
    const timerDate = document.getElementById('timerDate');
    const timerMonth = document.getElementById('timerMonth');
    if (!timerTime || !timerDate || !timerMonth) return;

    const now = new Date();
    // Time (24h) with seconds
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    timerTime.textContent = `${hours}:${minutes}:${seconds}`;

    // Update date display
    timerDate.textContent = now.getDate();

    // Set full month name
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    timerMonth.textContent = months[now.getMonth()];
}

// Start timer updates
updateTimerWidget();
setInterval(updateTimerWidget, 1000);

      
// Scroll to top functionality
const scrollToTopButton = document.getElementById('scrollToTop');

// Toggle button visibility based on scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Handle smooth scroll to top
scrollToTopButton.addEventListener('click', () => {
    // Scroll both elements for cross-browser support
    document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    document.body.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Modal functionality
const modalButton = document.querySelector('.modal-button');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');

// Open modal on button click
modalButton.addEventListener('click', () => {
    modal.classList.add('show-modal');
});

// Close modal on button click
closeButton.addEventListener('click', () => {
    modal.classList.remove('show-modal');
});

// Close modal on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show-modal');
    }
});

// Contact Form Validation
function setupFormValidation(formId, nameId, emailId, messageId, nameErrorId, emailErrorId, messageErrorId) {
    // Get all form elements
    const form = document.getElementById(formId);
    const nameInput = document.getElementById(nameId);
    const emailInput = document.getElementById(emailId);
    const messageInput = document.getElementById(messageId);
    const nameError = document.getElementById(nameErrorId);
    const emailError = document.getElementById(emailErrorId);
    const messageError = document.getElementById(messageErrorId);

    if (!form || !nameInput || !emailInput || !messageInput || !nameError || !emailError || !messageError) {
        return;
    }

    // Validate name input
    function validateName(name) {
        if (name.trim() === '') {
            return 'Name is required';
        }
        if (name.length < 2) {
            return 'Name must be at least 2 characters long';
        }
        return '';
    }

    // Validate email format
    function validateEmail(email) {
        if (email.trim() === '') {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    }

    // Validate message content
    function validateMessage(message) {
        if (message.trim() === '') {
            return 'Message is required';
        }
        if (message.length < 10) {
            return 'Message must be at least 10 characters long';
        }
        return '';
    }

    // Show validation error message
    function showError(input, errorElement, message) {
        input.classList.add('error');
        errorElement.textContent = message;
    }

    // Clear validation error
    function clearError(input, errorElement) {
        input.classList.remove('error');
        errorElement.textContent = '';
    }

    // Setup real-time validation
    nameInput.addEventListener('input', () => {
        const error = validateName(nameInput.value);
        if (error) {
            showError(nameInput, nameError, error);
        } else {
            clearError(nameInput, nameError);
        }
    });

    emailInput.addEventListener('input', () => {
        const error = validateEmail(emailInput.value);
        if (error) {
            showError(emailInput, emailError, error);
        } else {
            clearError(emailInput, emailError);
        }
    });

    messageInput.addEventListener('input', () => {
        const error = validateMessage(messageInput.value);
        if (error) {
            showError(messageInput, messageError, error);
        } else {
            clearError(messageInput, messageError);
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        // Check all fields
        const nameErrorMsg = validateName(nameInput.value);
        const emailErrorMsg = validateEmail(emailInput.value);
        const messageErrorMsg = validateMessage(messageInput.value);
        
        let hasError = false;
        
        // Show any validation errors
        if (nameErrorMsg) {
            showError(nameInput, nameError, nameErrorMsg);
            hasError = true;
        }
        
        if (emailErrorMsg) {
            showError(emailInput, emailError, emailErrorMsg);
            hasError = true;
        }
        
        if (messageErrorMsg) {
            showError(messageInput, messageError, messageErrorMsg);
            hasError = true;
        }
        
        // Stop form submission if errors exist
        if (hasError) {
            e.preventDefault();
        }
    });
}

// Initialise contact forms
document.addEventListener('DOMContentLoaded', function() {
    // Setup main contact form
    setupFormValidation(
        'sectionContactForm',
        'section-name',
        'section-email',
        'section-message',
        'section-nameError',
        'section-emailError',
        'section-messageError'
    );

    // Setup modal contact form
    setupFormValidation(
        'modalContactForm',
        'modal-name',
        'modal-email',
        'modal-message',
        'modal-nameError',
        'modal-emailError',
        'modal-messageError'
    );
});

// Typewriter effect for .title-item (true typing and erasing)
function startTitleTypewriter() {
    // Get all title elements
    const titles = document.querySelectorAll('.title-item');
    let current = 0;
    
    // Animation timing settings
    const typingSpeed = 50; // ms per character
    const erasingSpeed = 30; // ms per character
    const pauseAfterTyping = 1000;
    const pauseAfterErasing = 300;

    // Hide all titles initially
    titles.forEach(el => {
        el.style.display = 'none';
    });

    // Type text animation
    function typeTitle(text, el, i = 0, cb) {
        el.style.display = 'inline-block';
        el.textContent = '';
        el.classList.add('typing-active');
        
        // Add characters one by one
        function typeChar() {
            if (i <= text.length) {
                el.textContent = text.slice(0, i);
                setTimeout(() => typeChar(i + 1), typingSpeed);
                i++;
            } else {
                setTimeout(cb, pauseAfterTyping);
            }
        }
        typeChar();
    }

    // Erase text animation
    function eraseTitle(el, cb) {
        let text = el.textContent;
        
        // Remove characters one by one
        function eraseChar() {
            if (text.length > 0) {
                text = text.slice(0, -1);
                el.textContent = text;
                setTimeout(eraseChar, erasingSpeed);
            } else {
                el.classList.remove('typing-active');
                el.style.display = 'none';
                setTimeout(cb, pauseAfterErasing);
            }
        }
        eraseChar();
    }

    // Main animation loop
    function loop() {
        const el = titles[current];
        const text = el.getAttribute('data-title') || el.textContent;
        typeTitle(text, el, 0, () => {
            eraseTitle(el, () => {
                current = (current + 1) % titles.length;
                loop();
            });
        });
    }

    // Store original text content
    titles.forEach(el => {
        el.setAttribute('data-title', el.textContent);
    });

    // Start animation
    loop();
}

// Position timer-container above left-column
function positionTimerContainer() {
  const timer = document.querySelector('.timer-container');
  const leftCol = document.querySelector('.left-column');
  if (timer && leftCol) {
    // Position for desktop screens
    if (window.innerWidth > 764) {
      const rect = leftCol.getBoundingClientRect();
      timer.style.left = rect.left + 'px';
      timer.style.width = rect.width + 'px';
      timer.style.position = 'fixed';
      timer.style.marginLeft = '0';
      timer.style.marginRight = '0';
    } else {
      // Reset for mobile layout
      timer.style.left = '';
      timer.style.width = '';
      timer.style.position = '';
      timer.style.marginLeft = '';
      timer.style.marginRight = '';
    }
  }
}

// Update timer position on page events
window.addEventListener('load', positionTimerContainer);
window.addEventListener('resize', positionTimerContainer);

// Project Images Modal
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const images = document.querySelectorAll('.project-image');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    let touchStartY = 0;
    let touchEndY = 0;

    // Handle image click/touch
    images.forEach(img => {
        ['click', 'touchend'].forEach(eventType => {
            img.addEventListener(eventType, function(e) {
                if (eventType === 'touchend') {
                    // Check if it's a scroll or tap
                    const touchY = e.changedTouches[0].screenY;
                    if (Math.abs(touchY - touchStartY) < 10) {
                        e.preventDefault();
                    }
                } else {
                    e.preventDefault();
                }
                
                // Show image in modal
                const src = this.getAttribute('data-hover-src') || this.src;
                modal.style.display = 'flex';
                modalImg.src = src;
                document.body.style.overflow = 'hidden';
            });
        });
    });

    // Setup touch events for modal
    modal.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    modal.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        // Close on swipe down
        if (touchEndY - touchStartY > 50) {
            closeModal();
        }
    }, { passive: true });

    // Setup modal close events
    modal.addEventListener('click', closeModal);
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Reset modal state
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        modalImg.src = '';
    }
});