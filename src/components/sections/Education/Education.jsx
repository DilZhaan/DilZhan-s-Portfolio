import { useState } from "react";
import educationData from "../../../data/education.json";

function EducationCard({ degree }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors">
      <div
        className="p-6 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            {degree.logo && (
              <div className="w-12 h-12 flex-shrink-0">
                <img
                  src={degree.logo}
                  alt={`${degree.university} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-1">
                {degree.name}
              </h3>
              {degree.university && (
                <p className="text-gray-400 text-sm mb-2">
                  {degree.university}
                </p>
              )}
              {degree.year && (
                <span className="text-gray-500 text-sm">
                  {degree.year}
                </span>
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
          {degree.description && (
            <p className="text-gray-400 text-sm leading-relaxed mt-4 mb-4">
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
          <div className="space-y-4">
            {degrees.map((degree, index) => (
              <EducationCard key={index} degree={degree} />
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
