import React, { useState, useEffect, useRef } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [commitsData, setCommitsData] = useState({
    lastUpdated: null,
    commits: [],
    loading: true
  });

  const isHoveredRef = useRef(false);
  const fetchCompleteRef = useRef(false);
  const dismissTimerRef = useRef(null);
  const fadeOutTimeoutRef = useRef(null);

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

  const handleComplete = () => {
    setVisible(false);
    fadeOutTimeoutRef.current = setTimeout(() => {
      onComplete();
    }, 500); // 500ms matches transition duration
  };

  const scheduleDismiss = (delay = 1200) => {
    if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
    dismissTimerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        handleComplete();
      }
    }, delay);
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);
    if (dismissTimerRef.current) {
      clearTimeout(dismissTimerRef.current);
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
    if (fetchCompleteRef.current) {
      scheduleDismiss(1500); // 1.5s graceful buffer after mouse leaves
    }
  };

  useEffect(() => {
    // 1. Safety timer: Dismiss automatically after max 3.5s if not hovered
    const safetyTimeout = setTimeout(() => {
      if (!isHoveredRef.current && !fetchCompleteRef.current) {
        handleComplete();
      }
    }, 3500);

    const fetchCommits = async () => {
      // Try to load cached commits
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

      // Fetch fresh 5 commits
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
        fetchCompleteRef.current = true;
        if (!isHoveredRef.current) {
          scheduleDismiss(1200);
        }
      }
    };

    fetchCommits();

    return () => {
      clearTimeout(safetyTimeout);
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      if (fadeOutTimeoutRef.current) clearTimeout(fadeOutTimeoutRef.current);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-gray-50/95 text-gray-800 dark:bg-gray-950/95 dark:text-gray-100 flex justify-center items-center z-[9999] transition-opacity duration-500 ease-in-out px-4 backdrop-blur-md ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className="text-center p-6 max-w-lg w-full relative group transition-transform duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Loading Logo */}
        <div className="text-5xl md:text-6xl font-black mb-4 tracking-tight animate-pulse bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent select-none">
          VR
        </div>

        {/* Loading details: Last 5 Commits */}
        {!commitsData.loading && commitsData.commits.length > 0 && (
          <div className="space-y-3 mt-6 text-left max-w-md mx-auto animate-scale-in bg-white/80 dark:bg-gray-900/80 p-5 rounded-2xl shadow-xl border border-gray-200/80 dark:border-gray-800 backdrop-blur-lg transition-all duration-300">
            {/* Header with Hover Pause Indicator */}
            <div className="flex items-center justify-between border-b border-gray-200/60 dark:border-gray-800 pb-3">
              <span className="text-xs md:text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isHovered ? 'bg-amber-400 animate-ping' : 'bg-theme-primary animate-pulse'}`} />
                Last updated: {timeAgo(commitsData.lastUpdated)}
              </span>
              
              {isHovered ? (
                <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full">
                  <i className="fas fa-pause text-[8px]" /> Paused
                </span>
              ) : (
                <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider">
                  Hover to Pause
                </span>
              )}
            </div>

            {/* Commits List */}
            <div className="space-y-2 max-h-60 overflow-y-auto no-scrollbar">
              {commitsData.commits.map((c, idx) => (
                <div 
                  key={c.sha || idx}
                  className="flex items-center justify-between gap-3 text-xs bg-gray-100/70 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-800 p-2.5 rounded-xl border border-gray-200/50 dark:border-gray-700/50 transition-colors"
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

            {/* Bottom Controls / Continue Action */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800/80 mt-3">
              <span>{isHovered ? 'Move mouse away to resume' : 'Hold cursor to read'}</span>
              <button 
                onClick={handleComplete}
                className="font-bold text-theme-primary hover:underline flex items-center gap-1 cursor-pointer"
              >
                Skip to Portfolio <i className="fas fa-arrow-right text-[9px]" />
              </button>
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
