const FORMSPREE_FORM_ID = 'FORMSPREE_FORM_ID_PLACEHOLDER'; // Injected at build-time in CI/CD

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggling
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', '');
            updateThemeIcon('');
        } else {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateThemeIcon('dark-theme');
        }
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark-theme') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // 2. Experience Calculator
    function calculateExperience() {
        const startDate = new Date('2023-01-01');
        const today = new Date();

        const totalMonths = (today.getFullYear() - startDate.getFullYear()) * 12 + (today.getMonth() - startDate.getMonth());
        const totalYears = totalMonths / 12;

        // Round down to the nearest 0.5 increment
        const displayYears = Math.floor(totalYears * 2) / 2;
        const formattedYears = displayYears % 1 === 0 ? displayYears : displayYears.toFixed(1);

        const expElement = document.getElementById('exp-timer');
        if (expElement) {
            expElement.innerText = `${formattedYears}+`;
        }

        const expStatElement = document.getElementById('exp-stat');
        if (expStatElement) {
            expStatElement.innerText = `${formattedYears}+`;
        }
    }
    calculateExperience();

    // 3. Typing Effect
    const typingText = document.getElementById('typing-text');
    const roles = [
        'DevOps Engineer',
        'Team Lead',
        'Cloud & Kubernetes Specialist'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    type();

    // 4. Scroll Reveal
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => revealObserver.observe(reveal));

    // 5. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            
            // Toggle hamburger / close icon
            if (mobileMenuIcon) {
                if (navLinks.classList.contains('active')) {
                    mobileMenuIcon.classList.remove('fa-bars');
                    mobileMenuIcon.classList.add('fa-xmark');
                } else {
                    mobileMenuIcon.classList.remove('fa-xmark');
                    mobileMenuIcon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (mobileMenuIcon) {
                    mobileMenuIcon.classList.remove('fa-xmark');
                    mobileMenuIcon.classList.add('fa-bars');
                }
            });
        });

        // Close menu when clicking anywhere outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                if (mobileMenuIcon) {
                    mobileMenuIcon.classList.remove('fa-xmark');
                    mobileMenuIcon.classList.add('fa-bars');
                }
            }
        });
    }

    // 6. Dynamic Copyright Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }

    // 7. Innovative Header Effects
    const navbar = document.querySelector('.navbar');
    const scrollProgress = document.querySelector('.scroll-progress');
    const sections = document.querySelectorAll('section, header');
    const navLinksList = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Scroll Progress Bar
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = `${scrolled}%`;

        // Navbar Scrolled State
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Section Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 8. Stats Counter Animation
    const stats = document.querySelectorAll('.stat-card__number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const originalText = target.innerText;
                const countTo = parseFloat(originalText.replace('+', ''));
                const duration = 2000;
                const startTime = performance.now();

                const updateCount = (timestamp) => {
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    const currentValue = progress * countTo;

                    let displayValue;
                    if (countTo % 1 === 0) {
                        displayValue = Math.floor(currentValue);
                    } else {
                        displayValue = currentValue.toFixed(1);
                    }

                    target.innerText = displayValue + (originalText.includes('+') ? '+' : '');

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        target.innerText = originalText;
                    }
                };
                requestAnimationFrame(updateCount);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // 9. Three.js Hero Animation - Enterprise Topographic Terrain
    const canvas = document.getElementById('hero-3d-canvas');
    if (canvas) {
        let renderer, scene, camera, mesh;
        let mouseX = 0, mouseY = 0;

        function initThree() {
            scene = new THREE.Scene();

            // Background color matches CSS --bg-color
            const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim();
            scene.background = null; // Let CSS handle background

            // Fog for depth
            scene.fog = new THREE.Fog(bgColor, 20, 50);

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 15, 30);
            camera.lookAt(0, 0, 0);

            renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                alpha: true,
                antialias: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            createTerrain();
            animate();
        }

        function createTerrain() {
            if (mesh) scene.remove(mesh);

            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();

            // Large plane for terrain
            const geometry = new THREE.PlaneGeometry(100, 100, 60, 60);
            geometry.rotateX(-Math.PI / 2);

            const material = new THREE.MeshBasicMaterial({
                color: primaryColor || '#38bdf8',
                wireframe: true,
                transparent: true,
                opacity: 0.35
            });

            mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            // Store initial positions for animation
            mesh.geometry.attributes.position.originalZ = new Float32Array(mesh.geometry.attributes.position.array);
        }

        function animate() {
            requestAnimationFrame(animate);

            const time = Date.now() * 0.0005;
            const posAttribute = mesh.geometry.attributes.position;

            for (let i = 0; i < posAttribute.count; i++) {
                // Get world coordinates
                const x = posAttribute.getX(i);
                const y = posAttribute.getZ(i); // This is Z in PlaneGeometry (Y in world after rotation)

                // Displacement function (waves)
                const z = Math.sin(x * 0.1 + time) * 1.5 +
                    Math.cos(y * 0.1 + time * 0.5) * 1.5 +
                    Math.sin((x + y) * 0.05 + time * 0.8) * 1.0;

                posAttribute.setY(i, z); // Set height
            }

            posAttribute.needsUpdate = true;

            // Subtle camera movement based on mouse
            camera.position.x += (mouseX * 0.02 - camera.position.x) * 0.05;
            camera.position.y += (-(mouseY * 0.02 - 15) - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);

            renderer.render(scene, camera);
        }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        window.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2);
            mouseY = (e.clientY - window.innerHeight / 2);
        });

        // Theme change handling
        themeToggle.addEventListener('click', () => {
            setTimeout(() => {
                const newColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
                const newBg = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim();
                mesh.material.color.set(newColor);
                scene.fog.color.set(newBg);
            }, 50);
        });

        initThree();
    }

    // 10. Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    const formSuccessState = document.getElementById('form-success-state');
    const btnSendAnother = document.getElementById('btn-send-another');

    if (contactForm && formSuccessState) {
        const formStatusDot = document.querySelector('.form-status-dot');
        const formStatusText = document.querySelector('.form-status-text');
        const formCardTitle = document.querySelector('.form-card-title');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const submitBtnText = submitBtn.querySelector('span');
            const submitBtnIcon = submitBtn.querySelector('i');

            // Disable button and show loading state
            submitBtn.disabled = true;
            if (submitBtnText) submitBtnText.textContent = 'Sending...';
            if (submitBtnIcon) {
                submitBtnIcon.className = 'fas fa-spinner fa-spin';
            }

            // Update status indicators to transmitting state
            if (formStatusDot) {
                formStatusDot.className = 'pulse-dot form-status-dot pulse-orange';
            }
            if (formStatusText) {
                formStatusText.textContent = 'Form Status: Transmitting...';
            }

            let fetchCompleted = false;
            let fetchSuccess = false;
            let fetchErrorMsg = '';

            const formData = new FormData(contactForm);
            const formspreeUrl = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;

            // Reset log lines
            ['log-1', 'log-2', 'log-3', 'log-4'].forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.textContent = '';
                    el.className = 'console-line dynamic-log-line';
                }
            });

            // Show console logs container and hide form
            contactForm.style.display = 'none';
            const consoleLogs = document.getElementById('form-console-logs');
            if (consoleLogs) consoleLogs.classList.remove('hidden');

            // Start log animation sequence
            setTimeout(() => {
                printLog('log-1', '⚡ Initiating secure TLS tunnel connection...');
            }, 200);

            setTimeout(() => {
                const nameVal = formData.get('name') || 'unknown';
                printLog('log-2', `🔑 Packaging payload metadata [Node: ${nameVal.substring(0, 15)}]...`);
            }, 800);

            setTimeout(() => {
                printLog('log-3', '📡 Syncing via GitOps reconciliation pipeline...');
                checkCompletion();
            }, 1500);

            // Fetch submission
            fetch(formspreeUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    fetchCompleted = true;
                    if (response.ok) {
                        fetchSuccess = true;
                    } else {
                        fetchSuccess = false;
                        fetchErrorMsg = 'Submission rejected by API (non-200).';
                    }
                })
                .catch(err => {
                    fetchCompleted = true;
                    fetchSuccess = false;
                    fetchErrorMsg = 'Network handshake timed out.';
                });

            function printLog(id, text, isError = false) {
                const el = document.getElementById(id);
                if (el) {
                    el.textContent = text;
                    if (isError) {
                        el.classList.add('error-log');
                    } else {
                        el.classList.add('success-log');
                    }
                }
            }

            function checkCompletion() {
                if (fetchCompleted) {
                    finishSubmission();
                } else {
                    setTimeout(checkCompletion, 150);
                }
            }

            function finishSubmission() {
                if (fetchSuccess) {
                    printLog('log-4', '✅ Tunnel established. Message state: SYNCED (200 OK)');

                    // Set receipt details
                    const receiptTime = document.getElementById('receipt-time');
                    const receiptHash = document.getElementById('receipt-hash');
                    if (receiptTime) {
                        const now = new Date();
                        receiptTime.textContent = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
                    }
                    if (receiptHash) {
                        const chars = 'abcdef0123456789';
                        let hash = 'tx_';
                        for (let i = 0; i < 16; i++) {
                            hash += chars[Math.floor(Math.random() * chars.length)];
                        }
                        receiptHash.textContent = hash;
                    }

                    setTimeout(() => {
                        if (consoleLogs) consoleLogs.classList.add('hidden');
                        formSuccessState.classList.remove('hidden');

                        if (formStatusDot) {
                            formStatusDot.className = 'pulse-dot form-status-dot';
                        }
                        if (formStatusText) {
                            formStatusText.textContent = 'Form Status: Transmitted';
                        }
                        if (formCardTitle) {
                            formCardTitle.textContent = 'Message Transmitted';
                        }
                        contactForm.reset();
                    }, 1200);
                } else {
                    printLog('log-4', `❌ Error: ${fetchErrorMsg}`, true);

                    setTimeout(() => {
                        alert(`Submission failed: ${fetchErrorMsg}. Please try again or email directly.`);
                        if (consoleLogs) consoleLogs.classList.add('hidden');
                        contactForm.style.display = 'flex';
                        resetToReady();
                    }, 2500);
                }
            }
        });

        function resetToReady() {
            if (formStatusDot) {
                formStatusDot.className = 'pulse-dot form-status-dot';
            }
            if (formStatusText) {
                formStatusText.textContent = 'Form Status: Ready';
            }
            if (formCardTitle) {
                formCardTitle.textContent = 'Send a Message';
            }
            // Reset button states
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const submitBtnText = submitBtn.querySelector('span');
            const submitBtnIcon = submitBtn.querySelector('i');
            submitBtn.disabled = false;
            if (submitBtnText) submitBtnText.textContent = 'Send Message';
            if (submitBtnIcon) {
                submitBtnIcon.className = 'fas fa-paper-plane';
            }
        }

        if (btnSendAnother) {
            btnSendAnother.addEventListener('click', () => {
                formSuccessState.classList.add('hidden');
                contactForm.style.display = 'flex';
                resetToReady();
            });
        }
    }
});
