<template>
    <div class="project-container" ref="projectContainer">
        <div class="project-item" v-for="item in data" :key="item.id">
            <a 
            :href="
                item.url?item.url:`javascript:alert('该项目不能通过外网打开')`
            "
            :target="item.url?'_blank':'_self'"   
                >
                <img v-layz="item.thumb" alt="">
            </a>
            <div class="info">
                <h2>
                    <a 
                    :href="item.url?item.url:`javascript:alert('该项目不能通过外网打开')`
                    "
                    :target="item.url?'_blank':'_self'"  
                    >
                    <span class="title">{{item.name}}</span>
                    </a>
                </h2>
                <a
                class="github"
                target="_blank"
                :href="item.github"
                v-if="item.github"
                >
                github
                </a>
                <p v-for="(desc,i) in item.description" :key="i">{{desc}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex"
import  mainScroll  from "@/mixins/mainScroll"
export default {
    mixins:[mainScroll("projectContainer")],
    computed:mapState("project",["loading","data"]),
    created(){
        this.$store.dispatch("project/fetchProject");
    },
    mounted(){

    }
}

</script>
<style scoped lang="less">
@import "~@/styles/var.less";
.project-container{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    scroll-behavior: smooth;
}
.project-item{
    display: flex;
    padding: 20px;
    align-items: center;
    img{
        margin-right: 20px;
        width: 200px;
    }
    span{
        font-size: 2.2rem;
        font-weight: bold;
       
    }
    .github{
        font-size: 16px;
        font-weight: normal;
        color: @primary;
    }
    h2{
        display: inline-block;
        margin: 0;
    }
    p{
        margin: 0;
    }
}
</style>