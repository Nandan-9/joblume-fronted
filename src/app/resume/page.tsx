'use client';

import { Lato } from 'next/font/google';
import Header from '@/components/Header';
import { useState } from 'react';

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

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    setChatHistory(prev => [...prev, { role: 'user', content: message, suggestions: [] }]);
    
    // Simulate AI response (in real app, this would be an API call)
    setTimeout(() => {
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: 'I understand you want help with your resume. Let me analyze it and provide specific suggestions.',
        suggestions: ['Improve this bullet point', 'Add more metrics', 'Rephrase for clarity']
      }]);
    }, 1000);

    setMessage('');
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printWindow = window.open('/Resume.pdf');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <>
      <Header />
      <main className={`${lato.className} min-h-screen bg-gray-50 py-4`}>
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-2xl border border-gray-300">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg font-medium text-gray-800">Resume Preview</h1>
              <div className="flex space-x-2">
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
              <iframe
                src="/Resume.pdf"
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
            

          </div> 
          
          {/* Right Sidebar */}
          <div className="md:col-span-5 space-y-4"> 
            {/* Skill Gap Analysis */}
            <div className="border border-dashed border-red-300 rounded-lg p-4 bg-white relative"> 
              <div className="flex items-center mb-2"> 
                <span className="material-symbols-outlined text-purple-600">analytics</span>
                <h3 className="font-medium ml-2">Skill Gap Analysis</h3> 
              </div> 
              <div className="space-y-3"> 
                <div className="bg-red-50 rounded p-2"> 
                  <div className="flex justify-between"> 
                    <span className="text-sm">Machine Learning</span> 
                    <span className="text-xs bg-red-100 text-red-700 px-2 rounded">Critical</span> 
                  </div> 
                  <p className="text-xs text-gray-600">Required for 30% of similar positions.</p> 
                </div> 
                <div className="bg-yellow-50 rounded p-2"> 
                  <div className="flex justify-between"> 
                    <span className="text-sm">Kubernetes</span> 
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 rounded">Medium</span> 
                  </div> 
                  <p className="text-xs text-gray-600">Required for 40% of similar positions.</p> 
                </div> 
                <div className="bg-blue-50 rounded p-2"> 
                  <div className="flex justify-between"> 
                    <span className="text-sm">GraphQL</span> 
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 rounded">Low</span> 
                  </div> 
                  <p className="text-xs text-gray-600">Required for 30% of similar positions.</p> 
                </div> 
              </div> 
            </div> 
            
            {/* ATS Score */}
            <div className="bg-white rounded-lg p-4 border border-gray-200"> 
              <div className="flex items-center mb-3"> 
                <span className="material-symbols-outlined text-purple-600">speed</span>
                <h3 className="font-medium ml-2">ATS Score</h3> 
              </div> 
              <div className="flex justify-center mb-2"> 
                <div className="relative"> 
                  <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-bold"> 
                    78 
                  </div> 
                  <div className="absolute -top-1 -right-1 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center"> 
                    <span className="material-symbols-outlined text-sm">check</span>
                  </div> 
                </div> 
              </div> 
              <p className="text-center text-sm mb-2">Good score - Above average</p> 
              <div className="w-full bg-purple-100 rounded-full h-1.5 mb-4"> 
                <div className="bg-purple-500 h-1.5 rounded-full w-3/4"></div> 
              </div> 
              <div className="space-y-1.5 text-sm"> 
                <div className="flex justify-between"> 
                  <span>Keywords Match</span> 
                  <span className="text-green-500">82%</span> 
                </div> 
                <div className="flex justify-between"> 
                  <span>Format Score</span> 
                  <span className="text-blue-500">90%</span> 
                </div> 
                <div className="flex justify-between"> 
                  <span>Content Quality</span> 
                  <span className="text-yellow-500">68%</span> 
                </div> 
              </div> 
            </div> 
            
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
    </>
  );
}
