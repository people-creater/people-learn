<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const router = useRouter();

const skills = ref([
  { name: 'Vue.js', level: 90 },
  { name: 'JavaScript', level: 95 },
  { name: 'CSS3', level: 88 },
  { name: 'HTML5', level: 92 },
  { name: 'GSAP', level: 85 },
  { name: 'Node.js', level: 80 }
]);

const timeline = ref([
  {
    year: '2023',
    title: 'Senior Frontend Developer',
    company: 'Tech Company',
    description: 'Leading frontend development projects and mentoring junior developers.'
  },
  {
    year: '2021',
    title: 'Frontend Developer',
    company: 'Design Studio',
    description: 'Creating responsive web applications with modern JavaScript frameworks.'
  },
  {
    year: '2019',
    title: 'Web Developer',
    company: 'Digital Agency',
    description: 'Building custom websites and web applications for various clients.'
  },
  {
    year: '2017',
    title: 'Junior Developer',
    company: 'Startup Inc',
    description: 'Started my journey in web development with HTML, CSS, and JavaScript.'
  }
]);

const stats = ref([
  { number: '50+', label: 'Projects Completed' },
  { number: '3+', label: 'Years Experience' },
  { number: '25+', label: 'Happy Clients' },
  { number: '10+', label: 'Awards Won' }
]);

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // 技能条动画
  gsap.fromTo(".skill-bar",
      { width: 0 },
      {
        width: "100%",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 80%"
        }
      }
  );

  // 时间线动画
  gsap.fromTo(".timeline-item",
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".timeline",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
  );

  // 统计数据动画
  gsap.fromTo(".stat-number",
      {
        scale: 0,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 80%"
        }
      }
  );
});
</script>

<template>
  <div class="about-page">
    <!-- 页面标题 -->
    <section class="about-hero">
      <div class="hero-image">
        <img src="../assets/nature-1920.jpg" alt="About Me" />
      </div>
      <div class="hero-content">
        <h1 class="hero-title">About Me</h1>
        <p class="hero-subtitle">Passionate Frontend Developer</p>
        <p class="hero-description">
          I'm a creative developer with a passion for building beautiful,
          interactive web experiences that engage and inspire users.
        </p>
      </div>
    </section>

    <!-- 介绍部分 -->
    <section class="intro-section">
      <div class="container">
        <div class="intro-content">
          <div class="intro-text">
            <h2>My Story</h2>
            <p>
              With over 3 years of experience in frontend development, I specialize in creating
              modern, responsive web applications using Vue.js, JavaScript, and cutting-edge
              animation libraries like GSAP.
            </p>
            <p>
              I believe in the power of great design and smooth user experiences. Every project
              I work on is an opportunity to push the boundaries of what's possible on the web.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to
              open source projects, or sharing knowledge with the developer community.
            </p>
          </div>
          <div class="intro-image">
            <img src="../assets/lake-1920.jpg" alt="My Work" />
          </div>
        </div>
      </div>
    </section>

    <!-- 统计数据 -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-item">
            <span class="stat-number">{{ stat.number }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 技能部分 -->
    <section class="skills-section">
      <div class="container">
        <h2 class="section-title">Skills & Technologies</h2>
        <div class="skills-grid">
          <div v-for="skill in skills" :key="skill.name" class="skill-item">
            <div class="skill-header">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-percentage">{{ skill.level }}%</span>
            </div>
            <div class="skill-bar-container">
              <div class="skill-bar" :style="{ width: skill.level + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 时间线 -->
    <section class="timeline-section">
      <div class="container">
        <h2 class="section-title">My Journey</h2>
        <div class="timeline">
          <div v-for="item in timeline" :key="item.year" class="timeline-item">
            <div class="timeline-year">{{ item.year }}</div>
            <div class="timeline-content">
              <h3 class="timeline-title">{{ item.title }}</h3>
              <div class="timeline-company">{{ item.company }}</div>
              <p class="timeline-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA部分 -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Let's Work Together</h2>
          <p>Ready to bring your ideas to life?</p>
          <div class="cta-buttons">
            <a href="/portfolio" class="cta-button primary">View My Work</a>
            <a href="/contact" class="cta-button">Get In Touch</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  min-height: 100vh;
  background: var(--light);
  color: var(--daik);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-hero {
  position: relative;
  width: 100%;
  max-width: 1400px;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 80px; /* 为固定导航栏留出空间 */
  margin: 0 auto;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-content {
  position: relative;
  text-align: center;
  color: var(--light);
  z-index: 2;
  max-width: 900px;
  padding: 2rem;
  margin: 0 auto;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
  margin-bottom: 2rem;
}

.hero-description {
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.8;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
}

.intro-section {
  width: 100%;
  max-width: 1400px;
  padding: 6rem 2rem;
  background: var(--light);
  margin: 0 auto;
}

.intro-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.intro-text h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--daik);
}

