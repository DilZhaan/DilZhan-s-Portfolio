import skillsData from "../../../data/skills.json";

function SkillIcon({ imageUrl, name }) {
  return (
    <div className="flex flex-col items-center group">
      <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center p-2 mb-2 transition-transform duration-300 group-hover:scale-110">
        <img src={imageUrl} alt={name} className="w-full h-full object-contain opacity-80 group-hover:opacity-100" />
      </div>
      <p className="text-xs text-gray-500 text-center">{name}</p>
    </div>
  );
}

function SkillSection({ title, skills }) {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      {title && (
        <h3 className="text-lg font-semibold text-gray-400 mb-6">{title}</h3>
      )}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {skills.map((skill, index) => (
          <SkillIcon 
            key={index} 
            imageUrl={skill.imageUrl} 
            name={skill.name} 
          />
        ))}
      </div>
    </div>
  );
}

function Skills() {
  const { sectionTitle, categories } = skillsData;

  return (
    <section id="skills" className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          {sectionTitle}
        </h2>
        
        {categories && categories.length > 0 ? (
          <div className="space-y-8">
            {categories.map((category, index) => (
              <SkillSection 
                key={index}
                title={category.title} 
                skills={category.skills || []} 
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No skills information available</p>
        )}
      </div>
    </section>
  );
}

export default Skills;
