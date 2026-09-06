// ============================================
// DocuVerify — Mock Data
// All datasets for the UI prototype
// ============================================

export const kpiData = [
  {
    id: 'docs-verified',
    label: 'Documents Verified',
    value: '12,486',
    change: '+12.3%',
    changeDir: 'up',
    icon: 'file-check-2',
    color: 'blue'
  },
  {
    id: 'verified-success',
    label: 'Verified Successfully',
    value: '11,972',
    change: '+8.7%',
    changeDir: 'up',
    icon: 'shield-check',
    color: 'green'
  },
  {
    id: 'suspicious-docs',
    label: 'Suspicious Documents',
    value: '314',
    change: '+2.1%',
    changeDir: 'up',
    icon: 'alert-triangle',
    color: 'amber'
  },
  {
    id: 'pending-verification',
    label: 'Pending Verification',
    value: '200',
    change: '-5.4%',
    changeDir: 'down',
    icon: 'clock',
    color: 'cyan'
  },
  {
    id: 'accuracy',
    label: 'Verification Accuracy',
    value: '98.7%',
    change: '+0.3%',
    changeDir: 'up',
    icon: 'target',
    color: 'green'
  }
];

export const recentActivity = [
  {
    id: 'VER-20260906-001',
    docType: 'Birth Certificate',
    submittedBy: 'Ananya Sharma',
    status: 'verified',
    riskScore: 2,
    timestamp: '2 min ago',
    docId: 'DOC-2026-008421'
  },
  {
    id: 'VER-20260906-002',
    docType: 'Degree Certificate',
    submittedBy: 'Rajesh Kumar',
    status: 'suspicious',
    riskScore: 87,
    timestamp: '8 min ago',
    docId: 'DOC-2026-008420'
  },
  {
    id: 'VER-20260906-003',
    docType: 'Aadhaar Card',
    submittedBy: 'Priya Patel',
    status: 'verified',
    riskScore: 1,
    timestamp: '15 min ago',
    docId: 'DOC-2026-008419'
  },
  {
    id: 'VER-20260906-004',
    docType: 'Income Certificate',
    submittedBy: 'Vikram Singh',
    status: 'pending',
    riskScore: null,
    timestamp: '22 min ago',
    docId: 'DOC-2026-008418'
  },
  {
    id: 'VER-20260906-005',
    docType: 'PAN Card',
    submittedBy: 'Meera Nair',
    status: 'verified',
    riskScore: 3,
    timestamp: '35 min ago',
    docId: 'DOC-2026-008417'
  },
  {
    id: 'VER-20260906-006',
    docType: 'Driving License',
    submittedBy: 'Arjun Reddy',
    status: 'failed',
    riskScore: 94,
    timestamp: '41 min ago',
    docId: 'DOC-2026-008416'
  },
  {
    id: 'VER-20260906-007',
    docType: 'Passport',
    submittedBy: 'Deepa Menon',
    status: 'verified',
    riskScore: 4,
    timestamp: '1 hr ago',
    docId: 'DOC-2026-008415'
  },
  {
    id: 'VER-20260906-008',
    docType: 'Caste Certificate',
    submittedBy: 'Suresh Yadav',
    status: 'verified',
    riskScore: 2,
    timestamp: '1 hr ago',
    docId: 'DOC-2026-008414'
  }
];

export const securityServices = [
  { name: 'Blockchain Integrity', icon: 'link', status: 'operational', detail: '99.99% uptime' },
  { name: 'OCR Service', icon: 'scan-text', status: 'operational', detail: 'Avg. 1.2s response' },
  { name: 'Document Analysis', icon: 'file-search', status: 'operational', detail: 'All models loaded' },
  { name: 'Digital Signature Verification', icon: 'pen-tool', status: 'operational', detail: 'PKI connected' },
  { name: 'System Uptime', icon: 'activity', status: 'operational', detail: '99.97% (30d)' }
];

export const chartData7d = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  verified: [285, 312, 298, 340, 365, 190, 145],
  suspicious: [8, 12, 6, 14, 9, 4, 3],
  failed: [3, 5, 2, 7, 4, 1, 1]
};

