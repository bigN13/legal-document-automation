'use client';

import { useEffect, useRef } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { mockDocuments, mockClients, mockGaps } from '@/lib/mock-data';
import { FileDown } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function ReportsPage() {
  // Document Status Distribution
  const statusCounts = {
    uploaded: mockDocuments.filter(d => d.status === 'uploaded').length,
    processing: mockDocuments.filter(d => d.status === 'processing').length,
    reviewed: mockDocuments.filter(d => d.status === 'reviewed').length,
    flagged: mockDocuments.filter(d => d.status === 'flagged').length,
  };

  const statusChartData = {
    labels: ['Uploaded', 'Processing', 'Reviewed', 'Flagged'],
    datasets: [
      {
        data: [statusCounts.uploaded, statusCounts.processing, statusCounts.reviewed, statusCounts.flagged],
        backgroundColor: [
          'rgba(156, 163, 175, 0.8)', // gray
          'rgba(251, 191, 36, 0.8)',  // yellow
          'rgba(34, 197, 94, 0.8)',   // green
          'rgba(239, 68, 68, 0.8)',   // red
        ],
        borderColor: [
          'rgba(156, 163, 175, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Documents by Type
  const typeCounts = {
    bank_statement: mockDocuments.filter(d => d.type === 'bank_statement').length,
    credit_card_statement: mockDocuments.filter(d => d.type === 'credit_card_statement').length,
    tax_return: mockDocuments.filter(d => d.type === 'tax_return').length,
    pay_stub: mockDocuments.filter(d => d.type === 'pay_stub').length,
    other: mockDocuments.filter(d => d.type === 'other').length,
  };

  const typeChartData = {
    labels: ['Bank Statements', 'Credit Cards', 'Tax Returns', 'Pay Stubs', 'Other'],
    datasets: [
      {
        label: 'Documents',
        data: [typeCounts.bank_statement, typeCounts.credit_card_statement, typeCounts.tax_return, typeCounts.pay_stub, typeCounts.other],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Monthly Upload Trend (last 6 months)
  const monthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const data = [8, 12, 15, 10, 18, 15]; // Mock data for demonstration
    
    return {
      labels: months,
      datasets: [
        {
          label: 'Documents Uploaded',
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
  };

  // Gap Analysis Summary
  const gapsByClient = mockClients.map(client => ({
    name: client.name,
    gaps: mockGaps.filter(gap => gap.clientId === client.id).length,
  })).filter(item => item.gaps > 0);

  const gapChartData = {
    labels: gapsByClient.map(item => item.name),
    datasets: [
      {
        label: 'Missing Documents',
        data: gapsByClient.map(item => item.gaps),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <DashboardLayout>
      <div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Visual insights into document management and compliance
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <FileDown className="h-5 w-5 mr-2" />
              Export All Reports
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Documents</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{mockDocuments.length}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Active Clients</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {mockClients.filter(c => c.status === 'active').length}
              </dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Gaps</dt>
              <dd className="mt-1 text-3xl font-semibold text-red-600">{mockGaps.length}</dd>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Completion Rate</dt>
              <dd className="mt-1 text-3xl font-semibold text-green-600">
                {Math.round((mockDocuments.filter(d => d.status === 'reviewed').length / mockDocuments.length) * 100)}%
              </dd>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Document Status Distribution */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Document Status Distribution</h3>
            <div className="h-64">
              <Pie data={statusChartData} options={chartOptions} />
            </div>
          </div>

          {/* Documents by Type */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Documents by Type</h3>
            <div className="h-64">
              <Bar data={typeChartData} options={chartOptions} />
            </div>
          </div>

          {/* Monthly Upload Trend */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Upload Trend</h3>
            <div className="h-64">
              <Line data={monthlyData()} options={chartOptions} />
            </div>
          </div>

          {/* Gap Analysis by Client */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Gap Analysis by Client</h3>
            <div className="h-64">
              <Bar data={gapChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Detailed Reports Table */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Available Reports</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">Financial Disclosure Summary</p>
                  <p className="text-sm text-gray-500">Complete overview of all client documents</p>
                </div>
                <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                  Generate
                </button>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">Gap Analysis Report</p>
                  <p className="text-sm text-gray-500">Detailed report of missing documents by client</p>
                </div>
                <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                  Generate
                </button>
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">Compliance Status Report</p>
                  <p className="text-sm text-gray-500">Document completion and compliance metrics</p>
                </div>
                <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}