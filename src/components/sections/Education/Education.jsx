import { useState } from "react";
import educationData from "../../../data/education.json";

function EducationCard({ degree, isLast }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative flex gap-6 pb-8 last:pb-0">
      {/* Timeline */}
      <div className="relative flex flex-col items-center pt-1">
        {/* Dot */}
        <div className="w-3 h-3 rounded-full border-2 bg-gray-800 border-gray-700 z-10 flex-shrink-0"></div>
        
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
            {/* Logo */}
            {degree.logo && (
              <div className="w-12 h-12 flex-shrink-0">
                <img
                  src={degree.logo}
                  alt={`${degree.university} logo`}
                  className="w-full h-full object-contain rounded"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              {/* Line 1: Degree name and year */}
              <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                <h3 className="text-lg font-semibold text-white">
                  {degree.name}
                </h3>
                {degree.year && (
                  <span className="text-sm text-gray-500">
                    {degree.year}
                  </span>
                )}
              </div>
              
              {/* Line 2: University */}
              {degree.university && (
                <p className="text-sm text-gray-400">
                  {degree.university}
                </p>
              )}
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
          <div className="mt-4 ml-16">
            {degree.description && (
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {degree.description}
              </p>
            )}

            {degree.keyCourses && degree.keyCourses.length > 0 && (
              <div>
                <h5 className="font-medium text-white text-sm mb-3">
                  Key Courses
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {degree.keyCourses.map((course, index) => (
                    <div key={index} className="flex items-start text-sm">
                      <span className="text-gray-600 mr-2">•</span>
                      <span className="text-gray-400">{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Education() {
  const { sectionTitle, degrees } = educationData;

  return (
    <section id="education" className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          {sectionTitle}
        </h2>
        {degrees && degrees.length > 0 ? (
          <div>
            {degrees.map((degree, index) => (
              <EducationCard 
                key={index} 
                degree={degree}
                isLast={index === degrees.length - 1}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No education information available</p>
        )}
      </div>
    </section>
  );
}

export default Education;
