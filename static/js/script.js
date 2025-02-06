document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
  
    hamburger.addEventListener('click', function() {
      navbar.classList.toggle('active');
    });
  });
  