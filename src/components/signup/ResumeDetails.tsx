'use client';

import EducationForm from './EducationForm';
import ProjectsForm from './ProjectsForm';
import WorkExperienceForm from './WorkExperienceForm';
import { Education, Project, WorkExperience } from '@/types/auth';

interface ResumeDetailsProps {
  formData: {
    about: string;
    education: Education[];
    skills: string;
    workExperience: WorkExperience[];
    projects: Project[];
    extracurricular: string;
    softSkills: string;
  };
  errors: {
    about?: string;
    education?: string;
    skills?: string;
    workExperience?: string;
    projects?: string;
  };
  onInputChange: (field: string, value: string) => void;
  onEducationChange: (index: number, field: keyof Education, value: string) => void;
  onAddEducation: () => void;
  onRemoveEducation: (index: number) => void;
  onProjectChange: (index: number, field: keyof Project, value: string) => void;
  onAddProject: () => void;
  onRemoveProject: (index: number) => void;
  onWorkExperienceChange: (index: number, field: keyof WorkExperience, value: string | boolean) => void;
  onAddWorkExperience: () => void;
  onRemoveWorkExperience: (index: number) => void;
}

export default function ResumeDetails({
  formData,
  errors,
  onInputChange,
  onEducationChange,
  onAddEducation,
  onRemoveEducation,
  onProjectChange,
  onAddProject,
  onRemoveProject,
  onWorkExperienceChange,
  onAddWorkExperience,
  onRemoveWorkExperience
}: ResumeDetailsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Resume Information</h2>
      
      <div>
        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
          About Me
        </label>
        <textarea
          id="about"
          rows={4}
          value={formData.about}
          onChange={(e) => onInputChange('about', e.target.value)}
          placeholder="Tell us about yourself, your career goals, and what makes you unique..."
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
            errors.about ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.about && (
          <p className="mt-1 text-sm text-red-600">{errors.about}</p>
        )}
      </div>

      <EducationForm
        education={formData.education}
        errors={errors}
        onEducationChange={onEducationChange}
        onAddEducation={onAddEducation}
        onRemoveEducation={onRemoveEducation}
      />

      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
          Technical Skills
        </label>
        <textarea
          id="skills"
          rows={3}
          value={formData.skills}
          onChange={(e) => onInputChange('skills', e.target.value)}
          placeholder="List your technical skills, programming languages, tools..."
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
            errors.skills ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.skills && (
          <p className="mt-1 text-sm text-red-600">{errors.skills}</p>
        )}
      </div>

      <WorkExperienceForm
        workExperience={formData.workExperience}
        errors={errors}
        onWorkExperienceChange={onWorkExperienceChange}
        onAddWorkExperience={onAddWorkExperience}
        onRemoveWorkExperience={onRemoveWorkExperience}
      />

      <ProjectsForm
        projects={formData.projects}
        errors={errors}
        onProjectChange={onProjectChange}
        onAddProject={onAddProject}
        onRemoveProject={onRemoveProject}
      />

      <div>
        <label htmlFor="extracurricular" className="block text-sm font-medium text-gray-700">
          Extracurricular Activities
        </label>
        <textarea
          id="extracurricular"
          rows={3}
          value={formData.extracurricular}
          onChange={(e) => onInputChange('extracurricular', e.target.value)}
          placeholder="Leadership roles, volunteer work, community involvement..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="softSkills" className="block text-sm font-medium text-gray-700">
          Soft Skills
        </label>
        <textarea
          id="softSkills"
          rows={3}
          value={formData.softSkills}
          onChange={(e) => onInputChange('softSkills', e.target.value)}
          placeholder="Communication, leadership, teamwork, problem-solving..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
} 