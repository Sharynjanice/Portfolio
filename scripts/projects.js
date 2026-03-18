// projects.js - Gestion des projets
const projectsContainer = document.getElementById('projects-container');
const projectsLoading = document.getElementById('projects-loading');

// Données des projets basées sur le CV et les réalisations récentes
const projects = [
    {
        title: "Collaboration avec Miels & Merveilles — Optimisation E-commerce",
        description: "Rôle : Collaboratrice e-commerce et web design. Contexte : Optimisation du site Shopify pour une entreprise de miels artisanaux et parfums, amélioration de l'expérience utilisateur, optimisation SEO, création de visuels marketing avec Canva. Missions : structuration des fiches produits, amélioration UX, organisation des collections, analyse de performances. Résultat : Contribution à l'amélioration de la conversion et de la présentation des produits. Collaboration de 1 mois en télétravail à partir du 23 Mars 2026.",
        technologies: ["Shopify", "Canva", "SEO", "UX/UI", "E-commerce"],
        image: "data/assests/mode/E COMMERCE.jpg",
        link: "#",
        github: "#",
        featured: true
    },
    {
        title: "Braids & Beauty — Site vitrine",
        description: "Rôle : développement front complet pour un vrai client. Contexte : création d'un site vitrine moderne pour une spécialiste des coiffures africaines à Turin, avec sections services, galerie, grille de tarifs et contact. Résultat : site responsive, clair et facile à parcourir sur mobile comme sur desktop.",
        technologies: ["HTML", "CSS", "JavaScript"],
        image: "data/assests/mode/Braids.jpg",
        link: "https://braids-beauty.vercel.app/",
        github: "#",
        featured: true
    },
    {
        title: "Refonte My SelfKey — Maquette Figma",
        description: "Rôle : UX/UI designer sur maquette haute fidélité. Contexte : refonte d'une plateforme existante (My SelfKey) pour simplifier les parcours, clarifier la hiérarchie de l'information et moderniser l'interface. Résultat : maquette Figma structurée par pages et composants réutilisables, prête pour une implémentation front-end.",
        technologies: ["Figma", "UI/UX Design"],
        image: "data/assests/mode/Refonte.png",
        link: "https://www.figma.com/make/b5Jg13YxQbsZTrTNJs2W9c/Refonte-My-Self-Key-%E2%80%93-Maquette?fullscreen=1&t=0juIXHYdDE006n0E-1",
        github: "#",
        featured: true
    },
    {
        title: "Bibliothèque en ligne",
        description: "Rôle : développement front d'une mini-application. Contexte : application web permettant de rechercher et afficher des livres à partir de données structurées. Résultat : interface responsive avec liste de livres, affichage dynamique et bases pour une future intégration d'API.",
        technologies: ["JavaScript", "HTML", "CSS"],
        image: "data/assests/mode/Bibliotequejpg.jpg",
        link: "#",
        github: "https://github.com/sharynfoka"
    },
    {
        title: "Portfolio WordPress",
        description: "Rôle : intégration et personnalisation sur WordPress. Contexte : premier site professionnel, avec page d'accueil, pages projets, blog et formulaire de contact. Résultat : portfolio `sharyn.fr` qui me permet de présenter mon parcours, mes projets et mes centres d'intérêt.",
        technologies: ["WordPress", "PHP", "HTML", "CSS"],
        image: "data/assests/mode/Wordpress.png",
        link: "https://sharyn.fr/",
        github: "#"
    }
];

// Fonction pour créer une carte de projet
function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card' + (project.featured ? ' project-card-featured' : '');
    card.setAttribute('role', 'listitem');
    
    const technologies = project.technologies.map(tech => 
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="project-image">
            <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2220%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3E${encodeURIComponent(project.title)}%3C/text%3E%3C/svg%3E'">
        </div>
        <div class="project-content">
            ${project.featured ? '<span class="project-badge">Projet phare</span>' : ''}
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

