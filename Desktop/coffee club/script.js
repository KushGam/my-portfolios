// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('.theme-icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Menu Tab Functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-item');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get the category
        const category = button.getAttribute('data-category');
        
        // Hide all menu items
        menuItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Show items of selected category
        menuItems.forEach(item => {
            if (item.getAttribute('data-category') === category) {
                item.classList.add('active');
            }
        });
    });
});

// Initialize menu - show coffee items by default
document.addEventListener('DOMContentLoaded', () => {
    const coffeeItems = document.querySelectorAll('[data-category="coffee"]');
    coffeeItems.forEach(item => item.classList.add('active'));
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    }
    
    lastScroll = currentScroll;
});

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotBadge = document.querySelector('.chatbot-badge');

// Toggle chatbot window
chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    if (chatbotWindow.classList.contains('active')) {
        chatbotBadge.style.display = 'none';
        chatbotInput.focus();
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

// Chatbot responses
const chatbotResponses = {
    greetings: [
        "Hello! Welcome to Coffee Club! ☕ How can I help you today?",
        "Hi there! Great to see you! What would you like to know?",
        "Hey! Welcome! How can I assist you today?"
    ],
    menu: [
        "We serve Coffee, Breakfast, Waffles, and authentic Korean Food! Check out our menu section to see all our offerings. ☕",
        "Our menu includes coffee, breakfast items, delicious waffles, and authentic Korean cuisine like Bibimbap, Bulgogi, and Kimchi Fried Rice! What are you in the mood for?",
        "We offer coffee, breakfast, waffles, and Korean food. Would you like to know about a specific item?"
    ],
    hours: [
        "We're open everyday from 7:00 AM - 9:00 PM. Come visit us! ☕",
        "Our hours are everyday 7 AM to 9 PM. We'd love to see you!",
        "We're here everyday 7am-9pm. Stop by anytime!"
    ],
    location: [
        "We're located at Raniban Townplanning, Kathmandu, Nepal 44600. Can't wait to see you! 📍",
        "Find us at Raniban Townplanning in Kathmandu, Nepal. We're easy to find!",
        "Come visit us at Raniban Townplanning, Kathmandu, Nepal 44600! We'd love to have you!"
    ],
    contact: [
        "You can follow us on Instagram @coffe_eclub2022 or TikTok @coffe_eclub2022 for updates! Or just chat with me here! 📞",
        "Follow us on Instagram or TikTok @coffe_eclub2022 for the latest news! We're here to help!",
        "Check out our Instagram and TikTok @coffe_eclub2022. Or keep chatting with me!"
    ],
    instagram: [
        "Follow us on Instagram @coffe_eclub2022 for daily updates, special offers, and behind-the-scenes content! 📸",
        "Check out our Instagram @coffe_eclub2022 for the latest news and specials!",
        "Follow @coffe_eclub2022 on Instagram to stay updated with all our latest offerings!"
    ],
    default: [
        "That's interesting! Can you tell me more? Or ask about our menu, hours, location, or contact info! ☕",
        "I'd love to help! Try asking about our menu, hours, location, or how to contact us.",
        "Great question! I can help with information about our menu, hours, location, or contact details. What would you like to know?"
    ]
};

// Function to get bot response
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    if (message.match(/hello|hi|hey|greetings|good morning|good afternoon|good evening/)) {
        return chatbotResponses.greetings[Math.floor(Math.random() * chatbotResponses.greetings.length)];
    }
    if (message.match(/menu|food|drink|coffee|tea|breakfast|waffle|korean|what do you serve|what's available/)) {
        return chatbotResponses.menu[Math.floor(Math.random() * chatbotResponses.menu.length)];
    }
    if (message.match(/pet|dog|cat|animal|furry|bring pet/)) {
        return "Yes! We're a pet-friendly cafe! 🐾 Bring your furry friends along - they're always welcome!";
    }
    if (message.match(/delivery|takeaway|take away|to go|home delivery|order/)) {
        return "Yes! We offer both takeaway and home delivery! 🥡🚚 You can enjoy our food and drinks at home or on the go!";
    }
    if (message.match(/hours|open|close|when|time|schedule/)) {
        return chatbotResponses.hours[Math.floor(Math.random() * chatbotResponses.hours.length)];
    }
    if (message.match(/location|address|where|find|directions/)) {
        return chatbotResponses.location[Math.floor(Math.random() * chatbotResponses.location.length)];
    }
    if (message.match(/contact|phone|email|call|reach|number/)) {
        return chatbotResponses.contact[Math.floor(Math.random() * chatbotResponses.contact.length)];
    }
    if (message.match(/instagram|social|follow|@|instagram/)) {
        return chatbotResponses.instagram[Math.floor(Math.random() * chatbotResponses.instagram.length)];
    }
    if (message.match(/thank|thanks|appreciate/)) {
        return "You're very welcome! Is there anything else I can help you with? ☕";
    }
    if (message.match(/bye|goodbye|see you|later/)) {
        return "Thanks for chatting! Hope to see you at Coffee Club soon! Have a great day! ☕";
    }
    
    return chatbotResponses.default[Math.floor(Math.random() * chatbotResponses.default.length)];
}

// Function to add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const p = document.createElement('p');
    p.textContent = text;
    contentDiv.appendChild(p);
    
    messageDiv.appendChild(contentDiv);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Send message function
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Simulate bot thinking
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response, false);
    }, 500);
}

// Event listeners
chatbotSend.addEventListener('click', sendMessage);

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe menu items and features
document.querySelectorAll('.menu-item, .feature, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

