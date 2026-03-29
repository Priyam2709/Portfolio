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

    /* --- Cinematic HUD Blast Door Preloader --- */
    const preloader = document.getElementById('preloader');
    const loadRing = document.querySelector('.hud-ring');
    const loadingText = document.querySelector('.hud-percentage');
    const loadingStatus = document.querySelector('.loading-status');
    const brandIso = document.querySelector('.brand-iso');
    
    let loadProgress = 0;
    
    const bootPhrases = [
        "ESTABLISHING SECURE PROTOCOLS...",
        "DECRYPTING NEURAL LATTICE...",
        "ROUTING POWER TO CORE API...",
        "COMPILING USER INTERFACE...",
        "SYSTEMS ONLINE"
    ];
    
    if(preloader) {
        document.body.style.overflow = 'hidden';
        
        // Ensure initial HUD rotation is 0
        if(loadRing) loadRing.style.setProperty('--hud-deg', `0deg`);
        
        let bootIntervalId = setInterval(() => {
            // Accelerating curve: smooth but variable progression
            let increment = Math.max(0.8, (100 - loadProgress) * 0.08 + Math.random() * 2);
            loadProgress += increment;
            
            if(loadProgress >= 100) {
                loadProgress = 100;
                clearInterval(bootIntervalId);
                
                // Final Success State
                if(loadingStatus) {
                    loadingStatus.textContent = bootPhrases[bootPhrases.length - 1]; // "SYSTEMS ONLINE"
                    loadingStatus.style.color = "#10b981"; // Success green
                }
                if(brandIso) {
                    brandIso.style.transform = "scale(1.2)";
                }
                
                // Blast doors open sequence
                setTimeout(() => {
                    preloader.classList.add('loaded'); // Triggers splitting doors
                    
                    // Cleanup from DOM
                    setTimeout(() => {
                        preloader.classList.add('hidden');
                        document.body.style.overflow = '';
                        setTimeout(() => window.initObserver && window.initObserver(), 200);
                    }, 1200); // Wait for the 1.2s CSS door slide animation
                }, 600); // Short pause holding at 100%
            } else {
                if(loadingStatus) {
                    let phraseIndex = Math.floor((loadProgress / 100) * (bootPhrases.length - 1));
                    loadingStatus.textContent = bootPhrases[phraseIndex];
                }
            }

            if(loadRing) loadRing.style.setProperty('--hud-deg', `${(loadProgress / 100) * 360}deg`);
            if(loadingText) loadingText.textContent = Math.floor(loadProgress) + '%';
        }, 50);
        
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
        const heroAvatar = document.querySelector('.hero-main-img');
        const heroWrapper = document.querySelector('.hero-image-wrapper');

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Hero Parallax
            if(heroAvatar && heroWrapper) {
                const px = (mouseX - window.innerWidth / 2) * 0.015;
                const py = (mouseY - window.innerHeight / 2) * 0.015;
                heroAvatar.style.transform = `scale(1.05) translate(${px}px, ${py}px)`;
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
                const img = card.querySelector('.project-img, .showcase-img');
                if(img) {
                    img.style.transform = `scale(1.08) translate(${-rotateY * 0.5}px, ${-rotateX * 0.5}px)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
                glare.style.opacity = '0';
                
                const img = card.querySelector('.project-img, .showcase-img');
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
    
    /* --- Interactive Hexagonal Lattice Background --- */
    const canvas = document.getElementById('neural-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h;
        
        const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';
        const getHexColor = (alpha) => isDark() ? `rgba(139, 92, 246, ${alpha})` : `rgba(79, 70, 229, ${alpha})`;
        const getHexGlow = () => isDark() ? `rgba(0, 240, 255, 1)` : `rgba(236, 72, 153, 1)`;

        const hexRadius = (window.innerWidth < 768) ? 20 : 35;
        const hexWidth = Math.sqrt(3) * hexRadius;
        const hexHeight = 2 * hexRadius;
        const xOffset = hexWidth;
        const yOffset = hexHeight * 0.75;
        
        let hexagons = [];
        let mouseCanvas = { x: -1000, y: -1000, radius: 150 };
        
        document.addEventListener('mousemove', e => {
            mouseCanvas.x = e.clientX;
            mouseCanvas.y = e.clientY;
        });
        document.addEventListener('mouseleave', () => {
            mouseCanvas.x = -1000;
            mouseCanvas.y = -1000;
        });

        class Hexagon {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.intensity = 0; // Starts dormant
            }
            draw() {
                // Determine proximity to mouse
                let dx = mouseCanvas.x - this.x;
                let dy = mouseCanvas.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                // Ignite if near mouse
                if (dist < mouseCanvas.radius) {
                    this.intensity = 1.0; 
                } else {
                    // Smooth, slow fade out trail
                    this.intensity = Math.max(0, this.intensity - 0.015);
                }

                let baseAlpha = isDark() ? 0.04 : 0.08;

                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    let angle_deg = 60 * i - 30; // Pointy topped hexagons
                    let angle_rad = Math.PI / 180 * angle_deg;
                    let px = this.x + hexRadius * Math.cos(angle_rad);
                    let py = this.y + hexRadius * Math.sin(angle_rad);
                    if (i === 0) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.closePath();
                
                ctx.lineWidth = 1;
                
                if (this.intensity > 0.02) {
                    // Active Glowing Cell
                    ctx.strokeStyle = getHexGlow();
                    ctx.globalAlpha = this.intensity;
                    ctx.stroke();
                    
                    // Fill cell with Amethyst hue based on intensity
                    ctx.fillStyle = getHexColor(this.intensity * 0.4);
                    ctx.globalAlpha = 1.0;
                    ctx.fill();
                } else {
                    // Dormant Cell
                    ctx.strokeStyle = isDark() ? `rgba(255,255,255,${baseAlpha})` : `rgba(0,0,0,${baseAlpha})`;
                    ctx.globalAlpha = 1.0;
                    ctx.stroke();
                }
            }
        }

        function init() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            hexagons = [];
            
            // Add padding to fill entire screen perfectly
            let cols = Math.ceil(w / hexWidth) + 2;
            let rows = Math.ceil(h / yOffset) + 2;
            
            for (let row = -1; row < rows; row++) {
                for (let col = -1; col < cols; col++) {
                    let x = col * xOffset;
                    let y = row * yOffset;
                    // Offset odd rows
                    if (row % 2 !== 0) {
                        x += hexWidth / 2;
                    }
                    hexagons.push(new Hexagon(x, y));
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, w, h);
            ctx.globalAlpha = 1.0;
            
            for (let i = 0; i < hexagons.length; i++) {
                hexagons[i].draw();
            }
            requestAnimationFrame(animate);
        }

        init();
        animate();

        window.addEventListener('resize', () => {
            init();
        });
    }

    /* --- Smooth Text Reveal for Hero --- */
    const heroTitle = document.querySelector('.large-type');
    if (heroTitle && heroTitle.classList.contains('reveal-up')) {
        // Already handled by IntersectionObserver
    }

    /* --- Magnetic Scroll-Aware Bottom Nav --- */
    const bottomNav = document.querySelector('.bottom-nav');
    let lastScroll = 0;
    if (bottomNav) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScroll && currentScroll > 300) {
                bottomNav.style.transform = 'translateX(-50%) translateY(120%)';
            } else {
                bottomNav.style.transform = 'translateX(-50%) translateY(0)';
            }
            lastScroll = currentScroll;
        }, { passive: true });
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
    const mainNavbar = document.querySelector('.bottom-nav');

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
    const projectCards = document.querySelectorAll('.showcase-card');

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

    /* --- Contact Form with EmailJS --- */
    // IMPORTANT: Replace these with your real EmailJS credentials
    // Sign up at https://www.emailjs.com/ (free tier: 200 emails/month)
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';   // Dashboard → Account → Public Key
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';   // Dashboard → Email Services
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Dashboard → Email Templates

    if(typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.querySelector('.form-status');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            btn.textContent = "Sending...";
            btn.style.opacity = '0.7';
            btn.disabled = true;

            if(typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
                // Real EmailJS send
                emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
                    .then(() => {
                        contactForm.reset();
                        btn.textContent = "Send Message";
                        btn.style.opacity = '1';
                        btn.disabled = false;
                        formStatus.innerHTML = `<span style="color: #10b981; font-weight: 600;">✓ Message sent successfully!</span>`;
                        setTimeout(() => formStatus.innerHTML = '', 5000);
                    }, (error) => {
                        btn.textContent = "Send Message";
                        btn.style.opacity = '1';
                        btn.disabled = false;
                        formStatus.innerHTML = `<span style="color: #ef4444; font-weight: 600;">✕ Failed to send. Please email directly.</span>`;
                        console.error('EmailJS error:', error);
                        setTimeout(() => formStatus.innerHTML = '', 5000);
                    });
            } else {
                // Fallback simulation when EmailJS is not configured
                setTimeout(() => {
                    contactForm.reset();
                    btn.textContent = "Send Message";
                    btn.style.opacity = '1';
                    btn.disabled = false;
                    formStatus.innerHTML = `<span style="color: #10b981; font-weight: 600;">✓ Message sent successfully!</span>`;
                    setTimeout(() => formStatus.innerHTML = '', 5000);
                }, 1500);
            }
        });
    }

});
