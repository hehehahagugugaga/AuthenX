// ============================================
// DocuVerify — Verification History Page
// ============================================

import { verificationHistory } from '../data/mockData.js';

export function renderHistoryPage(container) {
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

  // Search filter
  document.getElementById('history-search').addEventListener('input', filterHistory);
  document.getElementById('filter-status').addEventListener('change', filterHistory);
  document.getElementById('filter-type').addEventListener('change', filterHistory);
}

function renderHistoryRows(data) {
  return data.map(item => `
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
            <div class="score-bar-fill" style="width:${item.score}%;background:${item.score > 70 ? 'var(--color-success-500)' : item.score > 40 ? 'var(--color-warning-500)' : 'var(--color-danger-500)'};"></div>
          </div>
          <span class="score-value">${item.score}%</span>
        </div>
      ` : '<span class="text-tertiary">—</span>'}</td>
      <td>${getRiskBadge(item.risk)}</td>
      <td>${getStatusBadge(item.status)}</td>
      <td>
        <button class="btn btn-ghost btn-sm" data-tooltip="View Details" onclick="location.hash='verify'">
          <i data-lucide="eye"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

function filterHistory() {
  const search = document.getElementById('history-search').value.toLowerCase();
  const status = document.getElementById('filter-status').value;
  const type = document.getElementById('filter-type').value;

  let filtered = verificationHistory.filter(item => {
    const matchSearch = !search ||
      item.id.toLowerCase().includes(search) ||
      item.document.toLowerCase().includes(search) ||
      item.submittedBy.toLowerCase().includes(search);
    const matchStatus = !status || item.status === status;
    const matchType = !type || item.docType === type;
    return matchSearch && matchStatus && matchType;
  });

  const tbody = document.querySelector('#history-table tbody');
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

function getStatusBadge(status) {
  const map = {
    'verified': '<span class="badge badge-verified"><i data-lucide="check-circle"></i> Verified</span>',
    'suspicious': '<span class="badge badge-suspicious"><i data-lucide="alert-triangle"></i> Suspicious</span>',
    'failed': '<span class="badge badge-failed"><i data-lucide="x-circle"></i> Failed</span>',
    'pending': '<span class="badge badge-pending"><i data-lucide="clock"></i> Pending</span>'
  };
  return map[status] || status;
}

function getRiskBadge(risk) {
  const map = {
    'Low': '<span class="badge badge-success">Low</span>',
    'Medium': '<span class="badge badge-info">Medium</span>',
    'High': '<span class="badge badge-warning">High</span>',
    'Critical': '<span class="badge badge-danger">Critical</span>',
    'Pending': '<span class="badge badge-neutral">Pending</span>'
  };
  return map[risk] || risk;
}