export const chartData30d = {
  labels: ['W1', 'W2', 'W3', 'W4'],
  verified: [1850, 2100, 1970, 2240],
  suspicious: [42, 56, 38, 51],
  failed: [14, 19, 11, 18]
};

export const chartData3m = {
  labels: ['Jul', 'Aug', 'Sep'],
  verified: [7200, 8100, 8900],
  suspicious: [180, 210, 195],
  failed: [52, 61, 48]
};

export const verificationSteps = [
  { id: 1, label: 'Document Upload', icon: 'upload', time: '0.2s' },
  { id: 2, label: 'Image Pre-processing', icon: 'image', time: '1.8s' },
  { id: 3, label: 'OCR & Data Extraction', icon: 'scan-text', time: '3.2s', parallel: true },
  { id: 4, label: 'Document Image Analysis', icon: 'eye', time: '2.9s', parallel: true },
  { id: 5, label: 'Tampering & Integrity Checks', icon: 'shield', time: '2.1s' },
  { id: 6, label: 'Digital Signature / Hash', icon: 'fingerprint', time: '1.1s' },
  { id: 7, label: 'Blockchain Verification', icon: 'link', time: '1.5s' },
  { id: 8, label: 'Final Assessment', icon: 'check-circle', time: '0.4s' }
];

export const verificationResult = {
  status: 'verified',
  authenticityScore: 98.6,
  tamperingRisk: 1.2,
  dataConsistency: 99.1,
  blockchainMatch: 'Verified',
  checks: [
    { name: 'Document structure validated', status: 'pass', desc: 'Document layout matches expected template for Certificate type', time: '14:32:02' },
    { name: 'OCR data successfully extracted', status: 'pass', desc: '14 fields extracted with 99.8% confidence', time: '14:32:04' },
    { name: 'Metadata consistent', status: 'pass', desc: 'Creation date, author, and encoding match expected values', time: '14:32:05' },
    { name: 'No significant visual tampering detected', status: 'pass', desc: 'Error Level Analysis shows no manipulation artifacts', time: '14:32:06' },
    { name: 'Digital signature verified', status: 'pass', desc: 'RSA-2048 signature validated against issuing authority\'s public key', time: '14:32:07' },
    { name: 'Document hash matched', status: 'pass', desc: 'SHA-256 hash matches registered document fingerprint', time: '14:32:08' },
    { name: 'Blockchain record confirmed', status: 'pass', desc: 'Document hash found in Block #18,492,103 of the verification network', time: '14:32:09' }
  ],
  documentInfo: {
    type: 'Certificate',
    docId: 'DOC-2026-008421',
    name: 'Ananya Sharma',
    issueDate: '12 March 2026',
    issuingAuthority: 'Central Board of Education',
    docNumber: 'CERT-48291',
    category: 'Educational',
    format: 'PDF/A-1b'
  },
  blockchain: {
    hash: '8f72d4e1b3c9a7f0e2d5b8c4a1f3e6d9b2c5a8f7e0d3c6b9a2f5e8d1c4b7a91c',
    status: 'MATCHED',
    recordId: 'BLK-492810',
    blockNumber: '18,492,103',
    timestamp: '12 Mar 2026, 14:32:18',
    network: 'Institutional Verification Network',
    prevBlocks: [
      { number: '18,492,101', label: 'Block' },
      { number: '18,492,102', label: 'Block' },
      { number: '18,492,103', label: 'Current Record', highlight: true }
    ]
  }
};

