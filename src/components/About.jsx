import React from 'react';

export const About = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-800/40 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-center mb-16">
          <div className="w-12 h-12 bg-theme-primary/10 rounded-xl flex items-center justify-center mr-4">
            <i className="fas fa-user-circle text-2xl text-theme-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">About Me</h2>
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto space-y-8 text-gray-700 dark:text-gray-300">
          
          <div className="flex items-start bg-gray-50 dark:bg-gray-850 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 hover:border-theme-primary/20">
            <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center shrink-0 mr-4 mt-1">
              <i className="fas fa-code text-theme-primary" />
            </div>
            <div>
              <p className="text-base md:text-lg leading-relaxed font-medium">
                I’m a Software Engineer at ClearTrail Technologies focused on backend engineering, big data systems, and AI-driven applications. I build reliable platforms for high-volume analytics and intelligence workflows using microservices and distributed architectures.
              </p>
            </div>
          </div>

          <div className="flex items-start bg-gray-50 dark:bg-gray-850 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 hover:border-theme-primary/20">
            <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center shrink-0 mr-4 mt-1">
              <i className="fas fa-database text-theme-primary" />
            </div>
            <div>
              <p className="text-base md:text-lg leading-relaxed font-medium">
                My work includes developing telecom/OSINT data pipelines, optimizing large-scale query performance, and delivering production-ready systems with strong observability and CI/CD practices. I work across Python, Go, Java, Spark, Kafka, PostgreSQL, Elasticsearch, Docker, Kubernetes, AWS, and GCP.
              </p>
            </div>
          </div>

          <div className="flex items-start bg-gray-50 dark:bg-gray-850 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 hover:border-theme-primary/20">
            <div className="w-10 h-10 rounded-full bg-theme-primary/10 flex items-center justify-center shrink-0 mr-4 mt-1">
              <i className="fas fa-rocket text-theme-primary" />
            </div>
            <div>
              <p className="text-base md:text-lg leading-relaxed font-medium">
                I also build product-focused projects such as <strong>Akashvani Radio</strong>, <strong>Livy UI</strong>, and <strong>OSINT Scraper REST API</strong>—combining clean UX with strong engineering fundamentals.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
