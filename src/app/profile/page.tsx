'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Resume from '@/components/Resume';
import EditProfileForm from '@/components/EditProfileForm';
import { ResumeData, ResumeVersion } from '@/types/resume';
import { User } from '@/types/auth';
import { ResumeService } from '@/lib/resumeService';
import VersionModal from '@/components/VersionModal';
import AuthGuard from '@/components/AuthGuard';
import { 
  UserCircleIcon, 
  CogIcon, 
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'resume'>('profile');
  const [showEditForm, setShowEditForm] = useState(false);
  const [versions, setVersions] = useState<ResumeVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<ResumeVersion | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    router.push('/');
  };

  const handleEditProfile = () => {
    setShowEditForm(true);
  };

  const handleProfileUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    // Update localStorage with the new user data
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setShowEditForm(false);
  };

  const handleEditResume = () => {
    // In a real app, this would navigate to an edit resume page
    alert('Edit resume functionality would be implemented here');
  };

  const handleVersionClick = (version: ResumeVersion) => {
    setSelectedVersion(version);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVersion(null);
  };

  const handleDownloadPDF = (version: ResumeVersion) => {
    // Here you would generate the PDF from version.resumeData
    alert('PDF download functionality would be implemented here');
  };

  // Combined useEffect hook for initialization and data fetching
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    // Get user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setResumeData(userData.resume);

      // Fetch resume versions
      const fetchVersions = async () => {
        try {
          const versions = await ResumeService.getVersions(userData.firstName);
          setVersions(versions);
        } catch (error) {
          console.error('Error fetching versions:', error);
        }
      };

      fetchVersions();
    }
    
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-4">Please sign in to view your profile.</p>
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <UserCircleIcon className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleEditProfile}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <UserCircleIcon className="w-5 h-5 mr-2" />
                Profile
              </div>
            </button>
            <button
              onClick={() => setActiveTab('resume')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'resume'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                Resume
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Account Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <UserCircleIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Account Information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First Name</label>
                      <p className="mt-1 text-sm text-gray-900">{user.firstName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      <p className="mt-1 text-sm text-gray-900">{user.lastName}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{user.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Member Since</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Resume Summary */}
              {resumeData && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Resume Summary
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">About</label>
                      <p className="mt-1 text-sm text-gray-900 line-clamp-3">{resumeData.about}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Skills</label>
                      <p className="mt-1 text-sm text-gray-900">{resumeData.skills}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Location</label>
                      <p className="mt-1 text-sm text-gray-900">{resumeData.location}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleEditResume}
                      className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      <PencilIcon className="w-4 h-4 mr-1" />
                      Edit Resume
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <CogIcon className="w-5 h-5 mr-2 text-blue-600" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => router.push('/resume')}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <span>View Resume</span>
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => router.push('/')}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <span>Browse Jobs</span>
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleEditProfile}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    <span>Edit Profile</span>
                    <PencilIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Account Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Profile Completion</span>
                    <span className="text-sm font-medium text-green-600">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Resume Views</span>
                    <span className="text-sm font-medium text-blue-600">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Applications</span>
                    <span className="text-sm font-medium text-blue-600">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resume' && resumeData && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Your Resume</h2>
              <button
                onClick={handleEditResume}
                className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
              >
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit Resume
              </button>
            </div>
            <Resume data={resumeData} />
          </div>
        )}

        {/* Resume Versions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Versions</h3>
          <div className="space-y-3">
            {versions.map((version) => (
              <div 
                key={version.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium">{version.jobTitle}</p>
                  <p className="text-sm text-gray-600">Generated: {version.generatedDate}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleVersionClick(version)}
                    className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDownloadPDF(version)}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Version Modal */}
    {isModalOpen && selectedVersion && (
      <VersionModal version={selectedVersion} onClose={handleCloseModal} />
    )}

    {/* Edit Profile Modal */}
    {showEditForm && user && (
      <EditProfileForm
        user={user}
        onClose={() => setShowEditForm(false)}
        onUpdate={handleProfileUpdate}
      />
    )}
    </AuthGuard>
  );
}
