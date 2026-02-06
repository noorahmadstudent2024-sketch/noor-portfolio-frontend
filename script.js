/* ========================================
   NOOR AHMAD SIDDIQUE - PORTFOLIO WEBSITE
   JavaScript Interactions
   ======================================== */

// ========== API Configuration ==========
// Uses CONFIG from config.js if available, otherwise defaults to localhost
const API_BASE_URL = (typeof CONFIG !== 'undefined' && CONFIG.API_BASE_URL)
    ? CONFIG.API_BASE_URL
    : 'http://localhost:5000/api';

// ========== DOM Elements ==========
const loader = document.getElementById('loader');
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const sections = document.querySelectorAll('section[id]');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// ========== Dark Mode Toggle ==========
function initTheme() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeIcon(false);
    }
}

function updateThemeIcon(isDark) {
    if (isDark) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);

    // Add a nice rotation animation to the icon
    themeIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeIcon.style.transform = 'rotate(0deg)';
    }, 500);
}

// Theme toggle event listener
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        if (e.matches) {
            document.body.classList.add('dark-mode');
            updateThemeIcon(true);
        } else {
            document.body.classList.remove('dark-mode');
            updateThemeIcon(false);
        }
    }
});

// Initialize theme on page load
initTheme();

// ========== Loader ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('no-scroll');

        // Initialize animations after loader
        initAnimations();
        animateSkillBars();
        animateLanguageBars();
    }, 1000);
});

// ========== Header Scroll Effect ==========
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Add shadow on scroll
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Update active nav link
    updateActiveNavLink();

    // Show/hide back to top button
    if (currentScrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }

    lastScrollY = currentScrollY;
});

// ========== Mobile Navigation ==========
// Open menu
navToggle.addEventListener('click', () => {
    navMenu.classList.add('show');
    document.body.classList.add('no-scroll');
});

// Close menu
navClose.addEventListener('click', () => {
    navMenu.classList.remove('show');
    document.body.classList.remove('no-scroll');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        document.body.classList.remove('no-scroll');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show');
        document.body.classList.remove('no-scroll');
    }
});

// ========== Smooth Scrolling ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== Active Navigation Link ==========
function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========== Scroll Animations ==========
function initAnimations() {
    // Add animation classes to elements
    const animatedElements = [
        { selector: '.hero-data', class: 'fade-in' },
        { selector: '.hero-image', class: 'fade-in' },
        { selector: '.about-image-wrapper', class: 'slide-in-left' },
        { selector: '.about-content', class: 'slide-in-right' },
        { selector: '.skills-category', class: 'fade-in' },
        { selector: '.timeline-item', class: 'fade-in' },
        { selector: '.certification-card', class: 'fade-in' },
        { selector: '.project-card', class: 'fade-in' },
        { selector: '.language-card', class: 'fade-in' },
        { selector: '.contact-info', class: 'slide-in-left' },
        { selector: '.contact-form-wrapper', class: 'slide-in-right' }
    ];

    animatedElements.forEach(item => {
        document.querySelectorAll(item.selector).forEach(el => {
            el.classList.add(item.class);
        });
    });

    // Observe elements
    observeElements();
}

function observeElements() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars when skills section is visible
                if (entry.target.closest('.skills')) {
                    animateSkillBars();
                }

                // Animate language bars when languages section is visible
                if (entry.target.closest('.languages')) {
                    animateLanguageBars();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// ========== Skill Bars Animation ==========
let skillBarsAnimated = false;

function animateSkillBars() {
    if (skillBarsAnimated) return;

    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 200);
    });

    skillBarsAnimated = true;
}

// ========== Language Bars Animation ==========
let languageBarsAnimated = false;

function animateLanguageBars() {
    if (languageBarsAnimated) return;

    const languageBars = document.querySelectorAll('.language-progress');
    languageBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 200);
    });

    languageBarsAnimated = true;
}

// ========== Contact Form Validation ==========
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const formStatus = document.getElementById('form-status');

    // Clear previous errors
    clearErrors();

    // Validate fields
    let isValid = true;

    if (!validateField(name, 'name-error', 'Please enter your name')) {
        isValid = false;
    }

    if (!validateEmail(email, 'email-error')) {
        isValid = false;
    }

    if (!validateField(subject, 'subject-error', 'Please enter a subject')) {
        isValid = false;
    }

    if (!validateField(message, 'message-error', 'Please enter your message')) {
        isValid = false;
    }

    if (isValid) {
        const submitBtn = this.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const originalText = btnText.textContent;

        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            // Send data to backend API
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.value.trim(),
                    email: email.value.trim(),
                    message: `Subject: ${subject.value.trim()}\n\n${message.value.trim()}`
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                formStatus.textContent = data.message || 'Thank you! Your message has been sent successfully. I will get back to you soon.';
                formStatus.classList.remove('error');
                formStatus.classList.add('success');

                // Reset form
                this.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formStatus.classList.remove('success');
                    formStatus.textContent = '';
                }, 5000);
            } else {
                throw new Error(data.message || 'Failed to send message');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            formStatus.textContent = error.message || 'Failed to send message. Please try again later.';
            formStatus.classList.remove('success');
            formStatus.classList.add('error');

            // Hide error message after 5 seconds
            setTimeout(() => {
                formStatus.classList.remove('error');
                formStatus.textContent = '';
            }, 5000);
        } finally {
            btnText.textContent = originalText;
            submitBtn.disabled = false;
        }
    }
});

