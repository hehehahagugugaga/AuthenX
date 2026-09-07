// ============================================
// DocuVerify — Dashboard Page
// ============================================

import { kpiData, recentActivity, securityServices, chartData7d, chartData30d, chartData3m } from '../data/mockData.js';
import { createLineChart, colors } from '../components/charts.js';

let verificationChart = null;

export function renderDashboard(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>Document Authentication & <em class="editorial-italic">Operational</em> Telemetry</h1>
      <p>Monitor document verification activity, authenticity results, and security alerts.</p>
    </div>

    <!-- KPI Cards -->
    <div class="kpi-grid">
      ${kpiData.map(kpi => `
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
            <i data-lucide="${kpi.changeDir === 'up' ? 'trending-up' : 'trending-down'}"></i>
            ${kpi.change} vs last month
          </span>
        </div>
      `).join('')}
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
                ${recentActivity.map(item => `
                  <tr>
                    <td class="table-cell-id">${item.id}</td>
                    <td>${item.docType}</td>
                    <td>${item.submittedBy}</td>
                    <td>${getStatusBadge(item.status)}</td>
                    <td>${getRiskIndicator(item.riskScore)}</td>
                    <td class="text-sm text-tertiary">${item.timestamp}</td>
                  </tr>
                `).join('')}
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
            ${securityServices.map(svc => `
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
            `).join('')}
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

  // Initialize icons
  if (window.lucide) lucide.createIcons();

  // Initialize chart
  initChart('7d');

  // Tab switching
  document.getElementById('chart-period-tabs').addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
      document.querySelectorAll('#chart-period-tabs .tab-btn').forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      initChart(e.target.dataset.period);
    }
  });
}

function initChart(period) {
  try {
    if (verificationChart && typeof verificationChart.destroy === 'function') {
      verificationChart.destroy();
      verificationChart = null;
    }

    const dataMap = { '7d': chartData7d, '30d': chartData30d, '3m': chartData3m };
    const data = dataMap[period] || chartData7d;
    if (!data) return;

    verificationChart = createLineChart('verification-chart', data.labels, [
      {
        label: 'Verified',
        data: data.verified,
        borderColor: colors.success,
        backgroundColor: colors.successLight,
        fill: true
      },
      {
        label: 'Suspicious',
        data: data.suspicious,
        borderColor: colors.warning,
        backgroundColor: colors.warningLight,
        fill: false
      },
      {
        label: 'Failed',
        data: data.failed,
        borderColor: colors.danger,
        backgroundColor: colors.dangerLight,
        fill: false
      }
    ]);
  } catch (err) {
    console.warn('Dashboard chart render skipped or deferred:', err);
  }
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

function getRiskIndicator(score) {
  if (score === null) return '<span class="text-tertiary text-xs">—</span>';

  let color = 'green';
  let label = 'Low';
  if (score > 80) { color = 'red'; label = 'Critical'; }
  else if (score > 50) { color = 'amber'; label = 'High'; }
  else if (score > 20) { color = 'blue'; label = 'Medium'; }

  return `
    <div class="score-bar">
      <div class="score-bar-track">
        <div class="score-bar-fill" style="width:${score}%;background:var(--color-${color === 'amber' ? 'warning' : color === 'red' ? 'danger' : color === 'blue' ? 'accent' : 'success'}-500);"></div>
      </div>
      <span class="score-value">${score}%</span>
    </div>
  `;
}
