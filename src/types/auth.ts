export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  about?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  skills?: string;
  softSkills?: string;
  extracurricular?: string;
  education?: Education[];
  workExperience?: WorkExperience[];
  projects?: Project[];
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  type: string;
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
  description?: string;
}

export interface Project {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  technologies?: string;
  url?: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements?: string;
}

export interface SignupFormData {
  // Account Details
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  
  // Resume Details
  about: string;
  education: Education[];
  skills: string;
  workExperience: WorkExperience[];
  projects: Project[];
  extracurricular: string;
  softSkills: string;
  
  // Contact Details
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
} 