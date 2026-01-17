<script setup>
import profileImage from '/src/assets/profile.jpeg'; // Ensure this image exists in src/assets/

// Shared classes to keep the template clean
const btnClasses = "inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300";
</script>

<template>
  <section id="home" class="hero-section min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
    <!-- Background Overlay -->
    <!-- <div class="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20 -z-10">
    </div> -->
<div class="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
    <div class="container mx-auto px-4 relative z-10">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        
        <!-- Left Column: Text Content -->
        <div class="text-left md:w-1/2">
          
          <!-- Mobile/Desktop Profile Image Wrapper -->
          <div class="relative w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0 mb-8">
            <div class="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full animate-pulse">
            </div>
            <div class="absolute inset-2 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center overflow-hidden">
              <img :src="profileImage" alt="Vijay Raghuwanshi" class="w-full h-full object-cover rounded-full">
            </div>
            <div class="absolute -inset-4 border-4 border-blue-500/20 rounded-full animate-ping"></div>
          </div>

          <!-- Name & Title -->
          <h1 class="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300" data-aos="fade-up">
            Vijay Raghuwanshi
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8" data-aos="fade-up" data-aos-delay="100">
            <span class="inline-block animate-scale-in">👨‍💻</span> Software Engineer |
            <span class="inline-block animate-scale-in">🤖</span> GenAI Specialist |
            <span class="inline-block animate-scale-in">🛡️</span> Cybersecurity Expert
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-4" data-aos="fade-up" data-aos-delay="200">
            <a href="https://github.com/ErVijayRaghuwanshi" target="_blank" :class="btnClasses">
              <i class="fab fa-github mr-2"></i>GitHub
            </a>
            <a href="https://www.linkedin.com/in/ervijayraghuwanshi/" target="_blank" :class="btnClasses">
              <i class="fab fa-linkedin mr-2"></i>LinkedIn
            </a>
            <!-- Assuming resume is in public/assets/ folder -->
            <a href="/assets/Vijay_Raghuwanshi_Resume.pdf" target="_blank" :class="btnClasses">
              <i class="fas fa-download mr-2"></i>Download Resume
            </a>
          </div>
        </div>

        <!-- Right Column: Experience Circle Graphic -->
        <div class="md:w-1/2 flex justify-center">
          <div class="relative w-64 h-64 md:w-80 md:h-80">
            <div class="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full animate-pulse opacity-50">
            </div>
            <div class="absolute inset-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
              <div class="text-center">
                <i class="fas fa-code text-6xl md:text-8xl text-blue-500 mb-4"></i>
                <p class="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">4+ Years of Experience</p>
                <p class="text-gray-600 dark:text-gray-300">Building Innovative Solutions</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Scroll Down Indicator -->
      <div class="mt-12 animate-bounce text-center">
        <a href="#about">
          <i class="fas fa-chevron-down text-2xl text-gray-400 hover:text-blue-500 transition-colors"></i>
        </a>
      </div>
    </div>
  </section>
</template>