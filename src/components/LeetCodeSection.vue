<script setup>
import { ref, onMounted } from 'vue';

// --- Reactive Data Structure ---
const leetCodeStats = ref({
  totalSolved: 0,
  totalQuestions: 0, // Added to store the total available questions
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
  isLoading: true, // Start as true to show "Loading..." state
});

const badgeBackground = "https://assets.leetcode.com/static_assets/others/badge-background.png";

const badges = [
  { title: "Introduction to Pandas", image: "https://assets.leetcode.com/static_assets/others/Introduction_to_Pandas.gif", delay: "200" },
  { title: "25/100 Problems Solved", image: "https://assets.leetcode.com/static_assets/others/25100.gif", delay: "300" },
  { title: "25/50 Problems Solved", image: "https://assets.leetcode.com/static_assets/others/2550.gif", delay: "400" },
  { title: "Top SQL 50", image: "https://assets.leetcode.com/static_assets/others/Top_SQL_50.gif", delay: "500" },
];

/**
 * Fetches the user's LeetCode statistics from the API and updates the reactive state.
 */
async function loadLeetCodeStats() {
    leetCodeStats.value.isLoading = true;
    try {
        // Using the API endpoint provided by the user
        const res = await fetch("https://leetcode-stats-api.herokuapp.com/ervijayraghuwanshi");
        if (!res.ok) throw new Error("Failed to fetch LeetCode stats");
        
        const data = await res.json();
        
        // Update reactive state with fetched data
        leetCodeStats.value.totalSolved = data.totalSolved || 0;
        leetCodeStats.value.totalQuestions = data.totalQuestions || 0;
        leetCodeStats.value.easySolved = data.easySolved || 0;
        leetCodeStats.value.mediumSolved = data.mediumSolved || 0;
        leetCodeStats.value.hardSolved = data.hardSolved || 0;
        
    } catch (error) {
        console.error("Error fetching LeetCode stats:", error);
    } finally {
        leetCodeStats.value.isLoading = false;
    }
}

// Fetch stats when the component is mounted
onMounted(() => {
    loadLeetCodeStats();
});
</script>

<template>
  <section id="leetcode" class="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300 relative">
    <div class="container mx-auto px-4 relative">

      <!-- Section Header -->
      <div class="flex items-center justify-center mb-12">
        <i class="fas fa-award text-4xl text-blue-500 mr-4"></i>
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white" data-aos="fade-up">LeetCode Badges</h2>
      </div>

      <!-- ================== Stats Card ================== -->
      <div class="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 max-w-2xl mx-auto mb-16 border border-gray-200 dark:border-gray-700" data-aos="fade-up"
        data-aos-delay="100">
        <!-- Total Solved -->
        <div class="text-center mb-8">
          <div id="totalSolved" class="text-5xl font-extrabold text-blue-600 dark:text-blue-400">
            <span v-if="leetCodeStats.isLoading">Loading...</span>
            <!-- Updated to display solved / total questions -->
            <span v-else>{{ leetCodeStats.totalSolved }} / {{ leetCodeStats.totalQuestions }}</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mt-2 text-lg">Problems Solved</p>
        </div>

        <!-- Breakdown -->
        <div class="grid grid-cols-3 gap-6 text-center border-t pt-6 border-gray-100 dark:border-gray-700">
          <div>
            <!-- Updated to use leetCodeStats.easySolved directly -->
            <p id="easySolved" class="text-3xl font-bold" :class="leetCodeStats.isLoading ? 'text-gray-400' : 'text-green-500'">
              {{ leetCodeStats.isLoading ? '--' : leetCodeStats.easySolved }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Easy</p>
          </div>
          <div>
            <!-- Updated to use leetCodeStats.mediumSolved directly -->
            <p id="mediumSolved" class="text-3xl font-bold" :class="leetCodeStats.isLoading ? 'text-gray-400' : 'text-yellow-500'">
              {{ leetCodeStats.isLoading ? '--' : leetCodeStats.mediumSolved }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Medium</p>
          </div>
          <div>
            <!-- Updated to use leetCodeStats.hardSolved directly -->
            <p id="hardSolved" class="text-3xl font-bold" :class="leetCodeStats.isLoading ? 'text-gray-400' : 'text-red-500'">
              {{ leetCodeStats.isLoading ? '--' : leetCodeStats.hardSolved }}
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">Hard</p>
          </div>
        </div>
      </div>

      <!-- ================== Badges Grid ================== -->
      <div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">

          <div 
            v-for="(badge, index) in badges" 
            :key="index" 
            class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] text-center"
            data-aos="fade-up" 
            :data-aos-delay="badge.delay"
          >
            <div class="relative w-36 h-36 mx-auto flex items-center justify-center mb-4">
              <img :src="badgeBackground" alt="Badge Background"
                class="w-full h-full object-contain">
              <img :src="badge.image" :alt="badge.title" class="absolute w-24 object-contain" :onerror="`this.onerror=null; this.src='https://placehold.co/100x100/3b82f6/ffffff?text=Badge'`">
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ badge.title }}</h3>
          </div>

        </div>
      </div>

      <!-- ================== CTA ================== -->
      <div class="text-center mt-16" data-aos="fade-up" data-aos-delay="600">
        <a href="https://leetcode.com/u/ervijayraghuwanshi/" target="_blank"
          class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:scale-[1.03] inline-flex items-center">
          View Full LeetCode Profile
          <i class="fas fa-external-link-alt ml-3 text-sm"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Ensure the grid pattern is defined if this is a standalone component */
.bg-grid-pattern {
  background-image: radial-gradient(#3b82f6 1px, transparent 1px);
  background-size: 30px 30px;
}
</style>