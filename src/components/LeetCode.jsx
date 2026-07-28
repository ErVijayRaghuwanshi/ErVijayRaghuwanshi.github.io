import React, { useState, useEffect, useRef } from 'react';

export const LeetCode = () => {
  const containerRef = useRef(null);
  const [stats, setStats] = useState({
    totalSolved: 411,
    totalQuestions: 3999,
    easySolved: 198,
    mediumSolved: 188,
    hardSolved: 25
  });
  const [animatedStats, setAnimatedStats] = useState({
    easy: 0,
    medium: 0,
    hard: 0
  });
  const [loading, setLoading] = useState(true);

  // Intersection Observer to fetch and animate stats when in view
  useEffect(() => {
    let observer;
    let isIntersected = false;

    const fetchStats = async () => {
      // 1. Try to load cached stats
      const cached = localStorage.getItem('leetcode_stats');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setStats(parsed);
          triggerCountAnimation(parsed);
          setLoading(false);
        } catch (e) {
          console.error('Failed to parse cached stats', e);
        }
      }

      // 2. Fetch fresh stats
      try {
        const res = await fetch('https://leetcode-stats-api.herokuapp.com/ervijayraghuwanshi');
        if (!res.ok) throw new Error('LeetCode stats fetch failed');
        const data = await res.json();
        
        localStorage.setItem('leetcode_stats', JSON.stringify(data));
        setStats(data);
        triggerCountAnimation(data);
      } catch (err) {
        console.warn('Using cached or fallback LeetCode stats:', err);
        if (!cached) {
          triggerCountAnimation({
            easySolved: 198,
            mediumSolved: 188,
            hardSolved: 25
          });
        }
      } finally {
        setLoading(false);
      }
    };

    const triggerCountAnimation = (targetData) => {
      const duration = 1200; // ms
      const startTime = performance.now();

      const easyTarget = targetData.easySolved || 198;
      const mediumTarget = targetData.mediumSolved || 188;
      const hardTarget = targetData.hardSolved || 25;

      const animate = (currentTime) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setAnimatedStats({
          easy: Math.floor(easyTarget * progress),
          medium: Math.floor(mediumTarget * progress),
          hard: Math.floor(hardTarget * progress)
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    };

    if (containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isIntersected) {
              isIntersected = true;
              fetchStats();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const badges = [
    { name: 'Introduction to Pandas', image: '/assets/leetcode/Introduction_to_Pandas.gif' },
    { name: '25/100 Problems Solved', image: '/assets/leetcode/25100.gif' },
    { name: '25/50 Problems Solved', image: '/assets/leetcode/2550.gif' },
    { name: 'Top SQL 50', image: '/assets/leetcode/Top_SQL_50.gif' }
  ];

  return (
    <section id="leetcode" ref={containerRef} className="py-24 bg-white dark:bg-gray-800/40 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-center mb-16">
          <div className="w-12 h-12 bg-theme-primary/10 rounded-xl flex items-center justify-center mr-4">
            <i className="fas fa-award text-2xl text-theme-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">LeetCode Achievements</h2>
        </div>

        {/* Stats Dashboard Card */}
        <div className="bg-gray-50/70 dark:bg-gray-900/60 border border-gray-200/50 dark:border-gray-800 p-8 rounded-2xl max-w-2xl mx-auto shadow-lg mb-16 hover:border-theme-primary/20 transition-all duration-300">
          
          <div className="text-center mb-8 border-b border-gray-150 dark:border-gray-850 pb-6">
            <div className="text-4xl md:text-5xl font-black text-theme-primary tracking-tight">
              {stats.totalSolved} <span className="text-gray-400 dark:text-gray-650 text-2xl">/ {stats.totalQuestions}</span>
            </div>
            <p className="text-sm font-semibold text-gray-550 dark:text-gray-450 mt-2 uppercase tracking-wider">
              Problems Solved
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 text-center">
            <div className="p-3 bg-white dark:bg-gray-850 rounded-xl border border-gray-100 dark:border-gray-800/50">
              <p className="text-2xl md:text-3xl font-extrabold text-green-500">{animatedStats.easy}</p>
              <p className="text-xs font-semibold text-gray-550 dark:text-gray-450 mt-1 uppercase tracking-wider">Easy</p>
            </div>
            <div className="p-3 bg-white dark:bg-gray-850 rounded-xl border border-gray-100 dark:border-gray-800/50">
              <p className="text-2xl md:text-3xl font-extrabold text-yellow-500">{animatedStats.medium}</p>
              <p className="text-xs font-semibold text-gray-550 dark:text-gray-450 mt-1 uppercase tracking-wider">Medium</p>
            </div>
            <div className="p-3 bg-white dark:bg-gray-850 rounded-xl border border-gray-100 dark:border-gray-800/50">
              <p className="text-2xl md:text-3xl font-extrabold text-red-500">{animatedStats.hard}</p>
              <p className="text-xs font-semibold text-gray-550 dark:text-gray-450 mt-1 uppercase tracking-wider">Hard</p>
            </div>
          </div>

        </div>

        {/* Badges Grid */}
        <div className="max-w-5xl mx-auto mb-16">
          <h3 className="text-lg font-bold text-center mb-8 uppercase tracking-widest text-gray-400 dark:text-gray-550">
            Earned Badges
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {badges.map((badge, idx) => (
              <div 
                key={idx} 
                className="project-card bg-white dark:bg-gray-900 border border-gray-200/40 dark:border-gray-800/80 rounded-2xl p-4 flex flex-col items-center justify-center shadow-md transition-all duration-300 hover:border-theme-primary/30 hover:-translate-y-1"
              >
                <div className="relative w-32 h-32 flex items-center justify-center">
                  {/* Badge Base Background */}
                  <img 
                    src="/assets/leetcode/badge-background.png" 
                    alt="Badge Background" 
                    className="absolute inset-0 w-full h-full object-contain opacity-80"
                  />
                  {/* Badge Animation Icon */}
                  <img 
                    src={badge.image} 
                    alt={badge.name} 
                    className="absolute w-20 h-20 object-contain z-10"
                  />
                </div>
                <h4 className="text-xs md:text-sm font-bold text-gray-800 dark:text-gray-200 mt-4 text-center">
                  {badge.name}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Profile Link */}
        <div className="text-center">
          <a 
            href="https://leetcode.com/u/ervijayraghuwanshi/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary-custom inline-flex items-center px-6 py-3 rounded-xl text-white font-medium text-sm shadow-md hover:shadow-theme-primary/20"
          >
            View Full LeetCode Profile <i className="fas fa-arrow-right ml-2 text-xs" />
          </a>
        </div>

      </div>
    </section>
  );
};
