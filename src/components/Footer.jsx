import React, { useState, useEffect } from 'react';

export const Footer = () => {
  const [lastCommit, setLastCommit] = useState({ date: null, message: '', loading: true });

  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/ErVijayRaghuwanshi', icon: 'fab fa-github' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ervijayraghuwanshi/', icon: 'fab fa-linkedin' },
    { name: 'WhatsApp', href: 'https://wa.me/919755491130?text=Hello%20Vijay,%20I%20came%20across%2520your%2520portfolio%2520and%2520would%2520like%2520to%252520connect.', icon: 'fab fa-whatsapp' },
    { name: 'X', href: 'https://x.com/ErVijayRaghu1c', icon: 'fab fa-x' },
    { name: 'Instagram', href: 'https://instagram.com/er.vijayraghuwanshi', icon: 'fab fa-instagram' },
    { name: 'Email', href: 'mailto:ervijayraghuwanshi@gmail.com?subject=Portfolio%20Contact&body=Hello%20Vijay,%0A%0AI%20just%20checked%20your%20portfolio%20and%20would%20like%2520to%2520connect.', icon: 'fas fa-envelope' },
    { name: 'Phone', href: 'tel:+919755491130', icon: 'fas fa-phone' }
  ];

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
    const fetchCommit = async () => {
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
        console.warn('GitHub fetch failed, using cached values.');
        if (!hasLoadedCached) {
          setLastCommit({
            date: null,
            message: 'Connect to internet to load details',
            loading: false
          });
        }
      }
    };

    fetchCommit();
  }, []);

  return (
    <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-900">
      <div className="container mx-auto px-4 text-center">
        
        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-450 hover:text-white transition-colors duration-300 text-xl"
              title={social.name}
              aria-label={social.name}
            >
              <i className={social.icon} />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-8" />

        {/* GitHub Commit Status */}
        {!lastCommit.loading && lastCommit.date && (
          <div className="mb-6 text-xs text-gray-500 max-w-lg mx-auto bg-gray-900/40 py-2.5 px-4 rounded-xl border border-gray-850 inline-flex flex-col items-center gap-1">
            <span className="font-semibold text-gray-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-theme-primary animate-pulse" />
              Last updated: {timeAgo(lastCommit.date)}
            </span>
            {lastCommit.message && (
              <span className="italic text-gray-600 dark:text-gray-500 truncate max-w-xs md:max-w-md">
                "{lastCommit.message}"
              </span>
            )}
          </div>
        )}

        {/* Copyright */}
        <p className="text-sm font-semibold tracking-wide text-gray-500">
          &copy; {new Date().getFullYear()} Vijay Raghuwanshi. All rights reserved.
        </p>

      </div>
    </footer>
  );
};
