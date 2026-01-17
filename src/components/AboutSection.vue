<script setup>
// No specific logic needed for this static section
</script>

<template>
  <section id="about" class="py-20 bg-white dark:bg-gray-800 transition-colors duration-300 relative">
  <!-- <section id="about" cclass="bg-gray-800 text-white py-8"> -->
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    
    <div class="container mx-auto px-4 relative">
      <!-- Section Header -->
      <div class="flex items-center justify-center mb-12">
        <i class="fas fa-user-circle text-4xl text-blue-500 mr-4"></i>
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white" data-aos="fade-up">About Me</h2>
      </div>

      <!-- Content -->
      <div class="max-w-3xl mx-auto">
        <p class="text-lg mb-6 text-gray-700 dark:text-gray-300" data-aos="fade-up" data-aos-delay="100">
          <i class="fas fa-code text-blue-500 mr-2"></i>
          I'm a passionate Software Engineer with 4+ years of experience in API design, cybersecurity, IoT,
          and building innovative GenAI applications. Currently working at ClearTrail Technologies, I focus on
          creating robust and scalable solutions.
        </p>
        
        <p class="text-lg text-gray-700 dark:text-gray-300" data-aos="fade-up" data-aos-delay="200">
          <i class="fas fa-microchip text-blue-500 mr-2"></i>
          With a strong foundation in Electrical and Electronics Engineering, I combine hardware knowledge
          with software expertise to develop comprehensive solutions.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Custom Grid Pattern from your original CSS */
.bg-grid-pattern {
  background-image: radial-gradient(#3b82f6 1px, transparent 1px);
  background-size: 30px 30px;
}
</style>