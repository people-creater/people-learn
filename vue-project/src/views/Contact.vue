<script setup>
import { ref, onMounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const submitMessage = ref('');

const contactInfo = ref([
  {
    icon: '📧',
    title: 'Email',
    value: 'hello@example.com',
    link: 'mailto:hello@example.com'
  },
  {
    icon: '📱',
    title: 'Phone',
    value: '+1 (555) 123-4567',
    link: 'tel:+15551234567'
  },
  {
    icon: '📍',
    title: 'Location',
    value: 'San Francisco, CA',
    link: '#'
  },
  {
    icon: '💼',
    title: 'LinkedIn',
    value: 'linkedin.com/in/username',
    link: 'https://linkedin.com/in/username'
  }
]);

const handleSubmit = async (e) => {
  e.preventDefault();
  isSubmitting.value = true;

  // 模拟提交
  await new Promise(resolve => setTimeout(resolve, 2000));

  isSubmitting.value = false;
  submitMessage.value = 'Thank you for your message! I\'ll get back to you soon.';

  // 重置表单
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  // 3秒后清除消息
  setTimeout(() => {
    submitMessage.value = '';
  }, 3000);
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  // 标题动画
  gsap.fromTo(".contact-title",
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-hero",
          start: "top 80%"
        }
      }
  );

  // 联系信息卡片动画
  gsap.fromTo(".contact-card",
      {
        y: 50,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-info",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
  );

  // 表单动画
  gsap.fromTo(".contact-form",
      {
        x: 100,
        opacity: 0
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-form",
          start: "top 80%"
        }
      }
  );
});
</script>

<template>
  <div class="contact-page">
    <!-- 页面标题 -->
    <section class="contact-hero">
      <div class="hero-content">
        <h1 class="contact-title">Get In Touch</h1>
        <p class="hero-subtitle">Let's create something amazing together</p>
      </div>
    </section>

    <!-- 主要内容 -->
    <section class="contact-content">
      <div class="container">
        <!-- 联系信息 -->
        <div class="contact-info">
          <div class="info-grid">
            <div
                v-for="info in contactInfo"
                :key="info.title"
                class="contact-card"
            >
              <div class="card-icon">{{ info.icon }}</div>
              <h3>{{ info.title }}</h3>
              <a :href="info.link" class="card-link">{{ info.value }}</a>
            </div>
          </div>
        </div>

        <!-- 联系表单 -->
        <div class="form-section">
          <form @submit="handleSubmit" class="contact-form">
            <h2>Send me a message</h2>

            <div class="form-row">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    required
                    placeholder="Your name"
                />
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    required
                    placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div class="form-group">
              <label for="subject">Subject</label>
              <input
                  type="text"
                  id="subject"
                  v-model="form.subject"
                  required
                  placeholder="What's this about?"
              />
            </div>

            <div class="form-group">
              <label for="message">Message</label>
              <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="6"
                  placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button
                type="submit"
                class="submit-btn"
                :disabled="isSubmitting"
            >
              <span v-if="!isSubmitting">Send Message</span>
              <span v-else>Sending...</span>
            </button>

            <div v-if="submitMessage" class="submit-message">
              {{ submitMessage }}
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- 地图区域 -->
    <section class="map-section">
      <div class="map-placeholder">
        <div class="map-content">
          <h3>📍 San Francisco, CA</h3>
          <p>Available for freelance projects worldwide</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: var(--light);
  color: var(--daik);
}

.contact-hero {
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent-2), var(--accent-3));
  color: var(--light);
  text-align: center;
  padding-top: 80px; /* 为固定导航栏留出空间 */
}

.hero-content {
  max-width: 800px;
  padding: 2rem;
}

.contact-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  opacity: 0.9;
}

.contact-content {
  padding: 6rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.contact-info {
  margin-bottom: 6rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.contact-card {
  background: var(--light);
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.contact-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--daik);
}

.card-link {
  color: var(--accent-1);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.card-link:hover {
  color: var(--accent-2);
}

.form-section {
  background: var(--light2);
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.contact-form h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: var(--daik);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--daik);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  background: var(--light);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  width: 100%;
  padding: 1rem 2rem;
  background: var(--accent-1);
  color: var(--light);
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: var(--accent-2);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-message {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--accent-3);
  color: var(--light);
  border-radius: 0.5rem;
  text-align: center;
  font-weight: 500;
}

.map-section {
  height: 400px;
  background: var(--daik);
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, var(--accent-1), var(--accent-2));
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-content {
  text-align: center;
  color: var(--light);
}

.map-content h3 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.map-content p {
  font-size: 1.25rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .contact-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-section {
    padding: 2rem 1rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
