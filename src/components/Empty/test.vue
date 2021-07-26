<template>
    <div class="test-container">
        <Empty />
    </div>
</template>
<script>
import Empty from "./index"
export default {
    components:{
        Empty,
    }
}
</script>
<style scoped lang="less">
    .test-container{
        position: relative;
        height: 500px;
    }
</style>