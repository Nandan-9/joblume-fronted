'use client';

interface RefactoredResumeProps {
  data: {
    name: string;
    about: string;
    education: Array<{
      type: string;
      degree: string;
      institution: string;
      year: string;
      gpa?: string | number;
      description?: string;
    }>;
    skills: string;
    work_experience: Array<{
      title: string;
      company: string;
      location: string;
      startDate: string;
      endDate: string;
      current: boolean;
      description: string;
      achievements: string;
    }>;
    projects: Array<{
      title: string;
      description: string;
      startDate: string;
      endDate: string;
      technologies: string;
      url?: string;
    }>;
    extracurricular: string;
    soft_skills: string;
    location?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
}

export default function RefactoredResume({ data }: RefactoredResumeProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-sm border border-gray-200">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.name}</h1>
        <p className="text-lg text-gray-700 mb-4">{data.about}</p>
        
        {/* Contact Info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {data.location && (
            <div className="flex items-center">
              <span className="material-symbols-outlined text-sm mr-1">location_on</span>
              {data.location}
            </div>
          )}
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-900">
              <span className="material-symbols-outlined text-sm mr-1">link</span>
              LinkedIn
            </a>
          )}
          {data.github && (
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-900">
              <span className="material-symbols-outlined text-sm mr-1">code</span>
              GitHub
            </a>
          )}
          {data.portfolio && (
            <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-gray-900">
              <span className="material-symbols-outlined text-sm mr-1">web</span>
              Portfolio
            </a>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Skills */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Technical Skills
          </h2>
          <p className="text-gray-700">{data.skills}</p>
        </section>

        {/* Soft Skills */}
        {data.soft_skills && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              Soft Skills
            </h2>
            <p className="text-gray-700">{data.soft_skills}</p>
          </section>
        )}

        {/* Work Experience */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            Work Experience
          </h2>
          <div className="space-y-4">
            {data.work_experience.map((job, index) => (
              <div key={index} className="border-l-2 border-gray-300 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-700 font-medium">{job.company}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{job.startDate} - {job.current ? 'Present' : job.endDate}</p>
                    <p>{job.location}</p>
                  </div>
                </div>
                {job.description && (
                  <p className="text-gray-700 mb-2">{job.description}</p>
                )}
                {job.achievements && (
                  <div className="text-gray-700">
                    <p className="font-medium mb-1">Key Achievements:</p>
                    <p>{job.achievements}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className="border-l-2 border-gray-300 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{project.title}</h3>
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:text-gray-900">
                        View Project
                      </a>
                    )}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{project.startDate} - {project.endDate}</p>
                  </div>
                </div>
                {project.description && (
                  <p className="text-gray-700 mb-2">{project.description}</p>
                )}
                {project.technologies && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Technologies:</span> {project.technologies}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-300 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700 font-medium">{edu.institution}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{edu.year}</p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Extracurricular */}
        {data.extracurricular && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
              Extracurricular Activities
            </h2>
            <p className="text-gray-700">{data.extracurricular}</p>
          </section>
        )}
      </div>
    </div>
  );
} 