// ============================================
// DocuVerify — Alerts Page
// ============================================

import { alerts } from '../data/mockData.js';

export function renderAlertsPage(container) {
  const critical = alerts.filter(a => a.severity === 'critical');
  const warning = alerts.filter(a => a.severity === 'warning');
  const info = alerts.filter(a => a.severity === 'info');

  container.innerHTML = `
    <div class="page-header">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <h1>Security Alerts</h1>
          <p>Monitor document verification security alerts and anomalies.</p>
        </div>
        <button class="btn btn-secondary btn-sm">
          <i data-lucide="check-check"></i> Mark All Read
        </button>
      </div>
    </div>

    <!-- Summary -->
    <div class="alerts-summary">
      <div class="alert-summary-card critical">
        <i data-lucide="alert-octagon" style="width:24px;height:24px;color:var(--color-danger-500);"></i>
        <div>
          <div class="alert-summary-count">${critical.length}</div>
          <div class="alert-summary-label">Critical Alerts</div>
        </div>
      </div>
      <div class="alert-summary-card warning">
        <i data-lucide="alert-triangle" style="width:24px;height:24px;color:var(--color-warning-500);"></i>
        <div>
          <div class="alert-summary-count">${warning.length}</div>
          <div class="alert-summary-label">Warning Alerts</div>
        </div>
      </div>
      <div class="alert-summary-card info">
        <i data-lucide="info" style="width:24px;height:24px;color:var(--color-accent-500);"></i>
        <div>
          <div class="alert-summary-count">${info.length}</div>
          <div class="alert-summary-label">Informational</div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filter-bar" style="margin-bottom:var(--space-4);">
      <div class="search-input">
        <i data-lucide="search"></i>
        <input type="text" placeholder="Search alerts..." id="alerts-search" />
      </div>
      <select class="select" id="alerts-severity-filter">
        <option value="">All Severities</option>
        <option value="critical">Critical</option>
        <option value="warning">Warning</option>
        <option value="info">Informational</option>
      </select>
      <select class="select" id="alerts-status-filter">
        <option value="">All Statuses</option>
        <option value="Open">Open</option>
        <option value="Under Review">Under Review</option>
        <option value="Monitoring">Monitoring</option>
        <option value="Resolved">Resolved</option>
        <option value="Acknowledged">Acknowledged</option>
      </select>
    </div>

    <!-- Alert List -->
    <div id="alerts-list">
      ${renderAlertItems(alerts)}
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Filters
  const filterFn = () => {
    const search = document.getElementById('alerts-search').value.toLowerCase();
    const severity = document.getElementById('alerts-severity-filter').value;
    const status = document.getElementById('alerts-status-filter').value;

    const filtered = alerts.filter(a => {
      const matchSearch = !search || a.title.toLowerCase().includes(search) || a.description.toLowerCase().includes(search);
      const matchSeverity = !severity || a.severity === severity;
      const matchStatus = !status || a.status === status;
      return matchSearch && matchSeverity && matchStatus;
    });

    document.getElementById('alerts-list').innerHTML = filtered.length
      ? renderAlertItems(filtered)
      : `<div class="empty-state"><i data-lucide="bell-off"></i><h3>No alerts found</h3><p>Try adjusting your filters.</p></div>`;
    if (window.lucide) lucide.createIcons();
  };

  document.getElementById('alerts-search').addEventListener('input', filterFn);
  document.getElementById('alerts-severity-filter').addEventListener('change', filterFn);
  document.getElementById('alerts-status-filter').addEventListener('change', filterFn);
}

function renderAlertItems(alertList) {
  return alertList.map(alert => `
    <div class="alert-item">
      <div class="alert-severity ${alert.severity}"></div>
      <div class="alert-content">
        <div class="alert-title">
          <i data-lucide="${alert.severity === 'critical' ? 'alert-octagon' : alert.severity === 'warning' ? 'alert-triangle' : 'info'}"
             style="width:14px;height:14px;display:inline;vertical-align:middle;margin-right:6px;color:${
               alert.severity === 'critical' ? 'var(--color-danger-500)' :
               alert.severity === 'warning' ? 'var(--color-warning-500)' : 'var(--color-accent-500)'
             };"></i>
          ${alert.title}
        </div>
        <div class="alert-description">${alert.description}</div>
        <div class="alert-meta">
          <span><i data-lucide="file-text" style="width:11px;height:11px;display:inline;vertical-align:middle;margin-right:3px;"></i>${alert.docId}</span>
          <span><i data-lucide="clock" style="width:11px;height:11px;display:inline;vertical-align:middle;margin-right:3px;"></i>${alert.timestamp}</span>
          <span>${getAlertStatusBadge(alert.status)}</span>
        </div>
      </div>
      <div class="alert-actions">
        ${alert.status !== 'Resolved' && alert.status !== 'Acknowledged' ? `
          <button class="btn btn-secondary btn-sm">
            <i data-lucide="eye"></i> Review
          </button>
          <button class="btn btn-ghost btn-sm">
            <i data-lucide="check"></i>
          </button>
        ` : `
          <span class="badge badge-neutral">${alert.status}</span>
        `}
      </div>
    </div>
  `).join('');
}

function getAlertStatusBadge(status) {
  const map = {
    'Open': '<span class="badge badge-danger">Open</span>',
    'Under Review': '<span class="badge badge-warning">Under Review</span>',
    'Monitoring': '<span class="badge badge-info">Monitoring</span>',
    'Resolved': '<span class="badge badge-success">Resolved</span>',
    'Acknowledged': '<span class="badge badge-neutral">Acknowledged</span>'
  };
  return map[status] || status;
}
