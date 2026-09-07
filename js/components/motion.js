// ============================================
// AuthenX — Living Motion & Interactivity Engine
// Dynamic Spotlight, Count-Up Animations & Micro-physics
// ============================================

export function initMotion() {
  initCardSpotlights();
  initDocumentClickRipples();
}

/**
 * Attaches dynamic cursor-tracking light reflections to cards
 */
export function initCardSpotlights() {
  document.addEventListener('mousemove', (e) => {
    // Only track when near cards for performance
    const target = e.target.closest(
      '.card, .kpi-card, .home-showcase-card, .home-pillar-card, .home-fact-card, .faq-card, .phone-mockup, .interactive-spotlight'
    );
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
    target.classList.add('interactive-spotlight');
  }, { passive: true });
}

/**
 * Smooth count-up animation for metrics and statistics
 */
export function animateCounters(root = document) {
  const elements = root.querySelectorAll('.counter-num, .home-fact-val, [data-counter]');

  elements.forEach((el) => {
    if (el.dataset.animated === 'true') return;

    const originalText = el.textContent.trim();
    // Parse target number (handling strings like 99.8%, 1.2M+, 5,739, < 450ms)
    const match = originalText.match(/([\d,.]+)/);
    if (!match) return;

    const rawNumStr = match[1].replace(/,/g, '');
    const targetVal = parseFloat(rawNumStr);
    if (isNaN(targetVal)) return;

    const hasPercent = originalText.includes('%');
    const hasPlus = originalText.includes('+');
    const hasM = originalText.includes('M');
    const hasLess = originalText.includes('<');
    const hasMs = originalText.includes('ms');
    const isFloat = rawNumStr.includes('.');

    el.dataset.animated = 'true';
    const duration = 1200; // ms
    const startTime = performance.now();

    function update(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = targetVal * ease;

      let formatted = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString();
      if (hasLess) formatted = '< ' + formatted;
      if (hasM) formatted = formatted + 'M';
      if (hasPlus) formatted = formatted + '+';
      if (hasPercent) formatted = formatted + '%';
      if (hasMs) formatted = formatted + 'ms';

      el.textContent = formatted;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = originalText; // Ensure exact final text
      }
    }

    requestAnimationFrame(update);
  });
}

/**
 * Micro-scale click feedback on interactive buttons and pills
 */
function initDocumentClickRipples() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn, .home-tab-btn, .sample-doc-pill, .doc-filter-pill');
    if (!btn) return;

    btn.style.transform = 'scale(0.96)';
    setTimeout(() => {
      btn.style.transform = '';
    }, 120);
  });
}
