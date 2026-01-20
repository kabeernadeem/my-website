// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
const menuOpen = document.getElementById('menu-open');
const menuClose = document.getElementById('menu-close');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    mobileNav?.classList.toggle('hidden');
    menuOpen?.classList.toggle('hidden');
    menuClose?.classList.toggle('hidden');
  });
}

// Close mobile nav when a link is clicked
document.querySelectorAll('#mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (!mobileNav?.classList.contains('hidden')) {
      mobileNav?.classList.add('hidden');
      menuOpen?.classList.remove('hidden');
      menuClose?.classList.add('hidden');
    }
  });
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
  if (!mobileNav?.contains(e.target) && !navToggle?.contains(e.target)) {
    mobileNav?.classList.add('hidden');
    menuOpen?.classList.remove('hidden');
    menuClose?.classList.add('hidden');
  }
});

// Trigger homepage hero animation with letter-by-letter splitting
document.addEventListener('DOMContentLoaded', function() {
  function splitText(selector, delayStep = 40) {
    const el = document.querySelector(selector);
    if (!el || el.dataset.split === 'true') return;
    const text = el.textContent || '';
    el.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.setProperty('--delay', `${i * delayStep}ms`);
      el.appendChild(span);
    }
    el.dataset.split = 'true';
  }

  // Only split the primary hero elements for a pleasing effect
  splitText('#hero-title', 40);
  splitText('#hero-sub', 30);

  // After a short paint delay, add class to start transitions
  setTimeout(() => document.body.classList.add('home-animated'), 80);
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const feedback = document.getElementById('form-feedback');
    const error = document.getElementById('form-error');
    
    // Reset feedback messages
    if (feedback) feedback.classList.add('hidden');
    if (error) error.classList.add('hidden');
    
    // Validation
    if (!name || !email || !subject || !message) {
      if (error) error.classList.remove('hidden');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (error) error.classList.remove('hidden');
      return;
    }
    
    // Show success message
    if (feedback) {
      feedback.classList.remove('hidden');
      // Reset form
      contactForm.reset();
      // Hide success message after 5 seconds
      setTimeout(() => {
        feedback.classList.add('hidden');
      }, 5000);
    }
    
    // TODO: Send form data to backend/email service
    // Example: 
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, subject, message, company })
    // }).then(response => response.json());
  });
}

// Set current year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Smooth scroll behavior (already enabled in CSS but this provides fallback)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Interactive tilt effect for cards with `hover-tilt` class
const tiltItems = document.querySelectorAll('.hover-tilt');
tiltItems.forEach(item => {
  item.style.transformStyle = 'preserve-3d';
  item.addEventListener('mousemove', (e) => {
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within element
    const y = e.clientY - rect.top;  // y position within element
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx; // normalized -1 .. 1
    const dy = (y - cy) / cy;
    const rotateX = (dy * 6).toFixed(2);
    const rotateY = (dx * -6).toFixed(2);
    item.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    item.style.transition = 'transform 0.05s ease-out';
    item.style.cursor = 'pointer';
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    item.style.transition = 'transform 200ms ease-out';
    item.style.cursor = '';
  });
});

// WhatsApp Floating Widget - Opens on Click and Hover
document.addEventListener('DOMContentLoaded', function() {
  const whatsappBtn = document.getElementById('whatsapp-floating-btn');
  if (whatsappBtn) {
    // Function to open WhatsApp
    function openWhatsApp() {
      const phoneNumber = '923124171077';
      const message = "Hi Kabeer, I'd like to discuss your services.";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
    
    // Open on CLICK
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openWhatsApp();
    });
    
    // Open on HOVER
    whatsappBtn.addEventListener('mouseenter', () => {
      // Animate button
      whatsappBtn.style.transform = 'scale(1.15) rotate(-10deg)';
      whatsappBtn.style.boxShadow = '0 10px 30px rgba(37, 211, 102, 0.5)';
      
      // Open WhatsApp on hover
      setTimeout(() => {
        openWhatsApp();
      }, 100);
    });
    
    // Reset animation on mouse leave
    whatsappBtn.addEventListener('mouseleave', () => {
      whatsappBtn.style.transform = 'scale(1) rotate(0deg)';
      whatsappBtn.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.3)';
    });
  }
});

