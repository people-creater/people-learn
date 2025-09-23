<template>
  <div class="App">
    <Header :title="MyTitle" @changeTitle="handleTitle"></Header>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'
export default {
  // 声明组件
  components: {Main, Header,Footer},
  data() {
    return {
      MyTitle: '这是标题'
    }
  },
  methods: {
    handleTitle(newTitle){
      this.MyTitle = newTitle
    }
  }
}
</script>
<style>
.App{
  width: auto;
  height: 600px;
  background-color: pink;
  line-height: 600px;
  text-align: center;
  font-size: 20px;
}
</style>