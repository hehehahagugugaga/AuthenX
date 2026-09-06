// ============================================
// AuthenX — Collapsible Mobile Sidebar Component
// Provides a sleek, native off-canvas navigation drawer for phone/mobile
// ============================================

export function openMobileSidebar() {
  const sidebar = document.getElementById('mobile-sidebar');
  const backdrop = document.getElementById('mobile-sidebar-backdrop');
  if (!sidebar) return;

  if (!sidebar.hasChildNodes() || sidebar.children.length === 0) {
    renderSidebar();
  }

  sidebar.classList.add('open');
  sidebar.setAttribute('aria-hidden', 'false');
  if (backdrop) {
    backdrop.classList.add('open');
  }
  document.body.style.overflow = 'hidden';

  // Highlight the current active route
  const currentHash = window.location.hash.slice(1) || 'dashboard';
  sidebar.querySelectorAll('.mobile-sidebar-nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.route === currentHash);
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

export function closeMobileSidebar() {
  const sidebar = document.getElementById('mobile-sidebar');
  const backdrop = document.getElementById('mobile-sidebar-backdrop');
  if (sidebar) {
    sidebar.classList.remove('open');
    sidebar.setAttribute('aria-hidden', 'true');
  }
  if (backdrop) {
    backdrop.classList.remove('open');
  }
  document.body.style.overflow = '';
}

// Expose globally on module load immediately
window.DocuVerify = window.DocuVerify || {};
window.DocuVerify.openMobileSidebar = openMobileSidebar;
window.DocuVerify.closeMobileSidebar = closeMobileSidebar;

// Global event delegation for mobile menu toggle (clicks & touches)
if (!window._mobileMenuToggleDelegated) {
  const handleMobileToggle = (e) => {
    const toggleBtn = e.target.closest('#mobile-menu-toggle, .mobile-menu-btn');
    if (toggleBtn) {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
      openMobileSidebar();
    }
  };
  document.addEventListener('click', handleMobileToggle);
  document.addEventListener('touchstart', handleMobileToggle, { passive: false });
  window._mobileMenuToggleDelegated = true;
}

export function renderSidebar() {
  const sidebar = document.getElementById('mobile-sidebar');
  const backdrop = document.getElementById('mobile-sidebar-backdrop');
  if (!sidebar) return;
  window.DocuVerify.closeMobileSidebar = closeMobileSidebar;

  sidebar.innerHTML = `
    <!-- Sidebar Header: Brand & Close Button -->
    <div class="mobile-sidebar-header">
      <div class="mobile-sidebar-brand">
        <img src="assets/logo.png" alt="AuthenX" class="mobile-sidebar-logo" />
        <span class="mobile-sidebar-badge">GovTech Secure</span>
      </div>
      <button class="mobile-sidebar-close" id="mobile-sidebar-close" aria-label="Close Navigation Menu" title="Close Menu">
        <i data-lucide="x"></i>
      </button>
    </div>

    <!-- Officer Profile Quick Card -->
    <div class="mobile-sidebar-officer-card">
      <div class="mobile-officer-avatar">RS</div>
      <div class="mobile-officer-details">
        <div class="mobile-officer-name">Rahul Sharma</div>
        <div class="mobile-officer-role">Verification Officer</div>
        <div class="mobile-officer-status">
          <span class="status-pulse-dot"></span>
          <span>Online • Active Session</span>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <div class="mobile-sidebar-body">
      <div class="mobile-sidebar-section-title">MAIN NAVIGATION</div>
      <nav class="mobile-sidebar-nav" aria-label="Mobile Navigation">
        <a class="sidebar-nav-item mobile-sidebar-nav-item active" data-route="dashboard" href="#dashboard">
          <div class="mobile-nav-icon">
            <i data-lucide="layout-dashboard"></i>
          </div>
          <div class="mobile-nav-content">
            <span class="mobile-nav-label">Dashboard</span>
            <span class="mobile-nav-desc">Overview & metrics</span>
          </div>
          <i data-lucide="chevron-right" class="mobile-nav-arrow"></i>
        </a>

        <a class="sidebar-nav-item mobile-sidebar-nav-item" data-route="verify" href="#verify">
          <div class="mobile-nav-icon">
            <i data-lucide="file-search"></i>
          </div>
          <div class="mobile-nav-content">
            <span class="mobile-nav-label">Verify Document</span>
            <span class="mobile-nav-desc">Upload & live camera scanner</span>
          </div>
          <span class="mobile-nav-badge">Live</span>
          <i data-lucide="chevron-right" class="mobile-nav-arrow"></i>
        </a>

        <a class="sidebar-nav-item mobile-sidebar-nav-item" data-route="history" href="#history">
          <div class="mobile-nav-icon">
            <i data-lucide="history"></i>
          </div>
          <div class="mobile-nav-content">
            <span class="mobile-nav-label">Verification History</span>
            <span class="mobile-nav-desc">Audit logs & past records</span>
          </div>
          <i data-lucide="chevron-right" class="mobile-nav-arrow"></i>
        </a>

        <a class="sidebar-nav-item mobile-sidebar-nav-item" data-route="analytics" href="#analytics">
          <div class="mobile-nav-icon">
            <i data-lucide="bar-chart-3"></i>
          </div>
          <div class="mobile-nav-content">
            <span class="mobile-nav-label">Analytics & Reports</span>
            <span class="mobile-nav-desc">Trends, graphs & KPIs</span>
          </div>
          <i data-lucide="chevron-right" class="mobile-nav-arrow"></i>
        </a>

        <a class="sidebar-nav-item mobile-sidebar-nav-item" data-route="settings" href="#settings">
          <div class="mobile-nav-icon">
            <i data-lucide="settings"></i>
          </div>
          <div class="mobile-nav-content">
            <span class="mobile-nav-label">Settings & Security</span>
            <span class="mobile-nav-desc">2FA, profile & preferences</span>
          </div>
          <i data-lucide="chevron-right" class="mobile-nav-arrow"></i>
        </a>

        <a class="sidebar-nav-item mobile-sidebar-nav-item" data-route="help" href="#help">
          <div class="mobile-nav-icon">
            <i data-lucide="help-circle"></i>
          </div>
          <div class="mobile-nav-content">
            <span class="mobile-nav-label">Help & Support</span>
            <span class="mobile-nav-desc">Guides, FAQs & assistance</span>
          </div>
          <i data-lucide="chevron-right" class="mobile-nav-arrow"></i>
        </a>
      </nav>

      <!-- Quick Actions / Tools Section -->
      <div class="mobile-sidebar-section-title" style="margin-top:var(--space-4);">QUICK ACCESS</div>
      <div class="mobile-sidebar-actions">
        <button class="mobile-action-card" id="mobile-sidebar-search-btn" type="button">
          <div class="mobile-action-icon search-icon">
            <i data-lucide="search"></i>
          </div>
          <div class="mobile-action-text">
            <span class="mobile-action-title">Search Documents</span>
            <span class="mobile-action-sub">Lookup IDs, names, hashes</span>
          </div>
        </button>

        <button class="mobile-action-card" id="mobile-sidebar-alerts-btn" type="button">
          <div class="mobile-action-icon alert-icon">
            <i data-lucide="bell"></i>
          </div>
          <div class="mobile-action-text">
            <span class="mobile-action-title">Security Alerts</span>
            <span class="mobile-action-sub">System & verification alerts</span>
          </div>
          <span class="badge badge-danger" style="font-size:10px;padding:2px 6px;">3</span>
        </button>
      </div>
    </div>

    <!-- Sidebar Footer: Blockchain & Node Info -->
    <div class="mobile-sidebar-footer">
      <div class="mobile-blockchain-status">
        <span class="status-pulse-dot" style="background:#10b981;"></span>
        <span>Institutional Blockchain • Operational</span>
      </div>
      <div class="mobile-build-version">AuthenX Enterprise Build v2.4</div>
    </div>
  `;

  // Attach Close Events
  const closeBtn = sidebar.querySelector('#mobile-sidebar-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileSidebar();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeMobileSidebar();
    });
  }

  // Close on Escape key
  if (!window._mobileSidebarEscapeBound) {
    document.addEventListener('keydown', (e) => {
      const sb = document.getElementById('mobile-sidebar');
      if (e.key === 'Escape' && sb && sb.classList.contains('open')) {
        closeMobileSidebar();
      }
    });
    window._mobileSidebarEscapeBound = true;
  }

  // Nav item clicks close drawer
  sidebar.querySelectorAll('.mobile-sidebar-nav-item').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileSidebar();
    });
  });

  // Quick Tools events
  const searchBtn = sidebar.querySelector('#mobile-sidebar-search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileSidebar();
      if (window.DocuVerify && window.DocuVerify.openDocumentSearchModal) {
        window.DocuVerify.openDocumentSearchModal();
      }
    });
  }

  const alertsBtn = sidebar.querySelector('#mobile-sidebar-alerts-btn');
  if (alertsBtn) {
    alertsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeMobileSidebar();
      if (window.DocuVerify && window.DocuVerify.openNotificationsDrawer) {
        window.DocuVerify.openNotificationsDrawer();
      }
    });
  }

  if (window.lucide) {
    lucide.createIcons();
  }
}
