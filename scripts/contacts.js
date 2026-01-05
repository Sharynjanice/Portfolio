// contacts.js - Gestion du formulaire de contact
const contactForm = document.querySelector('.contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = contactForm?.querySelector('button[type="submit"]');
const btnText = submitBtn?.querySelector('.btn-text');
const btnLoader = submitBtn?.querySelector('.btn-loader');

// Fonction pour afficher un message
function showMessage(message, type = 'success') {
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message form-message-${type}`;
    formMessage.setAttribute('role', 'alert');
    
    // Masquer après 5 secondes
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 5000);
}

// Fonction pour gérer l'état du bouton
function setButtonState(loading) {
    if (!submitBtn || !btnText || !btnLoader) return;
    
    if (loading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
}

// Gestion de la soumission du formulaire
contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const FORMSPREE_URL = 'https://formspree.io/f/xqazzjdo';

    // Validation côté client
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();
    const message = formData.get('message')?.trim();

    if (!name || !email || !message) {
        showMessage('Veuillez remplir tous les champs.', 'error');
        return;
    }

    // Valider l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showMessage('Veuillez entrer une adresse email valide.', 'error');
        return;
    }

    setButtonState(true);
    showMessage('Envoi en cours...', 'info');

    try {
        const response = await fetch(FORMSPREE_URL, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await response.json();

        if (response.ok) {
            showMessage('Message envoyé avec succès ! Merci pour votre message. 👍', 'success');
            contactForm.reset();
        } else {
            if (data.errors) {
                showMessage(`Erreur: ${data.errors.map(e => e.message).join(', ')}`, 'error');
            } else {
                showMessage('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.', 'error');
            }
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        showMessage('Erreur réseau. Vérifiez votre connexion et réessayez.', 'error');
    } finally {
        setButtonState(false);
    }
});
