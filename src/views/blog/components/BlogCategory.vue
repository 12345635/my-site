<template>
    <div class="category-container"
    v-loading="loading"
    >
    <div v-show="!loading">
        <h2>文章分类</h2>
        <RightList :list="list"
        @select="handleSelect"
        />
    </div>
    </div>
        
</template>
<script>
import fetchData from "@/mixins/fetchData"
import {getBlogType} from "@/api/blog"
import RightList from "./RightList"
export default {
    mixins:[fetchData([])],
    computed:{
        categoryId(){
            return +this.$route.params.categoryId || -1;
        },
        limit(){
            return +this.$route.query.limit || 10;
        },
        list(){
            const article = this.data.reduce(
                (a, b) => a + b.articleCount,
                0
            );
            const result = [
                {name:"全部",id:-1,articleCount:article},
                ...this.data,
            ]
            return result.map((it)=>({
                ...it,
                isSelect:it.id === this.categoryId,
                aside:`${it.articleCount}篇`
            }));
        }
    },
    methods:{
        async fetchData(){
            return await getBlogType();
        },
        handleSelect(item){
            const query = {
                page:1,
                limit:this.limit
            }
            if(item.id == -1){
                this.$router.push({
                    name:"blog",
                    query,
                })
            }else{
                this.$router.push({
                    name:"CategoryBlog",
                    query,
                    params:{
                        categoryId:item.id
                    }
                })
            }
               
        }
    },
    components:{
        RightList,
    }
}
</script>
<style scoped lang="less">
.category-container{
    width: 300px;
    box-sizing: border-box;
    padding: 20px;
    position: relative;
    overflow: auto;
    height: 100%;
    h2{
        font-weight: bold;
        letter-spacing: 2px;
        font-size: 1rem;
        margin: 0;
    }
}
</style>