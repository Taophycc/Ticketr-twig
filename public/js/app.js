document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle Logic ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    // Initial state
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      themeToggleLightIcon.classList.remove('hidden');
      document.documentElement.classList.add('dark');
    } else {
      themeToggleDarkIcon.classList.remove('hidden');
      document.documentElement.classList.remove('dark');
    }

    themeToggleBtn.addEventListener('click', () => {
      themeToggleDarkIcon.classList.toggle('hidden');
      themeToggleLightIcon.classList.toggle('hidden');

      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // --- Navbar Scroll Logic ---
  const navbar = document.getElementById('landing-navbar');
  if (navbar) {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');
    const signupButton = document.getElementById('desktop-signup-link');
    const divider = document.getElementById('desktop-divider');
    const textElements = navbar.querySelectorAll('[data-text-color]');
    let isMenuOpen = false;

    const updateNavAppearance = () => {
      const isScrolled = window.scrollY > 10;
      const shouldBeSolid = isScrolled || isMenuOpen;

      if (shouldBeSolid) {
        navbar.classList.add('bg-white', 'shadow-md', 'dark:bg-gray-900');
        textElements.forEach(el => {
          el.classList.remove(...(el.dataset.textTransparent.split(' ')));
          el.classList.add(...(el.dataset.textSolid.split(' ')));
        });
        signupButton.classList.remove('bg-white', 'text-primary', 'hover:bg-gray-200');
        signupButton.classList.add('bg-primary', 'text-white', 'hover:bg-primary-light');
        divider.classList.remove('border-gray-100', 'dark:border-gray-700');
        divider.classList.add('border-gray-300', 'dark:border-gray-600');
      } else {
        navbar.classList.remove('bg-white', 'shadow-md', 'dark:bg-gray-900');
        textElements.forEach(el => {
          el.classList.add(...(el.dataset.textTransparent.split(' ')));
          el.classList.remove(...(el.dataset.textSolid.split(' ')));
        });
        signupButton.classList.add('bg-white', 'text-primary', 'hover:bg-gray-200');
        signupButton.classList.remove('bg-primary', 'text-white', 'hover:bg-primary-light');
        divider.classList.add('border-gray-100', 'dark:border-gray-700');
        divider.classList.remove('border-gray-300', 'dark:border-gray-600');
      }
    };

    mobileMenuButton.addEventListener('click', () => {
      isMenuOpen = !isMenuOpen;
      mobileMenu.classList.toggle('hidden');
      hamburgerIcon.classList.toggle('hidden');
      closeIcon.classList.toggle('hidden');
      updateNavAppearance();
    });

    window.addEventListener('scroll', updateNavAppearance);
    updateNavAppearance();
  }

  // --- Toast Logic ---
  const toast = document.getElementById('success-toast') || document.getElementById('error-toast');
  if (toast) {
    setTimeout(() => {
      toast.remove();
    }, 5000);
  }

  // --- Modal Logic (Global Scope) ---
  // Check for query parameter to open create modal on tickets page
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('action') === 'create' && window.location.pathname.includes('/tickets')) {
    openCreateModal();
  }
});

function openCreateModal() {
  document.getElementById('modal-title').textContent = 'Create New Ticket';
  document.getElementById('submit-text').textContent = 'Create';
  document.getElementById('ticket-form').action = '/tickets/create';
  document.getElementById('ticket-form').reset();
  document.getElementById('ticket-modal').classList.remove('hidden');
}

function openEditModal(ticket) {
  document.getElementById('modal-title').textContent = 'Edit Ticket';
  document.getElementById('submit-text').textContent = 'Update';
  document.getElementById('ticket-form').action = '/tickets/update/' + ticket.id;
  document.getElementById('title').value = ticket.title;
  document.getElementById('description').value = ticket.description || '';
  document.getElementById('status').value = ticket.status;
  document.getElementById('priority').value = ticket.priority || 'medium';
  document.getElementById('ticket-modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('ticket-modal').classList.add('hidden');
}

function openDeleteModal(id, title) {
  document.getElementById('delete-ticket-title').textContent = title;
  document.getElementById('delete-form').action = '/tickets/delete/' + id;
  document.getElementById('delete-modal').classList.remove('hidden');
}

function closeDeleteModal() {
  document.getElementById('delete-modal').classList.add('hidden');
}