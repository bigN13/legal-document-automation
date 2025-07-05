'use client';

import { useState } from 'react';
import { Sparkles, Send, Copy, RefreshCw } from 'lucide-react';
import { mockClients, mockDocuments, mockGaps } from '@/lib/mock-data';

interface AiPrompt {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: 'analysis' | 'gap-detection' | 'compliance' | 'summary';
}

const aiPrompts: AiPrompt[] = [
  {
    id: 'gap-analysis',
    title: 'Identify Missing Documents',
    description: 'Analyze which financial statements are missing for the selected client',
    prompt: 'Please analyze the uploaded documents and identify any missing bank or credit card statements for the past 6 months. List specific months and institutions.',
    category: 'gap-detection'
  },
  {
    id: 'statement-review',
    title: 'Review Bank Statements',
    description: 'Comprehensive analysis of uploaded bank statements',
    prompt: 'Review all bank statements for completeness, check for continuous date coverage, and identify any irregularities or missing pages.',
    category: 'analysis'
  },
  {
    id: 'compliance-check',
    title: 'Financial Disclosure Compliance',
    description: 'Verify compliance with mandatory financial disclosure requirements',
    prompt: 'Check if all required financial documents have been submitted according to Florida family law requirements. List any missing document types.',
    category: 'compliance'
  },
  {
    id: 'summary-report',
    title: 'Generate Document Summary',
    description: 'Create a comprehensive summary of all submitted documents',
    prompt: 'Generate a summary report of all financial documents submitted, including date ranges covered, institutions involved, and completeness status.',
    category: 'summary'
  },
  {
    id: 'account-verification',
    title: 'Verify All Accounts',
    description: 'Cross-reference all financial accounts mentioned in documents',
    prompt: 'List all bank and credit card accounts found in the submitted documents and verify that statements have been provided for each account.',
    category: 'analysis'
  },
  {
    id: 'timeline-gaps',
    title: 'Timeline Gap Analysis',
    description: 'Identify gaps in document timeline coverage',
    prompt: 'Create a timeline showing which months have complete documentation and which months are missing statements for each financial account.',
    category: 'gap-detection'
  }
];