export const suspiciousResult = {
  status: 'suspicious',
  authenticityScore: 13,
  tamperingRisk: 87,
  dataConsistency: 42.5,
  blockchainMatch: 'Not Found',
  checks: [
    { name: 'Document structure validated', status: 'pass', desc: 'Document layout matches expected template', time: '14:45:02' },
    { name: 'OCR data extracted with warnings', status: 'warn', desc: '9 fields extracted, 3 fields showed low confidence (<70%)', time: '14:45:05' },
    { name: 'Metadata inconsistencies found', status: 'fail', desc: 'Document creation date predates issuing authority establishment', time: '14:45:06' },
    { name: 'Possible image manipulation detected', status: 'fail', desc: 'Error Level Analysis detected anomalies in seal and signature regions', time: '14:45:08' },
    { name: 'Digital signature could not be verified', status: 'fail', desc: 'Signature does not match any registered authority public key', time: '14:45:09' },
    { name: 'Document hash mismatch', status: 'fail', desc: 'Computed hash does not match any registered document fingerprint', time: '14:45:10' },
    { name: 'QR code validation failed', status: 'fail', desc: 'Embedded QR code data does not match document metadata', time: '14:45:11' }
  ],
  reasons: [
    'Document hash does not match registered record',
    'Inconsistent metadata detected',
    'Possible image manipulation in seal region',
    'QR code could not be validated'
  ]
};

export const verificationHistory = [
  { id: 'VER-20260906-001', document: 'Birth_Certificate_AS.pdf', docType: 'Birth Certificate', submittedBy: 'Ananya Sharma', date: '06 Sep 2026, 14:32', score: 98.6, risk: 'Low', status: 'verified' },
  { id: 'VER-20260906-002', document: 'Degree_RK.pdf', docType: 'Degree Certificate', submittedBy: 'Rajesh Kumar', date: '06 Sep 2026, 14:25', score: 13.0, risk: 'Critical', status: 'failed' },
  { id: 'VER-20260906-003', document: 'Aadhaar_PP.pdf', docType: 'Aadhaar Card', submittedBy: 'Priya Patel', date: '06 Sep 2026, 14:18', score: 99.2, risk: 'Low', status: 'verified' },
  { id: 'VER-20260906-004', document: 'Income_Cert_VS.pdf', docType: 'Income Certificate', submittedBy: 'Vikram Singh', date: '06 Sep 2026, 14:10', score: null, risk: 'Pending', status: 'pending' },
  { id: 'VER-20260906-005', document: 'PAN_MN.jpg', docType: 'PAN Card', submittedBy: 'Meera Nair', date: '06 Sep 2026, 13:55', score: 97.8, risk: 'Low', status: 'verified' },
  { id: 'VER-20260906-006', document: 'DL_AR.pdf', docType: 'Driving License', submittedBy: 'Arjun Reddy', date: '06 Sep 2026, 13:48', score: 6.0, risk: 'Critical', status: 'failed' },
  { id: 'VER-20260906-007', document: 'Passport_DM.pdf', docType: 'Passport', submittedBy: 'Deepa Menon', date: '06 Sep 2026, 13:30', score: 96.4, risk: 'Low', status: 'verified' },
  { id: 'VER-20260906-008', document: 'Caste_SY.pdf', docType: 'Caste Certificate', submittedBy: 'Suresh Yadav', date: '06 Sep 2026, 13:15', score: 98.1, risk: 'Low', status: 'verified' },
  { id: 'VER-20260905-009', document: 'Marksheet_KG.pdf', docType: 'Marksheet', submittedBy: 'Kavya Gupta', date: '05 Sep 2026, 17:42', score: 45.0, risk: 'High', status: 'suspicious' },
  { id: 'VER-20260905-010', document: 'Domicile_RJ.pdf', docType: 'Domicile Certificate', submittedBy: 'Rohit Joshi', date: '05 Sep 2026, 16:30', score: 99.5, risk: 'Low', status: 'verified' },
  { id: 'VER-20260905-011', document: 'Transfer_NK.pdf', docType: 'Transfer Certificate', submittedBy: 'Neha Kulkarni', date: '05 Sep 2026, 15:20', score: 62.0, risk: 'Medium', status: 'suspicious' },
  { id: 'VER-20260905-012', document: 'Experience_AM.pdf', docType: 'Experience Letter', submittedBy: 'Arun Mehta', date: '05 Sep 2026, 14:05', score: 97.3, risk: 'Low', status: 'verified' }
];

