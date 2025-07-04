import './styles/main.css';
import './styles/components.css';
import './styles/responsive.css';

// Chart.js for skills visualization
import Chart from 'chart.js/auto';

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initCustomCursor();
  initNavigation();
  initProjectFilters();
  initSkillsChart();
  initContactForm();
  initScrollAnimations();
  initSkillBars();
  initServiceWorker();
  initEasterEggs();
  initGeometricAnimations();
});

// Custom Cursor with Magical Trail - Enhanced for GitHub Pages
function initCustomCursor() {
  // Check if device supports mouse (not touch-only)
  const hasMouseSupport = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  
  if (!hasMouseSupport) {
    return; // Skip cursor initialization on touch devices
  }

  try {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    const trails = [];
    const trailLength = 8;
  
  // Create trail elements
  for (let i = 0; i < trailLength; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.opacity = (trailLength - i) / trailLength * 0.5;
    document.body.appendChild(trail);
    trails.push({ element: trail, x: 0, y: 0 });
  }
  
  let mouseX = 0, mouseY = 0;
  let isMouseMoving = false;
  
  // Add class to body to indicate custom cursor is active
  document.body.classList.add('custom-cursor-active');
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;
    
    cursor.style.left = mouseX - 10 + 'px';
    cursor.style.top = mouseY - 10 + 'px';
    cursor.classList.add('active');
    
    // Show trails
    trails.forEach(trail => trail.element.classList.add('active'));
  });
  
  // Hide cursor when mouse leaves window
  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('active');
    trails.forEach(trail => trail.element.classList.remove('active'));
    isMouseMoving = false;
  });
  
  document.addEventListener('mouseenter', () => {
    if (isMouseMoving) {
      cursor.classList.add('active');
      trails.forEach(trail => trail.element.classList.add('active'));
    }
  });
  
  // Animate trail
  function animateTrail() {
    if (!isMouseMoving) {
      requestAnimationFrame(animateTrail);
      return;
    }
    
    let currentX = mouseX;
    let currentY = mouseY;
    
    trails.forEach((trail, index) => {
      trail.x += (currentX - trail.x) * 0.3;
      trail.y += (currentY - trail.y) * 0.3;
      
      trail.element.style.left = trail.x - 3 + 'px';
      trail.element.style.top = trail.y - 3 + 'px';
      
      currentX = trail.x;
      currentY = trail.y;
    });
    
    requestAnimationFrame(animateTrail);
  }
  
  animateTrail();
  
  // Cursor interactions
  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    cursor.style.background = 'var(--color-neon-purple)';
  });
  
  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursor.style.background = 'var(--color-neon-cyan)';
  });
  
  // Hide cursor on touch devices
  document.addEventListener('touchstart', () => {
    document.body.classList.remove('custom-cursor-active');
    cursor.style.display = 'none';
    trails.forEach(trail => trail.element.style.display = 'none');
  });
  
} catch (error) {
  console.log('Custom cursor initialization failed:', error);
  // Fallback: ensure default cursor is visible
  document.body.classList.remove('custom-cursor-active');
}
}

// Navigation functionality
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Navbar background on scroll with glow effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(11, 15, 11, 0.98)';
      navbar.style.boxShadow = 'var(--glow-emerald)';
    } else {
      navbar.style.background = 'rgba(11, 15, 11, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });
}

// Project filtering functionality
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter projects with staggered animation
      projectCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.display = 'block';
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
          }, 10);
        } else {
          card.classList.add('hidden');
          setTimeout(() => {
            if (card.classList.contains('hidden')) {
              card.style.display = 'none';
            }
          }, 300);
        }
      });
    });
  });
}

// Enhanced Skills radar chart with futuristic styling
function initSkillsChart() {
  const ctx = document.getElementById('skillsChart');
  if (!ctx) return;
  
  const skills = {
    'Frontend': 80,
    'Backend': 75,
    'Database': 70,
    'DevOps': 60,
    'Testing': 65,
    'Design': 55
  };
  
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: Object.keys(skills),
      datasets: [{
        label: 'Skill Level',
        data: Object.values(skills),
        borderColor: '#00FFFF',
        backgroundColor: 'rgba(0, 255, 255, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#1A472A',
        pointBorderColor: '#00FFFF',
        pointRadius: 8,
        pointHoverRadius: 12,
        pointBorderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(0, 255, 255, 0.2)',
            lineWidth: 2
          },
          angleLines: {
            color: 'rgba(26, 71, 42, 0.5)',
            lineWidth: 2
          },
          pointLabels: {
            color: '#00FFFF',
            font: {
              size: 14,
              weight: 'bold',
              family: 'Orbitron'
            }
          },
          ticks: {
            display: false
          }
        }
      },
      animation: {
        duration: 2500,
        easing: 'easeInOutQuart'
      }
    }
  });
}

