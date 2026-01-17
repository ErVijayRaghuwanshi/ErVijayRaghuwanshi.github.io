<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

// Exact menu items and icons from your original HTML
const menuItems = [
  { name: 'About', href: '#about', icon: 'fas fa-user-circle' },
  { name: 'Skills', href: '#skills', icon: 'fas fa-code' },
  { name: 'Education', href: '#education', icon: 'fas fa-graduation-cap' },
  { name: 'Projects', href: '#projects', icon: 'fas fa-project-diagram' },
  { name: 'LeetCode', href: '#leetcode', icon: 'fas fa-trophy' },
  { name: 'Contact', href: '#contact', icon: 'fas fa-envelope' },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <nav class="fixed w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md z-50 transition-colors duration-300">
    <div class="container mx-auto px-4 py-3">
      <div class="flex justify-between items-center">

        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <h1 class="text-white font-bold text-sm">VR</h1>
          </div>
          <span class="text-xl font-bold text-gray-800 dark:text-white">Vijay Raghuwanshi</span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-6">
          <a 
            v-for="item in menuItems" 
            :key="item.name" 
            :href="item.href"
            class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center group"
          >
            <i :class="[item.icon, 'mr-2 transition-transform group-hover:scale-110']"></i>
            {{ item.name }}
          </a>
        </div>

        <!-- Mobile Hamburger -->
        <button 
          @click="toggleMenu" 
          class="md:hidden text-2xl text-gray-600 dark:text-gray-300 focus:outline-none hover:text-blue-500 transition-colors"
        >
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div 
      id="mobileMenu"
      class="overflow-hidden transition-all duration-300 ease-in-out md:hidden bg-white dark:bg-gray-800 shadow-md border-t border-gray-100 dark:border-gray-700"
      :class="isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="flex flex-col space-y-4 p-4">
        <a 
          v-for="item in menuItems" 
          :key="item.name" 
          :href="item.href"
          @click="closeMenu"
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors flex items-center"
        >
          <i :class="[item.icon, 'mr-3 w-6 text-center']"></i>
          {{ item.name }}
        </a>
      </div>
    </div>
  </nav>
</template>