import { documents, alerts } from '../data/mockData.js';

export function showModal(title, bodyHTML, footerHTML = '') {
  // Remove existing modal immediately
  closeModal(true);

  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.id = 'active-modal';
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
      ${footerHTML ? `<div class="modal-footer">${footerHTML}</div>` : ''}
    </div>
  `;

  document.body.appendChild(modal);
  if (window.lucide) lucide.createIcons();

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);
}

let activeCloseTimeout = null;

export function closeModal(immediate = false) {
  if (activeCloseTimeout) {
    clearTimeout(activeCloseTimeout);
    activeCloseTimeout = null;
  }
  const modal = document.getElementById('active-modal');
  if (modal) {
    if (immediate) {
      modal.remove();
    } else {
      modal.removeAttribute('id');
      modal.style.opacity = '0';
      activeCloseTimeout = setTimeout(() => {
        modal.remove();
        activeCloseTimeout = null;
      }, 150);
    }
  }
  if (immediate) {
    document.querySelectorAll('.modal-backdrop').forEach(m => m.remove());
  }
}

export function showConfirmDialog(title, message, confirmText, onConfirm) {
  showModal(
    title,
    `<p style="color:var(--text-secondary);font-size:var(--text-sm);">${message}</p>`,
    `
      <button class="btn btn-secondary" onclick="window.DocuVerify.closeModal()">Cancel</button>
      <button class="btn btn-primary" id="confirm-action-btn">${confirmText}</button>
    `
  );

  setTimeout(() => {
    const btn = document.getElementById('confirm-action-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        if (onConfirm) onConfirm();
        closeModal();
      });
    }
  }, 50);
}

export function openDocumentSearchModal(initialQuery = '') {
  closeModal(true);

  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.id = 'active-modal';
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
        <span><kbd style="background:var(--surface-secondary);padding:2px 6px;border-radius:4px;border:1px solid var(--border-light);">ESC</kbd> to close &nbsp; • &nbsp; Document Repository (8 active records)</span>
        <button class="btn btn-secondary btn-sm" onclick="window.DocuVerify.closeModal(); location.hash='verify';">
          <i data-lucide="file-search"></i> Verify New Document
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  if (window.lucide) lucide.createIcons();

  const searchInput = modal.querySelector('#doc-modal-search-input');
  const listContainer = modal.querySelector('#doc-modal-list');
  let currentFilter = 'all';

  function renderList() {
    const q = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const filtered = documents.filter(doc => {
      const matchesCategory = currentFilter === 'all' ? true :
        currentFilter === 'Flagged' ? (doc.regStatus === 'Flagged' || doc.blockchainStatus === 'Mismatch') :
        doc.type.includes(currentFilter) || (currentFilter === 'ID Card' && (doc.type.includes('Aadhaar') || doc.type.includes('PAN') || doc.type.includes('Passport') || doc.type.includes('Driving')));
      
      const matchesQuery = !q || 
        doc.name.toLowerCase().includes(q) || 
        doc.id.toLowerCase().includes(q) || 
        doc.authority.toLowerCase().includes(q) || 
        doc.type.toLowerCase().includes(q) ||
        doc.regStatus.toLowerCase().includes(q);

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
      listContainer.innerHTML = filtered.map(doc => `
        <div class="card" style="padding:var(--space-4);display:flex;align-items:center;justify-content:space-between;gap:var(--space-4);transition:all 0.15s ease;">
          <div style="display:flex;align-items:center;gap:var(--space-3);flex:1;min-width:0;">
            <div style="width:40px;height:40px;border-radius:var(--radius-md);background:var(--surface-secondary);border:1px solid var(--border-light);display:flex;align-items:center;justify-content:center;color:var(--color-accent-600);flex-shrink:0;">
              <i data-lucide="${doc.format === 'PDF' ? 'file-text' : 'file-image'}"></i>
            </div>
            <div style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:var(--space-2);margin-bottom:2px;">
                <span style="font-size:var(--text-sm);font-weight:var(--font-semibold);color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${doc.name}</span>
                <span class="badge badge-gray" style="font-size:10px;">${doc.format}</span>
              </div>
              <div style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:var(--space-3);flex-wrap:wrap;">
                <span>ID: <code style="font-family:var(--font-mono);">${doc.id}</code></span>
                <span>•</span>
                <span>${doc.authority}</span>
              </div>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:var(--space-3);flex-shrink:0;">
            <span class="badge ${doc.regStatus === 'Registered' ? 'badge-green' : doc.regStatus === 'Flagged' ? 'badge-red' : doc.regStatus === 'Pending' ? 'badge-amber' : 'badge-gray'}">
              ${doc.regStatus}
            </span>
            <button class="btn btn-secondary btn-xs view-doc-detail-btn" data-doc-id="${doc.id}">
              <i data-lucide="eye" style="width:14px;height:14px;"></i> Details
            </button>
          </div>
        </div>
      `).join('');
    }

    if (window.lucide) lucide.createIcons();

    // Attach click listeners for doc details
    listContainer.querySelectorAll('.view-doc-detail-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const docId = e.currentTarget.dataset.docId;
        showDocumentDetailModal(docId);
      });
    });
  }

  renderList();

  if (searchInput) {
    searchInput.addEventListener('input', renderList);
    setTimeout(() => {
      searchInput.focus();
      const valLen = searchInput.value.length;
      if (valLen > 0) {
        searchInput.setSelectionRange(valLen, valLen);
      }
    }, 40);
  }

  modal.querySelectorAll('.doc-filter-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      modal.querySelectorAll('.doc-filter-pill').forEach(p => p.classList.remove('active', 'btn-primary'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      renderList();
    });
  });

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

export function showDocumentDetailModal(docId) {
  const doc = documents.find(d => d.id === docId) || documents[0];

  showModal(
    `Document Metadata — ${doc.id}`,
    `
      <div style="display:flex;flex-direction:column;gap:var(--space-4);">
        <div style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-4);background:var(--surface-secondary);border-radius:var(--radius-lg);border:1px solid var(--border-light);">
          <div style="width:44px;height:44px;border-radius:var(--radius-md);background:var(--color-accent-100);color:var(--color-accent-600);display:flex;align-items:center;justify-content:center;">
            <i data-lucide="file-check-2" style="width:24px;height:24px;"></i>
          </div>
          <div>
            <h4 style="font-size:var(--text-base);font-weight:var(--font-bold);color:var(--text-primary);margin-bottom:2px;">${doc.name}</h4>
            <div style="font-size:12px;color:var(--text-secondary);">${doc.type} &nbsp;•&nbsp; Format: ${doc.format}</div>
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

