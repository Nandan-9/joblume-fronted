export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  postedDate: string;
  description: string;
  requirements: string[];
  benefits: string[];
  companyLogo: string;
  companyRating: number;
  isRemote: boolean;
  isUrgent: boolean;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviewCount: number;
  industry: string;
  size: string;
  location: string;
}

export interface JobFilter {
  location?: string;
  jobType?: Job['type'];
  experience?: Job['experience'];
  salary?: {
    min: number;
    max: number;
  };
  isRemote?: boolean;
  keywords?: string;
}

export interface JobSearchResult {
  jobs: Job[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
} 