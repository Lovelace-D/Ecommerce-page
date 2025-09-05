// Global variables
let currentIndex = 0;
let cartQuantity = 0;
const unitPrice = 125.00;

// Image sources
const images = [
  'images/image-product-1.jpg',
  'images/image-product-2.jpg',
  'images/image-product-3.jpg',
  'images/image-product-4.jpg'
];

const thumbnails = [
  'images/image-product-1-thumbnail.jpg',
  'images/image-product-2-thumbnail.jpg',
  'images/image-product-3-thumbnail.jpg',
  'images/image-product-4-thumbnail.jpg'
];

// Counter functionality
function updateCounter() {
  const numberSpan = document.querySelector('.number');
  const plusBtn = document.getElementById('plus');
  const minusBtn = document.getElementById('minus');

  plusBtn.addEventListener('click', function() {
    let currentCount = parseInt(numberSpan.textContent);
    currentCount++;
    numberSpan.textContent = currentCount;
  });

  minusBtn.addEventListener('click', function() {
    let currentCount = parseInt(numberSpan.textContent);
    if (currentCount > 0) {
      currentCount--;
      numberSpan.textContent = currentCount;
    }
  });
}

// Update badge count
function updateBadge() {
  const badge = document.querySelector('.badge');
  if (cartQuantity > 0) {
    badge.textContent = cartQuantity;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

// Add to cart functionality
function addToCart() {
  const addToCartBtn = document.querySelector('.addToCart');
  const numberSpan = document.querySelector('.number');

  addToCartBtn.addEventListener('click', function() {
    const selectedQuantity = parseInt(numberSpan.textContent);
    if (selectedQuantity > 0) {
      cartQuantity = selectedQuantity;
      updateBadge();
      updateCartDisplay();
      numberSpan.textContent = '0';
    }
  });
}

// Update cart display
function updateCartDisplay() {
  const emptyCart = document.getElementById('emptyCart');
  const cartInfo = document.getElementById('selected-shoe-info');
  const checkoutBtn = document.getElementById('checkoutBtn');
  const quantitySpan = document.getElementById('quantity');
  const finalPrice = document.getElementById('finalPrice');

  if (cartQuantity > 0) {
    emptyCart.style.display = 'none';
    cartInfo.style.display = 'flex';
    checkoutBtn.style.display = 'block';
    quantitySpan.textContent = cartQuantity;
    finalPrice.textContent = `$${(cartQuantity * unitPrice).toFixed(2)}`;
  } else {
    emptyCart.style.display = 'block';
    cartInfo.style.display = 'none';
    checkoutBtn.style.display = 'none';
  }
}

// Cart toggle functionality
function toggleCart() {
  const cartIcon = document.getElementById('shopping-cart');
  const cartContent = document.querySelector('.cart-content');

  cartIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    cartContent.style.display = cartContent.style.display === 'block' ? 'none' : 'block';
  });

  // Close cart when clicking outside
  document.addEventListener('click', function(e) {
    if (!cartContent.contains(e.target) && e.target !== cartIcon) {
      cartContent.style.display = 'none';
    }
  });
}

// Clear cart functionality
function clearCart() {
  const trashIcon = document.getElementById('trash');
  
  trashIcon.addEventListener('click', function() {
    cartQuantity = 0;
    updateBadge();
    updateCartDisplay();
  });
}

// Image carousel functionality
function changeMainImage(index) {
  const mainImage = document.querySelector('.mainpic');
  mainImage.src = images[index];
  currentIndex = index;
  
  // Update thumbnail selection
  const thumbnailContainers = document.querySelectorAll('.carousel-cards .thumbnail-container');
  thumbnailContainers.forEach((thumb, i) => {
    if (i === index) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

// Lightbox functionality
function openLightbox() {
  // Only open lightbox on desktop
  if (window.innerWidth > 768) {
    const lightbox = document.querySelector('.lightboxContainer');
    lightbox.style.display = 'flex';
    updateLightboxImage(currentIndex);
  }
}

function closeLightbox() {
  const lightbox = document.querySelector('.lightboxContainer');
  const closeBtn = document.querySelector('.close-lightbox');
  
  closeBtn.addEventListener('click', function() {
    lightbox.style.display = 'none';
  });

  // Close on background click
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      lightbox.style.display = 'none';
    }
  });
}

function updateLightboxImage(index) {
  const lightboxImage = document.querySelector('.lightbox-image img');
  lightboxImage.src = images[index];
  currentIndex = index;
  
  // Update lightbox thumbnail selection
  const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnails .thumbnail-container');
  lightboxThumbnails.forEach((thumb, i) => {
    if (i === index) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
}

function changeLightboxImage(index) {
  updateLightboxImage(index);
}

// Lightbox navigation
function setupLightboxNavigation() {
  const prevBtn = document.querySelector('.prev-arrow');
  const nextBtn = document.querySelector('.next-arrow');

  prevBtn.addEventListener('click', function() {
    currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    updateLightboxImage(currentIndex);
  });

  nextBtn.addEventListener('click', function() {
    currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    updateLightboxImage(currentIndex);
  });

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    const lightbox = document.querySelector('.lightboxContainer');
    if (lightbox.style.display === 'flex') {
      if (e.key === 'ArrowLeft') {
        currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        updateLightboxImage(currentIndex);
      } else if (e.key === 'ArrowRight') {
        currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        updateLightboxImage(currentIndex);
      }
    }
  });
}

