document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add fade-in class to elements you want to animate
  const animateElements = document.querySelectorAll('.card, .hero-text, .banner, .stat-item, .hero-image');
  animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // macOS Status Bar Clock Update
  function updateClock() {
    const clockEl = document.getElementById('macos-clock');
    if (!clockEl) return;
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    clockEl.textContent = `${dayName} ${monthName} ${date} ${hours}:${minutes} ${ampm}`;
  }
  updateClock();
  setInterval(updateClock, 60000);

  // Testimonials Carousel
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (testimonials.length > 0) {
    let currentIndex = 1; // Start with the center card (Rahul)

    function updateTestimonials(index) {
      if (index < 0) index = testimonials.length - 1;
      if (index >= testimonials.length) index = 0;
      currentIndex = index;

      testimonials.forEach((card, i) => {
        card.classList.remove('center-card', 'side-card');
        if (i === currentIndex) {
          card.classList.add('center-card');
        } else {
          card.classList.add('side-card');
        }
      });

      dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === currentIndex) {
          dot.classList.add('active');
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        updateTestimonials(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        updateTestimonials(currentIndex + 1);
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        if (i < testimonials.length) {
          updateTestimonials(i);
        }
      });
    });

    // Initialize carousel state
    updateTestimonials(currentIndex);
  }
});
