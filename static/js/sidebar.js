// Sidebar functionality
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('adminSidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  
  // Toggle sidebar expanded state
  sidebarToggle?.addEventListener('click', () => {
    const isExpanded = sidebar.getAttribute('data-expanded') === 'true';
    sidebar.setAttribute('data-expanded', !isExpanded);
    localStorage.setItem('sidebarExpanded', !isExpanded);
  });

  // Restore sidebar state from localStorage
  const savedState = localStorage.getItem('sidebarExpanded');
  if (savedState !== null) {
    sidebar.setAttribute('data-expanded', savedState === 'true');
  }

  // Mobile menu handling
  mobileMenuBtn?.addEventListener('click', () => {
    sidebar.classList.add('mobile-open');
    sidebarOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  });

  // Close mobile menu
  const closeMobileMenu = () => {
    sidebar.classList.remove('mobile-open');
    sidebarOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  };

  sidebarOverlay?.addEventListener('click', closeMobileMenu);

  // Close menu on navigation for mobile
  const navLinks = sidebar.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1024) {
        closeMobileMenu();
      }
    });
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
      closeMobileMenu();
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && sidebar.classList.contains('mobile-open')) {
      closeMobileMenu();
    }
  });
});
