import React, { useState, useEffect } from 'react';

export const BusinessCardTrigger = () => {
  const [showToast, setShowToast] = useState(false);

  const generateVCard = () => {
    return [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Raghuwanshi;Vijay;;;',
      'FN:Vijay Raghuwanshi',
      'ORG:ClearTrail Technologies',
      'TITLE:Software Engineer (Backend, Big Data & AI)',
      'TEL;TYPE=CELL,voice,pref:+919755491130',
      'EMAIL;TYPE=PREF,INTERNET:ervijayraghuwanshi@gmail.com',
      'URL;TYPE=portfolio:https://ervijayraghuwanshi.github.io/',
      'URL;TYPE=linkedin:https://www.linkedin.com/in/ervijayraghuwanshi/',
      'URL;TYPE=github:https://github.com/ErVijayRaghuwanshi',
      'REV:' + new Date().toISOString(),
      'END:VCARD'
    ].join('\r\n');
  };

  const triggerDownload = () => {
    try {
      const vcardContent = generateVCard();
      const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Vijay_Raghuwanshi.vcf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Show the notification toast
      setShowToast(true);
    } catch (err) {
      console.error('Failed to auto-download business card:', err);
    }
  };

  useEffect(() => {
    // Session throttle: trigger only once per browser session
    if (sessionStorage.getItem('vcard_downloaded')) return;

    const handleExitIntent = (e) => {
      // Trigger download if mouse moves out of the top boundary (towards tabs/address bar)
      if (e.clientY < 20 && !sessionStorage.getItem('vcard_downloaded')) {
        sessionStorage.setItem('vcard_downloaded', 'true');
        triggerDownload();
        removeListeners();
      }
    };

    const handleVisibilityChange = () => {
      // Trigger download if tab becomes hidden (on mobile tab switches or minimizing)
      if (document.visibilityState === 'hidden' && !sessionStorage.getItem('vcard_downloaded')) {
        sessionStorage.setItem('vcard_downloaded', 'true');
        triggerDownload();
        removeListeners();
      }
    };

    const removeListeners = () => {
      document.removeEventListener('mouseleave', handleExitIntent);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };

    document.addEventListener('mouseleave', handleExitIntent);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      removeListeners();
    };
  }, []);

  if (!showToast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] sm:w-96 bg-white/95 dark:bg-gray-950/95 border-l-4 border-theme-primary shadow-2xl p-4 rounded-xl flex items-start gap-3.5 backdrop-blur-md animate-slide-up border border-gray-150 dark:border-gray-850 transition-all duration-300">
      {/* Icon */}
      <div className="w-10 h-10 bg-theme-primary/10 rounded-xl flex items-center justify-center shrink-0">
        <i className="fas fa-address-card text-theme-primary text-lg" />
      </div>

      {/* Message Info */}
      <div className="flex-grow">
        <h4 className="font-bold text-xs text-gray-800 dark:text-white uppercase tracking-wider">
          Before you go!
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
          My digital business card has been saved to your downloads. Add me to your contacts!
        </p>
        
        {/* Buttons */}
        <div className="flex gap-4 mt-3">
          <button 
            onClick={triggerDownload}
            className="text-xs font-bold text-theme-primary hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <i className="fas fa-redo text-[10px]" /> Download Again
          </button>
          <button 
            onClick={() => setShowToast(false)}
            className="text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>

      {/* Close cross */}
      <button 
        onClick={() => setShowToast(false)}
        className="text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 cursor-pointer shrink-0"
        aria-label="Close notification"
      >
        <i className="fas fa-times text-xs" />
      </button>
    </div>
  );
};
