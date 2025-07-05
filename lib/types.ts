export interface User {
  id: string;
  username: string;
  email: string;
  firmName: string;
  role: 'attorney' | 'paralegal' | 'admin';
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  caseNumber: string;
  attorney: string;
  status: 'active' | 'pending' | 'closed';
  createdAt: string;
}

export interface Document {
  id: string;
  clientId: string;
  name: string;
  type: 'bank_statement' | 'credit_card_statement' | 'tax_return' | 'pay_stub' | 'other';
  accountNumber: string;
  institution: string;
  startDate: string;
  endDate: string;
  uploadDate: string;
  status: 'uploaded' | 'processing' | 'reviewed' | 'flagged';
  fileSize: number;
  pages: number;
  fileUrl?: string;
}

export interface DocumentGap {
  documentId: string;
  clientId: string;
  accountNumber: string;
  institution: string;
  missingPeriod: {
    month: number;
    year: number;
  };
  type: 'bank_statement' | 'credit_card_statement';
}

export interface Activity {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
  type: 'upload' | 'review' | 'gap_detected' | 'report_generated';
}