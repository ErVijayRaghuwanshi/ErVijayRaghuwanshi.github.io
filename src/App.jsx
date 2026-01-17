// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Terminal, 
  Database, 
  Cpu, 
  GraduationCap, 
  Award, 
  Phone, 
  MessageSquare,
  ChevronRight,
  Sun,
  Moon,
  ShieldCheck,
  BrainCircuit,
  Workflow,
  Download,
  Twitter,
  Instagram,
  ChevronDown
} from 'lucide-react';

/**
 * UTILS & HOOKS
 */

const useGitHubStats = () => {
  const [data, setData] = useState({ date: '', message: '', loading: true });

  useEffect(() => {
    const fetchCommit = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/ervijayraghuwanshi/ErVijayRaghuwanshi.github.io/commits?per_page=1"
        );
        const commits = await response.json();
        if (commits && commits[0]) {
          const commitDate = new Date(commits[0].commit.committer.date);
          setData({
            date: commitDate.toLocaleDateString(undefined, { dateStyle: 'medium' }),
            message: commits[0].commit.message,
            loading: false
          });
        }
      } catch (error) {
        setData(prev => ({ ...prev, loading: false }));
      }
    };
    fetchCommit();
  }, []);

  return data;
};

/**
 * COMPONENTS
 */

const ParticleBackground = ({ darkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(37, 99, 235, 0.15)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 10000), 100);
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

