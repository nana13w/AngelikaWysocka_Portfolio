      // Highlight nav icon for section in view
      document.addEventListener('DOMContentLoaded', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        function getScrollPos() {
          return Math.max(
            document.documentElement.scrollTop,
            document.body.scrollTop,
            window.scrollY
          );
        }

        function onScroll() {
          let currentSection = sections[0];
          let scrollPos = getScrollPos() + 250; // adjust offset as needed
          sections.forEach(section => {
            if (section.offsetTop <= scrollPos) {
              currentSection = section;
            }
          });
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection.id) {
              link.classList.add('active');
            }
          });
        }
        window.addEventListener('scroll', onScroll);
        document.addEventListener('scroll', onScroll);
        document.documentElement.addEventListener('scroll', onScroll);
        document.body.addEventListener('scroll', onScroll);
        onScroll(); // run on load

        
        // Toggle light/dark mode icon
        const lightModeIcon = document.getElementById('light-mode-toggle');
        const darkModeIcon = document.getElementById('dark-mode-toggle');
        if (lightModeIcon && darkModeIcon) {
          const profileImage = document.querySelector('.profile-image');
          lightModeIcon.addEventListener('click', function() {
            lightModeIcon.hidden = true;
            darkModeIcon.hidden = false;
            document.body.style.backgroundImage = "url('images/light_background.png')";
            document.body.classList.add('light-mode');
            if (profileImage) profileImage.src = 'images/AngelikaWysocka_bright.jpg';
          });
          darkModeIcon.addEventListener('click', function() {
            darkModeIcon.hidden = true;
            lightModeIcon.hidden = false;
            document.body.style.backgroundImage = "url('images/dark_background.png')";
            document.body.classList.remove('light-mode');
            if (profileImage) profileImage.src = 'images/AngelikaWysocka_dark.jpg';
          });
        }

        // Testimonials Carousel
        const slides = document.querySelectorAll('.testimonial-slide');
        const prevButton = document.querySelector('.prev-arrow');
        const nextButton = document.querySelector('.next-arrow');
        let currentSlide = 0;
        function showSlide(index) {
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            // Handle circular navigation
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }
            slides[currentSlide].classList.add('active');
        }
        if (prevButton && nextButton && slides.length > 0) {
            prevButton.addEventListener('click', () => {
                showSlide(currentSlide - 1);
            });
            nextButton.addEventListener('click', () => {
                showSlide(currentSlide + 1);
            });
            showSlide(0);
        }

        // Typewriter effect for .title-item (true typing and erasing)
        startTitleTypewriter();
        // Position timer-container above left-column
        positionTimerContainer();
      });

// Timer for widget layout
function updateTimerWidget() {
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

    // Date number
    timerDate.textContent = now.getDate();

    // Month name
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    timerMonth.textContent = months[now.getMonth()];
}
updateTimerWidget();
setInterval(updateTimerWidget, 1000);

      
// Scroll to top functionality
const scrollToTopButton = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    // Scroll both html and body to top for maximum compatibility
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

modalButton.addEventListener('click', () => {
    modal.classList.add('show-modal');
});

closeButton.addEventListener('click', () => {
    modal.classList.remove('show-modal');
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show-modal');
    }
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

function validateName(name) {
    if (name.trim() === '') {
        return 'Name is required';
    }
    if (name.length < 2) {
        return 'Name must be at least 2 characters long';
    }
    return '';
}

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

function validateMessage(message) {
    if (message.trim() === '') {
        return 'Message is required';
    }
    if (message.length < 10) {
        return 'Message must be at least 10 characters long';
    }
    return '';
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
}

function clearError(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
}

// Real-time validation
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

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameError = validateName(nameInput.value);
    const emailError = validateEmail(emailInput.value);
    const messageError = validateMessage(messageInput.value);
    
    let hasError = false;
    
    if (nameError) {
        showError(nameInput, nameError, nameError);
        hasError = true;
    }
    
    if (emailError) {
        showError(emailInput, emailError, emailError);
        hasError = true;
    }
    
    if (messageError) {
        showError(messageInput, messageError, messageError);
        hasError = true;
    }
    
    if (!hasError) {
        contactForm.reset();
    }
});

// Typewriter effect for .title-item (true typing and erasing)
function startTitleTypewriter() {
    const titles = document.querySelectorAll('.title-item');
    let current = 0;
    const typingSpeed = 50; // ms per character
    const erasingSpeed = 30; // ms per character
    const pauseAfterTyping = 1000;
    const pauseAfterErasing = 300;

    // Hide all titles initially
    titles.forEach(el => {
        el.style.display = 'none';
    });

    function typeTitle(text, el, i = 0, cb) {
        el.style.display = 'inline-block';
        el.textContent = '';
        el.classList.add('typing-active');
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

    function eraseTitle(el, cb) {
        let text = el.textContent;
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

    // Store original text in data-title
    titles.forEach(el => {
        el.setAttribute('data-title', el.textContent);
    });

    loop();
}

// Position timer-container above left-column
function positionTimerContainer() {
  const timer = document.querySelector('.timer-container');
  const leftCol = document.querySelector('.left-column');
  if (timer && leftCol) {
    // Only position on screens wider than 764px
    if (window.innerWidth > 764) {
      const rect = leftCol.getBoundingClientRect();
      timer.style.left = rect.left + 'px';
      timer.style.width = rect.width + 'px';
      timer.style.position = 'fixed';
      timer.style.marginLeft = '0';
      timer.style.marginRight = '0';
    } else {
      // Let CSS handle it on small screens
      timer.style.left = '';
      timer.style.width = '';
      timer.style.position = '';
      timer.style.marginLeft = '';
      timer.style.marginRight = '';
    }
  }
}

window.addEventListener('load', positionTimerContainer);
window.addEventListener('resize', positionTimerContainer);

// Project Images Modal
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.project-image');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    let touchStartY = 0;
    let touchEndY = 0;

    // Open modal
    images.forEach(img => {
        ['click', 'touchend'].forEach(eventType => {
            img.addEventListener(eventType, function(e) {
                e.preventDefault();
                const src = this.getAttribute('data-hover-src') || this.src;
                modal.style.display = 'flex';
                modalImg.src = src;
                document.body.style.overflow = 'hidden';
            });
        });
    });

    // Handle touch events for swipe down to close
    modal.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
    }, false);

    modal.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        if (touchEndY - touchStartY > 50) { // Swipe down
            closeModal();
        }
    }, false);

    // Close modal when clicking anywhere
    modal.addEventListener('click', closeModal);

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        modalImg.src = '';
    }
});