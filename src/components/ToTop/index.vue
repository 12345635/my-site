<template>
    <div class="to-top-container"
    @click="handleClick"
    v-show="show"
    >
        Top
    </div>
</template>
<script>
export default {
    data(){
        return {
            show:false
        }
    },
    created(){
        this.$bus.$on("mainScroll",this.setMainScroll);
    },
    destroyed(){
        this.$bus.$off("mainScroll",this.setMainScroll);
    },
    methods:{
        handleClick(){
            this.$bus.$emit("mainScrollTop",0)
        },
        setMainScroll(dom){
            if(!dom){
                return
            }
            this.show = dom.scrollTop >= 500;
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";
.to-top-container{
position: fixed;
@number:50px;
bottom: @number;
right: @number;
background: @primary;
border-radius: 50%;
width: @number;
height: @number;
text-align: center;
line-height: @number;
box-shadow: 1.5px 0 1px 0 rgba(0,0,0,.5),
            -1.5px 0 1px 0 rgba(0,0,0,.5),
            0 1.5px 1px 0 rgba(0,0,0,.5),
            0 -1.5px 1px 0 rgba(0,0,0,.5);
cursor: pointer;
}
</style>