function validateField(field, errorId, errorMessage) {
    const errorElement = document.getElementById(errorId);
    if (field.value.trim() === '') {
        errorElement.textContent = errorMessage;
        field.style.borderColor = '#E74C3C';
        return false;
    }
    field.style.borderColor = 'transparent';
    return true;
}

function validateEmail(field, errorId) {
    const errorElement = document.getElementById(errorId);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (field.value.trim() === '') {
        errorElement.textContent = 'Please enter your email';
        field.style.borderColor = '#E74C3C';
        return false;
    }

    if (!emailRegex.test(field.value)) {
        errorElement.textContent = 'Please enter a valid email address';
        field.style.borderColor = '#E74C3C';
        return false;
    }

    field.style.borderColor = 'transparent';
    return true;
}

function clearErrors() {
    document.querySelectorAll('.form-error').forEach(error => {
        error.textContent = '';
    });

    document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
        field.style.borderColor = 'transparent';
    });
}

// ========== Input Focus Effects ==========
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});

// ========== Typing Effect (Optional Enhancement) ==========
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.element.innerHTML = `<span class="typing">${this.txt}</span>`;

        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typing effect if element exists
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = [
            'Multidisciplinary Tech Professional',
            'Aspiring AI Engineer',
            'Software Developer',
            'HVAC Technician'
        ];
        new TypeWriter(typingElement, words, 2000);
    }
});

// ========== Parallax Effect for Hero (Optional) ==========
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBlob = document.querySelector('.hero-image-blob');

    if (heroBlob && scrolled < window.innerHeight) {
        heroBlob.style.transform = `translate(${scrolled * 0.05}px, ${scrolled * 0.05}px)`;
    }
});

// ========== Stats Counter Animation ==========
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = counter.innerText;
        const numericTarget = parseInt(target.replace(/\D/g, ''));
        const suffix = target.replace(/[0-9]/g, '');

        let current = 0;
        const increment = numericTarget / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                counter.innerText = numericTarget + suffix;
                clearInterval(timer);
            } else {
                counter.innerText = Math.floor(current) + suffix;
            }
        }, stepTime);
    });
}

// Observe stats section for counter animation
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// ========== Project Card Hover Effect ==========
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========== Keyboard Navigation ==========
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        navMenu.classList.remove('show');
        document.body.classList.remove('no-scroll');
    }
});

// ========== Preload Critical Images ==========
function preloadImages() {
    const images = [
        // Add image paths here when you add actual images
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    // Add no-scroll class initially for loader
    document.body.classList.add('no-scroll');

    // Preload images
    preloadImages();

    // Update copyright year
    const copyrightYear = document.querySelector('.copyright');
    if (copyrightYear) {
        const year = new Date().getFullYear();
        copyrightYear.innerHTML = `&copy; ${year} Noor Ahmad Siddique. All Rights Reserved.`;
    }
});

// ========== Load Projects from Backend ==========
async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
            const projectsGrid = document.querySelector('.projects-grid');
            if (projectsGrid) {
                projectsGrid.innerHTML = ''; // Clear existing projects

                data.data.forEach(project => {
                    const projectCard = createProjectCard(project);
                    projectsGrid.appendChild(projectCard);
                });

                // Re-apply animations
                document.querySelectorAll('.project-card').forEach(card => {
                    card.classList.add('fade-in');
                });
                observeElements();
            }
        }
    } catch (error) {
        console.log('Using static projects (backend not available):', error.message);
        // Keep static projects if backend is not available
    }
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';

    // Determine icon based on project title or use default
    let icon = 'fas fa-code';
    if (project.title.toLowerCase().includes('ai')) icon = 'fas fa-brain';
    else if (project.title.toLowerCase().includes('hvac')) icon = 'fas fa-temperature-low';
    else if (project.title.toLowerCase().includes('portfolio') || project.title.toLowerCase().includes('web')) icon = 'fas fa-globe';

    card.innerHTML = `
        <div class="project-image">
            ${project.imageUrl
                ? `<img src="${project.imageUrl}" alt="${project.title}" style="width:100%;height:100%;object-fit:cover;">`
                : `<div class="project-image-placeholder"><i class="${icon}"></i></div>`
            }
            <div class="project-overlay">
                ${project.liveLink ? `<a href="${project.liveLink}" target="_blank" class="project-link" aria-label="View Project"><i class="fas fa-external-link-alt"></i></a>` : ''}
                ${project.githubLink ? `<a href="${project.githubLink}" target="_blank" class="project-link" aria-label="View Code"><i class="fab fa-github"></i></a>` : ''}
            </div>
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tags">
                ${project.technologies.map(tech => `<span class="project-tag">${tech}</span>`).join('')}
            </div>
            ${project.liveLink
                ? `<a href="${project.liveLink}" target="_blank" class="btn btn-small"><i class="fas fa-eye"></i> View Details</a>`
                : `<button class="btn btn-small btn-disabled" disabled><i class="fas fa-clock"></i> Coming Soon</button>`
            }
        </div>
    `;

    // Add hover effect
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });

    return card;
}

// Load projects when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
});

// ========== Console Message ==========
console.log('%c Welcome to Noor Ahmad Siddique\'s Portfolio! ', 'background: #2C3E50; color: #fff; padding: 10px; font-size: 14px; border-radius: 5px;');
console.log('%c Built with HTML, CSS & JavaScript ', 'background: #3498DB; color: #fff; padding: 5px; font-size: 12px; border-radius: 3px;');
console.log('%c Backend API: ' + API_BASE_URL + ' ', 'background: #27AE60; color: #fff; padding: 5px; font-size: 12px; border-radius: 3px;');
