import { ResumeData } from '@/types/resume';
import { Education, Project, WorkExperience } from '@/types/auth';

interface ResumeProps {
  data: ResumeData;
}

export default function Resume({ data }: ResumeProps) {
  const formatWorkExperience = (workExperience: WorkExperience[]) => {
    return workExperience.map((exp, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-semibold text-gray-900">{exp.title}</h4>
          <span className="text-sm text-gray-600">
            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
          </span>
        </div>
        <p className="text-sm text-gray-700 mb-1">{exp.company}</p>
        <p className="text-xs text-gray-500 mb-2">{exp.location}</p>
        <p className="text-sm text-gray-700 leading-relaxed mb-2">{exp.description}</p>
        {exp.achievements && (
          <div className="mt-2">
            <p className="text-xs font-medium text-gray-600 mb-1">Key Achievements:</p>
            <p className="text-xs text-gray-700">{exp.achievements}</p>
          </div>
        )}
      </div>
    ));
  };

  const formatEducation = (education: Education[]) => {
    return education.map((edu, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
          <span className="text-sm text-gray-600">{edu.year}</span>
        </div>
        <p className="text-sm text-gray-700 mb-1">{edu.institution}</p>
        <p className="text-xs text-gray-500 mb-2">{edu.type}</p>
        {edu.gpa && (
          <p className="text-xs text-gray-600 mb-2">GPA: {edu.gpa}</p>
        )}
        {edu.description && (
          <p className="text-xs text-gray-700">{edu.description}</p>
        )}
      </div>
    ));
  };

  const formatProjects = (projects: Project[]) => {
    return projects.map((project, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-semibold text-gray-900">{project.title}</h4>
          <span className="text-sm text-gray-600">
            {project.startDate} - {project.endDate}
          </span>
        </div>
        {project.technologies && (
          <div className="mb-2">
            <span className="text-xs text-gray-500">Technologies: </span>
            <span className="text-xs text-gray-700">{project.technologies}</span>
          </div>
        )}
        {project.url && (
          <div className="mb-2">
            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-gray-600 hover:text-gray-800 underline"
            >
              View Project →
            </a>
          </div>
        )}
        <p className="text-sm text-gray-700 leading-relaxed">{project.description}</p>
      </div>
    ));
  };

  const formatSkills = (skills: string) => {
    return skills.split(',').map((skill, index) => (
      <span
        key={index}
        className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-2"
      >
        {skill.trim()}
      </span>
    ));
  };

  const formatSoftSkills = (skills: string) => {
    return skills.split(',').map((skill, index) => (
      <span
        key={index}
        className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-2 mb-2"
      >
        {skill.trim()}
      </span>
    ));
  };

  return (
    <div className="bg-white max-w-4xl mx-auto p-8 shadow-sm border border-gray-200">
      {/* Header */}
      <div className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.name}</h1>
        <p className="text-gray-700 leading-relaxed mb-3">{data.about}</p>
        
        {/* Contact Information */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.location && (
            <span>{data.location}</span>
          )}
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 underline">
              LinkedIn
            </a>
          )}
          {data.github && (
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 underline">
              GitHub
            </a>
          )}
          {data.portfolio && (
            <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-800 underline">
              Portfolio
            </a>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Work Experience */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {formatWorkExperience(data.work_experience)}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {formatEducation(data.education)}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Projects
          </h2>
          <div className="space-y-4">
            {formatProjects(data.projects)}
          </div>
        </section>

        {/* Extracurricular Activities */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Extracurricular Activities
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{data.extracurricular}</p>
        </section>

        {/* Skills Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Technical Skills */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Technical Skills
            </h2>
            <div className="flex flex-wrap">
              {formatSkills(data.skills)}
            </div>
          </section>

          {/* Soft Skills */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
              Soft Skills
            </h2>
            <div className="flex flex-wrap">
              {formatSoftSkills(data.soft_skills)}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 