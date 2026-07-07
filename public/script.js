// Scroll Progress Indicator
window.addEventListener('scroll', function() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Form submission
const formEl = document.querySelector('form');
if (formEl) {
    formEl.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Search functionality
const searchEl = document.querySelector('.search-icon');
if (searchEl) {
    searchEl.addEventListener('click', function() {
        alert('Search functionality would be implemented here');
    });
}

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const allSections = document.querySelectorAll('.toggle-section, .section');
    
    // Close all other sections
    allSections.forEach(s => {
        if (s && s.id !== sectionId) {
            s.classList.remove('active');
        }
    });
    
    // Toggle current section
    if (section) {
        section.classList.toggle('active');
    }
}

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.classList.contains('section-header') || activeElement.classList.contains('toggle-section-header'))) {
            e.preventDefault();
            activeElement.click();
        }
    }
});

// Make section headers focusable for accessibility
document.querySelectorAll('.section-header, .toggle-section-header').forEach(header => {
    header.setAttribute('tabindex', '0');
    header.setAttribute('role', 'button');
    header.setAttribute('aria-expanded', 'false');
    
    header.addEventListener('click', function() {
        const isActive = this.parentElement.classList.contains('active');
        this.setAttribute('aria-expanded', isActive ? 'false' : 'true');
    });
});

const hamburgerEl = document.querySelector('.hamburger');
if (hamburgerEl) {
    hamburgerEl.addEventListener('click', function() {
        this.classList.toggle('active');
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    });
}