export function AiAssistant() {
  const [selectedClient, setSelectedClient] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [selectedPromptId, setSelectedPromptId] = useState('');

  const activeClients = mockClients.filter(c => c.status === 'active');

  const handlePromptSelect = (prompt: AiPrompt) => {
    setCustomPrompt(prompt.prompt);
    setSelectedPromptId(prompt.id);
  };

  const handleAnalyze = async () => {
    if (!selectedClient || !customPrompt) return;

    setIsProcessing(true);
    setAiResponse('');

    // Simulate AI processing
    setTimeout(() => {
      // Generate mock AI response based on selected prompt
      const clientDocs = mockDocuments.filter(d => d.clientId === selectedClient);
      const clientGaps = mockGaps.filter(g => g.clientId === selectedClient);
      const client = mockClients.find(c => c.id === selectedClient);

      let response = '';

      if (selectedPromptId === 'gap-analysis' || customPrompt.includes('missing')) {
        response = `Based on my analysis of ${client?.name}'s documents:\n\n`;
        response += `**Missing Documents Identified:**\n\n`;
        
        if (clientGaps.length > 0) {
          const gapsByInstitution = clientGaps.reduce((acc, gap) => {
            if (!acc[gap.institution]) acc[gap.institution] = [];
            acc[gap.institution].push(gap);
            return acc;
          }, {} as Record<string, typeof clientGaps>);

          Object.entries(gapsByInstitution).forEach(([institution, gaps]) => {
            response += `**${institution}:**\n`;
            gaps.forEach(gap => {
              const monthYear = new Date(gap.missingPeriod.year, gap.missingPeriod.month - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
              response += `- ${gap.type.replace(/_/g, ' ')} for ${monthYear}\n`;
            });
            response += '\n';
          });
        } else {
          response += 'No gaps detected. All required statements appear to be present.\n';
        }

        response += `\n**Recommendation:** Request the missing statements from the client immediately to ensure compliance with financial disclosure requirements.`;
      } else if (selectedPromptId === 'statement-review' || customPrompt.includes('bank statements')) {
        response = `**Bank Statement Analysis for ${client?.name}:**\n\n`;
        response += `Total Documents Reviewed: ${clientDocs.filter(d => d.type === 'bank_statement').length}\n\n`;
        response += `**Findings:**\n`;
        response += `- All uploaded statements appear to be complete with all pages included\n`;
        response += `- Date coverage is mostly continuous with some gaps identified\n`;
        response += `- No irregularities detected in statement formatting\n`;
        response += `- All statements are legible and properly scanned\n\n`;
        response += `**Action Items:**\n`;
        response += `- Obtain missing statements for complete coverage\n`;
        response += `- Verify account numbers match across all statements`;
      } else if (selectedPromptId === 'compliance-check' || customPrompt.includes('compliance')) {
        response = `**Financial Disclosure Compliance Report:**\n\n`;
        response += `Client: ${client?.name}\n`;
        response += `Case Number: ${client?.caseNumber}\n\n`;
        response += `**Required Documents Status:**\n`;
        response += `✓ Bank Statements: ${clientDocs.filter(d => d.type === 'bank_statement').length} uploaded\n`;
        response += `✓ Credit Card Statements: ${clientDocs.filter(d => d.type === 'credit_card_statement').length} uploaded\n`;
        response += `✓ Tax Returns: ${clientDocs.filter(d => d.type === 'tax_return').length} uploaded\n`;
        response += `✓ Pay Stubs: ${clientDocs.filter(d => d.type === 'pay_stub').length} uploaded\n\n`;
        response += `**Compliance Status:** ${clientGaps.length > 0 ? '⚠️ Partial Compliance - Missing Documents Identified' : '✅ Fully Compliant'}\n\n`;
        response += `**Next Steps:** ${clientGaps.length > 0 ? 'Obtain missing documents to achieve full compliance' : 'All mandatory disclosures have been submitted'}`;
      } else {
        // Generic response
        response = `**Document Analysis Summary:**\n\n`;
        response += `I've analyzed ${clientDocs.length} documents for ${client?.name}.\n\n`;
        response += `**Key Findings:**\n`;
        response += `- ${clientDocs.filter(d => d.status === 'reviewed').length} documents have been reviewed\n`;
        response += `- ${clientGaps.length} gaps identified in documentation\n`;
        response += `- Most recent upload: ${clientDocs.length > 0 ? new Date(clientDocs[0].uploadDate).toLocaleDateString() : 'N/A'}\n\n`;
        response += `Please select a specific analysis type for more detailed insights.`;
      }

      setAiResponse(response);
      setIsProcessing(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiResponse);
  };

  const resetAnalysis = () => {
    setAiResponse('');
    setCustomPrompt('');
    setSelectedPromptId('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Client Selection */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Client for Analysis</h3>
        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
        >
          <option value="">Choose a client...</option>
          {activeClients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name} - {client.caseNumber}
            </option>
          ))}
        </select>
      </div>

      {/* AI Prompts */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">AI Analysis Prompts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiPrompts.map((prompt) => (
            <button
              key={prompt.id}
              onClick={() => handlePromptSelect(prompt)}
              className={`text-left p-4 rounded-lg border-2 transition-all ${
                selectedPromptId === prompt.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start">
                <Sparkles className="h-5 w-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">{prompt.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{prompt.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Prompt */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Analysis Request</h3>
        <div className="space-y-4">
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            placeholder="Enter your custom analysis request or modify the selected prompt..."
          />
          <div className="flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={!selectedClient || !customPrompt || isProcessing}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Analyze Documents
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* AI Response */}
      {aiResponse && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">AI Analysis Results</h3>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </button>
              <button
                onClick={resetAnalysis}
                className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                New Analysis
              </button>
            </div>
          </div>
          <div className="prose max-w-none">
            <div className="bg-gray-50 rounded-lg p-4 whitespace-pre-wrap text-sm text-gray-700">
              {aiResponse}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}