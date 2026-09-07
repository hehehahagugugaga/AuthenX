// ============================================
// AuthenX — Real-Time Institutional Telemetry
// Living Network Pulse & Verification Stream
// ============================================

export function renderTelemetryBar() {
  const container = document.getElementById('live-telemetry-container');
  if (!container) return;

  container.innerHTML = `
    <div class="live-telemetry-bar" role="region" aria-label="Real-time Network Telemetry">
      <div class="telemetry-left">
        <span class="telemetry-live-badge">
          <span class="pulse-ring"></span>
          NETWORK LIVE
        </span>
        <span class="text-xs text-tertiary" style="font-size:11px;font-weight:600;display:none;@media(min-width:768px){display:inline;}">
          SIH-188 CONSENSUS
        </span>
      </div>

      <div class="telemetry-stream-wrapper" id="telemetry-stream-wrapper">
        <div class="telemetry-stream-item" id="telemetry-current-stream">
          <span class="stream-tag">[Sovereign ID]</span>
          <span>#IN-9821 verified in New Delhi (0.01% risk)</span>
          <span class="stream-time">• Just now</span>
        </div>
      </div>

      <div class="telemetry-metrics">
        <div class="telemetry-metric-item" title="Consensual Validator Nodes">
          <i data-lucide="server" style="width:13px;height:13px;color:var(--color-accent-500);"></i>
          <span>Nodes: <strong>48/48</strong></span>
        </div>
        <div class="telemetry-metric-item" title="Global Verification Ping">
          <i data-lucide="zap" style="width:13px;height:13px;color:#f59e0b;"></i>
          <span>Ping: <strong id="telemetry-live-ping">12ms</strong></span>
        </div>
        <div class="telemetry-metric-item" title="Immutable Blockchain Height">
          <i data-lucide="blocks" style="width:13px;height:13px;color:#10b981;"></i>
          <span>Block: <strong id="telemetry-live-block">#4,819,302</strong></span>
        </div>
      </div>
    </div>
  `;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  // Start living ticker and metric fluctuations
  startLivingTelemetry();
}

let telemetryInterval = null;
let blockInterval = null;
let pingInterval = null;

function startLivingTelemetry() {
  if (telemetryInterval) clearInterval(telemetryInterval);
  if (blockInterval) clearInterval(blockInterval);
  if (pingInterval) clearInterval(pingInterval);

  const streams = [
    { tag: '[Sovereign ID]', desc: '#IN-9821 verified in New Delhi (0.01% risk)', time: '2s ago' },
    { tag: '[Degree Attestation]', desc: '#DEG-401 authenticated for Mumbai University', time: '5s ago' },
    { tag: '[Land Title Deed]', desc: '#MH-7729 anchored to Merkle Tree Block #4819302', time: '9s ago' },
    { tag: '[Passport MRZ]', desc: '#Z99182 Optical & NFC check PASSED at Border Terminal', time: '13s ago' },
    { tag: '[Tax Clearance]', desc: '#TAX-2026-891 statutory compliance confirmed', time: '17s ago' },
    { tag: '[Consular Seal]', desc: '#VISA-882 tamper scan: 0 alterations detected', time: '22s ago' }
  ];

  let streamIdx = 0;
  const streamEl = document.getElementById('telemetry-current-stream');

  telemetryInterval = setInterval(() => {
    if (!streamEl) return;
    streamIdx = (streamIdx + 1) % streams.length;
    const current = streams[streamIdx];

    // Trigger re-animation
    streamEl.style.animation = 'none';
    void streamEl.offsetWidth; // trigger reflow
    streamEl.innerHTML = `
      <span class="stream-tag">${current.tag}</span>
      <span>${current.desc}</span>
      <span class="stream-time">• ${current.time}</span>
    `;
    streamEl.style.animation = 'telemetrySlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
  }, 4200);

  // Increment block height dynamically every 15s
  let currentBlock = 4819302;
  const blockEl = document.getElementById('telemetry-live-block');

  blockInterval = setInterval(() => {
    if (!blockEl) return;
    currentBlock += 1;
    blockEl.textContent = `#${currentBlock.toLocaleString()}`;
    blockEl.classList.remove('telemetry-block-flash');
    void blockEl.offsetWidth;
    blockEl.classList.add('telemetry-block-flash');
  }, 14000);

  // Ping jitter (11ms - 14ms)
  const pingEl = document.getElementById('telemetry-live-ping');
  pingInterval = setInterval(() => {
    if (!pingEl) return;
    const jitter = Math.floor(Math.random() * 4) + 11;
    pingEl.textContent = `${jitter}ms`;
  }, 3800);
}
