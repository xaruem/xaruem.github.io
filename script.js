// ========== МОБИЛЬНОЕ МЕНЮ ==========
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            navMenu.classList.remove('active');
            e.stopPropagation();
        });
    });

    // Закрыть меню при клике вне него
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar-container') &&
            !e.target.closest('.nav-menu')) {
            navMenu.classList.remove('active');
        }
    });

    // Закрыть меню при прокрутке
    window.addEventListener('scroll', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    }, { passive: true });
}

// ========== НЕОНОВЫЙ ЭФФЕКТ NAVBAR ПРИ СКРОЛЛЕ ==========
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}, { passive: true });

// ========== ЗАГРУЗЧИК НА ГЛАВНОЙ ==========
window.addEventListener('load', () => {
    const heroLoader = document.getElementById('heroLoader');
    const heroContent = document.getElementById('heroContent');

    if (heroLoader && heroContent) {
        setTimeout(() => {
            heroLoader.style.display = 'none';
            heroContent.style.opacity = '1';
        }, 2000);
    }
});

// ========== ПЛАВНАЯ ПРОКРУТКА ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            // Закрыть меню если оно открыто
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }

            // Плавная прокрутка
            const headerHeight = navbar ? navbar.offsetHeight : 0;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== АКТИВНАЯ ССЫЛКА НАВИГАЦИИ ==========
window.addEventListener('scroll', () => {
    let current = '';
    const headerHeight = navbar ? navbar.offsetHeight : 80;

    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - headerHeight - 50) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    if (current) {
        const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}, { passive: true });

// ========== СЧЕТЧИК С АНИМАЦИЕЙ ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            card.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(card);
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .project-card, .skill-category, .stat-value, .method-card').forEach(card => {
    observer.observe(card);
});

// ========== ПАРАЛЛАКС ЭФФЕКТ (только на десктопе) ==========
if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, { passive: true });
}

// ========== ОПТИМИЗАЦИЯ ДЛЯ МОБИЛЬНЫХ ==========
if (window.innerWidth < 768) {
    document.querySelectorAll('.particles').forEach(el => {
        el.style.display = 'none';
    });
}

// ========== ОБРАБОТКА ИЗМЕНЕНИЯ РАЗМЕРА ОКНА ==========
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Закрыть меню при изменении размера
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }, 250);
});

// ========== ПРЕДОТВРАЩЕНИЕ ПРОКРУТКИ КОГДА МЕНЮ ОТКРЫТО ==========
function updateBodyScroll() {
    if (navMenu && navMenu.classList.contains('active') && window.innerWidth < 768) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        setTimeout(updateBodyScroll, 0);
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(updateBodyScroll, 0);
    });
});