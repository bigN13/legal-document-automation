'use client';

import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { AiAssistant } from '@/components/ai/ai-assistant';
import { Sparkles } from 'lucide-react';

export default function AiAssistancePage() {
  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-primary-100 rounded-lg">
            <Sparkles className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Document Analysis</h1>
            <p className="mt-1 text-sm text-gray-500">
              Use AI to analyze financial documents and identify missing statements
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4">
            <h3 className="font-medium text-primary-900">Gap Detection</h3>
            <p className="text-sm text-primary-700 mt-1">
              Automatically identify missing bank and credit card statements
            </p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
            <h3 className="font-medium text-green-900">Compliance Check</h3>
            <p className="text-sm text-green-700 mt-1">
              Verify all mandatory financial disclosures are complete
            </p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
            <h3 className="font-medium text-blue-900">Smart Analysis</h3>
            <p className="text-sm text-blue-700 mt-1">
              Get intelligent insights about document completeness
            </p>
          </div>
        </div>

        {/* AI Assistant Component */}
        <AiAssistant />

        {/* Help Section */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">How to use AI Analysis</h3>
          <ol className="text-sm text-gray-600 space-y-2">
            <li>1. Select the client whose documents you want to analyze</li>
            <li>2. Choose from pre-defined analysis prompts or write your own</li>
            <li>3. Click "Analyze Documents" to get AI-powered insights</li>
            <li>4. Review the analysis results and take appropriate action</li>
          </ol>
          <div className="mt-4 p-3 bg-yellow-50 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This is a demo version. In production, this would connect to Azure OpenAI for real document analysis.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}