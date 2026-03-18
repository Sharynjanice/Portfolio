// chatbox.js - Chat box widget with API integration
const chatWidget = document.getElementById('chat-widget');
const chatToggle = document.getElementById('chat-toggle');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatForm = document.getElementById('chat-form');

// API Configuration - Replace with your actual API endpoint
const CHAT_API_ENDPOINT = 'YOUR_CHAT_API_ENDPOINT_HERE'; // Example: 'https://api.example.com/chat'
// For demo purposes, you can use a service like OpenAI, Hugging Face, or your own backend

let isOpen = false;
let messageHistory = [];

// Toggle chat widget
chatToggle?.addEventListener('click', () => {
    isOpen = !isOpen;
    chatWidget?.classList.toggle('open', isOpen);
    if (isOpen) {
        chatInput?.focus();
    }
});

// Close chat
chatClose?.addEventListener('click', () => {
    isOpen = false;
    chatWidget?.classList.remove('open');
});

// Send message
function sendMessage(message) {
    if (!message.trim()) return;

    // Add user message to chat
    addMessageToChat('user', message);
    messageHistory.push({ role: 'user', content: message });

    // Clear input
    if (chatInput) chatInput.value = '';

    // Show typing indicator
    const typingId = showTypingIndicator();

    // Send to API
    sendToAPI(message)
        .then(response => {
            removeTypingIndicator(typingId);
            addMessageToChat('assistant', response);
            messageHistory.push({ role: 'assistant', content: response });
        })
        .catch(error => {
            removeTypingIndicator(typingId);
            console.error('Chat error:', error);
            addMessageToChat('assistant', 'Désolé, je rencontre un problème. Veuillez réessayer plus tard.');
        });
}

// Add message to chat UI
function addMessageToChat(role, content) {
    if (!chatMessages) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${role}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'chat-message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    if (!chatMessages) return null;

    const typingId = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.id = typingId;
    typingDiv.className = 'chat-message assistant typing';
    
    typingDiv.innerHTML = `
        <div class="chat-message-content">
            <span class="typing-dots">
                <span>.</span><span>.</span><span>.</span>
            </span>
        </div>
    `;
    
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return typingId;
}

// Remove typing indicator
function removeTypingIndicator(typingId) {
    if (!typingId) return;
    const typingElement = document.getElementById(typingId);
    if (typingElement) {
        typingElement.remove();
    }
}

