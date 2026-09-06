// ============================================
// DocuVerify — Verify Document Page
// Upload → Processing → Result
// ============================================

import { verificationSteps, verificationResult, suspiciousResult } from '../data/mockData.js';
import { showModal, showConfirmDialog, closeModal } from '../components/modals.js';

let currentState = 'upload'; // upload | processing | result
let selectedFile = null;

export function renderVerifyPage(container) {
  currentState = 'upload';
  selectedFile = null;
  renderUploadState(container);
}

// ── UPLOAD STATE ──
let activeMediaStream = null;

function stopCameraStream() {
  if (activeMediaStream) {
    activeMediaStream.getTracks().forEach(track => {
      try { track.stop(); } catch (e) {}
    });
    activeMediaStream = null;
  }
}

function renderUploadState(container) {
  container.innerHTML = `
    <div class="verify-page-wrapper" style="max-width:820px;margin:0 auto;">
      <!-- Top of Page: Title & Action Buttons -->
      <div class="page-header verify-header-top">
        <div class="page-header-text">
          <h1>Verify Document</h1>
          <p>Upload a document or take a picture live from your camera to analyze its authenticity and integrity.</p>
        </div>
        <div class="top-verify-actions">
          <button type="button" class="btn btn-secondary top-action-btn" id="top-upload-btn">
            <i data-lucide="upload-cloud"></i>
            <span>Upload File</span>
          </button>
          <button type="button" class="btn btn-primary top-action-btn" id="top-camera-btn">
            <i data-lucide="camera"></i>
            <span>Camera Scan</span>
          </button>
        </div>
      </div>

      <div class="card">
        <div class="card-body verify-card-body">
          <!-- Upload Zone -->
          <div class="upload-zone" id="upload-zone">
            <input type="file" id="file-input" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" hidden />
            <input type="file" id="camera-native-input" accept="image/*" capture="environment" hidden />

            <div class="upload-zone-icon">
              <i data-lucide="upload-cloud"></i>
            </div>
          <h3>Drop your document here</h3>
          <p>or select your preferred document submission method:</p>

          <!-- Dual Upload Action Options -->
          <div class="upload-options-row">
            <button type="button" class="btn btn-secondary upload-option-btn" id="browse-btn">
              <i data-lucide="folder-open"></i>
              <span>Browse Files</span>
            </button>

            <div class="upload-options-divider">
              <span>OR</span>
            </div>

            <button type="button" class="btn btn-primary upload-option-btn camera-btn" id="camera-btn">
              <i data-lucide="camera"></i>
              <span>Take a Picture</span>
            </button>
          </div>

          <div class="upload-formats">
            <span class="format-tag">PDF</span>
            <span class="format-tag">JPG</span>
            <span class="format-tag">PNG</span>
            <span class="format-tag">DOC</span>
            <span class="format-tag">DOCX</span>
            <span class="format-tag camera-tag">
              <i data-lucide="aperture" style="width:11px;height:11px;display:inline-block;vertical-align:-1px;"></i> Live Camera Scan
            </span>
          </div>
          <div class="upload-note">Maximum file size: 10 MB &bull; High resolution document capture supported</div>
        </div>

        <!-- File Preview (hidden initially) -->
        <div id="file-preview" class="hidden"></div>

        <!-- Start Verification -->
        <div class="verify-start-section" id="verify-start" style="display:none;">
          <button class="btn btn-primary btn-lg" id="start-verify-btn">
            <i data-lucide="shield-check"></i>
            Start Verification
          </button>
          <div class="verify-security-note">
            <i data-lucide="lock"></i>
            Your document is processed through multiple authenticity and integrity checks.
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Header top action buttons
  const topUploadBtn = document.getElementById('top-upload-btn');
  const topCameraBtn = document.getElementById('top-camera-btn');
  const fileInput = document.getElementById('file-input');
  const nativeCameraInput = document.getElementById('camera-native-input');

  if (topUploadBtn) {
    topUploadBtn.addEventListener('click', () => fileInput.click());
  }
  if (topCameraBtn) {
    topCameraBtn.addEventListener('click', () => openCameraScanner(container));
  }

  // Upload zone interactions
  const zone = document.getElementById('upload-zone');
  const browseBtn = document.getElementById('browse-btn');
  const cameraBtn = document.getElementById('camera-btn');

  browseBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  cameraBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openCameraScanner(container);
  });

  zone.addEventListener('click', (e) => {
    // Only trigger default file browse if clicked outside button row
    if (!e.target.closest('#camera-btn') && !e.target.closest('#browse-btn')) {
      fileInput.click();
    }
  });

  zone.addEventListener('dragover', (e) => {
    e.preventDefault();
    zone.classList.add('dragover');
  });

  zone.addEventListener('dragleave', () => {
    zone.classList.remove('dragover');
  });

  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('dragover');
    if (e.dataTransfer.files.length) {
      handleFileSelect(e.dataTransfer.files[0], container);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
      handleFileSelect(e.target.files[0], container);
    }
  });

  nativeCameraInput.addEventListener('change', (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (re) => {
        handleFileSelect(file, container, re.target.result, true);
      };
      reader.readAsDataURL(file);
    }
  });

  // Start verification button
  document.getElementById('start-verify-btn').addEventListener('click', () => {
    renderProcessingState(container);
  });
}

// ── Live Document Camera Scanner ──
function openCameraScanner(container) {
  showModal('Document Camera Scanner', `
    <div class="camera-scanner-modal" id="camera-scanner-container">
      <div class="camera-viewport" id="scanner-viewport">
        <video id="scanner-video" autoplay playsinline muted></video>
        <canvas id="scanner-canvas"></canvas>
        <div class="camera-flash" id="scanner-flash"></div>

        <!-- Document guide HUD -->
        <div class="scanner-hud" id="scanner-hud">
          <div class="scanner-corner top-left"></div>
          <div class="scanner-corner top-right"></div>
          <div class="scanner-corner bottom-left"></div>
          <div class="scanner-corner bottom-right"></div>
          <div class="scanner-laser"></div>
        </div>

        <div class="scanner-guide-text" id="scanner-guide">
          <i data-lucide="scan" style="width:13px;height:13px;color:#38bdf8;"></i>
          Align document edges inside frame
        </div>
      </div>

      <!-- Controls row -->
      <div class="scanner-controls" id="scanner-live-controls">
        <button class="btn btn-secondary btn-sm" id="scanner-switch-camera" title="Switch Camera" style="display:none;">
          <i data-lucide="refresh-cw"></i> Flip
        </button>
        <button class="scanner-shutter-btn" id="scanner-capture-btn" title="Capture Document Picture">
          <div class="scanner-shutter-inner">
            <i data-lucide="camera" style="width:20px;height:20px;"></i>
          </div>
        </button>
        <button class="btn btn-ghost btn-sm" id="scanner-cancel-btn">
          Cancel
        </button>
      </div>

      <!-- Fallback container (hidden by default) -->
      <div id="scanner-fallback" style="display:none;width:100%;"></div>
    </div>
  `);

  if (window.lucide) lucide.createIcons();

  const video = document.getElementById('scanner-video');
  const canvas = document.getElementById('scanner-canvas');
  const flash = document.getElementById('scanner-flash');
  const captureBtn = document.getElementById('scanner-capture-btn');
  const switchBtn = document.getElementById('scanner-switch-camera');
  const cancelBtn = document.getElementById('scanner-cancel-btn');
  const fallbackContainer = document.getElementById('scanner-fallback');
  const viewport = document.getElementById('scanner-viewport');
  const liveControls = document.getElementById('scanner-live-controls');

  cancelBtn.addEventListener('click', () => {
    stopCameraStream();
    closeModal();
  });

  let currentFacingMode = 'environment';

  async function startStream(facingMode = 'environment') {
    stopCameraStream();
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera stream not supported by browser');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      activeMediaStream = stream;
      if (video) {
        video.srcObject = stream;
        await video.play();
      }

      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(d => d.kind === 'videoinput');
        if (videoDevices.length > 1 && switchBtn) {
          switchBtn.style.display = 'inline-flex';
        }
      } catch (e) {}

    } catch (err) {
      console.warn('Live camera stream unavailable:', err);
      showScannerFallback(err.message || 'Camera access not permitted');
    }
  }

  if (switchBtn) {
    switchBtn.addEventListener('click', () => {
      currentFacingMode = currentFacingMode === 'environment' ? 'user' : 'environment';
      startStream(currentFacingMode);
    });
  }

  captureBtn.addEventListener('click', () => {
    if (!video || !video.videoWidth) {
      showScannerFallback('Unable to read camera frame');
      return;
    }

    flash.classList.add('flash-active');
    setTimeout(() => flash.classList.remove('flash-active'), 180);

    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);

    const capturedDataUrl = canvas.toDataURL('image/jpeg', 0.94);
    stopCameraStream();
    showReviewState(capturedDataUrl);
  });

  function showReviewState(dataUrl) {
    viewport.style.display = 'none';
    liveControls.style.display = 'none';

    const modalBody = document.getElementById('camera-scanner-container');
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'scanner-review-card';
    reviewDiv.id = 'scanner-review-ui';
    reviewDiv.innerHTML = `
      <img src="${dataUrl}" alt="Captured Document" class="scanner-review-preview" />
      <div style="font-size:12px;color:var(--text-secondary);display:flex;align-items:center;gap:6px;">
        <i data-lucide="check-circle" style="width:14px;height:14px;color:var(--color-success-500);"></i>
        Photo captured successfully. Verify clarity before proceeding.
      </div>
      <div style="display:flex;gap:var(--space-3);margin-top:var(--space-2);">
        <button class="btn btn-secondary" id="scanner-retake-btn">
          <i data-lucide="rotate-ccw"></i> Retake Photo
        </button>
        <button class="btn btn-primary" id="scanner-accept-btn">
          <i data-lucide="check"></i> Use This Document
        </button>
      </div>
    `;

    modalBody.appendChild(reviewDiv);
    if (window.lucide) lucide.createIcons();

    document.getElementById('scanner-retake-btn').addEventListener('click', () => {
      reviewDiv.remove();
      viewport.style.display = 'flex';
      liveControls.style.display = 'flex';
      startStream(currentFacingMode);
    });

    document.getElementById('scanner-accept-btn').addEventListener('click', () => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const filename = `Document_Scan_${timestamp}.jpg`;
      const file = dataURLtoFile(dataUrl, filename);

      stopCameraStream();
      closeModal(true);
      handleFileSelect(file, container, dataUrl, true);
    });
  }

  function showScannerFallback(reason) {
    if (viewport) viewport.style.display = 'none';
    if (liveControls) liveControls.style.display = 'none';

    fallbackContainer.style.display = 'block';
    fallbackContainer.innerHTML = `
      <div class="scanner-fallback-card">
        <div style="width:54px;height:54px;margin:0 auto var(--space-3);background:var(--color-accent-100);border-radius:50%;display:flex;align-items:center;justify-content:center;">
          <i data-lucide="camera-off" style="width:26px;height:26px;color:var(--color-accent-600);"></i>
        </div>
        <h4 style="margin-bottom:var(--space-1);color:var(--text-primary);">Webcam Stream Not Detected</h4>
        <p style="font-size:12px;color:var(--text-secondary);max-width:380px;margin:0 auto var(--space-5);">
          Live camera access is unavailable or not granted by the browser. You can capture using your device system camera or test with a simulated document photo.
        </p>

        <div style="display:flex;flex-direction:column;gap:var(--space-3);max-width:320px;margin:0 auto;">
          <label class="btn btn-primary" style="cursor:pointer;margin:0;">
            <i data-lucide="camera"></i> Open Device Camera / Photos
            <input type="file" accept="image/*" capture="environment" id="device-camera-input" hidden />
          </label>
          <button class="btn btn-secondary" id="simulate-capture-btn">
            <i data-lucide="sparkles"></i> Take Sample Document Photo
          </button>
          <button class="btn btn-ghost btn-sm" id="fallback-cancel-btn" style="margin-top:var(--space-1);">
            Cancel
          </button>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();

    const deviceInput = document.getElementById('device-camera-input');
    deviceInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (re) => {
          stopCameraStream();
          closeModal(true);
          handleFileSelect(file, container, re.target.result, true);
        };
        reader.readAsDataURL(file);
      }
    });

    document.getElementById('simulate-capture-btn').addEventListener('click', () => {
      const simulatedDataUrl = createSimulatedDocumentPhoto();
      const filename = `Document_Scan_${new Date().toISOString().slice(0, 10)}.jpg`;
      const file = dataURLtoFile(simulatedDataUrl, filename);

      stopCameraStream();
      closeModal(true);
      handleFileSelect(file, container, simulatedDataUrl, true);
    });

    document.getElementById('fallback-cancel-btn').addEventListener('click', () => {
      stopCameraStream();
      closeModal(true);
    });
  }

  startStream(currentFacingMode);
}

