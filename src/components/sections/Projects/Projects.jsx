import { useEffect, useRef } from "react";
import img3 from "../../../assets/Projects/todo-react.png";

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
        <a
          href={project.github}
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
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <span>View on GitHub</span>
        </a>
      </div>
    </div>
  );
}

function Projects() {
  const projectsRef = useRef(null);

  const projects = [
    {
      name: "DevOps Automation Pipeline",
      image: img3,
      description:
        "A comprehensive CI/CD pipeline created with Azure DevOps, automating the build, test, and deployment processes for a microservices application. Implements infrastructure as code with Terraform and containerizes services with Docker.",
      technologies: [
        "Azure DevOps",
        "Docker",
        "Terraform",
        "YAML",
        "Kubernetes",
      ],
      github: "https://github.com/DilZhanYapa/devops-automation-pipeline",
    },
    {
      name: "Cloud-Native Task Manager",
      image: img3,
      description:
        "A full-stack task management application built with React and Node.js, featuring cloud-native architecture. Implements containerized microservices, CI/CD with GitHub Actions, and automated scaling on Azure Kubernetes Service.",
      technologies: ["React", "Node.js", "Docker", "GitHub Actions", "Azure"],
      github: "https://github.com/DilZhanYapa/cloud-native-task-manager",
    },
    {
      name: "Infrastructure Monitoring Dashboard",
      image: img3,
      description:
        "A real-time monitoring solution that aggregates and visualizes system metrics from cloud infrastructure. Built with the MERN stack and integrates with Prometheus and Grafana for comprehensive observability.",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Prometheus"],
      github: "https://github.com/DilZhanYapa/infrastructure-monitoring",
    },
    {
      name: "Modern Portfolio Site",
      image: img3,
      description:
        "A responsive and modern portfolio website built using React and Tailwind CSS. Features clean architecture, responsive design, and CI/CD deployment pipeline. Showcases my skills and projects with an emphasis on DevOps and full-stack development.",
      technologies: ["React", "Tailwind CSS", "Vite", "GitHub Pages"],
      github: "https://github.com/DilZhanYapa/portfolio",
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
