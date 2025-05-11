import profilePic from "../../../assets/AboutMe/image1.jpg";
import { useEffect, useRef } from "react";

function AboutMe() {
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (!descriptionRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("opacity-0", "translate-y-6");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const paragraphs = descriptionRef.current.querySelectorAll("p");
    paragraphs.forEach((para, index) => {
      para.style.transitionDelay = `${index * 150}ms`;
      observer.observe(para);
    });

    return () => {
      paragraphs.forEach((para) => observer.unobserve(para));
    };
  }, []);

  return (
    <div id="about" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-20 w-64 h-64 rounded-full bg-primary-100 dark:bg-primary-900 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-20 w-80 h-80 rounded-full bg-purple-100 dark:bg-purple-900 opacity-20 blur-3xl"></div>
      
      {/* Small decorative circles */}
      <div className="absolute top-1/4 left-10 w-6 h-6 rounded-full bg-primary-400 dark:bg-primary-600 opacity-20"></div>
      <div className="absolute top-3/4 right-10 w-4 h-4 rounded-full bg-purple-400 dark:bg-purple-600 opacity-20"></div>
      <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-yellow-400 dark:bg-yellow-600 opacity-30"></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>
      
      <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-16 z-10">
        <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0">
          {/* Decorative ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent-400/30 animate-spin-slow"></div>
          
          {/* Profile image container */}
          <div className="absolute inset-2 overflow-hidden rounded-full shadow-xl ring-4 ring-white dark:ring-gray-800">
            <img 
              src={profilePic} 
              alt="Profile Picture" 
              className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          {/* Accent dot */}
          <div className="absolute top-1/2 -right-2 w-4 h-4 rounded-full bg-accent-500 shadow-lg shadow-accent-500/50"></div>
        </div>
        
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-block relative mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              About me
            </h2>
            <div className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 dark:from-primary-400 dark:via-accent-400 dark:to-primary-400 rounded-full"></div>
          </div>
          
          <div ref={descriptionRef} className="space-y-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed opacity-0 translate-y-6 transition-all duration-700 ease-out">
              I'm a versatile Software Engineering undergraduate at the <span className="text-accent-600 dark:text-accent-400 font-medium">Sri Lanka Institute of Information Technology</span> with a dual focus on Full-Stack Development and DevOps Engineering. My approach combines academic knowledge with hands-on experience to create end-to-end solutions that are both user-friendly and operationally robust.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed opacity-0 translate-y-6 transition-all duration-700 ease-out">
              Where others see development and operations as separate domains, I bridge these worlds by embracing both the creative aspects of front-end development and the systematic approach of infrastructure automation. My projects demonstrate not just functional solutions, but thoughtfully architected systems that connect responsive interfaces with reliable backends while implementing DevOps best practices for seamless deployment and scaling.
            </p>
          </div>
          
          <div className="mt-10 flex flex-wrap gap-3 justify-center lg:justify-start">
            <span className="px-4 py-2 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 rounded-full text-sm font-medium text-primary-800 dark:text-primary-300 shadow-sm">DevOps Engineer</span>
            <span className="px-4 py-2 bg-gradient-to-r from-accent-50 to-accent-100 dark:from-gray-800 dark:to-gray-700 rounded-full text-sm font-medium text-accent-800 dark:text-accent-300 shadow-sm">Full Stack Developer</span>
            <span className="px-4 py-2 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 rounded-full text-sm font-medium text-purple-800 dark:text-purple-300 shadow-sm">CI/CD Specialist</span>
            <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 rounded-full text-sm font-medium text-blue-800 dark:text-blue-300 shadow-sm">Cloud Enthusiast</span>
          </div>
        </div>
      </div>
      
      {/* Add keyframe animation for the slow spin effect */}
      <style jsx="true">{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default AboutMe;
