<template>
    <div class="imageLoder-container">
        <img :src="placeholder" class="placeholder" v-if="!everythingDone">
        <img :src="src" 
        :style="{opacity:originOpacity,transition:`${duration}ms`}"
        @load = "handleimg"
        >
    </div>
</template>
<script>
export default {
    props:{
        placeholder:{
            type:String,
            required:true,
        },
        src:{
            type:String,
            require:true,
        },
        duration:{
            type:Number,
            default:500,
        }
    },
    data(){
        return {
            loder:false,//图片加载是否加载完成
            everythingDone:false,//图片是否完成显示
        }
    },
    computed:{
        originOpacity(){
            return this.loder ? 1 : 0;
        }
    },
    methods:{
        handleimg(){
            this.loder = true;
            setTimeout(()=>{
                this.everythingDone = true;
                this.$emit("load");
            },this.duration);
        },
    },
}
</script>
<style lang="less" scoped>
    @import "~@/styles/minix.less";
    .imageLoder-container{
        width:100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        img{
            .self-fill();
            object-fit:cover;
        }
        .placeholder{
            filter:blur(2vw);
        }
    }
</style>