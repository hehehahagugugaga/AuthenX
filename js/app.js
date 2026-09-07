// ============================================
// DocuVerify — App Entry Point
// ============================================

import { initRouter, registerRoute } from './router.js';
import { renderSidebar } from './components/sidebar.js';
import { renderTopbar } from './components/topbar.js';

// Pages
import { renderHomePage } from './pages/home.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderVerifyPage } from './pages/verify.js';
import { renderHistoryPage } from './pages/history.js';
import { renderAnalyticsPage } from './pages/analytics.js';
import { renderSettingsPage } from './pages/settings.js';
import { renderHelpPage } from './pages/help.js';

// Import modals (for global exposure)
import './components/modals.js';

function init() {
  window.DocuVerify = window.DocuVerify || {};

  // Clean up any lingering theme attributes and docks
  try {
    document.documentElement.removeAttribute('data-theme');
    document.getElementById('font-dock')?.remove();
    document.getElementById('palette-dock')?.remove();
    localStorage.removeItem('authenx_color_palette');
    localStorage.removeItem('authenx_font_color_option');
  } catch (e) {}

  // Render shell components with individual isolation
  try {
    renderSidebar();
  } catch (err) {
    console.error('DocuVerify: renderSidebar error:', err);
  }

  try {
    renderTopbar();
  } catch (err) {
    console.error('DocuVerify: renderTopbar error:', err);
  }

  // Register routes & initialize router
  try {
    registerRoute('home', renderHomePage);
    registerRoute('dashboard', renderDashboard);
    registerRoute('verify', renderVerifyPage);
    registerRoute('history', renderHistoryPage);
    registerRoute('analytics', renderAnalyticsPage);
    registerRoute('settings', renderSettingsPage);
    registerRoute('help', renderHelpPage);

    initRouter();
  } catch (err) {
    console.error('DocuVerify: initRouter error:', err);
  }

  window.DocuVerify.initialized = true;

  // Initialize Lucide icons
  try {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  } catch (err) {
    console.warn('DocuVerify: Lucide createIcons error:', err);
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
