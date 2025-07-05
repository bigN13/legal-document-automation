'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { GapTimeline } from '@/components/gaps/gap-timeline';
import { GapCalendar } from '@/components/gaps/gap-calendar';
import { mockDocuments, mockGaps, mockClients, getGapsByClientId } from '@/lib/mock-data';
import { AlertTriangle, FileDown } from 'lucide-react';

export default function GapsPage() {
  const [selectedClient, setSelectedClient] = useState<string>('');
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar'>('timeline');

  const activeClients = mockClients.filter(c => c.status === 'active');
  
  const clientGaps = selectedClient ? getGapsByClientId(selectedClient) : [];
  const clientDocuments = selectedClient ? mockDocuments.filter(d => d.clientId === selectedClient) : [];
  
  // Get unique institution/account combinations
  const accounts = selectedClient ? Array.from(new Set(
    [...clientDocuments, ...clientGaps].map(item => 
      `${item.institution}|${item.accountNumber}`
    )
  )).map(combo => {
    const [institution, accountNumber] = combo.split('|');
    return { institution, accountNumber };
  }) : [];

  const totalGaps = clientGaps.length;

  return (
    <DashboardLayout>
      <div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gap Analysis</h1>
            <p className="mt-1 text-sm text-gray-500">
              Identify missing financial statements and documentation gaps
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <FileDown className="h-5 w-5 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Client Selection */}
        <div className="mt-6">
          <label htmlFor="client" className="block text-sm font-medium text-gray-700">
            Select Client
          </label>
          <select
            id="client"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Choose a client...</option>
            {activeClients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} - {client.caseNumber}
              </option>
            ))}
          </select>
        </div>

        {selectedClient && (
          <>
            {/* Summary Card */}
            <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <AlertTriangle className={`h-10 w-10 ${totalGaps > 0 ? 'text-red-500' : 'text-green-500'}`} />
                  </div>
                  <div className="ml-5">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Missing Documents
                      </dt>
                      <dd className={`mt-1 text-3xl font-semibold ${totalGaps > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {totalGaps}
                      </dd>
                    </dl>
                  </div>
                </div>
                {totalGaps > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Missing statements detected for {accounts.length} account(s). 
                      Review the timeline below to identify specific gaps.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* View Toggle */}
            <div className="mt-6 flex justify-center">
              <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    viewMode === 'timeline'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Timeline View
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    viewMode === 'calendar'
                      ? 'bg-white text-gray-900 shadow'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Calendar View
                </button>
              </div>
            </div>

            {/* Gap Visualization */}
            <div className="mt-6">
              {viewMode === 'timeline' ? (
                <div className="space-y-6">
                  {accounts.map(({ institution, accountNumber }) => (
                    <GapTimeline
                      key={`${institution}-${accountNumber}`}
                      documents={clientDocuments}
                      gaps={clientGaps}
                      accountNumber={accountNumber}
                      institution={institution}
                    />
                  ))}
                </div>
              ) : (
                <GapCalendar
                  documents={clientDocuments}
                  gaps={clientGaps}
                  clientId={selectedClient}
                />
              )}
            </div>

            {/* Gap Details */}
            {totalGaps > 0 && (
              <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Missing Documents Detail
                  </h3>
                </div>
                <ul className="divide-y divide-gray-200">
                  {clientGaps.map((gap) => (
                    <li key={gap.documentId} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {gap.institution} - {gap.accountNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            {gap.type.replace(/_/g, ' ')} for {new Date(gap.missingPeriod.year, gap.missingPeriod.month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </p>
                        </div>
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Missing
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}