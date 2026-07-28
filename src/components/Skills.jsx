import React from 'react';

export const Skills = () => {
  const categories = [
    {
      title: 'Languages & Frameworks',
      icon: 'fas fa-code',
      skills: [
        { name: 'Python', icon: '/assets/icons/python-svgrepo-com.svg' },
        { name: 'Java', icon: '/assets/icons/java-svgrepo-com.svg' },
        { name: 'Spring Boot', icon: '/assets/icons/Spring.svg' },
        { name: 'Hibernate', icon: '/assets/icons/Hibernate.svg' },
        { name: 'JavaScript', icon: '/assets/icons/js-svgrepo-com.svg' },
        { name: 'FastAPI', icon: '/assets/icons/FastAPI.svg' },
        { name: 'SQLAlchemy', icon: '/assets/icons/SQLAlchemy.svg' },
        { name: 'Flask', icon: '/assets/icons/flask-svgrepo-com.svg' },
        { name: 'TailwindCSS', icon: '/assets/icons/tailwindcss-icon-svgrepo-com.svg' },
        { name: 'PySpark', icon: '/assets/icons/Apache Spark.svg' }
      ]
    },
    {
      title: 'Tools & Platforms',
      icon: 'fas fa-tools',
      skills: [
        { name: 'Linux', icon: '/assets/icons/linux-svgrepo-com.svg' },
        { name: 'Docker', icon: '/assets/icons/docker-svgrepo-com.svg' },
        { name: 'AWS', icon: '/assets/icons/aws-svgrepo-com.svg' },
        { name: 'Vagrant', icon: '/assets/icons/HashiCorp Vagrant.svg' },
        { name: 'CI-CD', icon: '/assets/icons/gitlab-svgrepo-com.svg' },
        { name: 'Jenkins', icon: '/assets/icons/Jenkins.svg' },
        { name: 'RabbitMQ', icon: '/assets/icons/RabbitMQ.svg' },
        { name: 'Airflow', icon: '/assets/icons/Apache-Airflow.svg' },
        { name: 'Kafka', icon: '/assets/icons/Apache-Kafka.svg' },
        { name: 'HDFS', icon: '/assets/icons/Apache-Hadoop.svg' },
        { name: 'Solr', icon: '/assets/icons/solr-svgrepo-com.svg' }
      ]
    },
    {
      title: 'Specialized Skills',
      icon: 'fas fa-star',
      skills: [
        { name: 'GenAI', faIcon: 'fas fa-robot' },
        { name: 'pydantic-ai', faIcon: 'fab fa-python' },
        { name: 'LLMs', faIcon: 'fas fa-brain' },
        { name: 'LangChain', faIcon: 'fas fa-link' },
        { name: 'Cybersecurity', faIcon: 'fas fa-shield-alt' },
        { name: 'Big Data Pipelines', faIcon: 'fas fa-stream' },
        { name: 'N8N', faIcon: 'fas fa-cogs' }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-center mb-16">
          <div className="w-12 h-12 bg-theme-primary/10 rounded-xl flex items-center justify-center mr-4">
            <i className="fas fa-code text-2xl text-theme-primary" />
          </div>
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-extrabold tracking-tight">Technical Skills</h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              data-aos="fade-up"
              data-aos-delay={(idx + 1) * 100}
              className="bg-white dark:bg-gray-800/40 border border-gray-150 dark:border-gray-800/70 p-6 md:p-8 rounded-2xl shadow-sm transition-all duration-300 hover:border-theme-primary/20 hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <div className="w-9 h-9 bg-theme-primary/10 rounded-lg flex items-center justify-center mr-3">
                  <i className={`${cat.icon} text-theme-primary`} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-gray-850 dark:text-white">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="skill-badge-custom inline-flex items-center px-3.5 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-default select-none shadow-sm"
                  >
                    {skill.icon ? (
                      <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-4 h-4 mr-2" 
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <i className={`${skill.faIcon} mr-2 text-xs text-theme-primary`} />
                    )}
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
