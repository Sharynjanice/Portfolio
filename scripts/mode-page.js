// mode-page.js - Gestion de la page mode avec filtres + lightbox
const modeGallery = document.getElementById('mode-gallery');
const modeLoading = document.getElementById('mode-loading');
const noPhotos = document.getElementById('no-photos');
const filtersContainer = document.getElementById('mode-filters');
const statsContainer = document.getElementById('mode-stats');
const shuffleBtn = document.getElementById('shuffleBtn');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');

const lightbox = document.getElementById('modeLightbox');
const lightboxImg = document.getElementById('modeLightboxImg');
const lightboxTitle = document.getElementById('modeLightboxTitle');
const lightboxAlt = document.getElementById('modeLightboxAlt');
const lightboxCategory = document.getElementById('modeLightboxCategory');
const lightboxIndex = document.getElementById('modeLightboxIndex');
const lightboxClose = document.getElementById('modeLightboxClose');
const lightboxBackdrop = document.getElementById('modeLightboxBackdrop');
const prevBtn = document.getElementById('prevPhoto');
const nextBtn = document.getElementById('nextPhoto');

let allPhotos = [];
let filteredPhotos = [];
let activeFilter = 'Tous';
let currentIndex = 0;

function renderStats() {
    if (!statsContainer) return;
    const categories = new Set(allPhotos.map(p => p.category || 'Divers'));
    statsContainer.innerHTML = `
        <span>📸 ${allPhotos.length} photos</span>
        <span>🏷️ ${categories.size} catégories</span>
        <span>🎛️ Filtre: ${activeFilter}</span>
    `;
}

function renderFilters() {
    if (!filtersContainer) return;
    const categories = ['Tous', ...new Set(allPhotos.map(p => p.category || 'Divers'))];
    filtersContainer.innerHTML = '';

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `mode-filter ${cat === activeFilter ? 'active' : ''}`;
        btn.textContent = cat;
        btn.setAttribute('role', 'listitem');
        btn.addEventListener('click', () => {
            activeFilter = cat;
            applyFilter();
        });
        filtersContainer.appendChild(btn);
    });
}

// Fonction pour créer un élément de galerie
function createModeItem(photo, index) {
    const item = document.createElement('article');
    item.className = 'mode-gallery-item';
    item.setAttribute('role', 'listitem');
    item.dataset.index = index.toString();
    
    const imgContainer = document.createElement('div');
    imgContainer.className = 'mode-image-container';
    
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt || 'Photo de mode';
    img.loading = 'lazy';
    
    img.onerror = function() {
        // Image placeholder si l'image ne charge pas
        img.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22600%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22400%22 height=%22600%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3EPhoto%3C/text%3E%3C/svg%3E';
    };
    
    imgContainer.appendChild(img);
    
    // Overlay avec informations
    const overlay = document.createElement('div');
    overlay.className = 'mode-overlay';
    
    if (photo.title) {
        const title = document.createElement('h3');
        title.className = 'mode-photo-title';
        title.textContent = photo.title;
        overlay.appendChild(title);
    }
    
    if (photo.category) {
        const category = document.createElement('span');
        category.className = 'mode-photo-category';
        category.textContent = photo.category;
        overlay.appendChild(category);
    }
    
    item.appendChild(imgContainer);
    item.appendChild(overlay);

    item.addEventListener('click', () => openLightbox(index));
    
    return item;
}

function openLightbox(index) {
    if (!lightbox || !filteredPhotos[index]) return;
    currentIndex = index;
    const photo = filteredPhotos[index];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt || '';
    lightboxTitle.textContent = photo.title || 'Look';
    lightboxAlt.textContent = photo.alt || '';
    lightboxCategory.textContent = photo.category || 'Divers';
    lightboxIndex.textContent = `${index + 1} / ${filteredPhotos.length}`;
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
}

function showNext(step = 1) {
    if (filteredPhotos.length === 0) return;
    currentIndex = (currentIndex + step + filteredPhotos.length) % filteredPhotos.length;
    openLightbox(currentIndex);
}

