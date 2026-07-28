import React from 'react';

export const Contact = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-center mb-12">
          <div className="w-12 h-12 bg-theme-primary/10 rounded-xl flex items-center justify-center mr-4">
            <i className="fas fa-envelope text-2xl text-theme-primary" />
          </div>
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-extrabold tracking-tight">Get in Touch</h2>
        </div>

        <div className="max-w-xl mx-auto text-center">
          <p data-aos="fade-up" data-aos-delay="100" className="text-base md:text-lg text-gray-655 dark:text-gray-350 leading-relaxed">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </div>

      </div>
    </section>
  );
};
