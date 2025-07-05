'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { 
  FileText, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  CloudUpload,
  Sparkles
} from 'lucide-react';
import { 
  mockDocuments, 
  mockClients, 
  mockGaps, 
  getRecentActivities,
  getRecentDocuments
} from '@/lib/mock-data';
import { formatDateTime, formatFileSize } from '@/lib/utils';

const stats = [
  {
    name: 'Total Clients',
    value: mockClients.filter(c => c.status === 'active').length,
    change: '+12%',
    changeType: 'increase',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    name: 'Documents Uploaded',
    value: mockDocuments.length,
    change: '+23%',
    changeType: 'increase',
    icon: FileText,
    color: 'bg-green-500',
  },
  {
    name: 'Gap Alerts',
    value: mockGaps.length,
    change: '-5%',
    changeType: 'decrease',
    icon: AlertTriangle,
    color: 'bg-yellow-500',
  },
  {
    name: 'Reviewed',
    value: mockDocuments.filter(d => d.status === 'reviewed').length,
    change: '+18%',
    changeType: 'increase',
    icon: CheckCircle,
    color: 'bg-primary-600',
  },
];

export default function DashboardPage() {
  const recentActivities = getRecentActivities(5);
  const recentDocuments = getRecentDocuments(5);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's an overview of your document management system.
        </p>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className={`absolute rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {stat.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.changeType === 'increase' ? (
                    <ArrowUp className="h-4 w-4 flex-shrink-0 self-center text-green-500" />
                  ) : (
                    <ArrowDown className="h-4 w-4 flex-shrink-0 self-center text-red-500" />
                  )}
                  <span className="sr-only">
                    {stat.changeType === 'increase' ? 'Increased' : 'Decreased'} by
                  </span>
                  {stat.change}
                </p>
              </dd>
            </div>
          ))}
        </div>

        {/* AI Insights Card */}
        <div className="mt-8 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Sparkles className="h-8 w-8 text-primary-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-gray-900">AI Document Analysis Available</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {mockGaps.length > 0 
                      ? `${mockGaps.length} potential gaps detected across all clients. Use AI to analyze and get detailed insights.`
                      : 'All documents appear complete. Use AI to verify compliance and generate reports.'
                    }
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary-600 animate-pulse" />
                <span className="text-sm font-medium text-primary-700">
                  Click the AI button in the corner
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent Activities */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
              <div className="mt-5">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {recentActivities.map((activity, idx) => (
                      <li key={activity.id}>
                        <div className="relative pb-8">
                          {idx !== recentActivities.length - 1 ? (
                            <span
                              className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                              aria-hidden="true"
                            />
                          ) : null}
                          <div className="relative flex items-start space-x-3">
                            <div className="relative">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full ring-8 ring-white ${
                                  activity.type === 'upload'
                                    ? 'bg-blue-500'
                                    : activity.type === 'review'
                                    ? 'bg-green-500'
                                    : activity.type === 'gap_detected'
                                    ? 'bg-yellow-500'
                                    : 'bg-primary-600'
                                }`}
                              >
                                {activity.type === 'upload' ? (
                                  <CloudUpload className="h-5 w-5 text-white" />
                                ) : activity.type === 'review' ? (
                                  <CheckCircle className="h-5 w-5 text-white" />
                                ) : activity.type === 'gap_detected' ? (
                                  <AlertTriangle className="h-5 w-5 text-white" />
                                ) : (
                                  <FileText className="h-5 w-5 text-white" />
                                )}
                              </div>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                              <div>
                                <p className="text-sm text-gray-500">{activity.action}</p>
                                <p className="mt-0.5 text-sm text-gray-900">{activity.details}</p>
                              </div>
                              <div className="whitespace-nowrap text-right text-sm text-gray-500">
                                <time dateTime={activity.timestamp}>
                                  {formatDateTime(activity.timestamp)}
                                </time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Documents */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Documents</h3>
              <div className="mt-5">
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">
                    {recentDocuments.map((document) => (
                      <li key={document.id} className="py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <FileText className="h-8 w-8 text-gray-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {document.name}
                            </p>
                            <p className="truncate text-sm text-gray-500">
                              {document.institution} • {formatFileSize(document.fileSize)}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                document.status === 'reviewed'
                                  ? 'bg-green-100 text-green-800'
                                  : document.status === 'processing'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : document.status === 'flagged'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                            >
                              {document.status}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}