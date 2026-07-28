import React from 'react';

export const Contact = () => {
  const contactLinks = [
    { 
      label: 'Email', 
      href: 'mailto:ervijayraghuwanshi@gmail.com?subject=Portfolio%20Contact&body=Hello%20Vijay,%0A%0AI%20just%20checked%20your%20portfolio%20and%20would%20like%20to%20connect.',
      icon: 'fas fa-envelope',
      value: 'ervijayraghuwanshi@gmail.com'
    },
    { 
      label: 'LinkedIn', 
      href: 'https://www.linkedin.com/in/ervijayraghuwanshi/',
      icon: 'fab fa-linkedin',
      value: 'in/ervijayraghuwanshi'
    },
    { 
      label: 'GitHub', 
      href: 'https://github.com/ErVijayRaghuwanshi',
      icon: 'fab fa-github',
      value: 'github.com/ErVijayRaghuwanshi'
    },
    { 
      label: 'WhatsApp', 
      href: 'https://wa.me/919755491130?text=Hello%20Vijay,%20I%20came%20across%2520your%2520portfolio%2520and%2520would%2520like%2520to%252520connect.',
      icon: 'fab fa-whatsapp',
      value: '+91 97554 91130'
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-12 h-12 bg-theme-primary/10 rounded-xl flex items-center justify-center mr-4">
            <i className="fas fa-envelope text-2xl text-theme-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Get in Touch</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-center text-base md:text-lg text-gray-650 dark:text-gray-350 max-w-xl mx-auto mb-12 leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out via any channel below!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 rounded-2xl text-center shadow-sm hover:border-theme-primary/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-xl bg-theme-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  <i className={`${link.icon} text-xl text-theme-primary`} />
                </div>
                <h3 className="font-bold text-sm text-gray-850 dark:text-white uppercase tracking-wider mb-2">
                  {link.label}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium break-all max-w-full">
                  {link.value}
                </p>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
