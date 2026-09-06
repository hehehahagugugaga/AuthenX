// ============================================
// DocuVerify — Client-Side Router
// Hash-based SPA routing
// ============================================

const routes = {};
let currentRoute = null;

export function registerRoute(path, handler) {
  routes[path] = handler;
}

export function navigateTo(path) {
  window.location.hash = path;
}

export function getCurrentRoute() {
  return currentRoute;
}

export function initRouter() {
  const handleRoute = () => {
    const hash = window.location.hash.slice(1) || 'dashboard';
    currentRoute = hash;

    // Update navigation active state
    document.querySelectorAll('.sidebar-nav-item, .topbar-nav-item').forEach(item => {
      const route = (item.dataset && item.dataset.route) || item.getAttribute('data-route');
      item.classList.toggle('active', route === hash);
    });

    // Update topbar breadcrumb
    const breadcrumb = document.getElementById('breadcrumb-current');
    if (breadcrumb) {
      const titles = {
        'dashboard': 'Dashboard',
        'verify': 'Verify Document',
        'history': 'Verification History',
        'documents': 'Documents',
        'alerts': 'Alerts',
        'analytics': 'Analytics',
        'settings': 'Settings',
        'help': 'Help & Support'
      };
      breadcrumb.textContent = titles[hash] || 'Dashboard';
    }

    // Handle search modal / notification drawer hash shortcuts
    if (hash === 'documents' || hash === 'search') {
      const prevRoute = (currentRoute && currentRoute !== 'documents' && currentRoute !== 'search') ? currentRoute : 'dashboard';
      currentRoute = prevRoute;
      history.replaceState(null, '', '#' + prevRoute);
      if (window.DocuVerify && window.DocuVerify.openDocumentSearchModal) {
        window.DocuVerify.openDocumentSearchModal();
      }
      return;
    }
    if (hash === 'alerts' || hash === 'notifications') {
      const prevRoute = (currentRoute && currentRoute !== 'alerts' && currentRoute !== 'notifications') ? currentRoute : 'dashboard';
      currentRoute = prevRoute;
      history.replaceState(null, '', '#' + prevRoute);
      if (window.DocuVerify && window.DocuVerify.openNotificationsDrawer) {
        window.DocuVerify.openNotificationsDrawer();
      }
      return;
    }

    // Render page
    const mainContent = document.getElementById('main-content');
    if (mainContent && routes[hash]) {
      mainContent.innerHTML = '';
      mainContent.style.opacity = '0';
      routes[hash](mainContent);
      requestAnimationFrame(() => {
        mainContent.style.opacity = '1';
      });
    } else if (mainContent && !routes[hash]) {
      mainContent.innerHTML = `
        <div class="empty-state" style="min-height: 60vh;">
          <i data-lucide="construction"></i>
          <h3>Page Not Found</h3>
          <p>The requested page does not exist.</p>
          <button class="btn btn-primary mt-4" onclick="location.hash='dashboard'">
            Go to Dashboard
          </button>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
    }
  };

  window.addEventListener('hashchange', handleRoute);
  handleRoute();
}
