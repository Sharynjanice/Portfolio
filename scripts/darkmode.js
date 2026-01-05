// darkmode.js - Gestion du thème sombre/clair
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const body = document.body;

// Fonction pour appliquer le thème
function applyTheme(theme) {
    if (theme === 'dark') {
        body.classList.add('dark');
        if (themeIcon) themeIcon.textContent = '☀️';
        themeToggle?.setAttribute('aria-label', 'Passer en mode clair');
    } else {
        body.classList.remove('dark');
        if (themeIcon) themeIcon.textContent = '🌙';
        themeToggle?.setAttribute('aria-label', 'Passer en mode sombre');
    }
}

// Initialiser : appliquer le thème sauvegardé ou détecter la préférence système
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Détecter la préférence système
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }
}

// Initialiser au chargement
initTheme();

// Écouter les changements de préférence système
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

// Bascule du thème au clic
themeToggle?.addEventListener('click', () => {
    const isDark = body.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});
