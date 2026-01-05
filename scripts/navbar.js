// navbar.js - Gestion de la navigation mobile
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        const isExpanded = burger.getAttribute('aria-expanded') === 'true';
        burger.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('show');
        document.body.classList.toggle('menu-open');
    });

    // Fermer le menu lors du clic sur un lien (UX)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            burger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        });
    });

    // Fermer le menu lors du clic en dehors
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('show') && 
            !navLinks.contains(e.target) && 
            !burger.contains(e.target)) {
            navLinks.classList.remove('show');
            burger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        }
    });

    // Fermer le menu avec la touche Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('show')) {
            navLinks.classList.remove('show');
            burger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        }
    });
}

// Header avec effet de transparence au scroll
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (header) {
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    lastScroll = currentScroll;
});
