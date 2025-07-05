import { ResumeFieldFiller } from './resumeFieldFiller';
import { ResumeData, ResumeVersion } from '@/types/resume';

export interface RefactorResumeRequest {
  job_description: string;
  resume_data: any;
}

export interface RefactorResumeResponse {
  refactored_resume: string;
  success: boolean;
  message?: string;
}

export interface SkillGapItem {
  skill: string;
  importance: number;
}

export interface SkillGapResponse {
  skillGaps: SkillGapItem[];
  success: boolean;
  message?: string;
}

export interface ATSScoreItem {
  keywordMatch: number;
  formatScore: number;
  contentQuality: number;
  atsScore: number;
}

export interface ATSScoreResponse {
  atsScore: ATSScoreItem;
  success: boolean;
  message?: string;
}

export interface FeedbackResponse {
  feedback: string[];
  success: boolean;
  message?: string;
}

export class ResumeService {
  private static API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  private static getDefaultResume(userName: string = "Harigovind C B"): ResumeData {
    return {
      name: userName,
      about: "A passionate full-stack developer with expertise in building scalable web applications and backend systems. Proficient in Django, API design, and frontend development. Experienced in organizing hackathons and workshops.",
      education: [
        {
          type: "Bachelor's Degree",
          degree: "Computer Science (Artificial Intelligence)",
          institution: "Amrita University",
          year: "2022–present",
          gpa: "8.08/10",
          description: "Focus on AI and machine learning with practical projects in computer vision and natural language processing."
        }
      ],
      skills: "Python, Django, Node.js, React.js, SQL, Machine Learning, Computer Vision, YOLO, OpenCV, TensorFlow",
      work_experience: [
        {
          title: "Project Intern",
          company: "Amrita Vishwa Vidyapeetham",
          location: "Kerala, India",
          startDate: "2023-10",
          endDate: "2024-09",
          current: false,
          description: "Developed web-based interface for a Tabletop robot, implementing real-time control systems and user interface design. Collaborated with robotics team to integrate computer vision capabilities.",
          achievements: "Successfully delivered a fully functional robot control interface; Reduced system response time by 40%; Received recognition for innovative UI design."
        },
        {
          title: "Open Source Contributor",
          company: "Wikimedia Foundation",
          location: "Remote",
          startDate: "2023-01",
          endDate: "2024-12",
          current: false,
          description: "Contributed to VideoCutTool and ISA Tool projects, improving video editing capabilities for Wikimedia Commons and developing tools for Indic language support.",
          achievements: "Merged 15+ pull requests; Improved video processing efficiency by 25%; Enhanced user experience for non-English speakers."
        }
      ],
      projects: [
        {
          title: "VideoCutTool",
          description: "Web-based video editing tool for Wikimedia Commons, enabling users to edit and process videos directly in the browser with advanced cutting and merging capabilities.",
          startDate: "2023-06",
          endDate: "2023-12",
          technologies: "JavaScript, Web APIs, MediaWiki API, HTML5 Video",
          url: "https://github.com/wikimedia/VideoCutTool"
        },
        {
          title: "AI Driver Assistance",
          description: "Real-time hazard detection system using YOLO for autonomous driving applications, detecting obstacles and traffic signs.",
          startDate: "2022-06",
          endDate: "2022-12",
          technologies: "Python, YOLO, OpenCV, Computer Vision, Real-time Processing",
          url: "https://github.com/harigovind/ai-driver-assistance"
        }
      ],
      extracurricular: "Organizer and mentor in events like Hacktoberfest, Wikimedia Hackathons, Hexinox GenAI Hackathon; led community outreach and AI safety awareness initiatives.",
      soft_skills: "Leadership, Communication, Adaptability, Teamwork, Coordination, Problem Solving, Project Management",
      location: "Kerala, India",
      linkedin: "https://linkedin.com/in/harigovind-cb",
      github: "https://github.com/harigovind",
      portfolio: "https://harigovind.dev"
    };
  }

