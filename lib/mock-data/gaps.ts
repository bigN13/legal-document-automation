import { DocumentGap } from '../types';

export const mockGaps: DocumentGap[] = [
  // Client 001 - Sarah Johnson gaps
  {
    documentId: 'gap_001',
    clientId: 'client_001',
    accountNumber: '****1234',
    institution: 'Chase Bank',
    missingPeriod: {
      month: 3,
      year: 2024
    },
    type: 'bank_statement'
  },
  {
    documentId: 'gap_002',
    clientId: 'client_001',
    accountNumber: '****5678',
    institution: 'Chase Bank',
    missingPeriod: {
      month: 3,
      year: 2024
    },
    type: 'credit_card_statement'
  },
  {
    documentId: 'gap_003',
    clientId: 'client_001',
    accountNumber: '****5678',
    institution: 'Chase Bank',
    missingPeriod: {
      month: 4,
      year: 2024
    },
    type: 'credit_card_statement'
  },

  // Client 002 - Michael Davis gaps
  {
    documentId: 'gap_004',
    clientId: 'client_002',
    accountNumber: '****9876',
    institution: 'Wells Fargo',
    missingPeriod: {
      month: 2,
      year: 2024
    },
    type: 'bank_statement'
  },
  {
    documentId: 'gap_005',
    clientId: 'client_002',
    accountNumber: '****9876',
    institution: 'Wells Fargo',
    missingPeriod: {
      month: 3,
      year: 2024
    },
    type: 'bank_statement'
  },
  {
    documentId: 'gap_006',
    clientId: 'client_002',
    accountNumber: '****3456',
    institution: 'American Express',
    missingPeriod: {
      month: 2,
      year: 2024
    },
    type: 'credit_card_statement'
  },
  {
    documentId: 'gap_007',
    clientId: 'client_002',
    accountNumber: '****3456',
    institution: 'American Express',
    missingPeriod: {
      month: 3,
      year: 2024
    },
    type: 'credit_card_statement'
  },
  {
    documentId: 'gap_008',
    clientId: 'client_002',
    accountNumber: '****3456',
    institution: 'American Express',
    missingPeriod: {
      month: 4,
      year: 2024
    },
    type: 'credit_card_statement'
  },

  // Client 003 - Jennifer Martinez gaps
  {
    documentId: 'gap_009',
    clientId: 'client_003',
    accountNumber: '****4321',
    institution: 'Bank of America',
    missingPeriod: {
      month: 1,
      year: 2024
    },
    type: 'bank_statement'
  },
  {
    documentId: 'gap_010',
    clientId: 'client_003',
    accountNumber: '****4321',
    institution: 'Bank of America',
    missingPeriod: {
      month: 2,
      year: 2024
    },
    type: 'bank_statement'
  },

  // Client 005 - Lisa Anderson gap
  {
    documentId: 'gap_011',
    clientId: 'client_005',
    accountNumber: '****7890',
    institution: 'Citibank',
    missingPeriod: {
      month: 1,
      year: 2024
    },
    type: 'bank_statement'
  }
];

export const getGapsByClientId = (clientId: string): DocumentGap[] => {
  return mockGaps.filter(gap => gap.clientId === clientId);
};

export const getGapsByInstitution = (institution: string): DocumentGap[] => {
  return mockGaps.filter(gap => gap.institution === institution);
};

export const getGapsSummary = () => {
  const summary = new Map<string, { clientName: string; totalGaps: number }>();
  
  mockGaps.forEach(gap => {
    const existing = summary.get(gap.clientId) || { clientName: '', totalGaps: 0 };
    summary.set(gap.clientId, {
      clientName: existing.clientName,
      totalGaps: existing.totalGaps + 1
    });
  });

  return summary;
};