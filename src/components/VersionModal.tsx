'use client';

import { ResumeVersion } from '@/types/resume';
import Resume from './Resume';

interface VersionModalProps {
  version: ResumeVersion;
  onClose: () => void;
}

export default function VersionModal({ version, onClose }: VersionModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-auto relative">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white pb-4 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{version.jobTitle}</h2>
            <p className="text-sm text-gray-600">Generated: {version.generatedDate}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mt-4">
          <Resume data={version.resumeData} />
        </div>
      </div>
    </div>
  );
}