export const documents = [
  { id: 'DOC-2026-008421', name: 'Birth Certificate — Ananya Sharma', type: 'Birth Certificate', authority: 'Municipal Corporation, Mumbai', regStatus: 'Registered', blockchainStatus: 'Verified', lastVerified: '06 Sep 2026', format: 'PDF' },
  { id: 'DOC-2026-008420', name: 'B.Tech Degree — Rajesh Kumar', type: 'Degree Certificate', authority: 'IIT Delhi', regStatus: 'Unregistered', blockchainStatus: 'Not Found', lastVerified: '06 Sep 2026', format: 'PDF' },
  { id: 'DOC-2026-008419', name: 'Aadhaar Card — Priya Patel', type: 'Aadhaar Card', authority: 'UIDAI', regStatus: 'Registered', blockchainStatus: 'Verified', lastVerified: '06 Sep 2026', format: 'PDF' },
  { id: 'DOC-2026-008418', name: 'Income Certificate — Vikram Singh', type: 'Income Certificate', authority: 'District Magistrate, Lucknow', regStatus: 'Pending', blockchainStatus: 'Pending', lastVerified: 'N/A', format: 'PDF' },
  { id: 'DOC-2026-008417', name: 'PAN Card — Meera Nair', type: 'PAN Card', authority: 'Income Tax Dept.', regStatus: 'Registered', blockchainStatus: 'Verified', lastVerified: '06 Sep 2026', format: 'JPG' },
  { id: 'DOC-2026-008416', name: 'Driving License — Arjun Reddy', type: 'Driving License', authority: 'RTO Hyderabad', regStatus: 'Flagged', blockchainStatus: 'Mismatch', lastVerified: '06 Sep 2026', format: 'PDF' },
  { id: 'DOC-2026-008415', name: 'Passport — Deepa Menon', type: 'Passport', authority: 'MEA, Govt. of India', regStatus: 'Registered', blockchainStatus: 'Verified', lastVerified: '06 Sep 2026', format: 'PDF' },
  { id: 'DOC-2026-008414', name: 'Caste Certificate — Suresh Yadav', type: 'Caste Certificate', authority: 'SDM Office, Patna', regStatus: 'Registered', blockchainStatus: 'Verified', lastVerified: '06 Sep 2026', format: 'PDF' }
];

export const blockchainLedger = [
  { block: '18,492,103', txHash: '0x7f3a...b2c1', docHash: '8f72...a91c', timestamp: '06 Sep 2026, 14:32:18', status: 'confirmed' },
  { block: '18,492,102', txHash: '0x4e1b...d3f7', docHash: 'a3c1...e7f2', timestamp: '06 Sep 2026, 14:18:42', status: 'confirmed' },
  { block: '18,492,101', txHash: '0x9d2c...a8e5', docHash: 'c5b2...f4d8', timestamp: '06 Sep 2026, 13:55:31', status: 'confirmed' },
  { block: '18,492,100', txHash: '0x1f8e...c6a9', docHash: 'e7d4...b3a6', timestamp: '06 Sep 2026, 13:30:15', status: 'confirmed' },
  { block: '18,492,099', txHash: '0x3b7d...e1f4', docHash: 'b9a6...d2c5', timestamp: '06 Sep 2026, 13:15:08', status: 'confirmed' },
  { block: '18,492,098', txHash: '0x6c4a...f9d2', docHash: 'd1e8...a5b7', timestamp: '05 Sep 2026, 17:42:55', status: 'confirmed' },
  { block: '18,492,097', txHash: '0x8a5f...b4c3', docHash: 'f2c9...e6d1', timestamp: '05 Sep 2026, 16:30:22', status: 'confirmed' },
  { block: '18,492,096', txHash: '0x2d9e...a7f6', docHash: '4b8a...c1e3', timestamp: '05 Sep 2026, 15:20:11', status: 'confirmed' },
  { block: '18,492,095', txHash: '0x5e3c...d8b1', docHash: '7a2f...b9d4', timestamp: '05 Sep 2026, 14:05:39', status: 'confirmed' },
  { block: '18,492,094', txHash: '0xb1f7...e2a8', docHash: '3c6d...a4f9', timestamp: '05 Sep 2026, 12:48:17', status: 'confirmed' }
];

