// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const currentYear = document.getElementById('currentYear');
const contactForm = document.getElementById('contactForm');
const scrollIndicator = document.querySelector('.scroll-indicator');

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
    observer.observe(el);
});

// Formspree Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Form validation
    if (!name || !email || !message) {
        showAlert('Please fill in all fields before submitting.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
    }
    
    // Your Formspree endpoint - REPLACE WITH YOUR ACTUAL FORMSPREE ENDPOINT
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mrepkooy';
    
    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
    
    try {
        // Send data to Formspree
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
                _subject: `New Portfolio Message from ${name}`,
                _replyto: email,
                _format: 'plain'
            })
        });
        
        if (response.ok) {
            // Success message
            showAlert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon at ${email}.`, 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset form labels
            document.querySelectorAll('.form-group label').forEach(label => {
                label.style.top = '12px';
                label.style.fontSize = '0.95rem';
                label.style.color = 'var(--gray-medium)';
            });
            
            // Reset underline
            document.querySelectorAll('.underline').forEach(underline => {
                underline.style.width = '0';
            });
            
        } else {
            throw new Error(`Form submission failed with status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showAlert('Sorry, there was an error sending your message. Please try again later or email me directly at reddysathvik2005@gmail.com', 'error');
        
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
    }
});

// Custom alert function
function showAlert(message, type = 'info') {
    // Remove any existing alerts
    const existingAlert = document.querySelector('.custom-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `custom-alert ${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="alert-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add to page
    document.body.appendChild(alert);
    
    // Show alert with animation
    setTimeout(() => {
        alert.classList.add('show');
    }, 10);
    
    // Auto-remove after 8 seconds
    const autoRemove = setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 300);
    }, 8000);
    
    // Close button functionality
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemove);
        alert.classList.remove('show');
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 300);
    });
}

// Scroll indicator click handler
scrollIndicator.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    aboutSection.scrollIntoView({ behavior: 'smooth' });
});

// Hide scroll indicator when user scrolls down
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.visibility = 'hidden';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.visibility = 'visible';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize with first nav link active
document.querySelector('.nav-links a').classList.add('active');

// Form label animation
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    // Check on page load if inputs have values
    if (input.value) {
        input.previousElementSibling.style.top = '-20px';
        input.previousElementSibling.style.fontSize = '0.85rem';
        input.previousElementSibling.style.color = 'var(--gray-dark)';
    }
    
    input.addEventListener('focus', () => {
        input.previousElementSibling.style.top = '-20px';
        input.previousElementSibling.style.fontSize = '0.85rem';
        input.previousElementSibling.style.color = 'var(--gray-dark)';
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.previousElementSibling.style.top = '12px';
            input.previousElementSibling.style.fontSize = '0.95rem';
            input.previousElementSibling.style.color = 'var(--gray-medium)';
        }
    });
});

// Add underline animation on focus
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    const underline = input.nextElementSibling.nextElementSibling;
    
    input.addEventListener('focus', () => {
        underline.style.width = '100%';
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            underline.style.width = '0';
        }
    });
});