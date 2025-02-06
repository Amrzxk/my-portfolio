document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");
    const toggleButton = document.getElementById("toggle-navbar");
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".nav-links");
  
    // Toggle the navbar collapsed state when the toggle button is clicked
    toggleButton.addEventListener("click", function () {
      // Check if navbar is collapsed
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
  