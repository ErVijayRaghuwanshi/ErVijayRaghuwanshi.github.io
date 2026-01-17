<script setup>
// Define shared classes outside of style tags to avoid Tailwind v4 @apply issues in scoped styles
const cardClass = "bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl";
const itemClass = "p-4 border-l-4 border-blue-500/50 hover:border-blue-500 transition-colors duration-300 rounded-md bg-gray-50 dark:bg-gray-700/50";

const educationItems = [
  {
    degree: "Bachelor of Technology (BTech), Electrical and Electronics Engineering",
    institution: "Rajiv Gandhi Prodyogiki Vishwavidyalaya",
    grade: "First Division With Honours (7.59/10)",
    date: "Aug 2018 - Jun 2021",
    activities: "IoT voice assistant project, Solar MPPT major project, Gesture control in Computer Vision",
    icon: "fas fa-graduation-cap"
  },
  {
    degree: "Diploma in Electrical Engineering",
    institution: "Rajiv Gandhi Prodyogiki Vishwavidyalaya",
    grade: "6.51/10",
    date: "2013 - 2016",
    activities: null,
    icon: "fas fa-school"
  },
  {
    degree: "Secondary School Certificate (SSC) / Matriculation",
    institution: "Nutan Higher Secondary School, Sehore",
    grade: "70% | Year: 2013",
    date: null,
    activities: null,
    icon: "fas fa-book"
  }
];

const certificationItems = [
  { title: "Python 3 Programming Advanced", source: "Udemy", icon: "fab fa-python" },
  { title: "Exploratory Data Analysis with Python and Pandas", source: "Coursera", icon: "fas fa-chart-line" },
  { title: "The Bits and Bytes of Computer Networking", source: "Coursera", icon: "fas fa-network-wired" },
  { title: "Internet of Things and Embedded Systems", source: "Coursera", icon: "fas fa-microchip" },
  { title: "DevOps Beginners to Advanced with Projects", source: "Udemy", icon: "fas fa-server" }
];
</script>

<template>
  <section id="education" class="py-20 bg-white dark:bg-gray-800 transition-colors duration-300 relative">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    
    <div class="container mx-auto px-4 relative">
      <!-- Section Header -->
      <div class="flex items-center justify-center mb-12">
        <i class="fas fa-graduation-cap text-4xl text-blue-500 mr-4"></i>
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white" data-aos="fade-up">Education & Certifications</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <!-- Education Column -->
        <div :class="cardClass" data-aos="fade-up" data-aos-delay="100">
          <div class="flex items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-3">
            <i class="fas fa-university text-2xl text-blue-500 mr-3"></i>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">Education</h3>
          </div>
          
          <div class="space-y-6">
            <div v-for="(item, index) in educationItems" :key="index" :class="itemClass">
              <div class="flex items-start mb-2">
                <i :class="[item.icon, 'text-blue-500 mr-3 mt-1 text-lg shrink-0']"></i>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">{{ item.degree }}</h4>
                  <p class="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    {{ item.institution }}
                    <span v-if="item.grade"> | Grade: {{ item.grade }}</span>
                  </p>
                  <p v-if="item.date" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ item.date }}
                  </p>
                </div>
              </div>
              <p v-if="item.activities" class="text-sm text-gray-500 dark:text-gray-400 pl-8 pt-2 border-t border-gray-200 dark:border-gray-600/50 mt-2">
                Activities: {{ item.activities }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Certifications Column -->
        <div :class="cardClass" data-aos="fade-up" data-aos-delay="200">
          <div class="flex items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-3">
            <i class="fas fa-certificate text-2xl text-blue-500 mr-3"></i>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">Certifications</h3>
          </div>
          
          <div class="space-y-6">
            <div v-for="(cert, index) in certificationItems" :key="index" :class="itemClass">
              <div class="flex items-center mb-1">
                <i :class="[cert.icon, 'text-blue-500 mr-3 shrink-0']"></i>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">{{ cert.title }}</h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300">{{ cert.source }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
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