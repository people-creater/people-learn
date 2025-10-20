<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 作品集数据
const projects = ref([
  {
    id: 1,
    title: "Web Design Project",
    category: "Web Design",
    image: "/src/assets/nature-1920.jpg",
    description: "A modern responsive website with interactive animations and smooth user experience.",
    technologies: ["Vue.js", "GSAP", "CSS3"],
    link: "#"
  },
  {
    id: 2,
    title: "Mobile App UI",
    category: "Mobile Design",
    image: "/src/assets/lake-1920.jpg",
    description: "Intuitive mobile application interface design focusing on user experience.",
    technologies: ["Figma", "Adobe XD", "Sketch"],
    link: "#"
  },
  {
    id: 3,
    title: "Brand Identity",
    category: "Branding",
    image: "/src/assets/mountain-1920.jpg",
    description: "Complete brand identity design including logo, color palette, and typography.",
    technologies: ["Illustrator", "Photoshop", "InDesign"],
    link: "#"
  },
  {
    id: 4,
    title: "E-commerce Platform",
    category: "Web Development",
    image: "/src/assets/landscape-1920.jpg",
    description: "Full-stack e-commerce solution with modern design and robust functionality.",
    technologies: ["Vue.js", "Node.js", "MongoDB"],
    link: "#"
  }
]);

const activeFilter = ref('All');
const filteredProjects = ref(projects.value);

const categories = ['All', 'Web Design', 'Mobile Design', 'Branding', 'Web Development'];

const filterProjects = (category) => {
  activeFilter.value = category;
  if (category === 'All') {
    filteredProjects.value = projects.value;
  } else {
    filteredProjects.value = projects.value.filter(project => project.category === category);
  }
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // 项目卡片动画
  gsap.fromTo(".project-card",
      {
        y: 100,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
  );

  // 过滤器按钮动画
  gsap.fromTo(".filter-btn",
      {
        y: -50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".portfolio-filters",
          start: "top 90%"
        }
      }
  );
});
</script>

<template>
  <div class="portfolio-page">
    <!-- 页面标题 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">My Portfolio</h1>
        <p class="hero-subtitle">Creative solutions for modern challenges</p>
      </div>
    </section>

    <!-- 过滤器 -->
    <section class="portfolio-filters">
      <div class="filters-container">
        <button
            v-for="category in categories"
            :key="category"
            @click="filterProjects(category)"
            :class="['filter-btn', { active: activeFilter === category }]"
        >
          {{ category }}
        </button>
      </div>
    </section>

    <!-- 项目网格 -->
    <section class="projects-section">
      <div class="projects-grid">
        <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="project-card"
        >
          <div class="project-image">
            <img :src="project.image" :alt="project.title" />
            <div class="project-overlay">
              <div class="project-info">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <div class="project-tech">
                  <span
                      v-for="tech in project.technologies"
                      :key="tech"
                      class="tech-tag"
                  >
                    {{ tech }}
                  </span>
                </div>
                <a :href="project.link" class="project-link">View Project</a>
              </div>
            </div>
          </div>
          <div class="project-meta">
            <h4>{{ project.title }}</h4>
            <span class="project-category">{{ project.category }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系CTA -->
    <section class="cta-section">
      <div class="cta-content">
        <h2>Ready to work together?</h2>
        <p>Let's create something amazing</p>
        <a href="/contact" class="cta-button">Get In Touch</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.portfolio-page {
  min-height: 100vh;
  background: var(--light);
  color: var(--daik);
}

.hero-section {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
  color: var(--light);
  text-align: center;
  padding-top: 80px; /* 为固定导航栏留出空间 */
}

.hero-content {
  max-width: 800px;
  padding: 2rem;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, var(--light), rgba(255,255,255,0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
}

.portfolio-filters {
  padding: 4rem 2rem;
  background: var(--light);
}

.filters-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--daik);
  background: transparent;
  color: var(--daik);
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--daik);
  color: var(--light);
  transform: translateY(-2px);
}

.projects-section {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--light);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
}

.project-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-info {
  text-align: center;
  color: var(--light);
  padding: 2rem;
}

.project-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.project-info p {
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.tech-tag {
  background: var(--accent-1);
  color: var(--light);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
}

.project-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--light);
  color: var(--daik);
  text-decoration: none;
  border-radius: 2rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.project-link:hover {
  background: var(--accent-2);
  color: var(--light);
}

.project-meta {
  padding: 1.5rem;
}

.project-meta h4 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.project-category {
  color: var(--accent-1);
  font-weight: 500;
  font-size: 0.9rem;
}

.cta-section {
  padding: 6rem 2rem;
  background: var(--daik);
  color: var(--light);
  text-align: center;
}

.cta-content h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background: var(--accent-1);
  color: var(--light);
  text-decoration: none;
  border-radius: 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: var(--accent-2);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .filters-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
