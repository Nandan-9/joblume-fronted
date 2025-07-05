import { Job } from '@/types/job';
import { StarIcon, MapPinIcon, ClockIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const formatSalary = (min: number, max: number, currency: string) => {
    const formatNumber = (num: number) => {
      if (num >= 1000000) {
        return `$${(num / 1000000).toFixed(1)}M`;
      } else if (num >= 1000) {
        return `$${(num / 1000).toFixed(0)}K`;
      }
      return `$${num.toLocaleString()}`;
    };
    
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <Link href={`/jobs/${job.id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold text-sm">
                {job.company.charAt(0)}
              </span>
            </div>
          </div>

          {/* Job Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {job.title}
              </h3>
              {job.isUrgent && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  Urgent
                </span>
              )}
            </div>
            
            <p className="text-gray-600 font-medium mb-1">{job.company}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center space-x-1">
                <MapPinIcon className="h-4 w-4" />
                <span>{job.location}</span>
                {job.isRemote && (
                  <span className="ml-1 text-blue-600 font-medium">• Remote</span>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-4 w-4" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center space-x-1">
                <CurrencyDollarIcon className="h-4 w-4" />
                <span>{formatSalary(job.salary.min, job.salary.max, job.salary.currency)}</span>
              </div>
            </div>

            {/* Company Rating */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex items-center">
                <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-900 ml-1">
                  {job.companyRating}
                </span>
              </div>
              <span className="text-sm text-gray-500">• {job.experience} Level</span>
            </div>

            {/* Job Description Preview */}
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">
              {job.description}
            </p>

            {/* Posted Date */}
            <p className="text-xs text-gray-400">
              Posted {formatDate(job.postedDate)}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2 ml-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Apply Now
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
            Save Job
          </button>
        </div>
      </div>
      </div>
    </Link>
  );
} 