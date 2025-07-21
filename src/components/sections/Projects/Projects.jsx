import { useEffect, useRef } from "react";
import eComerceB from "../../../assets/Projects/ecommerce-front.jpg";
import avanes from "../../../assets/Projects/avanes.jpg";
import portfolio from "../../../assets/Projects/portfolio.jpg";
import budgeteer from "../../../assets/Projects/budgetApp.png";

function ProjectCard({ project }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 h-full flex flex-col group">
      <div className="aspect-video w-full overflow-hidden relative">
        <img
          src={project.image}
          alt={`${project.name} preview`}
          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-xl font-bold text-white">{project.name}</h3>
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col bg-white dark:bg-gray-800 relative">
        {/* Diagonal corner accent */}
        <div className="absolute top-0 right-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 transform rotate-45 translate-x-6 -translate-y-6"></div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 relative z-10">
          {project.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
          {project.description}
        </p>
        <div className="mb-4">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full transition-colors duration-300 hover:bg-primary-100 dark:hover:bg-primary-900"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        {/* Action buttons container */}
        <div className="flex flex-col gap-3">
          {/* GitHub buttons */}
          <div className="flex flex-col gap-2">
            {Array.isArray(project.github) ? (
              // Multiple GitHub repositories
              project.github.map((githubUrl, index) => (
                <a
                  key={index}
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] shadow-sm hover:shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>
                    {index === 0 ? "Backend" : index === 1 ? "Frontend" : `Repo ${index + 1}`}
                  </span>
                </a>
              ))
            ) : (
              // Single GitHub repository
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] shadow-sm hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>View on GitHub</span>
              </a>
            )}
          </div>

          {/* Live demo button */}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-all duration-300 transform hover:translate-y-[-2px] shadow-sm hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15,3 21,3 21,9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const projectsRef = useRef(null);

  const projects = [
    {
      name: "E-Commerce Platform (Full Stack)",
      image: eComerceB, 
      description:
        "Engineered a comprehensive e-commerce platform with a robust Node.js/Express backend and a feature-complete React/Redux frontend. Implemented RESTful API endpoints, MongoDB data modeling, and secure user authentication using JWT. Developed responsive UI components for product browsing, cart management, and checkout, with Tailwind CSS for design. Integrated backend services for inventory management, order processing, and payment gateway. Employed advanced security measures, error handling, and middleware for request validation. Optimized performance across the stack with caching, lazy loading, code splitting, and thorough API documentation and unit tests to ensure reliability and maintainability.",
      technologies: [
        "MongoDB",
        "Express",
        "Node.js",
        "React",
        "Redux",
        "Tailwind CSS",
        "JWT",
        "WebSockets",
      ],
      github: [
        "https://github.com/DilZhaan/E-Commerce-Sys-BackEnd-MERN",
        "https://github.com/DilZhaan/E-Commerce-Sys-FrontEnd-MERN",
      ],
      live: "https://store.dilzhan.online",
    },
    {
      name: "AVANES Vision - AI Voice Assistant Net Exam System",
      image: avanes,
      description:
        "Architected an innovative education platform combining Java Spring Boot backend and React frontend to revolutionize accessibility. Implemented voice commands using WebSockets and Vosk for hands-free navigation, plus text-to-speech for content delivery. Created secure authentication using JWT, device fingerprinting, and IP verification. Developed a comprehensive assessment system including automatic grading, progress tracking, and administrative controls. Applied accessibility-first design throughout, ensuring WCAG compliance while creating a responsive UI using Tailwind CSS and Framer Motion.",
      technologies: [
        "Java Spring Boot",
        "React",
        "WebSockets",
        "JWT",
        "Tailwind CSS",
        "Framer Motion",
        "Vosk",
      ],
      github: "https://github.com/AVANES-Vision",
    },
    {
      name: "Modern Portfolio Site",
      image: portfolio,
      description:
        "A responsive and modern portfolio website built using React and Tailwind CSS. Features clean architecture, responsive design, and CI/CD deployment pipeline. Showcases my skills and projects with an emphasis on DevOps and full-stack development.",
      technologies: ["React", "Tailwind CSS", "Vite", "GitHub Pages"],
      github: "https://github.com/DilZhaan/DilZhan-s-Portfolio",
    },
    {
      name: "Budgeteer – Financial Tracking App",
      image: budgeteer,
      description:
        "Developed a user-friendly financial tracking app designed to help individuals manage income, expenses, and budgets efficiently. Budgeteer empowers users to set savings goals, analyze spending habits, and generate detailed financial reports. Features include real-time transaction tracking, category analysis, secure data storage, and a clean interface for intuitive navigation. Available for Android and iOS, Budgeteer makes financial management simple and accessible.",
      technologies: ["Kotlin", "Android"],
      github: "https://github.com/DilZhaan/Budgeteer-Financial-Tracking-App",
    },
  ];

  useEffect(() => {
    if (!projectsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-10");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const projectElements =
      projectsRef.current.querySelectorAll(".project-card");
    projectElements.forEach((element) => observer.observe(element));

    return () => {
      projectElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <div
      id="projects"
      className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-0 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl opacity-30 -translate-x-1/2"></div>
      <div className="absolute bottom-10 right-0 w-64 h-64 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 translate-x-1/2"></div>

      {/* Decorative lines */}
      <div className="absolute right-10 top-10 opacity-20 dark:opacity-10 pointer-events-none">
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 50H100"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
          <path
            d="M50 0L50 100"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
          <path
            d="M0 0L100 100"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
          <path
            d="M100 0L0 100"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white inline-block relative">
          Projects
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 w-16 md:w-24 bg-primary-500 dark:bg-primary-400 rounded-full"></div>
        </h2>
      </div>

      <div
        ref={projectsRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-10 relative z-10"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card opacity-0 translate-y-10 transition-all duration-700 ease-out"
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern
            id="circleGrid"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="20" cy="20" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circleGrid)" />
        </svg>
      </div>
    </div>
  );
}

export default Projects;