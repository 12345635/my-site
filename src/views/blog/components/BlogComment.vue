<template>
<!-- 留言板 -->
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
        // 返回一个Boolean值，看看当前评论是不是 == 总评论
        hasMore(){
            return this.data.rows.length >= this.data.total
        }
    },
    // 在挂载之前，元素生成之后
    created(){
        // 将函数返回保存到 setSelectDebounce 这个里面
        this.setSelectDebounce = debounce(this.setSelect,20);
        // 注册监听mainScroll，并且传入一个函数
        this.$bus.$on("mainScroll",this.setSelectDebounce);
    },
    destroyed(){
        // 取消mainScroll的监听，并且销毁函数
        this.$bus.$off("mainScroll",this.setSelectDebounce);
    },
    methods:{
        async fetchData(){
           return await getComments(this.$route.params.id,this.page,this.limit);
        },
        // 处理提交评论
        async handleSubmit(formData,callback){
            const resp =  await postComment({
                blogId:this.$route.params.id,
                ...formData,
            });
            this.data.rows.unshift(resp);
            this.data.total++;
            callback("评论成功");
        },
        // 用来处理
        setSelect(dom){
            if(this.loading || !dom){
                return
            };
            const range = 50;
            // 记录一下滚动条的长度
            const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
            if(dec <= range){
                this.fetchMore();
            }
        },
        // 加载评论
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