// ============================================
// DocuVerify — Documents Page
// ============================================

import { documents } from '../data/mockData.js';

export function renderDocumentsPage(container) {
  container.innerHTML = `
    <div class="page-header">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <h1>Documents</h1>
          <p>Document repository — view registered, verified, and flagged documents.</p>
        </div>
        <div style="display:flex;gap:var(--space-2);">
          <button class="btn btn-secondary btn-sm" id="view-table-btn" data-tooltip="Table View">
            <i data-lucide="list"></i>
          </button>
          <button class="btn btn-primary btn-sm" id="view-grid-btn" data-tooltip="Grid View">
            <i data-lucide="layout-grid"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filter-bar">
      <div class="search-input">
        <i data-lucide="search"></i>
        <input type="text" placeholder="Search documents..." id="docs-search" />
      </div>
      <select class="select" id="docs-filter-type">
        <option value="">All Types</option>
        <option value="Birth Certificate">Birth Certificate</option>
        <option value="Degree Certificate">Degree Certificate</option>
        <option value="Aadhaar Card">Aadhaar Card</option>
        <option value="PAN Card">PAN Card</option>
        <option value="Passport">Passport</option>
        <option value="Driving License">Driving License</option>
      </select>
      <select class="select" id="docs-filter-status">
        <option value="">All Statuses</option>
        <option value="Registered">Registered</option>
        <option value="Unregistered">Unregistered</option>
        <option value="Pending">Pending</option>
        <option value="Flagged">Flagged</option>
      </select>
    </div>

    <!-- Grid View -->
    <div class="documents-grid" id="docs-grid">
      ${documents.map(doc => renderDocCard(doc)).join('')}
    </div>

    <!-- Table View (hidden by default) -->
    <div class="table-container hidden" id="docs-table">
      <table class="data-table">
        <thead>
          <tr>
            <th>Document ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Issuing Authority</th>
            <th>Registration</th>
            <th>Blockchain</th>
            <th>Last Verified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${documents.map(doc => `
            <tr>
              <td class="table-cell-id">${doc.id}</td>
              <td class="truncate" style="max-width:200px;">${doc.name}</td>
              <td><span class="tag">${doc.type}</span></td>
              <td class="text-sm">${doc.authority}</td>
              <td>${getRegBadge(doc.regStatus)}</td>
              <td>${getBlockchainBadge(doc.blockchainStatus)}</td>
              <td class="text-sm text-secondary">${doc.lastVerified}</td>
              <td>
                <div style="display:flex;gap:var(--space-1);">
                  <button class="btn btn-ghost btn-sm" data-tooltip="View"><i data-lucide="eye"></i></button>
                  <button class="btn btn-ghost btn-sm" data-tooltip="Verify"><i data-lucide="shield-check"></i></button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // View toggle
  document.getElementById('view-grid-btn').addEventListener('click', () => {
    document.getElementById('docs-grid').classList.remove('hidden');
    document.getElementById('docs-table').classList.add('hidden');
    document.getElementById('view-grid-btn').classList.replace('btn-secondary', 'btn-primary');
    document.getElementById('view-table-btn').classList.replace('btn-primary', 'btn-secondary');
  });

  document.getElementById('view-table-btn').addEventListener('click', () => {
    document.getElementById('docs-grid').classList.add('hidden');
    document.getElementById('docs-table').classList.remove('hidden');
    document.getElementById('view-table-btn').classList.replace('btn-secondary', 'btn-primary');
    document.getElementById('view-grid-btn').classList.replace('btn-primary', 'btn-secondary');
  });

  // Search
  document.getElementById('docs-search').addEventListener('input', filterDocs);
  document.getElementById('docs-filter-type').addEventListener('change', filterDocs);
  document.getElementById('docs-filter-status').addEventListener('change', filterDocs);
}

function renderDocCard(doc) {
  const typeIcons = {
    'Birth Certificate': 'file-text',
    'Degree Certificate': 'graduation-cap',
    'Aadhaar Card': 'credit-card',
    'PAN Card': 'credit-card',
    'Passport': 'book-open',
    'Driving License': 'car',
    'Income Certificate': 'indian-rupee',
    'Caste Certificate': 'file-text'
  };

  return `
    <div class="doc-card" data-name="${doc.name.toLowerCase()}" data-type="${doc.type}" data-status="${doc.regStatus}">
      <div class="doc-card-thumb">
        <i data-lucide="${typeIcons[doc.type] || 'file-text'}"></i>
        <span class="doc-type-badge tag">${doc.format}</span>
      </div>
      <div class="doc-card-body">
        <div class="doc-card-name truncate">${doc.name}</div>
        <div class="doc-card-id">${doc.id}</div>
        <div class="doc-card-meta">
          <div class="doc-card-meta-row">
            <span>Type</span>
            <span class="font-medium">${doc.type}</span>
          </div>
          <div class="doc-card-meta-row">
            <span>Authority</span>
            <span class="font-medium truncate" style="max-width:150px;">${doc.authority}</span>
          </div>
          <div class="doc-card-meta-row">
            <span>Registration</span>
            ${getRegBadge(doc.regStatus)}
          </div>
          <div class="doc-card-meta-row">
            <span>Blockchain</span>
            ${getBlockchainBadge(doc.blockchainStatus)}
          </div>
        </div>
      </div>
      <div class="doc-card-footer">
        <span class="text-xs text-tertiary">Last verified: ${doc.lastVerified}</span>
        <button class="btn btn-ghost btn-sm" onclick="location.hash='verify'">
          <i data-lucide="shield-check"></i>
        </button>
      </div>
    </div>
  `;
}

function filterDocs() {
  const search = document.getElementById('docs-search').value.toLowerCase();
  const type = document.getElementById('docs-filter-type').value;
  const status = document.getElementById('docs-filter-status').value;

  document.querySelectorAll('.doc-card').forEach(card => {
    const name = card.dataset.name;
    const cardType = card.dataset.type;
    const cardStatus = card.dataset.status;

    const matchSearch = !search || name.includes(search);
    const matchType = !type || cardType === type;
    const matchStatus = !status || cardStatus === status;

    card.style.display = (matchSearch && matchType && matchStatus) ? '' : 'none';
  });
}

function getRegBadge(status) {
  const map = {
    'Registered': '<span class="badge badge-success">Registered</span>',
    'Unregistered': '<span class="badge badge-danger">Unregistered</span>',
    'Pending': '<span class="badge badge-pending">Pending</span>',
    'Flagged': '<span class="badge badge-warning">Flagged</span>'
  };
  return map[status] || status;
}

function getBlockchainBadge(status) {
  const map = {
    'Verified': '<span class="badge badge-success"><i data-lucide="check-circle"></i> Verified</span>',
    'Not Found': '<span class="badge badge-danger"><i data-lucide="x-circle"></i> Not Found</span>',
    'Pending': '<span class="badge badge-pending"><i data-lucide="clock"></i> Pending</span>',
    'Mismatch': '<span class="badge badge-warning"><i data-lucide="alert-triangle"></i> Mismatch</span>'
  };
  return map[status] || status;
}
