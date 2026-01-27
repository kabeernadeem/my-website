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

// AI Chatbot - Enhanced Contextual Responses with Full Website Knowledge
const chatbotResponses = {
  welcome: "Welcome to StratifyX.web! I'm your virtual assistant and I have complete knowledge of our website. I can help you with information about our services (SEO, Web Design, Digital Marketing, E-commerce, Shopify, Social Media, Technical SEO), company details, contact information, or any questions about our work. How can I assist you today?",
  
  services: {
    detailed: "StratifyX.web offers comprehensive digital services:\n\n🔍 SEO Services:\n• On-Page SEO Optimization\n• Off-Page SEO & Link Building\n• Technical SEO Audits\n• Keyword Research & Strategy\n• Local SEO Optimization\n\n🎨 Web Design & Development:\n• Custom Website Design\n• WordPress Development\n• Responsive & Mobile-First Design\n• UI/UX Design\n• Website Redesign\n\n📈 Digital Marketing:\n• Social Media Marketing\n• Content Marketing\n• Email Marketing\n• PPC Campaigns\n• Brand Strategy\n\n🛒 E-commerce Solutions:\n• Online Store Development\n• Payment Gateway Integration\n• Product Management Systems\n• Shopping Cart Optimization\n• E-commerce SEO\n\n🛍️ Shopify Development:\n• Shopify Store Setup\n• Theme Customization\n• App Integration\n• Shopify SEO\n• Store Optimization\n\n📱 Social Media Management:\n• Social Media Strategy\n• Content Creation\n• Community Management\n• Social Media Advertising\n• Analytics & Reporting\n\n⚙️ Technical SEO:\n• Website Audits\n• Site Speed Optimization\n• Schema Markup\n• XML Sitemaps\n• Core Web Vitals\n\nWhich service would you like to know more about?",
    short: "We offer SEO, Web Design, Digital Marketing, E-commerce, Shopify, Social Media, and Technical SEO services. What specific service interests you?"
  },
  
  certifications: "Our professional certifications include:\n✓ CEH V10 (Certified Ethical Hacker)\n✓ CSA (Cloud Security Alliance)\n✓ Qradar\n✓ Rapid7\n✓ VAPT & Malware Analysis\n\nThese certifications validate our expertise in cybersecurity and advanced threat analysis.",
  
  contact: {
    full: "You can reach StratifyX.web through multiple channels:\n\n📧 Email: meetingofficial23@gmail.com\n📱 Phone/WhatsApp: +92-312-417-1077\n💼 LinkedIn: linkedin.com/in/kabeer-nadeem-3a6162279/\n🌐 Website: www.stratifyx.web\n\nWe typically respond to emails within 24 hours and are available for calls during business hours. Feel free to reach out for a free consultation!",
    short: "Contact us via email, phone, WhatsApp, or LinkedIn. What's your preferred way to connect?"
  },
  
  thanks: "You're welcome! Feel free to ask if you have any other questions.",
  
  about: "StratifyX.web is a leading digital agency specializing in comprehensive web solutions and digital marketing services. We help businesses establish and grow their online presence through expert SEO services, professional web design, strategic digital marketing, and specialized e-commerce solutions. Our team combines technical expertise with creative excellence to deliver results-driven solutions that help our clients achieve their business goals. We work with businesses of all sizes, from startups to established enterprises, providing customized strategies that drive growth and maximize online visibility.",
  
  experience: "With over 10 years of combined experience in digital marketing and web development, StratifyX.web has successfully delivered 500+ projects across various industries. Our team of certified professionals brings deep expertise in SEO, web design, digital marketing, and e-commerce solutions. We've helped businesses increase their online visibility by an average of 300%, improve conversion rates by 150%, and achieve significant ROI on their digital investments.",
  
  portfolio: "Our portfolio showcases successful projects across all our service areas including SEO campaigns that achieved top rankings, custom websites that won design awards, e-commerce stores that increased sales by 200%, and digital marketing campaigns that generated millions in revenue. You can explore detailed case studies on our website or contact us for specific examples relevant to your industry.",
  
  hiring: "Yes! StratifyX.web is always open to new projects and collaborations. Whether you need a complete digital transformation, specific service implementation, or ongoing support, we're here to help. We offer flexible engagement models including project-based work, retainers, and consulting. Contact us with your project details, and we'll provide a customized proposal tailored to your needs and budget.",
  
  payment: "Our pricing is competitive and transparent. We offer various pricing models based on your needs:\n• Project-based pricing with clear deliverables\n• Monthly retainers for ongoing services\n• Hourly consulting for specific needs\n• Custom packages for comprehensive solutions\n\nWe provide detailed quotes after understanding your requirements. Contact us for a free consultation and personalized quote.",
  
  technologies: "We work with cutting-edge technologies across all our services:\n\n🎨 Web Design & Development:\n• HTML5, CSS3, JavaScript (ES6+)\n• React.js, Vue.js, Angular\n• PHP, Laravel, Node.js\n• WordPress, Shopify, WooCommerce\n• MySQL, PostgreSQL, MongoDB\n\n🔍 SEO & Marketing Tools:\n• Google Analytics, Search Console\n• SEMrush, Ahrefs, Moz\n• HubSpot, Mailchimp\n• Facebook Ads, Google Ads\n• Various social media platforms\n\n📊 Analytics & Reporting:\n• Google Data Studio\n• Custom dashboard development\n• Advanced tracking implementation",
  
  availability: "We're currently accepting new projects! Our typical project timeline ranges from 2-12 weeks depending on scope and complexity. We also offer expedited delivery for urgent projects. Contact us to discuss your timeline requirements, and we'll do our best to accommodate your schedule.",
  
  rate: "Our rates vary based on service type, project complexity, and duration. Here are some general ranges:\n• SEO Services: $500-$3000/month\n• Web Design: $2000-$15000+\n• Digital Marketing: $800-$5000/month\n• E-commerce Development: $3000-$25000+\n• Consulting: $100-$300/hour\n\nContact us for a detailed quote based on your specific needs.",
  
  default: "I'm here to help you with any questions about StratifyX.web! I can provide detailed information about our SEO services, web design solutions, digital marketing strategies, e-commerce development, Shopify expertise, social media management, and technical SEO services. I also know about our company, portfolio, pricing, and how to contact us. What would you like to know? 😊"
};

function getChatbotResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim();
  
  // About/Bio questions
  if (msg.match(/about|who are you|tell me about you|bio|background|yourself/i)) {
    return chatbotResponses.about;
  }
  
  // Services questions - Enhanced with specific service matching
  if (msg.match(/services|what do you|what can you|offerings|capabilities|what you offer/i)) {
    return chatbotResponses.services.detailed;
  }
  
  // SEO Services specific questions
  if (msg.match(/seo|search engine optimization|ranking|keywords|backlinks|on.?page|off.?page|technical seo/i)) {
    return "Our SEO services are comprehensive and results-driven:\n\n🔍 On-Page SEO:\n• Keyword research and optimization\n• Content optimization\n• Meta tags and descriptions\n• Internal linking structure\n• Page speed optimization\n\n🔗 Off-Page SEO:\n• Quality backlink building\n• Guest posting\n• Local SEO optimization\n• Citation building\n• Brand mentions\n\n⚙️ Technical SEO:\n• Website audits\n• Schema markup\n• XML sitemaps\n• Core Web Vitals\n• Mobile optimization\n\nWe've helped clients achieve top 3 rankings for competitive keywords. Would you like to discuss your SEO goals?";
  }
  
  // Web Design specific questions
  if (msg.match(/web design|website design|ui|ux|design|layout|responsive|wordpress|custom website/i)) {
    return "Our web design services focus on creating stunning, functional websites:\n\n🎨 Custom Web Design:\n• Modern, responsive designs\n• Mobile-first approach\n• User experience optimization\n• Brand-aligned aesthetics\n• Conversion-focused layouts\n\n💻 Development Technologies:\n• HTML5, CSS3, JavaScript\n• React.js, Vue.js\n• PHP, Laravel\n• WordPress customization\n• E-commerce platforms\n\n📱 Features We Include:\n• Fully responsive design\n• Fast loading speeds\n• SEO-friendly structure\n• Content management systems\n• Analytics integration\n\nEvery website we build is unique to your brand and business goals. What type of website are you looking for?";
  }
  
  // Digital Marketing specific questions
  if (msg.match(/digital marketing|marketing|social media|content marketing|ppc|advertising|campaign/i)) {
    return "Our digital marketing services help businesses grow online:\n\n📱 Social Media Marketing:\n• Strategy development\n• Content creation\n• Community management\n• Paid social campaigns\n• Analytics & reporting\n\n📧 Content Marketing:\n• Blog content\n• Video marketing\n• Infographics\n• Email campaigns\n• Lead generation\n\n🎯 PPC Advertising:\n• Google Ads campaigns\n• Facebook/Instagram ads\n• LinkedIn advertising\n• Remarketing campaigns\n• ROI optimization\n\nWe create data-driven strategies that deliver measurable results. What are your marketing objectives?";
  }
  
  // E-commerce specific questions
  if (msg.match(/ecommerce|e.?commerce|online store|shopping cart|payment gateway|product catalog/i)) {
    return "Our e-commerce solutions are designed to maximize sales:\n\n🛒 E-commerce Development:\n• Custom online stores\n• Shopping cart optimization\n• Payment gateway integration\n• Product management systems\n• Inventory management\n\n🛍️ Platform Expertise:\n• Shopify development\n• WooCommerce customization\n• Magento development\n• Custom e-commerce solutions\n• Mobile commerce optimization\n\n📈 Conversion Optimization:\n• Product page optimization\n• Checkout process improvement\n• Mobile shopping experience\n• Trust signals and security\n• Analytics and reporting\n\nWe help businesses create seamless shopping experiences that drive sales. What's your e-commerce vision?";
  }
  
  // Shopify specific questions
  if (msg.match(/shopify|shopify development|shopify store|shopify theme|shopify app/i)) {
    return "Our Shopify development services are comprehensive:\n\n🛍️ Shopify Store Setup:\n• Complete store configuration\n• Theme customization and development\n• App integration and development\n• Payment and shipping setup\n• Product catalog management\n\n⚡ Advanced Features:\n• Custom theme development\n• API integrations\n• Performance optimization\n• SEO optimization\n• Multi-channel selling\n\n📊 Growth Services:\n• Conversion rate optimization\n• Email marketing integration\n• Analytics setup\n• Social media integration\n• Ongoing support and maintenance\n\nWhether you're starting fresh or optimizing an existing store, we can help. What's your Shopify project?";
  }
  
  // Social Media specific questions
  if (msg.match(/social media|social media marketing|facebook|instagram|twitter|linkedin|social management/i)) {
    return "Our social media services build your brand online:\n\n📱 Platform Management:\n• Facebook & Instagram\n• LinkedIn & Twitter\n• Pinterest & TikTok\n• YouTube optimization\n• Platform-specific strategies\n\n🎨 Content Services:\n• Content creation\n• Graphic design\n• Video production\n• Copywriting\n• Brand voice development\n\n📊 Strategy & Analytics:\n• Social media strategy\n• Community management\n• Paid social advertising\n• Analytics & reporting\n• ROI tracking\n\nWe create engaging content that drives real business results. Which platforms are most important for your business?";
  }
  
  // Technical SEO specific questions
  if (msg.match(/technical seo|site audit|core web vitals|schema|sitemap|site speed|mobile optimization/i)) {
    return "Our technical SEO services ensure your website performs optimally:\n\n🔍 Website Audits:\n• Comprehensive technical analysis\n• Core Web Vitals optimization\n• Site speed improvements\n• Mobile-friendliness checks\n• Security assessments\n\n⚙️ Technical Implementation:\n• Schema markup implementation\n• XML sitemap optimization\n• Robots.txt optimization\n• Canonical tags\n• Redirect management\n\n📊 Monitoring & Reporting:\n• Google Search Console setup\n• Analytics implementation\n• Performance tracking\n• Error monitoring\n• Regular health checks\n\nWe fix technical issues that may be holding back your rankings. Would you like a technical SEO audit?";
  }
  
  // General web development questions
  if (msg.match(/web|react|laravel|php|vue|wordpress|api|development|coding|website|frontend|backend|full.?stack|html|css|javascript|js/i)) {
    return "Our web development services cover all aspects of modern web creation:\n\n🎨 Frontend Development:\n• React.js, Vue.js, Angular\n• HTML5, CSS3, JavaScript ES6+\n• Responsive design\n• Progressive Web Apps\n• UI/UX implementation\n\n⚙️ Backend Development:\n• PHP, Laravel, Node.js\n• RESTful API development\n• Database design\n• Server optimization\n• Cloud integration\n\n🛠️ CMS Development:\n• WordPress customization\n• Custom CMS solutions\n• Content management\n• Plugin development\n• Theme development\n\nWe build scalable, secure, and high-performance websites. What type of web project are you planning?";
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
  
  // Pricing and cost questions - Enhanced
  if (msg.match(/rate|price|cost|payment|how much|fee|budget|pricing|affordable|cheap|expensive/i)) {
    return chatbotResponses.rate;
  }
  
  // Availability questions
  if (msg.match(/available|busy|schedule|when|timeline|deadline/i)) {
    return chatbotResponses.availability;
  }
  
  // Process and methodology questions
  if (msg.match(/process|how do you|methodology|workflow|steps|approach|how it works/i)) {
    return "Our process is designed for transparency and success:\n\n🔍 Discovery & Planning:\n• Understanding your business goals\n• Market research and analysis\n• Technical requirements assessment\n• Project timeline and milestones\n\n🎨 Design & Development:\n• Wireframing and mockups\n• Iterative development process\n• Regular progress updates\n• Quality assurance testing\n\n🚀 Launch & Optimization:\n• Deployment and go-live\n• Performance monitoring\n• Training and documentation\n• Ongoing support and optimization\n\nWe keep you involved at every step. What type of project are you considering?";
  }
  
  // Results and ROI questions
  if (msg.match(/results|roi|success|outcome|achievement|performance|metrics|analytics/i)) {
    return "We focus on delivering measurable results for our clients:\n\n📈 SEO Results:\n• 300% average increase in organic traffic\n• Top 3 rankings for competitive keywords\n• 150% improvement in conversion rates\n• Significant ROI within 6 months\n\n🎨 Web Design Impact:\n• 200% increase in lead generation\n• 50% reduction in bounce rates\n• 40% improvement in user engagement\n• Mobile traffic increase of 180%\n\n📊 Marketing Performance:\n• 250% increase in social media engagement\n• 300% ROI on ad spend\n• 400% growth in email list\n• Significant brand awareness improvement\n\nEvery project is tracked with detailed analytics. What results are you looking to achieve?";
  }
  
  // Support and maintenance questions
  if (msg.match(/support|maintenance|help|after launch|ongoing|updates|hosting/i)) {
    return "We provide comprehensive support and maintenance:\n\n🛠️ Technical Support:\n• 24/7 monitoring and support\n• Regular security updates\n• Performance optimization\n• Bug fixes and troubleshooting\n• Emergency response within 2 hours\n\n📊 Maintenance Services:\n• Content updates and changes\n• Feature enhancements\n• Security patches\n• Backup management\n• Performance monitoring\n\n📞 Client Support:\n• Dedicated account manager\n• Regular progress reports\n• Strategic consultations\n• Training and documentation\n\nWe ensure your digital assets continue to perform optimally. What level of support do you need?";
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
  let isMobile = window.innerWidth <= 768;
  
  // Update mobile status on resize
  window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 768;
  });
  
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
  
  // Position chat window properly on mobile - Enhanced
  function positionChatWindow() {
    if (isMobile) {
      // Mobile positioning - better spacing and visibility
      chatWindow.style.position = 'fixed';
      chatWindow.style.bottom = '7rem'; // More space for WhatsApp button
      chatWindow.style.right = '1rem';
      chatWindow.style.left = '1rem';
      chatWindow.style.width = 'calc(100vw - 2rem)';
      chatWindow.style.height = '70vh';
      chatWindow.style.maxHeight = '600px';
      chatWindow.style.zIndex = '999';
      chatWindow.style.borderRadius = '1rem';
      chatWindow.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    } else {
      // Desktop positioning
      chatWindow.style.position = 'absolute';
      chatWindow.style.bottom = '5rem';
      chatWindow.style.right = '0';
      chatWindow.style.left = 'auto';
      chatWindow.style.width = '24rem';
      chatWindow.style.height = '500px';
      chatWindow.style.maxHeight = 'none';
      chatWindow.style.zIndex = '30';
      chatWindow.style.borderRadius = '1rem';
      chatWindow.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
    }
  }
  
  // Open chat function - Enhanced mobile experience
  function openChat() {
    positionChatWindow();
    chatWindow.classList.remove('hidden');
    chatWindow.classList.add('show');
    showWelcome();
    chatInput.focus();
    
    // Enhanced mobile body scroll prevention
    if (isMobile) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }
  }
  
  // Close chat function - Enhanced mobile experience
  function closeChat() {
    chatWindow.classList.add('hidden');
    chatWindow.classList.remove('show');
    
    // Restore body scroll on mobile
    if (isMobile) {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }
  
  // Toggle chat on click (better for mobile)
  chatToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (chatWindow.classList.contains('hidden')) {
      openChat();
    } else {
      closeChat();
    }
  });
  
  // Open chat on hover for desktop only
  if (!isMobile) {
    chatToggle.addEventListener('mouseenter', (e) => {
      e.stopPropagation();
      openChat();
    });
  }
  
  // Reposition on window resize
  window.addEventListener('resize', () => {
    if (!chatWindow.classList.contains('hidden')) {
      positionChatWindow();
    }
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
      e.preventDefault();
      sendMessage();
    }
  });
  
  // Close chat when clicking outside (with mobile considerations)
  document.addEventListener('click', (e) => {
    const chatContainer = chatWindow.parentElement;
    if (!chatContainer.contains(e.target) && !chatToggle.contains(e.target)) {
      closeChat();
    }
  });
  
  // Handle touch events for mobile - Enhanced
  if (isMobile) {
    // Prevent chat window from moving when scrolling
    chatWindow.addEventListener('touchmove', (e) => {
      if (chatMessages.scrollHeight > chatMessages.clientHeight) {
        // Allow scrolling within messages
        if (e.target !== chatMessages && !chatMessages.contains(e.target)) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    }, { passive: false });
    
    // Handle orientation change with better positioning
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        isMobile = window.innerWidth <= 768; // Re-check mobile status
        positionChatWindow();
      }, 100);
    });
    
    // Handle keyboard open/close on mobile
    window.addEventListener('resize', () => {
      if (!chatWindow.classList.contains('hidden')) {
        positionChatWindow();
      }
    });
    
    // Prevent zoom on input focus (iOS)
    chatInput.addEventListener('touchstart', (e) => {
      e.target.style.fontSize = '16px';
    });
  }
  
  // Initialize position
  positionChatWindow();
});

