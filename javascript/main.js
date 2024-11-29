document.addEventListener("DOMContentLoaded", () => {
  // fade elements on scroll
  const initializeFadeInOnScroll = () => {
    const elementsToFadeIn = document.querySelectorAll('.fade-scroll');

    const handlePageScroll = () => {
      elementsToFadeIn.forEach(element => {
        const elementPosition = element.getBoundingClientRect();
        const elementIsVisible = elementPosition.top < window.innerHeight && elementPosition.bottom >= 0;

        if (elementIsVisible) {
          element.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handlePageScroll);
    handlePageScroll();
  };

  // card hover tilt effect
  const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };
  
  const initializeCardTiltEffect = () => {
    const projectCards = document.querySelectorAll('.section-card');
  
    projectCards.forEach(card => {
      const handleMouseMove = throttle(event => {
        const cardBounds = card.getBoundingClientRect();
        const mouseX = event.clientX - cardBounds.left;
        const mouseY = event.clientY - cardBounds.top;
  
        const tiltX = (mouseX - cardBounds.width / 2) / 80;
        const tiltY = (mouseY - cardBounds.height / 2) / 80;
  
        card.style.transform = `perspective(1000px) rotateY(${tiltX}deg) rotateX(${-tiltY}deg)`;
      }, 16);
  
      card.addEventListener('mousemove', handleMouseMove);
  
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
      });
    });
  };
  

  // animated text typing effect
  const initializeTextTypingEffect = () => {
    const animateTextTyping = (textElement, fullText, typingSpeed = 100) => {
      let currentCharIndex = 0;
      textElement.textContent = '';

      const typeNextCharacter = () => {
        if (currentCharIndex < fullText.length) {
          textElement.textContent += fullText.charAt(currentCharIndex);
          currentCharIndex++;
          setTimeout(typeNextCharacter, typingSpeed);
        }
      };

      typeNextCharacter();
    };

    const pageHeading = document.querySelector('h3');
    if (pageHeading) {
      animateTextTyping(pageHeading, pageHeading.textContent);
    }
  };

  // project card hover effects
  const initializeCardHoverEffects = () => {
    const projectCards = document.querySelectorAll('.section-card');

    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.transition = 'transform 0.3s ease';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  };

  // scroll indicator
  const initializeScrollProgress = () => {
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(to right, #007AFF, #409cff);
      z-index: 1000;
      transition: width 0.2s ease;
      box-shadow: 0 1px 3px rgba(0, 122, 255, 0.2);
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
      const scrollDistance = document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollDistance / totalHeight) * 100;
      scrollProgress.style.width = `${scrollPercentage}%`;
    });

    return scrollProgress;
  };

  // image hover zoom 
  const initializeImageHoverZoom = () => {
    const projectImages = document.querySelectorAll('.card-img-top');

    projectImages.forEach(img => {
      img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
        img.style.transition = 'transform 0.3s ease';
      });

      img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
      });
    });
  };

  // card entrance animation
  const initializeCardEntranceAnimations = () => {
    const projectCards = document.querySelectorAll('.section-card');
    const animatedCards = new Set();

    const handleScroll = () => {
      projectCards.forEach((card, index) => {
        const cardPosition = card.getBoundingClientRect();
        const isVisible = cardPosition.top < window.innerHeight;

        if (isVisible && !animatedCards.has(card)) {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translate(0, 0)';
            animatedCards.add(card);
          }, index * 30);
        }
      });
    };

    projectCards.forEach((card, index) => {
      const startX = index % 2 === 0 ? -30 : 30;
      card.style.opacity = '0';
      card.style.transform = `translate(${startX}px, 40px)`;
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    window.addEventListener('scroll', handleScroll);
    handleScroll();
  };

  // theme switcher
  const initializeThemeSwitcher = () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const systemThemePreference = window.matchMedia('(prefers-color-scheme: dark)');
    const themeAwareImages = document.querySelectorAll('.theme-aware-image');

    const setTheme = theme => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggleButton.checked = theme === 'light';
        
        themeAwareImages.forEach(img => {
            const newSrc = theme === 'light' ? img.dataset.lightSrc : img.dataset.darkSrc;
            img.src = newSrc;
        });
    };

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        const defaultTheme = systemThemePreference.matches ? 'dark' : 'light';
        setTheme(defaultTheme);
    }

    themeToggleButton.addEventListener('change', () => {
        const newTheme = themeToggleButton.checked ? 'light' : 'dark';
        setTheme(newTheme);
    });

    systemThemePreference.addEventListener('change', event => {
        const newTheme = event.matches ? 'dark' : 'light';
        setTheme(newTheme);
    });
};

  // mobile menu
  const initializeMobileMenu = () => {
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-toggle';
    menuButton.innerHTML = '☰';
    
    const nav = document.querySelector('.site-nav');
    nav.prepend(menuButton);
  
    menuButton.addEventListener('click', () => {
      nav.classList.toggle('mobile-open');
    });
  };


  // mobile touch stuff
  const initializeTouchSupport = () => {
    const cards = document.querySelectorAll('.section-card');
    
    cards.forEach(card => {
      card.addEventListener('touchstart', () => {
        card.style.transform = 'translateY(-5px)';
      });
      
      card.addEventListener('touchend', () => {
        card.style.transform = 'translateY(0)';
      });
    });
  };

  // make the cv thing not go anywhere on mobile
  const initializeMobileCVButton = () => {
    const cvLink = document.querySelector('.cv-link');
    
    cvLink.addEventListener('click', (event) => {
      event.preventDefault();
      cvLink.classList.toggle('show-hover');
    });
  };
  

  initializeFadeInOnScroll();
  initializeCardTiltEffect();
  initializeTextTypingEffect();
  initializeCardHoverEffects();
  initializeScrollProgress();
  initializeImageHoverZoom();
  initializeCardEntranceAnimations();
  initializeThemeSwitcher();
  initializeMobileMenu();
  initializeTouchSupport();
  initializeMobileCVButton();
});