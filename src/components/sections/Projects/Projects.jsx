import { useState, useEffect } from "react";

function ProjectCard({ project }) {
  // Extract topics/technologies from GitHub
  const technologies = project.topics || [];
  
  // For private repos, mask the name and description
  const isPrivate = project.private;
  
  const maskText = (text) => {
    if (!text) return '***';
    const words = text.split(' ');
    return words.map(word => {
      if (word.length <= 3) return word;
      return word.substring(0, 3) + '*'.repeat(Math.min(word.length - 3, 5));
    }).join(' ');
  };
  
  const displayName = isPrivate ? maskText(project.name) : project.name;
  const displayDescription = isPrivate 
    ? 'Private repository - Details hidden for confidentiality' 
    : (project.description || 'No description available');
  
  return (
    <article className="bg-[#111111] rounded-lg border border-gray-800 p-6 hover:border-gray-700 transition-all duration-300 group">
      {/* Project Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className={`text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors break-words ${
            isPrivate ? 'text-gray-500' : 'text-white'
          }`}>
            {displayName}
          </h3>
          <div className="flex items-center gap-3 text-sm text-gray-500 flex-wrap">
            {project.language && !isPrivate && (
              <div className="flex items-center gap-1.5">
                <span 
                  className="w-3 h-3 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: getLanguageColor(project.language) }}
                ></span>
                <span className="truncate">{project.language}</span>
              </div>
            )}
            {isPrivate && (
              <span className="px-2 py-0.5 text-xs bg-gray-800 text-gray-400 rounded border border-gray-700 flex-shrink-0">
                Private Repository
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Project Description */}
      <div className="mb-4">
        <p className={`text-sm leading-relaxed line-clamp-3 ${
          isPrivate ? 'text-gray-600 italic' : 'text-gray-400'
        }`}>
          {displayDescription}
        </p>
      </div>

      {/* GitHub Stats - Hide for private repos */}
      {!isPrivate && (
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          {project.stargazers_count > 0 && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
              <span>{project.stargazers_count}</span>
            </div>
          )}
          {project.forks_count > 0 && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878zm3.75 7.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm3-8.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
              </svg>
              <span>{project.forks_count}</span>
            </div>
          )}
          {project.open_issues_count > 0 && (
            <div className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z"/>
              </svg>
              <span>{project.open_issues_count}</span>
            </div>
          )}
        </div>
      )}

      {/* Technologies/Topics - Hide for private repos */}
      {!isPrivate && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {technologies.slice(0, 5).map((tech, index) => (
            <span
              key={index}
              className="text-xs px-2.5 py-1 bg-gray-800/50 text-gray-300 rounded-md border border-gray-700/50 hover:border-gray-600 transition-colors break-all"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 5 && (
            <span className="text-xs px-2.5 py-1 bg-gray-800/50 text-gray-400 rounded-md border border-gray-700/50 flex-shrink-0">
              +{technologies.length - 5}
            </span>
          )}
        </div>
      )}

      {/* Links */}
      <div className="flex gap-4 pt-3 border-t border-gray-800">
        {isPrivate ? (
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>
            <span>Private Repository</span>
          </div>
        ) : (
          <>
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              <span>Code</span>
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Live Demo</span>
              </a>
            )}
          </>
        )}
      </div>
    </article>
  );
}

// Language color mapping
function getLanguageColor(language) {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Shell: '#89e051',
    Vue: '#41b883',
    React: '#61dafb'
  };
  return colors[language] || '#8b949e';
}

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY = 6;

  const displayedProjects = showAll ? projects : projects.slice(0, INITIAL_DISPLAY);
  const hasMoreProjects = projects.length > INITIAL_DISPLAY;

  useEffect(() => {
    const fetchGitHubProjects = async () => {
      const GITHUB_USERNAME = 'DilZhaan';
      const EXCLUDED_REPOS = ['DilZhaan']; // Add repos to exclude
      const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
      // Use different cache keys for authenticated vs unauthenticated requests
      const CACHE_KEY = GITHUB_TOKEN ? 'github_projects_cache_auth' : 'github_projects_cache_public';
      const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
      
      console.log('GitHub Token present:', !!GITHUB_TOKEN);
      
      try {
        setLoading(true);
        
        // Check cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const isExpired = Date.now() - timestamp > CACHE_DURATION;
          
          if (!isExpired) {
            console.log('Using cached projects');
            setProjects(data);
            setLoading(false);
            return;
          }
        }
        
        // Prepare headers with authentication if token exists
        const headers = {};
        if (GITHUB_TOKEN) {
          headers.Authorization = `token ${GITHUB_TOKEN}`;
        }
        
        // Fetch all repositories (both public and private if token has repo scope)
        // Using /user/repos instead of /users/{username}/repos to get private repos
        const endpoint = GITHUB_TOKEN 
          ? `https://api.github.com/user/repos?per_page=100&sort=updated&affiliation=owner`
          : `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;
        
        console.log('Fetching from:', GITHUB_TOKEN ? '/user/repos (authenticated)' : '/users/{username}/repos (public)');
        
        const response = await fetch(endpoint, { headers });
        
        if (!response.ok) {
          // If rate limited, try to use expired cache
          if (cachedData) {
            const { data } = JSON.parse(cachedData);
            setProjects(data);
            setLoading(false);
            return;
          }
          throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        
        console.log('Total repos fetched:', repos.length);
        console.log('Private repos:', repos.filter(r => r.private).length);
        
        // Filter and enhance repos
        const filteredRepos = repos
          .filter(repo => {
            // Exclude specific repos
            if (EXCLUDED_REPOS.includes(repo.name)) return false;
            // Exclude forks (optional - remove this line to include forks)
            if (repo.fork) return false;
            return true;
          })
          .map(repo => ({
            id: repo.id,
            name: repo.name,
            description: repo.description,
            html_url: repo.html_url,
            homepage: repo.homepage,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            open_issues_count: repo.open_issues_count,
            topics: repo.topics,
            private: repo.private,
            created_at: repo.created_at,
            updated_at: repo.updated_at
          }));

        // Cache the filtered repos
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: filteredRepos,
          timestamp: Date.now()
        }));

        setProjects(filteredRepos);
      } catch (err) {
        console.error('Error fetching GitHub projects:', err);
        setError('Failed to load projects from GitHub');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProjects();
  }, []);

  return (
    <section id="projects" className="py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-white mb-2">Projects</h2>
          <p className="text-gray-400">
            A curated collection of my software development projects from GitHub
          </p>
        </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      )}

      {error && (
        <div className="text-center py-20">
          <p className="text-gray-400">{error}</p>
        </div>
      )}

      {!loading && !error && projects.length > 0 && (
        <>
          <div className="grid grid-cols-1 gap-5">
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {hasMoreProjects && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-8 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-colors flex items-center gap-2"
              >
                <span>{showAll ? 'Show Less' : 'Show More'}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform ${showAll ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400">No projects found on GitHub</p>
        </div>
      )}
      </div>
    </section>
  );
}

export default Projects;