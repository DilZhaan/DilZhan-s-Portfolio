import { useState } from "react";
import experienceData from "../../../data/experience.json";

function ExperienceCard({ experience }) {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const formatDateRange = () => {
    const start = formatDate(experience.startDate);
    const end = experience.current ? 'Present' : formatDate(experience.endDate);
    const duration = calculateDuration(experience.startDate, experience.endDate, experience.current);
    return `${start} - ${end} · ${duration}`;
  };

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors">
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            {experience.logo && (
              <div className="w-12 h-12 flex-shrink-0">
                <img
                  src={experience.logo}
                  alt={`${experience.company} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                {experience.title}
              </h3>
              <p className="text-gray-400 text-sm mb-1">
                {experience.company} · {experience.employmentType}
              </p>
              <p className="text-gray-500 text-sm mb-1">
                {formatDateRange()}
              </p>
              {experience.location && (
                <p className="text-gray-500 text-sm">
                  {experience.location}
                </p>
              )}
            </div>
          </div>
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

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-800">
          {experience.description && (
            <p className="text-gray-400 text-sm leading-relaxed mt-4 mb-4">
              {experience.description}
            </p>
          )}

          {experience.skills && experience.skills.length > 0 && (
            <div>
              <h5 className="font-medium text-white text-sm mb-3">
                Skills
              </h5>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded border border-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Experience() {
  const { sectionTitle, experiences } = experienceData;

  return (
    <section id="experience" className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          {sectionTitle}
        </h2>
        {experiences && experiences.length > 0 ? (
          <div className="space-y-4">
            {experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
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
