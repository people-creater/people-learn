<script>
 export default {
  props:['title'],
   methods:{
    changefn(){
      this.$emit('changeTitle','标题修改了')
    }
   }

}

</script>

<template>
<div class="header">
<h1>{{title}}</h1>
  <button @click="changefn">修改</button>
</div>
</template>

<style scoped>
.header{
  height: 100px;
  background-color: red;
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  color: white;
  line-height: 100px;
}
</style>