// Enhanced Portfolio JavaScript
document.addEventListener('DOMContentLoaded', () => {
  
  // ──────────────────────────────────────────────────────────────
  // Theme Toggle Functionality
  // ──────────────────────────────────────────────────────────────
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  
  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  });

  // ──────────────────────────────────────────────────────────────
  // Mobile Menu Toggle
  // ──────────────────────────────────────────────────────────────
  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.querySelector('.navbar');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');

  menuToggle?.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    menuToggle.setAttribute('aria-expanded', isOpen.toString());
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu when clicking on a link
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';
    });
  });

  // ──────────────────────────────────────────────────────────────
  // Smooth Scrolling for Navigation Links
  // ──────────────────────────────────────────────────────────────
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerOffset = 80; // Account for fixed header
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        document.body.classList.remove('menu-open');
        menuToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // ──────────────────────────────────────────────────────────────
  // Navbar Background on Scroll
  // ──────────────────────────────────────────────────────────────
  let ticking = false;
  
  function updateNavbar() {
    const scrolled = window.scrollY > 50;
    navbar.style.backgroundColor = scrolled 
      ? 'rgba(255, 255, 255, 0.95)' 
      : 'rgba(255, 255, 255, 0.9)';
    
    if (document.documentElement.classList.contains('dark')) {
      navbar.style.backgroundColor = scrolled 
        ? 'rgba(15, 23, 42, 0.95)' 
        : 'rgba(15, 23, 42, 0.9)';
    }
    
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  });

  // ──────────────────────────────────────────────────────────────
  // Typewriter Effect for Hero Name
  // ──────────────────────────────────────────────────────────────
  const heroName = document.getElementById('typed-name');
  if (heroName) {
    const name = 'Amr Zakariya';
    let i = 0;
    heroName.textContent = ''; // Start with empty text

    function typeWriter() {
      if (i < name.length) {
        heroName.textContent += name.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 1000);
  }

  // ──────────────────────────────────────────────────────────────
  // Skills Loading and Animation
  // ──────────────────────────────────────────────────────────────
  async function loadSkills() {
    try {
      const response = await fetch('/api/skills');
      const skillsCategories = await response.json();
      const container = document.getElementById('skills-container');
      
      if (!container) return;

      skillsCategories.forEach((category, categoryIndex) => {
        // Create category section
        const categorySection = document.createElement('div');
        categorySection.className = 'skills-category';
        categorySection.setAttribute('data-aos', 'fade-up');
        categorySection.setAttribute('data-aos-delay', (categoryIndex * 200).toString());
        
        // Create category header
        const categoryHeader = document.createElement('h3');
        categoryHeader.className = 'skills-category-title';
        categoryHeader.textContent = category.category;
        categorySection.appendChild(categoryHeader);
        
        // Create skills grid for this category
        const skillsGrid = document.createElement('div');
        skillsGrid.className = 'skills-category-grid';
        
        category.skills.forEach((skill, skillIndex) => {
          const skillCard = document.createElement('div');
          skillCard.className = 'skill-card';
          skillCard.setAttribute('data-aos', 'fade-up');
          skillCard.setAttribute('data-aos-delay', ((categoryIndex * 200) + (skillIndex * 100)).toString());
          
          skillCard.innerHTML = `
            <div class="skill-icon">
              <img src="/static/${skill.icon}" alt="${skill.name}" onerror="this.style.display='none'">
            </div>
            <h4 class="skill-name">${skill.name}</h4>
          `;
          
          skillsGrid.appendChild(skillCard);
        });
        
        categorySection.appendChild(skillsGrid);
        container.appendChild(categorySection);
      });
      
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  }

  // Load skills when page loads
  loadSkills();

  // ──────────────────────────────────────────────────────────────
  // Contact Form Handling with EmailJS
  // ──────────────────────────────────────────────────────────────
  
  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init("LypSjSwEPw2waK0Hp"); // EmailJS public key
  }
  
  const contactForm = document.getElementById('contact-form');
  
  contactForm?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const statusDiv = document.getElementById('form-status');
    const originalText = submitBtn.querySelector('.btn-text').textContent;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    statusDiv.innerHTML = '';
    
    try {
      // Check if EmailJS is available
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not loaded');
      }
      
      // Get form data
      const formData = new FormData(this);
      const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        message: formData.get('message'),
        to_email: 'amrzakariya2018@gmail.com', // Your email
        reply_to: formData.get('email')
      };
      
             // Send email via EmailJS
       const response = await emailjs.send(
         'service_3dsm0dd',    // EmailJS service ID
         'template_numdic8',   // EmailJS template ID
         templateParams
       );
      
      if (response.status === 200) {
        statusDiv.innerHTML = `
          <div class="success-message">
            ✓ Message sent successfully! I'll get back to you soon.
          </div>
        `;
        this.reset();
        
        // Show success animation
        submitBtn.style.backgroundColor = 'var(--clr-success)';
        setTimeout(() => {
          submitBtn.style.backgroundColor = '';
        }, 2000);
        
      } else {
        throw new Error('EmailJS response error');
      }
      
    } catch (error) {
      console.error('Contact form error:', error);
      
      // Fallback to Flask backend
      try {
        const formData = new FormData(this);
        const response = await fetch('/contact', {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
          statusDiv.innerHTML = `
            <div class="success-message">
              ✓ ${result.message}
            </div>
          `;
          this.reset();
        } else {
          statusDiv.innerHTML = `
            <div class="error-message">
              ✗ ${result.message}
            </div>
          `;
        }
      } catch (fallbackError) {
        statusDiv.innerHTML = `
          <div class="error-message">
            ✗ Something went wrong. Please try again later or email me directly at amrzakariya2018@gmail.com
          </div>
        `;
      }
    } finally {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    }
  });

  // ──────────────────────────────────────────────────────────────
  // Scroll to Top Functionality
  // ──────────────────────────────────────────────────────────────
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: none;
    background-color: var(--clr-primary);
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    z-index: 1000;
    box-shadow: var(--shadow-lg);
  `;

  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.visibility = 'hidden';
    }
  });

  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ──────────────────────────────────────────────────────────────
  // Loading Animation on Page Load
  // ──────────────────────────────────────────────────────────────
  window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
      loadingOverlay.classList.remove('active');
      setTimeout(() => {
        loadingOverlay.style.display = 'none';
      }, 300);
    }
  });

  // ──────────────────────────────────────────────────────────────
  // Project Card Hover Effects
  // ──────────────────────────────────────────────────────────────
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // ──────────────────────────────────────────────────────────────
  // Active Section Highlighting in Navigation
  // ──────────────────────────────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.navbar__link[href^="#"]');

  function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightActiveSection);

  // ──────────────────────────────────────────────────────────────
  // Initialize AOS (Animate On Scroll) if available
  // ──────────────────────────────────────────────────────────────
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    });
  }

  // ──────────────────────────────────────────────────────────────
  // Performance Optimization: Lazy Load Images
  // ──────────────────────────────────────────────────────────────
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => {
      img.src = img.dataset.src;
    });
  }

  console.log('🚀 Portfolio initialized successfully!');
});
