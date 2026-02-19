// ========================================
// Police Modern School - Main JavaScript (Optimized)
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 20,
            disable: window.innerWidth < 100
        });
    }

    // 2. Initialize Core Components
    initFAQ();
    initTestimonialCarousel();
    initLanguageSwitcher();
    initContactForm();
    initBlastEffect();

    // 3. Smooth Scroll Enhancement
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbar = document.getElementById('navbar');
                const noticeBoard = document.getElementById('notice-board');
                let offset = (navbar ? navbar.offsetHeight : 0) + (noticeBoard ? noticeBoard.offsetHeight : 0) + 20;

                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ========================================
// FAQ Accordion
// ========================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.querySelector('.faq-question').addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faq => faq.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });
}

// ========================================
// Testimonial Carousel
// ========================================
function initTestimonialCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const counterDisplay = document.querySelector('.carousel-counter');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    let autoPlayInterval;

    if (slides.length === 0) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (counterDisplay) counterDisplay.textContent = `${currentSlide + 1} / ${slides.length}`;
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
    }

    function stopAutoPlay() { clearInterval(autoPlayInterval); }

    if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(currentSlide - 1); startAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(currentSlide + 1); startAutoPlay(); });

    showSlide(0);
    startAutoPlay();

    const carousel = document.querySelector('.testimonial-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
}

// ========================================
// Language Switcher Logic
// ========================================
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            localStorage.setItem('language', btn.dataset.lang);
            // Redirection logic if needed, or simple dynamic change if tags are present
        });
    });
}

// ========================================
// Contact Form Handler
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
            const formData = new FormData(contactForm);
            const contactData = {
                name: formData.get('name') || '',
                email: formData.get('email') || '',
                phone: formData.get('phone') || '',
                message: formData.get('message') || '',
                createdAt: new Date().toISOString(),
                read: false
            };

            if (typeof firestoreHelper !== 'undefined') {
                const result = await firestoreHelper.addDocument('contacts', contactData);
                if (result.success) {
                    showNotification('धन्यवाद! संदेश सफलतापूर्वक भेज दिया गया है।', 'success');
                    contactForm.reset();
                } else { throw new Error(result.error); }
            } else {
                showNotification('धन्यवाद! हम आपसे जल्द संपर्क करेंगे।', 'success');
                contactForm.reset();
            }
        } catch (error) {
            showNotification('कुछ गलत हो गया। कृपया पुनः प्रयास करें।', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `position: fixed; top: 20px; right: 20px; padding: 15px 25px; background: ${type === 'success' ? '#10b981' : '#ef4444'}; color: white; border-radius: 8px; z-index: 10000; animation: slideInRight 0.3s ease;`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => { notification.remove(); }, 3000);
}

// ========================================
// Blast Effect for Hero Badges
// ========================================
function initBlastEffect() {
    const badgeRight = document.getElementById('hero-badge-right');
    const badgeLeft = document.getElementById('hero-badge-left');
    const heroSection = document.getElementById('home');
    if (!badgeRight || !badgeLeft || !heroSection) return;

    function createParticles(badge) {
        const centerX = badge.offsetLeft + badge.offsetWidth / 2;
        const centerY = badge.offsetTop + badge.offsetHeight / 2;
        const colors = ['#EF4444', '#FFFFFF', '#F59E0B', '#3B82F6', '#10B981'];

        for (let i = 0; i < 150; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `position: absolute; width: 10px; height: 10px; background: ${colors[Math.floor(Math.random() * colors.length)]}; border-radius: 50%; left: ${centerX}px; top: ${centerY}px; pointer-events: none; z-index: 30;`;
            heroSection.appendChild(particle);

            particle.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(${(Math.random() - 0.5) * 600}px, ${(Math.random() - 0.5) * 600}px) scale(0)`, opacity: 0 }
            ], { duration: 1500, easing: 'ease-out' }).onfinish = () => particle.remove();
        }
    }

    function cycleBadge(current, next) {
        current.style.opacity = '1'; current.style.transform = 'scale(1)';
        setTimeout(() => {
            current.style.transform = 'scale(1.3)';
            setTimeout(() => {
                createParticles(current);
                current.style.opacity = '0'; current.style.transform = 'scale(0)';
                setTimeout(() => cycleBadge(next, current), 2000);
            }, 150);
        }, 1000);
    }
    cycleBadge(badgeRight, badgeLeft);
}

// ========================================
// NEWS TICKER HANDLER
// ========================================
async function loadNewsTicker() {
    const tickerContent = document.getElementById('news-ticker-content');
    if (!tickerContent) return;
    const cached = localStorage.getItem('pms_notifications');
    if (cached) {
        try {
            const notifications = JSON.parse(cached).filter(n => n.status === 'active' || !n.status);
            if (notifications.length > 0) {
                tickerContent.innerHTML = notifications.map(n => `<span class="news-item inline-block mx-8">• ${n.message || n.text}</span>`).join('');
            }
        } catch (e) { }
    }
}

const fetchAndCacheNotifications = async () => {
    try {
        if (typeof firestoreHelper === 'undefined') return;
        const result = await firestoreHelper.getDocuments('notifications');
        if (result.success && result.data.length > 0) {
            localStorage.setItem('pms_notifications', JSON.stringify(result.data));
            const active = result.data.filter(n => n.status === 'active' || !n.status);
            const ticker = document.getElementById('news-ticker-content');
            if (ticker && active.length > 0) {
                ticker.innerHTML = active.map(n => `<span class="news-item inline-block mx-8">• ${n.message || n.text}</span>`).join('');
            }
        }
    } catch (e) { }
};

window.addEventListener('firebase-loaded', fetchAndCacheNotifications, { once: true });
if (typeof firestoreHelper !== 'undefined') fetchAndCacheNotifications();
loadNewsTicker();

