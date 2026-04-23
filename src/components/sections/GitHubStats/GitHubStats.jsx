import { useState, useEffect } from "react";
import githubStatsConfig from "../../../data/githubStats.json";
import profileData from "../../../data/profile.json";

function buildActivityTimelineFromEvents(events, activityBars) {
  const timeline = Array.from({ length: activityBars }, () => 0);
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(startDate.getDate() - (activityBars - 1));

  events.forEach((event) => {
    if (event.type !== "PushEvent") return;

    const eventDate = new Date(event.created_at);
    if (eventDate < startDate) return;

    const dayIndex = Math.floor(
      (eventDate - startDate) / (24 * 60 * 60 * 1000),
    );
    if (dayIndex >= 0 && dayIndex < activityBars) {
      timeline[dayIndex] += event.payload.commits?.length || 0;
    }
  });

  return timeline;
}

function normalizeWeeklyActivity(weeks, activityBars) {
  const weeklyTotals = weeks.map((week) =>
    week.contributionDays.reduce((sum, day) => sum + day.contributionCount, 0),
  );

  if (weeklyTotals.length >= activityBars) {
    return weeklyTotals.slice(-activityBars);
  }

  return [
    ...Array.from({ length: activityBars - weeklyTotals.length }, () => 0),
    ...weeklyTotals,
  ];
}

function calculateStreaks(contributionDays) {
  if (!contributionDays.length) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  const countsByDate = new Map(
    contributionDays.map((day) => [day.date, day.contributionCount]),
  );

  let currentStreak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  const todayKey = cursor.toISOString().slice(0, 10);
  if (!countsByDate.get(todayKey)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (!countsByDate.get(key)) break;
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  const sortedDays = [...contributionDays].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  let longestStreak = 0;
  let running = 0;
  for (const day of sortedDays) {
    if (day.contributionCount > 0) {
      running += 1;
      if (running > longestStreak) longestStreak = running;
    } else {
      running = 0;
    }
  }

  return { currentStreak, longestStreak };
}

async function fetchYearlyContributionCalendar(githubUsername, githubToken) {
  const now = new Date();
  const from = new Date(now);
  from.setFullYear(now.getFullYear() - 1);

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${githubToken}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        login: githubUsername,
        from: from.toISOString(),
        to: now.toISOString(),
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch contribution calendar");
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors[0].message || "GraphQL request failed");
  }

  const contributionCalendar =
    payload?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!contributionCalendar) {
    throw new Error("Contribution calendar is unavailable");
  }

  return contributionCalendar;
}

function GitHubStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { title, description, labels, errorMessage, activityBars } =
    githubStatsConfig;

  // Get GitHub username from profile
  const githubUsername = profileData.social.github.username;

  useEffect(() => {
    fetchGitHubStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGitHubStats = async () => {
    const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
    const CACHE_VERSION = "v2_yearly_contributions";
    // Use different cache keys for authenticated vs unauthenticated requests
    const CACHE_KEY = GITHUB_TOKEN
      ? `github_stats_cache_auth_${CACHE_VERSION}`
      : `github_stats_cache_public_${CACHE_VERSION}`;
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
        { headers },
      );
      if (!userResponse.ok) {
        // If rate limited, try to use expired cache
        if (cachedData) {
          const { data } = JSON.parse(cachedData);
          setStats(data);
          setLoading(false);
          return;
        }
        throw new Error("Failed to fetch user data");
      }
      const userData = await userResponse.json();

      // Fetch all repositories (both public and private if token has repo scope)
      const reposEndpoint = GITHUB_TOKEN
        ? `https://api.github.com/user/repos?per_page=100&affiliation=owner`
        : `https://api.github.com/users/${githubUsername}/repos?per_page=100`;

      const reposResponse = await fetch(reposEndpoint, { headers });
      if (!reposResponse.ok) throw new Error("Failed to fetch repositories");
      const repos = await reposResponse.json();

      // Calculate total stars, forks, and repos
      const totalStars = repos.reduce(
        (sum, repo) => sum + repo.stargazers_count,
        0,
      );
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
      const publicRepos = repos.filter((repo) => !repo.fork).length;

      // Fetch recent activity (events)
      const eventsResponse = await fetch(
        `https://api.github.com/users/${githubUsername}/events/public?per_page=100`,
        { headers },
      );
      let activityTimeline = Array.from({ length: activityBars }, () => 0);
      let lastYearContributions = 0;
      let contributionStreak = 0;
      let longestStreak = 0;

      if (GITHUB_TOKEN) {
        try {
          const contributionCalendar = await fetchYearlyContributionCalendar(
            githubUsername,
            GITHUB_TOKEN,
          );
          const contributionDays = contributionCalendar.weeks.flatMap(
            (week) => week.contributionDays,
          );

          activityTimeline = normalizeWeeklyActivity(
            contributionCalendar.weeks,
            activityBars,
          );
          lastYearContributions = contributionCalendar.totalContributions;

          const streaks = calculateStreaks(contributionDays);
          contributionStreak = streaks.currentStreak;
          longestStreak = streaks.longestStreak;
        } catch (graphQlError) {
          console.warn("Falling back to public events:", graphQlError);
        }
      }

      // Fallback when GraphQL is unavailable or no token is provided: best effort based on recent public events.
      if (lastYearContributions === 0 && eventsResponse.ok) {
        const events = await eventsResponse.json();
        activityTimeline = buildActivityTimelineFromEvents(
          events,
          activityBars,
        );
        lastYearContributions = events
          .filter((event) => event.type === "PushEvent")
          .reduce(
            (sum, event) => sum + (event.payload.commits?.length || 0),
            0,
          );

        // Calculate contribution streak (simplified version)
        const pushEvents = events.filter((e) => e.type === "PushEvent");
        if (pushEvents.length > 0) {
          const dates = [
            ...new Set(
              pushEvents.map((e) => new Date(e.created_at).toDateString()),
            ),
          ].sort((a, b) => new Date(b) - new Date(a));

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
        lastYearContributions,
        contributionStreak,
        longestStreak,
        profileCreated: userData.created_at,
        activityTimeline,
      });

      // Cache the stats
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          data: {
            totalRepos: publicRepos,
            totalStars,
            totalForks,
            followers: userData.followers,
            following: userData.following,
            lastYearContributions,
            contributionStreak,
            longestStreak,
            profileCreated: userData.created_at,
            activityTimeline,
          },
          timestamp: Date.now(),
        }),
      );
    } catch (err) {
      console.error("Error fetching GitHub stats:", err);
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
        <p className="text-gray-400 mb-12">{description}</p>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Last Year */}
          <div className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              {labels.lastYear}
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats.lastYearContributions}
            </div>
            <div className="text-sm text-gray-400">
              {labels.contributionsLabel}
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
            <div className="text-sm text-gray-400">{labels.days}</div>
          </div>

          {/* Longest Streak */}
          <div className="border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
              {labels.longestStreak}
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {stats.longestStreak}
            </div>
            <div className="text-sm text-gray-400">{labels.days}</div>
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
                {stats.lastYearContributions} {labels.contributionsInLastYear}
              </div>
            </div>
          </div>

          {/* Simple activity visualization */}
          {(() => {
            const maxActivity = Math.max(...(stats.activityTimeline || [0]));

            return (
              <div className="h-24 flex items-end gap-1">
                {Array.from({ length: activityBars }).map((_, index) => {
                  const activityValue = stats.activityTimeline?.[index] || 0;
                  const height =
                    maxActivity > 0
                      ? Math.max((activityValue / maxActivity) * 100, 4)
                      : 4;
                  return (
                    <div
                      key={index}
                      className="flex-1 bg-gray-800 rounded-sm hover:bg-gray-700 transition-colors"
                      style={{ height: `${height}%`, minHeight: "4px" }}
                      title={`Week ${index + 1}: ${activityValue} contributions`}
                    />
                  );
                })}
              </div>
            );
          })()}
        </div>

        {/* Additional Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
            <div className="text-2xl font-bold text-white mb-1">
              {stats.totalRepos}
            </div>
            <div className="text-xs text-gray-500">{labels.repositories}</div>
          </div>

          <div className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
            <div className="text-2xl font-bold text-white mb-1">
              {stats.totalStars}
            </div>
            <div className="text-xs text-gray-500">{labels.starsEarned}</div>
          </div>

          <div className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
            <div className="text-2xl font-bold text-white mb-1">
              {stats.followers}
            </div>
            <div className="text-xs text-gray-500">{labels.followers}</div>
          </div>

          <div className="border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors">
            <div className="text-2xl font-bold text-white mb-1">
              {stats.totalForks}
            </div>
            <div className="text-xs text-gray-500">{labels.forks}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GitHubStats;
