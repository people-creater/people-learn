<script setup>
import { ref } from 'vue';
import gsap from 'gsap';

const isOpen = ref(false);
const isAnimating = ref(false);

const container = ref(null);
const menuToggle = ref(null);
const menuOverlay = ref(null);
const menuContent = ref(null);
const menuPreviewImg = ref(null);
const menuLinks = ref([]);

const openMenu = () => {
  if (isAnimating.value || isOpen.value) return;
  isAnimating.value = true;

  gsap.to(container.value, {
    rotation: 10,
    x: 300,
    y: 450,
    scale: 1.5,
    duration: 1.25,
    ease: "power4.inOut",
  });

  animateMenuToggle(true);

  gsap.to(menuContent.value, {
    rotation: 0,
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    duration: 1.25,
    ease: "power4.inOut",
  });

  gsap.to([".link a", ".social a"], {
    y: "0%",
    opacity: 1,
    duration: 1,
    delay: 0.75,
    stagger: 0.1,
    ease: "power3.out",
  });

  gsap.to(menuOverlay.value, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
    duration: 1.25,
    ease: "power4.inOut",
    onComplete: () => {
      isAnimating.value = false;
      isOpen.value = true;
    },
  });
};

const closeMenu = () => {
  if (isAnimating.value || !isOpen.value) return;
  isAnimating.value = true;

  gsap.to(container.value, {
    rotation: 0,
    x: 0,
    y: 0,
    scale: 1,
    duration: 1.25,
    ease: "power4.inOut",
  });

  animateMenuToggle(false);

  gsap.to(menuContent.value, {
    rotation: -15,
    x: -100,
    y: -100,
    scale: 1.5,
    opacity: 0.25,
    duration: 1.25,
    ease: "power4.inOut",
  });

  gsap.to(menuOverlay.value, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    duration: 1.25,
    ease: "power4.inOut",
    onComplete: () => {
      isOpen.value = false;
      isAnimating.value = false;
      gsap.set([".link a", ".social a"], {
        y: "120%",
      });
      resetPreviewImage();
    },
  });
};

const animateMenuToggle = (isOpening) => {
  const open = document.querySelector('p#menu-open');
  const close = document.querySelector('p#menu-close');

  gsap.to(isOpening ? open : close, {
    x: isOpening ? -5 : 5,
    y: isOpening ? -10 : 10,
    rotation: isOpening ? -5 : 5,
    opacity: 0,
    delay: 0.25,
    ease: "power2.out",
  });

  gsap.to(isOpening ? close : open, {
    x: 0,
    y: 0,
    rotation: 0,
    opacity: 1,
    delay: 0.5,
    duration: 0.5,
    ease: "power2.out",
  });
};

const cleanupPreviewImages = () => {
  const previewImages = menuPreviewImg.value.querySelectorAll('img');
  if (previewImages.length > 3) {
    for (let i = 0; i < previewImages.length - 3; i++) {
      menuPreviewImg.value.removeChild(previewImages[i]);
    }
  }
};

const resetPreviewImage = () => {
  menuPreviewImg.value.innerHTML = '';
  const defaultImg = document.createElement('img');
  defaultImg.src = '../src/assets/nature-1920.jpg';
  menuPreviewImg.value.appendChild(defaultImg);
};

menuLinks.value.forEach(link => {
  link.addEventListener('mouseover', () => {
    if (!isOpen.value || isAnimating.value) return;

    const imgSrc = link.getAttribute("data-img");
    if (!imgSrc) return;

    const existingImages = menuPreviewImg.value.querySelectorAll('img');
    if (existingImages.length > 0 && existingImages[existingImages.length - 1].src.endsWith(imgSrc)) {
      return;
    }

    const newPreviewImg = document.createElement('img');
    newPreviewImg.src = imgSrc;
    newPreviewImg.style.opacity = "0";
    newPreviewImg.style.transform = "scale(1.25) rotate(10deg)";

    menuPreviewImg.value.appendChild(newPreviewImg);
    cleanupPreviewImages();

    gsap.to(newPreviewImg, {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 0.75,
      ease: "power2.out",
    });
  });
});
</script>

