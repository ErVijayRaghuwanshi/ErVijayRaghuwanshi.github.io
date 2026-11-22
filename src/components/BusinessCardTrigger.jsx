import React, { useState, useEffect } from 'react';

export const generateVCard = () => {
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

export const triggerVCardDownload = () => {
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
    return true;
  } catch (err) {
    console.error('Failed to download business card:', err);
    return false;
  }
};

const COOLDOWN_DAYS = 14;
const STORAGE_KEY = 'vcard_prompt_cooldown';

export const BusinessCardTrigger = () => {
  const [showToast, setShowToast] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);

  const isThrottled = () => {
    try {
      const cooldownUntil = localStorage.getItem(STORAGE_KEY);
      if (!cooldownUntil) return false;
      return Date.now() < parseInt(cooldownUntil, 10);
    } catch {
      return false;
    }
  };

  const setCooldown = () => {
    try {
      const expiresAt = Date.now() + COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, expiresAt.toString());
    } catch {
      // Ignore storage errors
    }
  };

  useEffect(() => {
    if (isThrottled()) return;

    // Buffer: Wait at least 12 seconds after page load before enabling exit-intent detection
    // to prevent accidental triggers while the visitor is reading
    let readyForExit = false;
    const settleTimeout = setTimeout(() => {
      readyForExit = true;
    }, 12000);

    const handleExitIntent = (e) => {
      if (!readyForExit || isThrottled()) return;

      // Only trigger if mouse exits near top boundary
      if (e.clientY <= 10) {
        setShowToast(true);
        setCooldown();
        document.removeEventListener('mouseleave', handleExitIntent);
      }
    };

    document.addEventListener('mouseleave', handleExitIntent);

    return () => {
      clearTimeout(settleTimeout);
      document.removeEventListener('mouseleave', handleExitIntent);
    };
  }, []);

  const handleDownload = () => {
    triggerVCardDownload();
    setHasDownloaded(true);
    setCooldown();
    setTimeout(() => {
      setShowToast(false);
    }, 2200);
  };

  const handleDismiss = () => {
    setCooldown();
    setShowToast(false);
  };

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
          {hasDownloaded ? 'Contact Saved!' : 'Stay Connected'}
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
          {hasDownloaded 
            ? 'Vijay’s contact card has been downloaded. Add to your phone or contacts anytime!'
            : 'Would you like to save Vijay’s digital business card (.vcf) to your contacts before you go?'
          }
        </p>
        
        {/* Buttons */}
        {!hasDownloaded && (
          <div className="flex items-center gap-3 mt-3">
            <button 
              onClick={handleDownload}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-theme-primary text-white hover:opacity-90 flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
            >
              <i className="fas fa-download text-[11px]" /> Save vCard
            </button>
            <button 
              onClick={handleDismiss}
              className="text-xs font-semibold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
            >
              No thanks
            </button>
          </div>
        )}
      </div>

      {/* Close cross */}
      <button 
        onClick={handleDismiss}
        className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer shrink-0 p-1"
        aria-label="Close notification"
      >
        <i className="fas fa-times text-xs" />
      </button>
    </div>
  );
};
