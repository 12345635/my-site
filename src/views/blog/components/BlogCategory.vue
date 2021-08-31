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
    // 混入fectchData中的数据
    mixins:[fetchData([])],
    computed:{
        // 根据router中的信息，计算出当前分类ID，如果没有（-1）表示全部分类
        categoryId(){
            return +this.$route.params.categoryId || -1;
        },
        // 得到每页的数量
        limit(){
            return +this.$route.query.limit || 10;
        },
        // 传入组件的参数
        list(){
            // 得到文章总数
            const article = this.data.reduce(
                (a, b) => a + b.articleCount,
                0
            );
            // 将总数编写入数组传入
            const result = [
                {name:"全部",id:-1,articleCount:article},
                ...this.data,
            ]
            // 将对象信息，修改成我们想要的信息
            return result.map((it)=>({
                ...it,
                // isSelect 设置一个当前的id
                isSelect:it.id === this.categoryId,
                // 拼接一下分类的数量，显示出我们需要的字符
                aside:`${it.articleCount}篇`
            }));
        }
    },
    methods:{
        async fetchData(){
            return await getBlogType();
        },
        // 传给组件一个函数
        handleSelect(item){
            // 分页信息
            const query = {
                page:1,
                limit:this.limit
            }
            // 如果点击的元素id == -1 表示获取所有分类的文章
            if(item.id == -1){
                this.$router.push({
                    name:"blog",
                    query,
                })
            }else{
                // 否则就跳转到分类页
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