const LoadingScreen = ({ show }) => {
  const { date, message, loading } = useGitHubStats();

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-100 bg-white dark:bg-gray-900 flex items-center justify-center transition-opacity duration-700">
      <div className="text-center animate-pulse">
        <div className="text-5xl font-black bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          VR
        </div>
        {!loading && (
          <div className="space-y-2">
            <p className="text-gray-500 dark:text-gray-400 text-sm">Last Updated: {date}</p>
            <p className="text-gray-400 dark:text-gray-500 text-xs italic max-w-xs truncate mx-auto">"{message}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { name: 'About', href: '#about', icon: <Code2 size={16} /> },
    { name: 'Skills', href: '#skills', icon: <Terminal size={16} /> },
    { name: 'Education', href: '#education', icon: <GraduationCap size={16} /> },
    { name: 'Projects', href: '#projects', icon: <Database size={16} /> },
    { name: 'LeetCode', href: '#leetcode', icon: <Award size={16} /> },
    { name: 'Contact', href: '#contact', icon: <Mail size={16} /> },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-black">VR</span>
          </div>
          <span className="text-xl font-bold hidden sm:block">Vijay Raghuwanshi</span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {links.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-semibold hover:text-blue-600 transition-colors flex items-center gap-2">
              {link.name}
            </a>
          ))}
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
            {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
          </button>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          <Workflow size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'} bg-white dark:bg-gray-900 border-b dark:border-gray-800`}>
        <div className="flex flex-col p-6 space-y-4">
          {links.map(link => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="flex items-center gap-4 text-lg font-medium">
              {link.icon} {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero = () => (
  <section id="home" className="min-h-screen flex items-center pt-20 relative">
    <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
      <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
        <div className="space-y-4">
          <div className="relative w-40 h-40 group">
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
            <img 
              src="assets/profile.jpeg" 
              alt="Vijay" 
              className="relative w-40 h-40 object-cover rounded-3xl border-2 border-white dark:border-gray-800"
              onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Vijay+Raghuwanshi&background=2563eb&color=fff"; }}
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">Vijay <span className="text-blue-600">Raghuwanshi</span></h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-lg">
            Software Engineer | GenAI Specialist | Cybersecurity Expert
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a href="https://github.com/ErVijayRaghuwanshi" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white dark:bg-white dark:text-black rounded-xl font-bold hover:scale-105 transition-transform">
            <Github size={20} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/ervijayraghuwanshi/" target="_blank" className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:scale-105 transition-transform">
            <Linkedin size={20} /> LinkedIn
          </a>
          <a href="assets/Vijay_Raghuwanshi_Resume.pdf" className="flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all">
            <Download size={20} /> Resume
          </a>
        </div>
      </div>

      <div className="hidden md:flex justify-center animate-in fade-in zoom-in duration-1000">
        <div className="relative p-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-[3rem] border border-white/20 shadow-2xl">
          <Cpu size={120} className="text-blue-600 mb-6 mx-auto animate-pulse" />
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-black">4+ Years</h3>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Experience</p>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
      <ChevronDown className="text-gray-400" />
    </div>
  </section>
);

const Skills = () => {
  const categories = [
    {
      title: "Languages & Frameworks",
      icon: <Code2 className="text-blue-500" />,
      items: ["Python", "Java", "Spring Boot", "FastAPI", "JavaScript", "Django", "PySpark", "Tailwind"]
    },
    {
      title: "Tools & DevOps",
      icon: <Terminal className="text-green-500" />,
      items: ["Docker", "AWS", "Linux", "Kafka", "Airflow", "Jenkins", "RabbitMQ", "HDFS", "Git"]
    },
    {
      title: "Specialized AI",
      icon: <BrainCircuit className="text-purple-500" />,
      items: ["GenAI", "LangChain", "LLMs", "Pydantic-AI", "Cybersecurity", "RAG Systems", "N8N"]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-center mb-16">Technical Arsenal</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all">
              <div className="flex items-center gap-3 mb-8">
                {cat.icon}
                <h3 className="text-xl font-bold">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map(item => (
                  <span key={item} className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors cursor-default">
                    {item}
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

const Projects = () => {
  const list = [
    {
      title: "Zerodha RAG Chatbot",
      desc: "Agentic RAG application simulating financial support. Uses Pydantic-AI for schema-validated, reliable agentic responses.",
      tech: ["LangChain", "Ollama", "ChromaDB"],
      icon: <MessageSquare />
    },
    {
      title: "Telecom Analytics AI",
      desc: "Big Data platform for telecom metadata (CDR/IPDR) with AI-enhanced rule management for law enforcement.",
      tech: ["Big Data", "SQL", "GenAI"],
      link: "https://ervijayraghuwanshi.github.io/CDR_IPDR/",
      icon: <Database />
    },
    {
      title: "Prompt Gallery",
      desc: "Search engine for 5,000+ AI-generated images with creative prompt exploration and keyword indexing.",
      tech: ["React", "Client-side Search"],
      link: "https://ervijayraghuwanshi.github.io/prompt-gallery",
      icon: <Workflow />
    },
    {
      title: "LightSabre Network",
      desc: "Portable network traffic monitoring for high-speed air-gapped links. Ideathon 2024 Award Winner.",
      tech: ["Cybersecurity", "IoT"],
      icon: <ShieldCheck />
    }
  ];

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-black text-center mb-16">Featured Work</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {list.map((proj, i) => (
            <div key={i} className="group p-8 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 hover:border-blue-500 transition-all flex flex-col md:flex-row gap-6">
              <div className="w-16 h-16 shrink-0 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
                {proj.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{proj.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{proj.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {proj.tech.map(t => <span key={t} className="text-[10px] uppercase font-black tracking-widest text-blue-600">{t}</span>)}
                </div>
                {proj.link && (
                  <a href={proj.link} target="_blank" className="inline-flex items-center gap-2 text-blue-600 font-bold group-hover:gap-4 transition-all">
                    View Project <ChevronRight size={16} />
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

const LeetCode = () => {
  const [stats, setStats] = useState({ solved: '...', easy: '...', med: '...', hard: '...' });

  useEffect(() => {
    fetch("https://leetcode-stats-api.herokuapp.com/ervijayraghuwanshi")
      .then(res => res.json())
      .then(data => setStats({
        solved: data.totalSolved,
        easy: data.easySolved,
        med: data.mediumSolved,
        hard: data.hardSolved
      }))
      .catch(() => {});
  }, []);

  return (
    <section id="leetcode" className="py-24 bg-gray-50/50 dark:bg-gray-900/30">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-black text-center mb-16">Algorithm Mastery</h2>
        <div className="bg-white dark:bg-gray-800 rounded-[3rem] p-12 shadow-2xl border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center gap-12">
          <div className="text-center md:text-left space-y-2">
            <div className="text-7xl font-black text-blue-600">{stats.solved}</div>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Solved Overall</p>
          </div>
          
          <div className="flex-1 grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-black text-green-500">{stats.easy}</div>
              <p className="text-[10px] font-bold text-gray-400">EASY</p>
            </div>
            <div>
              <div className="text-2xl font-black text-yellow-500">{stats.med}</div>
              <p className="text-[10px] font-bold text-gray-400">MEDIUM</p>
            </div>
            <div>
              <div className="text-2xl font-black text-red-500">{stats.hard}</div>
              <p className="text-[10px] font-bold text-gray-400">HARD</p>
            </div>
          </div>

          <div className="flex gap-4">
            <img src="https://assets.leetcode.com/static_assets/others/Top_SQL_50.gif" className="w-16 h-16 grayscale hover:grayscale-0 transition" alt="Badge" />
            <img src="https://assets.leetcode.com/static_assets/others/Introduction_to_Pandas.gif" className="w-16 h-16 grayscale hover:grayscale-0 transition" alt="Badge" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer id="contact" className="py-24 bg-gray-900 text-white">
    <div className="container mx-auto px-6 text-center space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-black">Let's Connect</h2>
        <p className="text-gray-400 max-w-md mx-auto">Open for collaborations in AI, Big Data, and Backend Engineering.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {[
          { icon: <Github />, link: "https://github.com/ErVijayRaghuwanshi" },
          { icon: <Linkedin />, link: "https://www.linkedin.com/in/ervijayraghuwanshi/" },
          { icon: <Twitter />, link: "https://x.com/ErVijayRaghu1c" },
          { icon: <Instagram />, link: "https://instagram.com/er.vijayraghuwanshi" },
          { icon: <Mail />, link: "mailto:ervijayraghuwanshi@gmail.com" },
        ].map((item, i) => (
          <a key={i} href={item.link} target="_blank" className="p-4 bg-gray-800 rounded-2xl hover:bg-blue-600 transition-colors">
            {item.icon}
          </a>
        ))}
      </div>

      <div className="pt-12 border-t border-gray-800">
        <p className="text-gray-500 text-sm">© 2025 Vijay Raghuwanshi. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

/**
 * MAIN APP
 */

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Theme application
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Loader delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors selection:bg-blue-600 selection:text-white">
      <style>{`
        @keyframes scaleIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in { animation: scaleIn 0.5s ease-out forwards; }
        html { scroll-behavior: smooth; }
      `}</style>
      
      <LoadingScreen show={loading} />
      <ParticleBackground darkMode={darkMode} />
      
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <main className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
        <Hero />
        
        <section id="about" className="py-24">
          <div className="container mx-auto px-6 max-w-3xl space-y-8">
            <h2 className="text-4xl font-black text-center">About Me</h2>
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
              Passionate Software Engineer with 4+ years of experience in API design, cybersecurity, and IoT. 
              Currently at <span className="text-blue-600 font-bold">ClearTrail Technologies</span>, I focus on building robust, scalable solutions using Python, FastAPI, and GenAI. 
              With an EEE background, I bridge the gap between hardware and software.
            </p>
          </div>
        </section>

        <Skills />
        
        <section id="education" className="py-24">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-black text-center mb-16">Academics</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl space-y-6">
                <div className="flex items-center gap-4 text-blue-600">
                  <GraduationCap size={32} />
                  <h3 className="text-2xl font-bold">B.Tech (EEE)</h3>
                </div>
                <div>
                  <p className="font-bold">Rajiv Gandhi Prodyogiki Vishwavidyalaya</p>
                  <p className="text-sm text-gray-500">Aug 2018 - Jun 2021 | Honours (7.59/10)</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed italic">Focused on IoT voice assistants, solar MPPT projects, and Computer Vision gestural controls.</p>
              </div>
              <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl space-y-6">
                <div className="flex items-center gap-4 text-purple-600">
                  <ShieldCheck size={32} />
                  <h3 className="text-2xl font-bold">Certifications</h3>
                </div>
                <ul className="space-y-3 text-sm font-medium">
                  <li className="flex gap-2"><span>•</span> Python Advanced (Udemy)</li>
                  <li className="flex gap-2"><span>•</span> Data Analysis with Pandas (Coursera)</li>
                  <li className="flex gap-2"><span>•</span> Computer Networking (Coursera)</li>
                  <li className="flex gap-2"><span>•</span> DevOps Fundamentals (Udemy)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Projects />
        <LeetCode />
      </main>
      
      <Footer />
    </div>
  );
}