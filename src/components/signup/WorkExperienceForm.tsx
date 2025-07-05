'use client';

import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { WorkExperience } from '@/types/auth';

interface WorkExperienceFormProps {
  workExperience: WorkExperience[];
  errors?: {
    workExperience?: string;
  };
  onWorkExperienceChange: (index: number, field: keyof WorkExperience, value: string | boolean) => void;
  onAddWorkExperience: () => void;
  onRemoveWorkExperience: (index: number) => void;
}

export default function WorkExperienceForm({
  workExperience,
  errors,
  onWorkExperienceChange,
  onAddWorkExperience,
  onRemoveWorkExperience
}: WorkExperienceFormProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Work Experience
        </label>
        <button
          type="button"
          onClick={onAddWorkExperience}
          className="flex items-center text-sm text-blue-600 hover:text-blue-500"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Work Experience
        </button>
      </div>
      
      {workExperience.map((exp, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-900">Work Experience #{index + 1}</h4>
            {workExperience.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveWorkExperience(index)}
                className="text-red-600 hover:text-red-700"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => onWorkExperienceChange(index, 'title', e.target.value)}
                  placeholder="e.g., Software Engineer, Product Manager"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => onWorkExperienceChange(index, 'company', e.target.value)}
                  placeholder="e.g., Google, Microsoft"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => onWorkExperienceChange(index, 'location', e.target.value)}
                placeholder="e.g., San Francisco, CA or Remote"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => onWorkExperienceChange(index, 'startDate', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => onWorkExperienceChange(index, 'endDate', e.target.value)}
                  disabled={exp.current}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                    exp.current ? 'bg-gray-100 border-gray-300' : 'border-gray-300'
                  }`}
                />
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`current-${index}`}
                checked={exp.current}
                onChange={(e) => onWorkExperienceChange(index, 'current', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={`current-${index}`} className="ml-2 block text-sm text-gray-700">
                I currently work here
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Description
              </label>
              <textarea
                rows={4}
                value={exp.description}
                onChange={(e) => onWorkExperienceChange(index, 'description', e.target.value)}
                placeholder="Describe your role, responsibilities, and key contributions..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Achievements (Optional)
              </label>
              <textarea
                rows={3}
                value={exp.achievements}
                onChange={(e) => onWorkExperienceChange(index, 'achievements', e.target.value)}
                placeholder="List your key achievements, metrics, and impact..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
      
      {errors?.workExperience && (
        <p className="mt-1 text-sm text-red-600">{errors.workExperience}</p>
      )}
    </div>
  );
} 