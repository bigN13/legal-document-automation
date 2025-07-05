import { Document } from '../types';

export const mockDocuments: Document[] = [
  // Client 001 - Sarah Johnson - Complete set with one gap
  {
    id: 'doc_001',
    clientId: 'client_001',
    name: 'Chase_Bank_Statement_Jan_2024.pdf',
    type: 'bank_statement',
    accountNumber: '****1234',
    institution: 'Chase Bank',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    uploadDate: '2024-02-15T10:30:00Z',
    status: 'reviewed',
    fileSize: 245000,
    pages: 12
  },
  {
    id: 'doc_002',
    clientId: 'client_001',
    name: 'Chase_Bank_Statement_Feb_2024.pdf',
    type: 'bank_statement',
    accountNumber: '****1234',
    institution: 'Chase Bank',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    uploadDate: '2024-03-10T14:20:00Z',
    status: 'reviewed',
    fileSize: 198000,
    pages: 10
  },
  // Missing March 2024 for Chase Bank
  {
    id: 'doc_003',
    clientId: 'client_001',
    name: 'Chase_Bank_Statement_Apr_2024.pdf',
    type: 'bank_statement',
    accountNumber: '****1234',
    institution: 'Chase Bank',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    uploadDate: '2024-05-05T09:15:00Z',
    status: 'processing',
    fileSize: 212000,
    pages: 11
  },
  {
    id: 'doc_004',
    clientId: 'client_001',
    name: 'Chase_Visa_Statement_Jan_2024.pdf',
    type: 'credit_card_statement',
    accountNumber: '****5678',
    institution: 'Chase Bank',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    uploadDate: '2024-02-15T10:35:00Z',
    status: 'reviewed',
    fileSize: 156000,
    pages: 8
  },
  {
    id: 'doc_005',
    clientId: 'client_001',
    name: 'Chase_Visa_Statement_Feb_2024.pdf',
    type: 'credit_card_statement',
    accountNumber: '****5678',
    institution: 'Chase Bank',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    uploadDate: '2024-03-10T14:25:00Z',
    status: 'reviewed',
    fileSize: 167000,
    pages: 9
  },
  {
    id: 'doc_006',
    clientId: 'client_001',
    name: 'Tax_Return_2023.pdf',
    type: 'tax_return',
    accountNumber: 'N/A',
    institution: 'IRS',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    uploadDate: '2024-02-20T16:00:00Z',
    status: 'reviewed',
    fileSize: 890000,
    pages: 35
  },

  // Client 002 - Michael Davis - Multiple gaps
  {
    id: 'doc_007',
    clientId: 'client_002',
    name: 'Wells_Fargo_Statement_Jan_2024.pdf',
    type: 'bank_statement',
    accountNumber: '****9876',
    institution: 'Wells Fargo',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    uploadDate: '2024-02-18T11:00:00Z',
    status: 'reviewed',
    fileSize: 234000,
    pages: 15
  },
  // Missing Feb and Mar 2024 for Wells Fargo
  {
    id: 'doc_008',
    clientId: 'client_002',
    name: 'Wells_Fargo_Statement_Apr_2024.pdf',
    type: 'bank_statement',
    accountNumber: '****9876',
    institution: 'Wells Fargo',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    uploadDate: '2024-05-02T13:30:00Z',
    status: 'uploaded',
    fileSize: 256000,
    pages: 14
  },
  {
    id: 'doc_009',
    clientId: 'client_002',
    name: 'Amex_Statement_Jan_2024.pdf',
    type: 'credit_card_statement',
    accountNumber: '****3456',
    institution: 'American Express',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    uploadDate: '2024-02-18T11:10:00Z',
    status: 'flagged',
    fileSize: 178000,
    pages: 7
  },

  // Client 003 - Jennifer Martinez - Just started uploading
  {
    id: 'doc_010',
    clientId: 'client_003',
    name: 'Bank_of_America_Statement_Mar_2024.pdf',
    type: 'bank_statement',
    accountNumber: '****4321',
    institution: 'Bank of America',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    uploadDate: '2024-04-10T10:00:00Z',
    status: 'processing',
    fileSize: 301000,
    pages: 18
  },
  {
    id: 'doc_011',
    clientId: 'client_003',
    name: 'Bank_of_America_Statement_Apr_2024.pdf',
    type: 'bank_statement',
    accountNumber: '****4321',
    institution: 'Bank of America',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    uploadDate: '2024-05-03T14:45:00Z',
    status: 'uploaded',
    fileSize: 289000,
    pages: 16
  },

  // Client 005 - Lisa Anderson - Complete recent months
  {
    id: 'doc_012',
    clientId: 'client_005',
    name: 'CitiBank_Statement_Feb_2024.pdf',
    type: 'bank_statement',
    accountNumber: '****7890',
    institution: 'Citibank',
    startDate: '2024-02-01',
    endDate: '2024-02-29',
    uploadDate: '2024-03-12T09:00:00Z',
    status: 'reviewed',
    fileSize: 267000,
    pages: 13
  },
  {
    id: 'doc_013',
    clientId: 'client_005',
    name: 'CitiBank_Statement_Mar_2024.pdf',
    type: 'bank_statement',
    accountNumber: '****7890',
    institution: 'Citibank',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    uploadDate: '2024-04-08T10:30:00Z',
    status: 'reviewed',
    fileSize: 254000,
    pages: 12
  },
  {
    id: 'doc_014',
    clientId: 'client_005',
    name: 'CitiBank_Statement_Apr_2024.pdf',
    type: 'bank_statement',
    accountNumber: '****7890',
    institution: 'Citibank',
    startDate: '2024-04-01',
    endDate: '2024-04-30',
    uploadDate: '2024-05-06T11:15:00Z',
    status: 'processing',
    fileSize: 278000,
    pages: 14
  },
  {
    id: 'doc_015',
    clientId: 'client_005',
    name: 'Pay_Stub_Apr_2024.pdf',
    type: 'pay_stub',
    accountNumber: 'N/A',
    institution: 'Tech Corp Inc.',
    startDate: '2024-04-01',
    endDate: '2024-04-15',
    uploadDate: '2024-04-20T15:00:00Z',
    status: 'reviewed',
    fileSize: 89000,
    pages: 2
  }
];

export const getDocumentsByClientId = (clientId: string): Document[] => {
  return mockDocuments.filter(doc => doc.clientId === clientId);
};

export const getDocumentsByStatus = (status: Document['status']): Document[] => {
  return mockDocuments.filter(doc => doc.status === status);
};

export const getRecentDocuments = (limit: number = 5): Document[] => {
  return [...mockDocuments]
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, limit);
};