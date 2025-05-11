import { useState, useEffect } from "react";

function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [sectionsExist, setSectionsExist] = useState({});
  const [sectionPositions, setSectionPositions] = useState({});

  useEffect(() => {
    const checkSections = () => {
      const sectionIds = ["home", "about", "projects", "skills", "education", "contact"];
      const exists = {};
      const positions = {};
      
      sectionIds.forEach(id => {
        const element = document.getElementById(id);
        exists[id] = !!element;
        if (element) {
          positions[id] = element.offsetTop;
          console.log(`Section with ID "${id}" found at position:`, element.offsetTop);
        } else {
          console.warn(`Section with ID "${id}" not found in the document.`);
        }
      });
      
      setSectionsExist(exists);
      setSectionPositions(positions);
      return { exists, positions };
    };

    // Wait for DOM to be fully rendered
    setTimeout(checkSections, 1000);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      const scrollPosition = window.scrollY + 100; 
      
      const sectionIds = Object.keys(sectionPositions).sort((a, b) => sectionPositions[a] - sectionPositions[b]);
      
      for (let i = 0; i < sectionIds.length; i++) {
        const currentId = sectionIds[i];
        const nextId = i < sectionIds.length - 1 ? sectionIds[i + 1] : null;
        
        if (!nextId && scrollPosition >= sectionPositions[currentId]) {

          setActiveSection(currentId);
          break;
        } else if (nextId && scrollPosition >= sectionPositions[currentId] && scrollPosition < sectionPositions[nextId]) {
          setActiveSection(currentId);
          break;
        } else if (i === 0 && scrollPosition < sectionPositions[currentId]) {
          setActiveSection(currentId);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    const handleResize = () => {
      checkSections();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [sectionPositions]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      setActiveSection(sectionId);
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      console.error(`Cannot scroll to section "${sectionId}" - element not found`);
    }
    
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const isActive = (sectionId) => activeSection === sectionId;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#141517]/90 backdrop-blur-md shadow-lg shadow-[#101113]/40' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-accent-400 font-bold text-xl hover:text-accent-300 transition-colors"
            >
              DilZhan YaPa
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection('home')}
              className={`px-2 py-1 relative group ${isActive('home') ? 'text-accent-300 font-semibold' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              Home
              <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-accent-400 transform ${isActive('home') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} origin-left transition-transform duration-300`}></span>
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`px-2 py-1 relative group ${isActive('about') ? 'text-accent-300 font-semibold' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              About
              <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-accent-400 transform ${isActive('about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} origin-left transition-transform duration-300`}></span>
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className={`px-2 py-1 relative group ${isActive('projects') ? 'text-accent-300 font-semibold' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              Projects
              <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-accent-400 transform ${isActive('projects') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} origin-left transition-transform duration-300`}></span>
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className={`px-2 py-1 relative group ${isActive('skills') ? 'text-accent-300 font-semibold' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              Skills
              <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-accent-400 transform ${isActive('skills') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} origin-left transition-transform duration-300`}></span>
            </button>
            <button
              onClick={() => scrollToSection('education')}
              className={`px-2 py-1 relative group ${isActive('education') ? 'text-accent-300 font-semibold' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              Education
              <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-accent-400 transform ${isActive('education') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} origin-left transition-transform duration-300`}></span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-2 py-1 relative group ${isActive('contact') ? 'text-accent-300 font-semibold' : 'text-gray-300 hover:text-white'} transition-colors`}
            >
              Contact
              <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-accent-400 transform ${isActive('contact') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} origin-left transition-transform duration-300`}></span>
            </button>
        </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-accent-400 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-[#1A1B1E]/95 backdrop-blur-md shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection('home')}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${isActive('home') ? 'bg-accent-600/30 text-accent-300 font-semibold' : 'text-gray-300 hover:bg-[#25262B] hover:text-white'}`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${isActive('about') ? 'bg-accent-600/30 text-accent-300 font-semibold' : 'text-gray-300 hover:bg-[#25262B] hover:text-white'}`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${isActive('projects') ? 'bg-accent-600/30 text-accent-300 font-semibold' : 'text-gray-300 hover:bg-[#25262B] hover:text-white'}`}
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${isActive('skills') ? 'bg-accent-600/30 text-accent-300 font-semibold' : 'text-gray-300 hover:bg-[#25262B] hover:text-white'}`}
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection('education')}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${isActive('education') ? 'bg-accent-600/30 text-accent-300 font-semibold' : 'text-gray-300 hover:bg-[#25262B] hover:text-white'}`}
            >
              Education
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${isActive('contact') ? 'bg-accent-600/30 text-accent-300 font-semibold' : 'text-gray-300 hover:bg-[#25262B] hover:text-white'}`}
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavigationBar;
