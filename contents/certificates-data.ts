export interface CertificateDocument {
  id: string;
  name: string;
  type:
    | "offer_letter"
    | "completion_certificate"
    | "experience_letter"
    | "recommendation_letter"
    | "other";
  driveUrl: string;
  issueDate: string;
  description?: string;
}

export interface EmployeeCertificates {
  employeeName: string;
  employeeId: string;
  certificates: CertificateDocument[];
}

// This is where you can add real certificate data for each employee
export const employeeCertificatesData: EmployeeCertificates[] = [
  // Example data - Replace with actual certificate URLs
  {
    employeeName: "Harsh Verma",
    employeeId: "sybrite",
    certificates: [
      {
        id: "harsh-offer-001",
        name: "Offer Letter - Full Stack Developer Intern",
        type: "offer_letter",
        driveUrl:
          "https://drive.google.com/file/d/YOUR_ACTUAL_DRIVE_ID_HERE/view",
        issueDate: "2024-01-15",
        description:
          "Official offer letter for Full Stack Developer Intern position",
      },
      {
        id: "harsh-completion-001",
        name: "Internship Completion Certificate",
        type: "completion_certificate",
        driveUrl:
          "https://drive.google.com/file/d/YOUR_ACTUAL_DRIVE_ID_HERE/view",
        issueDate: "2024-06-30",
        description:
          "Certificate of successful completion of internship program",
      },
    ],
  },
  {
    employeeName: "Ashwani Senapati",
    employeeId: "ashwani-senapati",
    certificates: [
      {
        id: "ashwani-offer-001",
        name: "Offer Letter - Full Stack Developer Intern",
        type: "offer_letter",
        driveUrl:
          "https://drive.google.com/file/d/YOUR_ACTUAL_DRIVE_ID_HERE/view",
        issueDate: "2024-01-20",
        description:
          "Official offer letter for Full Stack Developer Intern position",
      },
    ],
  },
  {
    employeeName: "Kavali Deekshith",
    employeeId: "founder",
    certificates: [
      {
        id: "deekshith-recommendation-001",
        name: "Letter of Recommendation",
        type: "recommendation_letter",
        driveUrl:
          "https://drive.google.com/file/d/YOUR_ACTUAL_DRIVE_ID_HERE/view",
        issueDate: "2024-11-15",
        description: "Letter of recommendation for exceptional leadership",
      },
    ],
  },
  // Add more employees as needed
  // Example: Adding certificates for more team members
  {
    employeeName: "Ayush Kumar Sahoo",
    employeeId: "co-founder",
    certificates: [
      {
        id: "ayush-offer-001",
        name: "Co-Founder Appointment Letter",
        type: "offer_letter",
        driveUrl:
          "https://drive.google.com/file/d/YOUR_ACTUAL_DRIVE_ID_HERE/view",
        issueDate: "2024-01-01",
        description: "Official appointment letter as Co-Founder and CMO",
      },
      {
        id: "ayush-recommendation-001",
        name: "Leadership Excellence Certificate",
        type: "recommendation_letter",
        driveUrl:
          "https://drive.google.com/file/d/YOUR_ACTUAL_DRIVE_ID_HERE/view",
        issueDate: "2024-12-01",
        description:
          "Certificate recognizing outstanding leadership and business development",
      },
    ],
  },

  // Template for adding new employee certificates:
  /*
  {
    employeeName: "Employee Full Name",
    employeeId: "employee-id-from-team-section",
    certificates: [
      {
        id: "unique-certificate-id",
        name: "Certificate Name",
        type: "offer_letter", // or "completion_certificate", "experience_letter", "recommendation_letter", "other"
        driveUrl: "https://drive.google.com/file/d/YOUR_DRIVE_FILE_ID/view",
        issueDate: "YYYY-MM-DD",
        description: "Optional description of the certificate"
      }
    ]
  },
  */
];

// Helper function to get certificates for a specific employee
export const getCertificatesForEmployee = (
  employeeName: string
): CertificateDocument[] => {
  const employee = employeeCertificatesData.find(
    (emp) => emp.employeeName.toLowerCase() === employeeName.toLowerCase()
  );
  return employee?.certificates || [];
};

// Helper function to check if an employee has certificates
export const hasEmployeeCertificates = (employeeName: string): boolean => {
  return getCertificatesForEmployee(employeeName).length > 0;
};

// Default certificate templates for employees without specific data
export const getDefaultCertificates = (
  memberName: string,
  category: string
): CertificateDocument[] => {
  const baseDocuments: CertificateDocument[] = [];

  // Add default offer letter for all members
  baseDocuments.push({
    id: `${memberName.toLowerCase().replace(/\s+/g, "-")}-offer-default`,
    name: "Offer Letter",
    type: "offer_letter",
    driveUrl: "https://drive.google.com/file/d/DEFAULT_OFFER_LETTER_ID/view",
    issueDate: "2024-01-15",
    description:
      "Official offer letter with role details and compensation (Template)",
  });

  // Add default completion certificate for interns
  if (category === "intern") {
    baseDocuments.push({
      id: `${memberName.toLowerCase().replace(/\s+/g, "-")}-completion-default`,
      name: "Internship Completion Certificate",
      type: "completion_certificate",
      driveUrl:
        "https://drive.google.com/file/d/DEFAULT_COMPLETION_CERT_ID/view",
      issueDate: "2024-06-30",
      description:
        "Certificate of successful completion of internship program (Template)",
    });
  }

  // Add default experience letter for employees and leadership
  if (category === "employee" || category === "leadership") {
    baseDocuments.push({
      id: `${memberName.toLowerCase().replace(/\s+/g, "-")}-experience-default`,
      name: "Experience Letter",
      type: "experience_letter",
      driveUrl:
        "https://drive.google.com/file/d/DEFAULT_EXPERIENCE_LETTER_ID/view",
      issueDate: "2024-12-01",
      description:
        "Official experience letter detailing role and responsibilities (Template)",
    });
  }

  return baseDocuments;
};
