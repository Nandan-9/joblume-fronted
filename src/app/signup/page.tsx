'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { SignupFormData, Education, Project, WorkExperience } from '@/types/auth';
import { SIGNUP_MUTATION } from '@/lib/graphql';
import AccountDetails from '@/components/signup/AccountDetails';
import ResumeDetails from '@/components/signup/ResumeDetails';
import ContactDetails from '@/components/signup/ContactDetails';
import ProgressSteps from '@/components/signup/ProgressSteps';

export default function SignupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});

  const [signup, { loading: isSignupLoading }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      console.log('Signup successful:', data);
      // Store user data in localStorage for now (in real app, you'd use proper auth state management)
      const userData = {
        id: data.signup.id,
        email: data.signup.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        resume: {
          name: `${formData.firstName} ${formData.lastName}`,
          about: formData.about,
          education: formData.education,
          skills: formData.skills,
          work_experience: formData.workExperience,
          projects: formData.projects,
          extracurricular: formData.extracurricular,
          soft_skills: formData.softSkills,
          location: formData.location,
          linkedin: formData.linkedin,
          github: formData.github,
          portfolio: formData.portfolio
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('isAuthenticated', 'true');
      
      router.push('/profile');
    },
    onError: (error) => {
      console.error('Signup failed:', error);
      // Handle specific GraphQL errors
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const graphQLError = error.graphQLErrors[0];
        if (graphQLError.message.includes('email')) {
          setErrors({ email: 'Email already exists' });
        } else {
          setErrors({ email: graphQLError.message });
        }
      } else {
        setErrors({ email: 'Signup failed. Please try again.' });
      }
    }
  });

  const [formData, setFormData] = useState<SignupFormData>({
    // Account Details
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    
    // Resume Details
    about: '',
    education: [
      {
        type: '',
        degree: '',
        institution: '',
        year: '',
        gpa: '',
        description: ''
      }
    ],
    skills: '',
    workExperience: [
      {
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: ''
      }
    ],
    projects: [
      {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        technologies: '',
        url: ''
      }
    ],
    extracurricular: '',
    softSkills: '',
    
    // Contact Details
    location: '',
    linkedin: '',
    github: '',
    portfolio: ''
  });

  const steps = [
    { number: 1, title: 'Account Details' },
    { number: 2, title: 'Resume Information' },
    { number: 3, title: 'Contact Details' }
  ];

  const handleInputChange = (field: keyof SignupFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = { ...updatedEducation[index], [field]: value };
    setFormData(prev => ({ ...prev, education: updatedEducation }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          type: '',
          degree: '',
          institution: '',
          year: '',
          gpa: '',
          description: ''
        }
      ]
    }));
  };

  const removeEducation = (index: number) => {
    if (formData.education.length > 1) {
      const updatedEducation = formData.education.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, education: updatedEducation }));
    }
  };

  const handleWorkExperienceChange = (index: number, field: keyof WorkExperience, value: string | boolean) => {
    const updatedWorkExperience = [...formData.workExperience];
    updatedWorkExperience[index] = { ...updatedWorkExperience[index], [field]: value };
    setFormData(prev => ({ ...prev, workExperience: updatedWorkExperience }));
  };

  const addWorkExperience = () => {
    setFormData(prev => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          achievements: ''
        }
      ]
    }));
  };

  const removeWorkExperience = (index: number) => {
    if (formData.workExperience.length > 1) {
      const updatedWorkExperience = formData.workExperience.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, workExperience: updatedWorkExperience }));
    }
  };

  const handleProjectChange = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setFormData(prev => ({ ...prev, projects: updatedProjects }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: '',
          description: '',
          startDate: '',
          endDate: '',
          technologies: '',
          url: ''
        }
      ]
    }));
  };

  const removeProject = (index: number) => {
    if (formData.projects.length > 1) {
      const updatedProjects = formData.projects.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, projects: updatedProjects }));
    }
  };

  const handleTogglePassword = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<SignupFormData> = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    }

    if (step === 2) {
      if (!formData.about) newErrors.about = 'About section is required';
      if (!formData.skills) newErrors.skills = 'Skills are required';
      
      // Validate education
      const hasValidEducation = formData.education.some(edu => 
        edu.type && edu.degree && edu.institution && edu.year
      );
      if (!hasValidEducation) {
        newErrors.education = 'At least one education entry is required with type, degree, institution, and year';
      }

      // Validate work experience
      const hasValidWorkExperience = formData.workExperience.some(exp => 
        exp.title && exp.company && exp.startDate && (exp.current || exp.endDate)
      );
      if (!hasValidWorkExperience) {
        newErrors.workExperience = 'At least one work experience entry is required with title, company, start date, and end date (or mark as current)';
      }

      // Validate projects
      const hasValidProjects = formData.projects.some(project => 
        project.title && project.description && project.startDate && project.endDate
      );
      if (!hasValidProjects) {
        newErrors.projects = 'At least one project entry is required with title, description, start date, and end date';
      }
    }

    if (step === 3) {
      if (!formData.location) newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;

    try {
      // Prepare the input for GraphQL mutation
      const signupInput = {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        about: formData.about,
        education: formData.education,
        skills: formData.skills,
        workExperience: formData.workExperience,
        projects: formData.projects,
        extracurricular: formData.extracurricular,
        softSkills: formData.softSkills,
        location: formData.location,
        linkedin: formData.linkedin || '',
        github: formData.github || '',
        portfolio: formData.portfolio || ''
      };

      // Execute the GraphQL mutation
      await signup({
        variables: {
          input: signupInput
        }
      });
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
          <p className="mt-2 text-gray-600">Join JobLume and create your professional profile</p>
        </div>

        <ProgressSteps currentStep={currentStep} steps={steps} />

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && (
              <AccountDetails
                formData={{
                  email: formData.email,
                  password: formData.password,
                  confirmPassword: formData.confirmPassword,
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  phone: formData.phone
                }}
                errors={errors}
                showPassword={showPassword}
                showConfirmPassword={showConfirmPassword}
                onInputChange={handleInputChange}
                onTogglePassword={handleTogglePassword}
              />
            )}

            {currentStep === 2 && (
              <ResumeDetails
                formData={{
                  about: formData.about,
                  education: formData.education,
                  skills: formData.skills,
                  workExperience: formData.workExperience,
                  projects: formData.projects,
                  extracurricular: formData.extracurricular,
                  softSkills: formData.softSkills
                }}
                errors={errors}
                onInputChange={handleInputChange}
                onEducationChange={handleEducationChange}
                onAddEducation={addEducation}
                onRemoveEducation={removeEducation}
                onProjectChange={handleProjectChange}
                onAddProject={addProject}
                onRemoveProject={removeProject}
                onWorkExperienceChange={handleWorkExperienceChange}
                onAddWorkExperience={addWorkExperience}
                onRemoveWorkExperience={removeWorkExperience}
              />
            )}

            {currentStep === 3 && (
              <ContactDetails
                formData={{
                  location: formData.location,
                  linkedin: formData.linkedin,
                  github: formData.github,
                  portfolio: formData.portfolio
                }}
                errors={errors}
                onInputChange={handleInputChange}
              />
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSignupLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSignupLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 