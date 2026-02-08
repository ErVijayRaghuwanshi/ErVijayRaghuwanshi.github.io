import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Terminal as TerminalIcon, 
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
  FileJson,
  FileCode,
  Play,
  Settings,
  X,
  Maximize2,
  ChevronDown,
  Search,
  Command,
  Monitor,
  User,
  ExternalLink,
  Folder,
  FileText,
  GitBranch,
  Bell,
  Copy,
  GitGraph,
  Activity,
  Layout
} from 'lucide-react';

/**
 * --- COMPONENT: Particle Background ---
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
        this.size = Math.random() * 2;
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
        ctx.fillStyle = darkMode ? '#3b82f6' : '#2563eb';
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 15000), 50);
      for (let i = 0; i < count; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        p.draw();
        for (let j = i; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = darkMode ? '#3b82f6' : '#2563eb';
            ctx.globalAlpha = 0.1 * (1 - dist / 100);
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
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

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

/**
 * --- COMPONENT: Top Navigation Bar ---
 */
const Navbar = ({ darkMode, setDarkMode, onCommand }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menus = {
    File: [
      { label: "Download Resume", icon: <Download size={14}/>, action: () => onCommand('download_resume') },
      { label: "Export Config", icon: <Command size={14}/>, action: () => alert("Config exported!") },
    ],
    View: [
      { label: "Toggle Sidebar", icon: <Layout size={14}/>, action: () => onCommand('toggle_sidebar') },
      { label: "Toggle Terminal", icon: <TerminalIcon size={14}/>, action: () => onCommand('toggle_terminal') },
    ],
    Social: [
      { label: "GitHub Profile", icon: <Github size={14}/>, action: () => window.open("https://github.com/ErVijayRaghuwanshi") },
      { label: "LinkedIn", icon: <Linkedin size={14}/>, action: () => window.open("https://linkedin.com/in/ervijayraghuwanshi") },
    ]
  };

  return (
    <nav className="h-12 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#181818] flex items-center justify-between px-4 z-50 select-none">
      <div className="flex items-center gap-6" ref={menuRef}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-[10px]">VR</div>
        </div>
        
        <div className="hidden md:flex gap-1">
          {Object.entries(menus).map(([name, items]) => (
            <div key={name} className="relative">
              <button 
                onClick={() => setActiveMenu(activeMenu === name ? null : name)}
                className={`text-xs px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-[#2d2d2d] transition-colors ${activeMenu === name ? 'bg-gray-200 dark:bg-[#2d2d2d]' : 'text-gray-600 dark:text-gray-400'}`}
              >
                {name}
              </button>
              
              {activeMenu === name && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-[#252526] border border-gray-200 dark:border-[#454545] shadow-xl rounded py-1 z-100">
                  {items.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => { item.action(); setActiveMenu(null); }}
                      className="w-full text-left px-4 py-2 text-xs flex items-center gap-2 hover:bg-blue-600 hover:text-white dark:text-gray-300"
                    >
                      {item.icon} {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => onCommand('run_code')}
          className="flex items-center gap-2 px-3 py-1.5 bg-green-700 hover:bg-green-600 text-white rounded text-xs font-medium transition-colors"
        >
          <Play size={12} fill="currentColor" /> Run Build
        </button>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-gray-200 dark:hover:bg-[#2d2d2d] rounded-full text-gray-500 transition-colors"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </nav>
  );
};

/**
 * --- COMPONENT: File Explorer (Sidebar) ---
 */
const FileItem = ({ name, icon, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-1 cursor-pointer text-xs transition-colors ${active ? 'bg-blue-600/20 text-blue-500 border-l-2 border-blue-500' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
  >
    {icon}
    <span>{name}</span>
  </div>
);

const Explorer = ({ activeTab, setActiveTab }) => {
  return (
    <div className="h-full bg-gray-50 dark:bg-[#181818] flex flex-col border-r border-gray-200 dark:border-gray-800">
      <div className="px-4 py-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Explorer</div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="mb-2">
          <div className="flex items-center gap-1 px-2 py-1 text-xs font-bold text-gray-700 dark:text-gray-200">
            <ChevronDown size={14} /> 
            <span className="uppercase">Portfolio</span>
          </div>
          
          <div className="pl-2">
            {/* Documentation Folder */}
            <div className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500">
              <ChevronDown size={14} />
              <Folder size={14} className="text-blue-400" />
              <span>documentation</span>
            </div>
            <div className="pl-4">
              <FileItem 
                name="about.md" 
                icon={<FileCode size={14} className="text-blue-400" />} 
                active={activeTab === 'about.md'}
                onClick={() => setActiveTab('about.md')}
              />
              <FileItem 
                name="experience.json" 
                icon={<FileJson size={14} className="text-yellow-500" />} 
                active={activeTab === 'experience.json'}
                onClick={() => setActiveTab('experience.json')}
              />
            </div>

            {/* Projects Folder */}
            <div className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 mt-1">
              <ChevronRight size={14} />
              <Folder size={14} className="text-green-500" />
              <span>src</span>
            </div>
            
            <FileItem 
              name="skills.tsx" 
              icon={<FileCode size={14} className="text-blue-400" />} 
              active={activeTab === 'skills.tsx'}
              onClick={() => setActiveTab('skills.tsx')}
            />
            <FileItem 
              name="contact.css" 
              icon={<FileText size={14} className="text-pink-400" />} 
              active={activeTab === 'contact.css'}
              onClick={() => setActiveTab('contact.css')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * --- COMPONENT: Main Workspace (Editor) ---
 */
const Workspace = ({ activeTab }) => {
  const renderContent = () => {
    switch (activeTab) {
      case 'about.md':
        return (
          <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl">
            <h1 className="text-4xl font-black">Vijay Raghuwanshi</h1>
            <p className="text-blue-500 font-mono text-sm tracking-widest uppercase">Software Engineer @ ClearTrail Technologies</p>
            <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <p>
                Passionate Software Engineer with <strong className="text-blue-500">4+ years of experience</strong> in API design, 
                cybersecurity, IoT, and building innovative GenAI applications.
              </p>
              <p className="mt-4">
                Currently focusing on creating robust and scalable solutions using <span className="bg-gray-200 dark:bg-gray-800 px-1 rounded font-mono text-xs">Python</span>, 
                <span className="bg-gray-200 dark:bg-gray-800 px-1 rounded font-mono text-xs">FastAPI</span>, and 
                <span className="bg-gray-200 dark:bg-gray-800 px-1 rounded font-mono text-xs">LLM Orchestration</span>. 
                I combine hardware knowledge (EEE background) with software expertise.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-gray-50 dark:bg-[#252526] rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xs text-gray-500 font-bold uppercase mb-1">Total Solved</h3>
                <div className="text-2xl font-black text-blue-500">150+</div>
                <div className="text-[10px] text-gray-400">LeetCode Problems</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#252526] rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-xs text-gray-500 font-bold uppercase mb-1">Projects</h3>
                <div className="text-2xl font-black text-green-500">12+</div>
                <div className="text-[10px] text-gray-400">Production Ready</div>
              </div>
            </div>
          </div>
        );

      case 'experience.json':
        return (
          <div className="font-mono text-sm space-y-4">
            <span className="text-gray-500">// Professional Experience Log</span>
            <pre className="text-green-400 whitespace-pre-wrap">{`[
  {
    "company": "ClearTrail Technologies",
    "role": "Software Engineer",
    "years": "2021 - Present",
    "stack": ["Python", "FastAPI", "Big Data"],
    "highlight": "Optimized SQL rule engine for 32M+ rows"
  },
  {
    "education": "RGPV University",
    "degree": "B.Tech (Honours)",
    "major": "Electrical & Electronics",
    "gpa": "7.59/10"
  }
]`}</pre>
          </div>
        );

      case 'skills.tsx':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
               { title: "Backend", skills: ["Python", "Java", "Spring Boot", "FastAPI", "Django"], color: "blue" },
               { title: "Data & AI", skills: ["GenAI", "LangChain", "Kafka", "Airflow", "Spark"], color: "purple" },
               { title: "DevOps", skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Linux"], color: "green" },
               { title: "Tools", skills: ["Git", "Postman", "N8N", "Jira", "VS Code"], color: "orange" },
             ].map((cat, i) => (
               <div key={i} className="bg-gray-50 dark:bg-[#252526] p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                 <h3 className={`text-${cat.color}-500 font-bold mb-3`}>{cat.title}</h3>
                 <div className="flex flex-wrap gap-2">
                   {cat.skills.map(s => (
                     <span key={s} className="px-2 py-1 text-xs bg-white dark:bg-[#1e1e1e] rounded border border-gray-200 dark:border-gray-600">{s}</span>
                   ))}
                 </div>
               </div>
             ))}
          </div>
        );
        
      case 'contact.css':
        return (
          <div className="font-mono text-sm">
            <pre className="text-pink-400 whitespace-pre-wrap">{`.contact-info {
  email: "ervijayraghuwanshi@gmail.com";
  phone: "+91 9755491130";
  location: "Indore, India";
  status: "Open to opportunities";
}

.socials {
  github: "github.com/ErVijayRaghuwanshi";
  linkedin: "linkedin.com/in/ervijayraghuwanshi";
}`}</pre>
          </div>
        );

      default:
        return <div className="flex items-center justify-center h-full text-gray-500">Select a file to view content</div>;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-[#1e1e1e]">
      {/* Tab Header */}
      <div className="h-9 bg-gray-100 dark:bg-[#2d2d2d] flex items-center px-2 border-b border-gray-200 dark:border-[#1e1e1e]">
        <div className="px-4 py-2 bg-white dark:bg-[#1e1e1e] text-xs border-t-2 border-blue-500 text-gray-700 dark:text-gray-200 flex items-center gap-2">
          {activeTab.includes('json') ? <span className="text-yellow-500">{"{}"}</span> : 
           activeTab.includes('css') ? <span className="text-blue-300">#</span> : 
           <span className="text-blue-500">M</span>}
          {activeTab}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        {renderContent()}
      </div>
    </div>
  );
};

/**
 * --- COMPONENT: Terminal (Bottom Panel) ---
 */
const Terminal = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState([
    { type: 'info', content: 'Welcome to VijayOS v2.0.0' },
    { type: 'info', content: 'Type "help" to see available commands.' },
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isOpen]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'input', content: input }];
      
      let response = '';
      switch (cmd) {
        case 'help':
          response = 'Available commands: help, clear, about, contact, projects, download resume';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'contact':
          response = 'Email: ervijayraghuwanshi@gmail.com | Phone: +91 9755491130';
          break;
        case 'about':
          response = 'Vijay Raghuwanshi: Backend Engineer specializing in Python & AI.';
          break;
        case 'projects':
          response = 'Check out the "src" folder in the explorer sidebar!';
          break;
        case 'download resume':
          response = 'Downloading resume...';
          window.open('/assets/Vijay_Raghuwanshi_Resume.pdf');
          break;
        default:
          response = `Command not found: ${cmd}`;
      }
      
      if (response) newHistory.push({ type: 'output', content: response });
      setHistory(newHistory);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="h-full bg-[#1e1e1e] text-gray-300 font-mono text-sm p-4 overflow-y-auto custom-scrollbar border-t border-gray-700">
      {history.map((line, i) => (
        <div key={i} className={`mb-1 ${line.type === 'input' ? 'text-white' : line.type === 'output' ? 'text-blue-400' : 'text-green-500'}`}>
          {line.type === 'input' ? '> ' : ''}{line.content}
        </div>
      ))}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-green-500">➜</span>
        <span className="text-blue-400">~</span>
        <input 
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="bg-transparent border-none outline-none flex-1 text-white focus:ring-0"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
};

/**
 * --- COMPONENT: Status Bar (Footer) ---
 */
const StatusBar = ({ githubData }) => {
  return (
    <footer className="h-6 bg-blue-600 text-white flex items-center justify-between px-3 text-[10px] font-medium shrink-0 select-none z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 hover:bg-blue-700 px-2 py-0.5 rounded cursor-pointer">
          <GitBranch size={10} />
          <span>main*</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
          <span>0 Errors</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline opacity-80">
          {githubData.loading ? 'Fetching stats...' : `Last commit: "${githubData.message}"`}
        </span>
        <div className="flex items-center gap-2">
          <span>Ln 42, Col 12</span>
          <span>UTF-8</span>
          <div className="hover:bg-blue-700 p-1 rounded cursor-pointer">
            <Bell size={10} />
          </div>
        </div>
      </div>
    </footer>
  );
};

/**
 * --- MAIN APP LAYOUT ---
 */
export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('about.md');
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [terminalHeight, setTerminalHeight] = useState(150);
  const [showTerminal, setShowTerminal] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  
  // Resizing State
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingTerminal, setIsResizingTerminal] = useState(false);

  // Stats Hook (Mocked for simplicity)
  const [githubData] = useState({ message: "feat: updated portfolio layout", loading: false });

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  // --- Resize Handlers ---
  const handleMouseMove = useCallback((e) => {
    if (isResizingSidebar) {
      const newWidth = e.clientX;
      if (newWidth > 150 && newWidth < 500) setSidebarWidth(newWidth);
    }
    if (isResizingTerminal) {
      const newHeight = window.innerHeight - e.clientY - 24; // 24px is footer height
      if (newHeight > 30 && newHeight < window.innerHeight - 100) setTerminalHeight(newHeight);
    }
  }, [isResizingSidebar, isResizingTerminal]);

  const handleMouseUp = useCallback(() => {
    setIsResizingSidebar(false);
    setIsResizingTerminal(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // --- Layout Commands ---
  const handleCommand = (cmd) => {
    if (cmd === 'toggle_sidebar') setShowSidebar(p => !p);
    if (cmd === 'toggle_terminal') setShowTerminal(p => !p);
    if (cmd === 'download_resume') window.open('/assets/Vijay_Raghuwanshi_Resume.pdf');
    if (cmd === 'run_code') alert('Build started! Check terminal for output.');
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 font-sans transition-colors selection:bg-blue-500/30">
      <style>{`
        .resize-handle-v { width: 4px; cursor: col-resize; transition: background 0.2s; z-index: 50; }
        .resize-handle-v:hover, .resize-handle-v.active { background: #3b82f6; }
        .resize-handle-h { height: 4px; cursor: row-resize; transition: background 0.2s; z-index: 50; }
        .resize-handle-h:hover, .resize-handle-h.active { background: #3b82f6; }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }
      `}</style>

      <ParticleBackground darkMode={darkMode} />
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} onCommand={handleCommand} />

      {/* Main Layout Area */}
      <div className="flex-1 flex overflow-hidden relative z-10 mt-12">
        
        {/* Activity Bar (Fixed Left) */}
        <div className="w-12 border-r border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#181818] flex flex-col items-center py-4 gap-6 shrink-0 z-20">
          <Copy size={24} className="text-gray-400 hover:text-white cursor-pointer active:text-blue-500" />
          <Search size={24} className="text-gray-400 hover:text-white cursor-pointer" />
          <GitGraph size={24} className="text-gray-400 hover:text-white cursor-pointer" />
          <Activity size={24} className="text-gray-400 hover:text-white cursor-pointer mt-auto" />
        </div>

        {/* Sidebar Panel */}
        {showSidebar && (
          <div style={{ width: sidebarWidth }} className="flex shrink-0">
            <Explorer activeTab={activeTab} setActiveTab={setActiveTab} />
            <div 
              className={`resize-handle-v h-full bg-transparent hover:bg-blue-500 ${isResizingSidebar ? 'bg-blue-500' : ''}`}
              onMouseDown={() => setIsResizingSidebar(true)}
              onDoubleClick={() => setSidebarWidth(sidebarWidth === 250 ? 150 : 250)}
            />
          </div>
        )}

        {/* Main Editor & Terminal Area */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#1e1e1e]">
          {/* Top Editor View */}
          <div className="flex-1 overflow-hidden relative">
            <Workspace activeTab={activeTab} />
          </div>

          {/* Bottom Terminal Panel */}
          {showTerminal && (
            <div className="flex flex-col shrink-0" style={{ height: terminalHeight }}>
              <div 
                className={`resize-handle-h w-full bg-gray-800 hover:bg-blue-500 ${isResizingTerminal ? 'bg-blue-500' : ''}`}
                onMouseDown={() => setIsResizingTerminal(true)}
                onDoubleClick={() => setTerminalHeight(terminalHeight === 150 ? 300 : 150)}
              />
              <div className="h-full border-t border-gray-700 bg-[#1e1e1e]">
                <div className="flex items-center px-4 py-1 bg-[#1e1e1e] border-b border-gray-700 gap-4 text-xs font-bold text-gray-400">
                  <span className="cursor-pointer hover:text-white text-white border-b border-blue-500">TERMINAL</span>
                  <span className="cursor-pointer hover:text-white">OUTPUT</span>
                  <span className="cursor-pointer hover:text-white">DEBUG CONSOLE</span>
                </div>
                <Terminal isOpen={true} onClose={() => setShowTerminal(false)} />
              </div>
            </div>
          )}
        </div>
      </div>

      <StatusBar githubData={githubData} />
    </div>
  );
}