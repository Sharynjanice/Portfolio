// projects.js - Gestion des projets
const projectsContainer = document.getElementById('projects-container');
const projectsLoading = document.getElementById('projects-loading');

// Données des projets les plus représentatives du parcours et du niveau technique actuel
const projects = [
    {
        title: "Portfolio personnel — site vitrine",
        description: "Développement d'un portfolio moderne et minimaliste pour présenter mon parcours, mes compétences et mes projets dans un cadre professionnel orienté alternance et recrutement.",
        technologies: ["HTML", "CSS", "JavaScript", "Responsive"],
        image: "data/assests/logo-sharyn.png",
        link: "index.html",
        github: "https://github.com/Sharynjanice/Portfolio",
        featured: true
    },
    {
        title: "Miels & Merveilles — optimisation e-commerce",
        description: "Collaboration sur la refonte et l'optimisation du site e-commerce pour une marque de miels artisanaux. J’ai participé à la structuration des fiches produits, à l’amélioration de l’expérience utilisateur et à la mise en valeur des collections.",
        technologies: ["Shopify", "UX/UI", "SEO", "Canva"],
        image: "data/assests/mode/E COMMERCE.jpg",
        link: "#",
        github: "#",
        featured: true
    },
    {
        title: "Braids & Beauty — site vitrine",
        description: "Création d'un site vitrine moderne pour un client réel, avec sections services, galerie, tarifs et formulaire de contact. Le site a été pensé pour être clair, rapide à parcourir et adapté au mobile.",
        technologies: ["HTML", "CSS", "JavaScript", "Responsive"],
        image: "data/assests/mode/Braids.jpg",
        link: "https://braids-beauty.vercel.app/",
        github: "https://github.com/Sharynjanice",
        featured: true
    },
    {
        title: "Refonte My SelfKey — maquette UX/UI",
        description: "Conception d'une maquette de refonte UX/UI pour une plateforme existante, avec une meilleure hiérarchie d'information, des parcours plus lisibles et une interface plus moderne.",
        technologies: ["Figma", "UI/UX", "Wireframes"],
        image: "data/assests/mode/Refonte.png",
        link: "https://www.figma.com/make/b5Jg13YxQbsZTrTNJs2W9c/Refonte-My-Self-Key-%E2%80%93-Maquette?fullscreen=1&t=0juIXHYdDE006n0E-1",
        github: "https://github.com/Sharynjanice",
        featured: true
    },
    {
        title: "Bibliothèque en ligne",
        description: "Mini-application dédiée à la recherche et à l'affichage dynamique de livres. Le projet met en avant les bases du développement front avec JavaScript, HTML et CSS.",
        technologies: ["JavaScript", "HTML", "CSS", "JSON"],
        image: "data/assests/mode/Bibliotequejpg.jpg",
        link: "#",
        github: "https://github.com/Sharynjanice"
    },
    {
        title: "Portfolio WordPress",
        description: "Premier site professionnel développé sur WordPress, avec structure de pages, personnalisation visuelle et mise en avant du parcours et des réalisations.",
        technologies: ["WordPress", "PHP", "HTML", "CSS"],
        image: "data/assests/mode/Wordpress.png",
        link: "https://sharyn.fr/",
        github: "https://github.com/Sharynjanice"
    }
];

function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card' + (project.featured ? ' project-card-featured' : '');
    card.setAttribute('role', 'listitem');

    const technologies = project.technologies
        .map((tech) => `<span class="tech-tag">${tech}</span>`)
        .join('');

    const projectLink = project.link && project.link !== '#' ? `
        <a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer" aria-label="Voir le projet ${project.title}">Voir le projet</a>
    ` : '';

    const githubLink = project.github && project.github !== '#' ? `
        <a href="${project.github}" class="project-link project-link-github" target="_blank" rel="noopener noreferrer" aria-label="Code source de ${project.title} sur GitHub">GitHub</a>
    ` : '';

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
                ${projectLink}
                ${githubLink}
            </div>
        </div>
    `;

    return card;
}

function loadProjects() {
    if (!projectsContainer) return;

    if (projectsLoading) {
        projectsLoading.remove();
    }

    projects.forEach((project) => {
        const card = createProjectCard(project);
        projectsContainer.appendChild(card);
    });

    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p class="no-data">Aucun projet disponible pour le moment.</p>';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProjects);
} else {
    loadProjects();
}

