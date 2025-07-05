'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_USER_MUTATION } from '@/lib/graphql';
import { User, Education, Project, WorkExperience } from '@/types/auth';
import { 
  XMarkIcon,
  PencilIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface EditProfileFormProps {
  user: User;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
}

export default function EditProfileForm({ user, onClose, onUpdate }: EditProfileFormProps) {
  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION);
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    phone: user.phone || '',
    about: user.about || '',
    location: user.location || '',
    linkedin: user.linkedin || '',
    github: user.github || '',
    portfolio: user.portfolio || '',
    skills: user.skills || '',
    softSkills: user.softSkills || '',
    extracurricular: user.extracurricular || '',
    education: user.education || [],
    workExperience: user.workExperience || [],
    projects: user.projects || []
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEducationChange = (index: number, field: string, value: string) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      education: updatedEducation
    }));
  };

  const handleWorkExperienceChange = (index: number, field: string, value: any) => {
    const updatedWorkExperience = [...formData.workExperience];
    updatedWorkExperience[index] = {
      ...updatedWorkExperience[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      workExperience: updatedWorkExperience
    }));
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      projects: updatedProjects
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, {
        type: '',
        degree: '',
        institution: '',
        year: '',
        gpa: '',
        description: ''
      }]
    }));
  };

  const addWorkExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperience: [...prev.workExperience, {
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: ''
      }]
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        technologies: '',
        url: ''
      }]
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const removeWorkExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter((_, i) => i !== index)
    }));
  };

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data } = await updateUser({
        variables: {
          email: user.email,
          input: formData
        }
      });

      if (data?.updateUser) {
        onUpdate(data.updateUser);
        onClose();
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">About</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">About</label>
              <textarea
                value={formData.about}
                onChange={(e) => handleInputChange('about', e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Skills</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Technical Skills</label>
              <textarea
                value={formData.skills}
                onChange={(e) => handleInputChange('skills', e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., JavaScript, React, Node.js, Python..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Soft Skills</label>
              <textarea
                value={formData.softSkills}
                onChange={(e) => handleInputChange('softSkills', e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g., Leadership, Communication, Problem Solving..."
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => handleInputChange('linkedin', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">GitHub</label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => handleInputChange('github', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://github.com/..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Portfolio</label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => handleInputChange('portfolio', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://your-portfolio.com"
                />
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Education</h3>
              <button
                type="button"
                onClick={addEducation}
                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                <PencilIcon className="w-4 h-4 mr-1" />
                Add Education
              </button>
            </div>
            {formData.education.map((education, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Education #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <input
                      type="text"
                      value={education.type}
                      onChange={(e) => handleEducationChange(index, 'type', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Bachelor's, Master's"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Degree</label>
                    <input
                      type="text"
                      value={education.degree}
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Institution</label>
                    <input
                      type="text"
                      value={education.institution}
                      onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="University name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <input
                      type="text"
                      value={education.year}
                      onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., 2020"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">GPA (Optional)</label>
                    <input
                      type="text"
                      value={education.gpa}
                      onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., 3.8"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description (Optional)</label>
                  <textarea
                    value={education.description}
                    onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Additional details about your education..."
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Work Experience */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Work Experience</h3>
              <button
                type="button"
                onClick={addWorkExperience}
                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                <PencilIcon className="w-4 h-4 mr-1" />
                Add Experience
              </button>
            </div>
            {formData.workExperience.map((experience, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Experience #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeWorkExperience(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={experience.title}
                      onChange={(e) => handleWorkExperienceChange(index, 'title', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                      type="text"
                      value={experience.company}
                      onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      value={experience.location}
                      onChange={(e) => handleWorkExperienceChange(index, 'location', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="City, State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={experience.startDate}
                      onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="date"
                      value={experience.endDate}
                      onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      disabled={experience.current}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={experience.current}
                      onChange={(e) => handleWorkExperienceChange(index, 'current', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Current Position</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={experience.description}
                    onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Describe your role and responsibilities..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Achievements (Optional)</label>
                  <textarea
                    value={experience.achievements}
                    onChange={(e) => handleWorkExperienceChange(index, 'achievements', e.target.value)}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Key achievements and accomplishments..."
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Projects</h3>
              <button
                type="button"
                onClick={addProject}
                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                <PencilIcon className="w-4 h-4 mr-1" />
                Add Project
              </button>
            </div>
            {formData.projects.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Project #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Project title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">URL (Optional)</label>
                    <input
                      type="url"
                      value={project.url}
                      onChange={(e) => handleProjectChange(index, 'url', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://project-url.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      value={project.startDate}
                      onChange={(e) => handleProjectChange(index, 'startDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Date</label>
                    <input
                      type="date"
                      value={project.endDate}
                      onChange={(e) => handleProjectChange(index, 'endDate', e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Describe your project..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Technologies (Optional)</label>
                  <input
                    type="text"
                    value={project.technologies}
                    onChange={(e) => handleProjectChange(index, 'technologies', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., React, Node.js, MongoDB"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Extracurricular */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Extracurricular Activities</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Activities</label>
              <textarea
                value={formData.extracurricular}
                onChange={(e) => handleInputChange('extracurricular', e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Describe your extracurricular activities, volunteer work, etc..."
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 