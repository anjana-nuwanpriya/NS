
        // Scroll Progress Indicator
        window.addEventListener('scroll', function() {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            document.getElementById('scroll-progress').style.width = scrolled + '%';
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
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
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });

        // Search functionality
        document.querySelector('.search-icon').addEventListener('click', function() {
            alert('Search functionality would be implemented here');
        });



                function toggleSection(sectionId) {
            const section = document.getElementById(sectionId);
            const allSections = document.querySelectorAll('.section');
            
            // Close all other sections
            allSections.forEach(s => {
                if (s.id !== sectionId && s.classList.contains('active')) {
                    s.classList.remove('active');
                }
            });
            
            // Toggle current section
            section.classList.toggle('active');
        }

        // Optional: Auto-expand first section on load
        document.addEventListener('DOMContentLoaded', function() {
            // Uncomment the line below if you want the first section to be open by default
            // document.getElementById('professional').classList.add('active');
        });

        // Keyboard accessibility
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                const activeElement = document.activeElement;
                if (activeElement.classList.contains('section-header')) {
                    e.preventDefault();
                    activeElement.click();
                }
            }
        });

        // Make section headers focusable for accessibility
        document.querySelectorAll('.section-header').forEach(header => {
            header.setAttribute('tabindex', '0');
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'false');
            
            header.addEventListener('click', function() {
                const isActive = this.parentElement.classList.contains('active');
                this.setAttribute('aria-expanded', isActive ? 'false' : 'true');
            });
        });

        function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const allSections = document.querySelectorAll('.toggle-section');
    
    // Close all other sections (optional)
    allSections.forEach(s => {
        if (s.id !== sectionId) {
            s.classList.remove('active');
        }
    });
    
    // Toggle current section
    section.classList.toggle('active');
}


document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-menu').classList.toggle('active');
});