<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Components (Assuming these paths are correct in your project)
import Navbar from './components/Navbar.vue';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import SkillsSection from './components/SkillsSection.vue';
import EducationSection from './components/EducationSection.vue';
import ProjectsSection from './components/ProjectsSection.vue';
import LeetCodeSection from './components/LeetCodeSection.vue';
import ContactSection from './components/ContactSection.vue';
import FooterSection from './components/FooterSection.vue';

// --- Reactive State for Loading and Data ---
const isAosReady = ref(false);
const isDataFetched = ref(false);
const lastUpdatedText = ref("Fetching last updated time...");
const commitMessageText = ref("");
const altPressed = ref(false);

// Computed property to determine the overall loading state.
const isLoading = computed(() => !isAosReady.value || !isDataFetched.value);

/**
 * Calculates the time elapsed since a given date using Vue refs.
 * @param {Date} date - The date object from the commit.
 * @returns {string} The time ago string.
 */
function timeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
}

/**
 * Fetches the last commit message and date from GitHub.
 */
async function getLastUpdated() {
    lastUpdatedText.value = "Fetching last updated time...";
    try {
        const response = await fetch(
            "https://api.github.com/repos/ervijayraghuwanshi/ErVijayRaghuwanshi/commits?per_page=1"
        );
        const data = await response.json();
        const date = new Date(data[0].commit.committer.date);
        const commit_message = data[0].commit.message;

        lastUpdatedText.value = "Last updated: " + timeAgo(date);
        commitMessageText.value = commit_message;
    } catch (error) {
        lastUpdatedText.value = "Failed to fetch last updated time.";
        console.error("Error fetching last updated:", error);
    } finally {
        isDataFetched.value = true;
    }
}

/**
 * Handles the global keydown event for Alt key (keytips) and navigation shortcuts.
 * @param {KeyboardEvent} e 
 */
function handleKeydown(e) {
    if (e.key === "Alt") {
        if (!altPressed.value) {
            altPressed.value = true;
            document.body.classList.add("show-keytips");
        }
        return;
    }

    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;

    const key = e.key.toUpperCase();
    const link = document.querySelector(`a[data-key="${key}"]`);

    if (link) {
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            e.preventDefault();
        }
    }
}

/**
 * Handles the global keyup event for the Alt key cleanup.
 * @param {KeyboardEvent} e 
 */
function handleKeyup(e) {
    if (e.key === "Alt") {
        altPressed.value = false;
        document.body.classList.remove("show-keytips");
    }
}

/**
 * Initializes Particles.js with the provided configuration.
 */
function initParticles() {
    // Only initialize if the particlesJS library is loaded (via CDN)
    if (typeof particlesJS !== 'undefined') {
        // Determine theme-aware color for particles
        const isDarkMode = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');
        // Use a primary blue color, lighter in dark mode for contrast
        const primaryColor = isDarkMode ? '#60a5fa' : '#2563eb'; 

        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: primaryColor // Dynamic color
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: primaryColor, // Dynamic color
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

onMounted(() => {
    // Initialize AOS
    AOS.init({
        duration: 600,
        offset: 100,
        once: true
    });
    isAosReady.value = true;

    // Fetch GitHub data
    getLastUpdated();

    // --- Keyboard Event Listeners ---
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);

    // --- NEW: Initialize Particles.js ---
    initParticles();
});

onUnmounted(() => {
    // --- Cleanup Keyboard Event Listeners ---
    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("keyup", handleKeyup);
    document.body.classList.remove("show-keytips");
});

</script>

<template>
  <!-- Particles.js Container (Full Screen Background) -->
  <!-- It must be fixed, cover the screen (inset-0), be non-interactive (pointer-events-none), and have the lowest z-index (z-0) -->
  <div id="particles-js" class="fixed inset-0 pointer-events-none z-0"></div>

  <!-- Loading Screen (Higher z-index than particles) -->
  <div v-if="isLoading" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 transition-opacity duration-500 loading">
    <div class="text-center">
      <div class="text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-500 animate-pulse">
        VR
      </div>
      <p class="text-gray-400 mt-2">Loading Portfolio...</p>
      <!-- Optional: Show the data fetch status in the loader -->
      <p class="text-gray-500 mt-4 text-sm italic">{{ lastUpdatedText }}</p> 
    </div>
  </div>

  <!-- Main Content (Renders only when isLoading is false) -->
  <main v-else>
    <!-- All main content has a higher z-index, sitting above the particles background -->
    <Navbar />
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <EducationSection />
    <ProjectsSection />
    <LeetCodeSection />
    <ContactSection />
    <FooterSection />

    <!-- Commit/Update Info Display -->
    
  </main>
</template>

<style>
/* No scoped styles needed here, global styles for the particles container are handled by Tailwind classes and style.css */
</style>