<template>
<Layout>
    <blogList />
    <template #right>
        <BlogCategory />
    </template>
</Layout>
    
</template>
<script>
import blogList from "./components/BlogList"
import BlogCategory from "./components/BlogCategory"
import Layout from "@/components/layout"
export default {
    components:{
        blogList,
        BlogCategory,
        Layout
    }
}
</script>
<style scoped>

</style>