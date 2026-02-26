/**
 * Portfolio Main Script
 * Updated for: ErVijayRaghuwanshi.github.io
 */

// 1. Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 600,
    offset: 100,
    once: true
});

// 2. Initialize Particles.js
function initParticles(color = '#2563eb') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: color },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: color,
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
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
}

// Initial call
initParticles();

// 3. Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 4. Section Fade-in Observer
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => observer.observe(section));

// 5. Navigation Active State
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY; // Modern standard

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollPos >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'dark:text-blue-400');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-blue-600', 'dark:text-blue-400');
        }
    });
});

// 6. GitHub API Integration (Updated Repo Path)
function timeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
}

async function getLastUpdated() {
    const lastUpdatedElement = document.getElementById("last-updated");
    const commitMessageElement = document.getElementById("commit-message");
    if(!lastUpdatedElement) return;

    try {
        // UPDATED: Points to the new .github.io repo
        const response = await fetch(
            "https://api.github.com/repos/ervijayraghuwanshi/ErVijayRaghuwanshi.github.io/commits?per_page=1"
        );
        const data = await response.json();
        const date = new Date(data[0].commit.committer.date);
        const message = data[0].commit.message;

        lastUpdatedElement.textContent = "Last updated: " + timeAgo(date);
        if(commitMessageElement) commitMessageElement.textContent = message;

        hideLoader();
    } catch (error) {
        if(lastUpdatedElement) lastUpdatedElement.textContent = "Offline or API limit reached";
        hideLoader();
    }
}

function hideLoader() {
    const loader = document.querySelector(".loading");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => { loader.style.display = "none"; }, 300);
    }
}

// 7. Theme Management
const themes = ['theme-purple', 'theme-green', 'theme-red', 'theme-orange'];
let currentThemeIndex = 0;

function setTheme(themeName) {
    themes.forEach(t => document.body.classList.remove(t));
    document.body.classList.add(themeName);
    
    // Dynamically update particles without full re-init if possible
    const primaryColor = getComputedStyle(document.body).getPropertyValue('--theme-primary').trim();
    initParticles(primaryColor); 
    
    localStorage.setItem('theme', themeName);
}

// 8. Mobile Menu Logic
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = mobileMenu?.querySelectorAll("a");

function toggleMenu() {
    if (mobileMenu.classList.contains("max-h-0")) {
        mobileMenu.classList.replace("max-h-0", "max-h-96");
    } else {
        mobileMenu.classList.replace("max-h-96", "max-h-0");
    }
    const icon = menuToggle.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
}

if(menuToggle) menuToggle.addEventListener("click", toggleMenu);
mobileLinks?.forEach(link => link.addEventListener("click", toggleMenu));

// 9. LeetCode Stats
async function loadLeetCodeStats() {
    const totalEl = document.getElementById("totalSolved");
    if (!totalEl) return;

    // fallback values (edit if you want)
    const fallback = {
        totalSolved: 390,
        totalQuestions: 3851,
        easySolved: 188,
        mediumSolved: 178,
        hardSolved: 24
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1000); // 5s timeout

    try {
        const res = await fetch(
            "https://leetcode-stats-api.herokuapp.com/ervijayraghuwanshi",
            { signal: controller.signal }
        );

        clearTimeout(timeout);

        if (!res.ok) throw new Error("API error");

        const data = await res.json();

        updateStats(data);
    } catch (e) {
        console.warn("LeetCode fetch failed → using fallback");
        updateStats(fallback);
    }

    function updateStats(data) {
        totalEl.textContent = `${data.totalSolved} / ${data.totalQuestions}`;
        document.getElementById("easySolved").textContent = data.easySolved;
        document.getElementById("mediumSolved").textContent = data.mediumSolved;
        document.getElementById("hardSolved").textContent = data.hardSolved;
    }
}

// 10. Service Worker & Keyboard Shortcuts
if ("serviceWorker" in navigator) {
    // Changed to absolute path for the root domain
    navigator.serviceWorker.register("/sw.js");
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Alt") document.body.classList.add("show-keytips");
});
document.addEventListener('keyup', (e) => {
    if (e.key === "Alt") document.body.classList.remove("show-keytips");
});

// Initial Load
window.addEventListener("load", () => {
    getLastUpdated();
    loadLeetCodeStats();
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
});
