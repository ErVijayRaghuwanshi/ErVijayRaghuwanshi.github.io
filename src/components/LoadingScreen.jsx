import React, { useState, useEffect } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [lastCommit, setLastCommit] = useState({ date: null, message: '', loading: true });

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
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  useEffect(() => {
    let timeoutId;
    let fadeOutTimeoutId;

    // Safety timeout: Don't block page loading if fetch takes too long (max 1.8 seconds)
    timeoutId = setTimeout(() => {
      handleComplete();
    }, 1800);

    const handleComplete = () => {
      setVisible(false);
      fadeOutTimeoutId = setTimeout(() => {
        onComplete();
      }, 500); // 500ms match the transition duration
    };

    const fetchCommit = async () => {
      // 1. Try to load cached commit
      const cached = localStorage.getItem('github_last_commit');
      let hasLoadedCached = false;
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setLastCommit({
            date: parsed.date,
            message: parsed.message,
            loading: false
          });
          hasLoadedCached = true;
        } catch (e) {
          console.error('Failed to parse cached GitHub commit:', e);
        }
      }

      // 2. Fetch fresh commit details
      try {
        const response = await fetch(
          'https://api.github.com/repos/ervijayraghuwanshi/ErVijayRaghuwanshi.github.io/commits?per_page=1'
        );
        if (!response.ok) throw new Error('GitHub API rate limited or offline');
        const data = await response.json();
        
        const dateStr = data[0].commit.committer.date;
        const message = data[0].commit.message;

        setLastCommit({
          date: dateStr,
          message,
          loading: false
        });

        localStorage.setItem('github_last_commit', JSON.stringify({
          date: dateStr,
          message
        }));
      } catch (err) {
        console.warn('GitHub fetch failed or offline');
        if (!hasLoadedCached) {
          setLastCommit({
            date: null,
            message: 'Connect to internet to load details',
            loading: false
          });
        }
      } finally {
        // Complete loading after fetch resolves (or fails)
        // Add a slight delay (e.g. 500ms) so it doesn't flicker too fast
        setTimeout(() => {
          handleComplete();
        }, 500);
      }
    };

    fetchCommit();

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(fadeOutTimeoutId);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 bg-gray-50 text-gray-800 dark:bg-gray-950 dark:text-gray-100 flex justify-center items-center z-[9999] transition-opacity duration-500 ease-in-out ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="text-center p-8 max-w-lg w-full">
        {/* Loading Logo */}
        <div className="text-5xl md:text-6xl font-black mb-4 tracking-tight animate-pulse bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent select-none">
          VR
        </div>

        {/* Loading details */}
        {!lastCommit.loading && lastCommit.date && (
          <div className="space-y-2 mt-6 animate-scale-in">
            <p className="text-sm md:text-base font-bold text-gray-700 dark:text-gray-300">
              Last updated: {timeAgo(lastCommit.date)}
            </p>
            {lastCommit.message && (
              <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500 italic max-w-md mx-auto truncate px-4">
                "{lastCommit.message}"
              </p>
            )}
          </div>
        )}

        {lastCommit.loading && (
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-6 select-none font-medium">
            Fetching latest portfolio changes...
          </p>
        )}
      </div>
    </div>
  );
};
