import FaqSection from "@/components/ui/habit-faq-scroller";

export default function DemoOne() {
  const faqData = {
    mainTitle: "Frequently Asked Questions",
    mainSubtitle:
      "Quick answers to common questions regarding document authenticity, cryptographic verification, and pipeline checks.",
    rows: [
      {
        id: 'row1',
        speed: '50s',
        direction: 'left' as const,
        faqItems: [
          {
            id: 'q1',
            question: 'How does the document verification process work?',
            answer:
              'AuthenX utilizes a hybrid multi-layer pipeline: optical character recognition (OCR), metadata authenticity inspection, AI forgery detection, visual artifact cross-validation, and cryptographic matching against blockchain ledger records.'
          },
          {
            id: 'q2',
            question: 'What document types are supported?',
            answer:
              'The system accepts PDF, JPG, PNG, DOC, and DOCX formats. It automatically classifies academic degrees, government certificates, identity credentials, revenue records, and notary documents.'
          },
          {
            id: 'q3',
            question: 'What does a "Suspicious" status indicate?',
            answer:
              'A suspicious verdict signifies that the document triggered one or more security threshold alerts (e.g. font substitution, edited metadata, or signature discrepancy). These documents are automatically flagged for manual inspector review.'
          }
        ]
      },
      {
        id: 'row2',
        speed: '45s',
        direction: 'right' as const,
        faqItems: [
          {
            id: 'q4',
            question: 'How is blockchain integrity guaranteed?',
            answer:
              'Each verified document computes a SHA-256 cryptographic digest that is permanently inscribed on the Institutional Verification Blockchain. Any subsequent alteration creates an immediate hash divergence.'
          },
          {
            id: 'q5',
            question: 'How do I flag a document for senior officer review?',
            answer:
              'When viewing any verification report, click "Flag for Manual Review" in the top action bar. You can add officer notes and route the dossier to senior administrative personnel.'
          },
          {
            id: 'q6',
            question: 'Is citizen and organizational data secure?',
            answer:
              'All documents are transmitted using TLS 1.3 encryption and stored with AES-256 cryptographic keys. Role-based access control (RBAC), multi-factor authentication, and tamper-evident audit trails ensure full compliance.'
          }
        ]
      }
    ]
  };

  return (
    <div className="text-gray-800 min-h-screen flex items-center justify-center py-20 px-4">
      <FaqSection data={faqData} />
    </div>
  );
}

export { DemoOne };