// Mobile menu functionality
function setupMobileMenu() {
  const menuBar = document.querySelector('.menu-bar');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuClose = document.querySelector('.menu-close');

  if (menuBar && mobileMenu && menuClose) {
    menuBar.addEventListener('click', function() {
      mobileMenu.style.display = 'block';
      mobileMenu.classList.add('show');
    });

    menuClose.addEventListener('click', function() {
      mobileMenu.classList.remove('show');
      setTimeout(() => {
        mobileMenu.style.display = 'none';
      }, 300);
    });

    // Close menu when clicking on overlay
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('show');
        setTimeout(() => {
          mobileMenu.style.display = 'none';
        }, 300);
      }
    });
  }
}

// Main image click handler
function setupMainImageClick() {
  const mainImage = document.querySelector('.mainpic');
  mainImage.addEventListener('click', openLightbox);
}

// Responsive handling
function handleResize() {
  window.addEventListener('resize', function() {
    const lightbox = document.querySelector('.lightboxContainer');
    if (window.innerWidth <= 768 && lightbox.style.display === 'flex') {
      lightbox.style.display = 'none';
    }
  });
}

// Smooth scrolling for mobile
function setupSmoothScrolling() {
  // Add smooth scrolling behavior
  document.documentElement.style.scrollBehavior = 'smooth';
}

// Checkout functionality
function setupCheckout() {
  const checkoutBtn = document.getElementById('checkoutBtn');
  
  checkoutBtn.addEventListener('click', function() {
    if (cartQuantity > 0) {
      alert(`Thank you for your purchase!\nItems: ${cartQuantity}\nTotal: $${(cartQuantity * unitPrice).toFixed(2)}`);
      
      // Clear cart after purchase
      cartQuantity = 0;
      updateBadge();
      updateCartDisplay();
      
      // Close cart
      const cartContent = document.querySelector('.cart-content');
      cartContent.style.display = 'none';
    }
  });
}

// Image preloader for better performance
function preloadImages() {
  const allImages = [...images, ...thumbnails];
  
  allImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Error handling for missing elements
function safeAddEventListener(selector, event, handler) {
  const element = document.querySelector(selector);
  if (element) {
    element.addEventListener(event, handler);
  } else {
    console.warn(`Element not found: ${selector}`);
  }
}

// Initialize thumbnail selection on page load
function initializeThumbnails() {
  changeMainImage(0); // Set first image as active
}

// Add loading animation for cart operations
function showCartLoading() {
  const cartContent = document.querySelector('.cart-content');
  if (cartContent) {
    cartContent.style.opacity = '0.6';
  }
}

function hideCartLoading() {
  const cartContent = document.querySelector('.cart-content');
  if (cartContent) {
    cartContent.style.opacity = '1';
  }
}

// Enhanced add to cart with animation
function enhancedAddToCart() {
  const addToCartBtn = document.querySelector('.addToCart');
  const numberSpan = document.querySelector('.number');
  const badge = document.querySelector('.badge');

  addToCartBtn.addEventListener('click', function() {
    const selectedQuantity = parseInt(numberSpan.textContent);
    if (selectedQuantity > 0) {
      // Add loading state
      addToCartBtn.disabled = true;
      addToCartBtn.textContent = 'Adding...';
      
      // Simulate API call delay
      setTimeout(() => {
        cartQuantity = selectedQuantity;
        updateBadge();
        updateCartDisplay();
        numberSpan.textContent = '0';
        
        // Animate badge
        if (badge) {
          badge.style.transform = 'scale(1.3)';
          setTimeout(() => {
            badge.style.transform = 'scale(1)';
          }, 200);
        }
        
        // Reset button
        addToCartBtn.disabled = false;
        addToCartBtn.innerHTML = `
          <svg width="22" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="white" fill-rule="nonzero"/>
          </svg>
          Add to cart
        `;
      }, 500);
    } else {
      // Shake animation for invalid quantity
      addToCartBtn.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => {
        addToCartBtn.style.animation = '';
      }, 500);
    }
  });
}

// Add shake animation CSS dynamically
function addShakeAnimation() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(style);
}

// Keyboard shortcuts
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', function(e) {
    // Only activate shortcuts when not typing in input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }
    
    switch(e.key) {
      case 'c':
      case 'C':
        // Toggle cart with 'c' key
        const cartIcon = document.getElementById('shopping-cart');
        if (cartIcon) cartIcon.click();
        break;
        
      case '1':
      case '2':
      case '3':
      case '4':
        // Switch to image 1-4
        const imageIndex = parseInt(e.key) - 1;
        changeMainImage(imageIndex);
        break;
        
      case '+':
        // Increase quantity
        const plusBtn = document.getElementById('plus');
        if (plusBtn) plusBtn.click();
        break;
        
      case '-':
        // Decrease quantity
        const minusBtn = document.getElementById('minus');
        if (minusBtn) minusBtn.click();
        break;
    }
  });
}

// Touch/swipe support for mobile carousel
function setupTouchSupport() {
  const mainImage = document.querySelector('.mainpic');
  let startX = 0;
  let endX = 0;
  
  mainImage.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  });
  
  mainImage.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next image
        const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        changeMainImage(nextIndex);
      } else {
        // Swipe right - previous image
        const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        changeMainImage(prevIndex);
      }
    }
  }
}

// Initialize all functionality
function init() {
  // Core functionality
  updateCounter();
  toggleCart();
  clearCart();
  closeLightbox();
  setupLightboxNavigation();
  setupMainImageClick();
  setupMobileMenu();
  setupCheckout();
  
  // Enhanced functionality
  enhancedAddToCart();
  addShakeAnimation();
  setupKeyboardShortcuts();
  setupTouchSupport();
  
  // Utility functions
  handleResize();
  setupSmoothScrolling();
  preloadImages();
  initializeThumbnails();
  
  // Initial states
  updateCartDisplay();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export functions for potential external use
window.sneakerApp = {
  changeMainImage,
  changeLightboxImage,
  openLightbox,
  updateCartDisplay,
  updateBadge
};