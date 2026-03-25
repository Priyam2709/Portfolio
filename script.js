document.addEventListener('DOMContentLoaded', () => {

    /* --- Theme Toggle Logic --- */
    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            let current = document.documentElement.getAttribute('data-theme');
            let nextTheme = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', nextTheme);
            localStorage.setItem('theme', nextTheme);
            window.dispatchEvent(new Event('themeChanged'));
        });
    }

    /* --- Cinematic Preloader --- */
    const preloader = document.getElementById('preloader');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    let loadProgress = 0;
    
    if(preloader) {
        // Prevent scrolling while loading
        document.body.style.overflow = 'hidden';
        
        const loadInterval = setInterval(() => {
            loadProgress += Math.floor(Math.random() * 12) + 4;
            if(loadProgress >= 100) {
                loadProgress = 100;
                clearInterval(loadInterval);
                setTimeout(() => {
                    preloader.classList.add('hidden');
                    document.body.style.overflow = ''; // Restore scroll
                    // Trigger hero animations after fade
                    setTimeout(() => window.initObserver && window.initObserver(), 400);
                }, 500);
            }
            if(loadingProgress) loadingProgress.style.width = loadProgress + '%';
            if(loadingText) loadingText.textContent = loadProgress + '%';
        }, 60);
    } else {
        // Fallback
        setTimeout(() => window.initObserver && window.initObserver(), 100);
    }

    /* --- Scroll Progress Indicator --- */
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        if(scrollProgress) {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }
    });

    /* --- Custom Magnetic Cursor --- */
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const magneticElements = document.querySelectorAll('.magnetic');
    
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let cursorX = window.innerWidth / 2, cursorY = window.innerHeight / 2;
    let followerX = window.innerWidth / 2, followerY = window.innerHeight / 2;

    if (cursor && follower) {
        const heroAvatar = document.querySelector('.profile-img');
        const heroGlow = document.querySelector('.profile-glow');

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Hero Parallax
            if(heroAvatar && heroGlow) {
                const px = (mouseX - window.innerWidth / 2) * 0.015;
                const py = (mouseY - window.innerHeight / 2) * 0.015;
                heroAvatar.style.transform = `translate(${px}px, ${py}px)`;
                heroGlow.style.transform = `translate(${px * 1.5}px, ${py * 1.5}px)`;
            }
        });

        const animateCursor = () => {
            // Primary cursor is fast
            cursorX += (mouseX - cursorX) * 0.5;
            cursorY += (mouseY - cursorY) * 0.5;
            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;

            // Follower is slower and elastic
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.left = `${followerX}px`;
            follower.style.top = `${followerY}px`;

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Magnetic Hover Effect
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
                follower.classList.add('hovered');
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = `translate(0px, 0px)`;
                follower.classList.remove('hovered');
            });
        });
    }

    /* --- 3D Tilt Physics --- */
    window.init3D = function() {
        const tiltCards = document.querySelectorAll('.hover-3d');
        tiltCards.forEach(card => {
            // Remove existing glare if re-initializing
            const existingGlare = card.querySelector('.glare');
            if(existingGlare) existingGlare.remove();

            const glare = document.createElement('div');
            glare.classList.add('glare');
            card.appendChild(glare);

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                
                // Dynamic Glare
                glare.style.opacity = '1';
                glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1) 0%, transparent 60%)`;
                
                // Dynamic Component Parallax for Images
                const img = card.querySelector('.project-img');
                if(img) {
                    img.style.transform = `scale(1.08) translate(${-rotateY * 0.5}px, ${-rotateX * 0.5}px)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
                glare.style.opacity = '0';
                
                const img = card.querySelector('.project-img');
                if(img) img.style.transform = 'scale(1)';
            });
            
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'transform 0.1s ease-out';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            });
        });
    }
    window.init3D();

    /* --- Interactive Particle Canvas --- */
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray = [];
        const numParticles = Math.min((window.innerWidth * window.innerHeight) / 12000, 100);

        // Map theme colors
        let getParticleColor = () => {
            return document.documentElement.getAttribute('data-theme') === 'light' 
                ? '0, 0, 0' 
                : '255, 255, 255';
        };
        let pColor = getParticleColor();
        window.addEventListener('themeChanged', () => {
            pColor = getParticleColor();
        });

        // Mouse physical interaction
        let canvasMouse = { x: null, y: null, radius: 150 };

        window.addEventListener('mousemove', (e) => {
            canvasMouse.x = e.x;
            canvasMouse.y = e.y;
        });

        class Particle {
            constructor(x, y, dx, dy, size) {
                this.x = x; this.y = y;
                this.dx = dx; this.dy = dy;
                this.size = size;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 20) + 1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${pColor}, 0.6)`;
                ctx.fill();
            }
            update() {
                this.x += this.dx;
                this.y += this.dy;

                // Bounce
                if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx = -this.dx;
                if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy = -this.dy;

                // Mouse Repulsion & Gravity
                if (canvasMouse.x != null) {
                    let dx = canvasMouse.x - this.x;
                    let dy = canvasMouse.y - this.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = canvasMouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    let directionX = forceDirectionX * force * this.density;
                    let directionY = forceDirectionY * force * this.density;

                    if (distance < canvasMouse.radius) {
                        this.x -= directionX;
                        this.y -= directionY;
                    } else {
                        if (this.x !== this.baseX) { this.x -= (this.x - this.baseX) * 0.01; }
                        if (this.y !== this.baseY) { this.y -= (this.y - this.baseY) * 0.01; }
                    }
                }
                this.baseX += this.dx;
                this.baseY += this.dy;

                // Connect particles dynamically with network lines based on current theme
                for(let i = 0; i < particlesArray.length; i++){
                    let other = particlesArray[i];
                    if(other === this) continue;
                    let dist = Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
                    if(dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${pColor}, ${1 - dist/120})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(this.x, this.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }

                this.draw();
            }
        }

        function initCanvas() {
            particlesArray = [];
            for (let i = 0; i < numParticles; i++) {
                let size = (Math.random() * 2) + 0.5;
                let x = Math.random() * (innerWidth - size * 2) + size;
                let y = Math.random() * (innerHeight - size * 2) + size;
                let dx = (Math.random() - 0.5) * 1.5;
                let dy = (Math.random() - 0.5) * 1.5;
                particlesArray.push(new Particle(x, y, dx, dy, size));
            }
        }

        function animateCanvas() {
            requestAnimationFrame(animateCanvas);
            ctx.clearRect(0, 0, innerWidth, innerHeight);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
        }

        initCanvas();
        animateCanvas();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initCanvas();
        });
        
        window.addEventListener('mouseleave', () => {
            canvasMouse.x = null;
            canvasMouse.y = null;
        });
    }

    /* --- Sophisticated Typewriter --- */
    const typewriterText = document.getElementById('typewriter-text');
    if(typewriterText) {
        const phrases = [
            "Building Intelligent Systems.",
            "Designing Scalable Architectures.",
            "Solving Real Problems with ML.",
            "Creating Dynamic Interfaces."
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isWaiting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if(isDeleting) {
                typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            if(!isDeleting && charIndex === currentPhrase.length) {
                isWaiting = true;
                setTimeout(() => {
                    isDeleting = true;
                    isWaiting = false;
                    type();
                }, 2000);
            } else if(isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500);
            } else if(!isWaiting) {
                setTimeout(type, isDeleting ? 30 : 80);
            }
        }
        setTimeout(type, 1000);
    }

    /* --- Scroll Reveal Animations --- */
    window.initObserver = function() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-up:not(.visible)').forEach(el => {
            observer.observe(el);
        });
    };
    // initObserver is now called after the preloader finishes

    /* --- Navbar Active State Observer --- */
    const sections = document.querySelectorAll('.section');
    const navLinksList = document.querySelectorAll('.nav-links a');
    const mainNavbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        if (mainNavbar) {
            if (window.scrollY > 50) {
                mainNavbar.classList.add('scrolled');
            } else {
                mainNavbar.classList.remove('scrolled');
            }
        }
    });

    /* --- Premium Glow Cards --- */
    const glowCards = document.querySelectorAll('.glass-card, .border-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    /* --- Button Ripples --- */
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX - this.getBoundingClientRect().left;
            let y = e.clientY - this.getBoundingClientRect().top;
            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple');
            this.appendChild(ripples);
            setTimeout(() => { ripples.remove() }, 600);
        });
    });

    /* --- Project Category Filtering --- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || filter === category) {
                        card.classList.remove('hide');
                        // re-trigger animation
                        card.classList.remove('visible');
                        setTimeout(() => card.classList.add('visible'), 50);
                    } else {
                        card.classList.add('hide');
                        card.classList.remove('visible');
                    }
                });
            });
        });
    }

    /* --- Seamless Page Transitions --- */
    const pageTransition = document.getElementById('page-transition');
    
    // Intercept navigation loops
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('target');
            const href = this.getAttribute('href');
            
            // Exceptions
            if (target === '_blank' || href.startsWith('mailto:') || href.startsWith('#')) return;

            e.preventDefault();
            if(pageTransition) {
                pageTransition.classList.remove('fade-out');
                pageTransition.classList.add('active');
                setTimeout(() => {
                    window.location.href = href;
                }, 600); // matches CSS duration
            } else {
                window.location.href = href;
            }
        });
    });

    // Initial page load sweep away (mainly for project.html)
    window.addEventListener('pageshow', () => {
        if(pageTransition && pageTransition.classList.contains('active')) {
            // We delay slightly so the dom has time to paint before uncovering
            setTimeout(() => {
                pageTransition.classList.remove('active');
                pageTransition.classList.add('fade-out');
                setTimeout(() => {
                    pageTransition.classList.remove('fade-out'); // Reset
                }, 600);
            }, 100);
        }
    });

    /* --- Contact Form Simulation --- */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.querySelector('.form-status');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.textContent = "Sending...";
            btn.style.opacity = '0.7';
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = "Send Message";
                btn.style.opacity = '1';
                formStatus.innerHTML = `<span style="color: #10b981; font-weight: 500; text-shadow: 0 0 10px rgba(16,185,129,0.3);">Message successfully sent!</span>`;
                setTimeout(() => formStatus.innerHTML = '', 4000);
            }, 1500);
        });
    }

});
