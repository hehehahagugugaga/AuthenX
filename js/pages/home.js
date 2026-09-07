// ============================================
// AuthenX — SaaS Hero & Main Landing Page
// ============================================

export function renderHomePage(container) {
  container.innerHTML = `
    <div class="home-hero-container">
      <!-- Glow background -->
      <div class="home-hero-glow"></div>

      <!-- Hero Header -->
      <header class="home-hero-header">
        <h1 class="home-hero-title">
          Zero-Trust Document Verification for <em class="home-editorial-italic">Sovereign</em> Institutional Integrity
        </h1>

        <p class="home-hero-subtitle">
          Eliminating fraud through multi-layer computer vision, micro-print tamper detection, and immutable cryptographic hashing. Verify government, academic, and corporate credentials with sub-second certainty.
        </p>

        <!-- Call to Action Buttons -->
        <div class="home-hero-ctas">
          <a href="#verify" class="home-btn-hero-primary" id="hero-verify-cta">
            <i data-lucide="file-check-2" style="width:18px;height:18px;"></i>
            <span>Verify a Document</span>
          </a>
          <a href="#dashboard" class="home-btn-hero-secondary" id="hero-dashboard-cta">
            <i data-lucide="layout-dashboard" style="width:18px;height:18px;"></i>
            <span>Explore Officer Dashboard</span>
          </a>
        </div>

        <!-- Live Proof Facts Auto-Scrolling Carousel Marquee -->
        <div class="home-facts-carousel-section" aria-label="Live Verification Metrics">
          <div class="home-facts-carousel-container">
            <div class="home-facts-fade-left"></div>
            <div class="home-facts-fade-right"></div>
            <div class="home-facts-track">
              <!-- Set 1 -->
              <div class="home-facts-content">
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="shield-check"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">99.8%</span>
                    <span class="home-fact-lbl">Tamper Detection Rate</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="zap"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">&lt; 450ms</span>
                    <span class="home-fact-lbl">Verification Latency</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="blocks"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">100%</span>
                    <span class="home-fact-lbl">Immutable Hash Trail</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="file-text"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">1.2M+</span>
                    <span class="home-fact-lbl">Documents Secured</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="lock"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">0 False Positives</span>
                    <span class="home-fact-lbl">Cryptographic Truth</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="gauge"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">Sub-Second</span>
                    <span class="home-fact-lbl">Consensus Finality</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="cpu"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">SHA-256</span>
                    <span class="home-fact-lbl">Post-Quantum Security</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="activity"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">24/7 Live Sync</span>
                    <span class="home-fact-lbl">Statutory Consensus</span>
                  </div>
                </div>
              </div>
              <!-- Set 2 (for seamless loop) -->
              <div class="home-facts-content" aria-hidden="true">
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="shield-check"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">99.8%</span>
                    <span class="home-fact-lbl">Tamper Detection Rate</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="zap"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">&lt; 450ms</span>
                    <span class="home-fact-lbl">Verification Latency</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="blocks"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">100%</span>
                    <span class="home-fact-lbl">Immutable Hash Trail</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="file-text"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">1.2M+</span>
                    <span class="home-fact-lbl">Documents Secured</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="lock"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">0 False Positives</span>
                    <span class="home-fact-lbl">Cryptographic Truth</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="gauge"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">Sub-Second</span>
                    <span class="home-fact-lbl">Consensus Finality</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="cpu"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">SHA-256</span>
                    <span class="home-fact-lbl">Post-Quantum Security</span>
                  </div>
                </div>
                <div class="home-fact-card">
                  <div class="home-fact-icon"><i data-lucide="activity"></i></div>
                  <div class="home-fact-text">
                    <span class="home-fact-val">24/7 Live Sync</span>
                    <span class="home-fact-lbl">Statutory Consensus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Interactive SaaS Product Showcase -->
      <section class="home-showcase-wrapper" aria-label="Interactive Verification Showcase">
        <div class="home-showcase-card">
          <div class="home-showcase-header">
            <div class="home-showcase-dots">
              <span class="home-showcase-dot" style="background:#ef4444;"></span>
              <span class="home-showcase-dot" style="background:#f59e0b;"></span>
              <span class="home-showcase-dot" style="background:#10b981;"></span>
            </div>
            <div class="home-showcase-terminal-title">
              <i data-lucide="terminal" style="width:13px;height:13px;"></i>
              <span>AuthenX Core Engine — Real-time Forensic Stream</span>
            </div>
            <span class="badge badge-success" style="font-size:10px;">ENGINE ACTIVE</span>
          </div>

          <div class="home-showcase-body">
            <!-- Simulated Document Scanner -->
            <div class="home-scanner-preview">
              <div class="home-scanner-laser"></div>
              
              <div class="home-doc-mock">
                <div class="home-doc-mock-header">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <i data-lucide="file-badge-2" style="color:var(--color-accent-400);width:20px;height:20px;"></i>
                    <span style="font-weight:700;font-size:13px;">IN-GOV-2026-CERT-982</span>
                  </div>
                  <span class="home-verified-stamp">
                    <i data-lucide="shield-check" style="width:12px;height:12px;"></i> Genuine (99.4%)
                  </span>
                </div>

                <div class="home-doc-details">
                  <div class="home-doc-detail-row">
                    <span>DOCUMENT TYPE:</span>
                    <span style="color:#ffffff;">National Identity Credential</span>
                  </div>
                  <div class="home-doc-detail-row">
                    <span>ISSUING AUTHORITY:</span>
                    <span style="color:#ffffff;">Ministry of Institutional Governance</span>
                  </div>
                  <div class="home-doc-detail-row">
                    <span>CRYPTOGRAPHIC HASH:</span>
                    <span style="color:var(--color-cyan-400);">e3b0c44298fc1c149afbf4c8...</span>
                  </div>
                  <div class="home-doc-detail-row">
                    <span>WATERMARK INTEGRITY:</span>
                    <span style="color:#34d399;">PASSED (99.8% Match)</span>
                  </div>
                  <div class="home-doc-detail-row" style="border-bottom:none;">
                    <span>LAYER MODIFICATION SCAN:</span>
                    <span style="color:#34d399;">0 Alterations Detected</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Value Prop Bullets -->
            <div class="home-showcase-features">
              <div class="home-showcase-feature-item">
                <div class="home-feature-check-icon">
                  <i data-lucide="scan-line" style="width:14px;height:14px;"></i>
                </div>
                <div>
                  <div class="home-feature-title">Forensic Pixel & Font Analysis</div>
                  <div class="home-feature-sub">Deep neural models analyze kerning inconsistencies, font mismatches, and copy-move forgery at sub-pixel resolution.</div>
                </div>
              </div>

              <div class="home-showcase-feature-item">
                <div class="home-feature-check-icon">
                  <i data-lucide="fingerprint" style="width:14px;height:14px;"></i>
                </div>
                <div>
                  <div class="home-feature-title">Cryptographic SHA-256 Stamp</div>
                  <div class="home-feature-sub">Every issued certificate generates an immutable cryptographic signature cross-checked against authorized government ledgers.</div>
                </div>
              </div>

              <div class="home-showcase-feature-item">
                <div class="home-feature-check-icon">
                  <i data-lucide="check-circle-2" style="width:14px;height:14px;"></i>
                </div>
                <div>
                  <div class="home-feature-title">Sub-Second Automated Pass/Fail</div>
                  <div class="home-feature-sub">High-throughput verification terminal capable of auditing thousands of applications with zero human latency.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Editorial Capabilities Showcase (Inspired by Modern Editorial Aesthetics) -->
      <section class="home-editorial-showcase" aria-label="Engineered Capabilities Showcase">
        <!-- Top Editorial Header with Signature Font Pairing -->
        <div class="home-editorial-header">
          <div class="home-editorial-title-col">
            <h2 class="home-editorial-heading">
              Trust, <em class="home-editorial-italic">proven</em> out in the world.
            </h2>
          </div>
          <div class="home-editorial-desc-col">
            <p>From sovereign neural vision to immutable cryptographic&nbsp;seals.</p>
            <p>A unified architecture engineered from zero to national&nbsp;scale.</p>
          </div>
        </div>

        <!-- Numbered Tab Switcher Bar -->
        <div class="home-tab-strip" role="tablist" aria-label="Capabilities Tabs">
          <button class="home-tab-btn active" data-tab="01" role="tab" aria-selected="true" id="tab-btn-01">
            <span class="home-tab-num">01</span>
            <span class="home-tab-name">Forensic Vision</span>
            <i data-lucide="arrow-up-right" class="home-tab-arrow"></i>
          </button>
          <button class="home-tab-btn" data-tab="02" role="tab" aria-selected="false" id="tab-btn-02">
            <span class="home-tab-num">02</span>
            <span class="home-tab-name">Mobile Officer</span>
            <i data-lucide="arrow-up-right" class="home-tab-arrow"></i>
          </button>
          <button class="home-tab-btn" data-tab="03" role="tab" aria-selected="false" id="tab-btn-03">
            <span class="home-tab-num">03</span>
            <span class="home-tab-name">Sovereign Ledger</span>
            <i data-lucide="arrow-up-right" class="home-tab-arrow"></i>
          </button>
        </div>

        <!-- Dynamic Tab Content Viewport -->
        <div class="home-showcase-viewport">
          <!-- Panel 01: Forensic Vision -->
          <div class="home-showcase-panel active" id="panel-01" role="tabpanel">
            <!-- Left: Soft Ambient Tinted Container with Device Mockup -->
            <div class="home-panel-visual-box ambient-sage">
              <div class="home-visual-badge">FORENSIC ENGINE · AI VISION</div>
              
              <div class="phone-mockup">
                <div class="phone-speaker"></div>
                <div class="phone-screen">
                  <div class="phone-app-header">
                    <span class="phone-app-brand">AuthenX Vision</span>
                    <span class="phone-status-dot"></span>
                  </div>
                  <div class="phone-welcome-box">
                    <span class="phone-welcome-sub">ACTIVE SCANNER</span>
                    <div class="phone-welcome-title">Forensic Stream</div>
                  </div>
                  <div class="phone-doc-card">
                    <div class="phone-doc-chip">
                      <i data-lucide="file-check-2" style="width:14px;height:14px;color:var(--color-accent-400);"></i>
                      <span>CERT-2026-IN</span>
                    </div>
                    <div class="phone-confidence-bar">
                      <div class="phone-confidence-fill" style="width:99.4%;"></div>
                    </div>
                    <div class="phone-doc-metric">
                      <span>Tamper Probability</span>
                      <strong style="color:#10b981;">0.02% (PASS)</strong>
                    </div>
                  </div>
                  <div class="phone-action-row">
                    <button class="phone-btn-primary">
                      <i data-lucide="scan-line" style="width:14px;height:14px;"></i>
                      <span>Scan Document</span>
                    </button>
                    <button class="phone-btn-secondary">
                      <i data-lucide="clock" style="width:14px;height:14px;"></i>
                      <span>History</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Counter pill like 5,739 in reference -->
              <div class="home-visual-counter-badge">
                <span class="counter-num">5,739</span>
                <span class="counter-lbl">Live Audits Today</span>
              </div>
            </div>

            <!-- Right: Editorial Content -->
            <div class="home-panel-content">
              <div class="home-panel-overline">PERSONALIZED VERIFICATION · COMPUTER VISION</div>
              <h3 class="home-panel-title">The same document. An <em class="home-editorial-italic">unalterable</em> answer for every scan.</h3>
              <p class="home-panel-text">
                Snap the front of official credentials to understand their integrity in real time. AuthenX is built around institutional context, detecting multi-layer copy-move forgery, font mismatches, and micro-print anomalies in under 450 milliseconds.
              </p>
              <div class="home-panel-pills">
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Sub-pixel Font Inspection</span>
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Spectral Tamper Heatmap</span>
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> 99.8% Precision Rate</span>
              </div>
              <div class="home-panel-footer">
                <a href="#verify" class="home-panel-cta">
                  <span>Launch Forensic Inspector</span>
                  <i data-lucide="arrow-right" style="width:16px;height:16px;"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Panel 02: Mobile Officer -->
          <div class="home-showcase-panel" id="panel-02" role="tabpanel" style="display:none;">
            <!-- Left: Soft Ambient Tinted Container with Device Mockup -->
            <div class="home-panel-visual-box ambient-slate">
              <div class="home-visual-badge">FIELD AGENT APPARATUS</div>
              
              <div class="phone-mockup">
                <div class="phone-speaker"></div>
                <div class="phone-screen">
                  <div class="phone-app-header">
                    <span class="phone-app-brand">Officer Terminal</span>
                    <span class="phone-officer-badge">SEC-LVL-4</span>
                  </div>
                  <div class="phone-welcome-box">
                    <span class="phone-welcome-sub">OFFICER ON DUTY</span>
                    <div class="phone-welcome-title">Rahul Sharma</div>
                  </div>
                  <div class="phone-doc-card">
                    <div class="phone-doc-chip" style="background:rgba(37,99,235,0.2);color:#93c5fd;">
                      <i data-lucide="qr-code" style="width:14px;height:14px;"></i>
                      <span>NFC & QR SENSOR</span>
                    </div>
                    <div class="phone-doc-metric" style="margin-top:10px;">
                      <span>Security Handshake</span>
                      <strong style="color:#60a5fa;">ESTABLISHED</strong>
                    </div>
                    <div class="phone-doc-metric">
                      <span>GPS Seal</span>
                      <strong>NEW DELHI CP · 28.61°N</strong>
                    </div>
                  </div>
                  <div class="phone-action-row">
                    <button class="phone-btn-primary" style="background:#2563eb;">
                      <i data-lucide="camera" style="width:14px;height:14px;"></i>
                      <span>Field Scan</span>
                    </button>
                    <button class="phone-btn-secondary">
                      <i data-lucide="shield" style="width:14px;height:14px;"></i>
                      <span>Vault</span>
                    </button>
                  </div>
                </div>
              </div>

              <div class="home-visual-counter-badge">
                <span class="counter-num">1,842</span>
                <span class="counter-lbl">Field Officers Active</span>
              </div>
            </div>

            <!-- Right: Editorial Content -->
            <div class="home-panel-content">
              <div class="home-panel-overline">FIELD OPERATIONS · ZERO-CONNECTIVITY FALLBACK</div>
              <h3 class="home-panel-title">At the border or in the field. Sovereign <em class="home-editorial-italic">certainty</em> in your palm.</h3>
              <p class="home-panel-text">
                Designed for field verification officers operating in checkpoints, consulates, and remote administrative centers. Authenticate biometric signatures, MRZ passports, and encrypted QR codes even when local cellular connectivity is offline.
              </p>
              <div class="home-panel-pills">
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Offline Cryptographic Verification</span>
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Dual Optical & NFC Capture</span>
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Officer Identity Ledger</span>
              </div>
              <div class="home-panel-footer">
                <a href="#dashboard" class="home-panel-cta">
                  <span>Explore Field Telemetry</span>
                  <i data-lucide="arrow-right" style="width:16px;height:16px;"></i>
                </a>
              </div>
            </div>
          </div>

          <!-- Panel 03: Sovereign Ledger -->
          <div class="home-showcase-panel" id="panel-03" role="tabpanel" style="display:none;">
            <!-- Left: Soft Ambient Tinted Container with Ledger Mockup -->
            <div class="home-panel-visual-box ambient-emerald">
              <div class="home-visual-badge">MERKLE ANCHORAGE</div>
              
              <div class="ledger-mockup-card">
                <div class="ledger-mockup-header">
                  <div style="display:flex;align-items:center;gap:6px;">
                    <span class="ledger-dot"></span>
                    <span style="font-weight:700;font-size:12px;letter-spacing:0.05em;color:#10b981;">BLOCK #48,192 SEALED</span>
                  </div>
                  <span class="ledger-tag">IMMUTABLE</span>
                </div>
                <div class="ledger-mockup-body">
                  <div class="ledger-row">
                    <span>ROOT MERKLE:</span>
                    <code>0x9f8e...4b21a8</code>
                  </div>
                  <div class="ledger-row">
                    <span>SIGNATURE:</span>
                    <code>ed25519:gov-node-01</code>
                  </div>
                  <div class="ledger-row">
                    <span>TIMESTAMP:</span>
                    <span>2026-09-07T11:45:12Z</span>
                  </div>
                  <div class="ledger-row" style="border-bottom:none;">
                    <span>ATTESTATION:</span>
                    <span style="color:#10b981;font-weight:600;">12/12 VALIDATORS PASSED</span>
                  </div>
                </div>
              </div>

              <div class="home-visual-counter-badge">
                <span class="counter-num">100%</span>
                <span class="counter-lbl">Audit Integrity Proof</span>
              </div>
            </div>

            <!-- Right: Editorial Content -->
            <div class="home-panel-content">
              <div class="home-panel-overline">DISTRIBUTED CONSENSUS · MERKLE ROOTS</div>
              <h3 class="home-panel-title">Decentralized trust. No <em class="home-editorial-italic">single</em> point of failure.</h3>
              <p class="home-panel-text">
                Anchor verification hashes to distributed national government ledgers. Once recorded, document proofs cannot be revised, reissued, or backdated by unauthorized actors or compromised internal databases.
              </p>
              <div class="home-panel-pills">
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Multi-Node Merkle Trees</span>
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Post-Quantum Readiness</span>
                <span class="home-panel-pill"><i data-lucide="check" style="width:12px;height:12px;"></i> Real-time Statutory Audits</span>
              </div>
              <div class="home-panel-footer">
                <a href="#analytics" class="home-panel-cta">
                  <span>View Consensus Metrics</span>
                  <i data-lucide="arrow-right" style="width:16px;height:16px;"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Mission Objectives Section -->
      <section class="home-pillars-section" aria-label="Strategic Objectives">
        <div class="home-pillars-header">
          <h2>Engineered for <em class="home-editorial-italic">National-Scale</em> Institutional Trust</h2>
          <p>AuthenX combines cryptographic precision and automated intelligence to solve Problem Statement 188.</p>
        </div>

        <div class="home-pillars-grid">
          <div class="home-pillar-card">
            <div class="home-pillar-icon">
              <i data-lucide="shield-alert"></i>
            </div>
            <h3 class="home-pillar-title">Eliminate Counterfeit Documents</h3>
            <p class="home-pillar-desc">
              Prevent unauthorized individuals from bypassing identity, citizenship, or academic checks with sophisticated AI tamper-detection layers.
            </p>
          </div>

          <div class="home-pillar-card">
            <div class="home-pillar-icon">
              <i data-lucide="cpu"></i>
            </div>
            <h3 class="home-pillar-title">Zero-Latency Automated Processing</h3>
            <p class="home-pillar-desc">
              Replace manual, backlog-prone document review pipelines with automated optical character recognition, QR decoding, and integrity scoring.
            </p>
          </div>

          <div class="home-pillar-card">
            <div class="home-pillar-icon">
              <i data-lucide="lock"></i>
            </div>
            <h3 class="home-pillar-title">Immutable Audit Trail</h3>
            <p class="home-pillar-desc">
              Every verification decision is logged with cryptographic timestamps, officer signatures, and audit logs to ensure statutory compliance.
            </p>
          </div>
        </div>
      </section>

      </section>
    </div>
  `;

  // Attach interactive tab switcher logic
  const tabButtons = container.querySelectorAll('.home-tab-btn');
  const panels = container.querySelectorAll('.home-showcase-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button active state
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update panel visibility
      panels.forEach(panel => {
        if (panel.id === `panel-${targetTab}`) {
          panel.style.display = 'grid';
          panel.classList.add('active');
        } else {
          panel.style.display = 'none';
          panel.classList.remove('active');
        }
      });

      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    });
  });

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

