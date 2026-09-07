// ============================================
// DocuVerify — Settings Page
// ============================================

export function renderSettingsPage(container) {
  container.innerHTML = `
    <div class="page-header">
      <h1>Officer Settings & <em class="editorial-italic">System</em> Security Controls</h1>
      <p>Manage your account, security preferences, and system configuration.</p>
    </div>

    <div style="max-width:800px;">
      <!-- Account -->
      <div class="card" style="margin-bottom:var(--space-4);">
        <div class="card-header">
          <h3><i data-lucide="user" style="width:16px;height:16px;display:inline;vertical-align:middle;margin-right:8px;"></i>Account Settings</h3>
        </div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-4);">
            <div class="input-group">
              <label>Full Name</label>
              <input class="input" value="Rahul Sharma" />
            </div>
            <div class="input-group">
              <label>Email</label>
              <input class="input" value="rahul.sharma@gov.in" />
            </div>
            <div class="input-group">
              <label>Department</label>
              <input class="input" value="Dept. of Verification Services" />
            </div>
            <div class="input-group">
              <label>Role</label>
              <select class="select">
                <option selected>Verification Officer</option>
                <option>Senior Officer</option>
                <option>Admin</option>
              </select>
            </div>
          </div>
        </div>
        <div class="card-footer" style="display:flex;justify-content:flex-end;">
          <button class="btn btn-primary"><i data-lucide="save"></i> Save Changes</button>
        </div>
      </div>

      <!-- Security -->
      <div class="card" style="margin-bottom:var(--space-4);">
        <div class="card-header">
          <h3><i data-lucide="shield" style="width:16px;height:16px;display:inline;vertical-align:middle;margin-right:8px;"></i>Security</h3>
        </div>
        <div class="card-body">
          <div style="display:flex;flex-direction:column;gap:var(--space-4);">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-3);border:1px solid var(--border-light);border-radius:var(--radius-md);">
              <div>
                <div class="font-medium text-sm">Two-Factor Authentication</div>
                <div class="text-xs text-tertiary">Add an extra layer of security to your account</div>
              </div>
              <label style="position:relative;width:44px;height:24px;cursor:pointer;">
                <input type="checkbox" checked style="display:none;" />
                <span style="position:absolute;inset:0;background:var(--color-success-500);border-radius:12px;transition:0.2s;"></span>
                <span style="position:absolute;top:2px;left:22px;width:20px;height:20px;background:white;border-radius:50%;transition:0.2s;box-shadow:var(--shadow-sm);"></span>
              </label>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-3);border:1px solid var(--border-light);border-radius:var(--radius-md);">
              <div>
                <div class="font-medium text-sm">Session Timeout</div>
                <div class="text-xs text-tertiary">Automatically log out after inactivity</div>
              </div>
              <select class="select" style="width:auto;">
                <option>15 minutes</option>
                <option selected>30 minutes</option>
                <option>1 hour</option>
                <option>4 hours</option>
              </select>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-3);border:1px solid var(--border-light);border-radius:var(--radius-md);">
              <div>
                <div class="font-medium text-sm">Audit Logging</div>
                <div class="text-xs text-tertiary">Log all verification actions for compliance</div>
              </div>
              <label style="position:relative;width:44px;height:24px;cursor:pointer;">
                <input type="checkbox" checked style="display:none;" />
                <span style="position:absolute;inset:0;background:var(--color-success-500);border-radius:12px;transition:0.2s;"></span>
                <span style="position:absolute;top:2px;left:22px;width:20px;height:20px;background:white;border-radius:50%;transition:0.2s;box-shadow:var(--shadow-sm);"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="card" style="margin-bottom:var(--space-4);">
        <div class="card-header">
          <h3><i data-lucide="bell" style="width:16px;height:16px;display:inline;vertical-align:middle;margin-right:8px;"></i>Notification Preferences</h3>
        </div>
        <div class="card-body">
          <div style="display:flex;flex-direction:column;gap:var(--space-3);">
            ${['Critical alerts', 'Suspicious document detections', 'Verification completions', 'System maintenance', 'Weekly reports'].map(item => `
              <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-2) 0;">
                <span class="text-sm">${item}</span>
                <label style="position:relative;width:44px;height:24px;cursor:pointer;">
                  <input type="checkbox" ${item.includes('Critical') || item.includes('Suspicious') ? 'checked' : ''} style="display:none;" />
                  <span style="position:absolute;inset:0;background:${item.includes('Critical') || item.includes('Suspicious') ? 'var(--color-success-500)' : 'var(--color-gray-300)'};border-radius:12px;transition:0.2s;"></span>
                  <span style="position:absolute;top:2px;${item.includes('Critical') || item.includes('Suspicious') ? 'left:22px' : 'left:2px'};width:20px;height:20px;background:white;border-radius:50%;transition:0.2s;box-shadow:var(--shadow-sm);"></span>
                </label>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- System -->
      <div class="card">
        <div class="card-header">
          <h3><i data-lucide="cpu" style="width:16px;height:16px;display:inline;vertical-align:middle;margin-right:8px;"></i>System Information</h3>
        </div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);">
            ${[
              ['System Version', 'DocuVerify v2.4.1'],
              ['API Version', 'v3.2.0'],
              ['Blockchain Node', 'IVN Node v1.8'],
              ['OCR Engine', 'DocuOCR v4.1'],
              ['Last Updated', '05 Sep 2026'],
              ['License', 'Government Enterprise']
            ].map(([label, value]) => `
              <div style="display:flex;justify-content:space-between;padding:var(--space-2);border-bottom:1px solid var(--border-light);">
                <span class="text-sm text-secondary">${label}</span>
                <span class="text-sm font-medium">${value}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}
