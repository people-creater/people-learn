<script setup>

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

/*.cards-container .card{
  opacity: 1;
}*/
</style>
