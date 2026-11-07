// skills.js - Affichage des compétences techniques avec animations
const skillsContainer = document.getElementById('skills-container');

// Données des compétences
const skills = [
    {
        name: 'JavaScript',
        level: 75,
        icon: '💛',
        category: 'Langage',
        color: '#F7DF1E'
    },
    {
        name: 'HTML/CSS',
        level: 80,
        icon: '🎨',
        category: 'Web',
        color: '#E34F26'
    },
    {
        name: 'WordPress',
        level: 70,
        icon: '📝',
        category: 'CMS',
        color: '#21759B'
    },
    {
        name: 'Python',
        level: 60,
        icon: '🐍',
        category: 'Langage',
        color: '#3776AB'
    },
    {
        name: 'C',
        level: 55,
        icon: '🔧',
        category: 'Langage',
        color: '#A8B9CC'
    },
    {
        name: 'Java',
        level: 45,
        icon: '☕',
        category: 'Langage',
        color: '#ED8B00'
    },
    {
        name: 'C#',
        level: 35,
        icon: '#',
        category: 'Langage',
        color: '#239120'
    },
    {
        name: 'SQL / NoSQL',
        level: 60,
        icon: '🗄️',
        category: 'Base de données',
        color: '#4479A1'
    },
    {
        name: 'Linux (Debian)',
        level: 60,
        icon: '🐧',
        category: 'Système',
        color: '#FCC624'
    },
    {
        name: 'Git / GitHub',
        level: 70,
        icon: '🔀',
        category: 'Outils',
        color: '#F05032'
    },
    {
        name: 'Figma',
        level: 70,
        icon: '🎨',
        category: 'Design',
        color: '#F24E1E'
    },
    {
        name: 'Canva',
        level: 75,
        icon: '🖼️',
        category: 'Design',
        color: '#00C4CC'
    },
    {
        name: 'CapCut',
        level: 55,
        icon: '🎬',
        category: 'Multimédia',
        color: '#FF5A5F'
    },
    {
        name: 'UX/UI',
        level: 70,
        icon: '🧩',
        category: 'Design',
        color: '#8B5CF6'
    },
    {
        name: 'Cybersécurité',
        level: 45,
        icon: '🔒',
        category: 'Sécurité',
        color: '#FF6B6B'
    },
    {
        name: 'API REST',
        level: 55,
        icon: '🔌',
        category: 'Web',
        color: '#00D9FF'
    }
];

// Fonction pour créer une carte de compétence
function createSkillCard(skill) {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.setAttribute('data-skill', skill.name.toLowerCase());
    
    // Animation de la barre de progression
    const progressBar = document.createElement('div');
    progressBar.className = 'skill-progress-bar';
    const progressFill = document.createElement('div');
    progressFill.className = 'skill-progress-fill';
    progressFill.style.width = '0%';
    progressFill.style.backgroundColor = skill.color;
    progressBar.appendChild(progressFill);
    
    card.innerHTML = `
        <div class="skill-header">
            <div class="skill-icon" style="background: ${skill.color}20; border-color: ${skill.color}40;">
                <span class="skill-emoji">${skill.icon}</span>
            </div>
            <div class="skill-info">
                <h3 class="skill-name">${skill.name}</h3>
                <span class="skill-category">${skill.category}</span>
            </div>
        </div>
        <div class="skill-level">
            <div class="skill-progress-bar">
                <div class="skill-progress-fill" style="background: ${skill.color}; width: 0%;"></div>
            </div>
            <span class="skill-percentage">0%</span>
        </div>
    `;
    
    // Animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.skill-progress-fill');
                const percentage = entry.target.querySelector('.skill-percentage');
                
                // Animation de la barre
                let current = 0;
                const target = skill.level;
                const duration = 1500;
                const increment = target / (duration / 16);
                
                const animate = () => {
                    current += increment;
                    if (current < target) {
                        fill.style.width = current + '%';
                        percentage.textContent = Math.round(current) + '%';
                        requestAnimationFrame(animate);
                    } else {
                        fill.style.width = target + '%';
                        percentage.textContent = target + '%';
                    }
                };
                
                animate();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(card);
    
    return card;
}

// Charger et afficher les compétences
function loadSkills() {
    if (!skillsContainer) return;
    
    skills.forEach((skill, index) => {
        const card = createSkillCard(skill);
        // Animation d'apparition progressive
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        skillsContainer.appendChild(card);
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialiser au chargement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSkills);
} else {
    loadSkills();
}

