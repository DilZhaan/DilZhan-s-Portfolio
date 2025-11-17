import profilePic from "../../../assets/AboutMe/dp.png";
import aboutData from "../../../data/about.json";

function AboutMe() {
  const { title, paragraphs, badges, highlightText } = aboutData;

  return (
    <section id="about" className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          {title}
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 mx-auto md:mx-0">
            <img 
              src={profilePic} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          
          <div className="flex-1 space-y-4">
            {paragraphs.map((paragraph, index) => {
              const parts = paragraph.split(highlightText);
              return (
                <p key={index} className="text-gray-400 leading-relaxed">
                  {parts.map((part, i) => (
                    <span key={i}>
                      {part}
                      {i < parts.length - 1 && (
                        <span className="text-white font-medium">
                          {highlightText}
                        </span>
                      )}
                    </span>
                  ))}
                </p>
              );
            })}
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded border border-gray-700"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
