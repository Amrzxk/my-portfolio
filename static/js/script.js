let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
const swipeThreshold = 50; // Minimum swipe distance in pixels
const verticalThreshold = 30; // Maximum vertical deviation allowed


document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");
    const toggleButton = document.getElementById("toggle-navbar");
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");
  
    toggleButton.addEventListener("click", function () {
      if (navbar.classList.contains("collapsed")) {
        navbar.classList.remove("collapsed");
        toggleButton.textContent = "Hide Navbar";
      } else {
        navbar.classList.add("collapsed");
        toggleButton.textContent = "Show Navbar";
      }
    });
  
    // (Optional) Toggle mobile navigation when hamburger is clicked
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  });
  // side bar content: 
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const handle = document.getElementById('sidebarHandle');
  const overlay = document.getElementById('overlay');
  let isOpen = false;

  handle.addEventListener('click', toggleSidebar);
  
  overlay.addEventListener('click', function() {
      if (isOpen) toggleSidebar();
  });

  function toggleSidebar() {
    isOpen = !isOpen;
    sidebar.classList.toggle('open', isOpen);
    overlay.classList.toggle('active', isOpen);
    
    if (!isOpen) {
        handle.style.right = '-60px';
    }
  }

  // Optional: Add hover effect
  handle.addEventListener('mouseenter', function() {
      if (!isOpen) handle.style.right = '-55px';
  });
  
  handle.addEventListener('mouseleave', function() {
      if (!isOpen) handle.style.right = '-60px';
  });
});

document.addEventListener('touchstart', function(e) {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchmove', function(e) {
  e.preventDefault(); // Prevent scrolling during swipe
}, { passive: false });

document.addEventListener('touchend', function(e) {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const deltaX = touchEndX - touchStartX;
  const deltaY = touchEndY - touchStartY;
  
  // Check if swipe is primarily horizontal
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Check vertical deviation is within threshold
      if (Math.abs(deltaY) < verticalThreshold) {
          // Right swipe 
          if (deltaX > swipeThreshold && !isOpen) {
              toggleSidebar();
          }
          // Left swipe
          else if (deltaX < -swipeThreshold && isOpen) {
              toggleSidebar();
          }
      }
  }
}

