// ========================================
// Police Modern School - Main JavaScript
// ========================================

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
    // AOS will be loaded from CDN
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Initialize all components
    initGalleryLightbox();
    initFAQ();
    initTestimonialCarousel();
    initCounters();
    initDarkMode();
    initLanguageSwitcher();
    initChatbot();
});

// ========================================
// Gallery Lightbox
// ========================================
function initGalleryLightbox() {
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = createLightbox();

    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            openLightbox(img.src, index, galleryImages);
        });
    });

    function createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <span class="lightbox-nav lightbox-prev">&#10094;</span>
            <img class="lightbox-content" src="" alt="Gallery Image">
            <span class="lightbox-nav lightbox-next">&#10095;</span>
        `;
        document.body.appendChild(lightbox);

        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        return lightbox;
    }

    function openLightbox(src, index, images) {
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = lightbox.querySelector('.lightbox-content');
        lightbox.classList.add('active');
        lightboxImg.src = src;
        document.body.style.overflow = 'hidden';

        // Navigation
        let currentIndex = index;
        const prev = lightbox.querySelector('.lightbox-prev');
        const next = lightbox.querySelector('.lightbox-next');

        prev.onclick = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentIndex].src;
        };

        next.onclick = () => {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImg.src = images[currentIndex].src;
        };

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);
        function handleKeyboard(e) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prev.click();
            if (e.key === 'ArrowRight') next.click();
        }
    }

    function closeLightbox() {
        const lightbox = document.querySelector('.lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyboard);
    }
}

// ========================================
// Gallery Category Filter
// ========================================
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ========================================
// FAQ Accordion
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQs
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ========================================
// Testimonial Carousel
// ========================================
function initTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    let autoPlayInterval;

    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Initialize
    showSlide(0);
    startAutoPlay();

    // Pause on hover
    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
}

// ========================================
// Animated Counters
// ========================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Animation speed

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const increment = target / speed;

                function updateCount() {
                    const count = +counter.innerText;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                }

                updateCount();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counter.innerText = '0';
        observer.observe(counter);
    });
}

// ========================================
// Dark Mode Toggle
// ========================================
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;

    // Check saved preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', null);
        }
    });
}

// ========================================
// Language Switcher
// ========================================
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'hi';

    // Load translations
    const translations = {
        hi: {
            home: 'मुख्य पृष्ठ',
            about: 'हमारे बारे में',
            facilities: 'सुविधाएं',
            achievements: 'उपलब्धियां',
            gallery: 'गैलरी',
            contact: 'संपर्क करें'
        },
        en: {
            home: 'Home',
            about: 'About Us',
            facilities: 'Facilities',
            achievements: 'Achievements',
            gallery: 'Gallery',
            contact: 'Contact'
        }
    };

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            localStorage.setItem('language', lang);
            updateLanguage(lang);
        });
    });

    function updateLanguage(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.dataset.translate;
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    // Initialize with saved language
    updateLanguage(currentLang);
}

// ========================================
// Contact Form Handler (EmailJS)
// ========================================
// CONTACT FORM HANDLER
// ========================================
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'भेजा जा रहा है...';

        try {
            // Get form data
            const formData = new FormData(contactForm);
            const contactData = {
                name: formData.get('name') || '',
                email: formData.get('email') || '',
                phone: formData.get('phone') || '',
                message: formData.get('message') || '',
                createdAt: new Date().toISOString(),
                read: false
            };

            // Save to Firebase (requires firebase-config.js to be imported)
            if (typeof firestoreHelper !== 'undefined') {
                const result = await firestoreHelper.addDocument('contacts', contactData);

                if (result.success) {
                    showNotification('धन्यवाद! आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।', 'success');
                    contactForm.reset();
                } else {
                    throw new Error(result.error);
                }
            } else {
                // Fallback if Firebase is not loaded
                console.error('Firebase not loaded. Contact data:', contactData);
                showNotification('धन्यवाद! हम आपसे जल्द ही संपर्क करेंगे।', 'success');
                contactForm.reset();
            }
        } catch (error) {
            console.error('Contact form error:', error);
            showNotification('कुछ गलत हो गया। कृपया पुनः प्रयास करें।', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// ========================================
// Notification System
// ========================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// WhatsApp Chatbot
// ========================================
function initChatbot() {
    const chatBtn = document.getElementById('whatsapp-chat');
    if (!chatBtn) return;

    chatBtn.addEventListener('click', () => {
        const phone = '919876543210'; // Replace with actual WhatsApp number
        const message = 'नमस्ते! मुझे प्रवेश के बारे में जानकारी चाहिए।';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    });
}

// ========================================
// Lazy Loading Images
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Smooth Scroll Enhancement
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                // Calculate navbar height dynamically
                const navbar = document.getElementById('navbar');
                const noticeBoard = document.getElementById('notice-board');
                let offset = 0;

                if (navbar) offset += navbar.offsetHeight;
                if (noticeBoard) offset += noticeBoard.offsetHeight;

                // Add small buffer
                offset += 20;

                const targetPosition = target.offsetTop - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ========================================
// Back to Top Button
// ========================================
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top
initBackToTop();

// ========================================
// Form Auto-save (for multi-step forms)
// ========================================
function initFormAutoSave() {
    const forms = document.querySelectorAll('form[data-autosave]');

    forms.forEach(form => {
        const formId = form.id || 'form-' + Math.random();

        // Load saved data
        const savedData = localStorage.getItem(formId);
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) input.value = data[key];
            });
        }

        // Save on input
        form.addEventListener('input', () => {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            localStorage.setItem(formId, JSON.stringify(data));
        });

        // Clear on submit
        form.addEventListener('submit', () => {
            localStorage.removeItem(formId);
        });
    });
}

// Initialize form auto-save
initFormAutoSave();

// ========================================
// Print Functionality
// ========================================
function printPage() {
    window.print();
}

// ========================================
// Share Functionality
// ========================================
function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: 'पुलिस मॉडर्न स्कूल, रायबरेली',
            text: 'बच्चों के उज्ज्वल भविष्य के लिए सर्वश्रेष्ठ स्कूल',
            url: window.location.href
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        showNotification('लिंक कॉपी हो गया!', 'success');
    }
}

// ========================================
// Analytics Event Tracking
// ========================================
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Track important interactions
document.querySelectorAll('a[href*="admission"]').forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('Navigation', 'Click', 'Admission Link');
    });
});

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => {
        trackEvent('Form', 'Submit', form.id || 'Unknown Form');
    });
});

// Blast Effect for Hero Badges - Alternating System
// ========================================
function initBlastEffect() {
    const badgeRight = document.getElementById('hero-badge-right');
    const badgeLeft = document.getElementById('hero-badge-left');
    const heroSection = document.getElementById('home');

    if (!badgeRight || !badgeLeft || !heroSection) return;

    // Configuration
    const SHOW_DURATION = 1000; // 1 second
    const BLAST_DURATION = 2000; // 3 seconds
    const PARTICLE_COUNT = 300; // Increased for better visibility

    function createParticles(badge) {
        // Badge geometric center
        const badgeLeft = badge.offsetLeft;
        const badgeTop = badge.offsetTop;
        const badgeWidth = badge.offsetWidth;
        const badgeHeight = badge.offsetHeight;

        const centerX = badgeLeft + badgeWidth / 2;
        const centerY = badgeTop + badgeHeight / 2;

        // Create flash effect at blast origin
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: absolute;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 25;
            transform: translate(-50%, -50%);
        `;
        heroSection.appendChild(flash);

        // Animate flash
        flash.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(8)', opacity: 0 }
        ], {
            duration: 400,
            easing: 'ease-out',
            fill: 'forwards'
        }).onfinish = () => flash.remove();

        const colors = ['#EF4444', '#FFFFFF', '#F59E0B', '#3B82F6', '#10B981']; // Red, White, Yellow, Blue, Green

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const particle = document.createElement('div');
            particle.classList.add('firework-particle');

            // Larger particles for better visibility (8-16px)
            const size = Math.random() * 8 + 8;
            const color = colors[Math.floor(Math.random() * colors.length)];

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.backgroundColor = color;
            // Add strong glow effect
            particle.style.boxShadow = `0 0 ${size * 2}px ${color}, 0 0 ${size}px ${color}`;

            // Start at center
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;

            heroSection.appendChild(particle);

            // Spread particles across entire hero section
            const targetX = Math.random() * heroSection.offsetWidth;
            const targetY = Math.random() * heroSection.offsetHeight;

            const rotation = Math.random() * 720 - 360;
            const duration = Math.random() * 1000 + 2000; // 2-3s for slower, more visible effect

            const animation = particle.animate([
                {
                    transform: `translate(-50%, -50%) scale(1) rotate(0deg)`,
                    opacity: 1
                },
                {
                    transform: `translate(${targetX - centerX}px, ${targetY - centerY}px) scale(0.3) rotate(${rotation}deg)`,
                    opacity: 0.8,
                    offset: 0.7 // Keyframe at 70%
                },
                {
                    transform: `translate(${targetX - centerX}px, ${targetY - centerY}px) scale(0) rotate(${rotation}deg)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smoother easing
                fill: 'forwards'
            });

            animation.onfinish = () => particle.remove();
        }
    }

    function cycleBadge(currentBadge, nextBadge) {
        // State 1: Show Current Badge
        currentBadge.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease';
        currentBadge.style.opacity = '1';
        currentBadge.style.transform = 'scale(1)';

        setTimeout(() => {
            // State 2: Blast Current Badge
            // Badge expansion before blast
            currentBadge.style.transition = 'transform 0.15s ease-out';
            currentBadge.style.transform = 'scale(1.3)';

            setTimeout(() => {
                // Create particles
                createParticles(currentBadge);

                // Hide current badge instantly
                currentBadge.style.transition = 'transform 0.05s ease-in, opacity 0.05s ease-in';
                currentBadge.style.transform = 'scale(0)';
                currentBadge.style.opacity = '0';

                // Immediately show next badge (alternating effect)
                setTimeout(() => {
                    cycleBadge(nextBadge, currentBadge);
                }, BLAST_DURATION);

            }, 150);

        }, SHOW_DURATION);
    }

    // Start with right badge, alternate to left
    cycleBadge(badgeRight, badgeLeft);
}

// ========================================
// NEWS TICKER HANDLER
// ========================================
async function loadNewsTicker() {
    const tickerContent = document.getElementById('news-ticker-content');
    if (!tickerContent) return;

    // 1. FAST PATH: Load from LocalStorage immediately for instant display
    const cachedNotifications = localStorage.getItem('pms_notifications');
    if (cachedNotifications) {
        try {
            const notifications = JSON.parse(cachedNotifications);
            const activeNotifications = notifications.filter(n => n.status === 'active' || !n.status);

            if (activeNotifications.length > 0) {
                // Display cached content immediately
                tickerContent.innerHTML = activeNotifications.map(notification =>
                    `<span class="news-item inline-block mx-8">• ${notification.message || notification.text}</span>`
                ).join('');
                console.log('✅ Loaded notifications from cache (Instant)');
            }
        } catch (e) {
            console.error('Cache parse error:', e);
        }
    }
}

// Helper to fetch and update cache AND update UI immediately
const fetchAndCacheNotifications = async () => {
    try {
        const result = await firestoreHelper.getDocuments('notifications');
        if (result.success && result.data.length > 0) {
            const activeNotifications = result.data.filter(n => n.status === 'active' || !n.status);

            // Update localStorage cache
            localStorage.setItem('pms_notifications', JSON.stringify(result.data));

            // ✅ Update the ticker DOM immediately with fresh data
            const tickerContent = document.getElementById('news-ticker-content');
            if (tickerContent && activeNotifications.length > 0) {
                tickerContent.innerHTML = activeNotifications.map(notification =>
                    `<span class="news-item inline-block mx-8">• ${notification.message || notification.text}</span>`
                ).join('');
                console.log('✅ Ticker updated with fresh Firestore data');
            }
        }
    } catch (error) {
        console.warn('Failed to fetch fresh notifications (background):', error);
    }
};

// Trigger fetch immediately when Firebase is ready (no idle callback delay)
const fetchFreshData = async () => {
    if (typeof firestoreHelper !== 'undefined') {
        await fetchAndCacheNotifications();
    } else {
        // Firebase not ready yet — wait for the event
        window.addEventListener('firebase-loaded', async () => {
            await fetchAndCacheNotifications();
        }, { once: true });
    }
};

// Start immediately — don't wait for idle
fetchFreshData();

// Initialize immediately (don't wait for DOMContentLoaded if script is deferred)
loadNewsTicker();

// Initialize others on load
document.addEventListener('DOMContentLoaded', () => {
    initBlastEffect();
    initContactForm();
    // Ticker already started
});

