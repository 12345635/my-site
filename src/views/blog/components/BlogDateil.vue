<template>
<!-- 渲染文章相关信息 -->
    <div id="bolg-dateil-container markdown-body">
        <h1>{{ blog.title }}</h1>
        <div class="aside">
            <span v-if="blog.createDate">日期：{{ formatDate(blog.createDate) }}</span>
            <span v-if="blog.scanNumber">浏览量：{{ blog.scanNumber}}</span>

            <a href="#blog-comment-container" 
            v-if="blog.commentNumber">
            评论：{{ blog.commentNumber}}</a>
            <!-- 点击了文章的分类，就跳转到分类页面 -->
            <RouterLink v-if="blog.category"
                :to="{
                name: 'CategoryBlog',
                params: {
                    categoryId: blog.category.id,
                },
                }"
            >{{ blog.category.name }}
            </RouterLink>
        </div>
        <div v-html="blog.htmlContent" class="htmlContent"></div>
    </div>
</template>
<script>
import formatDate from "@/utils/formatDate"
import "highlight.js/styles/github.css"
import "@/styles/markdown.css"
export default {
    props:{
        blog:{
            type:Object,
            required:true
        }
    },
    methods:{
        formatDate,
    }
}
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";
.aside {
  font-size: 12px;
  color: @gray;
  span,
  a {
    margin-right: 15px;
  }
}
#bolg-dateil-container{
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    margin: 0;
}
.markdown-body {
  margin: 2em 0;
}
</style>