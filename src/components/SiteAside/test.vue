<template>
<div class="test-container">
    <SiteAside />
</div>

</template>
<script>
import SiteAside from "./"
export default {
    components:{
        SiteAside,
    }
}
</script>
<style lang="less" scoped>
.test-container{
    width: 250px;
    height: 600px;
    background: rgba(0,0,0,.7);
    margin: 0 auto;
}
</style>