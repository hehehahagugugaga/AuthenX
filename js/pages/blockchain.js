// ============================================
// DocuVerify — Blockchain Ledger Page
// ============================================

import { blockchainLedger } from '../data/mockData.js';

export function renderBlockchainPage(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>Blockchain Verification Ledger</h1>
      <p>View trusted document records stored on the Institutional Verification Network.</p>
    </div>

    <!-- Stats -->
    <div class="ledger-stats">
      <div class="ledger-stat-card">
        <div class="ledger-stat-icon" style="background:var(--color-accent-100);color:var(--color-accent-600);">
          <i data-lucide="database"></i>
        </div>
        <div>
          <div class="ledger-stat-value">18,492,103</div>
          <div class="ledger-stat-label">Total Registered Documents</div>
        </div>
      </div>
      <div class="ledger-stat-card">
        <div class="ledger-stat-icon" style="background:var(--color-success-100);color:var(--color-success-600);">
          <i data-lucide="shield-check"></i>
        </div>
        <div>
          <div class="ledger-stat-value">18,491,789</div>
          <div class="ledger-stat-label">Verified Records</div>
        </div>
      </div>
      <div class="ledger-stat-card">
        <div class="ledger-stat-icon" style="background:var(--color-cyan-100);color:var(--color-cyan-600);">
          <i data-lucide="box"></i>
        </div>
        <div>
          <div class="ledger-stat-value">2,847</div>
          <div class="ledger-stat-label">Recent Blocks (24h)</div>
        </div>
      </div>
      <div class="ledger-stat-card">
        <div class="ledger-stat-icon" style="background:var(--color-success-100);color:var(--color-success-600);">
          <i data-lucide="wifi"></i>
        </div>
        <div>
          <div class="ledger-stat-value" style="color:var(--color-success-600);">Online</div>
          <div class="ledger-stat-label">Network Status</div>
        </div>
      </div>
    </div>

    <!-- Chain Visualization -->
    <div class="chain-visualization">
      <div class="chain-viz-header">
        <h3 style="font-size:var(--text-base);font-weight:var(--font-semibold);">Recent Block Chain</h3>
        <span class="badge badge-success"><i data-lucide="check-circle"></i> Synced</span>
      </div>
      <div class="chain-viz" style="justify-content:center;">
        ${generateChainBlocks()}
      </div>
    </div>

    <!-- Ledger Table -->
    <div class="card">
      <div class="card-header">
        <h3>Ledger Records</h3>
        <div class="filter-bar" style="margin-bottom:0;padding:0;border:none;background:none;gap:var(--space-2);">
          <div class="search-input" style="min-width:180px;">
            <i data-lucide="search"></i>
            <input type="text" placeholder="Search hash..." id="ledger-search" />
          </div>
        </div>
      </div>
      <div class="card-body" style="padding:0;">
        <div class="table-container" style="border:none;border-radius:0;">
          <table class="data-table" id="ledger-table">
            <thead>
              <tr>
                <th>Block</th>
                <th>Transaction Hash</th>
                <th>Document Hash</th>
                <th>Timestamp</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${blockchainLedger.map(entry => `
                <tr>
                  <td>
                    <div style="display:flex;align-items:center;gap:var(--space-2);">
                      <i data-lucide="box" style="width:14px;height:14px;color:var(--color-accent-500);"></i>
                      <span class="font-mono text-sm font-medium">#${entry.block}</span>
                    </div>
                  </td>
                  <td class="hash-cell">${entry.txHash}</td>
                  <td class="hash-cell">${entry.docHash}</td>
                  <td class="text-sm text-secondary">${entry.timestamp}</td>
                  <td>
                    <span class="badge badge-success">
                      <i data-lucide="check-circle"></i> Confirmed
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Search
  document.getElementById('ledger-search').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('#ledger-table tbody tr').forEach(row => {
      row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

function generateChainBlocks() {
  const blocks = [
    { num: '18,492,098', label: 'Block' },
    { num: '18,492,099', label: 'Block' },
    { num: '18,492,100', label: 'Block' },
    { num: '18,492,101', label: 'Block' },
    { num: '18,492,102', label: 'Block' },
    { num: '18,492,103', label: 'Latest', highlight: true }
  ];

  return blocks.map((b, i) => `
    ${i > 0 ? '<div class="chain-arrow"><i data-lucide="arrow-right"></i></div>' : ''}
    <div class="chain-block ${b.highlight ? 'highlight' : ''}">
      <span class="block-number">#${b.num}</span>
      <span class="block-label">${b.label}</span>
    </div>
  `).join('');
}
