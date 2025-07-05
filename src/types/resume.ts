import { Education, Project, WorkExperience } from '@/types/auth';

export interface ResumeData {
  name: string;
  about: string;
  education: Education[];
  skills: string;
  work_experience: WorkExperience[];
  projects: Project[];
  extracurricular: string;
  soft_skills: string;
  location?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
} 