<template>
    <div class="test-container">
        <contect />
    </div>
</template>
<script>
import contect from "./"
export default {
    components:{
        contect,
    }
}
</script>
<style lang="less" scoped>
    @import "~@/styles/minix.less";
    .test-container{
        width:250px;
        height: 600px;
        margin: 0 auto;
        border: 2px solid;
        background: rgba(0,0,0,.8);
        .self-center();
        padding-top: 200px;
    }
</style>