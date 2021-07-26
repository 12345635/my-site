<template>
    <div class="empty-container">
        <icon type="empty" />
        <p>{{text}}</p>
    </div>
</template>
<script>
import icon from "../icon/index"
export default {
    props:{
        text:{
            type:String,
            default:"无数据",
        }
    },
    components:{
        icon,
    }
}
</script>
<style lang="less" scoped>
    @import "~@/styles/minix";
    @import "~@/styles/var";
    .empty-container{
        .self-center();
        text-align: center;
        color:@gray;
        .iconfont{
            font-size: 72px;
        } 
    }
</style>