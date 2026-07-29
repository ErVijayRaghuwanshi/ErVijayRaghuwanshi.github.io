import React from 'react';

export const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/ErVijayRaghuwanshi', icon: 'fab fa-github' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/ervijayraghuwanshi/', icon: 'fab fa-linkedin' },
    { name: 'WhatsApp', href: 'https://wa.me/919755491130?text=Hello Vijay, I came across your portfolio and would like to connect.', icon: 'fab fa-whatsapp' },
    { name: 'X', href: 'https://x.com/ErVijayRaghu1c', icon: 'fab fa-x' },
    { name: 'Instagram', href: 'https://instagram.com/er.vijayraghuwanshi', icon: 'fab fa-instagram' },
    { name: 'Email', href: 'mailto:ervijayraghuwanshi@gmail.com?subject=Portfolio%20Contact&body=Hello%20Vijay,%0A%0AI%20just%20checked%20your%20portfolio%20and%20would%20like%2520to%2520connect.', icon: 'fas fa-envelope' },
    { name: 'Phone', href: 'tel:+919755491130', icon: 'fas fa-phone' }
  ];

  return (
    <footer className="bg-gray-950 text-gray-400 py-12 border-t border-gray-900">
      <div className="container mx-auto px-4 text-center">
        
        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-450 hover:text-white transition-colors duration-300 text-xl"
              title={social.name}
              aria-label={social.name}
            >
              <i className={social.icon} />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-gray-800 mx-auto mb-8" />

        {/* Copyright */}
        <p className="text-sm font-semibold tracking-wide text-gray-500">
          &copy; {new Date().getFullYear()} Vijay Raghuwanshi. All rights reserved.
        </p>

      </div>
    </footer>
  );
};
