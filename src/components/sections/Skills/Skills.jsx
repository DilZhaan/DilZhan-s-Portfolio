import { useEffect, useRef } from "react";

function SkillIcon({ imageUrl, name, delay }) {
  return (
    <div 
      className="flex flex-col items-center opacity-0 translate-y-4 animate-fadeIn"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-110 hover:rotate-3 flex items-center justify-center p-3 mb-2 relative group">
        <div className="absolute inset-0 bg-primary-400/10 dark:bg-primary-400/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
        <img src={imageUrl} alt={name} className="w-full h-full object-contain relative z-10" />
      </div>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</p>
    </div>
  );
}

function SkillSection({ title, skills }) {
  return (
    <div className="mb-16 relative">
      {title && (
        <div className="mb-8 relative inline-block">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">{title}</h3>
          <div className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 dark:from-primary-400 dark:via-accent-400 dark:to-primary-400 rounded-full w-12 md:w-16"></div>
        </div>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 md:gap-8">
        {skills.map((skill, index) => (
          <SkillIcon 
            key={index} 
            imageUrl={skill.imageUrl} 
            name={skill.name} 
            delay={100 + index * 50}
          />
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const skillsRef = useRef(null);

  // Programming Languages
  const programmingLanguages = [
    { 
      name: "Java", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original-wordmark.svg" 
    },
    { 
      name: "Python", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" 
    },
    { 
      name: "C", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg" 
    },
    { 
      name: "C++", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" 
    },
    { 
      name: "Kotlin", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kotlin/kotlin-original.svg" 
    },
    { 
      name: "JavaScript", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" 
    },
  ];

  // Web & App Technologies
  const webTechnologies = [
    { 
      name: "React", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" 
    },
    { 
      name: "Node.js", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" 
    },
    { 
      name: "Express", 
      imageUrl: "https://raw.githubusercontent.com/DilZhaan/DilZhaan/main/express.svg" 
    },
    { 
      name: "MongoDB", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" 
    },
    { 
      name: "Flutter", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg" 
    },
    { 
      name: "Firebase", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-original.svg" 
    },
  ];

  // DevOps & Tools
  const devOpsTools = [
    { 
      name: "Docker", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" 
    },
    { 
      name: "Git", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original-wordmark.svg" 
    },
    { 
      name: "MySQL", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg" 
    },
    { 
      name: "HTML5", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" 
    },
    { 
      name: "CSS3", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-plain-wordmark.svg" 
    },
    { 
      name: "Tailwind", 
      imageUrl: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg" 
    },
  ];

  useEffect(() => {
    // Add the keyframes for the fadeIn animation
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(16px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div id="skills" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden" ref={skillsRef}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-1/4 -mt-10 w-72 h-72 rounded-full bg-primary-100 dark:bg-primary-900/20 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 -mb-10 w-80 h-80 rounded-full bg-purple-100 dark:bg-purple-900/20 opacity-30 blur-3xl"></div>
      
      {/* Animated dot patterns */}
      <div className="absolute right-10 top-1/4 opacity-20 dark:opacity-10">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400"
              style={{
                animationName: 'pulse',
                animationDuration: '3s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: `${i * 0.1}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white inline-block relative">
            Tech Stack & Tools
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-1 w-16 md:w-24 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 dark:from-primary-400 dark:via-accent-400 dark:to-primary-400 rounded-full"></div>
          </h2>
        </div>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-10 relative">
          {/* Connect dots pattern */}
          <div className="absolute inset-0 overflow-hidden opacity-5 dark:opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotGrid)" />
            </svg>
          </div>
          
          <SkillSection title="Programming Languages" skills={programmingLanguages} />
          <SkillSection title="Web & App Technologies" skills={webTechnologies} />
          <SkillSection title="DevOps & Tools" skills={devOpsTools} />
        </div>
      </div>
      
      {/* Add keyframe animation for the pulse effect */}
      <style jsx="true">{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

export default Skills;
