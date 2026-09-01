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
    hard: 0,
    total: 0
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
            totalSolved: 411,
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
      const duration = 1600; // ms for ultra-smooth fluid animation
      const startTime = performance.now();

      const easyTarget = targetData.easySolved || 198;
      const mediumTarget = targetData.mediumSolved || 188;
      const hardTarget = targetData.hardSolved || 25;
      const totalTarget = targetData.totalSolved || 411;
      const totalQuestions = targetData.totalQuestions || 3999;
      const targetRatio = totalQuestions > 0 ? (totalTarget / totalQuestions) : 0;

      // Cubic ease-out curve for natural deceleration
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(rawProgress);
        
        setAnimatedStats({
          easy: Math.round(easyTarget * easedProgress),
          medium: Math.round(mediumTarget * easedProgress),
          hard: Math.round(hardTarget * easedProgress),
          total: Math.round(totalTarget * easedProgress),
          progressRatio: targetRatio * easedProgress
        });

        if (rawProgress < 1) {
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

  // SVG circular progress calculation linked to animated ratio
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedStats.progressRatio * circumference);
  const currentPercentage = (animatedStats.progressRatio * 100).toFixed(1);

  return (
    <section id="leetcode" ref={containerRef} className="py-24 bg-white dark:bg-gray-800/40 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-center mb-16">
          <div className="w-12 h-12 bg-theme-primary/10 rounded-xl flex items-center justify-center mr-4">
            <i className="fas fa-award text-2xl text-theme-primary" />
          </div>
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-extrabold tracking-tight">LeetCode Achievements</h2>
        </div>

        {/* 2-Column Responsive Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto mb-16">
          
          {/* Left Column: Solved Stats Cards */}
          <div data-aos="fade-up" data-aos-delay="100" className="lg:col-span-5 bg-white dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800/70 p-6 md:p-8 rounded-2xl shadow-sm hover:border-theme-primary/20 transition-all duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold tracking-tight mb-6 text-gray-800 dark:text-white uppercase tracking-wider text-center lg:text-left border-b border-gray-100 dark:border-gray-800 pb-3">
                Problems Solved
              </h3>

              {/* Ring Progress Chart */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
                <div className="relative w-32 h-32 shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Background Ring */}
                    <circle
                      cx="64"
                      cy="64"
                      r={radius}
                      className="stroke-gray-100 dark:stroke-gray-800 fill-none"
                      strokeWidth="8"
                    />
                    {/* Active Ring */}
                    <circle
                      cx="64"
                      cy="64"
                      r={radius}
                      className="stroke-theme-primary fill-none"
                      strokeWidth="8"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Inside Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-gray-850 dark:text-white leading-none">
                      {animatedStats.total}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-550 uppercase tracking-widest mt-1">
                      Solved
                    </span>
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-2xl font-black text-gray-800 dark:text-white leading-tight">
                    {currentPercentage}%
                  </p>
                  <p className="text-xs font-semibold text-gray-450 dark:text-gray-450 mt-1">
                    Solve Rate of {stats.totalQuestions.toLocaleString()} Total Questions
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Breakdown Items */}
            <div className="space-y-3.5">
              {/* Easy Card */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800/40 transition-all hover:border-green-500/30">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2.5" />
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Easy</span>
                </div>
                <span className="text-base font-black text-green-500">{animatedStats.easy}</span>
              </div>

              {/* Medium Card */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800/40 transition-all hover:border-yellow-500/30">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-2.5" />
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Medium</span>
                </div>
                <span className="text-base font-black text-yellow-500">{animatedStats.medium}</span>
              </div>

              {/* Hard Card */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800/40 transition-all hover:border-red-500/30">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2.5" />
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">Hard</span>
                </div>
                <span className="text-base font-black text-red-500">{animatedStats.hard}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Badges Showcase */}
          <div data-aos="fade-up" data-aos-delay="200" className="lg:col-span-7 bg-white dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800/70 p-6 md:p-8 rounded-2xl shadow-sm hover:border-theme-primary/20 transition-all duration-300 flex flex-col">
            <h3 className="text-lg font-bold tracking-tight mb-6 text-gray-800 dark:text-white uppercase tracking-wider text-center lg:text-left border-b border-gray-100 dark:border-gray-800 pb-3">
              Earned Badges
            </h3>

            <div className="grid grid-cols-2 gap-4 md:gap-6 flex-grow">
              {badges.map((badge, idx) => (
                <div 
                  key={idx} 
                  className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-150 dark:border-gray-800/60 rounded-xl p-4 flex flex-col items-center justify-center transition-all duration-300 hover:border-theme-primary/20 hover:-translate-y-0.5"
                >
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
                    {/* Badge Base Background */}
                    <img 
                      src="/assets/leetcode/badge-background.png" 
                      alt="Badge Background" 
                      className="absolute inset-0 w-full h-full object-contain opacity-70 dark:opacity-85"
                    />
                    {/* Badge Animation Icon */}
                    <img 
                      src={badge.image} 
                      alt={badge.name} 
                      className="absolute w-16 h-16 sm:w-20 sm:h-20 object-contain z-10"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-gray-300 mt-3 text-center leading-tight">
                    {badge.name}
                  </h4>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA Profile Link */}
        <div data-aos="fade-up" data-aos-delay="400" className="text-center">
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
