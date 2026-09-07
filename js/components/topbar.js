// ============================================
// DocuVerify — Topbar Component
// ============================================

import { openMobileSidebar } from './sidebar.js';

export function renderTopbar() {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;

  topbar.innerHTML = `
    <!-- Left: Mobile Hamburger Toggle, Brand Logo & Global Search -->
    <div class="topbar-left">
      <button class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Open Navigation Menu" title="Open Navigation Menu" onclick="window.DocuVerify?.openMobileSidebar?.()">
        <i data-lucide="menu"></i>
      </button>
      <a class="topbar-brand" href="#home" title="AuthenX — Document Verification Platform">
        <img src="assets/logo.png" alt="AuthenX" class="topbar-brand-logo" />
      </a>
      <div class="topbar-brand-divider"></div>
      <div class="topbar-search" role="search" title="Search documents (Ctrl+K)">
        <i data-lucide="search"></i>
        <input type="text" placeholder="Search documents, IDs..." id="global-search" autocomplete="off" />
        <span class="search-kbd-shortcut"><kbd>Ctrl</kbd><kbd>K</kbd></span>
      </div>
    </div>

    <!-- Center: Primary Navigation with Sliding Indicator -->
    <nav class="topbar-nav" aria-label="Main Navigation">
      <div class="topbar-nav-pill" id="topbar-nav-pill">
        <div class="topbar-nav-indicator" id="topbar-nav-indicator"></div>
        <a class="sidebar-nav-item topbar-nav-item active" data-route="home" href="#home">
          <i data-lucide="home"></i>
          <span>Home</span>
        </a>
        <a class="sidebar-nav-item topbar-nav-item" data-route="dashboard" href="#dashboard">
          <i data-lucide="layout-dashboard"></i>
          <span>Dashboard</span>
        </a>
        <a class="sidebar-nav-item topbar-nav-item" data-route="verify" href="#verify">
          <i data-lucide="file-search"></i>
          <span>Verify</span>
        </a>
        <a class="sidebar-nav-item topbar-nav-item" data-route="history" href="#history">
          <i data-lucide="history"></i>
          <span>History</span>
        </a>
        <a class="sidebar-nav-item topbar-nav-item" data-route="analytics" href="#analytics">
          <i data-lucide="bar-chart-3"></i>
          <span>Analytics</span>
        </a>
        <a class="sidebar-nav-item topbar-nav-item" data-route="help" href="#help">
          <i data-lucide="help-circle"></i>
          <span>Help</span>
        </a>
      </div>
    </nav>

    <!-- Right: Notifications & User Profile -->
    <div class="topbar-right">
      <button class="topbar-icon-btn" data-tooltip="Notifications & Security Alerts" data-tooltip-pos="bottom" id="notifications-btn" aria-label="Notifications">
        <i data-lucide="bell"></i>
        <span class="notification-dot"></span>
      </button>

      <div class="topbar-divider"></div>

      <div class="topbar-user-wrapper" style="position:relative;">
        <div class="topbar-user" id="topbar-user" role="button" aria-haspopup="true" aria-expanded="false" title="Rahul Sharma — Verification Officer">
          <div class="topbar-user-avatar">RS</div>
          <div class="topbar-user-info">
            <span class="topbar-user-name">Rahul Sharma</span>
            <span class="topbar-user-role">Verification Officer</span>
          </div>
          <i data-lucide="chevron-down" id="user-menu-chevron" style="width:14px;height:14px;color:var(--text-tertiary);transition:transform 0.2s ease;"></i>
        </div>

        <!-- Profile & Settings Dropdown Menu -->
        <div class="profile-dropdown" id="profile-dropdown" style="display:none;">
          <div class="profile-dropdown-header">
            <div class="profile-dropdown-avatar">RS</div>
            <div class="profile-dropdown-info">
              <div class="profile-dropdown-name">Rahul Sharma</div>
              <div class="profile-dropdown-email">rahul.sharma@gov.in</div>
              <span class="badge badge-success" style="font-size:10px;padding:1px 6px;margin-top:4px;display:inline-flex;width:fit-content;">
                <i data-lucide="shield-check" style="width:10px;height:10px;"></i> Verified Officer
              </span>
            </div>
          </div>

          <div class="profile-dropdown-divider"></div>

          <div class="profile-dropdown-section-title">Settings & Configuration</div>

          <a class="profile-dropdown-item" href="#settings" data-tab="account">
            <div class="profile-dropdown-icon">
              <i data-lucide="user"></i>
            </div>
            <div class="profile-dropdown-item-text">
              <span class="profile-dropdown-item-title">Account Settings</span>
              <span class="profile-dropdown-item-sub">Profile, department & role</span>
            </div>
            <i data-lucide="chevron-right" style="width:14px;height:14px;color:var(--text-tertiary);"></i>
          </a>

          <a class="profile-dropdown-item" href="#settings" data-tab="security">
            <div class="profile-dropdown-icon">
              <i data-lucide="shield"></i>
            </div>
            <div class="profile-dropdown-item-text">
              <span class="profile-dropdown-item-title">Security & 2FA</span>
              <span class="profile-dropdown-item-sub">Two-factor auth & session timeout</span>
            </div>
            <span class="badge badge-success" style="font-size:10px;">Active</span>
          </a>

          <a class="profile-dropdown-item" href="#settings" data-tab="notifications">
            <div class="profile-dropdown-icon">
              <i data-lucide="bell"></i>
            </div>
            <div class="profile-dropdown-item-text">
              <span class="profile-dropdown-item-title">Notification Preferences</span>
              <span class="profile-dropdown-item-sub">Alert delivery rules</span>
            </div>
            <i data-lucide="chevron-right" style="width:14px;height:14px;color:var(--text-tertiary);"></i>
          </a>

          <a class="profile-dropdown-item" href="#settings" data-tab="system">
            <div class="profile-dropdown-icon">
              <i data-lucide="cpu"></i>
            </div>
            <div class="profile-dropdown-item-text">
              <span class="profile-dropdown-item-title">System & API Config</span>
              <span class="profile-dropdown-item-sub">API keys & node settings</span>
            </div>
            <i data-lucide="chevron-right" style="width:14px;height:14px;color:var(--text-tertiary);"></i>
          </a>

          <div class="profile-dropdown-divider"></div>

          <button class="profile-dropdown-item sign-out-item" id="sign-out-btn" style="width:100%;border:none;background:none;text-align:left;cursor:pointer;">
            <div class="profile-dropdown-icon" style="background:var(--color-danger-50);color:var(--color-danger-600);border-color:var(--color-danger-100);">
              <i data-lucide="log-out"></i>
            </div>
            <div class="profile-dropdown-item-text">
              <span class="profile-dropdown-item-title" style="color:var(--color-danger-600);">Sign Out</span>
              <span class="profile-dropdown-item-sub">Switch officer credentials</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  `;

  // Initialize icons in topbar
  if (window.lucide) {
    lucide.createIcons();
  }

  // Mobile menu toggle listener
  const mobileToggle = topbar.querySelector('#mobile-menu-toggle');
  if (mobileToggle) {
    const handleToggle = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      openMobileSidebar();
    };
    mobileToggle.addEventListener('click', handleToggle);
    mobileToggle.addEventListener('touchstart', handleToggle, { passive: false });
  }

  // Attach search event listeners
  const searchContainer = topbar.querySelector('.topbar-search');
  const searchInput = topbar.querySelector('#global-search');

  const triggerSearch = (query = '') => {
    if (window.DocuVerify && window.DocuVerify.openDocumentSearchModal) {
      if (searchInput) searchInput.blur();
      window.DocuVerify.openDocumentSearchModal(query);
    }
  };

  if (searchContainer) {
    searchContainer.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentVal = searchInput ? searchInput.value : '';
      triggerSearch(currentVal);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        triggerSearch(searchInput.value);
      }
    });
  }

  // Global Ctrl+K / Cmd+K shortcut listener
  if (window._authenxSearchKeyHandler) {
    window.removeEventListener('keydown', window._authenxSearchKeyHandler);
  }
  window._authenxSearchKeyHandler = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      triggerSearch();
    }
  };
  window.addEventListener('keydown', window._authenxSearchKeyHandler);

  // Attach notifications listener
  const notifBtn = topbar.querySelector('#notifications-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeDropdown();
      if (window.DocuVerify && window.DocuVerify.openNotificationsDrawer) {
        window.DocuVerify.openNotificationsDrawer();
      }
    });
  }

  // Attach user profile dropdown listeners
  const userBtn = topbar.querySelector('#topbar-user');
  const dropdown = topbar.querySelector('#profile-dropdown');
  const chevron = topbar.querySelector('#user-menu-chevron');

  function openDropdown() {
    if (dropdown) {
      dropdown.style.display = 'flex';
      if (userBtn) userBtn.setAttribute('aria-expanded', 'true');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
    }
  }

  function closeDropdown() {
    if (dropdown) {
      dropdown.style.display = 'none';
      if (userBtn) userBtn.setAttribute('aria-expanded', 'false');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
  }

  if (userBtn && dropdown) {
    userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.style.display === 'flex';
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!topbar.querySelector('.topbar-user-wrapper')?.contains(e.target)) {
        closeDropdown();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dropdown.style.display === 'flex') {
        closeDropdown();
      }
    });

    // Handle dropdown items navigation
    dropdown.querySelectorAll('.profile-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        closeDropdown();
      });
    });

    // Sign out button
    const signOutBtn = dropdown.querySelector('#sign-out-btn');
    if (signOutBtn) {
      signOutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDropdown();
        if (window.DocuVerify && window.DocuVerify.showConfirmDialog) {
          window.DocuVerify.showConfirmDialog(
            'Confirm Sign Out',
            'Are you sure you want to sign out of the Verification Officer terminal?',
            'Sign Out',
            () => {
              window.location.hash = 'dashboard';
            }
          );
        }
      });
    }
  }

  // ── Smooth Sliding Pill Indicator Setup ──
  const pill = topbar.querySelector('#topbar-nav-pill');
  const indicator = topbar.querySelector('#topbar-nav-indicator');

  function moveIndicatorTo(item) {
    if (!pill || !indicator || !item) return;
    const pillRect = pill.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    if (pillRect.width === 0 || itemRect.width === 0) return;

    const left = itemRect.left - pillRect.left;
    const width = itemRect.width;

    indicator.style.transform = `translateX(${left}px)`;
    indicator.style.width = `${width}px`;
    indicator.style.opacity = '1';
    pill.classList.add('has-indicator');
  }

  function syncIndicatorWithActive() {
    const activeItem = pill?.querySelector('.topbar-nav-item.active');
    if (activeItem) {
      moveIndicatorTo(activeItem);
    }
  }

  window.DocuVerify = window.DocuVerify || {};
  window.DocuVerify.updateNavIndicator = syncIndicatorWithActive;

  if (pill) {
    pill.addEventListener('click', (e) => {
      const item = e.target.closest('.topbar-nav-item');
      if (item) {
        moveIndicatorTo(item);
      }
    });

    window.addEventListener('resize', () => {
      requestAnimationFrame(syncIndicatorWithActive);
    });

    // Initial position after render and font loading
    requestAnimationFrame(() => {
      setTimeout(syncIndicatorWithActive, 40);
      setTimeout(syncIndicatorWithActive, 200);
    });
  }
}

