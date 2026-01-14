// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');

navToggle?.addEventListener('click', () => {
  mobileNav?.classList.toggle('hidden');
  menuOpen?.classList.toggle('hidden');
  menuClose?.classList.toggle('hidden');
});

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav when link clicked
        if (!mobileNav?.classList.contains('hidden')) {
          mobileNav.classList.add('hidden');
          menuOpen.classList.remove('hidden');
          menuClose.classList.add('hidden');
        }
      }
    }
  });
});

// Chatbot functionality
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

// Toggle chat window
chatToggle?.addEventListener('click', () => {
  chatWindow.classList.toggle('hidden');
  if (!chatWindow.classList.contains('hidden')) {
    chatWindow.classList.add('show');
    chatInput?.focus();
  }
});

// Send message function
function sendMessage() {
  const message = chatInput?.value.trim();
  if (!message) return;

  // Add user message
  addMessage(message, 'user');
  
  // Clear input
  if (chatInput) chatInput.value = '';
  
  // Simulate bot response
  setTimeout(() => {
    const response = generateBotResponse(message);
    addMessage(response, 'bot');
  }, 1000);
}

// Add message to chat
function addMessage(message, sender) {
  if (!chatMessages) return;

  const messageDiv = document.createElement('div');
  messageDiv.className = `flex items-start gap-3 ${sender === 'user' ? 'flex-row-reverse' : ''}`;
  
  if (sender === 'user') {
    messageDiv.innerHTML = `
      <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
        <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      </div>
      <div class="bg-blue-600 text-white rounded-lg rounded-tr-none p-3 shadow-sm max-w-[80%]">
        <p class="text-sm">${message}</p>
      </div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
        <svg class="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
        </svg>
      </div>
      <div class="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[80%]">
        <p class="text-sm text-gray-800">${message}</p>
      </div>
    `;
  }
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Generate bot response
function generateBotResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('seo') || lowerMessage.includes('search engine')) {
    return "I offer comprehensive SEO services including on-page optimization, technical SEO audits, link building, and content strategy. These services help improve your website's visibility on search engines and drive organic traffic. Would you like to know more about any specific SEO service?";
  } else if (lowerMessage.includes('web design') || lowerMessage.includes('website') || lowerMessage.includes('development')) {
    return "I provide professional web design services including custom WordPress development, e-commerce solutions, Shopify stores, website redesign, and ongoing maintenance. All websites are mobile-responsive and optimized for performance. What type of website are you looking for?";
  } else if (lowerMessage.includes('marketing') || lowerMessage.includes('digital marketing')) {
    return "My digital marketing services include social media marketing, content strategy, PPC campaigns, and comprehensive online marketing strategies. I help businesses increase brand awareness and customer engagement. Which marketing service interests you most?";
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone') || lowerMessage.includes('reach')) {
    return "You can reach me through: 📧 Email: meetingofficial23@gmail.com 📱 Phone: +92-312-417-1077 💬 WhatsApp: Available 24/7 🌐 Website: Use the contact form for detailed inquiries. I typically respond within 24 hours!";
  } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
    return "Pricing varies based on project scope and requirements. I offer custom quotes for each project to ensure you get the best value. Please contact me with your project details, and I'll provide a detailed quote within 24 hours.";
  } else if (lowerMessage.includes('portfolio') || lowerMessage.includes('work') || lowerMessage.includes('projects')) {
    return "I have successfully completed over 150 projects across various industries including e-commerce, corporate websites, and digital marketing campaigns. You can view my portfolio on the website, or I can share specific case studies relevant to your industry.";
  } else {
    return "Thank you for your message! I specialize in web development, SEO services, and digital marketing. I can help you create a professional online presence that drives business results. Feel free to ask about any specific service, or contact me directly for a consultation!";
  }
}

// Event listeners for chat
chatSend?.addEventListener('click', sendMessage);
chatInput?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Quick action buttons
document.querySelectorAll('.quick-action').forEach(button => {
  button.addEventListener('click', () => {
    const message = button.getAttribute('data-message');
    if (message && chatInput) {
      chatInput.value = message;
      sendMessage();
    }
  });
});

// Contact form handling (demo only)
const form = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Basic UI feedback; integrate with backend or email service as needed
    feedback.classList.remove('hidden');
    setTimeout(() => {
      feedback.classList.add('hidden');
      form.reset();
    }, 3000);
  });
}

// Set current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fadeInUp');
    }
  });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
  observer.observe(card);
});
