import { useState, useEffect } from 'react';
import githubStatsConfig from '../../../data/githubStats.json';
import profileData from '../../../data/profile.json';

function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { 
    title, 
    description, 
    labels, 
    dummyData, 
    errorMessage, 
    activityBars 
  } = githubStatsConfig;
  
  // Get GitHub username from profile
  const githubUsername = profileData.social.github.username;

  useEffect(() => {
    fetchGitHubStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGitHubStats = async () => {
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
    // Use different cache keys for authenticated vs unauthenticated requests
    const CACHE_KEY = GITHUB_TOKEN ? 'github_stats_cache_auth' : 'github_stats_cache_public';
    const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
    
    try {
      setLoading(true);
      
      // Check cache first
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;
        
        if (!isExpired) {
          setStats(data);
          setLoading(false);
          return;
        }
      }
      
      // Prepare headers with authentication if token exists
      const headers = {};
      if (GITHUB_TOKEN) {
        headers.Authorization = `token ${GITHUB_TOKEN}`;
      }
      
      // Fetch user data
      const userResponse = await fetch(
        `https://api.github.com/users/${githubUsername}`,
        { headers }
      );
      if (!userResponse.ok) {
        // If rate limited, try to use expired cache or dummy data
        if (cachedData) {
          const { data } = JSON.parse(cachedData);
          setStats(data);
          setLoading(false);
          return;
        }
        throw new Error('Failed to fetch user data');
      }
      const userData = await userResponse.json();

      // Fetch all repositories (both public and private if token has repo scope)
      const reposEndpoint = GITHUB_TOKEN
        ? `https://api.github.com/user/repos?per_page=100&affiliation=owner`
        : `https://api.github.com/users/${githubUsername}/repos?per_page=100`;
      
      const reposResponse = await fetch(reposEndpoint, { headers });
      if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
      const repos = await reposResponse.json();

      // Calculate total stars, forks, and repos
      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
      const publicRepos = repos.filter(repo => !repo.fork).length;

      // Fetch recent activity (events)
      const eventsResponse = await fetch(
        `https://api.github.com/users/${githubUsername}/events/public?per_page=100`,
        { headers }
      );
      let recentCommits = 0;
      let contributionStreak = 0;
      let longestStreak = 0;
      
      if (eventsResponse.ok) {
        const events = await eventsResponse.json();
        
        // Count push events (commits) in the last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        recentCommits = events.filter(event => 
          event.type === 'PushEvent' && 
          new Date(event.created_at) >= thirtyDaysAgo
        ).reduce((sum, event) => {
          return sum + (event.payload.commits?.length || 0);
        }, 0);

        // Calculate contribution streak (simplified version)
        const pushEvents = events.filter(e => e.type === 'PushEvent');
        if (pushEvents.length > 0) {
          const dates = [...new Set(pushEvents.map(e => 
            new Date(e.created_at).toDateString()
          ))].sort((a, b) => new Date(b) - new Date(a));
          
          // Current streak
          let currentStreak = 0;
          let today = new Date().toDateString();
          let yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          yesterday = yesterday.toDateString();
          
          if (dates.includes(today) || dates.includes(yesterday)) {
            currentStreak = 1;
            let checkDate = new Date(dates.includes(today) ? today : yesterday);
            
            for (let i = 1; i < dates.length; i++) {
              checkDate.setDate(checkDate.getDate() - 1);
              if (dates.includes(checkDate.toDateString())) {
                currentStreak++;
              } else {
                break;
              }
            }
          }
          
          contributionStreak = currentStreak;
          longestStreak = dates.length; // Simplified - just use unique active days
        }
      }

      setStats({
        totalRepos: publicRepos,
        totalStars,
        totalForks,
        followers: userData.followers,
        following: userData.following,
        recentCommits: recentCommits || dummyData.recentCommits,
        contributionStreak: contributionStreak || dummyData.currentStreak,
        longestStreak: longestStreak || dummyData.longestStreak,
        profileCreated: userData.created_at
      });

      // Cache the stats
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: {
          totalRepos: publicRepos,
          totalStars,
          totalForks,
          followers: userData.followers,
          following: userData.following,
          recentCommits: recentCommits || dummyData.recentCommits,
          contributionStreak: contributionStreak || dummyData.currentStreak,
          longestStreak: longestStreak || dummyData.longestStreak,
          profileCreated: userData.created_at
        },
        timestamp: Date.now()
      }));

    } catch (err) {
      console.error('Error fetching GitHub stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="github-stats" className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            {title}
          </h2>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="github-stats" className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
            {title}
          </h2>
          <div className="text-center py-12">
            <p className="text-gray-400">{errorMessage}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!stats) return null;

  return (
    <section id="github-stats" className="py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-gray-400 mb-12">
          {description}
        </p>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Last 30 Days */}
          <div className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              {labels.last30Days}
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats.recentCommits}
            </div>
            <div className="text-sm text-gray-400">
              {labels.commits}
            </div>
          </div>

          {/* Current Streak */}
          <div className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              {labels.currentStreak}
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats.contributionStreak}
            </div>
            <div className="text-sm text-gray-400">
              {labels.days}
            </div>
          </div>

          {/* Longest Streak */}
          <div className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              {labels.longestStreak}
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats.longestStreak}
            </div>
            <div className="text-sm text-gray-400">
              {labels.days}
            </div>
          </div>
        </div>

        {/* Contribution Graph Placeholder */}
        <div className="border border-gray-800 rounded-lg p-6 mb-8 hover:border-gray-700 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                {labels.activity}
              </div>
              <div className="text-lg font-semibold text-white">
                {stats.recentCommits} {labels.contributions}
              </div>
            </div>
          </div>
          
          {/* Simple activity visualization */}
          <div className="h-24 flex items-end gap-1">
            {Array.from({ length: activityBars }).map((_, index) => {
              const height = Math.random() * 100;
              return (
                <div
                  key={index}
                  className="flex-1 bg-gray-800 rounded-sm hover:bg-gray-700 transition-colors"
                  style={{ height: `${height}%`, minHeight: '4px' }}
                  title={`Day ${index + 1}`}
                />
              );
            })}
          </div>
        </div>

        {/* Additional Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
            <div className="text-2xl font-bold text-white mb-1">
              {stats.totalRepos}
            </div>
            <div className="text-xs text-gray-500">
              {labels.repositories}
            </div>
          </div>

          <div className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
            <div className="text-2xl font-bold text-white mb-1">
              {stats.totalStars}
            </div>
            <div className="text-xs text-gray-500">
              {labels.starsEarned}
            </div>
          </div>

          <div className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
            <div className="text-2xl font-bold text-white mb-1">
              {stats.followers}
            </div>
            <div className="text-xs text-gray-500">
              {labels.followers}
            </div>
          </div>

          <div className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
            <div className="text-2xl font-bold text-white mb-1">
              {stats.totalForks}
            </div>
            <div className="text-xs text-gray-500">
              {labels.forks}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GitHubStats;
