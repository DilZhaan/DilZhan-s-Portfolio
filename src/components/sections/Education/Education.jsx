import { useState, useRef, useEffect } from "react";

function EducationCard({ degree }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isExpanded
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isExpanded]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
      <div
        className="p-6 flex flex-col md:flex-row items-center md:items-start gap-4 cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="w-20 h-20 flex-shrink-0">
          <img
            src={degree.logo}
            alt={`${degree.university} logo`}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {degree.university}
            </h3>
            <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {degree.year}
            </span>
          </div>
          <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mt-1">
            {degree.name}
          </h4>
        </div>
        <div
          className="text-gray-500 dark:text-gray-400 transition-transform duration-300"
          style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out max-h-0"
      >
        <div className="p-6 pt-0">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {degree.description}
          </p>

          <div className="mb-4">
            <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Key Courses
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {degree.keyCourses.map((course, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2">
                    •
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {course}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Education() {
  const educationRef = useRef(null);

  const sliitLogo = "https://www.sliit.lk/sjhs/images/SLIIT_Logo_Crest.png";

  const degrees = [
    {
      university: "Sri Lanka Institute of Information Technology",
      name: "Bachelor of Software Engineering",
      year: "2023 - 2027",
      description:
        "Software engineering is the discipline of designing, creating and maintaining software by applying technologies and practices from computer science, project management, engineering, application domains, interface design, digital asset management and other fields. The program combines strong theoretical foundations with practical development experience, covering modern software engineering methodologies, cloud infrastructure, and DevOps practices.",
      keyCourses: [
        "Software Architecture & Design Patterns",
        "Cloud Computing & Distributed Systems",
        "DevOps Practices & CI/CD Pipelines",
        "Agile Project Management",
        "Database Systems & Data Modeling",
        "Web Application Development",
        "Mobile Application Development",
        "System Requirements Engineering",
        "Software Quality Assurance & Testing",
        "Human-Computer Interaction",
        "Software Project Management",
        "Artificial Intelligence & Machine Learning",
      ],
      logo: sliitLogo,
    },
  ];

  return (
    <div
      id="education"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24"
      ref={educationRef}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white text-center mb-12">
        Education
        <div className="mt-3 mx-auto h-1 w-16 md:w-24 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 dark:from-primary-400 dark:via-accent-400 dark:to-primary-400 rounded-full"></div>
      </h2>
      <div className="space-y-8">
        {degrees.map((degree, index) => (
          <EducationCard key={index} degree={degree} />
        ))}
      </div>
    </div>
  );
}

export default Education;
