// mode-gallery.js - Chargement de la galerie de mode
const modeGallery = document.getElementById('mode-gallery');
const modePlaceholder = document.querySelector('.mode-placeholder');

// Liste des images de mode (à remplacer par vos vraies images)
// Placez vos images dans assets/mode/ et ajoutez-les ici
const modeImages = [
    // Exemple de structure :
    // { src: 'assets/mode/photo1.jpg', alt: 'Look d\'automne', title: 'Style automne' },
    // { src: 'assets/mode/photo2.jpg', alt: 'Tenue élégante', title: 'Soirée' },
    // Ajoutez vos images ici
];

// Fonction pour créer un élément de galerie
function createModeItem(image) {
    const item = document.createElement('div');
    item.className = 'mode-item';
    
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = image.alt;
    img.loading = 'lazy';
    
    img.onerror = function() {
        // Si l'image ne charge pas, on la retire
        item.remove();
    };
    
    item.appendChild(img);
    
    // Optionnel : ajouter un titre au survol
    if (image.title) {
        const overlay = document.createElement('div');
        overlay.className = 'mode-overlay';
        overlay.textContent = image.title;
        item.appendChild(overlay);
    }
    
    return item;
}

// Charger la galerie
function loadModeGallery() {
    if (!modeGallery) return;
    
    if (modeImages.length === 0) {
        // Afficher le placeholder si aucune image
        if (modePlaceholder) {
            modePlaceholder.style.display = 'block';
        }
        return;
    }
    
    // Masquer le placeholder
    if (modePlaceholder) {
        modePlaceholder.style.display = 'none';
    }
    
    // Créer et ajouter les images
    modeImages.forEach(image => {
        const item = createModeItem(image);
        modeGallery.appendChild(item);
    });
}

// Initialiser au chargement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadModeGallery);
} else {
    loadModeGallery();
}

