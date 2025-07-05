import { Client } from '../types';

export const mockClients: Client[] = [
  {
    id: 'client_001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(305) 555-0123',
    caseNumber: 'FL-2024-001234',
    attorney: 'John Smith',
    status: 'active',
    createdAt: '2024-02-01T14:30:00Z'
  },
  {
    id: 'client_002',
    name: 'Michael Davis',
    email: 'mdavis@email.com',
    phone: '(305) 555-0456',
    caseNumber: 'FL-2024-001235',
    attorney: 'John Smith',
    status: 'active',
    createdAt: '2024-02-15T10:00:00Z'
  },
  {
    id: 'client_003',
    name: 'Jennifer Martinez',
    email: 'jmartinez@email.com',
    phone: '(305) 555-0789',
    caseNumber: 'FL-2024-001236',
    attorney: 'Jane Doe',
    status: 'pending',
    createdAt: '2024-03-01T09:15:00Z'
  },
  {
    id: 'client_004',
    name: 'Robert Wilson',
    email: 'rwilson@email.com',
    phone: '(305) 555-0234',
    caseNumber: 'FL-2023-009876',
    attorney: 'John Smith',
    status: 'closed',
    createdAt: '2023-11-15T13:45:00Z'
  },
  {
    id: 'client_005',
    name: 'Lisa Anderson',
    email: 'landerson@email.com',
    phone: '(305) 555-0567',
    caseNumber: 'FL-2024-001237',
    attorney: 'Jane Doe',
    status: 'active',
    createdAt: '2024-03-10T11:20:00Z'
  }
];

export const getClientById = (id: string): Client | undefined => {
  return mockClients.find(client => client.id === id);
};

export const getActiveClients = (): Client[] => {
  return mockClients.filter(client => client.status === 'active');
};