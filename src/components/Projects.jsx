import React, { useState, useTransition, useEffect } from 'react';
import AOS from 'aos';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, [activeFilter]);

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'big-data-backend', label: 'Big Data & Backend' },
    { id: 'ai-genai', label: 'AI & GenAI' },
    { id: 'cybersecurity', label: 'Cybersecurity & Systems' },
    { id: 'web-apps', label: 'Web Applications' }
  ];

  const projectsData = [
    {
      title: 'Project Argus',
      categories: ['big-data-backend', 'cybersecurity'],
      status: 'Planning',
      statusClass: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      description: 'High-scale, enterprise-grade telecommunication and IP network intelligence platform designed to ingest, process, correlate, and analyze massive volumes of CDR and IPDR in real time.',
      features: [
        'Ingests 5 to 10 billion events/day horizontally.',
        'Dual-projection storage (Apache Solr & Neo4j graph).',
        'Regex masking and military-grade PII scrubbers.'
      ],
      tags: ['React 19', 'Kafka', 'Spark', 'Neo4j', 'OpenTelemetry'],
      link: 'https://github.com/ErVijayRaghuwanshi/argus',
      icon: 'fas fa-server'
    },
    {
      title: 'Fortress Upload',
      categories: ['big-data-backend', 'cybersecurity'],
      status: 'Completed',
      statusClass: 'bg-green-500/10 text-green-500 border-green-500/20',
      description: 'Defense-in-depth security demonstration implementing a 4-layer validation and sanitization pipeline to securely handle user media uploads.',
      features: [
        'Magic number file header validation & malware scanning.',
        'In-memory Pillow re-encoding to strip polyglot shells.',
        'Stream-based zip-bomb & SSRF quarantine gateways.'
      ],
      tags: ['FastAPI', 'Python 3.13', 'Pillow', 'libmagic'],
      link: 'https://github.com/ErVijayRaghuwanshi/fortress-upload',
      icon: 'fas fa-shield-alt'
    },
    {
      title: 'SignalForge',
      categories: ['big-data-backend'],
      status: 'Completed',
      statusClass: 'bg-green-500/10 text-green-500 border-green-500/20',
      description: 'Modular, high-fidelity synthetic data generator simulating realistic Call Detail Records (CDR) and IP Detail Records (IPDR) with CGNAT tracking.',
      features: [
        'Maps Profiles (Users, Devices, geolocated Towers).',
        'CGNAT allocation simulation and port-level logs.',
        'Exporters support CSV, JSON, and real-time Kafka streams.'
      ],
      tags: ['Python 3.8', 'YAML', 'Faker', 'Kafka', 'Docker'],
      link: 'https://github.com/ErVijayRaghuwanshi/signal-forge',
      icon: 'fas fa-random'
    },
    {
      title: 'Zerodha Support RAG Chatbot',
      categories: ['ai-genai'],
      status: 'Prototype',
      statusClass: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      description: 'Agentic RAG-based application simulating an advanced financial support chatbot system for Zerodha customers.',
      features: [
        'Schema-validated reliable JSON agentic responses.',
        'High-accuracy retrieval from structured database layers.',
        'Structured AI guardrails powered by PydanticAI.'
      ],
      tags: ['Gradio', 'LangChain', 'Ollama', 'ChromaDB', 'PydanticAI'],
      closedSource: true,
      icon: 'fas fa-robot'
    },
    {
      title: 'CDR & IPDR Analytics',
      categories: ['big-data-backend', 'ai-genai'],
      status: 'Completed',
      statusClass: 'bg-green-500/10 text-green-500 border-green-500/20',
      description: 'Big Data analytics platform for telecom metadata focused on SQL rule lifecycle management and interactive detection logics.',
      features: [
        'AI-powered SQL rule explanations for non-technical users.',
        'Robust SQL rule syntax validation & schema checking.',
        'High-performance execution over distributed telecom stores.'
      ],
      tags: ['Big Data', 'SQL Analytics', 'AI Rules', 'Lifecycle Management'],
      link: 'https://ervijayraghuwanshi.github.io/CDR_IPDR/',
      icon: 'fas fa-chart-line'
    },
    {
      title: 'Prompt Gallery',
      categories: ['web-apps', 'ai-genai'],
      status: 'Completed',
      statusClass: 'bg-green-500/10 text-green-500 border-green-500/20',
      description: 'Interactive image search platform and prompt repository featuring 5,000+ high-quality AI-generated images.',
      features: [
        'Sub-millisecond client-side tag search index.',
        'Infinite-scroll layout with optimized image payloads.',
        'Caching mechanisms reducing server roundtrips by 90%.'
      ],
      tags: ['HTML5/CSS3', 'JavaScript', 'AI Prompting', 'Client Caching'],
      link: 'https://ervijayraghuwanshi.github.io/prompt-gallery',
      icon: 'fas fa-images'
    },
    {
      title: 'LightSabre on Laptop',
      categories: ['cybersecurity'],
      status: 'Prototype',
      statusClass: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
      description: 'Ultra-portable network traffic monitoring solution capturing high-speed Ethernet links in air-gapped forensic environments.',
      features: [
        'Real-time 10 Gbps packet capture via custom FPGA.',
        'Awarded at Ideathon 2024 for cybersecurity innovation.',
        'Custom Linux kernel modules and Wireshark dissectors.'
      ],
      tags: ['Rust', 'C', 'FPGA', 'Linux Kernel', 'Wireshark'],
      hardwarePoc: true,
      icon: 'fas fa-bolt'
    },
    {
      title: 'Spring Boot CRUD App',
      categories: ['web-apps', 'big-data-backend'],
      status: 'Educational',
      statusClass: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      description: 'Full-stack web application demonstrating layered backend architectures, RESTful API contract designs, and relational integrations.',
      features: [
        'Strictly decoupled Controller-Service-DAO layers.',
        'Hibernate/JPA ORM schema mappings and persistence.',
        'Structured response entities with MySQL transaction boundaries.'
      ],
      tags: ['Spring Boot', 'Hibernate', 'JPA', 'MySQL'],
      link: 'https://github.com/ErVijayRaghuwanshi/springboot-crud-app',
      icon: 'fas fa-code'
    },
    {
      title: 'YouTube Video Analytics',
      categories: ['web-apps', 'ai-genai'],
      status: 'Active',
      statusClass: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
      description: 'Interactive analytics dashboard leveraging YouTube Data API v3 for deep insights into audience sentiment and video performance.',
      features: [
        'In-browser NLP sentiment parsing & Named Entity Recognition.',
        'Client caching (IndexedDB) yielding 80-90% API reduction.',
        'Dynamic metric aggregations charted through Recharts.'
      ],
      tags: ['React 18', 'Tailwind 4', 'Recharts', 'NLP', 'IndexedDB'],
      link: 'https://github.com/ErVijayRaghuwanshi/yt-analytic',
      icon: 'fab fa-youtube'
    },
    {
      title: 'Livy UI',
      categories: ['big-data-backend', 'web-apps'],
      status: 'Active',
      statusClass: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
      description: 'Modern web-based SQL editor for Apache Livy, enabling users to compose, run, and explore Spark SQL queries directly from the browser.',
      features: [
        'Multi-tab editor with 300+ Spark function autocompletes.',
        'Interactive SQL snippet tab-stops & Hive schema explorer.',
        'Built-in backend-free CORS proxy routing remote connections.'
      ],
      tags: ['React 19', 'Tailwind 4', 'Monaco', 'Livy', 'Spark SQL'],
      link: 'https://github.com/ErVijayRaghuwanshi/livy-ui',
      icon: 'fas fa-terminal'
    },
    {
      title: 'Livy-Next',
      categories: ['big-data-backend'],
      status: 'Active',
      statusClass: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
      description: 'Lightweight successor to Apache Livy written in Go, acting as a gateway that translates REST APIs to gRPC calls over Spark Connect.',
      features: [
        'Spark 4.x Connect Native integration over gRPC (`sc://`).',
        'Embedded dark-mode interactive SQL editor & logs console UI.',
        'Custom naming, offline mock mode, and graceful session release.'
      ],
      tags: ['Golang', 'Spark Connect', 'gRPC', 'Chi Router', 'Swagger'],
      link: 'https://github.com/ErVijayRaghuwanshi/livy-next',
      icon: 'fas fa-server'
    },
    {
      title: 'OSINT Scraper REST API',
      categories: ['big-data-backend', 'cybersecurity'],
      status: 'Active',
      statusClass: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
      description: 'High-performance, scalable OSINT scraping microservice supporting Instagram, X, Snapchat, and Jaco.',
      features: [
        'Hot-reload header rotation (fsnotify) with health scoring.',
        'Highly concurrent engine using Go channels & Gin framework.',
        'Production-hardened TTL caching and custom middleware.'
      ],
      tags: ['Golang', 'Gin', 'Swagger', 'Docker', 'fsnotify'],
      link: 'https://github.com/ErVijayRaghuwanshi/osint-scraper',
      icon: 'fas fa-spider'
    },
    {
      title: 'RadioWave',
      categories: ['web-apps'],
      status: 'Completed',
      statusClass: 'bg-green-500/10 text-green-500 border-green-500/20',
      description: 'Modern radio streaming application supporting global HLS audio streams, real spectrum visualizations, and full PWA offline functionality.',
      features: [
        'Web Audio API AnalyserNode-powered spectrum visualizer.',
        'Picture-in-Picture mode with automatic lock triggers.',
        'PWA with offline shell and background media session sync.'
      ],
      tags: ['React 19', 'Vite 8', 'Tailwind 4', 'hls.js', 'Web Audio'],
      link: 'https://ervijayraghuwanshi.github.io/radio-wave/',
      icon: 'fas fa-broadcast-tower'
    },
    {
      title: 'TubeHub',
      categories: ['web-apps'],
      status: 'Completed',
      statusClass: 'bg-green-500/10 text-green-500 border-green-500/20',
      description: 'Premium YouTube to MP3 & MP4 Converter & Offline Browser Media Center enabling users to convert, transcode, and store media locally for offline playback.',
      features: [
        'Multi-quality MP3 & MP4 extraction with Cloudflare Turnstile security.',
        'IndexedDB binary database storage bypassing standard browser storage limits.',
        'Theater mode overlay with native Chrome auto-PiP on tab switching.'
      ],
      tags: ['React 19', 'Vite', 'Tailwind 4', 'IndexedDB', 'Cloudflare Turnstile'],
      link: 'https://github.com/ErVijayRaghuwanshi/TubeHub',
      icon: 'fas fa-play-circle'
    }
  ];

  const handleFilterChange = (filterId) => {
    startTransition(() => {
      setActiveFilter(filterId);
    });
  };

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.categories.includes(activeFilter);
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-center mb-10">
          <div className="w-12 h-12 bg-theme-primary/10 rounded-xl flex items-center justify-center mr-4">
            <i className="fas fa-project-diagram text-2xl text-theme-primary" />
          </div>
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-extrabold tracking-tight">Featured Projects</h2>
        </div>

        {/* Filter Buttons */}
        <div data-aos="fade-up" data-aos-delay="50" className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto px-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-4 py-2 text-xs md:text-sm font-semibold rounded-full border transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-theme-primary text-white border-theme-primary shadow-md scale-105'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-theme-primary/50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div 
          key={activeFilter}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 transition-opacity duration-300 ${
            isPending ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {filteredProjects.map((project, idx) => (
            <div
              key={project.title}
              data-aos="fade-up"
              data-aos-delay={(idx % 3) * 100 + 50}
              className="project-card card-hover-effect rounded-2xl p-6 md:p-8 flex flex-col h-full animate-scale-in"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-theme-primary/10 rounded-xl flex items-center justify-center mr-3 shrink-0">
                    <i className={`${project.icon} text-lg text-theme-primary`} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-850 dark:text-white leading-tight">
                    {project.title}
                  </h3>
                </div>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md border ${project.statusClass}`}>
                  {project.status}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed flex-grow">
                {project.description}
              </p>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2.5">
                  Key Features
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                  {project.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start">
                      <i className="fas fa-check text-theme-primary mr-2 mt-0.5 text-[10px]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-[11px] font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200/20 text-gray-550 dark:text-gray-450"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer Button */}
              <div className="pt-2 mt-auto">
                {project.closedSource ? (
                  <button className="w-full text-center px-4 py-2.5 rounded-xl text-xs font-bold bg-gray-250 dark:bg-gray-800/80 text-gray-400 border border-gray-200/10 cursor-not-allowed flex items-center justify-center gap-1.5" disabled>
                    PoC / Closed Source <i className="fas fa-lock text-[10px]" />
                  </button>
                ) : project.hardwarePoc ? (
                  <button className="w-full text-center px-4 py-2.5 rounded-xl text-xs font-bold bg-gray-250 dark:bg-gray-800/80 text-gray-400 border border-gray-200/10 cursor-not-allowed flex items-center justify-center gap-1.5" disabled>
                    Hardware PoC <i className="fas fa-microchip text-[10px]" />
                  </button>
                ) : (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full text-center px-4 py-2.5 rounded-xl text-xs font-bold bg-theme-primary/10 hover:bg-theme-primary hover:text-white text-theme-primary border border-theme-primary/20 hover:border-theme-primary transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm active:scale-95"
                  >
                    View Project <i className="fas fa-arrow-right text-[10px]" />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
