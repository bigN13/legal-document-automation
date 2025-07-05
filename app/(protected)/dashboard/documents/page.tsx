'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { DocumentList } from '@/components/documents/document-list';
import { mockDocuments, mockClients } from '@/lib/mock-data';
import { Document } from '@/lib/types';
import { CloudUpload, Filter } from 'lucide-react';
import Link from 'next/link';

export default function DocumentsPage() {
  const [selectedClient, setSelectedClient] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const filteredDocuments = selectedClient === 'all' 
    ? mockDocuments 
    : mockDocuments.filter(doc => doc.clientId === selectedClient);

  const handleDocumentClick = (document: Document) => {
    setSelectedDocument(document);
  };

  return (
    <DashboardLayout>
      <div>
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and review all uploaded financial documents
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              href="/dashboard/upload"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <CloudUpload className="h-5 w-5 mr-2" />
              Upload New
            </Link>
          </div>
        </div>

        {/* Client Filter */}
        <div className="mt-6 mb-4">
          <label htmlFor="client-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Client
          </label>
          <select
            id="client-filter"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="block w-full sm:w-64 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
          >
            <option value="all">All Clients</option>
            {mockClients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name} - {client.caseNumber}
              </option>
            ))}
          </select>
        </div>

        {/* Document List */}
        <DocumentList 
          documents={filteredDocuments} 
          onDocumentClick={handleDocumentClick}
        />

        {/* Document Preview Modal (simplified version) */}
        {selectedDocument && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedDocument(null)} />
              
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Document Details
                    </h3>
                    <div className="mt-4 text-left">
                      <dl className="space-y-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Name</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedDocument.name}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Type</dt>
                          <dd className="mt-1 text-sm text-gray-900 capitalize">
                            {selectedDocument.type.replace(/_/g, ' ')}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Institution</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedDocument.institution}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Account Number</dt>
                          <dd className="mt-1 text-sm text-gray-900">{selectedDocument.accountNumber}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Status</dt>
                          <dd className="mt-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              selectedDocument.status === 'reviewed' ? 'bg-green-100 text-green-800' :
                              selectedDocument.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              selectedDocument.status === 'flagged' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {selectedDocument.status}
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:col-start-2 sm:text-sm"
                    onClick={() => setSelectedDocument(null)}
                  >
                    Download
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setSelectedDocument(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}