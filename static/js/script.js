// Swipe variables and sidebar state
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
const swipeThreshold    = 50;
const verticalThreshold = 30;
let isSidebarOpen       = false;

// Toggle sidebar (handle & overlay)
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const handle  = document.getElementById('sidebarHandle');
  const overlay = document.getElementById('overlay');

  isSidebarOpen = !isSidebarOpen;
  sidebar.classList.toggle('open', isSidebarOpen);
  overlay.classList.toggle('active', isSidebarOpen);
  handle.style.right = isSidebarOpen ? '0' : '-60px';
}

// Handle horizontal swipe for sidebar
function handleSwipe() {
  const dx = touchEndX - touchStartX;
  const dy = touchEndY - touchStartY;
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dy) < verticalThreshold) {
    if (dx > swipeThreshold && !isSidebarOpen) toggleSidebar();
    if (dx < -swipeThreshold && isSidebarOpen) toggleSidebar();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // ─── Theme Toggle ─────────────────────────────────────────────
  const themeBtn = document.getElementById('theme-toggle');
  themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    themeBtn.setAttribute(
      'aria-label',
      isDark ? 'Disable dark mode' : 'Enable dark mode'
    );
  });

  // ─── Mobile Menu Toggle ────────────────────────────────────────
  const menuBtn = document.getElementById('menu-toggle');
  const navbar  = document.querySelector('.navbar');
  menuBtn.addEventListener('click', () => {
    const open = navbar.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute(
      'aria-label',
      open ? 'Close menu' : 'Open menu'
    );
    menuBtn.classList.toggle('is-open', open);
  });
  // Close mobile menu when a link is clicked
  document
    .querySelectorAll('.mobile-menu__list a')
    .forEach(link => {
      link.addEventListener('click', () => {
        if (navbar.classList.contains('menu-open')) {
          menuBtn.click();
        }
      });
    });

  // ─── Sidebar Toggle & Hover ───────────────────────────────────
  const handleEl = document.getElementById('sidebarHandle');
  const overlay  = document.getElementById('overlay');
  handleEl.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', () => {
    if (isSidebarOpen) toggleSidebar();
  });
  handleEl.addEventListener('mouseenter', () => {
    if (!isSidebarOpen) handleEl.style.right = '-55px';
  });
  handleEl.addEventListener('mouseleave', () => {
    if (!isSidebarOpen) handleEl.style.right = '-60px';
  });
});

// ─── Touch / Swipe Listeners ───────────────────────────────────
document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener(
  'touchmove',
  e => e.preventDefault(),
  { passive: false }
);

document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});
