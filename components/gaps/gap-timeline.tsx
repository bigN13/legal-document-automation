'use client';

import { Document, DocumentGap } from '@/lib/types';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface GapTimelineProps {
  documents: Document[];
  gaps: DocumentGap[];
  accountNumber: string;
  institution: string;
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function GapTimeline({ documents, gaps, accountNumber, institution }: GapTimelineProps) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  // Get documents for this account
  const accountDocs = documents.filter(
    doc => doc.accountNumber === accountNumber && doc.institution === institution
  );

  // Get gaps for this account
  const accountGaps = gaps.filter(
    gap => gap.accountNumber === accountNumber && gap.institution === institution
  );

  // Check if a specific month/year has a document
  const hasDocument = (month: number, year: number) => {
    return accountDocs.some(doc => {
      const startDate = new Date(doc.startDate);
      const endDate = new Date(doc.endDate);
      const checkDate = new Date(year, month, 15); // Middle of the month
      return checkDate >= startDate && checkDate <= endDate;
    });
  };

  // Check if a specific month/year is marked as a gap
  const hasGap = (month: number, year: number) => {
    return accountGaps.some(
      gap => gap.missingPeriod.month === month + 1 && gap.missingPeriod.year === year
    );
  };

  // Generate timeline data for the last 6 months
  const timelineData = [];
  for (let i = 5; i >= 0; i--) {
    let month = currentMonth - i;
    let year = currentYear;
    
    if (month < 0) {
      month += 12;
      year -= 1;
    }
    
    timelineData.push({
      month,
      year,
      monthName: months[month],
      hasDoc: hasDocument(month, year),
      isGap: hasGap(month, year),
    });
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">{institution}</h3>
        <p className="text-sm text-gray-500">Account: {accountNumber}</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-300"></div>

        {/* Timeline points */}
        <div className="relative flex justify-between">
          {timelineData.map((item, index) => (
            <div key={`${item.year}-${item.month}`} className="flex flex-col items-center">
              {/* Icon */}
              <div className="relative z-10">
                {item.hasDoc ? (
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                ) : item.isGap ? (
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  </div>
                )}
              </div>

              {/* Label */}
              <div className="mt-2 text-center">
                <p className="text-sm font-medium text-gray-900">{item.monthName}</p>
                <p className="text-xs text-gray-500">{item.year}</p>
              </div>

              {/* Status */}
              <div className="mt-1">
                {item.hasDoc ? (
                  <span className="text-xs text-green-600">Complete</span>
                ) : item.isGap ? (
                  <span className="text-xs text-red-600">Missing</span>
                ) : (
                  <span className="text-xs text-gray-400">-</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}