function handleFileSelect(file, container, previewUrl = null, isCameraCapture = false) {
  selectedFile = {
    name: file.name || 'Birth_Certificate_AS.pdf',
    type: file.type || 'application/pdf',
    size: file.size || 2457600,
    uploadTime: new Date().toLocaleTimeString(),
    previewUrl: previewUrl || null,
    isCameraCapture: isCameraCapture
  };

  if (!selectedFile.name || selectedFile.name === 'undefined') {
    selectedFile.name = isCameraCapture ? 'Document_Photo_Scan.jpg' : 'Birth_Certificate_AS.pdf';
  }

  const ext = selectedFile.name.split('.').pop().toLowerCase();
  let iconClass = 'pdf';
  if (isCameraCapture || ['jpg', 'jpeg', 'png', 'webp'].includes(ext)) iconClass = 'img';
  else if (['doc', 'docx'].includes(ext)) iconClass = 'doc';

  const sizeStr = formatFileSize(selectedFile.size);

  // Hide upload zone, show preview
  document.getElementById('upload-zone').classList.add('hidden');
  const preview = document.getElementById('file-preview');
  preview.classList.remove('hidden');
  preview.innerHTML = `
    <div class="file-preview-card">
      <div class="file-preview-icon ${iconClass}">
        <i data-lucide="${isCameraCapture ? 'camera' : 'file-text'}"></i>
      </div>
      <div class="file-preview-info">
        <div class="file-preview-name">${selectedFile.name}</div>
        <div class="file-preview-meta">
          ${isCameraCapture 
            ? `<span style="background:rgba(37,99,235,0.1);color:var(--color-accent-700);font-weight:600;padding:1px 6px;border-radius:4px;display:inline-flex;align-items:center;gap:3px;"><i data-lucide="camera" style="width:10px;height:10px;"></i> CAMERA CAPTURE</span>` 
            : `<span>${ext.toUpperCase()}</span>`
          }
          <span>${sizeStr}</span>
          <span>Captured at ${selectedFile.uploadTime}</span>
        </div>
      </div>
      <div class="file-preview-actions">
        <button class="btn btn-secondary btn-sm" id="preview-file-btn">
          <i data-lucide="eye"></i> Preview
        </button>
        <button class="btn btn-ghost btn-sm" id="remove-file-btn" style="color:var(--color-danger-500);">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    </div>
  `;

  document.getElementById('verify-start').style.display = '';

  if (window.lucide) lucide.createIcons();

  // Remove button
  document.getElementById('remove-file-btn').addEventListener('click', () => {
    selectedFile = null;
    document.getElementById('upload-zone').classList.remove('hidden');
    preview.classList.add('hidden');
    preview.innerHTML = '';
    document.getElementById('verify-start').style.display = 'none';
  });

  // Preview button (modal)
  document.getElementById('preview-file-btn').addEventListener('click', () => {
    showModal('Document Preview', `
      <div class="doc-preview-container">
        <div class="doc-preview-mock">
          ${generateMockDocPreview()}
        </div>
      </div>
    `);
  });
}

