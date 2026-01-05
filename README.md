# Portfolio - Sharyn Foka

Portfolio professionnel moderne et tech avec design responsive et mode sombre.

## 🚀 Fonctionnalités

- ✨ Design moderne et tech avec animations
- 🌙 Mode sombre/clair
- 📱 Responsive (mobile, tablette, desktop)
- 📄 Section de téléchargement de CV
- 📚 **Bibliothèque de livres** (page séparée avec 25+ livres et filtrage par genre)
- 🎯 **Quiz Tech Fun** (page séparée avec 25 questions à réponses libres)
- 👗 **Section Mode** avec galerie photo (aspiration mannequin)
- 📧 Formulaire de contact
- ♿ Accessible (ARIA, navigation au clavier)

## 📁 Structure

```
Portfolio/
├── assets/              # Fichiers statiques (images, CV)
│   ├── cv-sharyn-foka.pdf  # Votre CV (à ajouter)
│   └── mode/            # Photos de mode (à ajouter)
│       └── *.jpg
├── data/
│   ├── assests/
│   │   ├── icons/
│   │   └── image/
│   ├── livres.json      # Données des livres (25+ livres)
│   └── quiz-tech.json   # Questions du quiz tech (25 questions)
├── scripts/
│   ├── main.js          # Scripts principaux
│   ├── navbar.js        # Navigation mobile
│   ├── darkmode.js      # Gestion du thème
│   ├── projects.js      # Gestion des projets
│   ├── library-page.js  # Gestion de la bibliothèque (page dédiée)
│   ├── quiz-page.js     # Gestion du quiz (page dédiée)
│   ├── mode-gallery.js  # Galerie de mode
│   └── contacts.js      # Formulaire de contact
├── styles/
│   ├── main.css         # Styles principaux
│   ├── components.css   # Composants (boutons, cartes, etc.)
│   ├── sections.css     # Sections du site
│   ├── responsive.css   # Media queries responsive
│   ├── quiz-page.css    # Styles de la page quiz
│   └── library-page.css # Styles de la page bibliothèque
├── index.html           # Page principale
├── quiz.html            # Page quiz
└── bibliotheque.html    # Page bibliothèque
```

## 🔧 Installation

1. Clonez ou téléchargez ce repository
2. Ajoutez votre CV PDF dans le dossier `assets/` avec le nom `cv-sharyn-foka.pdf`
3. Ouvrez `index.html` dans votre navigateur ou utilisez un serveur local

### Avec un serveur local (recommandé)

```bash
# Python 3
python -m http.server 8000

# Node.js (avec http-server)
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

## 📝 Configuration

### Ajouter votre CV

1. Placez votre fichier CV PDF dans le dossier `assets/`
2. Nommez-le `cv-sharyn-foka.pdf`
3. Le lien de téléchargement fonctionnera automatiquement

### Ajouter vos photos de mode

1. Créez un dossier `assets/mode/`
2. Ajoutez vos photos de mode dans ce dossier
3. Éditez `scripts/mode-gallery.js` et ajoutez vos images dans le tableau `modeImages` :
   ```javascript
   const modeImages = [
       { src: 'assets/mode/photo1.jpg', alt: 'Look d\'automne', title: 'Style automne' },
       { src: 'assets/mode/photo2.jpg', alt: 'Tenue élégante', title: 'Soirée' },
       // Ajoutez vos autres photos...
   ];
   ```

### Personnaliser les projets

Éditez le fichier `scripts/projects.js` pour modifier ou ajouter des projets :

```javascript
const projects = [
    {
        title: "Nom du projet",
        description: "Description du projet",
        technologies: ["Tech1", "Tech2"],
        image: "chemin/vers/image.jpg",
        link: "https://lien-du-projet.com",
        github: "https://github.com/username/project"
    }
];
```

### Personnaliser les livres

Éditez le fichier `data/livres.json` :

```json
[
    {
        "title": "Titre du livre",
        "author": "Auteur",
        "genre": "Fantasy",
        "cover": "chemin/vers/couverture.jpg",
        "rating": 5
    }
]
```

Les genres disponibles sont filtrés automatiquement. Ajoutez n'importe quel genre : Fantasy, Historique, Policier, Science-fiction, Littérature, etc.

### Configurer le quiz avec votre base de données

1. Éditez `scripts/quiz-page.js`
2. Remplacez `YOUR_API_ENDPOINT_HERE` par l'URL de votre API backend
3. Les réponses seront envoyées au format JSON avec toutes les questions et réponses
4. Le format des données envoyées :
   ```json
   {
     "timestamp": "2025-01-XX...",
     "questions": [
       {
         "id": 1,
         "question": "Question...",
         "category": "JavaScript",
         "answer": "Réponse libre..."
       }
     ],
     "totalAnswered": 25,
     "totalQuestions": 25
   }
   ```

## 🎨 Personnalisation

Les couleurs principales peuvent être modifiées dans les fichiers CSS :
- Couleur principale : `#ff5a5f` (rouge/coral)
- Couleur secondaire : `#2196f3` (bleu)

## 📧 Contact

- Email : sharynjace8@gmail.com
- Site web : https://sharyn.fr/
- LinkedIn : Sharyn Foka
- Twitter : @Sharynjanice

## 📄 Licence

© 2025 — Portfolio créé par Sharyn Foka

