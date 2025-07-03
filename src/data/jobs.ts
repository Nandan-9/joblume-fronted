import { Job } from '@/types/job';

export const dummyJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: {
      min: 120000,
      max: 180000,
      currency: 'USD'
    },
    type: 'Full-time',
    experience: 'Senior',
    postedDate: '2024-01-15',
    description: 'We are looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining our web applications using React, TypeScript, and modern frontend technologies.',
    requirements: [
      '5+ years of experience with React/TypeScript',
      'Strong understanding of modern JavaScript',
      'Experience with state management (Redux, Zustand)',
      'Knowledge of CSS preprocessors and responsive design',
      'Experience with testing frameworks (Jest, React Testing Library)'
    ],
    benefits: [
      'Competitive salary and equity',
      'Health, dental, and vision insurance',
      'Flexible work hours and remote options',
      'Professional development budget',
      'Unlimited PTO'
    ],
    companyLogo: '/api/placeholder/60/60',
    companyRating: 4.2,
    isRemote: true,
    isUrgent: true
  },
  {
    id: '2',
    title: 'Product Manager',
    company: 'InnovateTech',
    location: 'New York, NY',
    salary: {
      min: 100000,
      max: 150000,
      currency: 'USD'
    },
    type: 'Full-time',
    experience: 'Mid',
    postedDate: '2024-01-14',
    description: 'Join our product team to help shape the future of our platform. You will work closely with engineering, design, and business teams to deliver exceptional user experiences.',
    requirements: [
      '3+ years of product management experience',
      'Strong analytical and problem-solving skills',
      'Experience with agile methodologies',
      'Excellent communication and collaboration skills',
      'Background in SaaS or B2B products preferred'
    ],
    benefits: [
      'Competitive compensation package',
      'Comprehensive health benefits',
      '401(k) matching',
      'Flexible work arrangements',
      'Regular team events and activities'
    ],
    companyLogo: '/api/placeholder/60/60',
    companyRating: 4.5,
    isRemote: false,
    isUrgent: false
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'CloudScale Solutions',
    location: 'Austin, TX',
    salary: {
      min: 110000,
      max: 160000,
      currency: 'USD'
    },
    type: 'Full-time',
    experience: 'Senior',
    postedDate: '2024-01-13',
    description: 'Help us build and maintain our cloud infrastructure. You will be responsible for ensuring our systems are scalable, secure, and highly available.',
    requirements: [
      '5+ years of DevOps experience',
      'Strong knowledge of AWS/Azure/GCP',
      'Experience with Docker and Kubernetes',
      'Proficiency in scripting languages (Python, Bash)',
      'Knowledge of CI/CD pipelines and automation'
    ],
    benefits: [
      'Competitive salary with performance bonuses',
      'Health and wellness benefits',
      'Remote work options',
      'Professional certification support',
      'Generous PTO and holidays'
    ],
    companyLogo: '/api/placeholder/60/60',
    companyRating: 4.1,
    isRemote: true,
    isUrgent: false
  },
  {
    id: '4',
    title: 'UX/UI Designer',
    company: 'Creative Studios',
    location: 'Los Angeles, CA',
    salary: {
      min: 80000,
      max: 120000,
      currency: 'USD'
    },
    type: 'Full-time',
    experience: 'Mid',
    postedDate: '2024-01-12',
    description: 'Create beautiful and intuitive user experiences for our digital products. You will work with cross-functional teams to design solutions that delight our users.',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma, Sketch, or Adobe Creative Suite',
      'Strong portfolio showcasing web and mobile designs',
      'Understanding of user-centered design principles',
      'Experience with design systems and component libraries'
    ],
    benefits: [
      'Competitive salary and benefits',
      'Flexible work schedule',
      'Creative and collaborative environment',
      'Professional development opportunities',
      'Health and wellness benefits'
    ],
    companyLogo: '/api/placeholder/60/60',
    companyRating: 4.3,
    isRemote: true,
    isUrgent: false
  },
  {
    id: '5',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Seattle, WA',
    salary: {
      min: 130000,
      max: 190000,
      currency: 'USD'
    },
    type: 'Full-time',
    experience: 'Senior',
    postedDate: '2024-01-11',
    description: 'Join our data science team to build machine learning models and derive insights from large datasets. Help us make data-driven decisions that impact millions of users.',
    requirements: [
      '5+ years of experience in data science',
      'Strong programming skills in Python/R',
      'Experience with machine learning frameworks',
      'Knowledge of SQL and big data technologies',
      'Advanced degree in Statistics, Computer Science, or related field'
    ],
    benefits: [
      'Competitive salary with equity',
      'Comprehensive health benefits',
      'Flexible work arrangements',
      'Conference and training budget',
      '401(k) with company match'
    ],
    companyLogo: '/api/placeholder/60/60',
    companyRating: 4.4,
    isRemote: true,
    isUrgent: true
  },
  {
    id: '6',
    title: 'Marketing Specialist',
    company: 'Growth Marketing Co.',
    location: 'Chicago, IL',
    salary: {
      min: 60000,
      max: 90000,
      currency: 'USD'
    },
    type: 'Full-time',
    experience: 'Entry',
    postedDate: '2024-01-10',
    description: 'Help us grow our brand and reach new customers through innovative marketing strategies. You will work on campaigns across multiple channels and platforms.',
    requirements: [
      '1+ years of marketing experience',
      'Strong written and verbal communication skills',
      'Experience with social media marketing',
      'Knowledge of digital marketing tools and platforms',
      'Bachelor\'s degree in Marketing or related field'
    ],
    benefits: [
      'Competitive entry-level salary',
      'Health and dental insurance',
      'Professional development opportunities',
      'Flexible work schedule',
      'Team building activities'
    ],
    companyLogo: '/api/placeholder/60/60',
    companyRating: 3.9,
    isRemote: false,
    isUrgent: false
  }
]; 