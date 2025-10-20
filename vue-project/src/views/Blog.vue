<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const blogPosts = ref([
  {
    id: 1,
    title: "The Future of Web Design",
    excerpt: "Exploring the latest trends and technologies that are shaping the future of web design and user experience.",
    content: "Web design is constantly evolving, with new technologies and trends emerging every year. From AI-powered design tools to immersive 3D experiences, the future looks exciting...",
    author: "John Doe",
    date: "2024-01-15",
    category: "Design",
    image: "/src/assets/nature-1920.jpg",
    readTime: "5 min read",
    tags: ["Web Design", "Future", "Technology"]
  },
  {
    id: 2,
    title: "Building Responsive Websites",
    excerpt: "A comprehensive guide to creating websites that work perfectly across all devices and screen sizes.",
    content: "Responsive web design has become essential in today's multi-device world. Learn the best practices for creating flexible layouts...",
    author: "Jane Smith",
    date: "2024-01-10",
    category: "Development",
    image: "/src/assets/lake-1920.jpg",
    readTime: "8 min read",
    tags: ["CSS", "Responsive", "Mobile"]
  },
  {
    id: 3,
    title: "UX Design Principles",
    excerpt: "Understanding the fundamental principles that make user experiences intuitive and enjoyable.",
    content: "User experience design is about creating products that provide meaningful and relevant experiences to users. Here are the key principles...",
    author: "Mike Johnson",
    date: "2024-01-05",
    category: "UX",
    image: "/src/assets/mountain-1920.jpg",
    readTime: "6 min read",
    tags: ["UX", "Design", "Principles"]
  },
  {
    id: 4,
    title: "JavaScript Best Practices",
    excerpt: "Essential tips and techniques for writing clean, efficient, and maintainable JavaScript code.",
    content: "JavaScript has evolved significantly over the years. Here are some modern best practices that every developer should follow...",
    author: "Sarah Wilson",
    date: "2024-01-01",
    category: "Development",
    image: "/src/assets/landscape-1920.jpg",
    readTime: "10 min read",
    tags: ["JavaScript", "Best Practices", "Code Quality"]
  }
]);

const activeCategory = ref('All');
const filteredPosts = ref(blogPosts.value);

const categories = ['All', 'Design', 'Development', 'UX'];

const filterPosts = (category) => {
  activeCategory.value = category;
  if (category === 'All') {
    filteredPosts.value = blogPosts.value;
  } else {
    filteredPosts.value = blogPosts.value.filter(post => post.category === category);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // 博客文章卡片动画
  gsap.fromTo(".blog-card",
      {
        y: 100,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".blog-grid",
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
          trigger: ".blog-filters",
          start: "top 90%"
        }
      }
  );

  // 特色文章动画
  gsap.fromTo(".featured-post",
      {
        x: -100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".featured-section",
          start: "top 80%"
        }
      }
  );
});
</script>

