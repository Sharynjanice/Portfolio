// quiz.js - Gestion du quiz interactif
const quizContainer = document.getElementById("quiz-container");
const quizLoading = document.getElementById("quiz-loading");

// Fonction pour charger le quiz
function loadQuiz() {
    if (!quizContainer) return;
    
    fetch("data/quiz.json")
        .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.text();
        })
        .then(text => {
            // Le fichier quiz.js contient du JSON, on le parse
            const quiz = JSON.parse(text);
            displayQuiz(quiz);
        })
        .catch(error => {
            console.error("Erreur lors du chargement du quiz:", error);
            if (quizLoading) quizLoading.remove();
            quizContainer.innerHTML = `
                <div class="error-message">
                    <p>❌ Impossible de charger le quiz pour le moment.</p>
                    <p><small>Erreur: ${error.message}</small></p>
                </div>
            `;
        });
}

// Fonction pour afficher le quiz
function displayQuiz(quiz) {
    if (!quizContainer) return;
    
    // Retirer le message de chargement
    if (quizLoading) {
        quizLoading.remove();
    }
    
    if (!quiz || quiz.length === 0) {
        quizContainer.innerHTML = '<p class="no-data">Aucune question disponible pour le moment.</p>';
        return;
    }
    
    let score = 0;
    let answered = 0;
    const totalQuestions = quiz.length;
    
    quiz.forEach((q, questionIndex) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "quiz-question";
        questionDiv.setAttribute("data-question-index", questionIndex);

        let optionsHTML = "";
        q.options.forEach((opt, index) => {
            optionsHTML += `<button data-answer="${index}" class="quiz-option" aria-label="Option ${index + 1}: ${opt}">${opt}</button>`;
        });

        questionDiv.innerHTML = `
            <h3 class="quiz-question-text">${q.question}</h3>
            <div class="quiz-options" role="group" aria-label="Options pour: ${q.question}">
                ${optionsHTML}
            </div>
            <div class="quiz-feedback" role="status" aria-live="polite"></div>
        `;

        quizContainer.appendChild(questionDiv);

        const options = questionDiv.querySelectorAll(".quiz-option");
        const feedback = questionDiv.querySelector(".quiz-feedback");

        options.forEach(btn => {
            btn.addEventListener("click", () => {
                // Désactiver tous les boutons de cette question
                options.forEach(b => {
                    b.disabled = true;
                    b.classList.remove("correct", "incorrect");
                });

                const selectedAnswer = parseInt(btn.dataset.answer);
                const isCorrect = selectedAnswer === q.answer;

                if (isCorrect) {
                    btn.classList.add("correct");
                    feedback.innerHTML = '<span class="feedback-correct">✓ Correct !</span>';
                    if (!questionDiv.dataset.answered) {
                        score++;
                        answered++;
                        questionDiv.dataset.answered = "true";
                    }
                } else {
                    btn.classList.add("incorrect");
                    // Afficher la bonne réponse
                    options[q.answer].classList.add("correct");
                    feedback.innerHTML = `<span class="feedback-incorrect">✗ Incorrect. La bonne réponse était: "${q.options[q.answer]}"</span>`;
                    if (!questionDiv.dataset.answered) {
                        answered++;
                        questionDiv.dataset.answered = "true";
                    }
                }
                
                // Afficher le score si toutes les questions sont répondues
                if (answered === totalQuestions) {
                    showQuizScore(score, totalQuestions);
                }
            });
        });
    });
}

// Fonction pour afficher le score final
function showQuizScore(score, total) {
    const scoreDiv = document.createElement("div");
    scoreDiv.className = "quiz-score";
    scoreDiv.innerHTML = `
        <h3>Résultat du Quiz</h3>
        <p class="score-text">Vous avez obtenu <strong>${score}/${total}</strong></p>
        <p class="score-percentage">${Math.round((score / total) * 100)}% de bonnes réponses</p>
        <button class="btn btn-secondary" onclick="location.reload()">Recommencer</button>
    `;
    quizContainer.appendChild(scoreDiv);
}

// Charger le quiz au démarrage
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadQuiz);
} else {
    loadQuiz();
}


