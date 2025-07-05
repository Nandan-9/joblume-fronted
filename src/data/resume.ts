import { ResumeData } from '@/types/resume';

export const resumeData: ResumeData = {
  name: "Harigovind C B",
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
    },
    {
      title: "Event Manager & Mentor",
      company: "amFOSS",
      location: "Kerala, India",
      startDate: "2023-01",
      endDate: "",
      current: true,
      description: "Lead community events, hackathons, and workshops. Mentor students in open source development and organize technical workshops.",
      achievements: "Organized 10+ successful hackathons; Mentored 50+ students; Increased community engagement by 60%."
    },
    {
      title: "Extended Working Group Member",
      company: "Indic MediaWiki Developers User Group",
      location: "Remote",
      startDate: "2025-03",
      endDate: "",
      current: true,
      description: "Contribute to development of tools and resources for Indic language support in MediaWiki projects.",
      achievements: "Developed 3 new language tools; Improved accessibility for 5+ Indic languages."
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
      title: "Jot-It-Down",
      description: "Collaborative note-taking application with real-time synchronization, user authentication, and rich text editing features.",
      startDate: "2023-03",
      endDate: "2023-08",
      technologies: "React.js, Node.js, MongoDB, Socket.io, Express.js",
      url: "https://github.com/harigovind/jot-it-down"
    },
    {
      title: "Academize",
      description: "Academic progress tracker with grade management, course planning, and performance analytics for students.",
      startDate: "2023-01",
      endDate: "2023-05",
      technologies: "Django, Python, SQLite, Bootstrap, Chart.js",
      url: "https://github.com/harigovind/academize"
    },
    {
      title: "ANPR - YOLO-based Number Plate Detector",
      description: "Real-time automatic number plate recognition system using YOLO object detection and OCR for vehicle identification.",
      startDate: "2022-09",
      endDate: "2023-02",
      technologies: "Python, YOLO, OpenCV, TensorFlow, OCR",
      url: "https://github.com/harigovind/anpr-detector"
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