<template>
  <div class="blog-page">
    <!-- 页面标题 -->
    <section class="blog-hero">
      <div class="hero-content">
        <h1 class="blog-title">Blog & Insights</h1>
        <p class="hero-subtitle">Thoughts on design, development, and creativity</p>
      </div>
    </section>

    <!-- 特色文章 -->
    <section class="featured-section">
      <div class="container">
        <div class="featured-post">
          <div class="featured-image">
            <img :src="blogPosts[0].image" :alt="blogPosts[0].title" />
          </div>
          <div class="featured-content">
            <div class="post-meta">
              <span class="category">{{ blogPosts[0].category }}</span>
              <span class="date">{{ formatDate(blogPosts[0].date) }}</span>
              <span class="read-time">{{ blogPosts[0].readTime }}</span>
            </div>
            <h2 class="featured-title">{{ blogPosts[0].title }}</h2>
            <p class="featured-excerpt">{{ blogPosts[0].excerpt }}</p>
            <div class="featured-tags">
              <span
                  v-for="tag in blogPosts[0].tags"
                  :key="tag"
                  class="tag"
              >
                {{ tag }}
              </span>
            </div>
            <a href="#" class="read-more">Read Full Article →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 过滤器 -->
    <section class="blog-filters">
      <div class="container">
        <div class="filters-container">
          <button
              v-for="category in categories"
              :key="category"
              @click="filterPosts(category)"
              :class="['filter-btn', { active: activeCategory === category }]"
          >
            {{ category }}
          </button>
        </div>
      </div>
    </section>

    <!-- 博客文章网格 -->
    <section class="blog-section">
      <div class="container">
        <div class="blog-grid">
          <article
              v-for="post in filteredPosts.slice(1)"
              :key="post.id"
              class="blog-card"
          >
            <div class="card-image">
              <img :src="post.image" :alt="post.title" />
              <div class="card-overlay">
                <a href="#" class="read-btn">Read Article</a>
              </div>
            </div>
            <div class="card-content">
              <div class="post-meta">
                <span class="category">{{ post.category }}</span>
                <span class="date">{{ formatDate(post.date) }}</span>
              </div>
              <h3 class="card-title">{{ post.title }}</h3>
              <p class="card-excerpt">{{ post.excerpt }}</p>
              <div class="card-footer">
                <div class="author-info">
                  <span class="author">{{ post.author }}</span>
                  <span class="read-time">{{ post.readTime }}</span>
                </div>
                <div class="card-tags">
                  <span
                      v-for="tag in post.tags.slice(0, 2)"
                      :key="tag"
                      class="tag"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- 订阅区域 -->
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content">
          <h2>Stay Updated</h2>
          <p>Get the latest articles and insights delivered to your inbox</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.blog-page {
  min-height: 100vh;
  background: var(--light);
  color: var(--daik);
}

.blog-hero {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent-3), var(--accent-1));
  color: var(--light);
  text-align: center;
  padding-top: 80px; /* 为固定导航栏留出空间 */
}

.hero-content {
  max-width: 800px;
  padding: 2rem;
}

.blog-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.featured-section {
  padding: 6rem 0;
  background: var(--light2);
}

.featured-post {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.featured-image {
  position: relative;
  height: 400px;
  border-radius: 1rem;
  overflow: hidden;
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-content {
  padding: 2rem;
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.category {
  background: var(--accent-1);
  color: var(--light);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-weight: 500;
}

.date, .read-time {
  color: var(--daik);
  opacity: 0.7;
}

.featured-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.featured-excerpt {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.featured-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.tag {
  background: var(--light2);
  color: var(--daik);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.read-more {
  display: inline-block;
  color: var(--accent-1);
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: var(--accent-2);
}

.blog-filters {
  padding: 4rem 0;
  background: var(--light);
}

.filters-container {
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

.blog-section {
  padding: 4rem 0;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.blog-card {
  background: var(--light);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-10px);
}

.card-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .card-image img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.blog-card:hover .card-overlay {
  opacity: 1;
}

.read-btn {
  padding: 0.75rem 1.5rem;
  background: var(--light);
  color: var(--daik);
  text-decoration: none;
  border-radius: 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.read-btn:hover {
  background: var(--accent-1);
  color: var(--light);
}

.card-content {
  padding: 2rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.card-excerpt {
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.author {
  font-weight: 600;
  color: var(--daik);
}

.read-time {
  font-size: 0.9rem;
  opacity: 0.7;
}

.card-tags {
  display: flex;
  gap: 0.5rem;
}

.newsletter-section {
  padding: 6rem 0;
  background: var(--daik);
  color: var(--light);
  text-align: center;
}

.newsletter-content h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.newsletter-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.newsletter-form {
  display: flex;
  max-width: 500px;
  margin: 0 auto;
  gap: 1rem;
}

.newsletter-form input {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.newsletter-form button {
  padding: 1rem 2rem;
  background: var(--accent-1);
  color: var(--light);
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.newsletter-form button:hover {
  background: var(--accent-2);
}

@media (max-width: 768px) {
  .blog-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .featured-post {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .featured-title {
    font-size: 2rem;
  }

  .blog-grid {
    grid-template-columns: 1fr;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .card-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
}
</style>
