<template>
    <div class="test-container">
        <Layout>
            <div class="mian">
                 <h1>Here mian be a page title</h1>
            </div>   
            <template #left>
                Here right be a page title
            </template>
        </Layout>
    </div>
</template>
<script>
import Layout from './';
export default {
    components:{
        Layout,
    },
}
</script>
<style scoped lang="less">
    .test-container{
        width: 1000px;
        height: 800px;
        margin: 0 auto;
        .left{
            width: 250px;
            height: 100%;
        }
    }
</style>