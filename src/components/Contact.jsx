import React, { useState } from 'react';
import { triggerVCardDownload } from './BusinessCardTrigger';

export const Contact = () => {
  const [copiedType, setCopiedType] = useState(null);
  const [vcardDownloaded, setVcardDownloaded] = useState(false);

  const handleCopy = (text, type, e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleVCardClick = () => {
    triggerVCardDownload();
    setVcardDownloaded(true);
    setTimeout(() => setVcardDownloaded(false), 3000);
  };

  const contactChannels = [
    {
      title: 'Email',
      value: 'ervijayraghuwanshi@gmail.com',
      href: 'mailto:ervijayraghuwanshi@gmail.com?subject=Portfolio%20Contact&body=Hello%20Vijay,%0A%0AI%20just%20checked%20your%20portfolio%20and%20would%20like%20to%20connect.',
      icon: 'fas fa-envelope',
      colorClass: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      actionLabel: 'Send Email',
      canCopy: true
    },
    {
      title: 'WhatsApp',
      value: '+91 97554 91130',
      href: 'https://wa.me/919755491130?text=Hello%20Vijay,%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect.',
      icon: 'fab fa-whatsapp',
      colorClass: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      actionLabel: 'Chat on WhatsApp',
      canCopy: true
    },
    {
      title: 'LinkedIn',
      value: 'ervijayraghuwanshi',
      href: 'https://www.linkedin.com/in/ervijayraghuwanshi/',
      icon: 'fab fa-linkedin',
      colorClass: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
      actionLabel: 'View Profile',
      canCopy: false
    },
    {
      title: 'GitHub',
      value: 'ErVijayRaghuwanshi',
      href: 'https://github.com/ErVijayRaghuwanshi',
      icon: 'fab fa-github',
      colorClass: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      actionLabel: 'Explore Repos',
      canCopy: false
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-gray-50/50 dark:bg-gray-900/30 transition-colors duration-300">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        
        {/* Section Header */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-theme-primary/10 rounded-xl flex items-center justify-center mr-4">
            <i className="fas fa-paper-plane text-2xl text-theme-primary" />
          </div>
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-extrabold tracking-tight">Get in Touch</h2>
        </div>

        <div className="max-w-2xl mx-auto text-center mb-16">
          <p data-aos="fade-up" data-aos-delay="100" className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Have a project in mind, an opportunity to discuss, or want to collaborate on big data, distributed systems, or GenAI applications? Reach out directly anytime.
          </p>
        </div>

        {/* 2-Row / 4-Col Communication Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {contactChannels.map((channel, idx) => (
            <div 
              key={channel.title}
              data-aos="fade-up"
              data-aos-delay={(idx + 1) * 100}
              className="bg-white dark:bg-gray-800/60 border border-gray-150 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:border-theme-primary/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg border ${channel.colorClass}`}>
                    <i className={channel.icon} />
                  </div>
                  {channel.canCopy && (
                    <button
                      onClick={(e) => handleCopy(channel.value, channel.title, e)}
                      className="text-xs px-2.5 py-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                      title={`Copy ${channel.title}`}
                    >
                      {copiedType === channel.title ? (
                        <span className="text-theme-primary font-semibold flex items-center gap-1">
                          <i className="fas fa-check text-[10px]" /> Copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <i className="far fa-copy text-[10px]" /> Copy
                        </span>
                      )}
                    </button>
                  )}
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                  {channel.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-6" title={channel.value}>
                  {channel.value}
                </p>
              </div>

              <a
                href={channel.href}
                target={channel.href.startsWith('mailto:') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center border border-gray-200 dark:border-gray-700 hover:border-theme-primary hover:bg-theme-primary hover:text-white dark:hover:bg-theme-primary text-gray-700 dark:text-gray-200 transition-all duration-200 flex items-center justify-center gap-2 group-hover:border-theme-primary/30"
              >
                <span>{channel.actionLabel}</span>
                <i className="fas fa-arrow-right text-[10px] transform group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        {/* Highlighted Digital Business Card Card */}
        <div 
          data-aos="fade-up" 
          data-aos-delay="500"
          className="bg-gradient-to-r from-theme-primary/10 via-indigo-500/10 to-theme-primary/5 border border-theme-primary/25 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm backdrop-blur-sm"
        >
          <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
            <div className="w-14 h-14 rounded-2xl bg-theme-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-theme-primary/30 text-2xl">
              <i className="fas fa-address-card" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                Save Digital Contact Card (vCard)
              </h3>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 mt-1 max-w-xl">
                Download Vijay's complete contact card (<code className="text-xs font-mono text-theme-primary">.vcf</code>) to instantly add email, phone, LinkedIn, and portfolio to your phone, Apple Contacts, or Outlook.
              </p>
            </div>
          </div>

          <button
            onClick={handleVCardClick}
            className="btn-primary-custom px-6 py-3 rounded-xl text-white font-semibold text-sm flex items-center gap-2.5 shrink-0 shadow-lg hover:shadow-theme-primary/30 cursor-pointer"
          >
            {vcardDownloaded ? (
              <>
                <i className="fas fa-check text-sm" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <i className="fas fa-download text-sm" />
                <span>Download vCard (.vcf)</span>
              </>
            )}
          </button>
        </div>

      </div>
    </section>
  );
};
