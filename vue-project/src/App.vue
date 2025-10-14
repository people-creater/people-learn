<script setup>
/* global gsap */
import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Lenis from 'lenis';//引入平滑滚动

// 实现 smoothStep 函数
const smoothStep = (p) => p * p * (3 - 2 * p);

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis();
  lenis.on('scroll', ScrollTrigger.update );
  gsap.ticker.add((time)=> {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
  const smoothScroll = (p) => p * p * (3 - 2 * p)

  ScrollTrigger.create({
    trigger: ".hero",
    start: "top top",
    end: "75% top",
    scrub: 1,
    onUpdate:(self)=>{
      const progress = self.progress;

      const heroCardsContainerOpacity = gsap.utils.interpolate(
          1,
          0.5,
          smoothScroll(progress)
      )
      gsap.set(".hero-cards",{
        opacity: heroCardsContainerOpacity
      });

      ["#hero-card-1", "#hero-card-2", "#hero-card-3"].forEach(
          (cardId,index)=>{
            const delay = index * 0.9;
            const cardProgress = gsap.utils.clamp(
                0,
                1,
                (progress -  delay * 0.1) / (1 - delay * 0.1)
            )

            const y = gsap.utils.interpolate(
                "0%",
                "250%",
                smoothScroll(cardProgress)
            )

            const scale = gsap.utils.interpolate(
                1,
                0.75,
                smoothScroll(cardProgress)
            )

            let x = "0%"
            let rotation = 0;
            if(index === 0){
              x = gsap.utils.interpolate("0%","90%",smoothScroll(cardProgress))
              rotation = gsap.utils.interpolate(
                  0,
                  -15,
                  smoothScroll(cardProgress)
              )
            }else if(index === 2){
              x = gsap.utils.interpolate("0%","-90%",smoothScroll(cardProgress))
              rotation = gsap.utils.interpolate(
                  0,
                  15,
                  smoothScroll(cardProgress)
              )
            }
            gsap.set(cardId,{
              y,
              x,
              rotation,
              scale,
            });
          }
      )
    }
  });
})
ScrollTrigger.create({
  trigger: ".services",
  start: "top top",
  end: `+=${window.innerHeight * 4}px`,
  pin: ".services",
  pinSpacing: true,
})

ScrollTrigger.create({
  trigger: ".services",
  start: "top top",
  end: `+=${window.innerHeight * 4}px`,
  onLeave: () => {
    const servicesSection = document.querySelector(".services");
    const servicesRect = servicesSection.getBoundingClientRect();
    const servicesTop = window.pageXOffset + servicesRect.top;

    gsap.set(".cards",{
      position:"absolute",
      top: servicesTop,
      left:0,
      width: "100vw",
      height: "100vh",
    })
  },
  onLeaveBack: () => {
    gsap.set(".cards",{
      position:"fixed",
      top: 0,
      left:0,
      width: "100vw",
      height: "100vh",
    })
  },
})

