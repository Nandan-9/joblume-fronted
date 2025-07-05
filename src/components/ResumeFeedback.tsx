import React from 'react';

interface FeedbackItem {
  id: number;
  text: string;
  category: 'achievement' | 'keyword' | 'format' | 'education' | 'skills' | 'general';
  priority: 'high' | 'medium' | 'low';
}

interface ResumeFeedbackProps {
  feedback: string[];
  jobTitle?: string;
}

export const ResumeFeedback: React.FC<ResumeFeedbackProps> = ({ feedback, jobTitle }) => {
  // Categorize feedback items based on keywords
  const categorizeFeedback = (text: string): FeedbackItem['category'] => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('achievement') || lowerText.includes('quantifiable') || lowerText.includes('metrics')) {
      return 'achievement';
    } else if (lowerText.includes('keyword') || lowerText.includes('docker') || lowerText.includes('ci/cd')) {
      return 'keyword';
    } else if (lowerText.includes('format') || lowerText.includes('ats') || lowerText.includes('parsing')) {
      return 'format';
    } else if (lowerText.includes('education') || lowerText.includes('gpa') || lowerText.includes('degree')) {
      return 'education';
    } else if (lowerText.includes('skill') || lowerText.includes('soft skill')) {
      return 'skills';
    } else {
      return 'general';
    }
  };

  // Determine priority based on category and content
  const getPriority = (category: FeedbackItem['category'], text: string): FeedbackItem['priority'] => {
    const lowerText = text.toLowerCase();
    
    // High priority for keyword and achievement feedback
    if (category === 'keyword' || category === 'achievement') {
      return 'high';
    }
    
    // Medium priority for format and skills
    if (category === 'format' || category === 'skills') {
      return 'medium';
    }
    
    // Low priority for education and general
    return 'low';
  };

  // Get category color
  const getCategoryColor = (category: FeedbackItem['category']) => {
    switch (category) {
      case 'achievement':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'keyword':
        return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'format':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'education':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'skills':
        return 'bg-pink-50 border-pink-200 text-pink-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  // Get priority color
  const getPriorityColor = (priority: FeedbackItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-blue-100 text-blue-700';
    }
  };

  // Get category icon
  const getCategoryIcon = (category: FeedbackItem['category']) => {
    switch (category) {
      case 'achievement':
        return 'trending_up';
      case 'keyword':
        return 'search';
      case 'format':
        return 'format_align_left';
      case 'education':
        return 'school';
      case 'skills':
        return 'psychology';
      default:
        return 'lightbulb';
    }
  };

  // Get category label
  const getCategoryLabel = (category: FeedbackItem['category']) => {
    switch (category) {
      case 'achievement':
        return 'Achievements';
      case 'keyword':
        return 'Keywords';
      case 'format':
        return 'Format';
      case 'education':
        return 'Education';
      case 'skills':
        return 'Skills';
      default:
        return 'General';
    }
  };

  // Process feedback into categorized items
  const processedFeedback: FeedbackItem[] = feedback.map((text, index) => {
    const category = categorizeFeedback(text);
    const priority = getPriority(category, text);
    
    return {
      id: index,
      text,
      category,
      priority
    };
  });

  // Group feedback by category
  const groupedFeedback = processedFeedback.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<FeedbackItem['category'], FeedbackItem[]>);

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center mb-4">
        <span className="material-symbols-outlined text-indigo-600 mr-2">feedback</span>
        <h3 className="font-medium text-gray-900">AI Feedback</h3>
        {jobTitle && (
          <span className="text-sm text-gray-500 ml-2">for {jobTitle}</span>
        )}
      </div>

      {processedFeedback.length === 0 ? (
        <div className="text-gray-500 text-sm p-3 bg-gray-50 rounded">
          No feedback available at the moment.
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedFeedback).map(([category, items]) => (
            <div key={category} className="space-y-2">
                             <div className="flex items-center">
                 <span className={`material-symbols-outlined text-sm mr-2 ${getCategoryColor(category as FeedbackItem['category']).split(' ')[0]}`}>
                   {getCategoryIcon(category as FeedbackItem['category'])}
                 </span>
                 <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(category as FeedbackItem['category'])}`}>
                   {getCategoryLabel(category as FeedbackItem['category'])}
                 </span>
               </div>
              
              <div className="space-y-2 ml-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start space-x-2">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`}></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(item.priority)}`}>
                          {item.priority === 'high' ? 'High Priority' : 
                           item.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center text-xs text-gray-500">
          <span className="material-symbols-outlined text-sm mr-1">info</span>
          <span>Feedback generated by AI based on job requirements</span>
        </div>
      </div>
    </div>
  );
}; 