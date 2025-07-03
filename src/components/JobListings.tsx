'use client';

import { useState, useMemo } from 'react';
import { Job, JobFilter } from '@/types/job';
import { dummyJobs } from '@/data/jobs';
import JobCard from './JobCard';
import FilterSidebar from './FilterSidebar';
import { FunnelIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function JobListings() {
  const [filters, setFilters] = useState<JobFilter>({});
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'salary'>('relevance');

  // Filter jobs based on current filters
  const filteredJobs = useMemo(() => {
    return dummyJobs.filter(job => {
      // Job type filter
      if (filters.jobType && job.type !== filters.jobType) return false;
      
      // Experience level filter
      if (filters.experience && job.experience !== filters.experience) return false;
      
      // Salary range filter
      if (filters.salary) {
        const jobAvgSalary = (job.salary.min + job.salary.max) / 2;
        if (jobAvgSalary < filters.salary.min || jobAvgSalary > filters.salary.max) return false;
      }
      
      // Location filter
      if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      
      // Remote work filter
      if (filters.isRemote && !job.isRemote) return false;
      
      return true;
    });
  }, [filters]);

  // Sort jobs based on current sort option
  const sortedJobs = useMemo(() => {
    const jobs = [...filteredJobs];
    
    switch (sortBy) {
      case 'date':
        return jobs.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
      case 'salary':
        return jobs.sort((a, b) => {
          const avgSalaryA = (a.salary.min + a.salary.max) / 2;
          const avgSalaryB = (b.salary.min + b.salary.max) / 2;
          return avgSalaryB - avgSalaryA;
        });
      default:
        return jobs; // relevance - keep original order
    }
  }, [filteredJobs, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find Your Dream Job
        </h1>
        <p className="text-gray-600">
          {filteredJobs.length} jobs found
          {Object.keys(filters).length > 0 && (
            <span className="text-blue-600"> • {Object.keys(filters).length} filter(s) applied</span>
          )}
        </p>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="w-80 flex-shrink-0">
          <FilterSidebar filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Job Listings */}
        <div className="flex-1">
          {/* Sort and View Options */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'relevance' | 'date' | 'salary')}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="relevance">Relevance</option>
                <option value="date">Date Posted</option>
                <option value="salary">Salary</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-500">Filtered results</span>
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {sortedJobs.length > 0 ? (
              sortedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))
            ) : (
              <div className="text-center py-12">
                <AdjustmentsHorizontalIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search criteria
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {sortedJobs.length > 0 && (
            <div className="text-center mt-8">
              <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Load More Jobs
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 