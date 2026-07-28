import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import { ParticlesBg } from './components/ParticlesBg';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { LeetCode } from './components/LeetCode';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 600,
      offset: 100,
      once: true
    });
  }, []);

  return (
    <ThemeProvider>
      {/* Fullscreen Loader Screen */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* Background Particles Layer */}
      <ParticlesBg />

      {/* Page Content */}
      <div className="relative min-h-screen z-10 flex flex-col">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-grow">
          {/* Hero Intro */}
          <Hero />

          {/* About details */}
          <About />

          {/* Technical Skills */}
          <Skills />

          {/* Education & Certs */}
          <Education />

          {/* Portfolio Projects */}
          <Projects />

          {/* LeetCode stats */}
          <LeetCode />

          {/* Get in touch */}
          <Contact />
        </main>

        {/* Page Footer */}
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
