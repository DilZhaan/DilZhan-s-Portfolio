import { useState } from "react";
import experienceData from "../../../data/experience.json";

function CompanyExperienceGroup({ companyExperiences, isLast }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Get company info from first experience
  const company = companyExperiences[0].company;
  const companyLogo = companyExperiences[0].logo;
  const location = companyExperiences[0].location;
  
  // Get the most recent position title
  const latestPosition = companyExperiences[0].title;
  
  // Calculate total duration across all positions
  const calculateTotalDuration = () => {
    const allDates = companyExperiences.map(exp => ({
      start: new Date(exp.startDate),
      end: exp.current ? new Date() : new Date(exp.endDate)
    }));
    
    const earliestStart = new Date(Math.min(...allDates.map(d => d.start)));
    const latestEnd = new Date(Math.max(...allDates.map(d => d.end)));
    
    const months = (latestEnd.getFullYear() - earliestStart.getFullYear()) * 12 + 
                   (latestEnd.getMonth() - earliestStart.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    }
  };

  const calculateDuration = (startDate, endDate, isCurrent) => {
    const start = new Date(startDate);
    const end = isCurrent ? new Date() : new Date(endDate);
    
    const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                   (end.getMonth() - start.getMonth());
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years} yr${years > 1 ? 's' : ''} ${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    } else if (years > 0) {
      return `${years} yr${years > 1 ? 's' : ''}`;
    } else {
      return `${remainingMonths} mo${remainingMonths > 1 ? 's' : ''}`;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const hasCurrentPosition = companyExperiences.some(exp => exp.current);

  return (
    <div className="relative flex gap-6 pb-8 last:pb-0">
      {/* Timeline */}
      <div className="relative flex flex-col items-center pt-1">
        {/* Dot */}
        <div className={`w-3 h-3 rounded-full border-2 z-10 flex-shrink-0 ${
          hasCurrentPosition
            ? 'bg-blue-500 border-blue-500' 
            : 'bg-gray-800 border-gray-700'
        }`}></div>
        
        {/* Vertical Line */}
        {!isLast && (
          <div className="w-0.5 h-full bg-gray-900 mt-2"></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Collapsed View */}
        <div 
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start gap-4">
            {/* Company Logo */}
            {companyLogo && (
              <div className="w-12 h-12 flex-shrink-0">
                <img
                  src={companyLogo}
                  alt={`${company} logo`}
                  className="w-full h-full object-contain rounded"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              {/* Line 1: Company name and duration */}
              <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                <h3 className="text-lg font-semibold text-white">
                  {company}
                </h3>
                <span className="text-sm text-gray-500">
                  {calculateTotalDuration()}
                </span>
                {hasCurrentPosition && (
                  <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">
                    Current
                  </span>
                )}
              </div>
              
              {/* Line 2: Latest position and location */}
              <p className="text-sm text-gray-400">
                {companyExperiences[0].title}
                {companyExperiences.length > 1 && ` +${companyExperiences.length - 1} more`}
                {companyExperiences[0].location && (
                  <span className="text-gray-600"> · {companyExperiences[0].location}</span>
                )}
              </p>
            </div>
            
            {/* Expand Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-gray-500 flex-shrink-0 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Expanded View */}
        {isExpanded && (
          <div className="mt-6 ml-16 space-y-6">
            {companyExperiences.map((exp) => (
              <div 
                key={exp.id}
                className={`pl-6 border-l-2 ${
                  exp.current ? 'border-blue-500' : 'border-gray-800'
                }`}
              >
                {/* Position Title */}
                <h4 className="text-base font-semibold text-white mb-1">
                  {exp.title}
                </h4>
                
                {/* Employment Type and Date */}
                <p className="text-sm text-gray-400 mb-3">
                  {exp.employmentType} · {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)} · {calculateDuration(exp.startDate, exp.endDate, exp.current)}
                </p>
                
                {/* Description */}
                {exp.description && (
                  <p className="text-sm text-gray-400 leading-relaxed mb-3">
                    {exp.description}
                  </p>
                )}
                
                {/* Skills */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-xs px-2.5 py-1 bg-gray-900 text-gray-400 rounded border border-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Experience() {
  const { sectionTitle, experiences } = experienceData;

  // Group experiences by company
  const groupedExperiences = experiences.reduce((acc, exp) => {
    if (!acc[exp.company]) {
      acc[exp.company] = [];
    }
    acc[exp.company].push(exp);
    return acc;
  }, {});

  // Sort each company's experiences by start date (most recent first)
  Object.keys(groupedExperiences).forEach(company => {
    groupedExperiences[company].sort((a, b) => 
      new Date(b.startDate) - new Date(a.startDate)
    );
  });

  // Convert to array and sort by most recent experience date
  const sortedCompanies = Object.entries(groupedExperiences).sort((a, b) => {
    const latestA = new Date(a[1][0].startDate);
    const latestB = new Date(b[1][0].startDate);
    return latestB - latestA;
  });

  return (
    <section id="experience" className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          {sectionTitle}
        </h2>
        {sortedCompanies && sortedCompanies.length > 0 ? (
          <div>
            {sortedCompanies.map(([company, companyExps], index) => (
              <CompanyExperienceGroup
                key={company}
                companyExperiences={companyExps}
                isLast={index === sortedCompanies.length - 1}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No work experience available</p>
        )}
      </div>
    </section>
  );
}

export default Experience;
