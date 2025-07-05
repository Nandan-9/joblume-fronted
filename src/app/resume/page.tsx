'use client';

import { Lato } from 'next/font/google';
import Header from '@/components/Header';
import Resume from '@/components/Resume';
import RefactoredResume from '@/components/RefactoredResume';
import { resumeData } from '@/data/resume';
import { ResumeService } from '@/lib/resumeService';
import { useState, useEffect } from 'react';
import AuthGuard from '@/components/AuthGuard';
import { ResumeFieldFiller } from '@/lib/resumeFieldFiller';

import { RawDataDisplay } from '@/components/RawDataDisplay';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
  loading?: boolean;
}

const lato = Lato({
  weight: ['400'],
  subsets: ['latin'],
});

export default function ResumePage() {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [message, setMessage] = useState('');
  const [resume, setResume] = useState(resumeData);
  const [refactoredResume, setRefactoredResume] = useState<string>('');
  const [refactoredResumeData, setRefactoredResumeData] = useState<any>(null);
  const [refactoredJobTitle, setRefactoredJobTitle] = useState<string>('');
  const [showRefactored, setShowRefactored] = useState(false);
  const [skillGaps, setSkillGaps] = useState<any[]>([]);
  const [skillGapLoading, setSkillGapLoading] = useState(false);
  const [skillGapError, setSkillGapError] = useState<string>('');
  const [atsScore, setAtsScore] = useState<any>(null);
  const [atsScoreLoading, setAtsScoreLoading] = useState(false);
  const [atsScoreError, setAtsScoreError] = useState<string>('');
  const [feedback, setFeedback] = useState<string[]>([]);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help you improve your resume. Here are some things I can do:',
      suggestions: [
        'Analyze my resume content',
        'Suggest better action words',
        'Help me quantify achievements',
        'Improve my skills section'
      ]
    }
  ]);

  useEffect(() => {
    // Check if there's a refactored resume in localStorage
    const storedRefactoredResume = localStorage.getItem('refactoredResume');
    const storedJobTitle = localStorage.getItem('refactoredJobTitle');
    const storedJobDescription = localStorage.getItem('refactoredJobDescription');
    
    if (storedRefactoredResume && storedJobTitle) {
      setRefactoredResume(storedRefactoredResume);
      setRefactoredJobTitle(storedJobTitle);
      setShowRefactored(true);
      
      // Try to parse the refactored resume as JSON
      try {
        const parsedData = JSON.parse(storedRefactoredResume);
        
        // Fill empty fields in refactored resume with original resume data
        const filledResumeData = ResumeFieldFiller.fillEmptyFields(resumeData, parsedData);
        setRefactoredResumeData(filledResumeData);
        
        // Fetch skill gap analysis, ATS score, and feedback for the refactored resume
        fetchSkillGapAnalysis(storedJobDescription || storedJobTitle, storedRefactoredResume);
        fetchATSScore(storedJobDescription || storedJobTitle, storedRefactoredResume);
        fetchFeedback(storedJobDescription || storedJobTitle, storedRefactoredResume);
      } catch (error) {
        console.error('Failed to parse refactored resume data:', error);
        // If parsing fails, treat it as plain text
        setRefactoredResumeData(null);
      }
      
      // Clear the stored data after displaying
      localStorage.removeItem('refactoredResume');
      localStorage.removeItem('refactoredJobTitle');
      localStorage.removeItem('refactoredJobDescription');
    }
  }, []);

  const fetchSkillGapAnalysis = async (jobDescription: string, resumeData: string) => {
    setSkillGapLoading(true);
    setSkillGapError('');
    
    try {
      const response = await ResumeService.getSkillGap(jobDescription, resumeData);
      
      if (response.success) {
        console.log('Skill Gap Raw Data:', response.skillGaps);
        setSkillGaps(response.skillGaps || []);
      } else {
        setSkillGapError(response.message || 'Failed to fetch skill gap analysis');
      }
    } catch (error) {
      console.error('Error fetching skill gap analysis:', error);
      setSkillGapError('An error occurred while fetching skill gap analysis');
    } finally {
      setSkillGapLoading(false);
    }
  };

  const fetchATSScore = async (jobDescription: string, resumeData: string) => {
    setAtsScoreLoading(true);
    setAtsScoreError('');
    
    try {
      const response = await ResumeService.getATSScore(jobDescription, resumeData);
      
      if (response.success) {
        console.log('ATS Score Raw Data:', response.atsScore);
        setAtsScore(response.atsScore || null);
      } else {
        setAtsScoreError(response.message || 'Failed to fetch ATS score');
      }
    } catch (error) {
      console.error('Error fetching ATS score:', error);
      setAtsScoreError('An error occurred while fetching ATS score');
    } finally {
      setAtsScoreLoading(false);
    }
  };

  const fetchFeedback = async (jobDescription: string, resumeData: string) => {
    setFeedbackLoading(true);
    setFeedbackError('');
    
    try {
      const response = await ResumeService.getFeedback(jobDescription, resumeData);
      
      if (response.success) {
        console.log('Feedback Raw Data:', response.feedback);
        setFeedback(response.feedback || []);
      } else {
        setFeedbackError(response.message || 'Failed to fetch feedback');
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setFeedbackError('An error occurred while fetching feedback');
    } finally {
      setFeedbackLoading(false);
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setChatHistory(prev => [...prev, 
      { role: 'user', content: suggestion, suggestions: [] },
      { role: 'assistant', content: 'Analyzing your request...', loading: true }
    ]);

    // Simulate AI response delay
    setTimeout(() => {
      setChatHistory(prev => {
        const newHistory = prev.filter(msg => !msg.loading);
        return [...newHistory, {
          role: 'assistant',
          content: `Here are my suggestions regarding "${suggestion}"`,
          suggestions: [
            'Add specific metrics to showcase impact',
            'Use stronger action verbs',
            'Include relevant technologies',
            'Focus on achievements over duties'
          ]
        }];
      });
    }, 1000);
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', content: message, suggestions: [] }]);
    
    // Add loading message
    setChatHistory(prev => [...prev, { role: 'assistant', content: 'Analyzing your request...', loading: true }]);
    
          try {
        const currentResume = showRefactored ? refactoredResumeData : resume;
        const resumeDataObject = typeof currentResume === 'string' ? JSON.parse(currentResume) : currentResume;
        
        const response = await fetch("http://localhost:8000/resume/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            resume_data: resumeDataObject,
            user_prompt: message
          })
        });

        const data = await response.json();
        
        // Remove loading message
        setChatHistory(prev => prev.filter(msg => !msg.loading));
        
        if (data.success) {
          // Update the resume if it was modified
          if (data.updated_resume) {
            try {
              const updatedResumeData = JSON.parse(data.updated_resume);
              if (showRefactored) {
                setRefactoredResumeData(updatedResumeData);
                setRefactoredResume(data.updated_resume);
              } else {
                // Update the original resume state
                setResume(updatedResumeData);
              }
            } catch (parseError) {
              console.warn('Failed to parse updated resume as JSON:', parseError);
            }
          }
          
          // Add assistant response
          setChatHistory(prev => [...prev, {
            role: 'assistant',
            content: data.message || 'Resume updated successfully!',
            suggestions: data.suggestions || []
          }]);
        } else {
          // Add error response
          setChatHistory(prev => [...prev, {
            role: 'assistant',
            content: 'Failed to update resume. Please try again.',
            suggestions: []
          }]);
          console.log('Chat API error:', data.raw_output);
        }
    } catch (error) {
      // Remove loading message
      setChatHistory(prev => prev.filter(msg => !msg.loading));
      
      // Add error response
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        suggestions: []
      }]);
      console.error('Chat API error:', error);
    }

    setMessage('');
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert('Download functionality would generate a PDF of the resume');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShowOriginal = () => {
    setShowRefactored(false);
  };

  const handleCopyRefactored = () => {
    // If we have structured data, format it nicely for copying
    if (refactoredResumeData) {
      const formattedText = formatResumeForCopy(refactoredResumeData);
      navigator.clipboard.writeText(formattedText);
    } else {
      navigator.clipboard.writeText(refactoredResume);
    }
    alert('Refactored resume copied to clipboard!');
  };

  const formatResumeForCopy = (data: any): string => {
    let formatted = '';
    
    // Header
    formatted += `${data.name}\n`;
    formatted += `${data.about}\n\n`;
    
    // Contact info
    if (data.location) formatted += `Location: ${data.location}\n`;
    if (data.linkedin) formatted += `LinkedIn: ${data.linkedin}\n`;
    if (data.github) formatted += `GitHub: ${data.github}\n`;
    if (data.portfolio) formatted += `Portfolio: ${data.portfolio}\n`;
    formatted += '\n';
    
    // Skills
    formatted += `TECHNICAL SKILLS\n${data.skills}\n\n`;
    
    if (data.soft_skills) {
      formatted += `SOFT SKILLS\n${data.soft_skills}\n\n`;
    }
    
    // Work Experience
    formatted += `WORK EXPERIENCE\n`;
    data.work_experience.forEach((job: any) => {
      formatted += `${job.title} at ${job.company}\n`;
      formatted += `${job.startDate} - ${job.current ? 'Present' : job.endDate}\n`;
      formatted += `${job.location}\n`;
      if (job.description) formatted += `${job.description}\n`;
      if (job.achievements) formatted += `Achievements: ${job.achievements}\n`;
      formatted += '\n';
    });
    
    // Projects
    formatted += `PROJECTS\n`;
    data.projects.forEach((project: any) => {
      formatted += `${project.title}\n`;
      formatted += `${project.startDate} - ${project.endDate}\n`;
      if (project.description) formatted += `${project.description}\n`;
      if (project.technologies) formatted += `Technologies: ${project.technologies}\n`;
      if (project.url) formatted += `URL: ${project.url}\n`;
      formatted += '\n';
    });
    
    // Education
    formatted += `EDUCATION\n`;
    data.education.forEach((edu: any) => {
      formatted += `${edu.degree}\n`;
      formatted += `${edu.institution}\n`;
      formatted += `${edu.year}\n`;
      if (edu.gpa) formatted += `GPA: ${edu.gpa}\n`;
      if (edu.description) formatted += `${edu.description}\n`;
      formatted += '\n';
    });
    
    // Extracurricular
    if (data.extracurricular) {
      formatted += `EXTRACURRICULAR ACTIVITIES\n${data.extracurricular}\n`;
    }
    
    return formatted;
  };

  return (
    <AuthGuard>
      <Header />
      <main className={`${lato.className} min-h-screen bg-gray-50 py-4`}>
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg font-medium text-gray-800">
                {showRefactored ? 'Refactored Resume' : 'Resume Preview'}
                {showRefactored && refactoredJobTitle && (
                  <span className="text-sm text-gray-500 ml-2">for {refactoredJobTitle}</span>
                )}
              </h1>
              <div className="flex space-x-2">
                {showRefactored && (
                  <>
                    <button 
                      onClick={handleCopyRefactored}
                      className="bg-green-500 text-white px-4 py-1.5 rounded-full text-sm flex items-center hover:bg-green-600"
                    > 
                      <span className="material-symbols-outlined text-sm mr-1">content_copy</span> 
                      Copy 
                    </button>
                    <button 
                      onClick={handleShowOriginal}
                      className="bg-gray-500 text-white px-4 py-1.5 rounded-full text-sm flex items-center hover:bg-gray-600"
                    > 
                      <span className="material-symbols-outlined text-sm mr-1">undo</span> 
                      Show Original 
                    </button>
                  </>
                )}
                <button 
                  onClick={handleDownload}
                  className="bg-purple-500 text-white px-4 py-1.5 rounded-full text-sm flex items-center hover:bg-purple-600"
                > 
                  <span className="material-symbols-outlined text-sm mr-1">download</span> 
                  Download 
                </button> 
                <button 
                  onClick={handlePrint}
                  className="border border-gray-300 bg-white px-4 py-1.5 rounded-full text-sm flex items-center hover:bg-gray-50"
                > 
                  <span className="material-symbols-outlined text-sm mr-1">print</span> 
                  Print 
                </button> 
              </div> 
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Resume Content Section */}
              <div className="md:col-span-7 bg-white p-4 rounded-lg border border-gray-200 overflow-auto h-[calc(100vh-120px)]"> 
                <div 
                  className="w-full h-full"
                  style={{ 
                    transform: `scale(${zoomLevel / 100})`, 
                    transformOrigin: 'top center'
                  }}
                >
                  {showRefactored ? (
                    <div className="bg-white p-6 rounded-lg border border-gray-200">
                      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center mb-2">
                          <span className="material-symbols-outlined text-green-600 mr-2">check_circle</span>
                          <h3 className="font-semibold text-green-800">Resume Refactored Successfully!</h3>
                        </div>
                        <p className="text-sm text-green-700">
                          Your resume has been tailored for the "{refactoredJobTitle}" position.
                        </p>
                      </div>
                      
                      {refactoredResumeData ? (
                        <RefactoredResume data={refactoredResumeData} />
                      ) : (
                        <div className="prose max-w-none">
                          <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono bg-gray-50 p-4 rounded-lg border">
                            {refactoredResume}
                          </pre>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Resume data={resume} />
                  )}
                </div>
              </div> 
              
              {/* Right Sidebar */}
              <div className="md:col-span-5 space-y-4"> 
                {/* Skill Gap Analysis */}
                {showRefactored && (
                  <div className="bg-white rounded-lg shadow-sm border p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Skill Gap Analysis</h3>
                    {skillGapLoading ? (
                      <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-red-50 border border-red-200 rounded p-3">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Machine Learning</span>
                            <span className="text-xs bg-red-100 text-red-700 px-2 rounded">Critical</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Importance score: 85/100</p>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">Docker & Kubernetes</span>
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 rounded">High</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Importance score: 75/100</p>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 rounded p-3">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">AWS/Azure Cloud Services</span>
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 rounded">Medium</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">Importance score: 70/100</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* ATS Score */}
                {showRefactored && (
                  <div className="bg-white rounded-lg shadow-sm border p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">ATS Score</h3>
                    {atsScoreLoading ? (
                      <div className="animate-pulse space-y-3">
                        <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="relative inline-block mb-4">
                          <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold bg-yellow-500">
                            58
                          </div>
                          <div className="absolute -top-1 -right-1 bg-yellow-600 text-white w-6 h-6 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                          </div>
                        </div>
                        <p className="text-center text-sm mb-2">Moderate - Room for improvement</p>
                        <div className="w-full bg-purple-100 rounded-full h-1.5 mb-4">
                          <div className="h-1.5 rounded-full bg-yellow-500" style={{ width: '58%' }}></div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Keyword Match</p>
                            <p className="font-semibold text-yellow-600">65%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Format Score</p>
                            <p className="font-semibold text-yellow-600">70%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Content Quality</p>
                            <p className="font-semibold text-yellow-600">45%</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )} 
                
                {/* AI Feedback */}
                {showRefactored && (
                  <div className="bg-white rounded-lg shadow-sm border p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Feedback</h3>
                    {feedbackLoading ? (
                      <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ) : feedback.length > 0 ? (
                      <div className="space-y-3">
                        {feedback.map((item, index) => (
                          <div key={index} className="bg-blue-50 border border-blue-200 rounded p-3">
                            <p className="text-sm text-gray-800">{item}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <p className="text-sm text-gray-800">Consider adding more specific metrics to quantify your achievements.</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <p className="text-sm text-gray-800">Use stronger action verbs at the beginning of each bullet point.</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <p className="text-sm text-gray-800">Include relevant technologies and tools mentioned in the job description.</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* AI Resume Assistant */}
                <div className="bg-white rounded-lg p-4 border border-gray-200 max-h-[calc(100vh-500px)]"> 
                  <div className="flex items-center mb-3"> 
                    <span className="material-symbols-outlined text-purple-600">smart_toy</span>
                    <h3 className="font-medium ml-2">AI Resume Assistant</h3> 
                  </div>
                  <div className="h-[300px] flex flex-col">
                    <div className="flex-1 overflow-auto mb-4 space-y-4">
                      {chatHistory.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`rounded-lg p-2 max-w-[80%] ${
                            msg.role === 'user' 
                              ? 'bg-purple-500 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <p className="text-sm whitespace-pre-wrap">
                              {msg.loading ? (
                                <span className="inline-flex items-center">
                                  <span className="animate-pulse">Thinking</span>
                                  <span className="animate-[bounce_1s_infinite_200ms]">.</span>
                                  <span className="animate-[bounce_1s_infinite_400ms]">.</span>
                                  <span className="animate-[bounce_1s_infinite_600ms]">.</span>
                                </span>
                              ) : (
                                msg.content
                              )}
                            </p>
                            {!msg.loading && msg.suggestions && (
                              <div className="mt-2 space-y-1">
                                {msg.suggestions.map((suggestion, i) => (
                                  <button
                                    key={i}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="block w-full text-left text-xs px-2 py-1 rounded hover:bg-gray-200 text-gray-700 transition-colors duration-150"
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleMessageSubmit} className="flex gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask me about your resume..."
                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                      />
                      <button
                        type="submit"
                        className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600"
                      >
                        <span className="material-symbols-outlined text-sm">send</span>
                      </button>
                    </form>
                  </div>
                </div> 
              </div> 
            </div>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
}
