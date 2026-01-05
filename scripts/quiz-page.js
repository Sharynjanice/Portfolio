// quiz-page.js - Quiz tech interactif avec réponses libres
let questions = [];
let currentQuestionIndex = 0;
let answers = {};
const quizContainer = document.getElementById('quiz-container');
const quizForm = document.getElementById('quizForm');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const submitBtn = document.getElementById('submitBtn');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const currentQuestionSpan = document.getElementById('currentQuestion');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const quizResult = document.getElementById('quiz-result');

// API endpoint pour enregistrer les réponses
// REMPLACEZ CETTE URL par votre endpoint API réel quand vous aurez configuré votre base de données
const API_ENDPOINT = 'YOUR_API_ENDPOINT_HERE'; // Ex: 'https://votre-api.com/api/quiz-responses'

// Charger les questions
async function loadQuestions() {
    try {
        const response = await fetch('data/quiz-tech.json');
        if (!response.ok) throw new Error('Erreur lors du chargement des questions');
        
        questions = await response.json();
        totalQuestionsSpan.textContent = questions.length;
        
        // Initialiser les réponses vides
        questions.forEach(q => {
            answers[q.id] = '';
        });
        
        // Afficher la première question
        showQuestion(0);
        updateProgress();
    } catch (error) {
        console.error('Erreur:', error);
        quizContainer.innerHTML = `
            <div class="error-message">
                <p>❌ Impossible de charger le quiz pour le moment.</p>
                <p><small>Erreur: ${error.message}</small></p>
            </div>
        `;
    }
}

// Afficher une question
function showQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    
    currentQuestionIndex = index;
    const question = questions[index];
    
    quizContainer.innerHTML = `
        <div class="question-card" data-question-id="${question.id}">
            <div class="question-header">
                <span class="question-category">${question.category}</span>
                <span class="question-number">Question ${index + 1}</span>
            </div>
            <h3 class="question-text">${question.question}</h3>
            <div class="question-input">
                <textarea 
                    id="answer-${question.id}" 
                    name="answer-${question.id}"
                    class="answer-input"
                    rows="5"
                    placeholder="Votre réponse ici... Soyez créatif ! 😊"
                    required
                >${answers[question.id] || ''}</textarea>
                <small class="answer-hint">Réponse libre - Écrivez ce qui vous passe par la tête !</small>
            </div>
        </div>
    `;
    
    // Restaurer la réponse si elle existe
    const textarea = document.getElementById(`answer-${question.id}`);
    if (textarea) {
        textarea.value = answers[question.id] || '';
        
        // Sauvegarder automatiquement lors de la saisie
        textarea.addEventListener('input', (e) => {
            answers[question.id] = e.target.value.trim();
        });
    }
    
    // Gérer les boutons
    prevBtn.style.display = index === 0 ? 'none' : 'inline-flex';
    nextBtn.style.display = index === questions.length - 1 ? 'none' : 'inline-flex';
    submitBtn.style.display = index === questions.length - 1 ? 'inline-flex' : 'none';
    
    updateProgress();
    
    // Focus sur le textarea
    if (textarea) {
        setTimeout(() => textarea.focus(), 100);
    }
}

// Mettre à jour la barre de progression
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
}

// Question suivante
nextBtn.addEventListener('click', () => {
    const question = questions[currentQuestionIndex];
    const answerInput = document.getElementById(`answer-${question.id}`);
    
    if (answerInput) {
        answers[question.id] = answerInput.value.trim();
    }
    
    if (currentQuestionIndex < questions.length - 1) {
        showQuestion(currentQuestionIndex + 1);
    }
});

// Question précédente
prevBtn.addEventListener('click', () => {
    const question = questions[currentQuestionIndex];
    const answerInput = document.getElementById(`answer-${question.id}`);
    
    if (answerInput) {
        answers[question.id] = answerInput.value.trim();
    }
    
    if (currentQuestionIndex > 0) {
        showQuestion(currentQuestionIndex - 1);
    }
});

// Soumettre le formulaire
quizForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Sauvegarder la dernière réponse
    const question = questions[currentQuestionIndex];
    const answerInput = document.getElementById(`answer-${question.id}`);
    if (answerInput) {
        answers[question.id] = answerInput.value.trim();
    }
    
    // Préparer les données pour l'envoi
    const quizData = {
        timestamp: new Date().toISOString(),
        questions: questions.map(q => ({
            id: q.id,
            question: q.question,
            category: q.category,
            answer: answers[q.id] || ''
        })),
        totalAnswered: Object.values(answers).filter(a => a.trim() !== '').length,
        totalQuestions: questions.length
    };
    
    // Afficher le loader
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg class="spinner" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-dasharray="32" stroke-dashoffset="32">
                <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/>
            </circle>
        </svg>
        Envoi en cours...
    `;
    
    try {
        // Envoyer les réponses à votre API
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quizData)
        });
        
        if (response.ok) {
            // Succès - afficher le message de remerciement
            quizForm.style.display = 'none';
            quizResult.style.display = 'block';
            
            // Scroll vers le résultat
            quizResult.scrollIntoView({ behavior: 'smooth' });
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
    } catch (error) {
        console.error('Erreur:', error);
        
        // Même en cas d'erreur, afficher le message (pour la démo)
        // En production, vous pouvez gérer l'erreur différemment
        quizForm.style.display = 'none';
        quizResult.style.display = 'block';
        
        // Note: Dans un vrai projet, vous devriez enregistrer les réponses localement
        // en cas d'erreur réseau et les renvoyer plus tard
        localStorage.setItem('quizData_' + Date.now(), JSON.stringify(quizData));
        
        quizResult.scrollIntoView({ behavior: 'smooth' });
    }
});

// Initialiser au chargement
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadQuestions);
} else {
    loadQuestions();
}

