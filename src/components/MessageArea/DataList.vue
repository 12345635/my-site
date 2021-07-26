<template>
    <div class="dataList-container">
        <ul>
            <li v-for="item in rows" :key="item.id">
                <Avatar :url="item.avatar" :size="44"/>
                <div class="data">
                    <div class="nickname">{{item.nickname}}</div>
                    <div class="content">{{item.content}}</div>
                    <div class="time">{{ formatDate(item.createDate,true) }}</div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import Avatar from "@/components/Avatar"
import {formatDate} from "@/utils"
export default {
    props:{
        rows:{
            type:Array,
            default:()=>[],
        }
    },
    components:{
        Avatar
    },
    methods:{
        formatDate,
    }
}
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";
.dataList-container{
    width: 100%;
    ul{
        list-style: none;
        padding: 0;
        margin: 0;
    }
    li{
        padding: 15px 0;
        display: flex;
        align-items: center;
        border-bottom: 1px solid lighten(@gray,20%);
    }
    .time{
            font-size: 12px;
            color: @gray;
            position: absolute;
            right: 0;
            top: 5px;
    }
    .data{
        margin-left: 15px;
        flex: 1 1 auto;
        position: relative;
    }
    .nickname{
        font-weight: bold;
        color: darken(@success, 10%);
        margin-bottom: 10px;
    }
    .conent{
       font-size: 14px;
    }
}
</style>