ScrollTrigger.create({
  trigger: ".services",
  start: "top bottom",
  end: `+=${window.innerHeight * 4}px`,
  onUpdate: (self) => {
    const progress = self.progress;
    const headerProgress = gsap.utils.clamp(0,1,progress/0.9)
    const headerY = gsap.utils.interpolate(
        "400%",
        "0%",
        smoothStep(headerProgress)
    )
    gsap.set(".services-header",{
      y: headerY,
    });

    ["#card-1", "#card-2", "#card-3"].forEach((cardId,index)=>{
      const delay = index * 0.5;
      const cardProgress = gsap.utils.clamp(
          0,
          1,
          (progress - delay * 0.1) / (0.9 - delay * 0.1)
      );

      const innerCard = document.querySelector(`${cardId} .flip-card-inner`);

      let y;
      if(cardProgress < 0.4){
        const normalizedProgress = cardProgress / 0.4;
        y = gsap.utils.interpolate(
            "-100%",
            "-50%",
            smoothStep(normalizedProgress)
        )
      }else if(cardProgress < 0.6){
        const normalizedProgress = (cardProgress - 0.4) / 0.2;
        y = gsap.utils.interpolate(
            "-50%",
            "0%",
            smoothStep(normalizedProgress)
        )
      }else{
        y = "0%";
      }

      let scale;
      if(cardProgress < 0.4){
        const normalizedProgress = cardProgress / 0.4;
        scale = gsap.utils.interpolate(
            0.25,
            0.75,
            smoothStep(normalizedProgress)
        )
      }else if(cardProgress < 0.6){
        const normalizedProgress = (cardProgress - 0.4) / 0.2;
        scale = gsap.utils.interpolate(
            0.75,
            1,
            smoothStep(normalizedProgress)
        )
      }else{
        scale = 1;
      }

      let opacity;
      if(cardProgress < 0.2){
        const normalizedProgress = cardProgress / 0.2;
        opacity = smoothStep(normalizedProgress)
      }else{
        opacity = 1;
      }

      let x, rotate, rotationY;
      if(cardProgress < 0.6){
        x = index ===0 ? "100%" : index ===1 ? "0%" : "-100%";
        rotate = index ===0 ? -5 : index ===1 ? 0 : 5;
        rotationY = 0;
      }else if(cardProgress < 1){
        const normalizedProgress = (cardProgress - 0.6) / 0.4;
        x = gsap.utils.interpolate(
            index === 0 ? "100%" : index ===1 ? "0%" : "-100%",
            "0%",
            smoothStep(normalizedProgress)
        )
        rotate = gsap.utils.interpolate(
            index === 0 ? -5 : index ===1 ? 0 : 5,
            0,
            smoothStep(normalizedProgress)
        )
        rotationY = smoothStep(normalizedProgress) * 180;
      }else{
        x = "0%";
        rotate = 0;
        rotationY = 180;
      }

      gsap.set(cardId,{
        y,
        x,
        rotate,
        scale,
        opacity,
      });
      gsap.set(innerCard,{
        rotationY,
      });
    })
  },
})
</script>

<template>
  <nav>
    <div class = 'logo'><span>Site Logo</span></div>
    <div class = 'menu-btn'><span>Menu</span></div>
  </nav>

  <section class="hero">
    <div class="hero-cards">
      <div class="card" id="hero-card-1">
        <div class="card-title">
          <span>Plan</span>
          <span>01</span>
        </div>
        <div class="card-title">
          <span>01</span>
          <span>Plan</span>
        </div>
      </div>
      <div class="card" id="hero-card-2">
        <div class="card-title">
          <span>Plan</span>
          <span>02</span>
        </div>
        <div class="card-title">
          <span>02</span>
          <span>Plan</span>
        </div>
      </div>
      <div class="card" id="hero-card-3">
        <div class="card-title">
          <span>Plan</span>
          <span>03</span>
        </div>
        <div class="card-title">
          <span>03</span>
          <span>Plan</span>
        </div>
      </div>
    </div>
  </section>

  <section class="about">
    <h1>Keep scrolling - we'll keep adding content</h1>
  </section>

  <section class="services">
    <div class="services-header">
      <h1>Services</h1>
    </div>
  </section>

  <section class="cards">
    <div class="cards-container">
      <div class="card" id="card-1">
        <div class="card-wrapper">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div class="card-title">
                <span>Plan</span>
                <span>01</span>
              </div>
              <div class="card-title">
                <span>01</span>
                <span>Plan</span>
              </div>
            </div>
            <div class="flip-card-back">
              <div class="card-title">
                <span>Plan</span>
                <span>01</span>
              </div>
              <div class="card-copy">
                <p>work</p>
                <p>work</p>
                <p>work</p>
                <p>work</p>
                <p>work</p>
                <p>work</p>
              </div>
              <div class="card-title">
                <span>01</span>
                <span>Plan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" id="card-2">
        <div class="card-wrapper">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div class="card-title">
                <span>Plan</span>
                <span>02</span>
              </div>
              <div class="card-title">
                <span>02</span>
                <span>Plan</span>
              </div>
            </div>
            <div class="flip-card-back">
              <div class="card-title">
                <span>Plan</span>
                <span>02</span>
              </div>
              <div class="card-copy">
                <p>work</p>
                <p>work</p>
                <p>work</p>
                <p>work</p>
                <p>work</p>
                <p>work</p>
              </div>
              <div class="card-title">
                <span>02</span>
                <span>Plan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" id="card-3">
        <div class="card-wrapper">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div class="card-title">
                <span>Plan</span>
                <span>03</span>
              </div>
              <div class="card-title">
                <span>03</span>
                <span>Plan</span>
              </div>
            </div>
            <div class="flip-card-back">
              <div class="card-title">
                <span>Plan</span>
                <span>03</span>
              </div>
              <div class="card-copy">
                <p>work</p>
                <p>work</p>
                <p>work</p>
                <p>work</p>
                <p>work</p>
                <p>work</p>
              </div>
              <div class="card-title">
                <span>03</span>
                <span>Plan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="outro">
    <h1>A working demo of this example can be found</h1>
  </section>
