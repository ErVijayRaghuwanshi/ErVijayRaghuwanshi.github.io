<template>
  <!-- Footer -->
  <footer class="py-20 bg-white dark:bg-gray-800 transition-colors duration-300 relative">
    <div class="container mx-auto px-4 text-center">

      <!-- Social Links -->
      <div class="flex flex-wrap justify-center space-x-4 mb-4">
        <a href="https://github.com/ErVijayRaghuwanshi" target="_blank"
          class="text-gray-400 hover:text-white transition group">
          <!-- Note: Font Awesome classes (fab, fas) require a link to the library in index.html -->
          <i class="fab fa-github text-2xl group-hover:animate-scale-in"></i>
        </a>
        <a href="https://www.linkedin.com/in/ervijayraghuwanshi/" target="_blank"
          class="text-gray-400 hover:text-white transition group">
          <i class="fab fa-linkedin text-2xl group-hover:animate-scale-in"></i>
        </a>
        <a href="https://wa.me/919755491130?text=Hello%20Vijay,%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect."
          class="text-gray-400 hover:text-white transition group" target="_blank">
          <i class="fab fa-whatsapp text-xl group-hover:animate-scale-in"></i>
        </a>

        <a href="https://x.com/ErVijayRaghu1c" target="_blank" class="text-gray-400 hover:text-white transition group">
          <i class="fab fa-x text-2xl group-hover:animate-scale-in"></i>
        </a>
        <a href="https://instagram.com/er.vijayraghuwanshi" target="_blank"
          class="text-gray-400 hover:text-white transition group">
          <i class="fab fa-instagram text-2xl group-hover:animate-scale-in"></i>
        </a>
        <a target="_blank"
          href="mailto:ervijayraghuwanshi@gmail.com?subject=Portfolio%20Contact&body=Hello%20Vijay,%0A%0AI%20just%20checked%20your%20portfolio%20and%20would%20like%20to%20connect."
          class="text-gray-400 hover:text-white transition group">
          <i class="fas fa-envelope text-xl group-hover:animate-scale-in"></i>
        </a>

        <a href="tel:+919755491130" target="_blank" class="text-gray-400 hover:text-white transition group">
          <i class="fas fa-phone text-2xl group-hover:animate-scale-in"></i>
        </a>
      </div>

      <!-- Footer Text -->
      <p class="text-gray-400 text-sm">&copy; 2025 Vijay Raghuwanshi. All rights reserved.</p>

    </div>
  </footer>
</template>

<script setup>
// No reactive logic needed for this static component
</script>

<style scoped>
/* You might need to define 'animate-scale-in' if it's a custom utility, 
   otherwise, Tailwind's hover effects will still provide the transition. */
</style>