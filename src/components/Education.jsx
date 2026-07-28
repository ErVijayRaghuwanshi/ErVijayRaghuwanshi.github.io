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
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-extrabold tracking-tight">Education & Certifications</h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Left Column: Education */}
          <div 
            data-aos="fade-up" 
            data-aos-delay="100" 
            className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 md:p-8 rounded-2xl shadow-md border-t-4 border-theme-primary"
          >
            <div className="flex items-center mb-8">
              <i className="fas fa-university text-2xl text-theme-primary mr-3" />
              <h3 className="text-xl font-bold tracking-tight text-gray-850 dark:text-white">Education</h3>
            </div>
            
            <div className="relative border-l-2 border-theme-primary/30 pl-6 ml-2 space-y-8">
              {educationList.map((edu, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline bullet dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-theme-primary border-4 border-white dark:border-gray-900" />
                  
                  <div>
                    <h4 className="font-bold text-base md:text-lg text-gray-850 dark:text-white leading-snug">
                      {edu.title}
                    </h4>
                    
                    <p className="text-theme-primary font-semibold text-sm mt-1">
                      {edu.institution} {edu.major ? `| ${edu.major}` : ''}
                    </p>
                    
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-semibold mt-1">
                      {edu.duration} {edu.grade ? `• Grade: ${edu.grade}` : ''}
                    </p>

                    {edu.activities && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mt-2 italic">
                        Activities: {edu.activities}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications */}
          <div 
            data-aos="fade-up" 
            data-aos-delay="200" 
            className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-6 md:p-8 rounded-2xl shadow-md border-t-4 border-theme-primary"
          >
            <div className="flex items-center mb-8">
              <i className="fas fa-certificate text-2xl text-theme-primary mr-3" />
              <h3 className="text-xl font-bold tracking-tight text-gray-850 dark:text-white">Certifications</h3>
            </div>

            <div className="space-y-6">
              {certificationsList.map((cert, idx) => (
                <div key={idx} className="flex items-start">
                  {/* Icon Block */}
                  <div className="w-8 h-8 rounded-lg bg-theme-primary/10 flex items-center justify-center shrink-0 mr-4">
                    <i className={`${cert.icon} text-theme-primary text-sm`} />
                  </div>
                  {/* Text Block */}
                  <div>
                    <h4 className="font-bold text-sm md:text-base text-gray-850 dark:text-white leading-tight">
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
