import TypingAnimation from "./Typing_Automation/TypingAnimation";
import profileData from "../../../data/profile.json";

function HomePage() {
  const { greeting, description, buttons } = profileData.hero;
  const { name } = profileData.personal;

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
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      {/* Clean, minimal hero section */}
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          {greeting} <span className="gradient-text">{name}</span>
        </h1>
        
        <div className="h-12 flex justify-center mb-8">
          <TypingAnimation />
        </div>
        
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 mb-16">
          {buttons.map((button, index) => {
            if (button.download) {
              return (
                <a 
                  key={index}
                  href={button.link} 
                  download
                  className={`px-6 sm:px-8 py-3 font-medium rounded-lg transition-colors text-sm sm:text-base ${
                    button.type === 'primary' 
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'border border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  {button.text}
                </a>
              );
            }
            return (
              <button 
                key={index}
                onClick={() => scrollToSection(button.scrollTo)}
                className={`px-6 sm:px-8 py-3 font-medium rounded-lg transition-colors text-sm sm:text-base ${
                  button.type === 'primary' 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'border border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-gray-600'
                }`}
              >
                {button.text}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <button 
        onClick={() => scrollToSection('projects')}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer group"
        aria-label="Scroll down"
      >
        <span className="text-sm font-medium">Scroll Down</span>
        <div className="w-6 h-10 border-2 border-gray-700 rounded-full flex items-start justify-center p-2 group-hover:border-gray-500 transition-colors">
          <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-scroll group-hover:bg-gray-300"></div>
        </div>
      </button>
      
      <style jsx="true">{`
        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(12px);
            opacity: 0;
          }
        }
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default HomePage;
