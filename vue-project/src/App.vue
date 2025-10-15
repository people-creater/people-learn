<script setup>
import {useRouter} from 'vue-router';

const router = useRouter();
const handleClick = () => {
  router.push('/about');
}
</script>

<template>
  <nav>
    <div class="logo">
      <a href="#">Void Construct</a>
    </div>
    <div class="menu-toggle">
      <p id = "menu-open">Menu</p>
      <p id = "menu-close">Close</p>
    </div>
  </nav>
  <div class = 'menu-overlay'>
    <div class="menu-content">
      <div class="menu-items">
        <div class="col-lg">
          <div class="menu-preview-img"><img src="" alt=""></div>
        </div>
        <div class="col-sm">
          <div class="menu-links">
            <div class="link">
              <a href="#" data-img="">work</a>
            </div>
            <div class="link">
              <a href="#" data-img="">work</a>
            </div>
            <div class="link">
              <a href="#" data-img="">work</a>
            </div>
            <div class="link">
              <a href="#" data-img="">work</a>
            </div>
          </div>
          <div class="menu-socials">
            <div class="social">
              <a href="#">
                <img src="" alt="">Work
              </a>
            </div>
            <div class="social">
              <a href="#">
                <img src="" alt="">Work
              </a>
            </div>
            <div class="social">
              <a href="#">
                <img src="" alt="">Work
              </a>
            </div>
            <div class="social">
              <a href="#">
                <img src="" alt="">Work
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

  <div class="container">
    <div class="hero">
      <div class="hero-img">
        <img src="" alt=""></img>
        <h1>Void Construct</h1>
      </div>
    </div>
  </div>
  <div>
    <div>
      <a @click = handleClick() href="#">跳转</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}

nav{
  position: fixed;
  width: 100%;
  padding: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
}

.logo a{
  font-weight: 600;
}

.menu-toggle{
  position: relative;
  width: 3rem;
  height: 1.5rem;
  cursor: pointer;
}

.menu-toggle p{
  position: absolute;
  transform-origin: top left;
  will-change: transform,opacity;
}

.menu-overlay{
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: var(--daik);
  z-index: 1;
}

.menu-content{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: left bottom;
  will-change: transform,opacity;
}

.menu-items,
.menu-footer{
  width: 100%;
  padding: 2.5em;
  display: flex;
  gap: 2.5em;
}

.col-lg{
  flex: 3;
}

.col-sm{
  flex:2;
}

.menu-items .col-lg{
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-preview-img{
  position: relative;
  width: 45%;
  height: 100%;
  overflow: hidden;
}

.menu-preview-img img{
  position: absolute;
  will-change: tranform,opacity;
}

.menu-items .col-sm{
  padding: 2.5em 0;
  display: flex;
  flex-direction: column;
  gap: 2.5em;
}

.menu-links,
.menu-socials{
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.link,
.social{
  padding-bottom: 6px;
  clip-path:polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

.link a,
.social a{
  display: inline-block;
  will-change: tranform;
  transition: color 0.5s;
}

.link a{
  font-size: 3.5rem;
  letter-spacing: -0.02rem;
}

.social a{
  color: var(--light);
}

.social a:hover{
  color: var(--light2);
}

.menu-footer{
  position: absolute;
  bottom: 0;
}

.menu-footer .col-sm{
  display: flex;
  justify-content: center;
}

.link a::after,
.social a::after,
.menu-footer a::after{
  position: absolute;
  content: "";
  top: 102.5%;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--light);
  transform: scaleX(0);
  transform-origin: right;
  transition: tranform 0.3s cubic-bezier(0.6,0,0.4,1);
}

.link a:hover::after,
.social a:hover::after,
.menu-footer a:hover::after{
  transform: scaleX(1);
  transform-origin: left;
}
</style>
