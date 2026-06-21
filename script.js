document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled'); // keep it or remove based on preference, let's remove it if top
            navbar.classList.remove('scrolled');
        }
    });

    // Initial check for navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                if(navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Fade-in Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                
                // Trigger counter animation if it's the hero stats
                if (entry.target.classList.contains('hero-image-wrapper')) {
                    animateCounters();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Counter Animation
    let countersAnimated = false;
    function animateCounters() {
        if (countersAnimated) return;
        countersAnimated = true;
        
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the slower

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                
                // Lower inc to slow and higher to speed up
                const inc = target / speed;

                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // YouTube Playlist Interaction
    const playlistItems = document.querySelectorAll('.playlist-item');
    const ytPlayer = document.getElementById('main-yt-player');
    
    playlistItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active from all
            playlistItems.forEach(el => el.classList.remove('active'));
            // Add active to clicked
            item.classList.add('active');
            
            // Update iframe source
            const videoUrl = item.getAttribute('data-url');
            if(ytPlayer && videoUrl) {
                ytPlayer.src = videoUrl;
            }
            
            // Add a little pop effect to the player container
            const playerContainer = document.querySelector('.video-player-frame');
            playerContainer.style.transform = 'scale(0.98)';
            setTimeout(() => {
                playerContainer.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Form submission mock
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerText = 'Transmitting...';
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#00e5ff';
                btn.style.color = '#000';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    if(filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active-filter'));
                // Add active class to clicked button
                btn.classList.add('active-filter');
                
                const filterValue = btn.getAttribute('data-filter');
                
                playlistItems.forEach(item => {
                    if(filterValue === 'all') {
                        item.style.display = 'flex';
                    } else {
                        if(item.getAttribute('data-category') === filterValue) {
                            item.style.display = 'flex';
                        } else {
                            item.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
});
