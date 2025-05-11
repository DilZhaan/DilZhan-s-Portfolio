import TypingAnimation from "./Typing_Automation/typingAnimation";
import { useEffect, useState, useRef } from "react";

function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate the parallax effect
  const calculateParallax = (x, y) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (x - centerX) / 50;
    const deltaY = (y - centerY) / 50;
    
    return { x: deltaX, y: deltaY };
  };

  const parallax = calculateParallax(mousePosition.x, mousePosition.y);

  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate position with offset for header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      // Scroll to position
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      console.error(`Cannot scroll to section "${sectionId}" - element not found`);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pattern-grid bg-[#141517] z-0 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-radial from-[#1A1B1E]/50 to-[#101113] opacity-80"></div>
      
      {/* Modern bottom border replacement - gradient divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-500/60 to-transparent z-10"></div>
      
      {/* Animated accent circle */}
      <div 
        className="absolute rounded-full bg-accent-500/20 blur-3xl animate-pulse"
        style={{ 
          width: '50vw', 
          height: '50vw', 
          left: `calc(50% + ${parallax.x * 2}px)`, 
          top: `calc(50% + ${parallax.y * 2}px)`,
          transform: 'translate(-50%, -50%) scale(1.2)',
          filter: 'blur(100px)',
          opacity: 0.4
        }}
      ></div>
      
      {/* Second animated accent circle */}
      <div 
        className="absolute rounded-full bg-primary-600/20 blur-3xl"
        style={{ 
          width: '40vw', 
          height: '40vw', 
          right: '10%',
          bottom: '10%',
          transform: `translate(${parallax.x * -1}px, ${parallax.y * -1}px) scale(${1 + scrollY * 0.0005})`,
          filter: 'blur(80px)',
          opacity: 0.3
        }}
      ></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-accent-400"
            style={{ 
              width: `${Math.random() * 4 + 2}px`, 
              height: `${Math.random() * 4 + 2}px`, 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              transform: `translateY(${Math.sin((Date.now() + i * 1000) / 2000) * 10}px)`,
              animation: `floatParticle ${Math.random() * 5 + 5}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>

      <div ref={containerRef} className="max-w-5xl w-full text-center relative z-10 py-20">
        <div className="transform transition-all duration-700 hover:translate-y-[-5px] mb-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-4 drop-shadow-lg">
            Hi there...!
          </h1>
          <div className="text-5xl md:text-6xl lg:text-7xl font-bold mt-4 mb-6 text-accent-400">
              I'm DilZhan Yapa
          </div>
          <div className="h-16 flex justify-center">
          <TypingAnimation />
          </div>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="#" 
              className="group px-8 py-4 bg-accent-600 text-white font-medium rounded-lg relative overflow-hidden shadow-lg shadow-accent-900/20"
            >
              <span className="relative z-10 flex items-center justify-center">
                Download CV
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-accent-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </a>
            <button 
              onClick={() => scrollToSection('contact')}
              className="group px-8 py-4 border-2 border-accent-500 text-accent-400 font-medium rounded-lg relative overflow-hidden bg-transparent hover:text-white transition-colors duration-300 shadow-lg shadow-accent-900/10"
            >
              <span className="relative z-10 flex items-center justify-center">
                Contact Me
              </span>
              <span className="absolute inset-0 bg-accent-500 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300"></span>
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 animate-bounce">
          <span className="text-sm mb-2">Scroll Down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// Add CSS for the floating particles animation
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes floatParticle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
`;
document.head.appendChild(styleEl);

export default HomePage;
