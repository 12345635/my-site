<template>
    <div class="about-container" v-loading="loading">
        <iframe class="about" :src="data" frameborder="0"></iframe>
    </div>
</template>
<script>
import {mapState} from "vuex"
export default {
    computed:mapState("about",["loading","data"]),
    created(){
        this.$store.dispatch("about/getAbout");
    }
}
</script>
<style lang="less" scoped>
.about-container{
    width: 100%;
    height: 100%;
    position: relative;
}
.about{
    width: 100%;
    height: 100%;
    #wrapper{
        width: 50%;
    }
}

</style>