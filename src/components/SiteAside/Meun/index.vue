<template>
        <nav class="meun-container">
            <RouterLink :to="item.link"
            :exact ="item.exact"
            :key="item.link"
            v-for="item in items"
            active-class="selected"
            router-link-active=""
            >
                <div class="icon">
                    <icon :type="item.icon"/>
                </div>
                <span>{{item.title}}</span>
            </RouterLink>
        </nav>
</template>
<script>
import "@/styles/global.less";
import icon from "@/components/icon";
export default {
    data(){
        return {
            items:[
                {
                    link:"/",
                    icon:"home",
                    title:"首页",
                    exact:true
                },
                {
                    link:"/article",
                    icon:"blog",
                    title:"文章",
                    exact:false//激活状态是否要精确匹配
                },
                {
                    link:"/about",
                    icon:"about",
                    title:"关于我",
                    exact:true
                },
                {
                    link:"/project",
                    icon:"code",
                    title:"项目&效果",
                    exact:true
                },
                {
                    link:"/message",
                    icon:"chat",
                    title:"留言板",
                    exact:true
                }
            ]
        }
    },
    components:{
        icon,
    },
}
</script>
<style lang="less" scoped>
    @import "~@/styles/var.less";
    .meun-container{
        width: 100%;
        color:@gray;
        margin: 24px 0;
        a{
            padding: 0 50px;
            display: block;
            display: flex;
            align-items:center;
            height: 45px;
            .icon{
                font-size: 24px;
                width: 26px;
                margin-right:5px;
            }
            &:hover{
                color:#fff;
            }
            &.selected{
                background: darken(@gray,25%);
            }
        }
    }
</style>