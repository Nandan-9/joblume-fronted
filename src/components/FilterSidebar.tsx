'use client';

import { useState } from 'react';
import { Job, JobFilter } from '@/types/job';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface FilterSidebarProps {
  filters: JobFilter;
  onFilterChange: (filters: JobFilter) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    experience: true,
    salary: true,
    location: true,
    remote: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const jobTypes: Job['type'][] = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const experienceLevels: Job['experience'][] = ['Entry', 'Mid', 'Senior', 'Lead'];
  const salaryRanges = [
    { label: 'Under $50K', min: 0, max: 50000 },
    { label: '$50K - $75K', min: 50000, max: 75000 },
    { label: '$75K - $100K', min: 75000, max: 100000 },
    { label: '$100K - $150K', min: 100000, max: 150000 },
    { label: 'Over $150K', min: 150000, max: 999999 }
  ];

  const handleFilterChange = (key: keyof JobFilter, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Filters</h2>
      
      {/* Job Type Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('jobType')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Job Type
          {expandedSections.jobType ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.jobType && (
          <div className="space-y-2">
            {jobTypes.map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.jobType === type}
                  onChange={(e) => handleFilterChange('jobType', e.target.checked ? type : undefined)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Experience Level Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('experience')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Experience Level
          {expandedSections.experience ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.experience && (
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <label key={level} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.experience === level}
                  onChange={(e) => handleFilterChange('experience', e.target.checked ? level : undefined)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{level}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Salary Range Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('salary')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Salary Range
          {expandedSections.salary ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.salary && (
          <div className="space-y-2">
            {salaryRanges.map((range) => (
              <label key={range.label} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.salary?.min === range.min && filters.salary?.max === range.max}
                  onChange={(e) => handleFilterChange('salary', e.target.checked ? range : undefined)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('location')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Location
          {expandedSections.location ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.location && (
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter city or state..."
              value={filters.location || ''}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
      </div>

      {/* Remote Work Filter */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('remote')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Remote Work
          {expandedSections.remote ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
        
        {expandedSections.remote && (
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.isRemote === true}
                onChange={(e) => handleFilterChange('isRemote', e.target.checked ? true : undefined)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Remote Only</span>
            </label>
          </div>
        )}
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => onFilterChange({})}
        className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium"
      >
        Clear All Filters
      </button>
    </div>
  );
} 