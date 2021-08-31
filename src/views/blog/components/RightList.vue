<template>
<!-- 文章右侧分类列表 -->
    <ul class="right-list-container">
        <li v-for="(item, i) in list" 
        :key="i"
        >
        <!-- 根据对象身上的是否激活状态来添加  calss 达到激活目的 -->
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
            <!-- 将自身递归，查看是还有子组件没有渲染 -->
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
        // 点击之后传出一个函数，交有其他组件处理
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