// ── PROCESSING STATE ──
function renderProcessingState(container) {
  currentState = 'processing';

  container.innerHTML = `
    <div class="page-header" style="text-align:center;">
      <h1>Verifying Document</h1>
      <p>Your document is being processed through multiple authenticity checks.</p>
    </div>

    <div class="verification-process">
      <!-- Progress bar -->
      <div class="card" style="margin-bottom:var(--space-6);">
        <div class="card-body" style="padding:var(--space-4) var(--space-5);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-2);">
            <span class="text-sm font-medium" id="progress-label">Processing...</span>
            <span class="text-sm text-tertiary font-mono" id="progress-percent">0%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-fill blue" id="progress-fill" style="width:0%;"></div>
          </div>
        </div>
      </div>

      <!-- Pipeline Visualization -->
      <div class="card">
        <div class="card-header">
          <h3>Verification Pipeline</h3>
          <span class="badge badge-info"><i data-lucide="loader"></i> In Progress</span>
        </div>
        <div class="card-body">
          <div class="pipeline" id="pipeline-viz">
            ${generatePipelineHTML()}
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Animate through steps
  animateVerification(container);
}

function generatePipelineHTML() {
  return `
    <!-- Step 1: Document Upload -->
    <div class="pipeline-node pending" data-step="1">
      <div class="pipeline-node-icon"><i data-lucide="upload"></i></div>
      <span class="pipeline-node-label">Document Upload</span>
      <span class="pipeline-node-time">—</span>
    </div>
    <div class="pipeline-connector" data-connector="1"></div>

    <!-- Step 2: Image Pre-processing -->
    <div class="pipeline-node pending" data-step="2">
      <div class="pipeline-node-icon"><i data-lucide="image"></i></div>
      <span class="pipeline-node-label">Image Pre-processing</span>
      <span class="pipeline-node-time">—</span>
    </div>
    <div class="pipeline-connector" data-connector="2"></div>

    <!-- Parallel: OCR + Document Analysis -->
    <div class="pipeline-parallel">
      <div class="pipeline-branch">
        <div class="pipeline-connector" data-connector="3a"></div>
        <div class="pipeline-node pending" data-step="3">
          <div class="pipeline-node-icon"><i data-lucide="scan-text"></i></div>
          <span class="pipeline-node-label">OCR & Data Extraction</span>
          <span class="pipeline-node-time">—</span>
        </div>
      </div>
      <div class="pipeline-branch">
        <div class="pipeline-connector" data-connector="4a"></div>
        <div class="pipeline-node pending" data-step="4">
          <div class="pipeline-node-icon"><i data-lucide="eye"></i></div>
          <span class="pipeline-node-label">Document Image Analysis</span>
          <span class="pipeline-node-time">—</span>
        </div>
      </div>
    </div>
    <div class="pipeline-connector" data-connector="4"></div>

    <!-- Step 5: Tampering Detection -->
    <div class="pipeline-node pending" data-step="5">
      <div class="pipeline-node-icon"><i data-lucide="shield"></i></div>
      <span class="pipeline-node-label">Tampering & Integrity Checks</span>
      <span class="pipeline-node-time">—</span>
    </div>
    <div class="pipeline-connector" data-connector="5"></div>

    <!-- Step 6: Digital Signature -->
    <div class="pipeline-node pending" data-step="6">
      <div class="pipeline-node-icon"><i data-lucide="fingerprint"></i></div>
      <span class="pipeline-node-label">Digital Signature / Hash Check</span>
      <span class="pipeline-node-time">—</span>
    </div>
    <div class="pipeline-connector" data-connector="6"></div>

    <!-- Step 7: Blockchain -->
    <div class="pipeline-node pending" data-step="7">
      <div class="pipeline-node-icon"><i data-lucide="link"></i></div>
      <span class="pipeline-node-label">Blockchain Verification</span>
      <span class="pipeline-node-time">—</span>
    </div>
    <div class="pipeline-connector" data-connector="7"></div>

    <!-- Step 8: Final -->
    <div class="pipeline-node pending" data-step="8">
      <div class="pipeline-node-icon"><i data-lucide="check-circle"></i></div>
      <span class="pipeline-node-label">Final Authenticity Assessment</span>
      <span class="pipeline-node-time">—</span>
    </div>
  `;
}

function animateVerification(container) {
  const steps = [
    { step: 1, time: '0.2s', delay: 400 },
    { step: 2, time: '1.8s', delay: 1200 },
    { step: 3, time: '3.2s', delay: 1800, parallel: true },
    { step: 4, time: '2.9s', delay: 0 },   // starts with 3
    { step: 5, time: '2.1s', delay: 1400 },
    { step: 6, time: '1.1s', delay: 900 },
    { step: 7, time: '1.5s', delay: 1100 },
    { step: 8, time: '0.4s', delay: 600 }
  ];

  const totalSteps = 8;
  let currentStep = 0;
  const progressFill = document.getElementById('progress-fill');
  const progressLabel = document.getElementById('progress-label');
  const progressPercent = document.getElementById('progress-percent');

  const stepLabels = [
    'Uploading document...',
    'Pre-processing image...',
    'Extracting text & analyzing...',
    'Analyzing document image...',
    'Checking for tampering...',
    'Verifying digital signature...',
    'Checking blockchain records...',
    'Computing final assessment...'
  ];

  function activateStep(stepNum) {
    const node = document.querySelector(`[data-step="${stepNum}"]`);
    if (node) {
      node.classList.remove('pending');
      node.classList.add('active');
      if (window.lucide) lucide.createIcons();
    }
  }

  function completeStep(stepNum, time) {
    const node = document.querySelector(`[data-step="${stepNum}"]`);
    if (node) {
      node.classList.remove('active');
      node.classList.add('completed');
      const timeEl = node.querySelector('.pipeline-node-time');
      if (timeEl) timeEl.textContent = time;

      // Update connector
      const conn = document.querySelector(`[data-connector="${stepNum}"]`);
      if (conn) conn.classList.add('completed');

      if (window.lucide) lucide.createIcons();
    }
  }

  function processStep(index) {
    if (index >= steps.length) {
      // All done — show result
      setTimeout(() => {
        renderResultState(container, 'verified');
      }, 500);
      return;
    }

    const step = steps[index];

    // Handle parallel steps 3 & 4
    if (step.step === 3) {
      activateStep(3);
      activateStep(4);
      progressLabel.textContent = 'Extracting text & analyzing document image...';
      const pct = Math.round(((index + 1) / totalSteps) * 100);
      progressFill.style.width = pct + '%';
      progressPercent.textContent = pct + '%';

      // Complete both after delay
      setTimeout(() => {
        completeStep(3, '3.2s');
        completeStep(4, '2.9s');
        currentStep = 4;
        const pct2 = Math.round(((4) / totalSteps) * 100);
        progressFill.style.width = pct2 + '%';
        progressPercent.textContent = pct2 + '%';
        // Skip step 4 and go to 5
        processStep(4); // index 4 = step 5
      }, step.delay + 800);
      return;
    }

    // Skip step 4 if already handled by parallel
    if (step.step === 4 && index === 3) {
      processStep(index + 1);
      return;
    }

    activateStep(step.step);
    progressLabel.textContent = stepLabels[step.step - 1] || 'Processing...';
    const pct = Math.round((step.step / totalSteps) * 100);
    progressFill.style.width = pct + '%';
    progressPercent.textContent = pct + '%';

    setTimeout(() => {
      completeStep(step.step, step.time);
      processStep(index + 1);
    }, step.delay);
  }

  // Start processing
  setTimeout(() => processStep(0), 300);
}

// ── RESULT STATE ──
function renderResultState(container, type = 'verified') {
  currentState = 'result';
  const data = type === 'verified' ? verificationResult : suspiciousResult;
  const isVerified = type === 'verified';

  container.innerHTML = `
    <div class="page-header">
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div>
          <h1>Verification Result</h1>
          <p>Document authenticity analysis complete.</p>
        </div>
        <div style="display:flex;gap:var(--space-3);">
          <button class="btn btn-secondary" id="verify-another-btn">
            <i data-lucide="plus"></i> Verify Another
          </button>
          <button class="btn btn-secondary" id="toggle-result-btn">
            <i data-lucide="repeat"></i> ${isVerified ? 'Show Suspicious' : 'Show Verified'}
          </button>
        </div>
      </div>
    </div>

    <!-- Hero Result -->
    <div class="result-hero ${isVerified ? 'verified' : 'suspicious'}">
      <div class="result-hero-icon">
        <i data-lucide="${isVerified ? 'check-circle' : 'alert-triangle'}"></i>
      </div>
      <h2>${isVerified ? 'DOCUMENT VERIFIED' : 'DOCUMENT REQUIRES REVIEW'}</h2>
      <p>${isVerified ? 'High confidence — document appears authentic.' : 'Multiple integrity issues detected — manual review recommended.'}</p>
      <div class="result-score" style="color:${isVerified ? 'var(--color-success-600)' : 'var(--color-danger-600)'};">
        ${isVerified ? data.authenticityScore + '%' : data.tamperingRisk + '%'}
        <div class="result-score-label">${isVerified ? 'Authenticity Score' : 'Risk Score'}</div>
      </div>
    </div>

    <!-- Confidence Meters -->
    <div class="confidence-grid">
      <div class="confidence-meter">
        <div class="confidence-meter-value" style="color:${data.authenticityScore > 70 ? 'var(--color-success-600)' : 'var(--color-danger-600)'};">${data.authenticityScore}%</div>
        <div class="confidence-meter-label">Authenticity</div>
        <div class="confidence-meter-bar">
          <div class="confidence-meter-fill" style="width:${data.authenticityScore}%;background:${data.authenticityScore > 70 ? 'var(--color-success-500)' : 'var(--color-danger-500)'};"></div>
        </div>
      </div>
      <div class="confidence-meter">
        <div class="confidence-meter-value" style="color:${data.tamperingRisk < 20 ? 'var(--color-success-600)' : 'var(--color-danger-600)'};">${data.tamperingRisk}%</div>
        <div class="confidence-meter-label">Tampering Risk</div>
        <div class="confidence-meter-bar">
          <div class="confidence-meter-fill" style="width:${data.tamperingRisk}%;background:${data.tamperingRisk < 20 ? 'var(--color-success-500)' : 'var(--color-danger-500)'};"></div>
        </div>
      </div>
      <div class="confidence-meter">
        <div class="confidence-meter-value" style="color:${data.dataConsistency > 70 ? 'var(--color-success-600)' : 'var(--color-warning-600)'};">${data.dataConsistency}%</div>
        <div class="confidence-meter-label">Data Consistency</div>
        <div class="confidence-meter-bar">
          <div class="confidence-meter-fill" style="width:${data.dataConsistency}%;background:${data.dataConsistency > 70 ? 'var(--color-success-500)' : 'var(--color-warning-500)'};"></div>
        </div>
      </div>
      <div class="confidence-meter">
        <div class="confidence-meter-value" style="color:${data.blockchainMatch === 'Verified' ? 'var(--color-success-600)' : 'var(--color-danger-600)'};">${data.blockchainMatch}</div>
        <div class="confidence-meter-label">Blockchain Match</div>
        <div class="confidence-meter-bar">
          <div class="confidence-meter-fill" style="width:${data.blockchainMatch === 'Verified' ? '100' : '0'}%;background:var(--color-success-500);"></div>
        </div>
      </div>
    </div>

    ${!isVerified ? `
      <!-- Risk Reasons -->
      <div class="card" style="margin-bottom:var(--space-6);">
        <div class="card-header">
          <h3 style="color:var(--color-danger-600);"><i data-lucide="alert-octagon" style="display:inline;width:16px;height:16px;vertical-align:middle;margin-right:8px;"></i>Identified Issues</h3>
        </div>
        <div class="card-body">
          <div class="risk-reasons">
            ${data.reasons.map(r => `
              <div class="risk-reason">
                <i data-lucide="x-circle"></i>
                ${r}
              </div>
            `).join('')}
          </div>
          <div class="result-actions">
            <button class="btn btn-warning btn-lg" onclick="window.DocuVerify.flagForReview()">
              <i data-lucide="flag"></i> Flag for Manual Review
            </button>
            <button class="btn btn-secondary btn-lg">
              <i data-lucide="file-text"></i> View Detailed Analysis
            </button>
          </div>
        </div>
      </div>
    ` : ''}

    <!-- Verification Breakdown -->
    <div class="card" style="margin-bottom:var(--space-6);">
      <div class="card-header">
        <h3>Verification Breakdown</h3>
      </div>
      <div class="card-body">
        <div class="check-list">
          ${data.checks.map(check => `
            <div class="check-item">
              <div class="check-icon ${check.status}">
                <i data-lucide="${check.status === 'pass' ? 'check' : check.status === 'warn' ? 'alert-triangle' : 'x'}"></i>
              </div>
              <div class="check-content">
                <div class="check-name">${check.name}</div>
                <div class="check-description">${check.desc}</div>
              </div>
              <div class="check-time">${check.time}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    ${isVerified ? `
      <!-- Document Information + Preview -->
      <div class="doc-info-grid" style="margin-bottom:var(--space-6);">
        <div class="card">
          <div class="card-header">
            <h3>Document Information</h3>
            <button class="btn btn-ghost btn-sm" id="view-extracted-btn">
              <i data-lucide="external-link"></i> View Extracted Data
            </button>
          </div>
          <div class="card-body">
            <div class="doc-info-fields">
              ${Object.entries({
                'Document Type': data.documentInfo.type,
                'Document ID': data.documentInfo.docId,
                'Name': data.documentInfo.name,
                'Issue Date': data.documentInfo.issueDate,
                'Issuing Authority': data.documentInfo.issuingAuthority,
                'Document Number': data.documentInfo.docNumber,
                'Category': data.documentInfo.category,
                'Format': data.documentInfo.format
              }).map(([label, value]) => `
                <div class="doc-info-field">
                  <label>${label}</label>
                  <div class="value">${value}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3>Document Preview</h3>
          </div>
          <div class="card-body">
            <div class="doc-preview-container">
              <div class="doc-preview-mock">
                ${generateMockDocPreview()}
                <!-- Detection overlays -->
                <div class="doc-preview-overlay text-field" style="top:12px;left:60%;width:35%;height:18px;">Text Field</div>
                <div class="doc-preview-overlay text-field" style="top:55px;left:15%;width:70%;height:18px;">Text Field</div>
                <div class="doc-preview-overlay seal" style="bottom:40px;right:15px;width:50px;height:50px;border-radius:50%;">Seal</div>
                <div class="doc-preview-overlay signature" style="bottom:20px;left:20%;width:100px;height:30px;">Signature</div>
                <div class="doc-preview-overlay qr-code" style="top:12px;left:10px;width:40px;height:40px;">QR</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Blockchain Verification -->
      <div class="blockchain-verify-card" style="margin-bottom:var(--space-6);">
        <div class="blockchain-verify-header">
          <i data-lucide="link"></i>
          <h3 style="font-size:var(--text-base);font-weight:var(--font-semibold);">Blockchain Integrity Verification</h3>
          <span class="badge badge-success" style="margin-left:auto;"><i data-lucide="check-circle"></i> Hash Matched</span>
        </div>
        <div class="blockchain-verify-body">
          <p style="font-size:var(--text-sm);color:var(--text-secondary);margin-bottom:var(--space-5);">
            The document's cryptographic hash was compared with a trusted record on the Institutional Verification Network blockchain.
          </p>

          <div class="blockchain-info-grid">
            <div class="blockchain-info-item">
              <label>Document Hash</label>
              <div class="value">${data.blockchain.hash.substring(0, 16)}...${data.blockchain.hash.slice(-4)}</div>
            </div>
            <div class="blockchain-info-item">
              <label>Blockchain Status</label>
              <div class="value matched">✓ ${data.blockchain.status}</div>
            </div>
            <div class="blockchain-info-item">
              <label>Record ID</label>
              <div class="value">${data.blockchain.recordId}</div>
            </div>
            <div class="blockchain-info-item">
              <label>Block Number</label>
              <div class="value">${data.blockchain.blockNumber}</div>
            </div>
            <div class="blockchain-info-item">
              <label>Timestamp</label>
              <div class="value" style="font-family:var(--font-family);">${data.blockchain.timestamp}</div>
            </div>
            <div class="blockchain-info-item">
              <label>Network</label>
              <div class="value" style="font-family:var(--font-family);">${data.blockchain.network}</div>
            </div>
          </div>

          <!-- Chain Visualization -->
          <div style="margin-top:var(--space-4);">
            <div class="text-xs text-secondary font-medium mb-3">Block Chain Verification Trail</div>
            <div class="chain-viz">
              ${data.blockchain.prevBlocks.map((block, i) => `
                ${i > 0 ? '<div class="chain-arrow"><i data-lucide="arrow-right"></i></div>' : ''}
                <div class="chain-block ${block.highlight ? 'highlight' : ''}">
                  <span class="block-number">#${block.number}</span>
                  <span class="block-label">${block.label}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    ` : ''}
  `;

  if (window.lucide) lucide.createIcons();

  // Button handlers
  document.getElementById('verify-another-btn').addEventListener('click', () => {
    renderUploadState(container);
  });

  document.getElementById('toggle-result-btn').addEventListener('click', () => {
    renderResultState(container, isVerified ? 'suspicious' : 'verified');
  });

  // View extracted data modal
  const extractedBtn = document.getElementById('view-extracted-btn');
  if (extractedBtn) {
    extractedBtn.addEventListener('click', () => {
      showModal('Extracted Document Data', `
        <div style="font-size:var(--text-sm);">
          <table class="data-table">
            <tbody>
              ${Object.entries(data.documentInfo).map(([k, v]) => `
                <tr>
                  <td style="font-weight:var(--font-medium);color:var(--text-secondary);width:40%;">${k.replace(/([A-Z])/g, ' $1').trim()}</td>
                  <td>${v}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `);
    });
  }
}

// Flag for review handler
window.DocuVerify = window.DocuVerify || {};
window.DocuVerify.flagForReview = function() {
  showConfirmDialog(
    'Flag for Manual Review',
    'This document will be flagged and assigned to a senior verification officer for manual review. Proceed?',
    'Flag Document',
    () => {
      // Simulated success
      const toast = document.createElement('div');
      toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:var(--color-success-600);color:white;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:500;z-index:9999;animation:fadeInUp 0.3s ease;display:flex;align-items:center;gap:8px;';
      toast.innerHTML = '<i data-lucide="check-circle" style="width:16px;height:16px;"></i> Document flagged for manual review';
      document.body.appendChild(toast);
      if (window.lucide) lucide.createIcons();
      setTimeout(() => toast.remove(), 3000);
    }
  );
};

function generateMockDocPreview() {
  if (selectedFile && selectedFile.previewUrl) {
    return `
      <div style="text-align:center;padding:12px 0;">
        <img src="${selectedFile.previewUrl}" alt="Captured Document" style="max-width:100%;max-height:420px;border-radius:var(--radius-md);box-shadow:0 8px 24px rgba(0,0,0,0.15);object-fit:contain;border:1px solid var(--border-light);" />
        <div style="font-size:12px;color:var(--text-secondary);margin-top:12px;display:flex;align-items:center;justify-content:center;gap:6px;font-weight:500;">
          <i data-lucide="camera" style="width:14px;height:14px;color:var(--color-accent-600);"></i> Captured Document Image
        </div>
      </div>
    `;
  }

  return `
    <div style="text-align:center;margin-bottom:16px;">
      <div style="width:36px;height:36px;margin:0 auto 8px;background:var(--color-gray-200);border-radius:50%;display:flex;align-items:center;justify-content:center;">
        <i data-lucide="landmark" style="width:18px;height:18px;color:var(--color-gray-500);"></i>
      </div>
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:var(--color-gray-700);">Central Board of Education</div>
      <div style="font-size:9px;color:var(--color-gray-400);margin-top:2px;">Government of India</div>
    </div>
    <div style="text-align:center;margin-bottom:12px;">
      <div style="font-size:13px;font-weight:700;color:var(--text-primary);">CERTIFICATE</div>
      <div style="font-size:9px;color:var(--color-gray-400);">Certificate No: CERT-48291</div>
    </div>
    <div style="font-size:10px;color:var(--color-gray-500);line-height:1.6;">
      <div style="margin-bottom:6px;">This is to certify that <strong style="color:var(--text-primary);">Ananya Sharma</strong></div>
      <div style="margin-bottom:6px;">has successfully completed the prescribed course of study</div>
      <div style="margin-bottom:6px;">Date of Issue: <strong>12 March 2026</strong></div>
      <div>Document ID: <strong>DOC-2026-008421</strong></div>
    </div>
    <div style="margin-top:20px;display:flex;justify-content:space-between;align-items:flex-end;">
      <div style="font-size:9px;color:var(--color-gray-400);">
        <div style="width:80px;border-top:1px solid var(--color-gray-300);padding-top:4px;">Signature</div>
      </div>
      <div style="width:40px;height:40px;border:2px solid var(--color-gray-200);border-radius:50%;display:flex;align-items:center;justify-content:center;">
        <span style="font-size:8px;color:var(--color-gray-400);">SEAL</span>
      </div>
    </div>
  `;
}

function createSimulatedDocumentPhoto() {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');

  // Realistic desk background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 1200, 800);

  // Subtle natural angle
  ctx.save();
  ctx.translate(600, 400);
  ctx.rotate(-0.015);

  // Document shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 32;
  ctx.shadowOffsetX = 8;
  ctx.shadowOffsetY = 16;

  // Paper sheet
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(-450, -320, 900, 640);
  ctx.shadowColor = 'transparent';

  // Outer border
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 3;
  ctx.strokeRect(-430, -300, 860, 600);

  ctx.strokeStyle = '#93c5fd';
  ctx.lineWidth = 1;
  ctx.strokeRect(-422, -292, 844, 584);

  // Header Emblem
  ctx.fillStyle = '#2563eb';
  ctx.beginPath();
  ctx.arc(0, -220, 36, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 22px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('AX', 0, -212);

  // Document Heading
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 20px Outfit, sans-serif';
  ctx.fillText('GOVERNMENT OF INDIA • AUTHENTICATION PORTAL', 0, -150);

  ctx.fillStyle = '#2563eb';
  ctx.font = 'bold 26px Outfit, sans-serif';
  ctx.fillText('OFFICIAL IDENTITY CERTIFICATE', 0, -110);

  ctx.fillStyle = '#64748b';
  ctx.font = '13px Plus Jakarta Sans, sans-serif';
  ctx.fillText('REGISTRATION ID: IND-AX-2026-948210', 0, -78);

  // Separator
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-360, -50);
  ctx.lineTo(360, -50);
  ctx.stroke();

  // Document Key Fields
  ctx.textAlign = 'left';
  const fields = [
    { label: 'FULL NAME', val: 'ANANYA SHARMA' },
    { label: 'DATE OF BIRTH', val: '14 AUGUST 1998' },
    { label: 'DOCUMENT NUMBER', val: 'DOC-AX-7729103' },
    { label: 'ISSUING AUTHORITY', val: 'CENTRAL VERIFICATION SYSTEM' },
    { label: 'ISSUE DATE', val: '04 MARCH 2026' },
    { label: 'STATUS', val: 'OFFICIALLY VERIFIED' }
  ];

  fields.forEach((f, i) => {
    const col = i % 2 === 0 ? -340 : 60;
    const row = 0 + Math.floor(i / 2) * 55;
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Plus Jakarta Sans, sans-serif';
    ctx.fillText(f.label, col, row);
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 16px Outfit, sans-serif';
    ctx.fillText(f.val, col, row + 22);
  });

  // Official Seal
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(-220, 210, 34, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 9px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('VERIFIED SEAL', -220, 206);
  ctx.fillText('DEPT OF AUTH', -220, 218);

  // Signature
  ctx.textAlign = 'right';
  ctx.fillStyle = '#0f172a';
  ctx.font = 'italic 20px Georgia, serif';
  ctx.fillText('R. Sharma', 320, 205);
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(200, 215);
  ctx.lineTo(340, 215);
  ctx.stroke();
  ctx.font = '11px Plus Jakarta Sans, sans-serif';
  ctx.fillText('Verification Officer', 330, 232);

  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.94);
}

function dataURLtoFile(dataurl, filename) {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}
