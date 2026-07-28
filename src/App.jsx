import React from 'react';
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

function App() {
  return (
    <ThemeProvider>
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