function applyFilter() {
    if (!modeGallery) return;
    if (modeLoading) modeLoading.remove();
    modeGallery.innerHTML = '';

    filteredPhotos = activeFilter === 'Tous'
        ? [...allPhotos]
        : allPhotos.filter(photo => (photo.category || 'Divers') === activeFilter);

    if (filteredPhotos.length === 0) {
        if (noPhotos) noPhotos.style.display = 'block';
        return;
    }

    if (noPhotos) noPhotos.style.display = 'none';

    filteredPhotos.forEach((photo, index) => {
        const item = createModeItem(photo, index);
        item.style.opacity = '0';
        item.style.transform = 'translateY(16px)';
        modeGallery.appendChild(item);

        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 80);
    });

    renderStats();
}

// Charger la galerie depuis JSON
async function loadModeGallery() {
    if (!modeGallery) return;
    
    try {
        const response = await fetch('data/mode.json');
        if (!response.ok) throw new Error('Erreur lors du chargement des photos');
        
        allPhotos = await response.json();
        
        if (modeLoading) {
            modeLoading.remove();
        }
        
        if (!allPhotos || allPhotos.length === 0) {
            if (noPhotos) {
                noPhotos.style.display = 'block';
            }
            return;
        }
        
        if (noPhotos) {
            noPhotos.style.display = 'none';
        }

        renderFilters();
        applyFilter();
        updateSessionLive();
        
    } catch (error) {
        console.error('Erreur lors du chargement de la galerie:', error);
        if (modeLoading) modeLoading.remove();
        if (noPhotos) {
            noPhotos.style.display = 'block';
        }
    }
}

// Help Modal
const helpModal = document.getElementById('modeHelpModal');
const helpModalBackdrop = document.getElementById('modeHelpModalBackdrop');
const helpModalClose = document.getElementById('modeHelpModalClose');
const scrollTapBtn = document.getElementById('scrollTapBtn');

function openHelpModal() {
    if (!helpModal) return;
    helpModal.classList.add('is-open');
    helpModal.setAttribute('aria-hidden', 'false');
}

function closeHelpModal() {
    if (!helpModal) return;
    helpModal.classList.remove('is-open');
    helpModal.setAttribute('aria-hidden', 'true');
}

// Update Session Live date
function updateSessionLive() {
    const sessionLiveChip = document.getElementById('sessionLiveChip');
    const sessionLiveDate = document.getElementById('sessionLiveDate');
    
    if (!sessionLiveChip || !sessionLiveDate) return;
    
    // Get last update date from mode.json file modification or use current date
    // For now, we'll use a stored date or current date
    const lastUpdate = localStorage.getItem('modeLastUpdate') || new Date().toISOString();
    const updateDate = new Date(lastUpdate);
    const now = new Date();
    const diffDays = Math.floor((now - updateDate) / (1000 * 60 * 60 * 24));
    
    let dateText = '';
    if (diffDays === 0) {
        dateText = 'Aujourd\'hui';
    } else if (diffDays === 1) {
        dateText = 'Hier';
    } else if (diffDays < 7) {
        dateText = `Il y a ${diffDays} jours`;
    } else {
        dateText = updateDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    }
    
    sessionLiveDate.textContent = dateText;
    sessionLiveDate.style.display = 'inline';
    
    // Show date on hover
    sessionLiveChip.addEventListener('mouseenter', () => {
        sessionLiveDate.style.display = 'inline';
    });
}

// Listeners UI
if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
        allPhotos.sort(() => Math.random() - 0.5);
        applyFilter();
    });
}

if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener('click', () => {
        activeFilter = 'Tous';
        renderFilters();
        applyFilter();
    });
}

if (scrollTapBtn) {
    scrollTapBtn.addEventListener('click', openHelpModal);
}

if (helpModalBackdrop) helpModalBackdrop.addEventListener('click', closeHelpModal);
if (helpModalClose) helpModalClose.addEventListener('click', closeHelpModal);

if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (prevBtn) prevBtn.addEventListener('click', () => showNext(-1));
if (nextBtn) nextBtn.addEventListener('click', () => showNext(1));

document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext(1);
    if (e.key === 'ArrowLeft') showNext(-1);
});

// Initialiser au chargement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadModeGallery);
} else {
    loadModeGallery();
}