export const alerts = [
  { id: 'ALT-001', severity: 'critical', title: 'Document Hash Mismatch Detected', description: 'The submitted degree certificate (DOC-2026-008420) hash does not match any registered record in the blockchain ledger.', docId: 'DOC-2026-008420', timestamp: '06 Sep 2026, 14:25', status: 'Open' },
  { id: 'ALT-002', severity: 'critical', title: 'Possible Image Manipulation', description: 'Error Level Analysis detected significant anomalies in the seal and signature regions of the driving license (DOC-2026-008416).', docId: 'DOC-2026-008416', timestamp: '06 Sep 2026, 13:48', status: 'Under Review' },
  { id: 'ALT-003', severity: 'warning', title: 'Multiple Failed Verification Attempts', description: '3 consecutive failed verification attempts from the same source in the last 2 hours.', docId: 'Multiple', timestamp: '06 Sep 2026, 13:15', status: 'Monitoring' },
  { id: 'ALT-004', severity: 'warning', title: 'Unregistered Document Identifier', description: 'The submitted marksheet (DOC-2026-008413) uses an identifier format not recognized by any registered issuing authority.', docId: 'DOC-2026-008413', timestamp: '05 Sep 2026, 17:42', status: 'Open' },
  { id: 'ALT-005', severity: 'warning', title: 'OCR Confidence Below Threshold', description: 'Multiple fields in the transfer certificate (DOC-2026-008412) were extracted with less than 70% confidence.', docId: 'DOC-2026-008412', timestamp: '05 Sep 2026, 15:20', status: 'Resolved' },
  { id: 'ALT-006', severity: 'info', title: 'System Maintenance Scheduled', description: 'Blockchain verification node maintenance window scheduled for 07 Sep 2026, 02:00-04:00 IST.', docId: 'N/A', timestamp: '05 Sep 2026, 10:00', status: 'Acknowledged' },
  { id: 'ALT-007', severity: 'info', title: 'New Issuing Authority Registered', description: 'District Magistrate Office, Varanasi has been added to the trusted authority registry.', docId: 'N/A', timestamp: '04 Sep 2026, 16:30', status: 'Acknowledged' },
  { id: 'ALT-008', severity: 'critical', title: 'Duplicate Document Submission', description: 'The same document hash was submitted twice under different names within 30 minutes.', docId: 'DOC-2026-008410', timestamp: '04 Sep 2026, 11:22', status: 'Resolved' }
];

export const analyticsData = {
  volumeLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  volumeData: [4200, 4800, 5100, 5600, 6200, 6800, 7200, 8100, 8900],
  successRateLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  successRateData: [96.2, 96.5, 97.1, 97.3, 97.8, 98.0, 98.2, 98.5, 98.7],
  suspiciousTrendLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  suspiciousTrendData: [120, 135, 118, 142, 155, 168, 180, 210, 195],
  docTypes: {
    labels: ['Certificate', 'ID Card', 'License', 'Passport', 'Marksheet', 'Other'],
    data: [3200, 2800, 1500, 1200, 2100, 1686]
  },
  riskDistribution: {
    labels: ['Low (0-20%)', 'Medium (20-50%)', 'High (50-80%)', 'Critical (80-100%)'],
    data: [11972, 245, 155, 114]
  },
  processingTime: {
    labels: ['<2s', '2-5s', '5-10s', '10-15s', '>15s'],
    data: [4500, 5200, 2100, 480, 206]
  }
};

export const analyticsKPIs = [
  { label: 'Avg. Processing Time', value: '4.2s', icon: 'timer' },
  { label: 'Peak Daily Volume', value: '486', icon: 'trending-up' },
  { label: 'Active Authorities', value: '142', icon: 'building' },
  { label: 'Blockchain Records', value: '18.4M', icon: 'database' }
];
