<template>
    <div class="test-container">
        <ImageLoader
        src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
        placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
        @load="handleLoaded"
        />
    </div>
</template>
<script>
    import ImageLoader from "./"
export default {
    components:{
        ImageLoader,
    },
    methods:{
        handleLoaded(){
            console.log("图片渐进式加载完成")
        }
    }
}
</script>
<style lang="less" scoped>
    .test-container{
        width: 700px;
        height: 500px;
    }
</style>