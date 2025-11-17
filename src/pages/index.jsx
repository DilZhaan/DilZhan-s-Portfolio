import HomePage from "../components/sections/HomePage/HomePage.jsx";
import NavigationBar from "../components/Navigation_Bar/NavigationBar.jsx";
import ProfileSidebar from "../components/ProfileSidebar/ProfileSidebar.jsx";
import AboutMe from "../components/sections/AboutMe/AboutMe.jsx";
import Projects from "../components/sections/Projects/Projects.jsx";
import Skills from "../components/sections/Skills/Skills.jsx";
import GitHubStats from "../components/sections/GitHubStats/GitHubStats.jsx";
import Experience from "../components/sections/Experience/Experience.jsx";
import Education from "../components/sections/Education/Education.jsx";
import Certifications from "../components/sections/Certifications/Certifications.jsx";
import Blog from "../components/sections/Blog/Blog.jsx";
import Contact from "../components/sections/Contact/Contact.jsx";
import Footer from "../components/Footer/Footer.jsx";

function Main() {
  return (
    <div className="bg-[#0a0a0a] text-gray-100 min-h-screen">
      <NavigationBar />
      
      {/* Main Content Area with Two-Column Layout */}
      <div className="pt-16">
        {/* Hero Section - Full Width */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HomePage />
        </div>
        
        {/* Two-Column Layout for Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-0">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <ProfileSidebar />
            
            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <AboutMe />
              <Projects />
              <Blog />
              <GitHubStats />
              <Skills />
              <Experience />
              <Education />
              <Certifications />
              <Contact />
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Main;
