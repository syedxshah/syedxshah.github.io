/* ============================================
   IGLOO.INC INSPIRED PORTFOLIO
   Premium JavaScript Interactions
   💎 Syed Ansar Ali
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initNavigation();
    initScrollAnimations();
    initSkillBars();
    initFormHandler();
    initCopyProtection();
    initTypingAnimation();
    console.log('💎 Portfolio Loaded Successfully');
});

/* === Typing Animation === */
function initTypingAnimation() {
    const typingElement = document.getElementById('typing-text');
    const typingCursor = document.querySelector('.typing-cursor');
    if (!typingElement) return;
    
    // Hide cursor completely
    if (typingCursor) {
        typingCursor.style.display = 'none';
    }
    
    const words = ['CODER', 'DEVELOPER', 'SYED ANSAR ALI'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isPaused) {
            setTimeout(type, 100);
            return;
        }
        
        if (isDeleting) {
            // Deleting characters
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 500); // Pause before typing next word
                return;
            }
            
            setTimeout(type, 50); // Deleting speed
        } else {
            // Typing characters
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentWord.length) {
                isPaused = true;
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    type();
                }, 2000); // Pause at complete word
                return;
            }
            
            setTimeout(type, 100); // Typing speed
        }
    }
    
    // Start typing
    setTimeout(type, 1000);
}

/* === Custom Cursor === */
function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animate() {
        // Cursor follows mouse directly
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Follower has more lag
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .work-item, input, textarea');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

/* === Navigation === */
function initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');
    
    // Mobile toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    // Close on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* === Scroll Animations === */
function initScrollAnimations() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll(
        '.section-header, .about-intro, .about-body, .about-img-wrapper, ' +
        '.detail, .skill-item, .work-item, .contact-cta, .contact-link, ' +
        '.form-group, .stat, .hero-image'
    );
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
    
    // Hero text animation
    const words = document.querySelectorAll('.word');
    words.forEach((word, index) => {
        word.style.setProperty('--i', index);
    });
}

/* === Skill Bars === */
function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });
    
    skillFills.forEach(fill => observer.observe(fill));
}

/* === Form Handler === */
function initFormHandler() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = formData.get('name');
            
            showNotification(`Thank you, ${name}! Your message has been sent. 💎`);
            form.reset();
        });
    }
}

/* === Show Notification === */
function showNotification(message) {
    // Remove existing
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <span class="notification-icon">💎</span>
        <span class="notification-text">${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        display: flex;
        align-items: center;
        gap: 15px;
        padding: 20px 30px;
        background: linear-gradient(135deg, #00ff88, #00d4ff);
        color: #0a0a0a;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        border-radius: 15px;
        z-index: 10000;
        transform: translateY(100px);
        opacity: 0;
        animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        box-shadow: 0 20px 50px rgba(0, 255, 136, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideUp {
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease reverse forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/* === Copy Protection === */
function initCopyProtection() {
    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showProtectionMessage('Right-click is disabled');
        return false;
    });
    
    // Disable keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Block Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+U, Ctrl+S, Ctrl+A, Ctrl+P
        if (e.ctrlKey && ['c', 'C', 'v', 'V', 'x', 'X', 'u', 'U', 's', 'S', 'a', 'A', 'p', 'P'].includes(e.key)) {
            // Allow in form inputs
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return true;
            }
            e.preventDefault();
            showProtectionMessage('This action is disabled');
            return false;
        }
        // Block Ctrl+Shift+I/J/C (Dev tools)
        if (e.ctrlKey && e.shiftKey && ['i', 'I', 'j', 'J', 'c', 'C'].includes(e.key)) {
            e.preventDefault();
            showProtectionMessage('Developer tools disabled');
            return false;
        }
        // Block F12
        if (e.key === 'F12') {
            e.preventDefault();
            showProtectionMessage('Developer tools disabled');
            return false;
        }
        // Block PrintScreen
        if (e.key === 'PrintScreen') {
            e.preventDefault();
            showProtectionMessage('Screenshot blocked');
            return false;
        }
    });
    
    // Disable image drag
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
        img.addEventListener('mousedown', (e) => e.preventDefault());
    });
    
    // Disable copy/cut/paste on document (except inputs)
    ['copy', 'cut', 'paste'].forEach(event => {
        document.addEventListener(event, (e) => {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                showProtectionMessage('Copy is disabled');
                return false;
            }
        });
    });
    
    // Clear clipboard on PrintScreen
    document.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
            navigator.clipboard.writeText('').catch(() => {});
            showProtectionMessage('Screenshot blocked');
        }
    });
    
    // Disable text selection via mouse (except inputs)
    document.addEventListener('selectstart', (e) => {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    });
    
    // Mobile: Disable long press context menu
    document.addEventListener('touchstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    }, { passive: false });
    
    // Disable drag on all elements
    document.addEventListener('dragstart', (e) => {
        e.preventDefault();
        return false;
    });
    
    console.log('💎 Copy protection enabled');
}

/* === Protection Message === */
function showProtectionMessage(msg) {
    const existing = document.querySelector('.protection-msg');
    if (existing) existing.remove();
    
    const message = document.createElement('div');
    message.className = 'protection-msg';
    message.textContent = msg;
    message.style.cssText = `
        position: fixed;
        top: 30px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        padding: 15px 30px;
        background: rgba(10, 10, 10, 0.95);
        border: 1px solid #333;
        color: #fff;
        font-family: 'Space Grotesk', sans-serif;
        font-size: 0.85rem;
        letter-spacing: 0.1em;
        border-radius: 50px;
        z-index: 99999;
        opacity: 0;
        animation: fadeIn 0.3s ease forwards;
    `;
    
    document.body.appendChild(message);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            to {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        message.style.animation = 'fadeIn 0.2s ease reverse forwards';
        setTimeout(() => message.remove(), 200);
    }, 2000);
}

/* === Parallax Effect on Hero === */
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    const scrolled = window.scrollY;
    
    if (heroImage && scrolled < 800) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

/* === Loading Animation === */
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
