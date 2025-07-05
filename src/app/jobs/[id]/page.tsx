'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { dummyJobs } from '@/data/jobs';
import { Job } from '@/types/job';
import { User } from '@/types/auth';
import { MaterialSymbolsOutlined } from '@/components/MaterialSymbolsOutlined';
import { ResumeService } from '@/lib/resumeService';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefactoring, setIsRefactoring] = useState(false);

  useEffect(() => {
    const jobId = params.id as string;
    const foundJob = dummyJobs.find(j => j.id === jobId);
    setJob(foundJob || null);
    
    // Get user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    
    setLoading(false);
  }, [params.id]);

  const handleRefactorResume = async () => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (isAuthenticated === 'true' && user && job) {
      setIsRefactoring(true);
      
      try {
        const resumeData = ResumeService.extractResumeData(user);
        const response = await ResumeService.refactorResume(job.description, resumeData);

        
        if (response.success) {
          // Store the refactored resume in localStorage and navigate to resume page
          localStorage.setItem('refactoredResume', response.refactored_resume);
          localStorage.setItem('refactoredJobTitle', job.title);
          localStorage.setItem('refactoredJobDescription', job.description);
          router.push('/resume');
        } else {
          // Silently handle error - user won't see error message
          console.log('Failed to refactor resume:', response.message);
        }
      } catch (error) {
        console.error('Error refactoring resume:', error);
        
        // Silently handle error - user won't see error message
        console.log('Error refactoring resume:', error);
      } finally {
        setIsRefactoring(false);
      }
    } else {
      // If not authenticated, open login page in new tab
      window.open('/login', '_blank');
    }
  };

  const formatSalary = (salary: Job['salary']) => {
    return `${salary.currency}${salary.min.toLocaleString()} - ${salary.currency}${salary.max.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Refactor Resume toggle */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => router.push('/')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <MaterialSymbolsOutlined className="w-5 h-5 mr-2">arrow_back</MaterialSymbolsOutlined>
              Back to Jobs
            </button>
            
            <button
              onClick={handleRefactorResume}
              disabled={isRefactoring}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isRefactoring ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Refactoring...
                </>
              ) : (
                <>
                  <MaterialSymbolsOutlined className="w-4 h-4 mr-2">edit</MaterialSymbolsOutlined>
                  Refactor Resume
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Job Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
                    <MaterialSymbolsOutlined className="w-8 h-8 text-gray-500">business</MaterialSymbolsOutlined>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                    <p className="text-xl text-gray-600 mb-1">{job.company}</p>
                    <div className="flex items-center text-gray-500">
                      <MaterialSymbolsOutlined className="w-4 h-4 mr-1">location_on</MaterialSymbolsOutlined>
                      <span>{job.location}</span>
                      {job.isRemote && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-green-600 font-medium">Remote</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {formatSalary(job.salary)}
                  </div>
                  <div className="text-sm text-gray-500">per year</div>
                </div>
              </div>

              {/* Job Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {job.type}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {job.experience} Level
                </span>
                {job.isUrgent && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    Urgent
                  </span>
                )}
              </div>

              {/* Company Rating */}
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <MaterialSymbolsOutlined
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(job.companyRating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      star
                    </MaterialSymbolsOutlined>
                  ))}
                  <span className="ml-1 text-sm text-gray-600">{job.companyRating}</span>
                </div>
                <span className="text-sm text-gray-500">Posted {formatDate(job.postedDate)}</span>
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Job Description</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                <p>{job.description}</p>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <MaterialSymbolsOutlined className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0">
                      check_circle
                    </MaterialSymbolsOutlined>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Benefits</h2>
              <ul className="space-y-3">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <MaterialSymbolsOutlined className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0">
                      favorite
                    </MaterialSymbolsOutlined>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Apply</h3>
              
              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
                
                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors">
                  Save Job
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Job Summary</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience Level:</span>
                    <span className="font-medium">{job.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Job Type:</span>
                    <span className="font-medium">{job.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{job.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remote:</span>
                    <span className="font-medium">{job.isRemote ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted:</span>
                    <span className="font-medium">{formatDate(job.postedDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 