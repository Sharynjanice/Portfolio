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

// Send message to API
async function sendToAPI(message) {
    // If no API endpoint is configured, use a demo response
    if (CHAT_API_ENDPOINT === 'YOUR_CHAT_API_ENDPOINT_HERE') {
        // Demo mode - return a simple response
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('Bonjour ! Je suis un chatbot de démonstration. Pour utiliser une vraie API, configurez CHAT_API_ENDPOINT dans chatbox.js avec votre endpoint (OpenAI, Hugging Face, ou votre propre backend).');
            }, 1000);
        });
    }

    try {
        const response = await fetch(CHAT_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                history: messageHistory.slice(-5) // Send last 5 messages for context
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.response || data.message || 'Désolé, je n\'ai pas pu traiter votre message.';
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
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
    addMessageToChat('assistant', 'Bonjour ! 👋 Comment puis-je vous aider aujourd\'hui ?');
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

