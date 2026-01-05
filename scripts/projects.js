// projects.js - Gestion des projets
const projectsContainer = document.getElementById('projects-container');
const projectsLoading = document.getElementById('projects-loading');

// Données des projets basées sur le CV
const projects = [
    {
        title: "Bibliothèque en ligne",
        description: "Interface responsive permettant de rechercher et afficher des livres. Application web complète avec système de recherche et d'affichage dynamique des ouvrages.",
        technologies: ["JavaScript", "HTML", "CSS"],
        image: "data/assests/image/bibliotheque.jpg",
        link: "#",
        github: "https://github.com/sharynfoka"
    },
    {
        title: "Portfolio WordPress",
        description: "Création d'un site complet avec page d'accueil, pages projets, design personnalisé et navigation optimisée. Intégration et design WordPress.",
        technologies: ["WordPress", "PHP", "HTML", "CSS"],
        image: "data/assests/image/portfolio-wp.jpg",
        link: "#",
        github: "#"
    },
    {
        title: "Maquettes Figma",
        description: "Conception UI pour projets web, pages produit et fiches livre. Design d'interfaces utilisateur modernes et intuitives.",
        technologies: ["Figma", "UI/UX Design"],
        image: "data/assests/image/figma-mockups.jpg",
        link: "#",
        github: "#"
    }
];

// Fonction pour créer une carte de projet
function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('role', 'listitem');
    
    const technologies = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2220%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3E${encodeURIComponent(project.title)}%3C/text%3E%3C/svg%3E'">
        </div>
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-technologies">
                ${technologies}
            </div>
            <div class="project-links">
                ${project.link !== '#' ? `<a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="Voir le projet ${project.title}">Voir le projet</a>` : ''}
                ${project.github !== '#' ? `<a href="${project.github}" class="project-link project-link-github" target="_blank" rel="noopener noreferrer" aria-label="Code source de ${project.title} sur GitHub">GitHub</a>` : ''}
            </div>
        </div>
    `;
    
    return card;
}

// Charger et afficher les projets
function loadProjects() {
    if (!projectsContainer) return;
    
    // Retirer le message de chargement
    if (projectsLoading) {
        projectsLoading.remove();
    }
    
    // Afficher les projets
    projects.forEach(project => {
        const card = createProjectCard(project);
        projectsContainer.appendChild(card);
    });
    
    // Si aucun projet, afficher un message
    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p class="no-data">Aucun projet disponible pour le moment.</p>';
    }
}

// Charger au démarrage
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjects);
} else {
    loadProjects();
}

