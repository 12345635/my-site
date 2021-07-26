<template>
    <div class="test-container">
        <Meun />
    </div>
</template>
<script>
import Meun from "./"
export default {
    components:{
        Meun,
    }
}
</script>
<style lang="less" scoped>
    .test-container{
        width:250px;
        height: 600px;
        margin: 0 auto;
        background: rgba(0,0,0,.7);
        border:2px solid;
    }
</style>