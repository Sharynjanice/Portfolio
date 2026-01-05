// library.js - Gestion de l'affichage de la bibliothèque
const booksContainer = document.getElementById("books-container");
const booksLoading = document.getElementById("books-loading");

// Fonction pour créer une carte de livre
function createBookCard(book) {
    const card = document.createElement("article");
    card.className = "book-card";
    card.setAttribute("role", "listitem");

    // Générer les étoiles
    const stars = "⭐".repeat(book.rating) + "☆".repeat(5 - book.rating);

    card.innerHTML = `
        <div class="book-cover">
            <img src="${book.cover}" alt="Couverture de ${book.title}" loading="lazy" 
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3E${encodeURIComponent(book.title)}%3C/text%3E%3C/svg%3E'">
        </div>
        <div class="book-info">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">${book.author}</p>
            <div class="book-rating" aria-label="Note: ${book.rating} sur 5">
                <span class="stars">${stars}</span>
                <span class="rating-number">${book.rating}/5</span>
            </div>
        </div>
    `;

    return card;
}

// Fonction pour charger les livres
function loadBooks() {
    if (!booksContainer) return;

    fetch("data/livres.json")
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json();
        })
        .then(data => {
            // Retirer le message de chargement
            if (booksLoading) {
                booksLoading.remove();
            }

            if (!data || data.length === 0) {
                booksContainer.innerHTML = '<p class="no-data">Aucun livre disponible pour le moment.</p>';
                return;
            }

            // Créer et afficher les cartes de livres
            data.forEach(book => {
                const card = createBookCard(book);
                booksContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement de la bibliothèque:", error);
            if (booksLoading) booksLoading.remove();
            booksContainer.innerHTML = `
                <div class="error-message">
                    <p>❌ Impossible de charger la bibliothèque pour le moment.</p>
                    <p><small>Erreur: ${error.message}</small></p>
                </div>
            `;
        });
}

// Charger au démarrage
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadBooks);
} else {
    loadBooks();
}


