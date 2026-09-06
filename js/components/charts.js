// ============================================
// DocuVerify — Charts Helper
// Chart.js wrapper with design tokens
// ============================================

const baseFont = "'Inter', sans-serif";

const colors = {
  accent: '#2563EB',
  accentLight: 'rgba(37, 99, 235, 0.1)',
  success: '#10B981',
  successLight: 'rgba(16, 185, 129, 0.1)',
  warning: '#F59E0B',
  warningLight: 'rgba(245, 158, 11, 0.1)',
  danger: '#EF4444',
  dangerLight: 'rgba(239, 68, 68, 0.1)',
  cyan: '#06B6D4',
  cyanLight: 'rgba(6, 182, 212, 0.1)',
  gray: '#94A3B8',
  grayLight: '#F1F5F9',
  border: '#E2E8F0',
  text: '#334155',
  textSecondary: '#64748B'
};

const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',
      labels: {
        font: { family: baseFont, size: 12 },
        color: colors.textSecondary,
        usePointStyle: true,
        pointStyle: 'circle',
        padding: 16
      }
    },
    tooltip: {
      backgroundColor: '#0F172A',
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

export function createLineChart(canvasId, labels, datasets) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js not loaded yet for canvas:', canvasId);
    return null;
  }

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: datasets.map(ds => ({
        ...ds,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.35,
        fill: ds.fill !== undefined ? ds.fill : false
      }))
    },
    options: {
      ...chartDefaults,
      interaction: {
        mode: 'index',
        intersect: false
      }
    }
  });
}

export function createBarChart(canvasId, labels, datasets) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js not loaded yet for canvas:', canvasId);
    return null;
  }

  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: datasets.map(ds => ({
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

export function createDoughnutChart(canvasId, labels, data, backgroundColors) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js not loaded yet for canvas:', canvasId);
    return null;
  }

  return new Chart(ctx, {
    type: 'doughnut',
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
        borderColor: '#FFFFFF',
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '65%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { family: baseFont, size: 12 },
            color: colors.textSecondary,
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 16
          }
        },
        tooltip: chartDefaults.plugins.tooltip
      }
    }
  });
}

export function createAreaChart(canvasId, labels, datasets) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return null;

  return new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: datasets.map(ds => ({
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
        mode: 'index',
        intersect: false
      }
    }
  });
}

export { colors };