// Contact form functionality with enhanced validation
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validate all fields
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      if (!validateField({ target: input })) {
        isValid = false;
      }
    });
    
    if (!isValid) {
      showNotification('Please fix the errors before submitting.', 'error');
      return;
    }
    
    // Add loading state with futuristic effect
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'TRANSMITTING...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    try {
      // Simulate form submission (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      showNotification('Message transmitted successfully! 🚀', 'success');
      form.reset();
      
      // Clear all skill bars for reset animation
      const skillBars = document.querySelectorAll('.skill-progress');
      skillBars.forEach(bar => bar.style.width = '0%');
      
    } catch (error) {
      showNotification('Transmission failed. Please try again. ⚠️', 'error');
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      submitButton.classList.remove('loading');
    }
  });
  
  // Enhanced form validation
  const inputs = form.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
    
    // Add focus glow effect
    input.addEventListener('focus', (e) => {
      e.target.style.boxShadow = 'var(--glow-cyan)';
    });
    
    input.addEventListener('blur', (e) => {
      if (!e.target.matches(':focus')) {
        e.target.style.boxShadow = '';
      }
    });
  });
}

// Enhanced field validation
function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  
  // Remove existing error
  clearFieldError(e);
  
  // Check if required field is empty
  if (field.required && !value) {
    showFieldError(field, 'This field is required');
    return false;
  }
  
  // Email validation
  if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showFieldError(field, 'Please enter a valid email address');
      return false;
    }
  }
  
  // Name validation
  if (field.name === 'name' && value && value.length < 2) {
    showFieldError(field, 'Name must be at least 2 characters');
    return false;
  }
  
  // Message validation
  if (field.name === 'message' && value && value.length < 10) {
    showFieldError(field, 'Message must be at least 10 characters');
    return false;
  }
  
  return true;
}

// Show field error with futuristic styling
function showFieldError(field, message) {
  field.classList.add('error');
  
  // Remove existing error message
  const existingError = field.parentNode.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Add error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(e) {
  const field = e.target;
  field.classList.remove('error');
  
  const errorMessage = field.parentNode.querySelector('.error-message');
  if (errorMessage) {
    errorMessage.remove();
  }
}

// Enhanced notification system
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span class="notification-message">${message}</span>
      <button class="notification-close" aria-label="Close notification">&times;</button>
    </div>
  `;
  
  // Enhanced styles with glow effects
  const bgColor = type === 'success' ? '#00FF88' : type === 'error' ? '#FF4444' : '#00FFFF';
  const glowColor = type === 'success' ? 'var(--glow-cyan)' : type === 'error' ? '0 0 20px rgba(255, 68, 68, 0.5)' : 'var(--glow-cyan)';
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(45deg, ${bgColor}, var(--color-primary));
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg), ${glowColor};
    z-index: 10000;
    max-width: 400px;
    animation: slideInGlow 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid ${bgColor};
    font-family: var(--font-primary);
    text-transform: uppercase;
    letter-spacing: 1px;
  `;
  
  // Add CSS for animation
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideInGlow {
        from { 
          transform: translateX(100%) scale(0.8); 
          opacity: 0; 
        }
        to { 
          transform: translateX(0) scale(1); 
          opacity: 1; 
        }
      }
      .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
      .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: var(--transition);
      }
      .notification-close:hover {
        transform: scale(1.2);
        text-shadow: var(--glow-cyan);
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Close button functionality
  const closeButton = notification.querySelector('.notification-close');
  closeButton.addEventListener('click', () => {
    notification.style.animation = 'slideInGlow 0.3s reverse';
    setTimeout(() => notification.remove(), 300);
  });
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideInGlow 0.3s reverse';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Enhanced scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        
        // Add staggered animation for project cards
        if (entry.target.classList.contains('project-card')) {
          const cards = document.querySelectorAll('.project-card');
          const index = Array.from(cards).indexOf(entry.target);
          entry.target.style.animationDelay = `${index * 0.1}s`;
        }
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll('.project-card, .skill-category, .about-content, .tech-stack, .contact-info, .contact-form');
  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
}

// Enhanced skill bar animations
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressBar = entry.target;
        const level = progressBar.getAttribute('data-level');
        
        // Animate the width with delay
        setTimeout(() => {
          progressBar.style.width = level + '%';
        }, 200);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
}

// Service Worker registration
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