// Send message to API (now personalized for Sharyn's portfolio)
async function sendToAPI(message) {
    // Personalized responses about Sharyn
    const responses = {
        // Greeting and introduction
        greeting: [
            "Bonjour ! Je suis Sharyn Foka, étudiante en informatique à l'IPI Toulouse. Je suis passionnée par le développement web, la cybersécurité et la lecture. Comment puis-je vous aider ?",
            "Salut ! Enchantée de vous rencontrer. Je suis Sharyn, développeuse en herbe spécialisée en HTML, CSS et JavaScript. Que souhaitez-vous savoir sur moi ?"
        ],

        // Studies and education
        etudes: [
            "Je suis actuellement en 2ᵉ année de développement à l'IPI Toulouse. J'ai choisi cette formation pour acquérir des compétences solides en programmation et développement web.",
            "J'étudie le développement informatique à l'IPI Toulouse depuis 2 ans. Cette formation me permet de développer mes compétences techniques tout en travaillant sur des projets concrets."
        ],

        // Skills and technologies
        competences: [
            "Mes compétences principales sont en HTML, CSS et JavaScript. Je maîtrise également les bases de React, Node.js et j'ai des notions en cybersécurité. J'apprends continuellement de nouvelles technologies !",
            "Je suis à l'aise avec HTML, CSS, JavaScript et les frameworks front-end. J'ai également des compétences en design UI/UX avec Figma et Canva."
        ],

        // Projects
        projets: [
            "J'ai réalisé plusieurs projets dont Braids & Beauty (site vitrine pour un salon de coiffure), une bibliothèque en ligne, et une refonte UI/UX pour My SelfKey. Je travaille actuellement sur l'optimisation d'un site e-commerce pour Miels & Merveilles.",
            "Mes projets incluent des sites web comme Braids & Beauty, une application de bibliothèque, et des maquettes Figma. Je cherche toujours de nouveaux défis techniques !"
        ],

        // Experience and work
        experience: [
            "J'ai une expérience en développement front-end avec des projets personnels et professionnels. Je viens de décrocher une collaboration d'un mois chez Miels & Merveilles pour optimiser leur site e-commerce.",
            "En plus de mes études, j'ai travaillé sur des projets clients comme le site Braids & Beauty. Je recherche maintenant une alternance en développement pour septembre."
        ],

        // Interests and hobbies
        interets: [
            "En dehors du code, je suis passionnée par la lecture (surtout les romans de science-fiction et fantasy), la cybersécurité, et j'aime découvrir de nouvelles technologies. J'ai aussi un intérêt pour le design et l'UX/UI.",
            "Mes hobbies incluent la lecture, l'apprentissage continu en cybersécurité, et l'exploration de nouvelles technologies. J'adore aussi créer des designs avec Canva !"
        ],

        // Contact and availability
        contact: [
            "Vous pouvez me contacter par email à jacesharyn@gmail.com ou par téléphone au +33 6 61 03 34 42. N'hésitez pas à me laisser un message via le formulaire de contact !",
            "Pour me contacter, utilisez l'email jacesharyn@gmail.com ou le téléphone +33 6 61 03 34 42. Je suis disponible pour des collaborations ou des opportunités professionnelles."
        ],

        // Reading interests
        lecture: [
            "La lecture est l'une de mes plus grandes passions ! Je lis principalement de la science-fiction et de la fantasy. Mes auteurs préférés incluent Isaac Asimov, Frank Herbert, et j'adore découvrir de nouveaux talents. J'ai même créé une bibliothèque en ligne pour organiser mes lectures !",
            "Je suis une grande lectrice, surtout dans les genres de science-fiction et fantasy. J'aime les univers complexes et les personnages bien développés. Ma bibliothèque personnelle compte plus de 200 livres, et je continue d'enrichir ma collection régulièrement."
        ],

        // Content creation
        creation: [
            "J'adore créer du contenu ! Que ce soit des designs avec Canva, des maquettes Figma, ou du développement web, la création fait partie de mon quotidien. J'ai créé des visuels pour Miels & Merveilles et je travaille régulièrement sur des projets créatifs personnels.",
            "La création de contenu est au cœur de mes activités. Je crée des designs marketing avec Canva, des interfaces utilisateur avec Figma, et je développe des sites web. C'est ce mélange entre technique et créativité qui me passionne le plus !"
        ],

        // Default responses
        default: [
            "Je suis ravie que vous vous intéressiez à mon profil ! Pouvez-vous me poser une question plus spécifique sur mes études, mes projets, mes compétences, ma passion pour la lecture ou ma création de contenu ?",
            "C'est gentil de votre intérêt ! Je peux vous parler de mes études à l'IPI Toulouse, mes projets de développement, mes compétences techniques, ma bibliothèque personnelle, ou mes créations graphiques. Que voulez-vous savoir ?"
        ]
    };

    // Function to find matching keywords
    function findResponseCategory(message) {
        const lowerMessage = message.toLowerCase();

        // Keywords for each category
        const keywords = {
            greeting: ['bonjour', 'salut', 'hello', 'hi', 'hey', 'coucou'],
            etudes: ['etudes', 'formation', 'ipi', 'toulouse', 'ecole', 'universite', 'diplome'],
            competences: ['competences', 'skills', 'html', 'css', 'javascript', 'react', 'node', 'technologie', 'langage'],
            projets: ['projets', 'portfolio', 'realisations', 'braids', 'bibliotheque', 'miels', 'merveilles'],
            experience: ['experience', 'travail', 'professionnel', 'stage', 'alternance', 'emploi'],
            interets: ['interets', 'hobbies', 'passions', 'lecture', 'cybersécurité', 'design', 'loisirs'],
            lecture: ['livre', 'lire', 'lecture', 'bibliotheque', 'roman', 'science-fiction', 'fantasy', 'auteur', 'asimov', 'herbert'],
            creation: ['creation', 'contenu', 'creer', 'design', 'canva', 'figma', 'visuel', 'marketing', 'graphisme', 'artistique'],
            contact: ['contact', 'email', 'telephone', 'tel', 'linkedin', 'joindre'],
            avenir: ['avenir', 'futur', 'recherche', 'alternance', 'objectif', 'carriere']
        };

        for (const [category, words] of Object.entries(keywords)) {
            if (words.some(word => lowerMessage.includes(word))) {
                return category;
            }
        }

        return 'default';
    }

    // Get response category
    const category = findResponseCategory(message);
    const categoryResponses = responses[category];

    // Return random response from category
    return new Promise(resolve => {
        setTimeout(() => {
            const randomResponse = categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
            resolve(randomResponse);
        }, 800 + Math.random() * 1200); // Random delay between 800-2000ms
    });
}

// Handle form submission
chatForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatInput?.value.trim();
    if (message) {
        sendMessage(message);
    }
});

// Handle send button click
chatSend?.addEventListener('click', () => {
    const message = chatInput?.value.trim();
    if (message) {
        sendMessage(message);
    }
});

// Add welcome message on load
if (chatMessages && chatMessages.children.length === 0) {
    addMessageToChat('assistant', 'Bonjour ! Je suis Sharyn Foka. Posez-moi des questions sur mes etudes, mes projets, mes competences, ma passion pour la lecture ou ma creation de contenu !');
}

// Example: Integration with OpenAI API (uncomment and configure if needed)
/*
async function sendToOpenAI(message) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant for a computer engineering student portfolio.' },
                ...messageHistory.slice(-10),
                { role: 'user', content: message }
            ]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}
*/

