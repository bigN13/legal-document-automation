import { Activity } from '../types';

export const mockActivities: Activity[] = [
  {
    id: 'act_001',
    userId: 'usr_001',
    action: 'Document Upload',
    details: 'Uploaded CitiBank_Statement_Apr_2024.pdf for Lisa Anderson',
    timestamp: '2024-05-06T11:15:00Z',
    type: 'upload'
  },
  {
    id: 'act_002',
    userId: 'usr_002',
    action: 'Document Review',
    details: 'Reviewed and approved Chase_Bank_Statement_Feb_2024.pdf for Sarah Johnson',
    timestamp: '2024-05-06T10:30:00Z',
    type: 'review'
  },
  {
    id: 'act_003',
    userId: 'usr_001',
    action: 'Gap Detected',
    details: 'Missing Wells Fargo statements for Feb-Mar 2024 (Michael Davis)',
    timestamp: '2024-05-06T09:45:00Z',
    type: 'gap_detected'
  },
  {
    id: 'act_004',
    userId: 'usr_003',
    action: 'Document Upload',
    details: 'Uploaded Bank_of_America_Statement_Apr_2024.pdf for Jennifer Martinez',
    timestamp: '2024-05-03T14:45:00Z',
    type: 'upload'
  },
  {
    id: 'act_005',
    userId: 'usr_002',
    action: 'Report Generated',
    details: 'Generated financial disclosure report for Sarah Johnson',
    timestamp: '2024-05-03T11:20:00Z',
    type: 'report_generated'
  },
  {
    id: 'act_006',
    userId: 'usr_001',
    action: 'Document Upload',
    details: 'Uploaded Wells_Fargo_Statement_Apr_2024.pdf for Michael Davis',
    timestamp: '2024-05-02T13:30:00Z',
    type: 'upload'
  },
  {
    id: 'act_007',
    userId: 'usr_002',
    action: 'Document Review',
    details: 'Flagged Amex_Statement_Jan_2024.pdf for Michael Davis - requires clarification',
    timestamp: '2024-05-02T10:15:00Z',
    type: 'review'
  },
  {
    id: 'act_008',
    userId: 'usr_001',
    action: 'Gap Detected',
    details: 'Missing Chase credit card statements for Mar-Apr 2024 (Sarah Johnson)',
    timestamp: '2024-05-01T16:00:00Z',
    type: 'gap_detected'
  },
  {
    id: 'act_009',
    userId: 'usr_003',
    action: 'Document Upload',
    details: 'Bulk uploaded 5 documents for Lisa Anderson',
    timestamp: '2024-04-30T14:20:00Z',
    type: 'upload'
  },
  {
    id: 'act_010',
    userId: 'usr_002',
    action: 'Report Generated',
    details: 'Generated gap analysis report for Michael Davis',
    timestamp: '2024-04-30T11:00:00Z',
    type: 'report_generated'
  }
];

export const getRecentActivities = (limit: number = 10): Activity[] => {
  return [...mockActivities]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
};

export const getActivitiesByUserId = (userId: string): Activity[] => {
  return mockActivities.filter(activity => activity.userId === userId);
};

export const getActivitiesByType = (type: Activity['type']): Activity[] => {
  return mockActivities.filter(activity => activity.type === type);
};