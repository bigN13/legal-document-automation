'use client';

import { Document, DocumentGap } from '@/lib/types';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';

interface GapCalendarProps {
  documents: Document[];
  gaps: DocumentGap[];
  clientId: string;
}

export function GapCalendar({ documents, gaps, clientId }: GapCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  const clientDocs = documents.filter(doc => doc.clientId === clientId);
  const clientGaps = gaps.filter(gap => gap.clientId === clientId);

  const hasDocumentForMonth = (checkMonth: number, checkYear: number, institution: string, accountNumber: string) => {
    return clientDocs.some(doc => {
      if (doc.institution !== institution || doc.accountNumber !== accountNumber) return false;
      
      const startDate = new Date(doc.startDate);
      const endDate = new Date(doc.endDate);
      
      // Check if the document covers this month
      return (
        (startDate.getFullYear() === checkYear && startDate.getMonth() === checkMonth) ||
        (endDate.getFullYear() === checkYear && endDate.getMonth() === checkMonth) ||
        (startDate < new Date(checkYear, checkMonth, 1) && endDate > new Date(checkYear, checkMonth + 1, 0))
      );
    });
  };

  const hasGapForMonth = (checkMonth: number, checkYear: number) => {
    return clientGaps.some(
      gap => gap.missingPeriod.month === checkMonth + 1 && gap.missingPeriod.year === checkYear
    );
  };

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get unique institution/account combinations
  const accounts = Array.from(new Set(
    [...clientDocs, ...clientGaps].map(item => 
      `${item.institution}|${item.accountNumber}`
    )
  )).map(combo => {
    const [institution, accountNumber] = combo.split('|');
    return { institution, accountNumber };
  });

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Account Legend */}
        <div className="mb-4 space-y-2">
          {accounts.map(({ institution, accountNumber }) => {
            const hasDoc = hasDocumentForMonth(month, year, institution, accountNumber);
            const hasGap = clientGaps.some(
              gap => gap.institution === institution && 
                     gap.accountNumber === accountNumber &&
                     gap.missingPeriod.month === month + 1 && 
                     gap.missingPeriod.year === year
            );
            
            return (
              <div key={`${institution}-${accountNumber}`} className="flex items-center justify-between text-sm">
                <div>
                  <span className="font-medium">{institution}</span>
                  <span className="text-gray-500 ml-2">{accountNumber}</span>
                </div>
                <div>
                  {hasDoc ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Complete
                    </span>
                  ) : hasGap ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Missing
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      No data
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Calendar Grid */}
        <div className="mt-6">
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-500">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="mt-2 grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const isToday = day && 
                new Date().getDate() === day && 
                new Date().getMonth() === month && 
                new Date().getFullYear() === year;
              
              return (
                <div
                  key={index}
                  className={`
                    aspect-square flex items-center justify-center text-sm
                    ${day ? 'hover:bg-gray-100 cursor-pointer' : ''}
                    ${isToday ? 'bg-primary-100 text-primary-900 font-semibold rounded-full' : ''}
                  `}
                >
                  {day || ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <p>
              This month has {hasGapForMonth(month, year) ? (
                <span className="font-medium text-red-600">
                  {clientGaps.filter(gap => gap.missingPeriod.month === month + 1 && gap.missingPeriod.year === year).length} missing statement(s)
                </span>
              ) : (
                <span className="font-medium text-green-600">no missing statements</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}