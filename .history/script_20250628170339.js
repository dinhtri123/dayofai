// Header Search
const media = window.matchMedia("(min-width: 768px)");
if (media.matches) {
  const searchInput = document.querySelector(".header-search input");

  searchInput.addEventListener("click", () => {
    searchInput.style.width = "100%";
  });
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target)) {
      searchInput.style.width = "100px";
    }
  });
}
if (!media.matches) {
  const dropdownMenu = document.querySelector(".nav-item.dropdown");
  dropdownMenu.map(item => {
    item.addEventListener("click", () => {
      item.querySelector(".dropdown-menu").classList.toggle("active");
    })
  })
}

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const headerMain = document.querySelector(".header-main");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  headerMain.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header background change on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "#fff";
    header.style.backdropFilter = "none";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".service-card, .feature-card, .content-item"
  );

  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Button click effects
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add ripple effect styles
const style = document.createElement("style");
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form validation (if forms are added later)
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.classList.add("error");
      isValid = false;
    } else {
      input.classList.remove("error");
    }
  });

  return isValid;
}

// Lazy loading for images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Search functionality (if search is added)
function performSearch(query) {
  // Implementation for search functionality
  console.log("Searching for:", query);
}

// Newsletter subscription (if added)
function subscribeNewsletter(email) {
  // Implementation for newsletter subscription
  console.log("Subscribing email:", email);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Successfully subscribed!" });
    }, 1000);
  });
}

// Contact form submission (if added)
async function submitContactForm(formData) {
  // Implementation for contact form submission
  console.log("Submitting contact form:", formData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Message sent successfully!" });
    }, 2000);
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Performance optimization: Debounced scroll handler
const debouncedScrollHandler = debounce(() => {
  // Any scroll-based functionality can be added here
}, 16);

window.addEventListener("scroll", debouncedScrollHandler);

// Accessibility improvements
document.addEventListener("keydown", (e) => {
  // Close mobile menu on Escape key
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  }
});

// Focus management for mobile menu
hamburger.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    hamburger.click();
  }
});

// Add loading states to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function () {
    if (
      this.classList.contains("btn-primary") ||
      this.classList.contains("btn-secondary")
    ) {
      const originalText = this.textContent;
      this.textContent = "Loading...";
      this.disabled = true;

      setTimeout(() => {
        this.textContent = originalText;
        this.disabled = false;
      }, 2000);
    }
  });
});

// Console welcome message
console.log(
  "%cWelcome to Day of AI! 🚀",
  "color: #2563eb; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cEmpowering schools and students to thrive in a world of AI",
  "color: #64748b; font-size: 14px;"
);
