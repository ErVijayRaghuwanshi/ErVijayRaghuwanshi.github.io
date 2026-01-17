<script setup>
// Define shared classes and data to manage complexity and avoid Tailwind v4 issues
const projectCardClass = "bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-blue-500/50";
const linkClass = "text-blue-600 dark:text-blue-400 font-medium no-underline inline-flex items-center group-hover:underline";

const projects = [
  {
    title: "Zerodha Support RAG Chatbot",
    icon: "fas fa-robot",
    description: "Agentic RAG-based application that simulates a financial support chatbot for Zerodha. Built with Gradio for the interface, LangChain and Ollama for orchestration, ChromaDB for vector storage, and PydanticAI for schema-validated, reliable responses—delivering accurate, context-aware assistance.",
    link: "#",
    delay: "200",
    disabled: true // Disable link for projects without a public demo/repo link
  },
  {
    title: "CDR & IPDR Analytics — AI Rule Management",
    icon: "fas fa-database",
    description: "Big Data analytics platform for telecom metadata (CDR/IPDR) focused on SQL rule lifecycle management with built-in AI explanations. Law enforcement officers can understand complex SQL in plain language, validate and extend rules, and rapidly develop new detection logic—without deep SQL expertise.",
    link: "https://ervijayraghuwanshi.github.io/CDR_IPDR/",
    delay: "400",
    disabled: false
  },
  {
    title: "Prompt Gallery",
    icon: "fas fa-images",
    description: "Interactive image search platform featuring 5,000+ AI-generated images. Users can explore creative prompts, search by keywords, and discover inspiration through an infinite-scroll gallery powered by a fast client-side search engine.",
    link: "https://ervijayraghuwanshi.github.io/prompt-gallery",
    delay: "100",
    disabled: false
  },
  {
    title: "LightSabre on Laptop",
    icon: "fas fa-shield-alt",
    description: "Ultra-portable network traffic monitoring solution designed to analyze high-speed Ethernet links in air-gapped environments. Recognized with an award at Ideathon 2024 for innovation in cybersecurity and real-time network intelligence.",
    link: null, // No link provided in the original HTML
    delay: "300",
    disabled: true
  },
  {
    title: "Spring Boot CRUD App",
    icon: "fas fa-code",
    description: "A full-stack CRUD web application built with Spring Boot, Hibernate/JPA, and MySQL. It demonstrates RESTful API design, layered architecture, and clean database interactions for managing users with create, read, update, and delete functionality.",
    link: "https://github.com/ErVijayRaghuwanshi/springboot-crud-app",
    delay: "500",
    disabled: false
  }
];

const getLinkClasses = (isDisabled) => {
    return [
        linkClass,
        isDisabled ? 'opacity-50 cursor-default pointer-events-none' : 'hover:text-blue-700 dark:hover:text-blue-300'
    ];
};
</script>

<template>
  <section id="projects" class="hero-section min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
    <!-- Background Pattern -->
    <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
    
    <div class="container mx-auto px-4 relative">
      <!-- Section Header -->
      <div class="flex items-center justify-center mb-12">
        <i class="fas fa-project-diagram text-4xl text-blue-500 mr-4"></i>
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white" data-aos="fade-up">Featured Projects</h2>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div 
          v-for="(project, index) in projects" 
          :key="index" 
          :class="projectCardClass" 
          data-aos="fade-up" 
          :data-aos-delay="project.delay"
          class="group"
        >
          <!-- Project Title -->
          <div class="flex items-center mb-4">
            <i :class="[project.icon, 'text-2xl text-blue-500 mr-3 shrink-0']"></i>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ project.title }}</h3>
          </div>
          
          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-300 mb-4 h-24 overflow-hidden">
            {{ project.description }}
          </p>
          
          <!-- Link / Status -->
          <a 
            :href="project.link"
            target="_blank"
            :class="getLinkClasses(project.disabled)"
          >
            {{ project.disabled ? 'Internal Project' : 'View Project' }}
            <i class="fas fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
          </a>
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