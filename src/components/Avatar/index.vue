<template>
<div class="avatar-container">
  <img :src = "url" 
    class="avatar-img" 
    :style = "{
      width: size + 'px',
      hight: size + 'px'
    }">
</div>
    
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    url: {
      type:String,
      requierd:true,
    },
    size:{
      type:Number
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .avatar-img{
    border-radius: 50%;
    object-fit: cover;
    display: block;
    margin: 0 auto;
  }
</style>
