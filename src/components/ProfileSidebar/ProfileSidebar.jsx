import profileData from "../../data/profile.json";
import navigationData from "../../data/navigation.json";
import profilePic from "../../assets/AboutMe/dp.png";

function ProfileSidebar() {
  const { name, title, bio } = profileData;
  const { navigation } = navigationData;

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
    <aside className="w-full lg:w-80 lg:sticky lg:top-24 h-fit">
      <div className="bg-[#111111] rounded-lg p-6 border border-gray-800">
        {/* Profile Image */}
        <div className="mb-6">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-800">
            <img 
              src={profilePic} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name and Title */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
          <p className="text-sm text-gray-400 mb-2">{title}</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            {bio}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* Navigation */}
        <nav className="mb-6">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Navigation</h4>
          <div className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-sm text-gray-400 hover:text-white transition-colors py-1"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}

export default ProfileSidebar;