// Easter Eggs and Slytherin References
function initEasterEggs() {
  // Snape tribute
  const snapeTribute = document.createElement('div');
  snapeTribute.className = 'snape-tribute';
  snapeTribute.title = 'In memory of Alan Rickman';
  document.body.appendChild(snapeTribute);
  
  snapeTribute.addEventListener('click', () => {
    showNotification('Always. 🐍 - In memory of Alan Rickman (Severus Snape)', 'success');
  });
  
  // Konami code easter egg
  let konamiCode = [];
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];
  
  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
      konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
      activateSlytherinMode();
      konamiCode = [];
    }
  });
  
  // Secret Slytherin mode
  function activateSlytherinMode() {
    document.body.style.filter = 'hue-rotate(120deg)';
    showNotification('🐍 Slytherin Mode Activated! Welcome to the Chamber of Secrets! 🐍', 'success');
    
    // Add snake animation
    const snake = document.createElement('div');
    snake.innerHTML = '🐍';
    snake.style.cssText = `
      position: fixed;
      top: 50%;
      left: -50px;
      font-size: 3rem;
      z-index: 10000;
      animation: snakeSlither 3s ease-in-out;
    `;
    
    const snakeStyle = document.createElement('style');
    snakeStyle.textContent = `
      @keyframes snakeSlither {
        0% { left: -50px; transform: translateY(0); }
        25% { left: 25%; transform: translateY(-20px); }
        50% { left: 50%; transform: translateY(20px); }
        75% { left: 75%; transform: translateY(-10px); }
        100% { left: calc(100% + 50px); transform: translateY(0); }
      }
    `;
    document.head.appendChild(snakeStyle);
    document.body.appendChild(snake);
    
    setTimeout(() => {
      snake.remove();
      snakeStyle.remove();
      document.body.style.filter = '';
    }, 3000);
  }
  
  // Double-click logo for special effect
  const logo = document.querySelector('.nav-logo');
  let clickCount = 0;
  
  logo.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 2) {
      logo.style.animation = 'pulse 0.5s ease-in-out';
      showNotification('⚡ Magic detected! ⚡', 'success');
      clickCount = 0;
    }
    setTimeout(() => clickCount = 0, 500);
  });
}

// Geometric background animations
function initGeometricAnimations() {
  // Add floating geometric shapes
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section, index) => {
    if (index % 2 === 0) {
      const geometricBg = document.createElement('div');
      geometricBg.className = 'geometric-bg';
      section.appendChild(geometricBg);
    }
  });
  
  // Parallax effect for geometric elements
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;  
    const geometricElements = document.querySelectorAll('.geometric-bg');
    
    geometricElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.1);
      const translateY = Math.min(scrolled * speed, maxScroll * speed);           
      element.style.transform = `translateY(${translateY}px)`;                    
    });
  });
}

// Smooth scrolling for scroll indicator
document.addEventListener('DOMContentLoaded', () => {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      document.querySelector('#about').scrollIntoView({
        behavior: 'smooth'
      });
    });
  }
});

// Enhanced keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    // Close mobile menu if open
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.querySelector('.nav-toggle');
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
    
    // Close notifications
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
      notification.style.animation = 'slideInGlow 0.3s reverse';
      setTimeout(() => notification.remove(), 300);
    });
  }
  
  // Navigation shortcuts
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
      case '1':
        e.preventDefault();
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
        break;
      case '2':
        e.preventDefault();
        document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
        break;
      case '3':
        e.preventDefault();
        document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
        break;
      case '4':
        e.preventDefault();
        document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' });
        break;
      case '5':
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        break;
    }
  }
});

// Performance optimization - lazy loading
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// Initialize lazy loading
initLazyLoading();

// Enhanced analytics tracking
function trackEvent(eventName, properties = {}) {
  // Example: Google Analytics or other tracking service
  console.log('Event tracked:', eventName, properties);
  
  // Add visual feedback for important events
  if (eventName === 'project_link_click') {
    const projectTitle = properties.project;
    showNotification(`🚀 Opening ${projectTitle}...`, 'info');
  }
}

// Track navigation clicks with enhanced feedback
document.addEventListener('click', (e) => {
  if (e.target.matches('.nav-menu a')) {
    trackEvent('navigation_click', {
      section: e.target.getAttribute('href')
    });
    
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(0, 255, 255, 0.3);
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    
    const rect = e.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
    
    e.target.style.position = 'relative';
    e.target.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }
  
  if (e.target.matches('.project-link')) {
    trackEvent('project_link_click', {
      project: e.target.closest('.project-card').querySelector('.project-title').textContent
    });
  }
  
  if (e.target.matches('.btn')) {
    trackEvent('button_click', {
      button: e.target.textContent
    });
  }
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);