// ============================================
// ⚠️ GOOGLE SHEETS FORM SUBMISSION
// ============================================
// IMPORTANT: Replace this URL with your Google Apps Script Web App URL
// Follow the setup guide to get your URL from Google Sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbzUz8AM5hmdjOfcNYxKTiutNs6KcSHzPS2I5q8nYIPBMNND5Sxr-pHvG-BXJRRn-5B9/exec'

const form = document.getElementById('contactForm')
const submitBtn = document.getElementById('submitBtn')
const formMessage = document.getElementById('formMessage')

form.addEventListener('submit', e => {
    e.preventDefault()
    
    // Show loading state
    submitBtn.disabled = true
    submitBtn.innerHTML = '<span>Sending...</span><i class="ph ph-spinner ph-spin"></i>'
    formMessage.style.display = 'none'
    
    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form),
    })
    .then(response => response.json())
    .then(() => {
        // Show success message
        formMessage.style.display = 'block'
        formMessage.style.background = '#d1fae5'
        formMessage.style.color = '#065f46'
        formMessage.style.border = '1px solid #10b981'
        formMessage.innerHTML = '<i class="ph ph-check-circle"></i> <strong>Success!</strong> Your Message Has Been Sent.'
        
        // Reset form
        form.reset()
        
        // Reset button
        submitBtn.disabled = false
        submitBtn.innerHTML = '<span>Send Message</span><i class="ph ph-paper-plane-right"></i>'
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none'
        }, 5000)
    })
    .catch(error => {
        // Show error message
        formMessage.style.display = 'block'
        formMessage.style.background = '#fee2e2'
        formMessage.style.color = '#991b1b'
        formMessage.style.border = '1px solid #ef4444'
        formMessage.innerHTML = '<i class="ph ph-warning-circle"></i> <strong>Error!</strong> Something went wrong. Please try again or email me directly at ivanochige@gmail.com'
        
        // Reset button
        submitBtn.disabled = false
        submitBtn.innerHTML = '<span>Send Message</span><i class="ph ph-paper-plane-right"></i>'
    })
})

// ============================================
// Dark Mode Toggle
// ============================================
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

if (localStorage.getItem('theme') === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('ph-moon', 'ph-sun');
}

themeToggle.addEventListener('click', () => {
    if (body.hasAttribute('data-theme')) {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('ph-sun', 'ph-moon');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('ph-moon', 'ph-sun');
    }
});

// ============================================
// Mobile Menu Toggle
// ============================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.replace('ph-list', 'ph-x');
    } else {
        icon.classList.replace('ph-x', 'ph-list');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.replace('ph-x', 'ph-list');
    });
});

/* ===== Animate On Scroll ===== */
const circles = document.querySelectorAll('.technical-circle');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const circle = entry.target;
            const percent = circle.getAttribute('data-percent');
            const color = circle.getAttribute('data-color');
            const progressCircle = circle.querySelector('.technical-progress');

            const radius = 70;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percent / 100) * circumference;

            progressCircle.style.stroke = color;
            progressCircle.style.strokeDasharray = circumference;
            progressCircle.style.strokeDashoffset = offset;

            observer.unobserve(circle);
        }
    });
}, { threshold: 0.6 });

circles.forEach(circle => observer.observe(circle));
/* ===== Animate On Scroll End ===== */