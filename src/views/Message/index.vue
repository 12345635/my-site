<template>
    <div class="message-container" ref="messageContainer">
        <BlogComment />
    </div>
</template>
<script>
import BlogComment from '@/views/blog/components/BlogComment'
import fetchData from "@/mixins/fetchData"
import mainScroll from "@/mixins/mainScroll"
import {getComments,postComment} from "@/api/blog"
import {debounce} from "@/utils"
export default {
    mixins:[fetchData({total:0,rows:[]}),mainScroll("messageContainer")],
    components:{
        BlogComment,
    },
    data(){
        return {
            page:1,
            limit:10,
        }
    },
    computed:{
        hasMore(){
            return this.data.rows.length >= this.data.total
        }
    },
    async created(){
        this.setSelectDebounce = await debounce(this.setSelect,20);
        this.$bus.$on("mainScroll",this.setSelectDebounce);
    },
    destroyed(){
        this.$bus.$off("mainScroll",this.setSelectDebounce);
    },
    methods:{
        async fetchData(){
           return await getComments(this.$route.params.id,this.page,this.limit);
        },
        async handleSubmit(formData,callback){
            const resp =  await postComment({
                blogId:this.$route.params.id,
                ...formData,
            });
            this.data.rows.unshift(resp);
            this.data.total++;
            callback("评论成功");
        },
        setSelect(dom){
            if(this.loading || !dom){
                return
            };
            const range = 50;
            const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
            if(dec <= range){
                this.fetchMore();
            }
        },
        async fetchMore(){
            if(this.hasMore){
                return;
            }
            this.loading = true;
            this.page ++;
            const resp = await this.fetchData();
            this.data.total = resp.total;
            this.data.rows = this.data.rows.concat(resp.rows);
            this.loading = false;
        }
    },
}
</script>
<style scoped lang="less">
.message-container{
    width: 100%;
    height: 100%;
    scroll-behavior: smooth;
    overflow-y: auto;
    #blog-comment-container{
        padding-top: 60px;
        width: 80%;
        margin: 0 auto;
    }
}
</style>