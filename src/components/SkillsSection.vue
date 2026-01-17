<script setup>
// Define styling constants to avoid @apply errors in Tailwind v4
const cardClass = "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/30";
const badgeClass = "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800 hover:bg-blue-500 hover:text-white transition-colors duration-300 cursor-default";

// Data Structure replicating your exact content, with local assets replaced by icons or placeholders
const skillCategories = [
  {
    title: "Languages & Frameworks",
    icon: "fas fa-code",
    delay: "100",
    skills: [
      { name: "Python", type: "icon", src: "fab fa-python" },
      { name: "Java", type: "icon", src: "fab fa-java" },
      { name: "Spring Boot", type: "img", src: "https://placehold.co/16x16/33691e/ffffff?text=Spring" },
      { name: "Hibernate", type: "img", src: "https://placehold.co/16x16/59666c/ffffff?text=HB" },
      { name: "JavaScript", type: "icon", src: "fab fa-js-square" },
      { name: "FastAPI", type: "img", src: "https://placehold.co/16x16/009688/ffffff?text=API" },
      { name: "SQLAlchemy", type: "img", src: "https://placehold.co/16x16/d6222b/ffffff?text=SQLA" },
      { name: "Flask", type: "img", src: "https://placehold.co/16x16/000000/ffffff?text=Flask" },
      { name: "TailwindCSS", type: "img", src: "https://placehold.co/16x16/06b6d4/ffffff?text=TW" },
      { name: "PySpark", type: "img", src: "https://placehold.co/16x16/e25a1c/ffffff?text=Spark" }
    ]
  },
  {
    title: "Tools & Platforms",
    icon: "fas fa-tools",
    delay: "200",
    skills: [
      { name: "Linux", type: "icon", src: "fab fa-linux" },
      { name: "Docker", type: "icon", src: "fab fa-docker" },
      { name: "AWS", type: "icon", src: "fab fa-aws" },
      { name: "Vagrant", type: "img", src: "https://placehold.co/16x16/163f5c/ffffff?text=Vagrant" },
      { name: "CI-CD", type: "icon", src: "fab fa-gitlab" },
      { name: "Jenkins", type: "img", src: "https://placehold.co/16x16/d24939/ffffff?text=J" },
      { name: "RabbitMQ", type: "img", src: "https://placehold.co/16x16/ff6600/ffffff?text=MQ" },
      { name: "Airflow", type: "img", src: "https://placehold.co/16x16/019c99/ffffff?text=AF" },
      { name: "Kafka", type: "img", src: "https://placehold.co/16x16/231f20/ffffff?text=K" },
      { name: "HDFS", type: "img", src: "https://placehold.co/16x16/66ccff/000000?text=HDFS" },
      { name: "Solr", type: "img", src: "https://placehold.co/16x16/dd5500/ffffff?text=Solr" }
    ]
  },
  {
    title: "Specialized Skills",
    icon: "fas fa-star",
    delay: "300",
    skills: [
      { name: "GenAI", type: "icon", src: "fas fa-robot" },
      { name: "pydantic-ai", type: "icon", src: "fab fa-python" },
      { name: "LLMs", type: "icon", src: "fas fa-brain" },
      { name: "LangChain", type: "icon", src: "fas fa-link" },
      { name: "Cybersecurity", type: "icon", src: "fas fa-shield-alt" },
      { name: "Big Data Pipelines", type: "icon", src: "fas fa-stream" },
      { name: "N8N", type: "icon", src: "fas fa-cogs" }
    ]
  }
];
</script>

<template>
  <section id="skills" class="hero-section min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
    <!-- Background Grid Pattern -->
    <div class="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
    
    <div class="container mx-auto px-4 relative">
      <!-- Header -->
      <div class="flex flex-col items-center justify-center mb-12">
        <i class="fas fa-code text-4xl text-blue-500 mb-2" data-aos="fade-up"></i>
        <h2 class="text-4xl font-extrabold text-gray-900 dark:text-white" data-aos="fade-up" data-aos-delay="50">Technical Skills</h2>
        <div class="w-20 h-1 bg-blue-500 rounded mt-2" data-aos="fade-up" data-aos-delay="100"></div>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- Category Cards -->
        <div 
          v-for="(category, index) in skillCategories" 
          :key="index" 
          :class="cardClass"
          data-aos="fade-up" 
          :data-aos-delay="category.delay"
        >
          <!-- Category Title -->
          <div class="flex items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-3">
            <i :class="[category.icon, 'text-2xl text-blue-500 mr-3']"></i>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ category.title }}</h3>
          </div>

          <!-- Skills Badges -->
          <div class="flex flex-wrap gap-3">
            <span 
              v-for="(skill, sIndex) in category.skills" 
              :key="sIndex" 
              :class="badgeClass"
            >
              <!-- Render Image Icon -->
              <img 
                v-if="skill.type === 'img'" 
                :src="skill.src" 
                :alt="skill.name" 
                class="w-4 h-4 mr-2 object-contain rounded-full"
              >
              
              <!-- Render Font Icon -->
              <i 
                v-else 
                :class="[skill.src, 'mr-2 text-sm']"
              ></i>

              {{ skill.name }}
            </span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-grid-pattern {
  /* Using a subtle, high-contrast pattern for the background effect */
  background-image: radial-gradient(#3b82f6 0.5px, transparent 0.5px);
  background-size: 30px 30px;
}
</style>