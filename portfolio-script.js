document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your Public Key (add this at the top)
    emailjs.init("ib04aqznREqlnwpSn"); // Replace with your actual key

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Typing Animation
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const words = ['Frontend Developer', 'Graphic Designer', 'Python Programmer'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            const currentChar = currentWord.substring(0, charIndex);
            typingText.textContent = currentChar;

            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(type, 100);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 50);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, 1000);
            }
        }
        setTimeout(type, 1500);
    }


    // Portfolio Filtering Functionality
    function initPortfolioFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter items with animation
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.classList.remove('hidden');
                        }, 10);
                    } else {
                        item.classList.add('hidden');
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 500);
                    }
                });
            });
        });
    }

    // Initialize portfolio filters
    initPortfolioFilters();

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize Swiper for Testimonials (if Swiper is loaded)
    if (typeof Swiper !== 'undefined') {
        const testimonialSwiper = new Swiper('.testimonials-swiper', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }
        });
    }

    // Animate Skill Bars on Scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        });
    }

    const skillsSection = document.querySelector('.about');
    if (skillsSection && skillBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillsSection);
    }

    // 3D Canvas Animation for Hero Section (if Three.js is loaded)
    const heroCanvas = document.getElementById('hero-canvas');
    
    if (heroCanvas && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true
        });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        heroCanvas.appendChild(renderer.domElement);

        const particlesGeometry = new THREE.BufferGeometry();
        const particleCount = 1000;
        
        const posArray = new Float32Array(particleCount * 3);
        
        for(let i = 0; i < particleCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 10;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x00ffaa,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);
        
        camera.position.z = 3;
        
        function animate() {
            requestAnimationFrame(animate);
            
            particlesMesh.rotation.x += 0.0005;
            particlesMesh.rotation.y += 0.0005;
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        window.addEventListener('resize', function() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // Form Submission with EmailJS
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get current date and time
            const now = new Date();
            const timeString = now.toLocaleString();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                title: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                time: timeString
            };
            
            console.log('Form submitted:', formData);
            
            // Send email using EmailJS
            emailjs.send("service_vkjrwli", "template_wrq421r", formData)
                .then(function(response) {
                    console.log("SUCCESS!", response.status, response.text);
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                }, function(error) {
                    console.log("FAILED...", error);
                    alert('Sorry, there was an error sending your message. Please try again later.');
                });
        });
    }

    // Update current year in footer
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Add scroll animation to elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.testimonial-card, .service-card, .portfolio-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});


document.addEventListener('DOMContentLoaded', function() {
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Project modals
    const portfolioItemsClick = document.querySelectorAll('.portfolio-item');
    const modals = document.querySelectorAll('.project-modal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const body = document.body;
    
    portfolioItemsClick.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.getAttribute('data-project');
            const modal = document.getElementById(`${projectId}-modal`);
            
            if (modal) {
                modal.style.display = 'block';
                body.style.overflow = 'hidden';
            }
        });
    });
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
            body.style.overflow = 'auto';
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                body.style.overflow = 'auto';
            }
        });
    });
    
    // Full image view for design projects
    const viewFullImageButtons = document.querySelectorAll('.view-full-image');
    const fullImageView = document.querySelector('.full-image-view');
    const fullImageWrapper = document.querySelector('.full-image-wrapper');
    const fullImageContainer = document.querySelector('.full-image-container');
    const fullSizeImage = document.getElementById('full-size-image');
    const closeFullView = document.querySelector('.close-full-view');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetZoomBtn = document.getElementById('reset-zoom');
    const zoomLevel = document.getElementById('zoom-level');
    
    let currentScale = 1;
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;
    let posX = 0, posY = 0;
    
    // Open image viewer
    viewFullImageButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const imageSrc = button.getAttribute('data-image-src');
            
            if (imageSrc) {
                // Reset position and scale
                currentScale = 1;
                fullSizeImage.style.transform = 'scale(1)';
                fullImageContainer.style.left = '0';
                fullImageContainer.style.top = '0';
                posX = 0;
                posY = 0;
                
                // Load image
                fullSizeImage.src = imageSrc;
                fullSizeImage.onload = function() {
                    zoomLevel.textContent = '100%';
                    fullImageView.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                };
            }
        });
    });
    
    // Close image viewer
    closeFullView.addEventListener('click', () => {
        fullImageView.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close when clicking outside image
    fullImageView.addEventListener('click', (e) => {
        if (e.target === fullImageView) {
            fullImageView.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Zoom functionality
    zoomInBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentScale += 0.25;
        fullSizeImage.style.transform = `scale(${currentScale})`;
        zoomLevel.textContent = Math.round(currentScale * 100) + '%';
    });
    
    zoomOutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentScale > 0.25) {
            currentScale -= 0.25;
            fullSizeImage.style.transform = `scale(${currentScale})`;
            zoomLevel.textContent = Math.round(currentScale * 100) + '%';
        }
    });
    
    resetZoomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentScale = 1;
        fullSizeImage.style.transform = 'scale(1)';
        fullImageContainer.style.left = '0';
        fullImageContainer.style.top = '0';
        posX = 0;
        posY = 0;
        zoomLevel.textContent = '100%';
    });
    
    // Dragging functionality
    fullImageContainer.addEventListener('mousedown', startDrag);
    fullImageContainer.addEventListener('touchstart', startDrag);
    
    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
        
        // Get initial position
        if (e.type === 'mousedown') {
            startX = e.clientX - posX;
            startY = e.clientY - posY;
        } else {
            startX = e.touches[0].clientX - posX;
            startY = e.touches[0].clientY - posY;
        }
        
        // Add event listeners for drag
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('touchend', stopDrag);
    }
    
    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        let clientX, clientY;
        if (e.type === 'mousemove') {
            clientX = e.clientX;
            clientY = e.clientY;
        } else {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        }
        
        // Calculate new position
        posX = clientX - startX;
        posY = clientY - startY;
        
        // Apply new position
        fullImageContainer.style.left = posX + 'px';
        fullImageContainer.style.top = posY + 'px';
    }
    
    function stopDrag() {
        isDragging = false;
        
        // Remove event listeners
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
    }
    
    // Prevent image drag on touch devices
    fullSizeImage.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
        
});