.intro-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

.intro-image {
  position: relative;
  height: 400px;
  border-radius: 1rem;
  overflow: hidden;
}

.intro-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stats-section {
  width: 100%;
  max-width: 1400px;
  padding: 4rem 2rem;
  background: var(--light2);
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 2rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--accent-1);
  margin-bottom: 0.5rem;
  display: block;
}

.stat-label {
  font-size: 1.1rem;
  color: var(--daik);
  font-weight: 500;
}

.skills-section {
  width: 100%;
  max-width: 1400px;
  padding: 6rem 2rem;
  background: var(--light);
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: var(--daik);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-item {
  margin-bottom: 2rem;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-weight: 600;
  color: var(--daik);
}

.skill-percentage {
  color: var(--accent-1);
  font-weight: 600;
}

.skill-bar-container {
  height: 8px;
  background: var(--light2);
  border-radius: 4px;
  overflow: hidden;
}

.skill-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-1), var(--accent-2));
  border-radius: 4px;
  width: 0;
}

.timeline-section {
  width: 100%;
  max-width: 1400px;
  padding: 6rem 2rem;
  background: var(--daik);
  color: var(--light);
  margin: 0 auto;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--accent-1);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: 4rem;
  padding: 0 2rem;
}

.timeline-item:nth-child(odd) {
  text-align: right;
}

.timeline-item:nth-child(even) {
  text-align: left;
}

.timeline-content {
  background: var(--light);
  color: var(--daik);
  padding: 2rem;
  border-radius: 1rem;
  position: relative;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.timeline-year {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: var(--accent-1);
  color: var(--light);
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-weight: 600;
  z-index: 2;
}

.timeline-item:nth-child(odd) .timeline-year {
  left: -100px;
}

.timeline-item:nth-child(even) .timeline-year {
  right: -100px;
}

.timeline-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.timeline-company {
  color: var(--accent-1);
  font-weight: 600;
  margin-bottom: 1rem;
}

.timeline-description {
  line-height: 1.6;
  opacity: 0.8;
}

.cta-section {
  width: 100%;
  max-width: 1400px;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, var(--accent-1), var(--accent-2));
  color: var(--light);
  text-align: center;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-button {
  padding: 1rem 2rem;
  border: 2px solid var(--light);
  background: transparent;
  color: var(--light);
  text-decoration: none;
  border-radius: 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: var(--light);
  color: var(--daik);
}

.cta-button.primary {
  background: var(--light);
  color: var(--daik);
}

.cta-button.primary:hover {
  background: transparent;
  color: var(--light);
}

@media (max-width: 768px) {
  .about-page {
    align-items: stretch;
  }

  .about-hero {
    max-width: 100%;
    padding-top: 100px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .intro-section,
  .stats-section,
  .skills-section,
  .timeline-section,
  .cta-section {
    max-width: 100%;
    padding: 4rem 1rem;
  }

  .intro-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .timeline::before {
    left: 2rem;
  }

  .timeline-item {
    padding-left: 4rem;
    text-align: left !important;
  }

  .timeline-year {
    left: 0 !important;
    right: auto !important;
    transform: translateX(-50%);
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}
</style>