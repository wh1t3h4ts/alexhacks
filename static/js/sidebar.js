// Sidebar Management
class SidebarManager {
  constructor() {
    this.sidebar = document.getElementById('adminSidebar');
    this.toggle = document.getElementById('sidebarToggle');
    this.overlay = document.getElementById('sidebarOverlay');
    this.mobileToggle = document.getElementById('mobileMenuBtn');
    this.mediaQuery = window.matchMedia('(min-width: 1024px)');

    this.init();
  }

  init() {
    // Restore sidebar state
    const expanded = localStorage.getItem('sidebarExpanded') !== 'false';
    this.setSidebarState(expanded);

    // Event listeners
    this.toggle?.addEventListener('click', () => this.toggleSidebar());
    this.mobileToggle?.addEventListener('click', () => this.openMobileSidebar());
    this.overlay?.addEventListener('click', () => this.closeMobileSidebar());
    this.mediaQuery.addEventListener('change', () => this.handleResize());

    // Close menu on navigation for mobile
    const navLinks = this.sidebar?.querySelectorAll('.nav-link') || [];
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          this.closeMobileSidebar();
        }
      });
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.sidebar?.classList.contains('mobile-open')) {
        this.closeMobileSidebar();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && this.sidebar?.classList.contains('mobile-open')) {
        this.closeMobileSidebar();
      }
    });
  }

  setSidebarState(expanded) {
    this.sidebar?.setAttribute('data-expanded', expanded);
    localStorage.setItem('sidebarExpanded', expanded);
  }

  toggleSidebar() {
    const expanded = this.sidebar?.getAttribute('data-expanded') !== 'true';
    this.setSidebarState(expanded);
  }

  openMobileSidebar() {
    this.sidebar?.classList.add('mobile-open');
    this.overlay?.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  closeMobileSidebar() {
    this.sidebar?.classList.remove('mobile-open');
    this.overlay?.classList.remove('visible');
    document.body.style.overflow = '';
  }

  handleResize() {
    if (this.mediaQuery.matches) {
      this.closeMobileSidebar();
    }
  }
}

// Init sidebar manager
document.addEventListener('DOMContentLoaded', () => {
  new SidebarManager();
});
