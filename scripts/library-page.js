// library-page.js - Bibliothèque avec filtrage par genre
let allBooks = [];
let filteredBooks = [];
let currentGenre = 'all';
let searchQuery = '';

const booksContainer = document.getElementById('books-container');
const booksLoading = document.getElementById('books-loading');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.getElementById('filterButtons');
const libraryStats = document.getElementById('libraryStats');
const booksCountSpan = document.getElementById('booksCount');
const noResults = document.getElementById('no-results');

// Charger les livres
async function loadBooks() {
    try {
        const response = await fetch('data/livres.json');
        if (!response.ok) throw new Error('Erreur lors du chargement des livres');
        
        allBooks = await response.json();
        
        // Générer les boutons de filtre
        generateFilterButtons();
        
        // Appliquer les filtres initiaux
        applyFilters();
    } catch (error) {
        console.error('Erreur:', error);
        if (booksLoading) booksLoading.remove();
        booksContainer.innerHTML = `
            <div class="error-message">
                <p>❌ Impossible de charger la bibliothèque pour le moment.</p>
                <p><small>Erreur: ${error.message}</small></p>
            </div>
        `;
    }
}

// Générer les boutons de filtre
function generateFilterButtons() {
    // Extraire tous les genres uniques
    const genres = ['all', ...new Set(allBooks.map(book => book.genre))];
    
    filterButtons.innerHTML = genres.map(genre => {
        const label = genre === 'all' ? 'Tous' : genre;
        const active = genre === 'all' ? 'active' : '';
        return `<button class="filter-btn ${active}" data-genre="${genre}">${label}</button>`;
    }).join('');
    
    // Ajouter les event listeners
    filterButtons.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Retirer l'état actif de tous les boutons
            filterButtons.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            // Ajouter l'état actif au bouton cliqué
            btn.classList.add('active');
            // Mettre à jour le genre actif
            currentGenre = btn.dataset.genre;
            // Appliquer les filtres
            applyFilters();
        });
    });
}

// Appliquer les filtres (genre + recherche)
function applyFilters() {
    // Filtrer par genre
    if (currentGenre === 'all') {
        filteredBooks = [...allBooks];
    } else {
        filteredBooks = allBooks.filter(book => book.genre === currentGenre);
    }
    
    // Filtrer par recherche
    if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        filteredBooks = filteredBooks.filter(book => 
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.genre.toLowerCase().includes(query)
        );
    }
    
    // Mettre à jour l'affichage
    displayBooks();
    updateStats();
}

// Recherche en temps réel
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    applyFilters();
});

// Afficher les livres avec animations
function displayBooks() {
    if (booksLoading) booksLoading.remove();
    
    if (filteredBooks.length === 0) {
        booksContainer.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    booksContainer.style.display = 'grid';
    noResults.style.display = 'none';
    
    booksContainer.innerHTML = filteredBooks.map((book, index) => createBookCard(book, index)).join('');
    
    // Animation d'apparition progressive
    const cards = booksContainer.querySelectorAll('.book-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 50);
    });
    
    // Ajouter les listeners pour les avis
    setupReviewToggles();
}

// Gérer l'affichage/masquage des avis complets
function setupReviewToggles() {
    const reviewToggles = booksContainer.querySelectorAll('.review-toggle');
    reviewToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = toggle.closest('.book-card');
            const preview = card.querySelector('.book-review-preview');
            const full = card.querySelector('.book-review-full');
            
            if (preview && full) {
                const isExpanded = full.style.display !== 'none';
                preview.style.display = isExpanded ? 'block' : 'none';
                full.style.display = isExpanded ? 'none' : 'block';
                card.classList.toggle('review-expanded', !isExpanded);
            }
        });
    });
}

// Créer une carte de livre
function createBookCard(book, index) {
    const stars = '⭐'.repeat(book.rating) + '☆'.repeat(5 - book.rating);
    const hasReview = book.review && book.review.trim() !== '';
    const reviewPreview = hasReview ? book.review.substring(0, 100) + (book.review.length > 100 ? '...' : '') : '';
    
    return `
        <article class="book-card ${hasReview ? 'has-review' : ''}" role="listitem" data-index="${index}">
            <div class="book-cover">
                <img src="${book.cover}" alt="Couverture de ${book.title}" loading="lazy" 
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2245%25%22 text-anchor=%22middle%22%3E${encodeURIComponent(book.title)}%3C/text%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2212%22 x=%2250%25%22 y=%2260%25%22 text-anchor=%22middle%22%3E${encodeURIComponent(book.author)}%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="book-info">
                <div class="book-genre">${book.genre}</div>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-rating" aria-label="Note: ${book.rating} sur 5">
                    <span class="stars">${stars}</span>
                    <span class="rating-number">${book.rating}/5</span>
                </div>
                ${hasReview ? `
                    <div class="book-review">
                        <div class="book-review-preview">
                            <p class="review-text">${reviewPreview}</p>
                            ${book.review.length > 100 ? '<button class="review-toggle" aria-label="Voir l\'avis complet">Lire la suite</button>' : ''}
                        </div>
                        <div class="book-review-full" style="display: none;">
                            <p class="review-text">${book.review}</p>
                            <button class="review-toggle" aria-label="Réduire l\'avis">Réduire</button>
                        </div>
                    </div>
                ` : ''}
            </div>
        </article>
    `;
}

// Mettre à jour les statistiques
function updateStats() {
    booksCountSpan.textContent = filteredBooks.length;
}

// Initialiser au chargement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBooks);
} else {
    loadBooks();
}

