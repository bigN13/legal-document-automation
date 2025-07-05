'use client';

import { useCallback, useState } from 'react';
import { CloudUpload, FileText, X } from 'lucide-react';
import { formatFileSize } from '@/lib/utils';

interface FileUpload {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'complete' | 'error';
}

interface UploadDropzoneProps {
  onFilesSelected?: (files: File[]) => void;
}

export function UploadDropzone({ onFilesSelected }: UploadDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileUpload[]>([]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const simulateUpload = (fileUpload: FileUpload) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev =>
          prev.map(f =>
            f.id === fileUpload.id
              ? { ...f, progress: 100, status: 'complete' }
              : f
          )
        );
      } else {
        setFiles(prev =>
          prev.map(f =>
            f.id === fileUpload.id
              ? { ...f, progress, status: 'uploading' }
              : f
          )
        );
      }
    }, 500);
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: FileUpload[] = Array.from(fileList).map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      progress: 0,
      status: 'pending' as const,
    }));

    setFiles(prev => [...prev, ...newFiles]);
    if (onFilesSelected) {
      onFilesSelected(Array.from(fileList));
    }

    // Simulate upload for each file
    newFiles.forEach(fileUpload => {
      setTimeout(() => simulateUpload(fileUpload), 100);
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="w-full">
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          className="sr-only"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileInput}
        />
        
        <CloudUpload className="mx-auto h-12 w-12 text-gray-400" />
        
        <p className="mt-2 text-sm text-gray-600">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500"
          >
            <span>Upload files</span>
          </label>{' '}
          or drag and drop
        </p>
        <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG up to 10MB</p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-6 space-y-2">
          <h4 className="text-sm font-medium text-gray-900">Uploaded files</h4>
          <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
            {files.map((fileUpload) => (
              <li key={fileUpload.id} className="flex items-center justify-between py-3 px-4">
                <div className="flex items-center min-w-0 flex-1">
                  <FileText className="h-8 w-8 flex-shrink-0 text-gray-400" />
                  <div className="ml-3 min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {fileUpload.file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(fileUpload.file.size)}
                    </p>
                    {fileUpload.status === 'uploading' && (
                      <div className="mt-1">
                        <div className="bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${fileUpload.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="ml-4 flex items-center space-x-2">
                  {fileUpload.status === 'complete' && (
                    <span className="text-sm text-green-600">Complete</span>
                  )}
                  {fileUpload.status === 'error' && (
                    <span className="text-sm text-red-600">Error</span>
                  )}
                  <button
                    onClick={() => removeFile(fileUpload.id)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}