</template>

<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav{
  position: fixed;
  width: 100vw;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.logo span,
.menu-btn span{
  font-size: 0.8rem;
  padding: 0.75rem;
  border-radius: 0.25rem;
}

.logo span{
  background-color: var(--daik);
  color: var(--light);
}

.menu-btn span{
  background-color: var(--light);
  color: var(--daik);
}

section{
  position: relative;
  width: 100vw;
  height: 100svh;
  padding: 2rem;
  overflow: hidden;
}

.hero{
  background-color: var(--light);
  color: var(--daik);
}

.about,
.outro{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--daik);
  color: var(--light);
}

.hero-cards{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 35%;
  justify-content: center;
  gap: 1rem;
}

.hero-cards .card{
  flex: 1;
  position: relative;
  aspect-ratio: 5/7;
  padding: 0.75rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title{
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.hero-cards .card span{
  font-size: 0.7rem;
}

.hero-cards .card#hero-card-1{
  background-color: var(--accent-1);
  transform-origin: top right;
  z-index: 2;
}
.hero-cards .card#hero-card-2{
  background-color: var(--accent-2);
  z-index: 1;
}
.hero-cards .card#hero-card-3{
  background-color: var(--accent-3);
  transform-origin: top left;
  z-index: 0;
}

.services{
  padding: 8rem 2rem;
}

.services-header{
  position: relative;
  width: 100%;
  text-align: center;
  transform: translateY(400%);
  will-change: transform;
}

.cards{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100svh;
  display: flex;
  justify-content: center;
  z-index: -1;
  background-color: var(--light);
  color: var(--daik);
}

.cards-container{
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 75%;
  height: 100%;
  gap: 4rem;
}

.cards-container .card{
  flex: 1;
  position: relative;
  aspect-ratio: 5/7;
  perspective: 1000px;
}

.cards-container .card .card-wrapper{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  animation: floating 2s ease-in-out infinite;
}

@keyframes floating {
  0% {
    transform: translate(-50%, -50%);
  }
  50% {
    transform: translate(-50%, -55%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}

#card-1 .card-wrapper{
  animation-delay: 0s;
}
#card-2 .card-wrapper{
  animation-delay: 0.25s;
}
#card-3 .card-wrapper{
  animation-delay: 0.5s;
}

.flip-card-inner{
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

.flip-card-front,
.flip-card-back{
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 1rem;
}

.flip-card-front{
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

#card-1 .flip-card-front{
  background-color: var(--accent-1);
}
#card-2 .flip-card-front{
  background-color: var(--accent-2);
}
#card-3 .flip-card-front{
  background-color: var(--accent-3);
}

.flip-card-back{
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  background-color: #fff;
  transform: rotateY(180deg);
}

.card-copy{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-copy p{
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  background-color: var(--light2);
  border-radius: 0.25rem;
}

#card-1{
  transform: translateX(100%) translateY(-100%) rotate(-5deg) scale(0.25);
  z-index: 2;
}
#card-2{
  transform: translateX(0%) translateY(-100%) rotate(0deg) scale(0.25);
  z-index: 1;
}
#card-3{
  transform: translateX(-100%) translateY(-100%) rotate(5deg) scale(0.25);
  z-index: 0;
}

.cards-container .card{
  opacity: 0;
}/**/
</style>
