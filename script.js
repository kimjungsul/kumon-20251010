// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initBannerSlider();
    initScrollEffects();
    initSmoothScrolling();
    initVideoCards();
    initScrollToTop();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
}

// Banner Slider
function initBannerSlider() {
    const bannerSlides = document.querySelectorAll('.banner-slide');
    const tabs = document.querySelectorAll('.tab');
    const prevBtn = document.querySelector('.banner-arrow.prev');
    const nextBtn = document.querySelector('.banner-arrow.next');
    
    let currentSlide = 0;
    const totalSlides = bannerSlides.length;
    
    // Tab click handlers
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            setActiveSlide(index);
        });
    });
    
    // Arrow click handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            setActiveSlide(currentSlide);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            setActiveSlide(currentSlide);
        });
    }
    
    // Auto slide functionality
    setInterval(function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        setActiveSlide(currentSlide);
    }, 5000);
    
    function setActiveSlide(index) {
        // Remove active class from all slides and tabs
        bannerSlides.forEach(slide => slide.classList.remove('active'));
        tabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to current slide and tab
        if (bannerSlides[index]) {
            bannerSlides[index].classList.add('active');
        }
        if (tabs[index]) {
            tabs[index].classList.add('active');
        }
        
        currentSlide = index;
    }
}

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background on scroll
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Smooth Scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Video Cards Interaction
function initVideoCards() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        const playIcon = card.querySelector('.play-icon');
        
        if (playIcon) {
            playIcon.addEventListener('click', function() {
                // Add video modal functionality here
                showVideoModal(card);
            });
        }
        
        // Card hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Video Modal with actual video player
function showVideoModal(card) {
    const videoTitle = card.querySelector('h3').textContent;
    let videoUrl = '';
    
    // Set video URL based on title
    if (videoTitle.includes('구몬선생님 생생 인터뷰')) {
        videoUrl = 'https://tkep.kyowon.co.kr/kumon/down/kumon/bbs/0011/구몬선생님생생인터뷰_5차.mp4';
    } else if (videoTitle.includes('선배선생님의 솔직 경험담!')) {
        videoUrl = 'https://tkep.kyowon.co.kr/kumon/down/kumon/bbs/0011/vid_a.mp4';
    } else if (videoTitle.includes('사람을 키우는 사람')) {
        videoUrl = 'https://tkep.kyowon.co.kr/kumon/vod/kumon/bbs/0011/435.mp4';
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>${videoTitle}</h3>
                <div class="video-container">
                    ${videoUrl ? `
                        <video controls width="100%" height="auto">
                            <source src="${videoUrl}" type="video/mp4">
                            <p>브라우저가 비디오를 지원하지 않습니다.</p>
                        </video>
                    ` : `
                        <div class="video-placeholder">
                            <i class="fas fa-play-circle"></i>
                            <p>동영상 준비 중입니다.</p>
                        </div>
                    `}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    function closeModal() {
        // Pause video before closing
        const video = modal.querySelector('video');
        if (video) {
            video.pause();
        }
        document.body.removeChild(modal);
    }
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        });
    }
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.video-card, .recruitment-card, .feature-card');
    animateElements.forEach(el => observer.observe(el));
}

// Form handling (if needed)
function initFormHandling() {
    const consultationBtn = document.querySelector('.consultation-btn');
    
    if (consultationBtn) {
        consultationBtn.addEventListener('click', function() {
            // Add consultation form modal or redirect
            alert('상담 신청 기능이 구현되었습니다.');
        });
    }
}

// Touch/Swipe support for mobile
function initTouchSupport() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    
    const banner = document.querySelector('.main-banner');
    
    if (banner) {
        banner.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        banner.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            handleSwipe();
        });
        
        function handleSwipe() {
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - next slide
                    const nextBtn = document.querySelector('.banner-arrow.next');
                    if (nextBtn) nextBtn.click();
                } else {
                    // Swipe right - previous slide
                    const prevBtn = document.querySelector('.banner-arrow.prev');
                    if (prevBtn) prevBtn.click();
                }
            }
        }
    }
}

// Scroll to specific section
function scrollToSection(sectionId) {
    const targetSection = document.querySelector(`.${sectionId}`);
    if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 50; // 50px 추가 여백
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initFormHandling();
    initTouchSupport();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Resize handler
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments
    const isMobile = window.innerWidth <= 768;
    const mainNav = document.querySelector('.main-nav');
    
    if (isMobile && mainNav) {
        mainNav.classList.remove('active');
    }
}, 250));

// Add CSS for additional styles
const additionalStyles = `
    .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    .header {
        transition: transform 0.3s ease, background 0.3s ease;
    }
    
    .main-nav.active {
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        padding: 20px;
    }
    
    .main-nav.active ul {
        flex-direction: column;
        gap: 15px;
    }
    
    .mobile-menu-btn.active i::before {
        content: "\\f00d";
    }
    
    .video-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-content {
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 800px;
        width: 90%;
        position: relative;
    }
    
    .video-container {
        margin-top: 20px;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .video-container video {
        display: block;
        width: 100%;
        height: auto;
        max-height: 60vh;
    }
    
    .modal-close {
        position: absolute;
        top: 15px;
        right: 20px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    }
    
    .video-placeholder {
        text-align: center;
        padding: 40px;
        color: #666;
    }
    
    .video-placeholder i {
        font-size: 48px;
        color: #e74c3c;
        margin-bottom: 15px;
    }
    
    .scroll-top {
        transition: opacity 0.3s ease, visibility 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .main-nav {
            display: none;
        }
        
        .main-nav.active {
            display: block;
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

