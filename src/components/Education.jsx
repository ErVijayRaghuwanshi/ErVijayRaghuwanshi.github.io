import React from 'react';

export const Education = () => {
  const educationList = [
    {
      title: 'Bachelor of Technology (BTech)',
      major: 'Electrical and Electronics Engineering',
      institution: 'Rajiv Gandhi Prodyogiki Vishwavidyalaya',
      duration: 'Aug 2018 - Jun 2021',
      grade: 'First Division With Honours (7.59/10)',
      activities: 'IoT voice assistant project, Solar MPPT major project, Gesture control in Computer Vision'
    },
    {
      title: 'Diploma in Electrical Engineering',
      institution: 'Rajiv Gandhi Prodyogiki Vishwavidyalaya',
      duration: '2013 - 2016',
      grade: '6.51/10'
    },
    {
      title: 'Secondary School Certificate (SSC) / Matriculation',
      institution: 'Nutan Higher Secondary School, Sehore',
      duration: '2013',
      grade: '70%'
    }
  ];

  const certificationsList = [
    { name: 'Python 3 Programming Advanced', issuer: 'Udemy', icon: 'fab fa-python' },
    { name: 'Exploratory Data Analysis with Python and Pandas', issuer: 'Coursera', icon: 'fas fa-chart-line' },
    { name: 'The Bits and Bytes of Computer Networking', issuer: 'Coursera', icon: 'fas fa-network-wired' },
    { name: 'Internet of Things and Embedded Systems', issuer: 'Coursera', icon: 'fas fa-microchip' },
    { name: 'DevOps Beginners to Advanced with Projects', issuer: 'Udemy', icon: 'fas fa-server' }
  ];

  return (
    <section id="education" className="py-24 bg-white dark:bg-gray-800/40 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-center mb-16">
          <div className="w-12 h-12 bg-theme-primary/10 rounded-xl flex items-center justify-center mr-4">
            <i className="fas fa-graduation-cap text-2xl text-theme-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Education & Certifications</h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Left Column: Education */}
          <div className="bg-gray-50/50 dark:bg-gray-850 border border-gray-200/50 dark:border-gray-800/80 p-6 md:p-8 rounded-2xl shadow-sm">
            <div className="flex items-center mb-6 border-b border-gray-150 dark:border-gray-850 pb-4">
              <i className="fas fa-university text-2xl text-theme-primary mr-3" />
              <h3 className="text-xl font-bold tracking-tight">Education</h3>
            </div>
            
            <div className="space-y-4">
              {educationList.map((edu, idx) => (
                <div 
                  key={idx} 
                  className="slide-item p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm"
                >
                  <div className="flex items-start mb-2">
                    <i className="fas fa-graduation-cap text-theme-primary mr-2.5 mt-1 text-sm shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm md:text-base text-gray-850 dark:text-white">
                        {edu.title}
                      </h4>
                      {edu.major && (
                        <p className="text-xs font-semibold text-theme-primary/80 mt-0.5">{edu.major}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="pl-6 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <p className="font-semibold text-gray-700 dark:text-gray-300">{edu.institution}</p>
                    <p>Grade: {edu.grade}</p>
                    <p className="font-medium text-theme-primary/70">{edu.duration}</p>
                    {edu.activities && (
                      <p className="mt-1.5 pt-1.5 border-t border-gray-100 dark:border-gray-800 text-[11px] leading-relaxed italic text-gray-500 dark:text-gray-400">
                        Activities: {edu.activities}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div className="bg-gray-50/50 dark:bg-gray-850 border border-gray-200/50 dark:border-gray-800/80 p-6 md:p-8 rounded-2xl shadow-sm">
            <div className="flex items-center mb-6 border-b border-gray-150 dark:border-gray-850 pb-4">
              <i className="fas fa-certificate text-2xl text-theme-primary mr-3" />
              <h3 className="text-xl font-bold tracking-tight">Certifications</h3>
            </div>

            <div className="space-y-4">
              {certificationsList.map((cert, idx) => (
                <div 
                  key={idx} 
                  className="slide-item p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center"
                >
                  <div className="w-9 h-9 rounded-lg bg-theme-primary/10 flex items-center justify-center shrink-0 mr-4">
                    <i className={`${cert.icon} text-theme-primary`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-850 dark:text-white leading-tight">
                      {cert.name}
                    </h4>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
