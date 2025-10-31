// ===== Particles.js Configuration =====
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#6366f1'
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000'
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#6366f1',
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Update active nav link based on scroll position
  let current = '';
  const sections = document.querySelectorAll('.section, .hero');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

// Create overlay element
const overlay = document.createElement('div');
overlay.className = 'mobile-menu-overlay';
document.body.appendChild(overlay);

function toggleMobileMenu() {
  navLinksContainer.classList.toggle('active');
  overlay.classList.toggle('active');
  const icon = mobileMenuBtn.querySelector('i');
  
  if (navLinksContainer.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

function closeMobileMenu() {
  navLinksContainer.classList.remove('active');
  overlay.classList.remove('active');
  const icon = mobileMenuBtn.querySelector('i');
  icon.classList.remove('fa-times');
  icon.classList.add('fa-bars');
  document.body.style.overflow = '';
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking overlay
overlay.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

// Close menu on window resize if open
window.addEventListener('resize', () => {
  if (window.innerWidth > 968 && navLinksContainer.classList.contains('active')) {
    closeMobileMenu();
  }
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== Scroll Animations =====
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

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(item);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// Observe skill tags
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
  tag.style.opacity = '0';
  tag.style.transform = 'scale(0.8)';
  tag.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
  observer.observe(tag);
});

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.querySelector('.form-message');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Clear previous errors
  document.querySelectorAll('.error').forEach(error => {
    error.style.display = 'none';
    error.textContent = '';
  });
  
  // Validate form
  let isValid = true;
  const formData = new FormData(contactForm);
  
  // Name validation
  const name = formData.get('name').trim();
  if (name.length < 2) {
    showError('name', 'Please enter your full name');
    isValid = false;
  }
  
  // Email validation
  const email = formData.get('email').trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  }
  
  // Subject validation
  const subject = formData.get('subject');
  if (!subject) {
    showError('subject', 'Please select a subject');
    isValid = false;
  }
  
  // Message validation
  const message = formData.get('message').trim();
  if (message.length < 10) {
    showError('message', 'Please enter a message (at least 10 characters)');
    isValid = false;
  }
  
  if (isValid) {
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      formMessage.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
      formMessage.className = 'form-message success';
      formMessage.style.display = 'block';
      
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }, 1500);
  }
});

function showError(fieldName, message) {
  const field = contactForm.querySelector(`[name="${fieldName}"]`);
  const errorElement = field.parentElement.querySelector('.error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  field.style.borderColor = '#ef4444';
  
  // Reset border color on input
  field.addEventListener('input', function() {
    this.style.borderColor = '';
    errorElement.style.display = 'none';
  }, { once: true });
}

// ===== Typing Effect for Hero Section =====
const typingText = document.querySelector('.hero-text h2');
if (typingText) {
  const text = typingText.textContent;
  typingText.textContent = '';
  let charIndex = 0;
  
  function typeWriter() {
    if (charIndex < text.length) {
      typingText.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 100);
    }
  }
  
  // Start typing effect after a short delay
  setTimeout(typeWriter, 500);
}

// ===== Skill Tag Click Effect =====
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('click', function() {
    this.style.animation = 'pulse 0.5s';
    setTimeout(() => {
      this.style.animation = '';
    }, 500);
  });
});

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
`;
document.head.appendChild(style);

// ===== CV Download Simulation =====
document.querySelectorAll('a[href="#"]').forEach(link => {
  if (link.textContent.includes('Download CV') || link.textContent.includes('Download Resume')) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // In a real scenario, this would link to an actual PDF file
      alert('CV download functionality would be implemented here. Please add your CV PDF file and update the href attribute.');
    });
  }
});

// ===== Project Demo Links =====
document.querySelectorAll('.project-card a').forEach(link => {
  if (link.href === window.location.href + '#' || link.href.endsWith('#')) {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Project demo/source links would be implemented here. Please update with actual project URLs.');
    });
  }
});

// ===== Performance: Lazy Loading Images =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}
