<template>
    <ul class="right-list-container">
        <li v-for="(item, i) in list" 
        :key="i"
        >
        <span :class="{active:item.isSelect}"
        @click="handleClick(item)"
        >
            {{item.name}}
        </span>
        <span v-if="item.aside"
        class="aside"
        :class="{active:item.isSelect}"
        @click="handleClick(item)"
        >
            {{item.aside}}
        </span>
            <RightList :list="item.children" @select="handleClick"/>
        </li>
    </ul>
</template>
<script>
export default {
    name:"RightList",
    props:{
        list:{
            data:Array,
            default:()=>[],
        }, 
    },
    methods:{
        handleClick(item){
            if(!item.isSelect){
                this.$emit("select",item)
            }
            
        }
    }
}
</script>
<style scoped lang="less">
@import "~@/styles/var.less";
.right-list-container{
    list-style: none;
    padding: 0;
    .right-list-container{
        padding-left: 20px;
    }
    li{
        min-height: 40px;
        line-height: 40px;
        cursor: pointer;
        .active{
            color: @warn;
            font-weight: bold;
        } 
    }
    .aside{
        font-size: 12px;
        color:@gray;
        margin-left: 1rem;
    }
}
</style>
