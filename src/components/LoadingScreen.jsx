import React, { useState, useEffect } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [commitsData, setCommitsData] = useState({
    lastUpdated: null,
    commits: [],
    loading: true
  });

  const timeAgo = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  useEffect(() => {
    let timeoutId;
    let fadeOutTimeoutId;

    const handleComplete = () => {
      setVisible(false);
      fadeOutTimeoutId = setTimeout(() => {
        onComplete();
      }, 500); // 500ms match transition duration
    };

    // Safety timeout: Don't block page loading if fetch takes too long (max 2.2s)
    timeoutId = setTimeout(() => {
      handleComplete();
    }, 2200);

    const fetchCommits = async () => {
      // 1. Try to load cached commits
      const cached = localStorage.getItem('github_recent_commits');
      let hasLoadedCached = false;
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setCommitsData({
            lastUpdated: parsed.lastUpdated,
            commits: parsed.commits || [],
            loading: false
          });
          hasLoadedCached = true;
        } catch (e) {
          console.error('Failed to parse cached GitHub commits:', e);
        }
      }

      // 2. Fetch fresh 5 commits
      try {
        const response = await fetch(
          'https://api.github.com/repos/ervijayraghuwanshi/ErVijayRaghuwanshi.github.io/commits?sha=react-version&per_page=5'
        );
        if (!response.ok) throw new Error('GitHub API rate limited or offline');
        const data = await response.json();
        
        const lastUpdatedDate = data[0]?.commit?.committer?.date;
        const commitsList = data.slice(0, 5).map(item => ({
          sha: item.sha.substring(0, 7),
          message: item.commit.message.split('\n')[0],
          date: item.commit.committer.date
        }));

        setCommitsData({
          lastUpdated: lastUpdatedDate,
          commits: commitsList,
          loading: false
        });

        localStorage.setItem('github_recent_commits', JSON.stringify({
          lastUpdated: lastUpdatedDate,
          commits: commitsList
        }));
      } catch (err) {
        console.warn('GitHub fetch failed or offline');
        if (!hasLoadedCached) {
          setCommitsData({
            lastUpdated: null,
            commits: [],
            loading: false
          });
        }
      } finally {
        // Allow user a brief moment to view recent activity before fading out
        setTimeout(() => {
          handleComplete();
        }, 900);
      }
    };

    fetchCommits();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(fadeOutTimeoutId);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-100 flex justify-center items-center z-[9999] transition-opacity duration-500 ease-in-out px-4 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="text-center p-6 max-w-lg w-full">
        {/* Loading Logo */}
        <div className="text-5xl md:text-6xl font-black mb-4 tracking-tight animate-pulse bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent select-none">
          VR
        </div>

        {/* Loading details: Last 5 Commits */}
        {!commitsData.loading && commitsData.commits.length > 0 && (
          <div className="space-y-3 mt-6 text-left max-w-md mx-auto animate-scale-in">
            <div className="flex items-center justify-between border-b border-gray-200/60 dark:border-gray-800 pb-2">
              <span className="text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-theme-primary animate-pulse" />
                Last updated: {timeAgo(commitsData.lastUpdated)}
              </span>
              <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
                Recent Activity
              </span>
            </div>

            <div className="space-y-2">
              {commitsData.commits.map((c, idx) => (
                <div 
                  key={c.sha || idx}
                  className="flex items-center justify-between gap-3 text-xs bg-gray-100/70 dark:bg-gray-900/60 p-2.5 rounded-lg border border-gray-200/50 dark:border-gray-800/50"
                >
                  <div className="flex items-center gap-2 overflow-hidden min-w-0">
                    <i className="fas fa-code-commit text-theme-primary text-[10px] shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300 font-medium truncate text-xs">
                      {c.message}
                    </p>
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 shrink-0">
                    {timeAgo(c.date)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {commitsData.loading && (
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-6 select-none font-medium">
            Fetching latest portfolio changes...
          </p>
        )}
      </div>
    </div>
  );
};