// AI Chatbot - Contextual Responses
const chatbotResponses = {
  welcome: "Welcome to StratifyX.web's services! How can I help you today?",
  
  services: {
    detailed: "I offer three main services:\n\n🔹 Web Development:\n• React.js & Vue.js\n• Laravel & PHP\n• WordPress\n• API integration\n• SQL databases\n\n🔐 Cybersecurity:\n• VAPT\n• Malware Analysis\n• CEH V10 Certified\n• CSA expertise\n• Qradar & Rapid7\n\n📈 Business Development Strategy:\n• Market research\n• Go-to-market planning\n• Growth optimization",
    short: "I specialize in Web Development, Cybersecurity, and Business Development Strategy. What interests you most?"
  },
  
  certifications: "Our professional certifications include:\n✓ CEH V10 (Certified Ethical Hacker)\n✓ CSA (Cloud Security Alliance)\n✓ Qradar\n✓ Rapid7\n✓ VAPT & Malware Analysis\n\nThese certifications validate our expertise in cybersecurity and advanced threat analysis.",
  
  contact: {
    full: "Here's how you can reach StratifyX.web:\n📧 Email: meetingofficial23@gmail.com\n📱 Phone: +92-3124171077\n💼 LinkedIn: linkedin.com/in/kabeer-nadeem-3a6162279/\n💬 WhatsApp: wa.me/923124171077",
    short: "You can reach StratifyX via email, phone, LinkedIn, or WhatsApp. Which would you prefer?"
  },
  
  thanks: "You're welcome! Feel free to ask if you have any other questions.",
  
  about: "StratifyX.web is a Web Development and Business Strategy firm with expertise in:\n• Full-stack web development (React, Laravel, PHP, Vue)\n• Cybersecurity (VAPT, Malware Analysis, CEH V10)\n• Business development and growth strategies\n\nHow can we help you?",
  
  experience: "StratifyX has 10+ years of combined experience delivering 50+ projects in web development, cybersecurity, and business strategy. We work with startups and enterprises to build scalable solutions.",
  
  portfolio: "We've worked on various projects including e-commerce platforms, web applications, security assessments, and business strategy consulting. Feel free to explore our portfolio on this site!",
  
  hiring: "Yes! We're available for freelance projects, contracts, and consulting. Contact us at meetingofficial23@gmail.com or +92-3124171077 to discuss your project.",
  
  payment: "I'm flexible with payment terms. We can discuss rates based on project scope and requirements. Contact me for a custom quote.",
  
  technologies: "I work with:\n✓ Frontend: React.js, Vue.js, Tailwind CSS\n✓ Backend: Laravel, PHP, Node.js\n✓ Database: SQL, PostgreSQL, MySQL\n✓ CMS: WordPress\n✓ Security: CEH V10, VAPT, Malware Analysis",
  
  availability: "I'm currently open to new projects and collaborations. Contact me to discuss your requirements and timeline.",
  
  rate: "My rates are competitive and based on project scope, complexity, and timeline. Let's discuss your project requirements for a custom quote.",
  
  default: "That's an interesting question! We are StratifyX — Web Development, Security, and Business Strategy. Feel free to ask about our services, experience, certifications, or how we can help your business. 😊"
};

function getChatbotResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  
  // About/Bio questions
  if (msg.match(/about|who are you|tell me about you|bio|background|yourself/i)) {
    return chatbotResponses.about;
  }
  
  // Services questions
  if (msg.match(/services|what do you|what can you|offerings|capabilities|what you offer/i)) {
    return chatbotResponses.services.detailed;
  }
  
  // Web development questions
  if (msg.match(/web|react|laravel|php|vue|wordpress|api|development|coding|website|frontend|backend|full.?stack|html|css|javascript|js/i)) {
    return "I specialize in full-stack web development using:\n• Frontend: React.js & Vue.js\n• Backend: Laravel & PHP\n• Platforms: WordPress\n• APIs: RESTful design & integration\n• Databases: SQL optimization\n\nHow can I assist with your web project?";
  }
  
  // Cybersecurity questions
  if (msg.match(/security|cyber|vapt|malware|ceh|qradar|rapid7|csa|penetration|threat|hacking|secure|attack/i)) {
    return "I offer comprehensive cybersecurity services:\n• VAPT (Vulnerability Assessment & Penetration Testing)\n• Malware Analysis & Threat Hunting\n• CEH V10 Certified Ethical Hacker\n• Cloud Security Alliance (CSA) expertise\n• Qradar & Rapid7 SIEM platforms\n\nLooking to secure your systems?";
  }
  
  // Business strategy questions
  if (msg.match(/business|strategy|growth|market|expansion|revenue|scaling|go.?to.?market|entrepreneurship|startup/i)) {
    return "Business Development Strategy is a core offering that includes:\n• Market research & competitive analysis\n• Go-to-market strategy development\n• Revenue growth optimization\n• Business scaling strategies\n• Partnership & expansion planning\n\nWhat are your business goals?";
  }
  
  // Certification questions
  if (msg.match(/certifications?|qualified|certified|credentials|training|ceh|csa|rapid7|qradar|exam/i)) {
    return chatbotResponses.certifications;
  }
  
  // Contact questions
  if (msg.match(/contact|reach|email|phone|whatsapp|linkedin|get in touch|how can i|connect|call|message/i)) {
    return chatbotResponses.contact.full;
  }
  
  // Experience questions
  if (msg.match(/experience|years|work|projects|portfolio|previous|past|history/i)) {
    return chatbotResponses.experience;
  }
  
  // Portfolio questions
  if (msg.match(/portfolio|work|projects|examples|case studies|gallery/i)) {
    return chatbotResponses.portfolio;
  }
  
  // Hiring/Work questions
  if (msg.match(/hire|job|work|freelance|available|open|employment|contract|collaborate/i)) {
    return chatbotResponses.hiring;
  }
  
  // Technology questions
  if (msg.match(/technology|tech stack|tools|frameworks|languages|platform|technologies/i)) {
    return chatbotResponses.technologies;
  }
  
  // Rate/Price questions
  if (msg.match(/rate|price|cost|payment|how much|fee|budget/i)) {
    return chatbotResponses.rate;
  }
  
  // Availability questions
  if (msg.match(/available|busy|schedule|when|timeline|deadline/i)) {
    return chatbotResponses.availability;
  }
  
  // Thank you
  if (msg.match(/thank|thanks|thankyou|appreciate|grateful/i)) {
    return chatbotResponses.thanks;
  }
  
  // Greetings
  if (msg.match(/^(hi|hello|hey|greetings|wassup|what's up|sup)/i)) {
    return chatbotResponses.welcome;
  }
  
  // Default response - always has a helpful message
  return chatbotResponses.default;
}

// Initialize Chatbot
document.addEventListener('DOMContentLoaded', function() {
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  
  if (!chatToggle || !chatWindow || !chatMessages || !chatInput || !chatSend) {
    return;
  }
  
  let hasGreeted = false;
  
  // Show welcome message
  function showWelcome() {
    if (!hasGreeted) {
      hasGreeted = true;
      const welcomeMsg = document.createElement('div');
      welcomeMsg.className = 'mb-3 p-3 bg-blue-600 text-white rounded-lg text-sm';
      welcomeMsg.textContent = chatbotResponses.welcome;
      chatMessages.appendChild(welcomeMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }
  
  // Open chat on hover (mouseenter)
  chatToggle.addEventListener('mouseenter', (e) => {
    e.stopPropagation();
    chatWindow.classList.remove('hidden');
    showWelcome();
    chatInput.focus();
  });
  
  // Send message function
  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    // Show user message
    const userMsg = document.createElement('div');
    userMsg.className = 'mb-4 p-4 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 rounded-xl text-sm text-right shadow-sm border border-slate-300 word-wrap break-words';
    userMsg.textContent = text;
    chatMessages.appendChild(userMsg);
    
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Show bot response after delay
    setTimeout(() => {
      const response = getChatbotResponse(text);
      const botMsg = document.createElement('div');
      botMsg.className = 'mb-4 p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm shadow-md border border-blue-500 word-wrap break-words';
      botMsg.textContent = response;
      chatMessages.appendChild(botMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 400);
  }
  
  // Send on button click
  chatSend.addEventListener('click', sendMessage);
  
  // Send on Enter key
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // Close chat when clicking outside
  document.addEventListener('click', (e) => {
    const chatContainer = chatWindow.parentElement;
    if (!chatContainer.contains(e.target) && !chatToggle.contains(e.target)) {
      chatWindow.classList.add('hidden');
    }
  });
});

