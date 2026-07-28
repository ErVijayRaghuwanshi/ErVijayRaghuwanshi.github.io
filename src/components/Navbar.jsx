import React, { useState, useEffect } from 'react';
import { ThemeSelector } from './ThemeSelector';

export const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showKeytips, setShowKeytips] = useState(false);

  const navItems = [
    { label: 'About', id: 'about', key: 'A', icon: 'fas fa-user-circle' },
    { label: 'Skills', id: 'skills', key: 'S', icon: 'fas fa-code' },
    { label: 'Education', id: 'education', key: 'E', icon: 'fas fa-graduation-cap' },
    { label: 'Projects', id: 'projects', key: 'P', icon: 'fas fa-project-diagram' },
    { label: 'LeetCode', id: 'leetcode', key: 'L', icon: 'fas fa-trophy' },
    { label: 'Contact', id: 'contact', key: 'C', icon: 'fas fa-envelope' },
  ];

  // ScrollSpy logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const sections = ['home', ...navItems.map(item => item.id)];
      
      let currentSection = 'home';
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el && scrollPos >= el.offsetTop - 120) {
          currentSection = sectionId;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener (Alt key triggers keytips)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Alt') {
        setShowKeytips(true);
        document.body.classList.add('show-keytips');
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'Alt') {
        setShowKeytips(false);
        document.body.classList.remove('show-keytips');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/20 dark:border-gray-800/50 backdrop-blur-xl shadow-md z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-9 h-9 bg-gradient-to-r from-theme-primary to-indigo-500 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">VR</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Vijay Raghuwanshi
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link-custom relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center ${
                  activeSection === item.id
                    ? 'text-theme-primary dark:text-theme-primary bg-theme-primary/10'
                    : 'text-gray-600 dark:text-gray-300 hover:text-theme-primary dark:hover:text-theme-primary hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <i className={`${item.icon} mr-2`} />
                {item.label}
                {showKeytips && (
                  <span className="keytip">{item.key}</span>
                )}
              </button>
            ))}

            {/* Embedded Theme Selector */}
            <div className="pl-4 border-l border-gray-200 dark:border-gray-800">
              <ThemeSelector />
            </div>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex md:hidden items-center space-x-3">
            <ThemeSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 text-xl focus:outline-none p-1"
              aria-label="Toggle mobile menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-2 p-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-lg flex items-center text-sm font-medium transition-all ${
                activeSection === item.id
                  ? 'text-theme-primary bg-theme-primary/10 font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <i className={`${item.icon} w-6 text-center mr-3`} />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};
