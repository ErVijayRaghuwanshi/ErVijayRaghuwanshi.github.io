import React from 'react';

export const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 md:pt-20">
      {/* Soft color blobs behind content */}
      <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 to-indigo-500/5 dark:from-theme-primary/10 dark:to-indigo-900/10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-theme-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
          
          {/* Left Column: Text Content */}
          <div className="text-center md:text-left md:w-1/2 flex flex-col items-center md:items-start">
            <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 group">
              <div className="absolute inset-0 bg-gradient-to-r from-theme-primary to-indigo-500 rounded-full animate-pulse blur-sm opacity-75" />
              <div className="absolute inset-1 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden z-10">
                <img 
                  src="/assets/profile.jpeg" 
                  alt="Vijay Raghuwanshi" 
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -inset-2 border-2 border-theme-primary/30 rounded-full animate-ping opacity-40 pointer-events-none" />
            </div>

            <h1 data-aos="fade-up" className="text-4xl md:text-6xl font-black mb-3 tracking-tight bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
              Vijay Raghuwanshi
            </h1>

            <h2 data-aos="fade-up" data-aos-delay="100" className="text-xl md:text-2xl font-semibold text-theme-primary dark:text-theme-primary/90 mb-4">
              Backend Engineer | Big Data Engineer | AI Application Builder
            </h2>

            <p data-aos="fade-up" data-aos-delay="150" className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl leading-relaxed">
              4+ years building scalable distributed systems, data-intensive platforms, and AI-powered products with Python, Go, Java, Spark, Kafka, and cloud-native tooling.
            </p>

            <div data-aos="fade-up" data-aos-delay="200" className="flex flex-wrap justify-center md:justify-start gap-4">
              <a 
                href="https://github.com/ErVijayRaghuwanshi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary-custom px-5 py-3 rounded-xl text-white font-medium text-sm flex items-center shadow-lg hover:shadow-theme-primary/20"
              >
                <i className="fab fa-github mr-2 text-base" /> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/ervijayraghuwanshi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary-custom px-5 py-3 rounded-xl text-white font-medium text-sm flex items-center shadow-lg hover:shadow-theme-primary/20"
              >
                <i className="fab fa-linkedin mr-2 text-base" /> LinkedIn
              </a>
              <a 
                href="/assets/Vijay_Raghuwanshi_Resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary-custom px-5 py-3 rounded-xl text-white font-medium text-sm flex items-center shadow-lg hover:shadow-theme-primary/20"
              >
                <i className="fas fa-download mr-2 text-sm" /> Resume
              </a>
            </div>
          </div>

          {/* Right Column: Visual Box */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-theme-primary to-indigo-500 rounded-full animate-pulse opacity-20 blur-md pointer-events-none" />
              <div className="absolute inset-4 bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-full flex items-center justify-center shadow-2xl backdrop-blur-sm">
                <div className="text-center p-6">
                  <i className="fas fa-code text-5xl md:text-6xl text-theme-primary mb-3" />
                  <p className="text-xl font-bold text-gray-850 dark:text-white">4+ Years of Experience</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Building Scalable & Fault-tolerant Solutions</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 md:mt-16 text-center animate-bounce">
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Scroll to About Section"
          >
            <i className="fas fa-chevron-down text-xl text-gray-400 hover:text-theme-primary transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
};
