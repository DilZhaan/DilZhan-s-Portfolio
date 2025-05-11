import HomePage from "../components/sections/HomePage/HomePage.jsx";
import NavigationBar from "../components/Navigation_Bar/NavigationBar.jsx";
import AboutMe from "../components/sections/AboutMe/AboutMe.jsx";
import Projects from "../components/sections/Projects/Projects.jsx";
import Skills from "../components/sections/Skills/Skills.jsx";
import Education from "../components/sections/Education/Education.jsx";
import Contact from "../components/sections/Contact/Contact.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useEffect } from "react";

function Main() {
  // Force dark mode and setup smooth scrolling
  useEffect(() => {
    // Add dark class to HTML element
    document.documentElement.classList.add('dark');
    
    // Ensure proper scroll behavior is set
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Improve navigation by adding proper scroll handling
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Scroll with offset for fixed header
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    // Add event listeners to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // Log section IDs for debugging
    console.log("Checking sections in document:");
    ["home", "about", "projects", "skills", "education", "contact"].forEach(id => {
      const element = document.getElementById(id);
      console.log(`Section ${id}: ${element ? 'Found' : 'Not found'}`);
    });

    // Cleanup event listeners
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="bg-dark-800 text-gray-100 min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <NavigationBar />
      </div>
      
      {/* Add padding-top to first section to account for fixed header */}
      <div className="pt-16">
        <HomePage />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AboutMe />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </div>
      
      <Footer />
    </div>
  );
}

export default Main;
