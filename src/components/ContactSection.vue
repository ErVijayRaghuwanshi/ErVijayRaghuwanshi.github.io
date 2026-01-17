<script setup>
// Keeping the script minimal to match the original simplicity.
</script>

<template>
  <!-- <section id="contact" class="py-20 bg-white dark:bg-gray-800 transition-colors duration-300 relative"> -->
  <section id="contact" cclass="hero-section min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    
    <div class="container mx-auto px-4 relative">
      
      <!-- Section Header -->
      <div class="flex items-center justify-center mb-12">
        <i class="fas fa-envelope text-4xl text-blue-500 mr-4"></i>
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white" data-aos="fade-up">Get in Touch</h2>
      </div>

      <div class="max-w-xl mx-auto text-center">
        <p class="mb-8 text-lg text-gray-700 dark:text-gray-300" data-aos="fade-up" data-aos-delay="100">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of your
          visions.
        </p>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Custom Grid Pattern from previous sections */
.bg-grid-pattern {
  background-image: radial-gradient(#3b82f6 1px, transparent 1px);
  background-size: 30px 30px;
}
</style>