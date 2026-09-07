(() => {
  // js/router.js
  var routes = {};
  var currentRoute = null;
  function registerRoute(path, handler) {
    routes[path] = handler;
  }
  function initRouter() {
    const handleRoute = () => {
      const hash = window.location.hash.slice(1) || "home";
      currentRoute = hash;
      document.querySelectorAll(".sidebar-nav-item, .topbar-nav-item").forEach((item) => {
        const route = item.dataset && item.dataset.route || item.getAttribute("data-route");
        item.classList.toggle("active", route === hash);
      });
      if (window.DocuVerify && typeof window.DocuVerify.updateNavIndicator === "function") {
        window.DocuVerify.updateNavIndicator();
      }
      const breadcrumb = document.getElementById("breadcrumb-current");
      if (breadcrumb) {
        const titles = {
          "home": "Home",
          "dashboard": "Dashboard",
          "verify": "Verify Document",
          "history": "Verification History",
          "documents": "Documents",
          "alerts": "Alerts",
          "analytics": "Analytics",
          "settings": "Settings",
          "help": "Help & Support"
        };
        breadcrumb.textContent = titles[hash] || "Home";
      }
      if (hash === "documents" || hash === "search") {
        const prevRoute = currentRoute && currentRoute !== "documents" && currentRoute !== "search" ? currentRoute : "home";
        currentRoute = prevRoute;
        history.replaceState(null, "", "#" + prevRoute);
        if (window.DocuVerify && window.DocuVerify.openDocumentSearchModal) {
          window.DocuVerify.openDocumentSearchModal();
        }
        return;
      }
      if (hash === "alerts" || hash === "notifications") {
        const prevRoute = currentRoute && currentRoute !== "alerts" && currentRoute !== "notifications" ? currentRoute : "home";
        currentRoute = prevRoute;
        history.replaceState(null, "", "#" + prevRoute);
        if (window.DocuVerify && window.DocuVerify.openNotificationsDrawer) {
          window.DocuVerify.openNotificationsDrawer();
        }
        return;
      }
      const mainContent = document.getElementById("main-content");
      if (mainContent && routes[hash]) {
        mainContent.innerHTML = "";
        routes[hash](mainContent);
        if (window.DocuVerify && typeof window.DocuVerify.updateNavIndicator === "function") {
          requestAnimationFrame(window.DocuVerify.updateNavIndicator);
        }
      } else if (mainContent && !routes[hash]) {
        mainContent.innerHTML = `
        <div class="empty-state" style="min-height: 60vh;">
          <i data-lucide="construction"></i>
          <h3>Page Not Found</h3>
          <p>The requested page does not exist.</p>
          <button class="btn btn-primary mt-4" onclick="location.hash='home'">
            Go to Home
          </button>
        </div>
      `;
        if (window.lucide) lucide.createIcons();
      }
    };
    window.addEventListener("hashchange", handleRoute);
    handleRoute();
  }

  // js/components/sidebar.js
  function openMobileSidebar() {
    const sidebar = document.getElementById("mobile-sidebar");
    const backdrop = document.getElementById("mobile-sidebar-backdrop");
    if (!sidebar) return;
    if (!sidebar.hasChildNodes() || sidebar.children.length === 0) {
      renderSidebar();
    }
    sidebar.classList.add("open");
    sidebar.setAttribute("aria-hidden", "false");
    if (backdrop) {
      backdrop.classList.add("open");
    }
    document.body.style.overflow = "hidden";
    const currentHash = window.location.hash.slice(1) || "dashboard";
    sidebar.querySelectorAll(".mobile-sidebar-nav-item").forEach((item) => {
      item.classList.toggle("active", item.dataset.route === currentHash);
    });
    if (window.lucide) {
      lucide.createIcons();
    }
  }
  function closeMobileSidebar() {
    const sidebar = document.getElementById("mobile-sidebar");
    const backdrop = document.getElementById("mobile-sidebar-backdrop");
    if (sidebar) {
      sidebar.classList.remove("open");
      sidebar.setAttribute("aria-hidden", "true");
    }
    if (backdrop) {
      backdrop.classList.remove("open");
    }
    document.body.style.overflow = "";
  }
  window.DocuVerify = window.DocuVerify || {};
  window.DocuVerify.openMobileSidebar = openMobileSidebar;
  window.DocuVerify.closeMobileSidebar = closeMobileSidebar;
  if (!window._mobileMenuToggleDelegated) {
    const handleMobileToggle = (e) => {
      const toggleBtn = e.target.closest("#mobile-menu-toggle, .mobile-menu-btn");
      if (toggleBtn) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        openMobileSidebar();
      }
    };
    document.addEventListener("click", handleMobileToggle);
    document.addEventListener("touchstart", handleMobileToggle, { passive: false });
    window._mobileMenuToggleDelegated = true;
  }
  function renderSidebar() {
    const sidebar = document.getElementById("mobile-sidebar");
    const backdrop = document.getElementById("mobile-sidebar-backdrop");
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
          <span>Online \u2022 Active Session</span>
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
        <span>Institutional Blockchain \u2022 Operational</span>
      </div>
      <div class="mobile-build-version">AuthenX Enterprise Build v2.4</div>
    </div>
  `;
    const closeBtn = sidebar.querySelector("#mobile-sidebar-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeMobileSidebar();
      });
    }
    if (backdrop) {
      backdrop.addEventListener("click", () => {
        closeMobileSidebar();
      });
    }
    if (!window._mobileSidebarEscapeBound) {
      document.addEventListener("keydown", (e) => {
        const sb = document.getElementById("mobile-sidebar");
        if (e.key === "Escape" && sb && sb.classList.contains("open")) {
          closeMobileSidebar();
        }
      });
      window._mobileSidebarEscapeBound = true;
    }
    sidebar.querySelectorAll(".mobile-sidebar-nav-item").forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileSidebar();
      });
    });
    const searchBtn = sidebar.querySelector("#mobile-sidebar-search-btn");
    if (searchBtn) {
      searchBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        closeMobileSidebar();
        if (window.DocuVerify && window.DocuVerify.openDocumentSearchModal) {
          window.DocuVerify.openDocumentSearchModal();
        }
      });
    }
    const alertsBtn = sidebar.querySelector("#mobile-sidebar-alerts-btn");
    if (alertsBtn) {
      alertsBtn.addEventListener("click", (e) => {
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

  // js/components/topbar.js
  function renderTopbar() {
    const topbar = document.getElementById("topbar");
    if (!topbar) return;
    topbar.innerHTML = `
    <!-- Left: Mobile Hamburger Toggle, Brand Logo & Global Search -->
    <div class="topbar-left">
      <button class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Open Navigation Menu" title="Open Navigation Menu" onclick="window.DocuVerify?.openMobileSidebar?.()">
        <i data-lucide="menu"></i>
      </button>
      <a class="topbar-brand" href="#home" title="AuthenX \u2014 Document Verification Platform">
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
        <div class="topbar-user" id="topbar-user" role="button" aria-haspopup="true" aria-expanded="false" title="Rahul Sharma \u2014 Verification Officer">
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
    if (window.lucide) {
      lucide.createIcons();
    }
    const mobileToggle = topbar.querySelector("#mobile-menu-toggle");
    if (mobileToggle) {
      const handleToggle = (e) => {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        openMobileSidebar();
      };
      mobileToggle.addEventListener("click", handleToggle);
      mobileToggle.addEventListener("touchstart", handleToggle, { passive: false });
    }
    const searchContainer = topbar.querySelector(".topbar-search");
    const searchInput = topbar.querySelector("#global-search");
    const triggerSearch = (query = "") => {
      if (window.DocuVerify && window.DocuVerify.openDocumentSearchModal) {
        if (searchInput) searchInput.blur();
        window.DocuVerify.openDocumentSearchModal(query);
      }
    };
    if (searchContainer) {
      searchContainer.addEventListener("click", (e) => {
        e.stopPropagation();
        const currentVal = searchInput ? searchInput.value : "";
        triggerSearch(currentVal);
      });
    }
    if (searchInput) {
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          triggerSearch(searchInput.value);
        }
      });
    }
    if (window._authenxSearchKeyHandler) {
      window.removeEventListener("keydown", window._authenxSearchKeyHandler);
    }
    window._authenxSearchKeyHandler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        triggerSearch();
      }
    };
    window.addEventListener("keydown", window._authenxSearchKeyHandler);
    const notifBtn = topbar.querySelector("#notifications-btn");
    if (notifBtn) {
      notifBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeDropdown();
        if (window.DocuVerify && window.DocuVerify.openNotificationsDrawer) {
          window.DocuVerify.openNotificationsDrawer();
        }
      });
    }
    const userBtn = topbar.querySelector("#topbar-user");
    const dropdown = topbar.querySelector("#profile-dropdown");
    const chevron = topbar.querySelector("#user-menu-chevron");
    function openDropdown() {
      if (dropdown) {
        dropdown.style.display = "flex";
        if (userBtn) userBtn.setAttribute("aria-expanded", "true");
        if (chevron) chevron.style.transform = "rotate(180deg)";
      }
    }
    function closeDropdown() {
      if (dropdown) {
        dropdown.style.display = "none";
        if (userBtn) userBtn.setAttribute("aria-expanded", "false");
        if (chevron) chevron.style.transform = "rotate(0deg)";
      }
    }
    if (userBtn && dropdown) {
      userBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = dropdown.style.display === "flex";
        if (isOpen) {
          closeDropdown();
        } else {
          openDropdown();
        }
      });
      document.addEventListener("click", (e) => {
        if (!topbar.querySelector(".topbar-user-wrapper")?.contains(e.target)) {
          closeDropdown();
        }
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && dropdown.style.display === "flex") {
          closeDropdown();
        }
      });
      dropdown.querySelectorAll(".profile-dropdown-item").forEach((item) => {
        item.addEventListener("click", () => {
          closeDropdown();
        });
      });
      const signOutBtn = dropdown.querySelector("#sign-out-btn");
      if (signOutBtn) {
        signOutBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          closeDropdown();
          if (window.DocuVerify && window.DocuVerify.showConfirmDialog) {
            window.DocuVerify.showConfirmDialog(
              "Confirm Sign Out",
              "Are you sure you want to sign out of the Verification Officer terminal?",
              "Sign Out",
              () => {
                window.location.hash = "dashboard";
              }
            );
          }
        });
      }
    }
    const pill = topbar.querySelector("#topbar-nav-pill");
    const indicator = topbar.querySelector("#topbar-nav-indicator");
    function moveIndicatorTo(item) {
      if (!pill || !indicator || !item) return;
      const pillRect = pill.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      if (pillRect.width === 0 || itemRect.width === 0) return;
      const left = itemRect.left - pillRect.left;
      const width = itemRect.width;
      indicator.style.transform = `translateX(${left}px)`;
      indicator.style.width = `${width}px`;
      indicator.style.opacity = "1";
      pill.classList.add("has-indicator");
    }
    function syncIndicatorWithActive() {
      const activeItem = pill?.querySelector(".topbar-nav-item.active");
      if (activeItem) {
        moveIndicatorTo(activeItem);
      }
    }
    window.DocuVerify = window.DocuVerify || {};
    window.DocuVerify.updateNavIndicator = syncIndicatorWithActive;
    if (pill) {
      pill.addEventListener("click", (e) => {
        const item = e.target.closest(".topbar-nav-item");
        if (item) {
          moveIndicatorTo(item);
        }
      });
      window.addEventListener("resize", () => {
        requestAnimationFrame(syncIndicatorWithActive);
      });
      requestAnimationFrame(() => {
        setTimeout(syncIndicatorWithActive, 40);
        setTimeout(syncIndicatorWithActive, 200);
      });
    }
  }

  // js/pages/home.js
  function renderHomePage(container) {
    container.innerHTML = `
    <div class="home-hero-container">
      <!-- Glow background -->
      <div class="home-hero-glow"></div>

      <!-- Hero Header -->
      <header class="home-hero-header">
        <h1 class="home-hero-title">
          Zero-Trust Document Verification for <em class="home-editorial-italic">Sovereign</em> Institutional Integrity
        </h1>

        <p class="home-hero-subtitle">
          Eliminating fraud through multi-layer computer vision, micro-print tamper detection, and immutable cryptographic hashing. Verify government, academic, and corporate credentials with sub-second certainty.
        </p>

        <!-- Call to Action Buttons -->
        <div class="home-hero-ctas">
          <a href="#verify" class="home-btn-hero-primary" id="hero-verify-cta">
            <i data-lucide="file-check-2" style="width:18px;height:18px;"></i>
            <span>Verify a Document</span>
          </a>
          <a href="#dashboard" class="home-btn-hero-secondary" id="hero-dashboard-cta">
            <i data-lucide="layout-dashboard" style="width:18px;height:18px;"></i>
            <span>Explore Officer Dashboard</span>
          </a>
        </div>

        <!-- Live Proof Facts Auto-Scrolling Carousel Marquee -->
        <div class="home-facts-carousel-section" aria-label="Live Verification Metrics">
          <div class="home-facts-carousel-container">
            <div class="home-facts-fade-left"></div>
            <div class="home-facts-fade-right"></div>
            <div class="home-facts-track">
              <!-- Set 1 -->
              <div class="home-facts-content">
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="shield-check"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">99.8%</span>
                    <span class="home-fact-lbl">Tamper Detection Rate</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="zap"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">&lt; 450ms</span>
                    <span class="home-fact-lbl">Verification Latency</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="blocks"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">100%</span>
                    <span class="home-fact-lbl">Immutable Hash Trail</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="file-text"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">1.2M+</span>
                    <span class="home-fact-lbl">Documents Secured</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="lock"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">0 False Positives</span>
                    <span class="home-fact-lbl">Cryptographic Truth</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="gauge"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">Sub-Second</span>
                    <span class="home-fact-lbl">Consensus Finality</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="cpu"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">SHA-256</span>
                    <span class="home-fact-lbl">Post-Quantum Security</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="activity"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">24/7 Live Sync</span>
                    <span class="home-fact-lbl">Statutory Consensus</span>
                  </div>
                </div>
              </div>
              <!-- Set 2 (for seamless loop) -->
              <div class="home-facts-content" aria-hidden="true">
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="shield-check"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">99.8%</span>
                    <span class="home-fact-lbl">Tamper Detection Rate</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="zap"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">&lt; 450ms</span>
                    <span class="home-fact-lbl">Verification Latency</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="blocks"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">100%</span>
                    <span class="home-fact-lbl">Immutable Hash Trail</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="file-text"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">1.2M+</span>
                    <span class="home-fact-lbl">Documents Secured</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="lock"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">0 False Positives</span>
                    <span class="home-fact-lbl">Cryptographic Truth</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="gauge"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">Sub-Second</span>
                    <span class="home-fact-lbl">Consensus Finality</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="cpu"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">SHA-256</span>
                    <span class="home-fact-lbl">Post-Quantum Security</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="activity"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">24/7 Live Sync</span>
                    <span class="home-fact-lbl">Statutory Consensus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Interactive SaaS Product Showcase -->
      <section class="home-showcase-wrapper" aria-label="Interactive Verification Showcase">
        <div class="home-showcase-card">
          <div class="home-showcase-header">
            <div class="home-showcase-dots">
              <span class="home-showcase-dot" style="background:#ef4444;"></span>
              <span class="home-showcase-dot" style="background:#f59e0b;"></span>
              <span class="home-showcase-dot" style="background:#10b981;"></span>
            </div>
            <div class="home-showcase-terminal-title">
              <i data-lucide="terminal" style="width:13px;height:13px;"></i>
              <span>AuthenX Core Engine \u2014 Real-time Forensic Stream</span>
            </div>
            <span class="badge badge-success" style="font-size:10px;">ENGINE ACTIVE</span>
          </div>

          <div class="home-showcase-body">
            <!-- Simulated Document Scanner -->
            <div class="home-scanner-preview">
              <div class="home-scanner-laser"></div>
              
              <div class="home-doc-mock">
                <div class="home-doc-mock-header">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <i data-lucide="file-badge-2" style="color:var(--color-accent-400);width:20px;height:20px;"></i>
                    <span style="font-weight:700;font-size:13px;">IN-GOV-2026-CERT-982</span>
                  </div>
                  <span class="home-verified-stamp">
                    <i data-lucide="shield-check" style="width:12px;height:12px;"></i> Genuine (99.4%)
                  </span>
                </div>

                <div class="home-doc-details">
                  <div class="home-doc-detail-row">
                    <span>DOCUMENT TYPE:</span>
                    <span style="color:#ffffff;">National Identity Credential</span>
                  </div>
                  <div class="home-doc-detail-row">
                    <span>ISSUING AUTHORITY:</span>
                    <span style="color:#ffffff;">Ministry of Institutional Governance</span>
                  </div>
                  <div class="home-doc-detail-row">
                    <span>CRYPTOGRAPHIC HASH:</span>
                    <span style="color:var(--color-cyan-400);">e3b0c44298fc1c149afbf4c8...</span>
                  </div>
                  <div class="home-doc-detail-row">
                    <span>WATERMARK INTEGRITY:</span>
                    <span style="color:#34d399;">PASSED (99.8% Match)</span>
                  </div>
                  <div class="home-doc-detail-row" style="border-bottom:none;">
                    <span>LAYER MODIFICATION SCAN:</span>
                    <span style="color:#34d399;">0 Alterations Detected</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Value Prop Bullets -->
            <div class="home-showcase-features">
              <div class="home-showcase-feature-item">
                <div class="home-feature-check-icon">
                  <i data-lucide="scan-line" style="width:14px;height:14px;"></i>
                </div>
                <div>
                  <div class="home-feature-title">Forensic Pixel & Font Analysis</div>
                  <div class="home-feature-sub">Deep neural models analyze kerning inconsistencies, font mismatches, and copy-move forgery at sub-pixel resolution.</div>
                </div>
              </div>

              <div class="home-showcase-feature-item">
                <div class="home-feature-check-icon">
                  <i data-lucide="fingerprint" style="width:14px;height:14px;"></i>
                </div>
                <div>
                  <div class="home-feature-title">Cryptographic SHA-256 Stamp</div>
                  <div class="home-feature-sub">Every issued certificate generates an immutable cryptographic signature cross-checked against authorized government ledgers.</div>
                </div>
              </div>

              <div class="home-showcase-feature-item">
                <div class="home-feature-check-icon">
                  <i data-lucide="check-circle-2" style="width:14px;height:14px;"></i>
                </div>
                <div>
                  <div class="home-feature-title">Sub-Second Automated Pass/Fail</div>
                  <div class="home-feature-sub">High-throughput verification terminal capable of auditing thousands of applications with zero human latency.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Editorial Capabilities Showcase (Inspired by Modern Editorial Aesthetics) -->
      <section class="home-editorial-showcase" aria-label="Engineered Capabilities Showcase">
        <!-- Top Editorial Header with Signature Font Pairing -->
        <div class="home-editorial-header">
          <div class="home-editorial-title-col">
            <h2 class="home-editorial-heading">
              Trust, <em class="home-editorial-italic">proven</em> out in the world.
            </h2>
          </div>
          <div class="home-editorial-desc-col">
            <p>From sovereign neural vision to immutable cryptographic&nbsp;seals.</p>
            <p>A unified architecture engineered from zero to national&nbsp;scale.</p>
          </div>
        </div>

        <!-- Numbered Tab Switcher Bar -->
        <div class="home-tab-strip" role="tablist" aria-label="Capabilities Tabs">
          <button class="home-tab-btn active" data-tab="01" role="tab" aria-selected="true" id="tab-btn-01">
            <span class="home-tab-num">01</span>
            <span class="home-tab-name">Forensic Vision</span>
            <i data-lucide="arrow-up-right" class="home-tab-arrow"></i>
          </button>
          <button class="home-tab-btn" data-tab="02" role="tab" aria-selected="false" id="tab-btn-02">
            <span class="home-tab-num">02</span>
            <span class="home-tab-name">Mobile Officer</span>
            <i data-lucide="arrow-up-right" class="home-tab-arrow"></i>
          </button>
          <button class="home-tab-btn" data-tab="03" role="tab" aria-selected="false" id="tab-btn-03">
            <span class="home-tab-num">03</span>
            <span class="home-tab-name">Sovereign Ledger</span>
            <i data-lucide="arrow-up-right" class="home-tab-arrow"></i>
          </button>
        </div>

        <!-- Dynamic Tab Content Viewport -->
        <div class="home-showcase-viewport">
          <!-- Panel 01: Forensic Vision -->
          <div class="home-showcase-panel active" id="panel-01" role="tabpanel">
            <!-- Left: Soft Ambient Tinted Container with Device Mockup -->
            <div class="home-panel-visual-box ambient-sage">
              <div class="home-visual-badge">FORENSIC ENGINE \xB7 AI VISION</div>
              
              <div class="phone-mockup">
                <div class="phone-speaker"></div>
                <div class="phone-screen">
                  <div class="phone-app-header">
                    <span class="phone-app-brand">AuthenX Vision</span>
                    <span class="phone-status-dot"></span>
                  </div>
                  <div class="phone-welcome-box">
                    <span class="phone-welcome-sub">ACTIVE SCANNER</span>
                    <div class="phone-welcome-title">Forensic Stream</div>
                  </div>
                  <div class="phone-doc-card">
                    <div class="phone-doc-chip">
                      <i data-lucide="file-check-2" style="width:14px;height:14px;color:var(--color-accent-400);"></i>
                      <span>CERT-2026-IN</span>
                    </div>
                    <div class="phone-confidence-bar">
                      <div class="phone-confidence-fill" style="width:99.4%;"></div>
                    </div>
                    <div class="phone-doc-metric">
                      <span>Tamper Probability</span>
                      <strong style="color:#10b981;">0.02% (PASS)</strong>
                    </div>
                  </div>
                  <div class="phone-action-row">
                    <button class="phone-btn-primary">
                      <i data-lucide="scan-line" style="width:14px;height:14px;"></i>
                      <span>Scan Document</span>
                    </button>
                    <button class="phone-btn-secondary">
                      <i data-lucide="clock" style="width:14px;height:14px;"></i>
                      <span>History</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Counter pill like 5,739 in reference -->
              <div class="home-visual-counter-badge">
                <span class="counter-num">5,739</span>
                <span class="counter-lbl">Live Audits Today</span>
              </div>
            </div>

            <!-- Right: Editorial Content -->
            <div class="home-panel-content">
              <div class="home-panel-overline">PERSONALIZED VERIFICATION \xB7 COMPUTER VISION</div>
              <h3 class="home-panel-title">The same document. An <em class="home-editorial-italic">unalterable</em> answer for every scan.</h3>
              <p class="home-panel-text">
                Snap the front of official credentials to understand their integrity in real time. AuthenX is built around institutional context, detecting multi-layer copy-move forgery, font mismatches, and micro-print anomalies in under 450 milliseconds.
              </p>
              <div class="home-panel-pills">
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Sub-pixel Font Inspection</span>
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Spectral Tamper Heatmap</span>
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> 99.8% Precision Rate</span>
              </div>
              <div class="home-panel-footer">
                <a href="#verify" class="home-panel-cta">
                  <span>Launch Forensic Inspector</span>
                  <i data-lucide="arrow-right" style="width:16px;height:16px;"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Panel 02: Mobile Officer -->
          <div class="home-showcase-panel" id="panel-02" role="tabpanel" style="display:none;">
            <!-- Left: Soft Ambient Tinted Container with Device Mockup -->
            <div class="home-panel-visual-box ambient-slate">
              <div class="home-visual-badge">FIELD AGENT APPARATUS</div>
              
              <div class="phone-mockup">
                <div class="phone-speaker"></div>
                <div class="phone-screen">
                  <div class="phone-app-header">
                    <span class="phone-app-brand">Officer Terminal</span>
                    <span class="phone-officer-badge">SEC-LVL-4</span>
                  </div>
                  <div class="phone-welcome-box">
                    <span class="phone-welcome-sub">OFFICER ON DUTY</span>
                    <div class="phone-welcome-title">Rahul Sharma</div>
                  </div>
                  <div class="phone-doc-card">
                    <div class="phone-doc-chip" style="background:rgba(37,99,235,0.2);color:#93c5fd;">
                      <i data-lucide="qr-code" style="width:14px;height:14px;"></i>
                      <span>NFC & QR SENSOR</span>
                    </div>
                    <div class="phone-doc-metric" style="margin-top:10px;">
                      <span>Security Handshake</span>
                      <strong style="color:#60a5fa;">ESTABLISHED</strong>
                    </div>
                    <div class="phone-doc-metric">
                      <span>GPS Seal</span>
                      <strong>NEW DELHI CP \xB7 28.61\xB0N</strong>
                    </div>
                  </div>
                  <div class="phone-action-row">
                    <button class="phone-btn-primary" style="background:#2563eb;">
                      <i data-lucide="camera" style="width:14px;height:14px;"></i>
                      <span>Field Scan</span>
                    </button>
                    <button class="phone-btn-secondary">
                      <i data-lucide="shield" style="width:14px;height:14px;"></i>
                      <span>Vault</span>
                    </button>
                  </div>
                </div>
              </div>

              <div class="home-visual-counter-badge">
                <span class="counter-num">1,842</span>
                <span class="counter-lbl">Field Officers Active</span>
              </div>
            </div>

            <!-- Right: Editorial Content -->
            <div class="home-panel-content">
              <div class="home-panel-overline">FIELD OPERATIONS \xB7 ZERO-CONNECTIVITY FALLBACK</div>
              <h3 class="home-panel-title">At the border or in the field. Sovereign <em class="home-editorial-italic">certainty</em> in your palm.</h3>
              <p class="home-panel-text">
                Designed for field verification officers operating in checkpoints, consulates, and remote administrative centers. Authenticate biometric signatures, MRZ passports, and encrypted QR codes even when local cellular connectivity is offline.
              </p>
              <div class="home-panel-pills">
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Offline Cryptographic Verification</span>
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Dual Optical & NFC Capture</span>
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Officer Identity Ledger</span>
              </div>
              <div class="home-panel-footer">
                <a href="#dashboard" class="home-panel-cta">
                  <span>Explore Field Telemetry</span>
                  <i data-lucide="arrow-right" style="width:16px;height:16px;"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Panel 03: Sovereign Ledger -->
          <div class="home-showcase-panel" id="panel-03" role="tabpanel" style="display:none;">
            <!-- Left: Soft Ambient Tinted Container with Ledger Mockup -->
            <div class="home-panel-visual-box ambient-emerald">
              <div class="home-visual-badge">MERKLE ANCHORAGE</div>
              
              <div class="ledger-mockup-card">
                <div class="ledger-mockup-header">
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span class="ledger-dot"></span>
                    <span style="font-weight:700;font-size:12px;letter-spacing:0.05em;color:#10b981;">BLOCK #48,192 SEALED</span>
                  </div>
                  <span class="ledger-tag">IMMUTABLE</span>
                </div>
                <div class="ledger-mockup-body">
                  <div class="ledger-row">
                    <span>ROOT MERKLE:</span>
                    <code>0x9f8e...4b21a8</code>
                  </div>
                  <div class="ledger-row">
                    <span>SIGNATURE:</span>
                    <code>ed25519:gov-node-01</code>
                  </div>
                  <div class="ledger-row">
                    <span>TIMESTAMP:</span>
                    <span>2026-09-07T11:45:12Z</span>
                  </div>
                  <div class="ledger-row" style="border-bottom:none;">
                    <span>ATTESTATION:</span>
                    <span style="color:#10b981;font-weight:600;">12/12 VALIDATORS PASSED</span>
                  </div>
                </div>
              </div>

              <div class="home-visual-counter-badge">
                <span class="counter-num">100%</span>
                <span class="counter-lbl">Audit Integrity Proof</span>
              </div>
            </div>

            <!-- Right: Editorial Content -->
            <div class="home-panel-content">
              <div class="home-panel-overline">DISTRIBUTED CONSENSUS \xB7 MERKLE ROOTS</div>
              <h3 class="home-panel-title">Decentralized trust. No <em class="home-editorial-italic">single</em> point of failure.</h3>
              <p class="home-panel-text">
                Anchor verification hashes to distributed national government ledgers. Once recorded, document proofs cannot be revised, reissued, or backdated by unauthorized actors or compromised internal databases.
              </p>
              <div class="home-panel-pills">
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Multi-Node Merkle Trees</span>
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Post-Quantum Readiness</span>
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Real-time Statutory Audits</span>
              </div>
              <div class="home-panel-footer">
                <a href="#analytics" class="home-panel-cta">
                  <span>View Consensus Metrics</span>
                  <i data-lucide="arrow-right" style="width:16px;height:16px;"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Mission Objectives Section -->
      <section class="home-pillars-section" aria-label="Strategic Objectives">
        <div class="home-pillars-header">
          <h2>Engineered for <em class="home-editorial-italic">National-Scale</em> Institutional Trust</h2>
          <p>AuthenX combines cryptographic precision and automated intelligence to solve Problem Statement 188.</p>
        </div>

        <div class="home-pillars-grid">
          <div class="home-pillar-card">
            <div class="home-pillar-icon">
              <i data-lucide="shield-alert"></i>
            </div>
            <h3 class="home-pillar-title">Eliminate Counterfeit Documents</h3>
            <p class="home-pillar-desc">
              Prevent unauthorized individuals from bypassing identity, citizenship, or academic checks with sophisticated AI tamper-detection layers.
            </p>
          </div>

          <div class="home-pillar-card">
            <div class="home-pillar-icon">
              <i data-lucide="cpu"></i>
            </div>
            <h3 class="home-pillar-title">Zero-Latency Automated Processing</h3>
            <p class="home-pillar-desc">
              Replace manual, backlog-prone document review pipelines with automated optical character recognition, QR decoding, and integrity scoring.
            </p>
          </div>

          <div class="home-pillar-card">
            <div class="home-pillar-icon">
              <i data-lucide="lock"></i>
            </div>
            <h3 class="home-pillar-title">Immutable Audit Trail</h3>
            <p class="home-pillar-desc">
              Every verification decision is logged with cryptographic timestamps, officer signatures, and audit logs to ensure statutory compliance.
            </p>
          </div>
        </div>
      </section>

      </section>
    </div>
  `;
    const tabButtons = container.querySelectorAll(".home-tab-btn");
    const panels = container.querySelectorAll(".home-showcase-panel");
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        tabButtons.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        panels.forEach((panel) => {
          if (panel.id === `panel-${targetTab}`) {
            panel.style.display = "grid";
            panel.classList.add("active");
          } else {
            panel.style.display = "none";
            panel.classList.remove("active");
          }
        });
        if (window.lucide && typeof window.lucide.createIcons === "function") {
          window.lucide.createIcons();
        }
      });
    });
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  // js/data/mockData.js
  var kpiData = [
    {
      id: "docs-verified",
      label: "Documents Verified",
      value: "12,486",
      change: "+12.3%",
      changeDir: "up",
      icon: "file-check-2",
      color: "blue"
    },
    {
      id: "verified-success",
      label: "Verified Successfully",
      value: "11,972",
      change: "+8.7%",
      changeDir: "up",
      icon: "shield-check",
      color: "green"
    },
    {
      id: "suspicious-docs",
      label: "Suspicious Documents",
      value: "314",
      change: "+2.1%",
      changeDir: "up",
      icon: "alert-triangle",
      color: "amber"
    },
    {
      id: "pending-verification",
      label: "Pending Verification",
      value: "200",
      change: "-5.4%",
      changeDir: "down",
      icon: "clock",
      color: "cyan"
    },
    {
      id: "accuracy",
      label: "Verification Accuracy",
      value: "98.7%",
      change: "+0.3%",
      changeDir: "up",
      icon: "target",
      color: "green"
    }
  ];
  var recentActivity = [
    {
      id: "VER-20260906-001",
      docType: "Birth Certificate",
      submittedBy: "Ananya Sharma",
      status: "verified",
      riskScore: 2,
      timestamp: "2 min ago",
      docId: "DOC-2026-008421"
    },
    {
      id: "VER-20260906-002",
      docType: "Degree Certificate",
      submittedBy: "Rajesh Kumar",
      status: "suspicious",
      riskScore: 87,
      timestamp: "8 min ago",
      docId: "DOC-2026-008420"
    },
    {
      id: "VER-20260906-003",
      docType: "Aadhaar Card",
      submittedBy: "Priya Patel",
      status: "verified",
      riskScore: 1,
      timestamp: "15 min ago",
      docId: "DOC-2026-008419"
    },
    {
      id: "VER-20260906-004",
      docType: "Income Certificate",
      submittedBy: "Vikram Singh",
      status: "pending",
      riskScore: null,
      timestamp: "22 min ago",
      docId: "DOC-2026-008418"
    },
    {
      id: "VER-20260906-005",
      docType: "PAN Card",
      submittedBy: "Meera Nair",
      status: "verified",
      riskScore: 3,
      timestamp: "35 min ago",
      docId: "DOC-2026-008417"
    },
    {
      id: "VER-20260906-006",
      docType: "Driving License",
      submittedBy: "Arjun Reddy",
      status: "failed",
      riskScore: 94,
      timestamp: "41 min ago",
      docId: "DOC-2026-008416"
    },
    {
      id: "VER-20260906-007",
      docType: "Passport",
      submittedBy: "Deepa Menon",
      status: "verified",
      riskScore: 4,
      timestamp: "1 hr ago",
      docId: "DOC-2026-008415"
    },
    {
      id: "VER-20260906-008",
      docType: "Caste Certificate",
      submittedBy: "Suresh Yadav",
      status: "verified",
      riskScore: 2,
      timestamp: "1 hr ago",
      docId: "DOC-2026-008414"
    }
  ];
  var securityServices = [
    { name: "Blockchain Integrity", icon: "link", status: "operational", detail: "99.99% uptime" },
    { name: "OCR Service", icon: "scan-text", status: "operational", detail: "Avg. 1.2s response" },
    { name: "Document Analysis", icon: "file-search", status: "operational", detail: "All models loaded" },
    { name: "Digital Signature Verification", icon: "pen-tool", status: "operational", detail: "PKI connected" },
    { name: "System Uptime", icon: "activity", status: "operational", detail: "99.97% (30d)" }
  ];
  var chartData7d = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    verified: [285, 312, 298, 340, 365, 190, 145],
    suspicious: [8, 12, 6, 14, 9, 4, 3],
    failed: [3, 5, 2, 7, 4, 1, 1]
  };
  var chartData30d = {
    labels: ["W1", "W2", "W3", "W4"],
    verified: [1850, 2100, 1970, 2240],
    suspicious: [42, 56, 38, 51],
    failed: [14, 19, 11, 18]
  };
  var chartData3m = {
    labels: ["Jul", "Aug", "Sep"],
    verified: [7200, 8100, 8900],
    suspicious: [180, 210, 195],
    failed: [52, 61, 48]
  };
  var verificationResult = {
    status: "verified",
    authenticityScore: 98.6,
    tamperingRisk: 1.2,
    dataConsistency: 99.1,
    blockchainMatch: "Verified",
    checks: [
      { name: "Document structure validated", status: "pass", desc: "Document layout matches expected template for Certificate type", time: "14:32:02" },
      { name: "OCR data successfully extracted", status: "pass", desc: "14 fields extracted with 99.8% confidence", time: "14:32:04" },
      { name: "Metadata consistent", status: "pass", desc: "Creation date, author, and encoding match expected values", time: "14:32:05" },
      { name: "No significant visual tampering detected", status: "pass", desc: "Error Level Analysis shows no manipulation artifacts", time: "14:32:06" },
      { name: "Digital signature verified", status: "pass", desc: "RSA-2048 signature validated against issuing authority's public key", time: "14:32:07" },
      { name: "Document hash matched", status: "pass", desc: "SHA-256 hash matches registered document fingerprint", time: "14:32:08" },
      { name: "Blockchain record confirmed", status: "pass", desc: "Document hash found in Block #18,492,103 of the verification network", time: "14:32:09" }
    ],
    documentInfo: {
      type: "Certificate",
      docId: "DOC-2026-008421",
      name: "Ananya Sharma",
      issueDate: "12 March 2026",
      issuingAuthority: "Central Board of Education",
      docNumber: "CERT-48291",
      category: "Educational",
      format: "PDF/A-1b"
    },
    blockchain: {
      hash: "8f72d4e1b3c9a7f0e2d5b8c4a1f3e6d9b2c5a8f7e0d3c6b9a2f5e8d1c4b7a91c",
      status: "MATCHED",
      recordId: "BLK-492810",
      blockNumber: "18,492,103",
      timestamp: "12 Mar 2026, 14:32:18",
      network: "Institutional Verification Network",
      prevBlocks: [
        { number: "18,492,101", label: "Block" },
        { number: "18,492,102", label: "Block" },
        { number: "18,492,103", label: "Current Record", highlight: true }
      ]
    }
  };
  var suspiciousResult = {
    status: "suspicious",
    authenticityScore: 13,
    tamperingRisk: 87,
    dataConsistency: 42.5,
    blockchainMatch: "Not Found",
    checks: [
      { name: "Document structure validated", status: "pass", desc: "Document layout matches expected template", time: "14:45:02" },
      { name: "OCR data extracted with warnings", status: "warn", desc: "9 fields extracted, 3 fields showed low confidence (<70%)", time: "14:45:05" },
      { name: "Metadata inconsistencies found", status: "fail", desc: "Document creation date predates issuing authority establishment", time: "14:45:06" },
      { name: "Possible image manipulation detected", status: "fail", desc: "Error Level Analysis detected anomalies in seal and signature regions", time: "14:45:08" },
      { name: "Digital signature could not be verified", status: "fail", desc: "Signature does not match any registered authority public key", time: "14:45:09" },
      { name: "Document hash mismatch", status: "fail", desc: "Computed hash does not match any registered document fingerprint", time: "14:45:10" },
      { name: "QR code validation failed", status: "fail", desc: "Embedded QR code data does not match document metadata", time: "14:45:11" }
    ],
    reasons: [
      "Document hash does not match registered record",
      "Inconsistent metadata detected",
      "Possible image manipulation in seal region",
      "QR code could not be validated"
    ]
  };
  var verificationHistory = [
    { id: "VER-20260906-001", document: "Birth_Certificate_AS.pdf", docType: "Birth Certificate", submittedBy: "Ananya Sharma", date: "06 Sep 2026, 14:32", score: 98.6, risk: "Low", status: "verified" },
    { id: "VER-20260906-002", document: "Degree_RK.pdf", docType: "Degree Certificate", submittedBy: "Rajesh Kumar", date: "06 Sep 2026, 14:25", score: 13, risk: "Critical", status: "failed" },
    { id: "VER-20260906-003", document: "Aadhaar_PP.pdf", docType: "Aadhaar Card", submittedBy: "Priya Patel", date: "06 Sep 2026, 14:18", score: 99.2, risk: "Low", status: "verified" },
    { id: "VER-20260906-004", document: "Income_Cert_VS.pdf", docType: "Income Certificate", submittedBy: "Vikram Singh", date: "06 Sep 2026, 14:10", score: null, risk: "Pending", status: "pending" },
    { id: "VER-20260906-005", document: "PAN_MN.jpg", docType: "PAN Card", submittedBy: "Meera Nair", date: "06 Sep 2026, 13:55", score: 97.8, risk: "Low", status: "verified" },
    { id: "VER-20260906-006", document: "DL_AR.pdf", docType: "Driving License", submittedBy: "Arjun Reddy", date: "06 Sep 2026, 13:48", score: 6, risk: "Critical", status: "failed" },
    { id: "VER-20260906-007", document: "Passport_DM.pdf", docType: "Passport", submittedBy: "Deepa Menon", date: "06 Sep 2026, 13:30", score: 96.4, risk: "Low", status: "verified" },
    { id: "VER-20260906-008", document: "Caste_SY.pdf", docType: "Caste Certificate", submittedBy: "Suresh Yadav", date: "06 Sep 2026, 13:15", score: 98.1, risk: "Low", status: "verified" },
    { id: "VER-20260905-009", document: "Marksheet_KG.pdf", docType: "Marksheet", submittedBy: "Kavya Gupta", date: "05 Sep 2026, 17:42", score: 45, risk: "High", status: "suspicious" },
    { id: "VER-20260905-010", document: "Domicile_RJ.pdf", docType: "Domicile Certificate", submittedBy: "Rohit Joshi", date: "05 Sep 2026, 16:30", score: 99.5, risk: "Low", status: "verified" },
    { id: "VER-20260905-011", document: "Transfer_NK.pdf", docType: "Transfer Certificate", submittedBy: "Neha Kulkarni", date: "05 Sep 2026, 15:20", score: 62, risk: "Medium", status: "suspicious" },
    { id: "VER-20260905-012", document: "Experience_AM.pdf", docType: "Experience Letter", submittedBy: "Arun Mehta", date: "05 Sep 2026, 14:05", score: 97.3, risk: "Low", status: "verified" }
  ];
  var documents = [
    { id: "DOC-2026-008421", name: "Birth Certificate \u2014 Ananya Sharma", type: "Birth Certificate", authority: "Municipal Corporation, Mumbai", regStatus: "Registered", blockchainStatus: "Verified", lastVerified: "06 Sep 2026", format: "PDF" },
    { id: "DOC-2026-008420", name: "B.Tech Degree \u2014 Rajesh Kumar", type: "Degree Certificate", authority: "IIT Delhi", regStatus: "Unregistered", blockchainStatus: "Not Found", lastVerified: "06 Sep 2026", format: "PDF" },
    { id: "DOC-2026-008419", name: "Aadhaar Card \u2014 Priya Patel", type: "Aadhaar Card", authority: "UIDAI", regStatus: "Registered", blockchainStatus: "Verified", lastVerified: "06 Sep 2026", format: "PDF" },
    { id: "DOC-2026-008418", name: "Income Certificate \u2014 Vikram Singh", type: "Income Certificate", authority: "District Magistrate, Lucknow", regStatus: "Pending", blockchainStatus: "Pending", lastVerified: "N/A", format: "PDF" },
    { id: "DOC-2026-008417", name: "PAN Card \u2014 Meera Nair", type: "PAN Card", authority: "Income Tax Dept.", regStatus: "Registered", blockchainStatus: "Verified", lastVerified: "06 Sep 2026", format: "JPG" },
    { id: "DOC-2026-008416", name: "Driving License \u2014 Arjun Reddy", type: "Driving License", authority: "RTO Hyderabad", regStatus: "Flagged", blockchainStatus: "Mismatch", lastVerified: "06 Sep 2026", format: "PDF" },
    { id: "DOC-2026-008415", name: "Passport \u2014 Deepa Menon", type: "Passport", authority: "MEA, Govt. of India", regStatus: "Registered", blockchainStatus: "Verified", lastVerified: "06 Sep 2026", format: "PDF" },
    { id: "DOC-2026-008414", name: "Caste Certificate \u2014 Suresh Yadav", type: "Caste Certificate", authority: "SDM Office, Patna", regStatus: "Registered", blockchainStatus: "Verified", lastVerified: "06 Sep 2026", format: "PDF" }
  ];
  var alerts = [
    { id: "ALT-001", severity: "critical", title: "Document Hash Mismatch Detected", description: "The submitted degree certificate (DOC-2026-008420) hash does not match any registered record in the blockchain ledger.", docId: "DOC-2026-008420", timestamp: "06 Sep 2026, 14:25", status: "Open" },
    { id: "ALT-002", severity: "critical", title: "Possible Image Manipulation", description: "Error Level Analysis detected significant anomalies in the seal and signature regions of the driving license (DOC-2026-008416).", docId: "DOC-2026-008416", timestamp: "06 Sep 2026, 13:48", status: "Under Review" },
    { id: "ALT-003", severity: "warning", title: "Multiple Failed Verification Attempts", description: "3 consecutive failed verification attempts from the same source in the last 2 hours.", docId: "Multiple", timestamp: "06 Sep 2026, 13:15", status: "Monitoring" },
    { id: "ALT-004", severity: "warning", title: "Unregistered Document Identifier", description: "The submitted marksheet (DOC-2026-008413) uses an identifier format not recognized by any registered issuing authority.", docId: "DOC-2026-008413", timestamp: "05 Sep 2026, 17:42", status: "Open" },
    { id: "ALT-005", severity: "warning", title: "OCR Confidence Below Threshold", description: "Multiple fields in the transfer certificate (DOC-2026-008412) were extracted with less than 70% confidence.", docId: "DOC-2026-008412", timestamp: "05 Sep 2026, 15:20", status: "Resolved" },
    { id: "ALT-006", severity: "info", title: "System Maintenance Scheduled", description: "Blockchain verification node maintenance window scheduled for 07 Sep 2026, 02:00-04:00 IST.", docId: "N/A", timestamp: "05 Sep 2026, 10:00", status: "Acknowledged" },
    { id: "ALT-007", severity: "info", title: "New Issuing Authority Registered", description: "District Magistrate Office, Varanasi has been added to the trusted authority registry.", docId: "N/A", timestamp: "04 Sep 2026, 16:30", status: "Acknowledged" },
    { id: "ALT-008", severity: "critical", title: "Duplicate Document Submission", description: "The same document hash was submitted twice under different names within 30 minutes.", docId: "DOC-2026-008410", timestamp: "04 Sep 2026, 11:22", status: "Resolved" }
  ];
  var analyticsData = {
    volumeLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    volumeData: [4200, 4800, 5100, 5600, 6200, 6800, 7200, 8100, 8900],
    successRateLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    successRateData: [96.2, 96.5, 97.1, 97.3, 97.8, 98, 98.2, 98.5, 98.7],
    suspiciousTrendLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    suspiciousTrendData: [120, 135, 118, 142, 155, 168, 180, 210, 195],
    docTypes: {
      labels: ["Certificate", "ID Card", "License", "Passport", "Marksheet", "Other"],
      data: [3200, 2800, 1500, 1200, 2100, 1686]
    },
    riskDistribution: {
      labels: ["Low (0-20%)", "Medium (20-50%)", "High (50-80%)", "Critical (80-100%)"],
      data: [11972, 245, 155, 114]
    },
    processingTime: {
      labels: ["<2s", "2-5s", "5-10s", "10-15s", ">15s"],
      data: [4500, 5200, 2100, 480, 206]
    }
  };
  var analyticsKPIs = [
    { label: "Avg. Processing Time", value: "4.2s", icon: "timer" },
    { label: "Peak Daily Volume", value: "486", icon: "trending-up" },
    { label: "Active Authorities", value: "142", icon: "building" },
    { label: "Blockchain Records", value: "18.4M", icon: "database" }
  ];

  // js/components/charts.js
  var baseFont = "'Inter', sans-serif";
  var colors = {
    accent: "#2563EB",
    accentLight: "rgba(37, 99, 235, 0.1)",
    success: "#10B981",
    successLight: "rgba(16, 185, 129, 0.1)",
    warning: "#F59E0B",
    warningLight: "rgba(245, 158, 11, 0.1)",
    danger: "#EF4444",
    dangerLight: "rgba(239, 68, 68, 0.1)",
    cyan: "#06B6D4",
    cyanLight: "rgba(6, 182, 212, 0.1)",
    gray: "#94A3B8",
    grayLight: "#F1F5F9",
    border: "#E2E8F0",
    text: "#334155",
    textSecondary: "#64748B"
  };
  var chartDefaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "end",
        labels: {
          font: { family: baseFont, size: 12 },
          color: colors.textSecondary,
          usePointStyle: true,
          pointStyle: "circle",
          padding: 16
        }
      },
      tooltip: {
        backgroundColor: "#0F172A",
        titleFont: { family: baseFont, size: 13 },
        bodyFont: { family: baseFont, size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        boxPadding: 4
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { family: baseFont, size: 11 },
          color: colors.textSecondary
        },
        border: { display: false }
      },
      y: {
        grid: { color: colors.border, lineWidth: 1 },
        ticks: {
          font: { family: baseFont, size: 11 },
          color: colors.textSecondary,
          padding: 8
        },
        border: { display: false }
      }
    }
  };
  function createLineChart(canvasId, labels, datasets) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    if (typeof Chart === "undefined") {
      console.warn("Chart.js not loaded yet for canvas:", canvasId);
      return null;
    }
    return new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: datasets.map((ds) => ({
          ...ds,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          tension: 0.35,
          fill: ds.fill !== void 0 ? ds.fill : false
        }))
      },
      options: {
        ...chartDefaults,
        interaction: {
          mode: "index",
          intersect: false
        }
      }
    });
  }
  function createBarChart(canvasId, labels, datasets) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    if (typeof Chart === "undefined") {
      console.warn("Chart.js not loaded yet for canvas:", canvasId);
      return null;
    }
    return new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: datasets.map((ds) => ({
          ...ds,
          borderRadius: 4,
          borderWidth: 0,
          maxBarThickness: 40
        }))
      },
      options: {
        ...chartDefaults,
        scales: {
          ...chartDefaults.scales,
          x: {
            ...chartDefaults.scales.x,
            grid: { display: false }
          }
        }
      }
    });
  }
  function createDoughnutChart(canvasId, labels, data, backgroundColors) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    if (typeof Chart === "undefined") {
      console.warn("Chart.js not loaded yet for canvas:", canvasId);
      return null;
    }
    return new Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: backgroundColors || [
            colors.accent,
            colors.success,
            colors.warning,
            colors.danger,
            colors.cyan,
            colors.gray
          ],
          borderWidth: 2,
          borderColor: "#FFFFFF",
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "65%",
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: { family: baseFont, size: 12 },
              color: colors.textSecondary,
              usePointStyle: true,
              pointStyle: "circle",
              padding: 16
            }
          },
          tooltip: chartDefaults.plugins.tooltip
        }
      }
    });
  }
  function createAreaChart(canvasId, labels, datasets) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return null;
    return new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: datasets.map((ds) => ({
          ...ds,
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          tension: 0.4,
          fill: true
        }))
      },
      options: {
        ...chartDefaults,
        interaction: {
          mode: "index",
          intersect: false
        }
      }
    });
  }

  // js/pages/dashboard.js
  var verificationChart = null;
  function renderDashboard(container) {
    container.innerHTML = `
    <div class="page-header">
      <h1>Document Authentication & <em class="editorial-italic">Operational</em> Telemetry</h1>
      <p>Monitor document verification activity, authenticity results, and security alerts.</p>
    </div>

    <!-- KPI Cards -->
    <div class="kpi-grid">
      ${kpiData.map((kpi) => `
        <div class="kpi-card" id="kpi-${kpi.id}">
          <div class="kpi-card-top">
            <div>
              <div class="kpi-card-value">${kpi.value}</div>
              <div class="kpi-card-label">${kpi.label}</div>
            </div>
            <div class="kpi-card-icon ${kpi.color}">
              <i data-lucide="${kpi.icon}"></i>
            </div>
          </div>
          <span class="kpi-card-change ${kpi.changeDir}">
            <i data-lucide="${kpi.changeDir === "up" ? "trending-up" : "trending-down"}"></i>
            ${kpi.change} vs last month
          </span>
        </div>
      `).join("")}
    </div>

    <!-- Verification Activity Chart -->
    <div class="card chart-card">
      <div class="card-header">
        <h3>Verification Activity</h3>
        <div class="tabs" id="chart-period-tabs">
          <button class="tab-btn active" data-period="7d">7 Days</button>
          <button class="tab-btn" data-period="30d">30 Days</button>
          <button class="tab-btn" data-period="3m">3 Months</button>
        </div>
      </div>
      <div class="card-body">
        <div class="chart-container">
          <canvas id="verification-chart"></canvas>
        </div>
      </div>
    </div>

    <!-- Two Column Layout -->
    <div class="dashboard-grid">
      <!-- Recent Activity -->
      <div class="card">
        <div class="card-header">
          <h3>Recent Verification Activity</h3>
          <button class="btn btn-ghost btn-sm" onclick="location.hash='history'">View All</button>
        </div>
        <div class="card-body" style="padding:0;">
          <div class="table-container" style="border:none;border-radius:0;">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Document ID</th>
                  <th>Type</th>
                  <th>Submitted By</th>
                  <th>Status</th>
                  <th>Risk</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                ${recentActivity.map((item) => `
                  <tr>
                    <td class="table-cell-id">${item.id}</td>
                    <td>${item.docType}</td>
                    <td>${item.submittedBy}</td>
                    <td>${getStatusBadge(item.status)}</td>
                    <td>${getRiskIndicator(item.riskScore)}</td>
                    <td class="text-sm text-tertiary">${item.timestamp}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Security Overview -->
      <div class="card">
        <div class="card-header">
          <h3>Security Overview</h3>
          <span class="badge badge-success"><i data-lucide="check-circle"></i> All Operational</span>
        </div>
        <div class="card-body">
          <div class="security-list">
            ${securityServices.map((svc) => `
              <div class="security-item">
                <div class="security-item-left">
                  <i data-lucide="${svc.icon}"></i>
                  <span class="security-item-name">${svc.name}</span>
                </div>
                <div class="security-status ${svc.status}">
                  <span class="status-dot green"></span>
                  ${svc.detail}
                </div>
              </div>
            `).join("")}
          </div>
          <div class="divider"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div class="uptime-value">99.97%</div>
              <div class="uptime-label">System Uptime (30 days)</div>
            </div>
            <div>
              <div class="uptime-value" style="color:var(--color-success-600);">Operational</div>
              <div class="uptime-label">Overall Status</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
    if (window.lucide) lucide.createIcons();
    initChart("7d");
    document.getElementById("chart-period-tabs").addEventListener("click", (e) => {
      if (e.target.classList.contains("tab-btn")) {
        document.querySelectorAll("#chart-period-tabs .tab-btn").forEach((t) => t.classList.remove("active"));
        e.target.classList.add("active");
        initChart(e.target.dataset.period);
      }
    });
  }
  function initChart(period) {
    try {
      if (verificationChart && typeof verificationChart.destroy === "function") {
        verificationChart.destroy();
        verificationChart = null;
      }
      const dataMap = { "7d": chartData7d, "30d": chartData30d, "3m": chartData3m };
      const data = dataMap[period] || chartData7d;
      if (!data) return;
      verificationChart = createLineChart("verification-chart", data.labels, [
        {
          label: "Verified",
          data: data.verified,
          borderColor: colors.success,
          backgroundColor: colors.successLight,
          fill: true
        },
        {
          label: "Suspicious",
          data: data.suspicious,
          borderColor: colors.warning,
          backgroundColor: colors.warningLight,
          fill: false
        },
        {
          label: "Failed",
          data: data.failed,
          borderColor: colors.danger,
          backgroundColor: colors.dangerLight,
          fill: false
        }
      ]);
    } catch (err) {
      console.warn("Dashboard chart render skipped or deferred:", err);
    }
  }
  function getStatusBadge(status) {
    const map = {
      "verified": '<span class="badge badge-verified"><i data-lucide="check-circle"></i> Verified</span>',
      "suspicious": '<span class="badge badge-suspicious"><i data-lucide="alert-triangle"></i> Suspicious</span>',
      "failed": '<span class="badge badge-failed"><i data-lucide="x-circle"></i> Failed</span>',
      "pending": '<span class="badge badge-pending"><i data-lucide="clock"></i> Pending</span>'
    };
    return map[status] || status;
  }
  function getRiskIndicator(score) {
    if (score === null) return '<span class="text-tertiary text-xs">\u2014</span>';
    let color = "green";
    let label = "Low";
    if (score > 80) {
      color = "red";
      label = "Critical";
    } else if (score > 50) {
      color = "amber";
      label = "High";
    } else if (score > 20) {
      color = "blue";
      label = "Medium";
    }
    return `
    <div class="score-bar">
      <div class="score-bar-track">
        <div class="score-bar-fill" style="width:${score}%;background:var(--color-${color === "amber" ? "warning" : color === "red" ? "danger" : color === "blue" ? "accent" : "success"}-500);"></div>
      </div>
      <span class="score-value">${score}%</span>
    </div>
  `;
  }

  // js/components/modals.js
  function showModal(title, bodyHTML, footerHTML = "") {
    closeModal(true);
    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.id = "active-modal";
    modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="btn btn-ghost btn-icon" onclick="window.DocuVerify.closeModal()">
          <i data-lucide="x"></i>
        </button>
      </div>
      <div class="modal-body">
        ${bodyHTML}
      </div>
      ${footerHTML ? `<div class="modal-footer">${footerHTML}</div>` : ""}
    </div>
  `;
    document.body.appendChild(modal);
    if (window.lucide) lucide.createIcons();
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    const escHandler = (e) => {
      if (e.key === "Escape") {
        closeModal();
        document.removeEventListener("keydown", escHandler);
      }
    };
    document.addEventListener("keydown", escHandler);
  }
  var activeCloseTimeout = null;
  function closeModal(immediate = false) {
    if (activeCloseTimeout) {
      clearTimeout(activeCloseTimeout);
      activeCloseTimeout = null;
    }
    const modal = document.getElementById("active-modal");
    if (modal) {
      if (immediate) {
        modal.remove();
      } else {
        modal.removeAttribute("id");
        modal.style.opacity = "0";
        activeCloseTimeout = setTimeout(() => {
          modal.remove();
          activeCloseTimeout = null;
        }, 150);
      }
    }
    if (immediate) {
      document.querySelectorAll(".modal-backdrop").forEach((m) => m.remove());
    }
  }
  function showConfirmDialog(title, message, confirmText, onConfirm) {
    showModal(
      title,
      `<p style="color:var(--text-secondary);font-size:var(--text-sm);">${message}</p>`,
      `
      <button class="btn btn-secondary" onclick="window.DocuVerify.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="confirm-action-btn">${confirmText}</button>
    `
    );
    setTimeout(() => {
      const btn = document.getElementById("confirm-action-btn");
      if (btn) {
        btn.addEventListener("click", () => {
          if (onConfirm) onConfirm();
          closeModal();
        });
      }
    }, 50);
  }
  function openDocumentSearchModal(initialQuery = "") {
    closeModal(true);
    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.id = "active-modal";
    modal.innerHTML = `
    <div class="modal modal-lg" style="max-width: 800px;">
      <div class="modal-header" style="border-bottom: 1px solid var(--border-light); padding: var(--space-4) var(--space-6);">
        <div style="display:flex;align-items:center;gap:var(--space-3);flex:1;">
          <i data-lucide="search" style="width:20px;height:20px;color:var(--text-tertiary);"></i>
          <input type="text" id="doc-modal-search-input" value="${initialQuery}" placeholder="Search document repository by name, ID (DOC-...), authority..." style="width:100%;border:none;outline:none;font-size:var(--text-md);background:transparent;color:var(--text-primary);" autofocus />
        </div>
        <button class="btn btn-ghost btn-icon" onclick="window.DocuVerify.closeModal()">
          <i data-lucide="x"></i>
        </button>
      </div>

      <div class="modal-body" style="padding: var(--space-4) var(--space-6);">
        <!-- Category Filter Pills -->
        <div style="display:flex;gap:var(--space-2);margin-bottom:var(--space-4);overflow-x:auto;padding-bottom:4px;">
          <button class="btn btn-xs doc-filter-pill active" data-filter="all">All Documents (${documents.length})</button>
          <button class="btn btn-xs doc-filter-pill" data-filter="Degree Certificate">Degrees</button>
          <button class="btn btn-xs doc-filter-pill" data-filter="ID Card">Government IDs</button>
          <button class="btn btn-xs doc-filter-pill" data-filter="Certificate">Certificates</button>
          <button class="btn btn-xs doc-filter-pill" data-filter="Flagged">Flagged / Suspicious</button>
        </div>

        <!-- Document List Container -->
        <div id="doc-modal-list" style="display:flex;flex-direction:column;gap:var(--space-3);max-height:480px;overflow-y:auto;padding-right:4px;">
          <!-- Rendered dynamically -->
        </div>
      </div>

      <div class="modal-footer" style="justify-content:space-between;align-items:center;font-size:12px;color:var(--text-tertiary);">
        <span><kbd style="background:var(--surface-secondary);padding:2px 6px;border-radius:4px;border:1px solid var(--border-light);">ESC</kbd> to close &nbsp; \u2022 &nbsp; Document Repository (8 active records)</span>
        <button class="btn btn-secondary btn-sm" onclick="window.DocuVerify.closeModal(); location.hash='verify';">
          <i data-lucide="file-search"></i> Verify New Document
        </button>
      </div>
    </div>
  `;
    document.body.appendChild(modal);
    if (window.lucide) lucide.createIcons();
    const searchInput = modal.querySelector("#doc-modal-search-input");
    const listContainer = modal.querySelector("#doc-modal-list");
    let currentFilter = "all";
    function renderList() {
      const q = (searchInput ? searchInput.value : "").toLowerCase().trim();
      const filtered = documents.filter((doc) => {
        const matchesCategory = currentFilter === "all" ? true : currentFilter === "Flagged" ? doc.regStatus === "Flagged" || doc.blockchainStatus === "Mismatch" : doc.type.includes(currentFilter) || currentFilter === "ID Card" && (doc.type.includes("Aadhaar") || doc.type.includes("PAN") || doc.type.includes("Passport") || doc.type.includes("Driving"));
        const matchesQuery = !q || doc.name.toLowerCase().includes(q) || doc.id.toLowerCase().includes(q) || doc.authority.toLowerCase().includes(q) || doc.type.toLowerCase().includes(q) || doc.regStatus.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      });
      if (filtered.length === 0) {
        listContainer.innerHTML = `
        <div style="text-align:center;padding:var(--space-8) var(--space-4);color:var(--text-secondary);">
          <i data-lucide="folder-search" style="width:40px;height:40px;margin-bottom:var(--space-3);color:var(--text-tertiary);"></i>
          <h4 style="margin-bottom:var(--space-1);color:var(--text-primary);">No documents found</h4>
          <p style="font-size:var(--text-sm);">Try adjusting your search query or category filters.</p>
        </div>
      `;
      } else {
        listContainer.innerHTML = filtered.map((doc) => `
        <div class="card" style="padding:var(--space-4);display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);transition:all 0.15s ease;">
          <div style="display:flex;align-items:center;gap:var(--space-3);flex:1;min-width:0;">
            <div style="width:40px;height:40px;border-radius:var(--radius-md);background:var(--surface-secondary);border:1px solid var(--border-light);display:flex;align-items:center;justify-content:center;color:var(--color-accent-600);flex-shrink:0;">
              <i data-lucide="${doc.format === "PDF" ? "file-text" : "file-image"}"></i>
            </div>
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:var(--space-2);margin-bottom:2px;">
                <span style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${doc.name}</span>
                <span class="badge badge-gray" style="font-size:10px;">${doc.format}</span>
              </div>
              <div style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:var(--space-3);flex-wrap:wrap;">
                <span>ID: <code style="font-family:var(--font-mono);">${doc.id}</code></span>
                <span>\u2022</span>
                <span>${doc.authority}</span>
              </div>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:var(--space-3);flex-shrink:0;">
            <span class="badge ${doc.regStatus === "Registered" ? "badge-green" : doc.regStatus === "Flagged" ? "badge-red" : doc.regStatus === "Pending" ? "badge-amber" : "badge-gray"}">
              ${doc.regStatus}
            </span>
            <button class="btn btn-secondary btn-xs view-doc-detail-btn" data-doc-id="${doc.id}">
              <i data-lucide="eye" style="width:14px;height:14px;"></i> Details
            </button>
          </div>
        </div>
      `).join("");
      }
      if (window.lucide) lucide.createIcons();
      listContainer.querySelectorAll(".view-doc-detail-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const docId = e.currentTarget.dataset.docId;
          showDocumentDetailModal(docId);
        });
      });
    }
    renderList();
    if (searchInput) {
      searchInput.addEventListener("input", renderList);
      setTimeout(() => {
        searchInput.focus();
        const valLen = searchInput.value.length;
        if (valLen > 0) {
          searchInput.setSelectionRange(valLen, valLen);
        }
      }, 40);
    }
    modal.querySelectorAll(".doc-filter-pill").forEach((pill) => {
      pill.addEventListener("click", (e) => {
        modal.querySelectorAll(".doc-filter-pill").forEach((p) => p.classList.remove("active", "btn-primary"));
        e.target.classList.add("active");
        currentFilter = e.target.dataset.filter;
        renderList();
      });
    });
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
  function showDocumentDetailModal(docId) {
    const doc = documents.find((d) => d.id === docId) || documents[0];
    showModal(
      `Document Metadata \u2014 ${doc.id}`,
      `
      <div style="display:flex;flex-direction:column;gap:var(--space-4);">
        <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-4);background:var(--surface-secondary);border-radius:var(--radius-lg);border:1px solid var(--border-light);">
          <div style="width:44px;height:44px;border-radius:var(--radius-md);background:var(--color-accent-100);color:var(--color-accent-600);display:flex;align-items:center;justify-content:center;">
            <i data-lucide="file-check-2" style="width:24px;height:24px;"></i>
          </div>
          <div>
            <h4 style="font-size:var(--text-base);font-weight:var(--font-bold);color:var(--text-primary);margin-bottom:2px;">${doc.name}</h4>
            <div style="font-size:12px;color:var(--text-secondary);">${doc.type} &nbsp;\u2022&nbsp; Format: ${doc.format}</div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);font-size:var(--text-xs);">
          <div style="padding:var(--space-3);background:var(--surface-primary);border:1px solid var(--border-light);border-radius:var(--radius-md);">
            <div style="color:var(--text-tertiary);margin-bottom:2px;">Issuing Authority</div>
            <div style="font-weight:var(--font-semibold);color:var(--text-primary);">${doc.authority}</div>
          </div>
          <div style="padding:var(--space-3);background:var(--surface-primary);border:1px solid var(--border-light);border-radius:var(--radius-md);">
            <div style="color:var(--text-tertiary);margin-bottom:2px;">Registration Status</div>
            <div style="font-weight:var(--font-semibold);color:var(--color-success-700);">${doc.regStatus}</div>
          </div>
          <div style="padding:var(--space-3);background:var(--surface-primary);border:1px solid var(--border-light);border-radius:var(--radius-md);">
            <div style="color:var(--text-tertiary);margin-bottom:2px;">Verification Status</div>
            <div style="font-weight:var(--font-semibold);color:var(--text-primary);">${doc.blockchainStatus}</div>
          </div>
          <div style="padding:var(--space-3);background:var(--surface-primary);border:1px solid var(--border-light);border-radius:var(--radius-md);">
            <div style="color:var(--text-tertiary);margin-bottom:2px;">Last Verified Date</div>
            <div style="font-weight:var(--font-semibold);color:var(--text-primary);">${doc.lastVerified}</div>
          </div>
        </div>

        <div style="padding:var(--space-3);background:var(--surface-secondary);border:1px solid var(--border-light);border-radius:var(--radius-md);font-family:var(--font-mono);font-size:11px;color:var(--text-secondary);">
          <div style="font-family:var(--font-family);font-weight:var(--font-semibold);color:var(--text-primary);margin-bottom:4px;">Cryptographic Hash (SHA-256):</div>
          <div style="word-break:break-all;color:var(--color-accent-600);">8f72a91c5e4b3d2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a</div>
        </div>
      </div>
    `,
      `
      <button class="btn btn-secondary" onclick="window.DocuVerify.closeModal()">Close</button>
      <button class="btn btn-primary" onclick="window.DocuVerify.closeModal(); location.hash='verify';">
        <i data-lucide="shield-check"></i> Run Verification Test
      </button>
    `
    );
  }
  function openNotificationsDrawer() {
    closeModal(true);
    const modal = document.createElement("div");
    modal.className = "modal-backdrop";
    modal.id = "active-modal";
    modal.innerHTML = `
    <div class="modal modal-lg" style="max-width: 680px;">
      <div class="modal-header" style="border-bottom: 1px solid var(--border-light); padding: var(--space-4) var(--space-6);">
        <div style="display:flex;align-items:center;gap:var(--space-3);">
          <div style="width:36px;height:36px;border-radius:var(--radius-full);background:var(--color-danger-50);color:var(--color-danger-600);display:flex;align-items:center;justify-content:center;">
            <i data-lucide="bell" style="width:18px;height:18px;"></i>
          </div>
          <div>
            <h3 style="font-size:var(--text-md);font-weight:var(--font-bold);margin:0;">Security Notifications & Alerts</h3>
            <span style="font-size:12px;color:var(--text-secondary);">System alerts, hash mismatches & security audit logs</span>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:var(--space-2);">
          <button class="btn btn-ghost btn-xs" id="mark-all-read-btn" style="font-size:12px;color:var(--color-accent-600);">
            <i data-lucide="check-check" style="width:14px;height:14px;"></i> Mark all read
          </button>
          <button class="btn btn-ghost btn-icon" onclick="window.DocuVerify.closeModal()">
            <i data-lucide="x"></i>
          </button>
        </div>
      </div>

      <div class="modal-body" style="padding: var(--space-5) var(--space-6);">
        <!-- Summary KPI Row -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3);margin-bottom:var(--space-4);">
          <div style="padding:var(--space-3);background:var(--color-danger-50);border:1px solid var(--color-danger-100);border-radius:var(--radius-md);display:flex;align-items:center;gap:var(--space-3);">
            <div style="width:32px;height:32px;border-radius:var(--radius-full);background:var(--color-danger-500);color:white;display:flex;align-items:center;justify-content:center;font-weight:var(--font-bold);font-size:12px;">3</div>
            <div>
              <div style="font-size:11px;color:var(--color-danger-700);font-weight:var(--font-semibold);">Critical Alerts</div>
              <div style="font-size:11px;color:var(--text-secondary);">Requires Action</div>
            </div>
          </div>

          <div style="padding:var(--space-3);background:var(--color-warning-50);border:1px solid var(--color-warning-100);border-radius:var(--radius-md);display:flex;align-items:center;gap:var(--space-3);">
            <div style="width:32px;height:32px;border-radius:var(--radius-full);background:var(--color-warning-500);color:white;display:flex;align-items:center;justify-content:center;font-weight:var(--font-bold);font-size:12px;">3</div>
            <div>
              <div style="font-size:11px;color:var(--color-warning-700);font-weight:var(--font-semibold);">Warnings</div>
              <div style="font-size:11px;color:var(--text-secondary);">Anomalies</div>
            </div>
          </div>

          <div style="padding:var(--space-3);background:var(--color-accent-50);border:1px solid var(--color-accent-100);border-radius:var(--radius-md);display:flex;align-items:center;gap:var(--space-3);">
            <div style="width:32px;height:32px;border-radius:var(--radius-full);background:var(--color-accent-500);color:white;display:flex;align-items:center;justify-content:center;font-weight:var(--font-bold);font-size:12px;">2</div>
            <div>
              <div style="font-size:11px;color:var(--color-accent-700);font-weight:var(--font-semibold);">System Info</div>
              <div style="font-size:11px;color:var(--text-secondary);">Audit Logs</div>
            </div>
          </div>
        </div>

        <!-- Alerts List -->
        <div style="display:flex;flex-direction:column;gap:var(--space-3);max-height:420px;overflow-y:auto;padding-right:2px;">
          ${alerts.map((item) => `
            <div class="card" style="padding:var(--space-4);border-left:4px solid ${item.severity === "critical" ? "var(--color-danger-500)" : item.severity === "warning" ? "var(--color-warning-500)" : "var(--color-accent-500)"};">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-3);margin-bottom:var(--space-2);">
                <div style="display:flex;align-items:center;gap:var(--space-2);">
                  <span class="badge ${item.severity === "critical" ? "badge-red" : item.severity === "warning" ? "badge-amber" : "badge-blue"}" style="font-size:10px;text-transform:uppercase;">
                    ${item.severity}
                  </span>
                  <span style="font-size:var(--text-sm);font-weight:var(--font-bold);color:var(--text-primary);">${item.title}</span>
                </div>
                <span style="font-size:11px;color:var(--text-tertiary);white-space:nowrap;">${item.timestamp}</span>
              </div>
              <p style="font-size:12px;color:var(--text-secondary);margin-bottom:var(--space-3);line-height:1.4;">${item.description}</p>
              <div style="display:flex;align-items:center;justify-content:space-between;font-size:11px;color:var(--text-tertiary);">
                <span>Doc Ref: <code style="font-family:var(--font-mono);color:var(--text-secondary);">${item.docId}</code></span>
                <div style="display:flex;gap:var(--space-2);">
                  <button class="btn btn-secondary btn-xs" onclick="window.DocuVerify.openDocumentSearchModal('${item.docId}')">
                    <i data-lucide="search" style="width:12px;height:12px;"></i> Inspect Doc
                  </button>
                  <button class="btn btn-ghost btn-xs" onclick="this.closest('.card').style.opacity='0.4'; this.textContent='Dismissed';">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="modal-footer" style="justify-content:space-between;align-items:center;">
        <span style="font-size:12px;color:var(--text-tertiary);">Real-time Security Stream Active</span>
        <button class="btn btn-secondary btn-sm" onclick="window.DocuVerify.closeModal()">Close</button>
      </div>
    </div>
  `;
    document.body.appendChild(modal);
    if (window.lucide) lucide.createIcons();
    const markAllReadBtn = modal.querySelector("#mark-all-read-btn");
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener("click", () => {
        const dot = document.querySelector(".notification-dot");
        if (dot) dot.style.display = "none";
        markAllReadBtn.textContent = "All Marked Read \u2713";
        markAllReadBtn.style.color = "var(--color-success-600)";
      });
    }
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
  window.DocuVerify = window.DocuVerify || {};
  window.DocuVerify.closeModal = closeModal;
  window.DocuVerify.openDocumentSearchModal = openDocumentSearchModal;
  window.DocuVerify.showDocumentDetailModal = showDocumentDetailModal;
  window.DocuVerify.openNotificationsDrawer = openNotificationsDrawer;

  // js/pages/verify.js
  var currentState = "upload";
  var selectedFile = null;
  function renderVerifyPage(container) {
    currentState = "upload";
    selectedFile = null;
    renderUploadState(container);
  }
  var activeMediaStream = null;
  function stopCameraStream() {
    if (activeMediaStream) {
      activeMediaStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch (e) {
        }
      });
      activeMediaStream = null;
    }
  }
  function renderUploadState(container) {
    container.innerHTML = `
    <div class="verify-page-wrapper" style="max-width:820px;margin:0 auto;">
      <!-- Top of Page: Title & Action Buttons -->
      <div class="page-header verify-header-top">
        <div class="page-header-text">
          <h1>Document Verification & <em class="editorial-italic">Forensic</em> Tamper Detection</h1>
          <p>Upload a document or take a picture live from your camera to analyze its authenticity and integrity.</p>
        </div>
        <div class="top-verify-actions">
          <button type="button" class="btn btn-secondary top-action-btn" id="top-upload-btn">
            <i data-lucide="upload-cloud"></i>
            <span>Upload File</span>
          </button>
          <button type="button" class="btn btn-primary top-action-btn" id="top-camera-btn">
            <i data-lucide="camera"></i>
            <span>Camera Scan</span>
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-body verify-card-body">
          <!-- Upload Zone -->
          <div class="upload-zone" id="upload-zone">
            <input type="file" id="file-input" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" hidden />
            <input type="file" id="camera-native-input" accept="image/*" capture="environment" hidden />

            <div class="upload-zone-icon">
              <i data-lucide="upload-cloud"></i>
            </div>
          <h3>Drop your document here</h3>
          <p>or select your preferred document submission method:</p>

          <!-- Dual Upload Action Options -->
          <div class="upload-options-row">
            <button type="button" class="btn btn-secondary upload-option-btn" id="browse-btn">
              <i data-lucide="folder-open"></i>
              <span>Browse Files</span>
            </button>

            <div class="upload-options-divider">
              <span>OR</span>
            </div>

            <button type="button" class="btn btn-primary upload-option-btn camera-btn" id="camera-btn">
              <i data-lucide="camera"></i>
              <span>Take a Picture</span>
            </button>
          </div>

          <div class="upload-formats">
            <span class="format-tag">PDF</span>
            <span class="format-tag">JPG</span>
            <span class="format-tag">PNG</span>
            <span class="format-tag">DOC</span>
            <span class="format-tag">DOCX</span>
            <span class="format-tag camera-tag">
              <i data-lucide="aperture" style="width:11px;height:11px;display:inline-block;vertical-align:-1px;"></i> Live Camera Scan
            </span>
          </div>
          <div class="upload-note">Maximum file size: 10 MB &bull; High resolution document capture supported</div>
        </div>

        <!-- File Preview (hidden initially) -->
        <div id="file-preview" class="hidden"></div>

        <!-- Start Verification -->
        <div class="verify-start-section" id="verify-start" style="display:none;">
          <button class="btn btn-primary btn-lg" id="start-verify-btn">
            <i data-lucide="shield-check"></i>
            Start Verification
          </button>
          <div class="verify-security-note">
            <i data-lucide="lock"></i>
            Your document is processed through multiple authenticity and integrity checks.
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
    if (window.lucide) lucide.createIcons();
    const topUploadBtn = document.getElementById("top-upload-btn");
    const topCameraBtn = document.getElementById("top-camera-btn");
    const fileInput = document.getElementById("file-input");
    const nativeCameraInput = document.getElementById("camera-native-input");
    if (topUploadBtn) {
      topUploadBtn.addEventListener("click", () => fileInput.click());
    }
    if (topCameraBtn) {
      topCameraBtn.addEventListener("click", () => openCameraScanner(container));
    }
    const zone = document.getElementById("upload-zone");
    const browseBtn = document.getElementById("browse-btn");
    const cameraBtn = document.getElementById("camera-btn");
    browseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      fileInput.click();
    });
    cameraBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openCameraScanner(container);
    });
    zone.addEventListener("click", (e) => {
      if (!e.target.closest("#camera-btn") && !e.target.closest("#browse-btn")) {
        fileInput.click();
      }
    });
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("dragover");
    });
    zone.addEventListener("dragleave", () => {
      zone.classList.remove("dragover");
    });
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("dragover");
      if (e.dataTransfer.files.length) {
        handleFileSelect(e.dataTransfer.files[0], container);
      }
    });
    fileInput.addEventListener("change", (e) => {
      if (e.target.files.length) {
        handleFileSelect(e.target.files[0], container);
      }
    });
    nativeCameraInput.addEventListener("change", (e) => {
      if (e.target.files.length) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (re) => {
          handleFileSelect(file, container, re.target.result, true);
        };
        reader.readAsDataURL(file);
      }
    });
    document.getElementById("start-verify-btn").addEventListener("click", () => {
      renderProcessingState(container);
    });
  }
  function openCameraScanner(container) {
    showModal("Document Camera Scanner", `
    <div class="camera-scanner-modal" id="camera-scanner-container">
      <div class="camera-viewport" id="scanner-viewport">
        <video id="scanner-video" autoplay playsinline muted></video>
        <canvas id="scanner-canvas"></canvas>
        <div class="camera-flash" id="scanner-flash"></div>

        <!-- Document guide HUD -->
        <div class="scanner-hud" id="scanner-hud">
          <div class="scanner-corner top-left"></div>
          <div class="scanner-corner top-right"></div>
          <div class="scanner-corner bottom-left"></div>
          <div class="scanner-corner bottom-right"></div>
          <div class="scanner-laser"></div>
        </div>

        <div class="scanner-guide-text" id="scanner-guide">
          <i data-lucide="scan" style="width:13px;height:13px;color:#38bdf8;"></i>
          Align document edges inside frame
        </div>
      </div>

      <!-- Controls row -->
      <div class="scanner-controls" id="scanner-live-controls">
        <button class="btn btn-secondary btn-sm" id="scanner-switch-camera" title="Switch Camera" style="display:none;">
          <i data-lucide="refresh-cw"></i> Flip
        </button>
        <button class="scanner-shutter-btn" id="scanner-capture-btn" title="Capture Document Picture">
          <div class="scanner-shutter-inner">
            <i data-lucide="camera" style="width:20px;height:20px;"></i>
          </div>
        </button>
        <button class="btn btn-ghost btn-sm" id="scanner-cancel-btn">
          Cancel
        </button>
      </div>

      <!-- Fallback container (hidden by default) -->
      <div id="scanner-fallback" style="display:none;width:100%;"></div>
    </div>
  `);
    if (window.lucide) lucide.createIcons();
    const video = document.getElementById("scanner-video");
    const canvas = document.getElementById("scanner-canvas");
    const flash = document.getElementById("scanner-flash");
    const captureBtn = document.getElementById("scanner-capture-btn");
    const switchBtn = document.getElementById("scanner-switch-camera");
    const cancelBtn = document.getElementById("scanner-cancel-btn");
    const fallbackContainer = document.getElementById("scanner-fallback");
    const viewport = document.getElementById("scanner-viewport");
    const liveControls = document.getElementById("scanner-live-controls");
    cancelBtn.addEventListener("click", () => {
      stopCameraStream();
      closeModal();
    });
    let currentFacingMode = "environment";
    async function startStream(facingMode = "environment") {
      stopCameraStream();
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("Camera stream not supported by browser");
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          },
          audio: false
        });
        activeMediaStream = stream;
        if (video) {
          video.srcObject = stream;
          await video.play();
        }
        try {
          const devices = await navigator.mediaDevices.enumerateDevices();
          const videoDevices = devices.filter((d) => d.kind === "videoinput");
          if (videoDevices.length > 1 && switchBtn) {
            switchBtn.style.display = "inline-flex";
          }
        } catch (e) {
        }
      } catch (err) {
        console.warn("Live camera stream unavailable:", err);
        showScannerFallback(err.message || "Camera access not permitted");
      }
    }
    if (switchBtn) {
      switchBtn.addEventListener("click", () => {
        currentFacingMode = currentFacingMode === "environment" ? "user" : "environment";
        startStream(currentFacingMode);
      });
    }
    captureBtn.addEventListener("click", () => {
      if (!video || !video.videoWidth) {
        showScannerFallback("Unable to read camera frame");
        return;
      }
      flash.classList.add("flash-active");
      setTimeout(() => flash.classList.remove("flash-active"), 180);
      const width = video.videoWidth || 1280;
      const height = video.videoHeight || 720;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, width, height);
      const capturedDataUrl = canvas.toDataURL("image/jpeg", 0.94);
      stopCameraStream();
      showReviewState(capturedDataUrl);
    });
    function showReviewState(dataUrl) {
      viewport.style.display = "none";
      liveControls.style.display = "none";
      const modalBody = document.getElementById("camera-scanner-container");
      const reviewDiv = document.createElement("div");
      reviewDiv.className = "scanner-review-card";
      reviewDiv.id = "scanner-review-ui";
      reviewDiv.innerHTML = `
      <img src="${dataUrl}" alt="Captured Document" class="scanner-review-preview" />
      <div style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:6px;">
        <i data-lucide="check-circle" style="width:14px;height:14px;color:var(--color-success-500);"></i>
        Photo captured successfully. Verify clarity before proceeding.
      </div>
      <div style="display:flex;gap:var(--space-3);margin-top:var(--space-2);">
        <button class="btn btn-secondary" id="scanner-retake-btn">
          <i data-lucide="rotate-ccw"></i> Retake Photo
        </button>
        <button class="btn btn-primary" id="scanner-accept-btn">
          <i data-lucide="check"></i> Use This Document
        </button>
      </div>
    `;
      modalBody.appendChild(reviewDiv);
      if (window.lucide) lucide.createIcons();
      document.getElementById("scanner-retake-btn").addEventListener("click", () => {
        reviewDiv.remove();
        viewport.style.display = "flex";
        liveControls.style.display = "flex";
        startStream(currentFacingMode);
      });
      document.getElementById("scanner-accept-btn").addEventListener("click", () => {
        const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace(/[:.]/g, "-").slice(0, 19);
        const filename = `Document_Scan_${timestamp}.jpg`;
        const file = dataURLtoFile(dataUrl, filename);
        stopCameraStream();
        closeModal(true);
        handleFileSelect(file, container, dataUrl, true);
      });
    }
    function showScannerFallback(reason) {
      if (viewport) viewport.style.display = "none";
      if (liveControls) liveControls.style.display = "none";
      fallbackContainer.style.display = "block";
      fallbackContainer.innerHTML = `
      <div class="scanner-fallback-card">
        <div style="width:54px;height:54px;margin:0 auto var(--space-3);background:var(--color-accent-100);border-radius:50%;display:flex;align-items:center;justify-content:center;">
          <i data-lucide="camera-off" style="width:26px;height:26px;color:var(--color-accent-600);"></i>
        </div>
        <h4 style="margin-bottom:var(--space-1);color:var(--text-primary);">Webcam Stream Not Detected</h4>
        <p style="font-size:12px;color:var(--text-secondary);max-width:380px;margin:0 auto var(--space-5);">
          Live camera access is unavailable or not granted by the browser. You can capture using your device system camera or test with a simulated document photo.
        </p>

        <div style="display:flex;flex-direction:column;gap:var(--space-3);max-width:320px;margin:0 auto;">
          <label class="btn btn-primary" style="cursor:pointer;margin:0;">
            <i data-lucide="camera"></i> Open Device Camera / Photos
            <input type="file" accept="image/*" capture="environment" id="device-camera-input" hidden />
          </label>
          <button class="btn btn-secondary" id="simulate-capture-btn">
            <i data-lucide="sparkles"></i> Take Sample Document Photo
          </button>
          <button class="btn btn-ghost btn-sm" id="fallback-cancel-btn" style="margin-top:var(--space-1);">
            Cancel
          </button>
        </div>
      </div>
    `;
      if (window.lucide) lucide.createIcons();
      const deviceInput = document.getElementById("device-camera-input");
      deviceInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (re) => {
            stopCameraStream();
            closeModal(true);
            handleFileSelect(file, container, re.target.result, true);
          };
          reader.readAsDataURL(file);
        }
      });
      document.getElementById("simulate-capture-btn").addEventListener("click", () => {
        const simulatedDataUrl = createSimulatedDocumentPhoto();
        const filename = `Document_Scan_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.jpg`;
        const file = dataURLtoFile(simulatedDataUrl, filename);
        stopCameraStream();
        closeModal(true);
        handleFileSelect(file, container, simulatedDataUrl, true);
      });
      document.getElementById("fallback-cancel-btn").addEventListener("click", () => {
        stopCameraStream();
        closeModal(true);
      });
    }
    startStream(currentFacingMode);
  }
  function handleFileSelect(file, container, previewUrl = null, isCameraCapture = false) {
    selectedFile = {
      name: file.name || "Birth_Certificate_AS.pdf",
      type: file.type || "application/pdf",
      size: file.size || 2457600,
      uploadTime: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      previewUrl: previewUrl || null,
      isCameraCapture
    };
    if (!selectedFile.name || selectedFile.name === "undefined") {
      selectedFile.name = isCameraCapture ? "Document_Photo_Scan.jpg" : "Birth_Certificate_AS.pdf";
    }
    const ext = selectedFile.name.split(".").pop().toLowerCase();
    let iconClass = "pdf";
    if (isCameraCapture || ["jpg", "jpeg", "png", "webp"].includes(ext)) iconClass = "img";
    else if (["doc", "docx"].includes(ext)) iconClass = "doc";
    const sizeStr = formatFileSize(selectedFile.size);
    document.getElementById("upload-zone").classList.add("hidden");
    const preview = document.getElementById("file-preview");
    preview.classList.remove("hidden");
    preview.innerHTML = `
    <div class="file-preview-card">
      <div class="file-preview-icon ${iconClass}">
        <i data-lucide="${isCameraCapture ? "camera" : "file-text"}"></i>
      </div>
      <div class="file-preview-info">
        <div class="file-preview-name">${selectedFile.name}</div>
        <div class="file-preview-meta">
          ${isCameraCapture ? `<span style="background:rgba(37,99,235,0.1);color:var(--color-accent-700);font-weight:600;padding:1px 6px;border-radius:4px;display:inline-flex;align-items:center;gap:3px;"><i data-lucide="camera" style="width:10px;height:10px;"></i> CAMERA CAPTURE</span>` : `<span>${ext.toUpperCase()}</span>`}
          <span>${sizeStr}</span>
          <span>Captured at ${selectedFile.uploadTime}</span>
        </div>
      </div>
      <div class="file-preview-actions">
        <button class="btn btn-secondary btn-sm" id="preview-file-btn">
          <i data-lucide="eye"></i> Preview
        </button>
        <button class="btn btn-ghost btn-sm" id="remove-file-btn" style="color:var(--color-danger-500);">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    </div>
  `;
    document.getElementById("verify-start").style.display = "";
    if (window.lucide) lucide.createIcons();
    document.getElementById("remove-file-btn").addEventListener("click", () => {
      selectedFile = null;
      document.getElementById("upload-zone").classList.remove("hidden");
      preview.classList.add("hidden");
      preview.innerHTML = "";
      document.getElementById("verify-start").style.display = "none";
    });
    document.getElementById("preview-file-btn").addEventListener("click", () => {
      showModal("Document Preview", `
      <div class="doc-preview-container">
        <div class="doc-preview-mock">
          ${generateMockDocPreview()}
        </div>
      </div>
    `);
    });
  }
  function renderProcessingState(container) {
    currentState = "processing";
    container.innerHTML = `
    <div class="page-header" style="text-align:center;">
      <h1>Verifying Document</h1>
      <p>Your document is being processed through multiple authenticity checks.</p>
    </div>

    <div class="verification-process">
      <!-- Progress bar -->
      <div class="card" style="margin-bottom:var(--space-6);">
        <div class="card-body" style="padding:var(--space-4) var(--space-5);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-2);">
            <span class="text-sm font-medium" id="progress-label">Processing...</span>
            <span class="text-sm text-tertiary font-mono" id="progress-percent">0%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill blue" id="progress-fill" style="width:0%;"></div>
          </div>
        </div>
      </div>

      <!-- Pipeline Visualization -->
      <div class="card">
        <div class="card-header">
          <h3>Verification Pipeline</h3>
          <span class="badge badge-info"><i data-lucide="loader"></i> In Progress</span>
        </div>
        <div class="card-body">
          <div class="pipeline" id="pipeline-viz">
            ${generatePipelineHTML()}
          </div>
        </div>
      </div>
    </div>
  `;
    if (window.lucide) lucide.createIcons();
    animateVerification(container);
  }
  function generatePipelineHTML() {
    return `
    <!-- Step 1: Document Upload -->
    <div class="pipeline-node pending" data-step="1">
      <div class="pipeline-node-icon"><i data-lucide="upload"></i></div>
      <span class="pipeline-node-label">Document Upload</span>
      <span class="pipeline-node-time">\u2014</span>
    </div>
    <div class="pipeline-connector" data-connector="1"></div>

    <!-- Step 2: Image Pre-processing -->
    <div class="pipeline-node pending" data-step="2">
      <div class="pipeline-node-icon"><i data-lucide="image"></i></div>
      <span class="pipeline-node-label">Image Pre-processing</span>
      <span class="pipeline-node-time">\u2014</span>
    </div>
    <div class="pipeline-connector" data-connector="2"></div>

    <!-- Parallel: OCR + Document Analysis -->
    <div class="pipeline-parallel">
      <div class="pipeline-branch">
        <div class="pipeline-connector" data-connector="3a"></div>
        <div class="pipeline-node pending" data-step="3">
          <div class="pipeline-node-icon"><i data-lucide="scan-text"></i></div>
          <span class="pipeline-node-label">OCR & Data Extraction</span>
          <span class="pipeline-node-time">\u2014</span>
        </div>
      </div>
      <div class="pipeline-branch">
        <div class="pipeline-connector" data-connector="4a"></div>
        <div class="pipeline-node pending" data-step="4">
          <div class="pipeline-node-icon"><i data-lucide="eye"></i></div>
          <span class="pipeline-node-label">Document Image Analysis</span>
          <span class="pipeline-node-time">\u2014</span>
        </div>
      </div>
    </div>
    <div class="pipeline-connector" data-connector="4"></div>

    <!-- Step 5: Tampering Detection -->
    <div class="pipeline-node pending" data-step="5">
      <div class="pipeline-node-icon"><i data-lucide="shield"></i></div>
      <span class="pipeline-node-label">Tampering & Integrity Checks</span>
      <span class="pipeline-node-time">\u2014</span>
    </div>
    <div class="pipeline-connector" data-connector="5"></div>

    <!-- Step 6: Digital Signature -->
    <div class="pipeline-node pending" data-step="6">
      <div class="pipeline-node-icon"><i data-lucide="fingerprint"></i></div>
      <span class="pipeline-node-label">Digital Signature / Hash Check</span>
      <span class="pipeline-node-time">\u2014</span>
    </div>
    <div class="pipeline-connector" data-connector="6"></div>

    <!-- Step 7: Blockchain -->
    <div class="pipeline-node pending" data-step="7">
      <div class="pipeline-node-icon"><i data-lucide="link"></i></div>
      <span class="pipeline-node-label">Blockchain Verification</span>
      <span class="pipeline-node-time">\u2014</span>
    </div>
    <div class="pipeline-connector" data-connector="7"></div>

    <!-- Step 8: Final -->
    <div class="pipeline-node pending" data-step="8">
      <div class="pipeline-node-icon"><i data-lucide="check-circle"></i></div>
      <span class="pipeline-node-label">Final Authenticity Assessment</span>
      <span class="pipeline-node-time">\u2014</span>
    </div>
  `;
  }
  function animateVerification(container) {
    const steps = [
      { step: 1, time: "0.2s", delay: 400 },
      { step: 2, time: "1.8s", delay: 1200 },
      { step: 3, time: "3.2s", delay: 1800, parallel: true },
      { step: 4, time: "2.9s", delay: 0 },
      // starts with 3
      { step: 5, time: "2.1s", delay: 1400 },
      { step: 6, time: "1.1s", delay: 900 },
      { step: 7, time: "1.5s", delay: 1100 },
      { step: 8, time: "0.4s", delay: 600 }
    ];
    const totalSteps = 8;
    let currentStep = 0;
    const progressFill = document.getElementById("progress-fill");
    const progressLabel = document.getElementById("progress-label");
    const progressPercent = document.getElementById("progress-percent");
    const stepLabels = [
      "Uploading document...",
      "Pre-processing image...",
      "Extracting text & analyzing...",
      "Analyzing document image...",
      "Checking for tampering...",
      "Verifying digital signature...",
      "Checking blockchain records...",
      "Computing final assessment..."
    ];
    function activateStep(stepNum) {
      const node = document.querySelector(`[data-step="${stepNum}"]`);
      if (node) {
        node.classList.remove("pending");
        node.classList.add("active");
        if (window.lucide) lucide.createIcons();
      }
    }
    function completeStep(stepNum, time) {
      const node = document.querySelector(`[data-step="${stepNum}"]`);
      if (node) {
        node.classList.remove("active");
        node.classList.add("completed");
        const timeEl = node.querySelector(".pipeline-node-time");
        if (timeEl) timeEl.textContent = time;
        const conn = document.querySelector(`[data-connector="${stepNum}"]`);
        if (conn) conn.classList.add("completed");
        if (window.lucide) lucide.createIcons();
      }
    }
    function processStep(index) {
      if (index >= steps.length) {
        setTimeout(() => {
          renderResultState(container, "verified");
        }, 500);
        return;
      }
      const step = steps[index];
      if (step.step === 3) {
        activateStep(3);
        activateStep(4);
        progressLabel.textContent = "Extracting text & analyzing document image...";
        const pct2 = Math.round((index + 1) / totalSteps * 100);
        progressFill.style.width = pct2 + "%";
        progressPercent.textContent = pct2 + "%";
        setTimeout(() => {
          completeStep(3, "3.2s");
          completeStep(4, "2.9s");
          currentStep = 4;
          const pct22 = Math.round(4 / totalSteps * 100);
          progressFill.style.width = pct22 + "%";
          progressPercent.textContent = pct22 + "%";
          processStep(4);
        }, step.delay + 800);
        return;
      }
      if (step.step === 4 && index === 3) {
        processStep(index + 1);
        return;
      }
      activateStep(step.step);
      progressLabel.textContent = stepLabels[step.step - 1] || "Processing...";
      const pct = Math.round(step.step / totalSteps * 100);
      progressFill.style.width = pct + "%";
      progressPercent.textContent = pct + "%";
      setTimeout(() => {
        completeStep(step.step, step.time);
        processStep(index + 1);
      }, step.delay);
    }
    setTimeout(() => processStep(0), 300);
  }
  function renderResultState(container, type = "verified") {
    currentState = "result";
    const data = type === "verified" ? verificationResult : suspiciousResult;
    const isVerified = type === "verified";
    container.innerHTML = `
    <div class="page-header">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <h1>Verification Result</h1>
          <p>Document authenticity analysis complete.</p>
        </div>
        <div style="display:flex;gap:var(--space-3);">
          <button class="btn btn-secondary" id="verify-another-btn">
            <i data-lucide="plus"></i> Verify Another
          </button>
          <button class="btn btn-secondary" id="toggle-result-btn">
            <i data-lucide="repeat"></i> ${isVerified ? "Show Suspicious" : "Show Verified"}
          </button>
        </div>
      </div>
    </div>

    <!-- Hero Result -->
    <div class="result-hero ${isVerified ? "verified" : "suspicious"}">
      <div class="result-hero-icon">
        <i data-lucide="${isVerified ? "check-circle" : "alert-triangle"}"></i>
      </div>
      <h2>${isVerified ? "DOCUMENT VERIFIED" : "DOCUMENT REQUIRES REVIEW"}</h2>
      <p>${isVerified ? "High confidence \u2014 document appears authentic." : "Multiple integrity issues detected \u2014 manual review recommended."}</p>
      <div class="result-score" style="color:${isVerified ? "var(--color-success-600)" : "var(--color-danger-600)"};">
        ${isVerified ? data.authenticityScore + "%" : data.tamperingRisk + "%"}
        <div class="result-score-label">${isVerified ? "Authenticity Score" : "Risk Score"}</div>
      </div>
    </div>

    <!-- Confidence Meters -->
    <div class="confidence-grid">
      <div class="confidence-meter">
        <div class="confidence-meter-value" style="color:${data.authenticityScore > 70 ? "var(--color-success-600)" : "var(--color-danger-600)"};">${data.authenticityScore}%</div>
        <div class="confidence-meter-label">Authenticity</div>
        <div class="confidence-meter-bar">
          <div class="confidence-meter-fill" style="width:${data.authenticityScore}%;background:${data.authenticityScore > 70 ? "var(--color-success-500)" : "var(--color-danger-500)"};"></div>
        </div>
      </div>
      <div class="confidence-meter">
        <div class="confidence-meter-value" style="color:${data.tamperingRisk < 20 ? "var(--color-success-600)" : "var(--color-danger-600)"};">${data.tamperingRisk}%</div>
        <div class="confidence-meter-label">Tampering Risk</div>
        <div class="confidence-meter-bar">
          <div class="confidence-meter-fill" style="width:${data.tamperingRisk}%;background:${data.tamperingRisk < 20 ? "var(--color-success-500)" : "var(--color-danger-500)"};"></div>
        </div>
      </div>
      <div class="confidence-meter">
        <div class="confidence-meter-value" style="color:${data.dataConsistency > 70 ? "var(--color-success-600)" : "var(--color-warning-600)"};">${data.dataConsistency}%</div>
        <div class="confidence-meter-label">Data Consistency</div>
        <div class="confidence-meter-bar">
          <div class="confidence-meter-fill" style="width:${data.dataConsistency}%;background:${data.dataConsistency > 70 ? "var(--color-success-500)" : "var(--color-warning-500)"};"></div>
        </div>
      </div>
      <div class="confidence-meter">
        <div class="confidence-meter-value" style="color:${data.blockchainMatch === "Verified" ? "var(--color-success-600)" : "var(--color-danger-600)"};">${data.blockchainMatch}</div>
        <div class="confidence-meter-label">Blockchain Match</div>
        <div class="confidence-meter-bar">
          <div class="confidence-meter-fill" style="width:${data.blockchainMatch === "Verified" ? "100" : "0"}%;background:var(--color-success-500);"></div>
        </div>
      </div>
    </div>

    ${!isVerified ? `
      <!-- Risk Reasons -->
      <div class="card" style="margin-bottom:var(--space-6);">
        <div class="card-header">
          <h3 style="color:var(--color-danger-600);"><i data-lucide="alert-octagon" style="display:inline;width:16px;height:16px;vertical-align:middle;margin-right:8px;"></i>Identified Issues</h3>
        </div>
        <div class="card-body">
          <div class="risk-reasons">
            ${data.reasons.map((r) => `
              <div class="risk-reason">
                <i data-lucide="x-circle"></i>
                ${r}
              </div>
            `).join("")}
          </div>
          <div class="result-actions">
            <button class="btn btn-warning btn-lg" onclick="window.DocuVerify.flagForReview()">
              <i data-lucide="flag"></i> Flag for Manual Review
            </button>
            <button class="btn btn-secondary btn-lg">
              <i data-lucide="file-text"></i> View Detailed Analysis
            </button>
          </div>
        </div>
      </div>
    ` : ""}

    <!-- Verification Breakdown -->
    <div class="card" style="margin-bottom:var(--space-6);">
      <div class="card-header">
        <h3>Verification Breakdown</h3>
      </div>
      <div class="card-body">
        <div class="check-list">
          ${data.checks.map((check) => `
            <div class="check-item">
              <div class="check-icon ${check.status}">
                <i data-lucide="${check.status === "pass" ? "check" : check.status === "warn" ? "alert-triangle" : "x"}"></i>
              </div>
              <div class="check-content">
                <div class="check-name">${check.name}</div>
                <div class="check-description">${check.desc}</div>
              </div>
              <div class="check-time">${check.time}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>

    ${isVerified ? `
      <!-- Document Information + Preview -->
      <div class="doc-info-grid" style="margin-bottom:var(--space-6);">
        <div class="card">
          <div class="card-header">
            <h3>Document Information</h3>
            <button class="btn btn-ghost btn-sm" id="view-extracted-btn">
              <i data-lucide="external-link"></i> View Extracted Data
            </button>
          </div>
          <div class="card-body">
            <div class="doc-info-fields">
              ${Object.entries({
      "Document Type": data.documentInfo.type,
      "Document ID": data.documentInfo.docId,
      "Name": data.documentInfo.name,
      "Issue Date": data.documentInfo.issueDate,
      "Issuing Authority": data.documentInfo.issuingAuthority,
      "Document Number": data.documentInfo.docNumber,
      "Category": data.documentInfo.category,
      "Format": data.documentInfo.format
    }).map(([label, value]) => `
                <div class="doc-info-field">
                  <label>${label}</label>
                  <div class="value">${value}</div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>Document Preview</h3>
          </div>
          <div class="card-body">
            <div class="doc-preview-container">
              <div class="doc-preview-mock">
                ${generateMockDocPreview()}
                <!-- Detection overlays -->
                <div class="doc-preview-overlay text-field" style="top:12px;left:60%;width:35%;height:18px;">Text Field</div>
                <div class="doc-preview-overlay text-field" style="top:55px;left:15%;width:70%;height:18px;">Text Field</div>
                <div class="doc-preview-overlay seal" style="bottom:40px;right:15px;width:50px;height:50px;border-radius:50%;">Seal</div>
                <div class="doc-preview-overlay signature" style="bottom:20px;left:20%;width:100px;height:30px;">Signature</div>
                <div class="doc-preview-overlay qr-code" style="top:12px;left:10px;width:40px;height:40px;">QR</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Blockchain Verification -->
      <div class="blockchain-verify-card" style="margin-bottom:var(--space-6);">
        <div class="blockchain-verify-header">
          <i data-lucide="link"></i>
          <h3 style="font-size:var(--text-base);font-weight:var(--font-semibold);">Blockchain Integrity Verification</h3>
          <span class="badge badge-success" style="margin-left:auto;"><i data-lucide="check-circle"></i> Hash Matched</span>
        </div>
        <div class="blockchain-verify-body">
          <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:var(--space-5);">
            The document's cryptographic hash was compared with a trusted record on the Institutional Verification Network blockchain.
          </p>

          <div class="blockchain-info-grid">
            <div class="blockchain-info-item">
              <label>Document Hash</label>
              <div class="value">${data.blockchain.hash.substring(0, 16)}...${data.blockchain.hash.slice(-4)}</div>
            </div>
            <div class="blockchain-info-item">
              <label>Blockchain Status</label>
              <div class="value matched">\u2713 ${data.blockchain.status}</div>
            </div>
            <div class="blockchain-info-item">
              <label>Record ID</label>
              <div class="value">${data.blockchain.recordId}</div>
            </div>
            <div class="blockchain-info-item">
              <label>Block Number</label>
              <div class="value">${data.blockchain.blockNumber}</div>
            </div>
            <div class="blockchain-info-item">
              <label>Timestamp</label>
              <div class="value" style="font-family:var(--font-family);">${data.blockchain.timestamp}</div>
            </div>
            <div class="blockchain-info-item">
              <label>Network</label>
              <div class="value" style="font-family:var(--font-family);">${data.blockchain.network}</div>
            </div>
          </div>

          <!-- Chain Visualization -->
          <div style="margin-top:var(--space-4);">
            <div class="text-xs text-secondary font-medium mb-3">Block Chain Verification Trail</div>
            <div class="chain-viz">
              ${data.blockchain.prevBlocks.map((block, i) => `
                ${i > 0 ? '<div class="chain-arrow"><i data-lucide="arrow-right"></i></div>' : ""}
                <div class="chain-block ${block.highlight ? "highlight" : ""}">
                  <span class="block-number">#${block.number}</span>
                  <span class="block-label">${block.label}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    ` : ""}
  `;
    if (window.lucide) lucide.createIcons();
    document.getElementById("verify-another-btn").addEventListener("click", () => {
      renderUploadState(container);
    });
    document.getElementById("toggle-result-btn").addEventListener("click", () => {
      renderResultState(container, isVerified ? "suspicious" : "verified");
    });
    const extractedBtn = document.getElementById("view-extracted-btn");
    if (extractedBtn) {
      extractedBtn.addEventListener("click", () => {
        showModal("Extracted Document Data", `
        <div style="font-size:var(--text-sm);">
          <table class="data-table">
            <tbody>
              ${Object.entries(data.documentInfo).map(([k, v]) => `
                <tr>
                  <td style="font-weight:var(--font-medium);color:var(--text-secondary);width:40%;">${k.replace(/([A-Z])/g, " $1").trim()}</td>
                  <td>${v}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `);
      });
    }
  }
  window.DocuVerify = window.DocuVerify || {};
  window.DocuVerify.flagForReview = function () {
    showConfirmDialog(
      "Flag for Manual Review",
      "This document will be flagged and assigned to a senior verification officer for manual review. Proceed?",
      "Flag Document",
      () => {
        const toast = document.createElement("div");
        toast.style.cssText = "position:fixed;bottom:24px;right:24px;background:var(--color-success-600);color:white;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:500;z-index:9999;animation:fadeInUp 0.3s ease;display:flex;align-items:center;gap:8px;";
        toast.innerHTML = '<i data-lucide="check-circle" style="width:16px;height:16px;"></i> Document flagged for manual review';
        document.body.appendChild(toast);
        if (window.lucide) lucide.createIcons();
        setTimeout(() => toast.remove(), 3e3);
      }
    );
  };
  function generateMockDocPreview() {
    if (selectedFile && selectedFile.previewUrl) {
      return `
      <div style="text-align:center;padding:12px 0;">
        <img src="${selectedFile.previewUrl}" alt="Captured Document" style="max-width:100%;max-height:420px;border-radius:var(--radius-md);box-shadow:0 8px 24px rgba(0,0,0,0.15);object-fit:contain;border:1px solid var(--border-light);" />
        <div style="font-size:12px;color:var(--text-secondary);margin-top:12px;display:flex;align-items:center;justify-content:center;gap:6px;font-weight:500;">
          <i data-lucide="camera" style="width:14px;height:14px;color:var(--color-accent-600);"></i> Captured Document Image
        </div>
      </div>
    `;
    }
    return `
    <div style="text-align:center;margin-bottom:16px;">
      <div style="width:36px;height:36px;margin:0 auto 8px;background:var(--color-gray-200);border-radius:50%;display:flex;align-items:center;justify-content:center;">
        <i data-lucide="landmark" style="width:18px;height:18px;color:var(--color-gray-500);"></i>
      </div>
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--color-gray-700);">Central Board of Education</div>
      <div style="font-size:9px;color:var(--color-gray-400);margin-top:2px;">Government of India</div>
    </div>
    <div style="text-align:center;margin-bottom:12px;">
      <div style="font-size:13px;font-weight:700;color:var(--text-primary);">CERTIFICATE</div>
      <div style="font-size:9px;color:var(--color-gray-400);">Certificate No: CERT-48291</div>
    </div>
    <div style="font-size:10px;color:var(--color-gray-500);line-height:1.6;">
      <div style="margin-bottom:6px;">This is to certify that <strong style="color:var(--text-primary);">Ananya Sharma</strong></div>
      <div style="margin-bottom:6px;">has successfully completed the prescribed course of study</div>
      <div style="margin-bottom:6px;">Date of Issue: <strong>12 March 2026</strong></div>
      <div>Document ID: <strong>DOC-2026-008421</strong></div>
    </div>
    <div style="margin-top:20px;display:flex;justify-content:space-between;align-items:flex-end;">
      <div style="font-size:9px;color:var(--color-gray-400);">
        <div style="width:80px;border-top:1px solid var(--color-gray-300);padding-top:4px;">Signature</div>
      </div>
      <div style="width:40px;height:40px;border:2px solid var(--color-gray-200);border-radius:50%;display:flex;align-items:center;justify-content:center;">
        <span style="font-size:8px;color:var(--color-gray-400);">SEAL</span>
      </div>
    </div>
  `;
  }
  function createSimulatedDocumentPhoto() {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, 1200, 800);
    ctx.save();
    ctx.translate(600, 400);
    ctx.rotate(-0.015);
    ctx.shadowColor = "rgba(0, 0, 0, 0.45)";
    ctx.shadowBlur = 32;
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = 16;
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(-450, -320, 900, 640);
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 3;
    ctx.strokeRect(-430, -300, 860, 600);
    ctx.strokeStyle = "#93c5fd";
    ctx.lineWidth = 1;
    ctx.strokeRect(-422, -292, 844, 584);
    ctx.fillStyle = "#2563eb";
    ctx.beginPath();
    ctx.arc(0, -220, 36, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("AX", 0, -212);
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 20px Outfit, sans-serif";
    ctx.fillText("GOVERNMENT OF INDIA \u2022 AUTHENTICATION PORTAL", 0, -150);
    ctx.fillStyle = "#2563eb";
    ctx.font = "bold 26px Outfit, sans-serif";
    ctx.fillText("OFFICIAL IDENTITY CERTIFICATE", 0, -110);
    ctx.fillStyle = "#64748b";
    ctx.font = "13px Plus Jakarta Sans, sans-serif";
    ctx.fillText("REGISTRATION ID: IND-AX-2026-948210", 0, -78);
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-360, -50);
    ctx.lineTo(360, -50);
    ctx.stroke();
    ctx.textAlign = "left";
    const fields = [
      { label: "FULL NAME", val: "ANANYA SHARMA" },
      { label: "DATE OF BIRTH", val: "14 AUGUST 1998" },
      { label: "DOCUMENT NUMBER", val: "DOC-AX-7729103" },
      { label: "ISSUING AUTHORITY", val: "CENTRAL VERIFICATION SYSTEM" },
      { label: "ISSUE DATE", val: "04 MARCH 2026" },
      { label: "STATUS", val: "OFFICIALLY VERIFIED" }
    ];
    fields.forEach((f, i) => {
      const col = i % 2 === 0 ? -340 : 60;
      const row = 0 + Math.floor(i / 2) * 55;
      ctx.fillStyle = "#64748b";
      ctx.font = "11px Plus Jakarta Sans, sans-serif";
      ctx.fillText(f.label, col, row);
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 16px Outfit, sans-serif";
      ctx.fillText(f.val, col, row + 22);
    });
    ctx.strokeStyle = "#dc2626";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(-220, 210, 34, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#dc2626";
    ctx.font = "bold 9px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("VERIFIED SEAL", -220, 206);
    ctx.fillText("DEPT OF AUTH", -220, 218);
    ctx.textAlign = "right";
    ctx.fillStyle = "#0f172a";
    ctx.font = "italic 20px Georgia, serif";
    ctx.fillText("R. Sharma", 320, 205);
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(200, 215);
    ctx.lineTo(340, 215);
    ctx.stroke();
    ctx.font = "11px Plus Jakarta Sans, sans-serif";
    ctx.fillText("Verification Officer", 330, 232);
    ctx.restore();
    return canvas.toDataURL("image/jpeg", 0.94);
  }
  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  }

  // js/pages/history.js
  function renderHistoryPage(container) {
    container.innerHTML = `
    <div class="page-header">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <h1>Verification History & <em class="editorial-italic">Immutable</em> Audit Ledger</h1>
          <p>Review all past document verification attempts and their results.</p>
        </div>
        <button class="btn btn-secondary" id="export-history-btn">
          <i data-lucide="download"></i> Export
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="history-stats">
      <div class="history-stat"><strong>12,486</strong> Total Verifications</div>
      <div class="history-stat"><strong>11,972</strong> Verified</div>
      <div class="history-stat"><strong>314</strong> Suspicious</div>
      <div class="history-stat"><strong>200</strong> Pending</div>
    </div>

    <!-- Filters -->
    <div class="filter-bar">
      <div class="search-input">
        <i data-lucide="search"></i>
        <input type="text" placeholder="Search by document, ID, or name..." id="history-search" />
      </div>
      <select class="select" id="filter-status">
        <option value="">All Statuses</option>
        <option value="verified">Verified</option>
        <option value="suspicious">Suspicious</option>
        <option value="failed">Failed</option>
        <option value="pending">Pending</option>
      </select>
      <select class="select" id="filter-type">
        <option value="">All Types</option>
        <option value="Birth Certificate">Birth Certificate</option>
        <option value="Degree Certificate">Degree Certificate</option>
        <option value="Aadhaar Card">Aadhaar Card</option>
        <option value="PAN Card">PAN Card</option>
        <option value="Passport">Passport</option>
        <option value="Driving License">Driving License</option>
        <option value="Marksheet">Marksheet</option>
        <option value="Other">Other</option>
      </select>
      <input type="date" class="input" id="filter-date" style="width:auto;" />
    </div>

    <!-- Table -->
    <div class="table-container">
      <table class="data-table" id="history-table">
        <thead>
          <tr>
            <th>Verification ID</th>
            <th>Document</th>
            <th>Type</th>
            <th>Submitted By</th>
            <th>Date</th>
            <th>Score</th>
            <th>Risk Level</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${renderHistoryRows(verificationHistory)}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:var(--space-4);padding:0 var(--space-2);">
      <span class="text-sm text-secondary">Showing 1-${verificationHistory.length} of ${verificationHistory.length} results</span>
      <div style="display:flex;gap:var(--space-1);">
        <button class="btn btn-secondary btn-sm" disabled>Previous</button>
        <button class="btn btn-primary btn-sm">1</button>
        <button class="btn btn-secondary btn-sm">2</button>
        <button class="btn btn-secondary btn-sm">3</button>
        <button class="btn btn-secondary btn-sm">Next</button>
      </div>
    </div>
  `;
    if (window.lucide) lucide.createIcons();
    document.getElementById("history-search").addEventListener("input", filterHistory);
    document.getElementById("filter-status").addEventListener("change", filterHistory);
    document.getElementById("filter-type").addEventListener("change", filterHistory);
  }
  function renderHistoryRows(data) {
    return data.map((item) => `
    <tr>
      <td class="table-cell-id">${item.id}</td>
      <td>
        <div style="display:flex;align-items:center;gap:var(--space-2);">
          <i data-lucide="file-text" style="width:14px;height:14px;color:var(--text-tertiary);"></i>
          <span class="truncate" style="max-width:160px;">${item.document}</span>
        </div>
      </td>
      <td><span class="tag">${item.docType}</span></td>
      <td>${item.submittedBy}</td>
      <td class="text-sm text-secondary">${item.date}</td>
      <td>${item.score !== null ? `
        <div class="score-bar">
          <div class="score-bar-track">
            <div class="score-bar-fill" style="width:${item.score}%;background:${item.score > 70 ? "var(--color-success-500)" : item.score > 40 ? "var(--color-warning-500)" : "var(--color-danger-500)"};"></div>
          </div>
          <span class="score-value">${item.score}%</span>
        </div>
      ` : '<span class="text-tertiary">\u2014</span>'}</td>
      <td>${getRiskBadge(item.risk)}</td>
      <td>${getStatusBadge2(item.status)}</td>
      <td>
        <button class="btn btn-ghost btn-sm" data-tooltip="View Details" onclick="location.hash='verify'">
          <i data-lucide="eye"></i>
        </button>
      </td>
    </tr>
  `).join("");
  }
  function filterHistory() {
    const search = document.getElementById("history-search").value.toLowerCase();
    const status = document.getElementById("filter-status").value;
    const type = document.getElementById("filter-type").value;
    let filtered = verificationHistory.filter((item) => {
      const matchSearch = !search || item.id.toLowerCase().includes(search) || item.document.toLowerCase().includes(search) || item.submittedBy.toLowerCase().includes(search);
      const matchStatus = !status || item.status === status;
      const matchType = !type || item.docType === type;
      return matchSearch && matchStatus && matchType;
    });
    const tbody = document.querySelector("#history-table tbody");
    tbody.innerHTML = filtered.length ? renderHistoryRows(filtered) : `
    <tr><td colspan="9">
      <div class="empty-state" style="padding:var(--space-8);">
        <i data-lucide="search-x"></i>
        <h3>No results found</h3>
        <p>Try adjusting your search or filter criteria.</p>
      </div>
    </td></tr>
  `;
    if (window.lucide) lucide.createIcons();
  }
  function getStatusBadge2(status) {
    const map = {
      "verified": '<span class="badge badge-verified"><i data-lucide="check-circle"></i> Verified</span>',
      "suspicious": '<span class="badge badge-suspicious"><i data-lucide="alert-triangle"></i> Suspicious</span>',
      "failed": '<span class="badge badge-failed"><i data-lucide="x-circle"></i> Failed</span>',
      "pending": '<span class="badge badge-pending"><i data-lucide="clock"></i> Pending</span>'
    };
    return map[status] || status;
  }
  function getRiskBadge(risk) {
    const map = {
      "Low": '<span class="badge badge-success">Low</span>',
      "Medium": '<span class="badge badge-info">Medium</span>',
      "High": '<span class="badge badge-warning">High</span>',
      "Critical": '<span class="badge badge-danger">Critical</span>',
      "Pending": '<span class="badge badge-neutral">Pending</span>'
    };
    return map[risk] || risk;
  }

  // js/pages/analytics.js
  function renderAnalyticsPage(container) {
    container.innerHTML = `
    <div class="page-header">
      <h1>Performance Analytics & <em class="editorial-italic">Institutional</em> Security Dynamics</h1>
      <p>Comprehensive analytics on document verification performance and trends.</p>
    </div>

    <!-- Summary KPIs -->
    <div class="analytics-summary-row">
      ${analyticsKPIs.map((kpi) => `
        <div class="analytics-summary-item">
          <i data-lucide="${kpi.icon}" style="width:20px;height:20px;color:var(--color-accent-500);margin:0 auto var(--space-2);"></i>
          <div class="analytics-summary-value">${kpi.value}</div>
          <div class="analytics-summary-label">${kpi.label}</div>
        </div>
      `).join("")}
    </div>

    <!-- Charts Grid -->
    <div class="analytics-grid">
      <!-- Verification Volume -->
      <div class="card analytics-card">
        <div class="card-header">
          <h3>Verification Volume</h3>
          <span class="text-xs text-tertiary">Last 9 months</span>
        </div>
        <div class="card-body">
          <div class="chart-container">
            <canvas id="analytics-volume-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- Success Rate -->
      <div class="card analytics-card">
        <div class="card-header">
          <h3>Verification Success Rate</h3>
          <span class="text-xs text-tertiary">Last 9 months</span>
        </div>
        <div class="card-body">
          <div class="chart-container">
            <canvas id="analytics-success-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- Suspicious Trends -->
      <div class="card analytics-card">
        <div class="card-header">
          <h3>Suspicious Document Trends</h3>
          <span class="text-xs text-tertiary">Monthly count</span>
        </div>
        <div class="card-body">
          <div class="chart-container">
            <canvas id="analytics-suspicious-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- Document Types -->
      <div class="card analytics-card">
        <div class="card-header">
          <h3>Document Types Distribution</h3>
        </div>
        <div class="card-body">
          <div class="chart-container">
            <canvas id="analytics-types-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- Risk Distribution -->
      <div class="card analytics-card">
        <div class="card-header">
          <h3>Risk Distribution</h3>
        </div>
        <div class="card-body">
          <div class="chart-container">
            <canvas id="analytics-risk-chart"></canvas>
          </div>
        </div>
      </div>

      <!-- Processing Time -->
      <div class="card analytics-card">
        <div class="card-header">
          <h3>Processing Time Distribution</h3>
        </div>
        <div class="card-body">
          <div class="chart-container">
            <canvas id="analytics-time-chart"></canvas>
          </div>
        </div>
      </div>
    </div>
  `;
    if (window.lucide) lucide.createIcons();
    setTimeout(initAnalyticsCharts, 100);
  }
  function initAnalyticsCharts() {
    createAreaChart("analytics-volume-chart", analyticsData.volumeLabels, [{
      label: "Documents Verified",
      data: analyticsData.volumeData,
      borderColor: colors.accent,
      backgroundColor: "rgba(37, 99, 235, 0.08)"
    }]);
    createLineChart("analytics-success-chart", analyticsData.successRateLabels, [{
      label: "Success Rate (%)",
      data: analyticsData.successRateData,
      borderColor: colors.success,
      backgroundColor: "rgba(16, 185, 129, 0.08)",
      fill: true
    }]);
    createBarChart("analytics-suspicious-chart", analyticsData.suspiciousTrendLabels, [{
      label: "Suspicious Documents",
      data: analyticsData.suspiciousTrendData,
      backgroundColor: colors.warning
    }]);
    createDoughnutChart(
      "analytics-types-chart",
      analyticsData.docTypes.labels,
      analyticsData.docTypes.data,
      [colors.accent, colors.success, colors.warning, colors.cyan, "#8B5CF6", colors.gray]
    );
    createDoughnutChart(
      "analytics-risk-chart",
      analyticsData.riskDistribution.labels,
      analyticsData.riskDistribution.data,
      [colors.success, colors.warning, "#F97316", colors.danger]
    );
    createBarChart("analytics-time-chart", analyticsData.processingTime.labels, [{
      label: "Documents",
      data: analyticsData.processingTime.data,
      backgroundColor: colors.cyan
    }]);
  }

  // js/pages/settings.js
  function renderSettingsPage(container) {
    container.innerHTML = `
    <div class="page-header">
      <h1>Officer Settings & <em class="editorial-italic">System</em> Security Controls</h1>
      <p>Manage your account, security preferences, and system configuration.</p>
    </div>

    <div style="max-width:800px;">
      <!-- Account -->
      <div class="card" style="margin-bottom:var(--space-4);">
        <div class="card-header">
          <h3><i data-lucide="user" style="width:16px;height:16px;display:inline;vertical-align:middle;margin-right:8px;"></i>Account Settings</h3>
        </div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);">
            <div class="input-group">
              <label>Full Name</label>
              <input class="input" value="Rahul Sharma" />
            </div>
            <div class="input-group">
              <label>Email</label>
              <input class="input" value="rahul.sharma@gov.in" />
            </div>
            <div class="input-group">
              <label>Department</label>
              <input class="input" value="Dept. of Verification Services" />
            </div>
            <div class="input-group">
              <label>Role</label>
              <select class="select">
                <option selected>Verification Officer</option>
                <option>Senior Officer</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
        </div>
        <div class="card-footer" style="display:flex;justify-content:flex-end;">
          <button class="btn btn-primary"><i data-lucide="save"></i> Save Changes</button>
        </div>
      </div>

      <!-- Security -->
      <div class="card" style="margin-bottom:var(--space-4);">
        <div class="card-header">
          <h3><i data-lucide="shield" style="width:16px;height:16px;display:inline;vertical-align:middle;margin-right:8px;"></i>Security</h3>
        </div>
        <div class="card-body">
          <div style="display:flex;flex-direction:column;gap:var(--space-4);">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-3);border:1px solid var(--border-light);border-radius:var(--radius-md);">
              <div>
                <div class="font-medium text-sm">Two-Factor Authentication</div>
                <div class="text-xs text-tertiary">Add an extra layer of security to your account</div>
              </div>
              <label style="position:relative;width:44px;height:24px;cursor:pointer;">
                <input type="checkbox" checked style="display:none;" />
                <span style="position:absolute;inset:0;background:var(--color-success-500);border-radius:12px;transition:0.2s;"></span>
                <span style="position:absolute;top:2px;left:22px;width:20px;height:20px;background:white;border-radius:50%;transition:0.2s;box-shadow:var(--shadow-sm);"></span>
              </label>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-3);border:1px solid var(--border-light);border-radius:var(--radius-md);">
              <div>
                <div class="font-medium text-sm">Session Timeout</div>
                <div class="text-xs text-tertiary">Automatically log out after inactivity</div>
              </div>
              <select class="select" style="width:auto;">
                <option>15 minutes</option>
                <option selected>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
              </select>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-3);border:1px solid var(--border-light);border-radius:var(--radius-md);">
              <div>
                <div class="font-medium text-sm">Audit Logging</div>
                <div class="text-xs text-tertiary">Log all verification actions for compliance</div>
              </div>
              <label style="position:relative;width:44px;height:24px;cursor:pointer;">
                <input type="checkbox" checked style="display:none;" />
                <span style="position:absolute;inset:0;background:var(--color-success-500);border-radius:12px;transition:0.2s;"></span>
                <span style="position:absolute;top:2px;left:22px;width:20px;height:20px;background:white;border-radius:50%;transition:0.2s;box-shadow:var(--shadow-sm);"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="card" style="margin-bottom:var(--space-4);">
        <div class="card-header">
          <h3><i data-lucide="bell" style="width:16px;height:16px;display:inline;vertical-align:middle;margin-right:8px;"></i>Notification Preferences</h3>
        </div>
        <div class="card-body">
          <div style="display:flex;flex-direction:column;gap:var(--space-3);">
            ${["Critical alerts", "Suspicious document detections", "Verification completions", "System maintenance", "Weekly reports"].map((item) => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-2) 0;">
                <span class="text-sm">${item}</span>
                <label style="position:relative;width:44px;height:24px;cursor:pointer;">
                  <input type="checkbox" ${item.includes("Critical") || item.includes("Suspicious") ? "checked" : ""} style="display:none;" />
                  <span style="position:absolute;inset:0;background:${item.includes("Critical") || item.includes("Suspicious") ? "var(--color-success-500)" : "var(--color-gray-300)"};border-radius:12px;transition:0.2s;"></span>
                  <span style="position:absolute;top:2px;${item.includes("Critical") || item.includes("Suspicious") ? "left:22px" : "left:2px"};width:20px;height:20px;background:white;border-radius:50%;transition:0.2s;box-shadow:var(--shadow-sm);"></span>
                </label>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- System -->
      <div class="card">
        <div class="card-header">
          <h3><i data-lucide="cpu" style="width:16px;height:16px;display:inline;vertical-align:middle;margin-right:8px;"></i>System Information</h3>
        </div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);">
            ${[
        ["System Version", "DocuVerify v2.4.1"],
        ["API Version", "v3.2.0"],
        ["Blockchain Node", "IVN Node v1.8"],
        ["OCR Engine", "DocuOCR v4.1"],
        ["Last Updated", "05 Sep 2026"],
        ["License", "Government Enterprise"]
      ].map(([label, value]) => `
              <div style="display:flex;justify-content:space-between;padding:var(--space-2);border-bottom:1px solid var(--border-light);">
                <span class="text-sm text-secondary">${label}</span>
                <span class="text-sm font-medium">${value}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
    if (window.lucide) lucide.createIcons();
  }

  // js/pages/help.js
  function renderHelpPage(container) {
    container.innerHTML = `
    <div class="help-page-container">
      <!-- Centered Page Header -->
      <div class="page-header">
        <h1>Help Center & <em class="editorial-italic">Operational</em> Guidelines</h1>
        <p>Find answers, documentation, operational guidelines, and contact technical support.</p>
      </div>

      <!-- Centered Search Bar -->
      <div class="help-search-container">
        <i data-lucide="search" style="position: absolute; left: 18px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: var(--text-tertiary); pointer-events: none;"></i>
        <input 
          type="text" 
          id="help-search-input" 
          placeholder="Search help articles, FAQs, and guides..." 
        />
      </div>

      <!-- Centered Quick Actions -->
      <div class="help-actions-grid">
        <div class="card help-action-card">
          <div class="card-body" style="padding: var(--space-6); display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="width: 52px; height: 52px; border-radius: var(--radius-xl); background: var(--color-accent-50); border: 1px solid var(--color-accent-100); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-3); color: var(--color-accent-600);">
              <i data-lucide="book-open" style="width: 24px; height: 24px;"></i>
            </div>
            <h4 style="font-size: var(--text-base); font-weight: 600; margin-bottom: var(--space-1); color: var(--text-primary); text-align: center;">Documentation</h4>
            <p class="text-xs text-secondary" style="max-width: 220px; margin: 0 auto; text-align: center;">Comprehensive user guides and API specifications</p>
          </div>
        </div>

        <div class="card help-action-card">
          <div class="card-body" style="padding: var(--space-6); display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="width: 52px; height: 52px; border-radius: var(--radius-xl); background: var(--color-success-50); border: 1px solid var(--color-success-100); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-3); color: var(--color-success-600);">
              <i data-lucide="message-circle" style="width: 24px; height: 24px;"></i>
            </div>
            <h4 style="font-size: var(--text-base); font-weight: 600; margin-bottom: var(--space-1); color: var(--text-primary); text-align: center;">Contact Support</h4>
            <p class="text-xs text-secondary" style="max-width: 220px; margin: 0 auto; text-align: center;">24/7 dedicated verification officer assistance</p>
          </div>
        </div>

        <div class="card help-action-card">
          <div class="card-body" style="padding: var(--space-6); display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="width: 52px; height: 52px; border-radius: var(--radius-xl); background: var(--color-warning-50); border: 1px solid var(--color-warning-100); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-3); color: var(--color-warning-600);">
              <i data-lucide="video" style="width: 24px; height: 24px;"></i>
            </div>
            <h4 style="font-size: var(--text-base); font-weight: 600; margin-bottom: var(--space-1); color: var(--text-primary); text-align: center;">Video Tutorials</h4>
            <p class="text-xs text-secondary" style="max-width: 220px; margin: 0 auto; text-align: center;">Interactive step-by-step verification walkthroughs</p>
          </div>
        </div>
      </div>

      <!-- Centered FAQ Card -->
      <div class="card" style="margin-bottom: var(--space-6); width: 100%;">
        <div class="card-header">
          <h3>Frequently Asked Questions</h3>
          <p class="text-xs text-secondary" style="margin: 0; text-align: center;">Quick answers to common questions regarding document authenticity and pipeline checks</p>
        </div>
        <div class="card-body" style="padding: 0;">
          <div id="faq-list">
            ${[
        {
          q: "How does the document verification process work?",
          a: "AuthenX utilizes a hybrid multi-layer pipeline: optical character recognition (OCR), metadata authenticity inspection, AI forgery detection, visual artifact cross-validation, and cryptographic matching against blockchain ledger records."
        },
        {
          q: "What document types are supported?",
          a: "The system accepts PDF, JPG, PNG, DOC, and DOCX formats. It automatically classifies academic degrees, government certificates, identity credentials, revenue records, and notary documents."
        },
        {
          q: "How is blockchain integrity guaranteed?",
          a: "Each verified document computes a SHA-256 cryptographic digest that is permanently inscribed on the Institutional Verification Blockchain. Any subsequent alteration creates an immediate hash divergence."
        },
        {
          q: 'What does a "Suspicious" status indicate?',
          a: "A suspicious verdict signifies that the document triggered one or more security threshold alerts (e.g. font substitution, edited metadata, or signature discrepancy). These documents are automatically flagged for manual inspector review."
        },
        {
          q: "How do I flag a document for senior officer review?",
          a: 'When viewing any verification report, click "Flag for Manual Review" in the top action bar. You can add officer notes and route the dossier to senior administrative personnel.'
        },
        {
          q: "Is citizen and organizational data secure?",
          a: "All documents are transmitted using TLS 1.3 encryption and stored with AES-256 cryptographic keys. Role-based access control (RBAC), multi-factor authentication, and tamper-evident audit trails ensure full compliance."
        }
      ].map((faq, i) => `
              <div class="help-faq-item" data-faq="${i}">
                <div class="help-faq-item-title">
                  <span class="faq-question">${faq.q}</span>
                  <i data-lucide="chevron-down" class="faq-chevron"></i>
                </div>
                <div class="help-faq-answer faq-answer">
                  ${faq.a}
                </div>
              </div>
            `).join("")}
          </div>
          <div id="faq-no-results" style="display: none; padding: var(--space-8); text-align: center; color: var(--text-tertiary);">
            <i data-lucide="help-circle" style="width: 32px; height: 32px; margin: 0 auto var(--space-2); opacity: 0.5;"></i>
            <p style="text-align: center;">No questions matched your search query. Try another keyword or contact support directly.</p>
          </div>
        </div>
      </div>

      <!-- Centered Contact Information Card -->
      <div class="card" style="width: 100%;">
        <div class="card-header">
          <h3>Direct Officer Assistance & Contact Information</h3>
          <p class="text-xs text-secondary" style="margin: 0; text-align: center;">Reach our dedicated verification engineering & nodal administrative teams</p>
        </div>
        <div class="card-body" style="padding: var(--space-6);">
          <div class="help-contact-grid">
            <div class="help-contact-cell">
              <div style="width: 44px; height: 44px; background: var(--color-accent-100); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-2); color: var(--color-accent-600);">
                <i data-lucide="mail" style="width: 20px; height: 20px;"></i>
              </div>
              <div class="text-xs text-tertiary" style="font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">Email Support</div>
              <div class="text-sm font-semibold" style="color: var(--text-primary);">support@docuverify.gov.in</div>
            </div>

            <div class="help-contact-cell">
              <div style="width: 44px; height: 44px; background: var(--color-success-100); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-2); color: var(--color-success-600);">
                <i data-lucide="phone" style="width: 20px; height: 20px;"></i>
              </div>
              <div class="text-xs text-tertiary" style="font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">Toll-Free Helpline</div>
              <div class="text-sm font-semibold" style="color: var(--text-primary);">1800-11-2024 (24/7 Service)</div>
            </div>

            <div class="help-contact-cell">
              <div style="width: 44px; height: 44px; background: var(--color-warning-100); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-2); color: var(--color-warning-600);">
                <i data-lucide="clock" style="width: 20px; height: 20px;"></i>
              </div>
              <div class="text-xs text-tertiary" style="font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">Operational Hours</div>
              <div class="text-sm font-semibold" style="color: var(--text-primary);">Mon\u2013Fri, 9:00 AM \u2013 6:00 PM IST</div>
            </div>

            <div class="help-contact-cell">
              <div style="width: 44px; height: 44px; background: var(--color-cyan-100); border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; margin-bottom: var(--space-2); color: var(--color-cyan-600);">
                <i data-lucide="map-pin" style="width: 20px; height: 20px;"></i>
              </div>
              <div class="text-xs text-tertiary" style="font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 2px;">Headquarters</div>
              <div class="text-sm font-semibold" style="color: var(--text-primary);">New Delhi, India</div>
            </div>
          </div>
        </div>
        <div class="card-footer" style="display: flex; justify-content: center; align-items: center; gap: var(--space-3); padding: var(--space-4) var(--space-6); background: rgba(248, 250, 252, 0.6);">
          <span class="text-xs text-secondary">Need urgent technical escalation?</span>
          <button class="btn btn-sm btn-primary" id="help-escalate-btn"><i data-lucide="life-buoy"></i> Raise Priority Ticket</button>
        </div>
      </div>
    </div>
  `;
    if (window.lucide) lucide.createIcons();
    container.querySelectorAll(".help-faq-item").forEach((item) => {
      item.addEventListener("click", () => {
        const answer = item.querySelector(".faq-answer");
        const chevron = item.querySelector(".faq-chevron");
        const isOpen = answer && answer.style.display === "block";
        container.querySelectorAll(".faq-answer").forEach((a) => a.style.display = "none");
        container.querySelectorAll(".faq-chevron").forEach((c) => {
          c.style.transform = "translateY(-50%)";
        });
        if (!isOpen && answer && chevron) {
          answer.style.display = "block";
          chevron.style.transform = "translateY(-50%) rotate(180deg)";
        }
      });
    });
    const searchInput = container.querySelector("#help-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const faqItems = container.querySelectorAll(".help-faq-item");
        let visibleCount = 0;
        faqItems.forEach((item) => {
          const text = item.textContent.toLowerCase();
          const matches = text.includes(query);
          item.style.display = matches ? "block" : "none";
          if (matches) visibleCount++;
        });
        const noResults = container.querySelector("#faq-no-results");
        if (noResults) {
          noResults.style.display = visibleCount === 0 ? "block" : "none";
        }
      });
    }
    const escalateBtn = container.querySelector("#help-escalate-btn");
    if (escalateBtn) {
      escalateBtn.addEventListener("click", () => {
        if (window.DocuVerify && window.DocuVerify.showToast) {
          window.DocuVerify.showToast("Priority ticket dispatched to Senior Verification Desk", "success");
        }
      });
    }
  }

  // js/app.js
  function init() {
    window.DocuVerify = window.DocuVerify || {};
    try {
      document.documentElement.removeAttribute("data-theme");
      document.getElementById("font-dock")?.remove();
      document.getElementById("palette-dock")?.remove();
      localStorage.removeItem("authenx_color_palette");
      localStorage.removeItem("authenx_font_color_option");
    } catch (e) {
    }
    try {
      renderSidebar();
    } catch (err) {
      console.error("DocuVerify: renderSidebar error:", err);
    }
    try {
      renderTopbar();
    } catch (err) {
      console.error("DocuVerify: renderTopbar error:", err);
    }
    try {
      registerRoute("home", renderHomePage);
      registerRoute("dashboard", renderDashboard);
      registerRoute("verify", renderVerifyPage);
      registerRoute("history", renderHistoryPage);
      registerRoute("analytics", renderAnalyticsPage);
      registerRoute("settings", renderSettingsPage);
      registerRoute("help", renderHelpPage);
      initRouter();
    } catch (err) {
      console.error("DocuVerify: initRouter error:", err);
    }
    window.DocuVerify.initialized = true;
    try {
      if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
      }
    } catch (err) {
      console.warn("DocuVerify: Lucide createIcons error:", err);
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
