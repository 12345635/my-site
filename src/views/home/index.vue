<template>
<div class="home-container" ref="container" 
@wheel="handleWheel"
v-Loading="loading">
    <ul class="carousel-container"
    :style="{'margin-top':marginTop}"
    @transitionend="handleWheelend"
    >
        <li v-for="item in data" 
        :key="item.id"
        >
            <Carouselitem :banner="item"
            @tansition="getDoms($event)"
            />
        </li>
    </ul>
    <div class="icon icon-up" v-show="index >= 1"
        @click="handleClick(index - 1)"
        >
        <icon type="arrowUp" />
    </div>
    <div class="icon icon-down" 
    v-show="index < data.length - 1"
    @click="handleClick(index + 1)"
    >
        <icon type="arrowDown" />
    </div>
    <ul class="indicators">
        <li v-for="(item,i) in data" 
        :key="item.id"
        :class="{
            active: i === index
        }"
        @click="handleClick(i)"
        ></li>
    </ul>
</div>
</template>
<script>
import icon from "@/components/icon"
import  getdata  from "@/api/banner"
import Carouselitem from "./Carouselitem.vue"
import {mapState} from "vuex"
export default {
    data(){
        return {
            index:0,//当前显示的下标
            containerHeight:0,//记录整个主页的高度
            switching:false,//记录是否正在过渡  或者翻页
            doms : [],//用来接收传过来的dom和属性
        }
    },
    components:{
        icon,
        Carouselitem
    },
    created(){
        this.$store.dispatch("Banner/fetchBanner");
    },
    mounted(){
        this.containerHeight = this.$refs.container.clientHeight;
        //在挂载之前向window注入resize事件
        window.addEventListener("resize",this.handleResize);
    },  
    //组件销毁之后  删除resize事件
    destroyed(){
        window.removeEventListener("resize",this.handleResize);
    },
    computed:{
        //计算carousel距离上面的距离，达到移动的目的
        marginTop(){
            return -this.index * this.containerHeight + "px"
        },
        ...mapState("Banner",["loading","data"]),
    },
    methods:{
        //点击切换的时候改变当前的下标
        handleClick(number){
            this.index = number;
            //执行子组件的文字重新渲染
            this.switchWidth();
        },
        //鼠标滚轮触发事件
        handleWheel(e){
            //如果图片正在滚动  什么都不做
            //否则继续执行代码
            if(this.switching){
                return;
            }
            //滚轮滚动距离大于5 并且当前下标要大于0 滚动到上一张
            if(e.deltaY < 5 && this.index > 0){
                //改变switching 的值  表达正在滚动
                this.switching = true;
                //改变当前的下标
                this.index -- ;
                //重新渲染子组件
                this.switchWidth();
            }
            //滚轮滚动距离大于5 并且当前下标要大于0 滚动到下一张
            if(e.deltaY > 5 && this.index < this.data.length -1){
                //改变switching 的值  表达正在滚动
                this.switching = true;
                //改变当前的下标
                this.index ++;
                //重新渲染子组件
                this.switchWidth();
            }
        },
        //当子组件的文字效果结束之后，获取到子组件传递过来的参数
        getDoms(options){
            //将子组件的参数保存下来
            this.doms.push(options);
        },
        //改变父组件的参数 达到改变子组件的目的
        switchWidth(){
            //取消dom title的过渡效果
            this.doms[this.index].title.style.transition = "0s";
            //让dom 的width 为0
            this.doms[this.index].title.style.width = 0;
            //让dom 的opacity 为1
            this.doms[this.index].title.style.opacity = 1;
            // 让浏览器强行渲染
            this.doms[this.index].title.clientHeight;
            //给dom 添加过渡效果
            this.doms[this.index].title.style.transition = "1s .3s"
            //让dom 的width 恢复到原来的宽度
            this.doms[this.index].title.style.width = this.doms[this.index].titleWidth + "px";

            //取消dom desc的过渡效果
            this.doms[this.index].declare.style.transition = "0s";
             //让dom 的width 为0
            this.doms[this.index].declare.style.width = 0;
            //让dom 的opacity 为1
            this.doms[this.index].declare.style.opacity = 1;
            // 让浏览器强行渲染
            this.doms[this.index].declare.clientHeight;
            //给dom 添加过渡效果
            this.doms[this.index].declare.style.transition = "2s 1.3s";
            //让dom 的width 恢复到原来的宽度
            this.doms[this.index].declare.style.width = this.doms[this.index].declareWidth + "px";

        },
        //当home组件完成transition过渡效果的时候 修改switching的值，
        //表示滚动完毕
        handleWheelend(){
            this.switching = false;
        },
        //获取整个组件的高度
        handleResize(){
            this.containerHeight = this.$refs.container.clientHeight;
        },
        // 获取远程数据
        fetchData(){
            return getdata();
        }
    }
}
</script>
<style scoped lang="less">
@import "~@/styles/var.less";
// 设置当前组件
.home-container{
    // 设置当前组件的宽高，占满父级
   width:100%;
   height: 100%;
   //溢出隐藏，主要是为了子组件图片的过渡效果
    overflow: hidden;
    //子元素涉及到绝对定位
   position: relative;
   //重置ul的样式
   ul{
        list-style: none;
        margin: 0;
        padding: 0;
   }
    //轮播图容器    
   .carousel-container{
    //    撑满父容器
       width: 100%;
       height: 100%;
    //    切换图片的时候有过度效果
       transition: .3s;
    //    撑满父容器
       li{
           width: 100%;
           height: 100%;
       }
   }
   .icon{
    //    上下图标
       position: absolute;
       color: darken(@gray,40%);
       left:50%;
       font-size: 30px;
    // 创建一个计算属性 @gap
       @gap:25px;
       cursor: pointer;
    //    创建一个计算属性@jump
       @jump:5px;
       &-up{
           top: @gap;
           animation: icon-up 2s infinite;
       }
       &-down{
           bottom: @gap;
           animation: icon-down 2s infinite;
       }
    //    上边箭头的动画效果
       @keyframes icon-up {
           0%{
               transform: translate(-50%,@jump);
           }
           50%{
               transform: translate(-50%,-@jump);
           }
           100%{
               transform: translate(-50%,@jump);
           }
    //    上边箭头的动画效果
       }@keyframes icon-down {
           0%{
               transform: translate(-50%,-@jump);
           }
           50%{
               transform: translate(-50%,@jump);
           }
           100%{
               transform: translate(-50%,-@jump);
           }
       }
   }
//    右边指示器
   .indicators{
       position: absolute;
       right: 35px;
       top:50%;
       transform: translateY(-50%);
       li{
           width: 8px;
           height: 8px;
           border: 2px solid #fff;
           border-radius: 50%;
           margin: 4px;
           cursor: pointer;
           &.active{
               background: #fff;
           }
       }
   }
}
</style>