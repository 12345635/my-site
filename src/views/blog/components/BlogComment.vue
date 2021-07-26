<template>
    <div id="blog-comment-container">
        <MessageArea 
        :title="'留言板'"
        :subTitle="`（${data.total}）`"
        :list="data.rows"
        :isListLoading="loading"
        @submit="handleSubmit"
        />
    </div>
</template>
<script>
import MessageArea from "@/components/MessageArea"
import fetchData from "@/mixins/fetchData"
import {getComments,postComment} from "@/api/blog"
import { debounce } from "@/utils"
export default {
    mixins:[fetchData({total:0,rows:[]})],
    components:{
        MessageArea,
    },
    data(){
        return {
            page:1,
            limit:10
        }
    },
    computed:{
        hasMore(){
            return this.data.rows.length >= this.data.total
        }
    },
    created(){
        this.setSelectDebounce = debounce(this.setSelect,20);
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
    }
}
</script>
<style lang="less" scoped>
#blog-comment-container{
    margin: 30px;
}
</style>