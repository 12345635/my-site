<template>
<div class="blogToc-container">
    <RightList :list="tocWithSelect" @select="handleSelect"/>
</div>
</template>
<script>
import RightList from "./RightList"
import { debounce } from "@/utils"
export default {
components:{
    RightList
},
props:{
    toc:{
        type:Array,
    }
},
data(){
    return {
        activeAnchor : "",
        distance : 200
    }
},
created(){
    this.setSelectDebounce = debounce(this.handleMianScroll,50);
    this.$bus.$on("mainScroll",this.setSelectDebounce);
},
destroyed(){
    this.$bus.$off("mainScroll",this.setSelectDebounce);
},
computed:{
    tocWithSelect(){
        const getToc = ((toc=[])=>{
            return toc.map((item)=>({
                isSelect: this.activeAnchor == item.anchor,
                ...item,
                children:getToc(item.children)
            }))
        })
        return  getToc(this.toc);
    },
    doms(){
        const doms = [];
        const addDoms = ((toc = [])=>{
            for( const item of toc){
                doms.push(document.getElementById(item.anchor));
                if(item.children){
                    addDoms(item.children);
                }
            }
            return  doms;
        })
        return addDoms(this.toc);
    }
},
methods:{
    handleSelect(item){
        const hash = item.anchor;
        location = `#${hash}`;
    },
    handleMianScroll(scrollDom){
        if(!scrollDom){
            return;
        }
        this.activeAnchor = "";
        for(const dom of this.doms){
            if(!dom){
                continue;
            }
            const top = dom.getBoundingClientRect().top;
            if(top >= 0 && top <= this.distance){
                this.activeAnchor = dom.id;
                return
            }else if(top > this.distance){
                return
            }else{
                this.activeAnchor = dom.id;
            }
        }
    }
},
}
</script>
<style lang="less" scoped>
.blogToc-container{
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    overflow: auto;
    height: 100%;
}
</style>