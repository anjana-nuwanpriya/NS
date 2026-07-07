
        // LOADING SCREEN FUNCTIONALITY - SHOW ONLY ON FIRST PAGE LOAD
        document.addEventListener('DOMContentLoaded', function() {
            const loadingScreen = document.getElementById('loadingScreen');
            const progressBar = document.getElementById('progressBar');
            const loadingPercentage = document.getElementById('loadingPercentage');
            const heroVideo = document.getElementById('heroVideo');

            // Check if this is the first time loading (not a repeat navigation)
            const hasLoaded = sessionStorage.getItem('nsHoldingsLoaded');
            
            // If already loaded once in this session, hide loading screen immediately
            if (hasLoaded) {
                loadingScreen.classList.add('hidden');
                return;
            }

            // Mark that we've loaded once
            sessionStorage.setItem('nsHoldingsLoaded', 'true');

            let loadingScreenHidden = false;
            let progress = 0;

            // Function to hide loading screen
            function hideLoadingScreen() {
                if (!loadingScreenHidden) {
                    loadingScreenHidden = true;
                    progressBar.style.width = '100%';
                    loadingPercentage.textContent = '100%';
                    
                    setTimeout(() => {
                        loadingScreen.classList.add('hidden');
                    }, 300);
                }
            }

            // Function to update progress bar
            function updateProgress(percent) {
                if (percent <= 100) {
                    progressBar.style.width = percent + '%';
                    loadingPercentage.textContent = Math.round(percent) + '%';
                }
            }

            // Simulate progress while waiting for video to load
            let simulatedProgress = 0;
            let simulationStarted = false;
            const simulationInterval = setInterval(() => {
                if (!progressTracked && !simulationStarted) {
                    simulationStarted = true;
                }
                if (!progressTracked && simulatedProgress < 85) {
                    simulatedProgress += Math.random() * 12;
                    if (simulatedProgress > 85) simulatedProgress = 85;
                    updateProgress(simulatedProgress);
                }
            }, 600);

            // Track video loading progress - only on first load
            let progressTracked = false;
            
            heroVideo.addEventListener('progress', () => {
                // Only track progress once until it reaches target
                if (progressTracked) return;
                
                if (heroVideo.buffered.length > 0) {
                    const bufferedEnd = heroVideo.buffered.end(heroVideo.buffered.length - 1);
                    const duration = heroVideo.duration;
                    
                    if (duration > 0) {
                        progress = (bufferedEnd / duration) * 100;
                        // Use whichever is higher: simulated or real
                        if (progress > simulatedProgress) {
                            simulatedProgress = progress;
                            updateProgress(progress);
                        }
                        
                        // Close loading screen as soon as it reaches 85% or real progress is high
                        if (progress >= 85 && !loadingScreenHidden) {
                            progressTracked = true;
                            clearInterval(simulationInterval);
                            updateProgress(100);
                            hideLoadingScreen();
                        }
                    }
                }
            });

            // Fallback: Auto-hide after 3 seconds or on window load
            window.addEventListener('load', () => {
                if (!loadingScreenHidden) {
                    clearInterval(simulationInterval);
                    updateProgress(100);
                    hideLoadingScreen();
                }
            });

            setTimeout(() => {
                if (!loadingScreenHidden) {
                    clearInterval(simulationInterval);
                    updateProgress(100);
                    hideLoadingScreen();
                }
            }, 3000);
        });

        // Mobile menu toggle functionality
        document.addEventListener('DOMContentLoaded', function() {
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');

            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInsideNav = navMenu.contains(event.target);
                const isClickOnHamburger = hamburger.contains(event.target);
                
                if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });

            // Services horizontal scroll with arrows
            const servicesGrid = document.querySelector('.services-grid');
            const leftArrow = document.getElementById('scrollLeft');
            const rightArrow = document.getElementById('scrollRight');

            if (servicesGrid && leftArrow && rightArrow) {
                function updateArrows() {
                    const scrollLeft = servicesGrid.scrollLeft;
                    const maxScroll = servicesGrid.scrollWidth - servicesGrid.clientWidth;
                    
                    if (scrollLeft > 0) {
                        leftArrow.style.display = 'flex';
                    } else {
                        leftArrow.style.display = 'none';
                    }
                    
                    if (scrollLeft >= maxScroll - 5) {
                        rightArrow.style.display = 'none';
                    } else {
                        rightArrow.style.display = 'flex';
                    }
                }
                
                rightArrow.addEventListener('click', () => {
                    const cardWidth = servicesGrid.querySelector('.service-card').offsetWidth;
                    servicesGrid.scrollBy({
                        left: cardWidth + 30,
                        behavior: 'smooth'
                    });
                });
                
                leftArrow.addEventListener('click', () => {
                    const cardWidth = servicesGrid.querySelector('.service-card').offsetWidth;
                    servicesGrid.scrollBy({
                        left: -(cardWidth + 30),
                        behavior: 'smooth'
                    });
                });
                
                servicesGrid.addEventListener('scroll', updateArrows);
                updateArrows();
                window.addEventListener('resize', updateArrows);
            }
        });

       // ========== PRODUCT CATEGORY SLIDER ==========
(function() {
    const TOTAL_SLIDES = 12;
    let currentIndex = 0;

    const wrap = (n, max) => ((n % max) + max) % max;

    function getSlideByIndex(index) {
        return document.querySelector(`.product-slide[data-index="${index}"]`);
    }

    function updateSlider() {
        const prevIndex = wrap(currentIndex - 1, TOTAL_SLIDES);
        const nextIndex = wrap(currentIndex + 1, TOTAL_SLIDES);
        const prev2Index = wrap(currentIndex - 2, TOTAL_SLIDES);
        const next2Index = wrap(currentIndex + 2, TOTAL_SLIDES);

        // Clear all states
        document.querySelectorAll('.product-slide').forEach(el => {
            el.removeAttribute('data-current');
            el.removeAttribute('data-previous');
            el.removeAttribute('data-next');
            el.removeAttribute('data-previous-2');
            el.removeAttribute('data-next-2');
        });

        // Set states for 5 slides
        const currentSlide = getSlideByIndex(currentIndex);
        const prevSlide = getSlideByIndex(prevIndex);
        const nextSlide = getSlideByIndex(nextIndex);
        const prev2Slide = getSlideByIndex(prev2Index);
        const next2Slide = getSlideByIndex(next2Index);

        if (currentSlide) currentSlide.setAttribute('data-current', '');
        if (prevSlide) prevSlide.setAttribute('data-previous', '');
        if (nextSlide) nextSlide.setAttribute('data-next', '');
        if (prev2Slide) prev2Slide.setAttribute('data-previous-2', '');
        if (next2Slide) next2Slide.setAttribute('data-next-2', '');
    }

    function changeSlide(direction) {
        currentIndex = wrap(currentIndex + direction, TOTAL_SLIDES);
        updateSlider();
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        const prevBtn = document.querySelector('.product-slider__btn--prev');
        const nextBtn = document.querySelector('.product-slider__btn--next');

        if (prevBtn && nextBtn) {
            updateSlider();

            prevBtn.addEventListener('click', () => changeSlide(-1));
            nextBtn.addEventListener('click', () => changeSlide(1));
        }
    });
})();
// ========== END PRODUCT CATEGORY SLIDER ==========
    