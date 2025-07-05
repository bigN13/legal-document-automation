import { User } from '../types';

export const mockUsers: User[] = [
  {
    id: 'usr_001',
    username: 'user',
    email: 'attorney@floridalawfirm.com',
    firmName: 'Florida Law Firm',
    role: 'attorney',
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 'usr_002',
    username: 'jsmith',
    email: 'jsmith@floridalawfirm.com',
    firmName: 'Florida Law Firm',
    role: 'attorney',
    createdAt: '2024-01-15T08:00:00Z'
  },
  {
    id: 'usr_003',
    username: 'mjohnson',
    email: 'mjohnson@floridalawfirm.com',
    firmName: 'Florida Law Firm',
    role: 'paralegal',
    createdAt: '2024-01-20T10:30:00Z'
  },
  {
    id: 'usr_004',
    username: 'admin',
    email: 'admin@floridalawfirm.com',
    firmName: 'Florida Law Firm',
    role: 'admin',
    createdAt: '2024-01-10T09:00:00Z'
  }
];

export const getCurrentUser = (): User | null => {
  const storedUser = localStorage.getItem('currentUser');
  return storedUser ? JSON.parse(storedUser) : null;
};

export const setCurrentUser = (user: User): void => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const clearCurrentUser = (): void => {
  localStorage.removeItem('currentUser');
};