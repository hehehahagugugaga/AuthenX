// ============================================
// DocuVerify — Analytics Page
// ============================================

import { analyticsData, analyticsKPIs } from '../data/mockData.js';
import { createLineChart, createBarChart, createDoughnutChart, createAreaChart, colors } from '../components/charts.js';

export function renderAnalyticsPage(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>Performance Analytics & <em class="editorial-italic">Institutional</em> Security Dynamics</h1>
      <p>Comprehensive analytics on document verification performance and trends.</p>
    </div>

    <!-- Summary KPIs -->
    <div class="analytics-summary-row">
      ${analyticsKPIs.map(kpi => `
        <div class="analytics-summary-item">
          <i data-lucide="${kpi.icon}" style="width:20px;height:20px;color:var(--color-accent-500);margin:0 auto var(--space-2);"></i>
          <div class="analytics-summary-value">${kpi.value}</div>
          <div class="analytics-summary-label">${kpi.label}</div>
        </div>
      `).join('')}
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

  // Initialize charts with a slight delay
  setTimeout(initAnalyticsCharts, 100);
}

function initAnalyticsCharts() {
  // Volume (area)
  createAreaChart('analytics-volume-chart', analyticsData.volumeLabels, [{
    label: 'Documents Verified',
    data: analyticsData.volumeData,
    borderColor: colors.accent,
    backgroundColor: 'rgba(37, 99, 235, 0.08)'
  }]);

  // Success Rate (line)
  createLineChart('analytics-success-chart', analyticsData.successRateLabels, [{
    label: 'Success Rate (%)',
    data: analyticsData.successRateData,
    borderColor: colors.success,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    fill: true
  }]);

  // Suspicious Trends (bar)
  createBarChart('analytics-suspicious-chart', analyticsData.suspiciousTrendLabels, [{
    label: 'Suspicious Documents',
    data: analyticsData.suspiciousTrendData,
    backgroundColor: colors.warning
  }]);

  // Document Types (doughnut)
  createDoughnutChart('analytics-types-chart',
    analyticsData.docTypes.labels,
    analyticsData.docTypes.data,
    [colors.accent, colors.success, colors.warning, colors.cyan, '#8B5CF6', colors.gray]
  );

  // Risk Distribution (doughnut)
  createDoughnutChart('analytics-risk-chart',
    analyticsData.riskDistribution.labels,
    analyticsData.riskDistribution.data,
    [colors.success, colors.warning, '#F97316', colors.danger]
  );

  // Processing Time (bar)
  createBarChart('analytics-time-chart', analyticsData.processingTime.labels, [{
    label: 'Documents',
    data: analyticsData.processingTime.data,
    backgroundColor: colors.cyan
  }]);
}
