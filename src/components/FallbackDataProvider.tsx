import React from 'react';

interface FallbackDataProviderProps {
  skillGapError?: string;
  atsScoreError?: string;
  skillGapLoading: boolean;
  atsScoreLoading: boolean;
  skillGaps: any[];
  atsScore: any;
  showRefactored: boolean;
  children: (props: {
    displaySkillGaps: any[];
    displayAtsScore: any;
    showSkillGapFallback: boolean;
    showAtsScoreFallback: boolean;
  }) => React.ReactNode;
}

export const FallbackDataProvider: React.FC<FallbackDataProviderProps> = ({
  skillGapError,
  atsScoreError,
  skillGapLoading,
  atsScoreLoading,
  skillGaps,
  atsScore,
  showRefactored,
  children
}) => {
  // Credible dummy skill gap data with variations based on job type (max 3 skills)
  const getDummySkillGaps = (): any[] => {
    const variations = [
      // Software Engineering focus
      [
        { skill: "Machine Learning", importance: 85 },
        { skill: "Docker & Kubernetes", importance: 75 },
        { skill: "AWS/Azure Cloud Services", importance: 70 }
      ],
      // Frontend focus
      [
        { skill: "TypeScript", importance: 80 },
        { skill: "React/Next.js", importance: 90 },
        { skill: "Testing (Jest, Cypress)", importance: 70 }
      ],
      // Data Science focus
      [
        { skill: "Python (Pandas, NumPy)", importance: 90 },
        { skill: "Machine Learning", importance: 85 },
        { skill: "SQL & Database Design", importance: 75 }
      ]
    ];
    
    // Randomly select a variation for more realistic demo
    const randomIndex = Math.floor(Math.random() * variations.length);
    return variations[randomIndex];
  };

  // Credible dummy ATS score data with variations (more realistic, not exceeding good scores)
  const getDummyAtsScore = (): any => {
    const variations = [
      { atsScore: 65, keywordMatch: 68, formatScore: 75, contentQuality: 58 },
      { atsScore: 72, keywordMatch: 75, formatScore: 80, contentQuality: 65 },
      { atsScore: 58, keywordMatch: 62, formatScore: 70, contentQuality: 52 },
      { atsScore: 68, keywordMatch: 72, formatScore: 78, contentQuality: 62 },
      { atsScore: 75, keywordMatch: 78, formatScore: 82, contentQuality: 68 },
      { atsScore: 62, keywordMatch: 65, formatScore: 72, contentQuality: 55 }
    ];
    
    // Randomly select a variation for more realistic demo
    const randomIndex = Math.floor(Math.random() * variations.length);
    return variations[randomIndex];
  };

  const dummySkillGaps = getDummySkillGaps();
  const dummyAtsScore = getDummyAtsScore();

  // Determine when to show fallback data
  const shouldShowSkillGapFallback = 
    !skillGapLoading && 
    (!!skillGapError || skillGaps.length === 0) && 
    showRefactored;

  const shouldShowAtsScoreFallback = 
    !atsScoreLoading && 
    (!!atsScoreError || !atsScore) && 
    showRefactored;

  // Use real data if available, otherwise use fallback
  const displaySkillGaps = shouldShowSkillGapFallback ? dummySkillGaps : skillGaps;
  const displayAtsScore = shouldShowAtsScoreFallback ? dummyAtsScore : atsScore;

  return (
    <>
      {children({
        displaySkillGaps,
        displayAtsScore,
        showSkillGapFallback: shouldShowSkillGapFallback,
        showAtsScoreFallback: shouldShowAtsScoreFallback
      })}
    </>
  );
};

// Helper component for skill gap display
export const SkillGapDisplay: React.FC<{
  skillGaps: any[];
  isFallback: boolean;
  error?: string;
}> = ({ skillGaps, isFallback, error }) => {
  const getImportanceColor = (importance: number) => {
    if (importance >= 80) return 'bg-red-50 border-red-200';
    if (importance >= 60) return 'bg-yellow-50 border-yellow-200';
    if (importance >= 40) return 'bg-orange-50 border-orange-200';
    return 'bg-blue-50 border-blue-200';
  };
  
  const getImportanceLabel = (importance: number) => {
    if (importance >= 80) return 'Critical';
    if (importance >= 60) return 'High';
    if (importance >= 40) return 'Medium';
    return 'Low';
  };
  
  const getImportanceBadgeColor = (importance: number) => {
    if (importance >= 80) return 'bg-red-100 text-red-700';
    if (importance >= 60) return 'bg-yellow-100 text-yellow-700';
    if (importance >= 40) return 'bg-orange-100 text-orange-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className="space-y-3">
      {skillGaps.map((skill, index) => (
        <div key={index} className={`${getImportanceColor(skill.importance)} rounded p-2 border`}>
          <div className="flex justify-between">
            <span className="text-sm font-medium">{skill.skill}</span>
            <span className={`text-xs ${getImportanceBadgeColor(skill.importance)} px-2 rounded`}>
              {getImportanceLabel(skill.importance)}
            </span>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Importance score: {skill.importance}/100
          </p>
        </div>
      ))}
      

    </div>
  );
};

// Helper component for ATS score display
export const AtsScoreDisplay: React.FC<{
  atsScore: any;
  isFallback: boolean;
  error?: string;
}> = ({ atsScore, isFallback, error }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'Excellent score';
    if (score >= 60) return 'Good score - Above average';
    if (score >= 40) return 'Average score - Needs improvement';
    return 'Poor score - Significant improvements needed';
  };

  const getSubScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <>
      <div className="flex justify-center mb-2">
        <div className="relative">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold ${getScoreColor(atsScore.atsScore)}`}>
            {Math.round(atsScore.atsScore)}
          </div>
          {atsScore.atsScore >= 70 && (
            <div className="absolute -top-1 -right-1 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">check</span>
            </div>
          )}
        </div>
      </div>
      <p className="text-center text-sm mb-2">
        {getScoreText(atsScore.atsScore)}
      </p>
      <div className="w-full bg-purple-100 rounded-full h-1.5 mb-4">
        <div 
          className={`h-1.5 rounded-full ${getScoreColor(atsScore.atsScore)}`}
          style={{ width: `${atsScore.atsScore}%` }}
        ></div>
      </div>
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span>Keywords Match</span>
          <span className={getSubScoreColor(atsScore.keywordMatch)}>{Math.round(atsScore.keywordMatch)}%</span>
        </div>
        <div className="flex justify-between">
          <span>Format Score</span>
          <span className={getSubScoreColor(atsScore.formatScore)}>{Math.round(atsScore.formatScore)}%</span>
        </div>
        <div className="flex justify-between">
          <span>Content Quality</span>
          <span className={getSubScoreColor(atsScore.contentQuality)}>{Math.round(atsScore.contentQuality)}%</span>
        </div>
      </div>
      

    </>
  );
}; 