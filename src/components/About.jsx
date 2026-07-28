import React from 'react';

export const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-center mb-12">
          <i className="fas fa-user-circle text-4xl text-theme-primary mr-4" />
          <h2 className="text-4xl font-bold">About Me</h2>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700 dark:text-gray-300">
          <p>
            <i className="fas fa-code text-theme-primary mr-2" />
            I’m a Software Engineer at ClearTrail Technologies focused on backend engineering, big data systems, and
            AI-driven applications. I build reliable platforms for high-volume analytics and intelligence workflows using
            microservices and distributed architectures.
          </p>

          <p>
            <i className="fas fa-database text-theme-primary mr-2" />
            My work includes developing telecom/OSINT data pipelines, optimizing large-scale query performance, and
            delivering production-ready systems with strong observability and CI/CD practices. I work across Python, Go,
            Java, Spark, Kafka, PostgreSQL, Elasticsearch, Docker, Kubernetes, AWS, and GCP.
          </p>

          <p>
            <i className="fas fa-rocket text-theme-primary mr-2" />
            I also build product-focused projects such as <strong>Akashvani Radio</strong>, <strong>Livy UI</strong>, and
            <strong>OSINT Scraper REST API</strong>—combining clean UX with strong engineering fundamentals.
          </p>
        </div>

      </div>
    </section>
  );
};