<template>
  <nav>
    <div class="logo">
      <a href="#">Void Construct</a>
    </div>
    <div class="menu-toggle" ref="menuToggle" @click="isOpen ? closeMenu() : openMenu()">
      <p id="menu-open">Menu</p>
      <p id="menu-close">Close</p>
    </div>
  </nav>

  <div class="menu-overlay" ref="menuOverlay">
    <div class="menu-content" ref="menuContent">
      <div class="menu-items">
        <div class="col-lg">
          <div class="menu-preview-img" ref="menuPreviewImg">
            <img src="../src/assets/nature-1920.jpg" alt="">
          </div>
        </div>
        <div class="col-sm">
          <div class="menu-links" ref="menuLinks">
            <div class="link">
              <a href="#" data-img="../src/assets/nature-1920.jpg">work</a>
            </div>
            <div class="link">
              <a href="#" data-img="../src/assets/nature-1920.jpg">work</a>
            </div>
            <div class="link">
              <a href="#" data-img="../src/assets/nature-1920.jpg">work</a>
            </div>
            <div class="link">
              <a href="#" data-img="../src/assets/nature-1920.jpg">work</a>
            </div>
          </div>
          <div class="menu-socials">
            <div class="social">
              <a href="#">
                <img src="../src/assets/nature-1920.jpg" alt="">Work
              </a>
            </div>
            <div class="social">
              <a href="#">
                <img src="../src/assets/nature-1920.jpg" alt="">Work
              </a>
            </div>
            <div class="social">
              <a href="#">
                <img src="../src/assets/nature-1920.jpg" alt="">Work
              </a>
            </div>
            <div class="social">
              <a href="#">
                <img src="../src/assets/nature-1920.jpg" alt="">Work
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="menu-footer">
        <div class="col-lg">
          <a href="#">work</a>
        </div>
        <div class="col-sm">
          <a href="#">work</a>
          <a href="#">work</a>
        </div>
      </div>
    </div>
  </div>

  <div class="container" ref="container">
    <div class="hero">
      <div class="hero-img">
        <img src="../src/assets/nature-1920.jpg" alt="">
        <h1>Void Construct</h1>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

nav {
  position: fixed;
  width: 100%;
  padding: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.logo a {
  font-weight: 600;
}

.menu-toggle {
  position: relative;
  width: 3rem;
  height: 1.5rem;
  cursor: pointer;
}

.menu-toggle p {
  position: absolute;
  transform-origin: top left;
  will-change: transform, opacity;
}

.menu-overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: var(--daik);
  z-index: 1;
}

.menu-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: left bottom;
  will-change: transform, opacity;
}

.menu-items,
.menu-footer {
  width: 100%;
  padding: 2.5em;
  display: flex;
  gap: 2.5em;
}

.col-lg {
  flex: 3;
}

.col-sm {
  flex: 2;
}

.menu-items .col-lg {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-preview-img {
  position: relative;
  width: 45%;
  height: 100%;
  overflow: hidden;
}

.menu-preview-img img {
  position: absolute;
  will-change: transform, opacity;
}

.menu-items .col-sm {
  padding: 2.5em 0;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
}

.menu-links,
.menu-socials {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.link,
.social {
  padding-bottom: 6px;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

.link a,
.social a {
  display: inline-block;
  will-change: transform;
  transition: color 0.5s;
}

.link a {
  font-size: 3.5rem;
  letter-spacing: -0.02rem;
}

.social a {
  color: var(--light);
}

.social a:hover {
  color: var(--light2);
}

.menu-footer {
  position: absolute;
  bottom: 0;
}

.menu-footer .col-sm {
  display: flex;
  justify-content: center;
}

.link a::after,
.social a::after,
.menu-footer a::after {
  position: absolute;
  content: "";
  top: 102.5%;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--light);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s cubic-bezier(0.6, 0, 0.4, 1);
}

.link a:hover::after,
.social a:hover::after,
.menu-footer a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.container {
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
  transform-origin: right top;
}

.hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.hero-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
}

.hero h1 {
  width: 80%;
}

.menu-toggle p#menu-close {
  opacity: 0;
  transform: translateX(-5px) translateY(10px) rotate(5deg);
}

.link a,
.social a {
  transform: translateY(120%);
  opacity: 0.25;
}

.menu-content {
  transform: translateX(-100px) translateY(-100px) scaleX(1.5) rotate(-15deg);
  opacity: 0.25;
}

.menu-overlay {
  clip-path: polygon(0 0, 100% 0, 100% 0%, 0% 0%);
}

@media (max-width: 900px) {
  .hero h1 {
    width: 100%;
    font-size: 4rem;
    letter-spacing: 0;
  }

  .menu-items .col-lg {
    display: none;
  }

  .link a::after:hover,
  .social a::after:hover,
  .menu-footer a::after:hover {
    display: none;
  }
}
</style>