export function openNotificationsDrawer() {
  closeModal(true);

  const modal = document.createElement('div');
  modal.className = 'modal-backdrop';
  modal.id = 'active-modal';
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
          ${alerts.map(item => `
            <div class="card" style="padding:var(--space-4);border-left:4px solid ${item.severity === 'critical' ? 'var(--color-danger-500)' : item.severity === 'warning' ? 'var(--color-warning-500)' : 'var(--color-accent-500)'};">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-3);margin-bottom:var(--space-2);">
                <div style="display:flex;align-items:center;gap:var(--space-2);">
                  <span class="badge ${item.severity === 'critical' ? 'badge-red' : item.severity === 'warning' ? 'badge-amber' : 'badge-blue'}" style="font-size:10px;text-transform:uppercase;">
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
          `).join('')}
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

  const markAllReadBtn = modal.querySelector('#mark-all-read-btn');
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', () => {
      const dot = document.querySelector('.notification-dot');
      if (dot) dot.style.display = 'none';
      markAllReadBtn.textContent = 'All Marked Read ✓';
      markAllReadBtn.style.color = 'var(--color-success-600)';
    });
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// Expose globally
window.DocuVerify = window.DocuVerify || {};
window.DocuVerify.closeModal = closeModal;
window.DocuVerify.openDocumentSearchModal = openDocumentSearchModal;
window.DocuVerify.showDocumentDetailModal = showDocumentDetailModal;
window.DocuVerify.openNotificationsDrawer = openNotificationsDrawer;
