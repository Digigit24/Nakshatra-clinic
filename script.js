// ===================================
// MOBILE MENU TOGGLE
// ===================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link, .nav .cta-button');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

// ===================================
// FAQ ACCORDION
// ===================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Toggle current item
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ===================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip if it's just "#" (used for CTA buttons)
        if (href === '#') {
            e.preventDefault();
            // Scroll to assessment section
            const assessmentSection = document.getElementById('assessment');
            if (assessmentSection) {
                assessmentSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            return;
        }

        const targetElement = document.querySelector(href);

        if (targetElement) {
            e.preventDefault();
            const headerOffset = 100;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll('.condition-card, .testimonial-card, .receive-card');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ===================================
// HEADER SCROLL EFFECT
// ===================================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 16px rgba(32, 41, 110, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(32, 41, 110, 0.08)';
    }

    lastScroll = currentScroll;
});

// ===================================
// TIMELINE ANIMATION ON SCROLL
// ===================================

const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px'
});

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// ===================================
// COUNTER ANIMATION FOR STATS
// ===================================

const statNumber = document.querySelector('.stat-number');

if (statNumber) {
    const observeStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(statNumber, 0, 90, 2000);
                observeStats.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observeStats.observe(statNumber.parentElement);
}

function animateCounter(element, start, end, duration) {
    let startTime = null;

    function step(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// ===================================
// PHASE PILLS HOVER EFFECT
// ===================================

const phasePills = document.querySelectorAll('.phase-pill');

phasePills.forEach((pill, index) => {
    pill.addEventListener('mouseenter', () => {
        pill.style.transform = 'scale(1.1) rotate(-2deg)';
        pill.style.boxShadow = '0 8px 16px rgba(32, 41, 110, 0.2)';
    });

    pill.addEventListener('mouseleave', () => {
        pill.style.transform = 'scale(1) rotate(0deg)';
        pill.style.boxShadow = 'none';
    });
});

// ===================================
// LAZY LOADING IMAGES
// ===================================

const images = document.querySelectorAll('img[src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

images.forEach(img => {
    imageObserver.observe(img);
});

// ===================================
// PARALLAX EFFECT ON HERO IMAGE
// ===================================

const heroImage = document.querySelector('.hero-image');

if (heroImage && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        heroImage.style.transform = `translateY(${parallax}px)`;
    });
}

// ===================================
// FORM VALIDATION (if needed in future)
// ===================================

// This can be extended when you add actual contact forms
// For now, CTA buttons link to assessment booking

const ctaButtons = document.querySelectorAll('.cta-button-large, .cta-button-hero');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Add analytics tracking here if needed
        console.log('CTA clicked:', button.textContent);

        // You can add actual booking system integration here
        // For now, it just logs the click
    });
});

// ===================================
// PROGRESS INDICATOR
// ===================================

const createProgressBar = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #FF70A3 0%, #20296E 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        progressBar.style.width = progress + '%';
    });
};

createProgressBar();

// ===================================
// ADD ANIMATION TO BOXES ON HOVER
// ===================================

const highlightBoxes = document.querySelectorAll('.highlight-box, .truth-box, .insight-box');

highlightBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'scale(1.02)';
        box.style.transition = 'transform 0.3s ease';
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = 'scale(1)';
    });
});

// ===================================
// TESTIMONIAL CARD ANIMATIONS
// ===================================

const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});

// ===================================
// KEYBOARD ACCESSIBILITY FOR FAQ
// ===================================

faqQuestions.forEach(question => {
    question.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// ===================================
// PAGE LOAD ANIMATION
// ===================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger hero animations
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
    }
});

// ===================================
// SCROLL TO TOP BUTTON (Optional)
// ===================================

const createScrollToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FF70A3 0%, #ff5690 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 16px rgba(255, 112, 163, 0.4);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1) translateY(-5px)';
        button.style.boxShadow = '0 8px 24px rgba(255, 112, 163, 0.5)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1) translateY(0)';
        button.style.boxShadow = '0 4px 16px rgba(255, 112, 163, 0.4)';
    });
};

createScrollToTopButton();

// ===================================
// GSAP SCROLL ANIMATIONS
// ===================================

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Animate the Timeline Section with GSAP
const timelineSection = document.querySelector('.timeline');

if (timelineSection) {
    // Create a beautiful staggered animation for timeline items
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            markers: false
        },
        opacity: 0,
        x: -100,
        stagger: 0.3,
        duration: 1,
        ease: 'power3.out'
    });

    // Animate marker circles with scale effect
    gsap.from('.marker-circle', {
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        scale: 0,
        rotation: 360,
        stagger: 0.3,
        duration: 0.8,
        ease: 'back.out(1.7)'
    });

    // Animate phase results with fade and slide
    gsap.from('.phase-result', {
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        stagger: 0.4,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Parallax effect for timeline content boxes
    gsap.utils.toArray('.timeline-content').forEach((content, i) => {
        gsap.to(content, {
            scrollTrigger: {
                trigger: content,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: -30,
            ease: 'none'
        });
    });

    // Highlight active phase on scroll
    ScrollTrigger.create({
        trigger: '.timeline',
        start: 'top center',
        end: 'bottom center',
        onUpdate: (self) => {
            const progress = self.progress;
            document.querySelectorAll('.marker-circle').forEach((circle, index) => {
                if (progress > index / 3) {
                    circle.style.background = '#FF70A3';
                    circle.style.transform = 'scale(1.15)';
                } else {
                    circle.style.background = '#20296E';
                    circle.style.transform = 'scale(1)';
                }
            });
        }
    });
}

// Animate section images with parallax
gsap.utils.toArray('.reality-image, .approach-intro-image, .program-image').forEach(image => {
    gsap.from(image, {
        scrollTrigger: {
            trigger: image,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        scale: 0.8,
        duration: 1.2,
        ease: 'power3.out'
    });
});

// Animate receive cards with 3D flip effect
gsap.from('.receive-card', {
    scrollTrigger: {
        trigger: '.receive-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    rotateY: 90,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: 'power2.out',
    transformPerspective: 1000
});

// Animate testimonial cards
gsap.from('.testimonial-card', {
    scrollTrigger: {
        trigger: '.outcomes-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out'
});

// Animate condition cards with bounce
gsap.from('.condition-card', {
    scrollTrigger: {
        trigger: '.who-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
    },
    opacity: 0,
    scale: 0.5,
    stagger: 0.1,
    duration: 0.6,
    ease: 'back.out(1.7)'
});

// Smooth scroll reveal for section titles
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out'
    });
});

// ===================================
// CONSOLE MESSAGE
// ===================================

console.log('%c🌸 Nakshatra Clinic - Rebalance in 90 Days', 'color: #FF70A3; font-size: 20px; font-weight: bold;');
console.log('%cA comprehensive medical transformation program for women', 'color: #20296E; font-size: 14px;');
