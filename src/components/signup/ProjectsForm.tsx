'use client';

import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Project } from '@/types/auth';

interface ProjectsFormProps {
  projects: Project[];
  errors?: {
    projects?: string;
  };
  onProjectChange: (index: number, field: keyof Project, value: string) => void;
  onAddProject: () => void;
  onRemoveProject: (index: number) => void;
}

export default function ProjectsForm({
  projects,
  errors,
  onProjectChange,
  onAddProject,
  onRemoveProject
}: ProjectsFormProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Projects
        </label>
        <button
          type="button"
          onClick={onAddProject}
          className="flex items-center text-sm text-blue-600 hover:text-blue-500"
        >
          <PlusIcon className="w-4 h-4 mr-1" />
          Add Project
        </button>
      </div>
      
      {projects.map((project, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-900">Project #{index + 1}</h4>
            {projects.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveProject(index)}
                className="text-red-600 hover:text-red-700"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            )}
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Title
              </label>
              <input
                type="text"
                value={project.title}
                onChange={(e) => onProjectChange(index, 'title', e.target.value)}
                placeholder="e.g., E-commerce Website, Mobile App"
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
                  value={project.startDate}
                  onChange={(e) => onProjectChange(index, 'startDate', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="month"
                  value={project.endDate}
                  onChange={(e) => onProjectChange(index, 'endDate', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technologies Used (Optional)
              </label>
              <input
                type="text"
                value={project.technologies}
                onChange={(e) => onProjectChange(index, 'technologies', e.target.value)}
                placeholder="e.g., React, Node.js, MongoDB, AWS"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project URL (Optional)
              </label>
              <input
                type="url"
                value={project.url}
                onChange={(e) => onProjectChange(index, 'url', e.target.value)}
                placeholder="https://your-project.com"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Description
              </label>
              <textarea
                rows={4}
                value={project.description}
                onChange={(e) => onProjectChange(index, 'description', e.target.value)}
                placeholder="Describe the project, your role, key features, challenges overcome, and outcomes..."
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      ))}
      
      {errors?.projects && (
        <p className="mt-1 text-sm text-red-600">{errors.projects}</p>
      )}
    </div>
  );
} 