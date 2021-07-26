<template>
    <div class="pageChange" :v-if=" PageNumber > 1">
        <a 
        :class="{disabled:current === 1}" @click="handleClick(1)">
        |&lt;&lt;</a>
        <a :class="{disabled:current === 1}" @click="handleClick(current - 1)">
        &lt;&lt;</a>
        <a 
            v-for="(n,i) in numbers" 
            :key = i :class="{active:current ==n}" 
            @click="handleClick(n)">
            {{n}}
        </a>
        <a 
        :class="{disabled:current === PageNumber}" 
        @click="handleClick(current + 1)">
        &gt;&gt;</a>
        <a 
        :class="{disabled:current === PageNumber}" 
        @click ="handleClick(PageNumber)">
        &gt;&gt;|</a>
    </div>
</template>

<script>
export default {
    props:{
        current:{//当前页
            type:Number,
            default:1
        },
        total:{//请求的数据总量
            type:Number,
            default:0
        },
        limit:{//每页显示的数量
            type:Number,
            default:10
        },
        visibleNumber:{//一共显示多少页
            type:Number,
            default:10,
        },
    },
    computed:{
        PageNumber(){//总页数
            return Math.ceil(this.total / this.limit);//总页数 = 不满一页也算作一页（总数据量 / 单页显示）
        },
        visibleMin(){//显示的最小页数
            let min = this.current - Math.floor(this.visibleNumber / 2);//显示的最小页数应当 = 当前页 - 总页数的一半
            if(min < 1){//如果显示的页数小于1了  那就从1开始显示
                min = 1;
            }
            if(min >= this.PageNumber){
                min = this.PageNumber -5;
            }
            return min
        },
        visibleMax(){//显示的最大页数
           let max =  this.visibleMin + this.visibleNumber - 1;//显示的最大页数 = 最小页数 + 总页数 - 1（正在显示的）
            if(max > this.PageNumber){
                max = this.PageNumber;
            }
            if(this.min >= this.PageNumber){
                max = this.min
            }
            return max;
        },
        numbers(){
            let nums = [];
            for(let i = this.visibleMin; i <= this.visibleMax; i ++){
                nums.push(i);
            }
            return nums;
        }
    },
    methods:{
        handleClick(n){
            if(n!=this.current){//点击的不是当前页
                this.$emit("PageChange",n);//通过实例对象$emit向父级传递事件委托
            }
        }
    }
}
</script>
<style lang = "less" scoped>
    @import "~@/styles/var.less";
    .pageChange{
        display:flex;
        justify-content:center;
        margin:20px 0;
        a {
            margin:0 6px;
            color:@primary;
            cursor: pointer;
            &.active {
                color: @words;
                cursor:text;
                font-weight: bold;
            }
            &.disabled {
                color:@lightWords;
                cursor:not-allowed;
            }
        }
    }
</style>