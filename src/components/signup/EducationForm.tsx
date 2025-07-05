'use client';

import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Education } from '@/types/auth';

interface EducationFormProps {
  education: Education[];
  errors?: {
    education?: string;
  };
  onEducationChange: (index: number, field: keyof Education, value: string) => void;
  onAddEducation: () => void;
  onRemoveEducation: (index: number) => void;
}

export default function EducationForm({
  education,
  errors,
  onEducationChange,
  onAddEducation,
  onRemoveEducation
}: EducationFormProps) {
  const educationTypes = [
    'High School',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'PhD/Doctorate',
    'Diploma',
    'Certificate',
    'Other'
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Education
        </label>
        <button
          type="button"
          onClick={onAddEducation}
          className="flex items-center text-sm text-blue-600 hover:text-blue-500"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Education
        </button>
      </div>
      
      {education.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-900">Education #{index + 1}</h4>
            {education.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveEducation(index)}
                className="text-red-600 hover:text-red-700"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education Type
              </label>
              <select
                value={edu.type}
                onChange={(e) => onEducationChange(index, 'type', e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select education type</option>
                {educationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree/Program
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => onEducationChange(index, 'degree', e.target.value)}
                placeholder="e.g., Computer Science, MBA"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution
              </label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => onEducationChange(index, 'institution', e.target.value)}
                placeholder="University/College name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="text"
                value={edu.year}
                onChange={(e) => onEducationChange(index, 'year', e.target.value)}
                placeholder="e.g., 2020-2024 or 2024"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA (Optional)
              </label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => onEducationChange(index, 'gpa', e.target.value)}
                placeholder="e.g., 3.8/4.0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              value={edu.description}
              onChange={(e) => onEducationChange(index, 'description', e.target.value)}
              placeholder="Relevant coursework, achievements, or additional details..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      ))}
      
      {errors?.education && (
        <p className="mt-1 text-sm text-red-600">{errors.education}</p>
      )}
    </div>
  );
} 