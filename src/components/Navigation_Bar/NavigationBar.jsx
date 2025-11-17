import { useState, useEffect } from "react";
import navigationData from "../../data/navigation.json";

function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { navigation } = navigationData;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-gray-800' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a href="/" className="text-lg font-semibold text-white hover:text-gray-300 transition-colors">
              &lt;/&gt; DilZhan Yapa
            </a>
          </div>
          
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation && navigation.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