  static async getVersions(username: string): Promise<ResumeVersion[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/resume/versions`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }

      // Return failsafe data if response is empty
      const defaultResume = this.getDefaultResume(username);
      return [
        {
          id: "1",
          jobTitle: "Software Developer",
          generatedDate: new Date().toISOString(),
          versionDate: new Date().toISOString(),
          resumeData: defaultResume
        }
      ];
    } catch (error) {
      console.error('Error fetching versions:', error);
      
      // Return failsafe data on error
      const defaultResume = this.getDefaultResume(username);
      return [
        {
          id: "1",
          jobTitle: "Software Developer",
          generatedDate: new Date().toISOString(),
          versionDate: new Date().toISOString(),
          resumeData: defaultResume
        }
      ];
    }
  }

  static async getSkillGap(jobDescription: string, resumeData: string): Promise<SkillGapResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/skillgap/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_description: jobDescription, resume_data: resumeData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data)) {
        return {
          skillGaps: data.map(item => ({
            skill: item.skill,
            importance: item.importance
          })),
          success: true
        };
      } else if (data && typeof data === 'object') {
        for (const key of ['skillGaps', 'skills', 'data', 'result']) {
          if (data[key] && Array.isArray(data[key])) {
            return {
              skillGaps: data[key],
              success: true
            };
          }
        }
      }

      // Return failsafe data if no valid data found
      return {
        skillGaps: [
          { skill: "Machine Learning", importance: 85 },
          { skill: "Django", importance: 75 },
          { skill: "React.js", importance: 70 }
        ],
        success: true
      };
    } catch (error) {
      console.error('Error getting skill gap:', error);
      return {
        skillGaps: [
          { skill: "Machine Learning", importance: 85 },
          { skill: "Django", importance: 75 },
          { skill: "React.js", importance: 70 }
        ],
        success: true,
        message: 'Using fallback skill gap data'
      };
    }
  }

  static async getATSScore(jobDescription: string, resumeData: string): Promise<ATSScoreResponse> {
    try {
      const parsedResumeData = typeof resumeData === 'string' ? JSON.parse(resumeData) : resumeData;
      
      const response = await fetch(`${this.API_BASE_URL}/resume/ats-score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jd: jobDescription,
          resume_json: parsedResumeData
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.ats_score && typeof data.ats_score === 'object') {
        return {
          atsScore: {
            keywordMatch: data.ats_score['Keyword Match (%)'] || 65,
            formatScore: data.ats_score['Format Score (%)'] || 70,
            contentQuality: data.ats_score['Content Quality (%)'] || 45,
            atsScore: data.ats_score['ATS Score (%)'] || 58
          },
          success: true
        };
      }

      // Return failsafe data
      return {
        atsScore: {
          keywordMatch: 65,
          formatScore: 70,
          contentQuality: 45,
          atsScore: 58
        },
        success: true
      };
    } catch (error) {
      console.error('Error getting ATS score:', error);
      return {
        atsScore: {
          keywordMatch: 65,
          formatScore: 70,
          contentQuality: 45,
          atsScore: 58
        },
        success: true,
        message: 'Using fallback ATS scores'
      };
    }
  }

  static async getFeedback(jobDescription: string, resumeData: string): Promise<FeedbackResponse> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/feedback/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_description: jobDescription,
          resume_data: resumeData
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data)) {
        return {
          feedback: data,
          success: true
        };
      }

      // Return failsafe feedback
      return {
        feedback: [
          "Consider adding more quantifiable achievements to your work experience",
          "Include specific technologies used in your projects",
          "Add more relevant keywords from the job description"
        ],
        success: true
      };
    } catch (error) {
      console.error('Error getting feedback:', error);
      return {
        feedback: [
          "Consider adding more quantifiable achievements to your work experience",
          "Include specific technologies used in your projects",
          "Add more relevant keywords from the job description"
        ],
        success: true,
        message: 'Using fallback feedback'
      };
    }
  }
}
