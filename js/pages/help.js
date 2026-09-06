// ============================================
// AuthenX — Help & Support Page (Fully Centered)
// ============================================

export function renderHelpPage(container) {
  container.innerHTML = `
    <div class="help-page-container">
      <!-- Centered Page Header -->
      <div class="page-header">
        <h1>Help & Support</h1>
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
                q: 'How does the document verification process work?',
                a: 'AuthenX utilizes a hybrid multi-layer pipeline: optical character recognition (OCR), metadata authenticity inspection, AI forgery detection, visual artifact cross-validation, and cryptographic matching against blockchain ledger records.'
              },
              {
                q: 'What document types are supported?',
                a: 'The system accepts PDF, JPG, PNG, DOC, and DOCX formats. It automatically classifies academic degrees, government certificates, identity credentials, revenue records, and notary documents.'
              },
              {
                q: 'How is blockchain integrity guaranteed?',
                a: 'Each verified document computes a SHA-256 cryptographic digest that is permanently inscribed on the Institutional Verification Blockchain. Any subsequent alteration creates an immediate hash divergence.'
              },
              {
                q: 'What does a "Suspicious" status indicate?',
                a: 'A suspicious verdict signifies that the document triggered one or more security threshold alerts (e.g. font substitution, edited metadata, or signature discrepancy). These documents are automatically flagged for manual inspector review.'
              },
              {
                q: 'How do I flag a document for senior officer review?',
                a: 'When viewing any verification report, click "Flag for Manual Review" in the top action bar. You can add officer notes and route the dossier to senior administrative personnel.'
              },
              {
                q: 'Is citizen and organizational data secure?',
                a: 'All documents are transmitted using TLS 1.3 encryption and stored with AES-256 cryptographic keys. Role-based access control (RBAC), multi-factor authentication, and tamper-evident audit trails ensure full compliance.'
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
            `).join('')}
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
              <div class="text-sm font-semibold" style="color: var(--text-primary);">Mon–Fri, 9:00 AM – 6:00 PM IST</div>
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

  // FAQ accordion interaction
  container.querySelectorAll('.help-faq-item').forEach(item => {
    item.addEventListener('click', () => {
      const answer = item.querySelector('.faq-answer');
      const chevron = item.querySelector('.faq-chevron');
      const isOpen = answer && answer.style.display === 'block';

      // Close all
      container.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
      container.querySelectorAll('.faq-chevron').forEach(c => {
        c.style.transform = 'translateY(-50%)';
      });

      if (!isOpen && answer && chevron) {
        answer.style.display = 'block';
        chevron.style.transform = 'translateY(-50%) rotate(180deg)';
      }
    });
  });

  // Live FAQ search filtering
  const searchInput = container.querySelector('#help-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const faqItems = container.querySelectorAll('.help-faq-item');
      let visibleCount = 0;

      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        const matches = text.includes(query);
        item.style.display = matches ? 'block' : 'none';
        if (matches) visibleCount++;
      });

      const noResults = container.querySelector('#faq-no-results');
      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  }

  // Priority ticket escalation toast
  const escalateBtn = container.querySelector('#help-escalate-btn');
  if (escalateBtn) {
    escalateBtn.addEventListener('click', () => {
      if (window.DocuVerify && window.DocuVerify.showToast) {
        window.DocuVerify.showToast('Priority ticket dispatched to Senior Verification Desk', 'success');
      }
    });
  }
}
