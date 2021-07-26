<template>
<!-- 
    绑定鼠标移入事件
    @mousemove
    绑定鼠标移出事件
    @mouseleave
 -->
<div class="carousel-container" 
ref="container"
@mousemove="handleMouseMove"
@mouseleave="handleMouseLeave"
>
<!-- 
    根据计算属性来改变元素的margin-top值，达到改变元素位置
 -->
    <div class="image" ref="img"
    :style="imagePosition"
    >
    <!-- 
        使用image组件
            绑定中图地址    placeholder
            绑定大图地址    src
        绑定子组件传出来的load事件  加载完成之后进行文字的过渡
     -->
        <imageLoader
        :src="banner.bigImg"
        :placeholder="banner.midImg"
        @load="switchWidth"
        />
    </div>
    <!-- 根据传入进来的对象banner的title属性渲染标题（title）-->
      <div class="title" ref="title">{{banner.title}}</div>
    <!-- 根据传入进来的对象banner的description属性渲染说明（declare）-->
      <div class="declare" ref="declare">{{banner.description}}</div>
</div>
</template>
<script>
import imageLoader from "@/components/imageLoader"
export default{
    props:["banner"],//这个组件只在这个里面使用，所以可以模糊传入
    components:{
       imageLoader,
    },
    data(){
        return {
            titleWidth:0,//title元素最初的宽度
            declareWidth:0,//declare元素最初的宽度
            containerSize:null,//最外层容器尺寸
            innerSize:null,//里层容器尺寸
            mouseX:0,//鼠标的横坐标
            mouseY:0,//鼠标的纵坐标
            options:null,//用来存DOM元素
        }
    },
    computed:{
        imagePosition(){
            // 如果innerSize 或者 container 为null直接返回
            if(!this.innerSize || !this.containerSize){
                return;
            };
            //计算多出来的总体宽度
            const extraWidth = this.innerSize.width - this.containerSize.width;
            //计算多出来的总体高度
            const extraHeight = this.innerSize.height - this.containerSize.height;
            /** 计算鼠标应该多出来的距离
                1.负的多出来的总体距离 / 容器距离 = 鼠标可移动的距离的百分比
                2.鼠标可移动的百分比 * 鼠标相对的坐标 = 多出来的距离
                说明：
                    为什么是负数？
                    移动方式：
                        因为这里使用的transform：translate来改变元素位置
                    移动方向：
                        translate是相对于元素左边和上边开始计算
            */
            const left = (-extraWidth / this.containerSize.width) * this.mouseX;
            const top = (-extraHeight / this.containerSize.height) * this.mouseY;
            return {
                transform:`translate(${left}px,${top}px`
            }
        },
        // 中心坐标
        center(){
            return {
                // X：为容器宽度的一半
                x:this.containerSize.width / 2,
                // Y：为容器高度的一半
                y:this.containerSize.height / 2,
            }; 
        },
    },
    // 在元素挂载之前需要做的事情
    mounted(){
        // 获取到NVode里面title的宽度，并且给数据里面的titleWidth（title）原始宽度赋值
        this.titleWidth = this.$refs.title.clientWidth;
        // 获取到NVode里面declare的宽度，并且给数据里面的declareWidth（declare）原始宽度赋值
        this.declareWidth = this.$refs.declare.clientWidth;
        // 挂载运行获取容器和图片容器的尺寸
        this.setSize();
        // 鼠标移动到容器X中心坐标  达到图片到真实DOM树渲染出来的时候居中
        this.mouseX = this.center.x;
        // 鼠标移动到容器Y中心坐标  达到图片到真实DOM树渲染出来的时候居中
        this.mouseY = this.center.y;
        // 在挂载之前运行以下父组件传递的方法和参数
        this.handleWidth();
        // 挂载之前给window添加resize（窗口尺寸改动）事件
        // 改动时从新运行获取容器与图片容器的尺寸的方法
        window.addEventListener("resize",this.setSize);
    },
    destroyed(){
        // 组件销毁的时候 移除掉window身上注册的reseze事件，
        // 移除改动时从新运行获取容器与图片容器的尺寸的方法
        window.removeEventListener("resize",this.setSize);
    },
    methods:{
        switchWidth(){
            // 设置title的宽度 width = 0
            this.$refs.title.style.width = 0;
            // 设置title的透明度    opacity = 1
            this.$refs.title.style.opacity = 1;
            //让浏览器强行渲染
            this.$refs.title.clientHeight;
            // 让title具有过渡效果
            this.$refs.title.style.transition = "1s"
            // 设置title的宽度为原有的宽度
            this.$refs.title.style.width = this.titleWidth + "px";

            // 设置declare的宽度 width = 0
            this.$refs.declare.style.width = 0;
            // 设置declare的透明度    opacity = 1
            this.$refs.declare.style.opacity = 1;
            //让浏览器强行渲染
            this.$refs.declare.clientHeight;
            // 让declare具有过渡效果 并且延迟到title动画结束之后执行
            this.$refs.declare.style.transition = "2s 1s"
            // 设置declare的宽度为原有的宽度
            this.$refs.declare.style.width = this.declareWidth + "px";
        },
        // 当说明文字过渡效果完成之后，向父组件传递参数 和暴露方法
        handleWidth(){
            this.options = {
                // 传递title dom
                title:this.$refs.title,
                // 传递declare dom
                declare:this.$refs.declare,
                // 传递title元素原有的宽度
                titleWidth:this.titleWidth,
                // 传递declare元素原有的宽度
                declareWidth:this.declareWidth
            };
            // 给父元素暴露一个方法 并且传递属性
            this.$emit("tansition",this.options);
        },
        // 设置参数
        setSize(){
            // 设置参数containerSize的属性
            this.containerSize = {
                width:this.$refs.container.clientWidth,
                height:this.$refs.container.clientHeight,
            }
            // 设置参数innerSize 的属性
            this.innerSize = {
                width:this.$refs.img.clientWidth,
                height:this.$refs.img.clientHeight
            }
        },
        // 当鼠标移入到组件里面的时候触发
        handleMouseMove(e){
            //使用getBoundingClientRect() 获得元素container的矩形参数
            const rect = this.$refs.container.getBoundingClientRect();
            // 鼠标相对于在元素横坐标
            this.mouseX = e.clientX - rect.left;
            // 鼠标相对于在元素纵坐标
            this.mouseY = e.clientY - rect.top;
        },
        handleMouseLeave(e){
            // 将鼠标放置到元素中心坐标
            this.mouseX = this.center.x;
            this.mouseY = this.center.y;
        }
    }
}
</script>
<style scoped lang="less">
.carousel-container{
    // 设置外层元素宽高 撑满父容器
    width: 100%;
    height: 100%;
    position: relative;
    // image放大之后的溢出不显示
    overflow: hidden;
    .image{
        // 将image放大
        width: 110%;
        height: 110%;
        position: absolute;
        // 图片添加过渡效果
        transition: .3s;
    }
    .title,
    .declare{
        position: absolute;
        top:50%;
        left: 35px;
        color: #fff;
        // 给图片加上1px的阴影 避免在文字颜色在同颜色背景下不显示或者看不见
        text-shadow: 1px 0 1px rgba(0, 0, 0, .5),
                      -1px 0 1px rgba(0, 0, 0, .5),
                      0 1px 1px rgba(0, 0, 0, .5),
                      0 -1px 1px rgba(0, 0, 0, .5);
        // 最初的时候透明度为0
        opacity: 0;
        // 设置width为0的时候 让文字不换行
        white-space: nowrap;
        // 宽度width为0的时候，文字是溢出状态，让文字看不见 溢出不显示
        overflow: hidden;
    }
    .title{
        // 标题向上一点
        transform: translateY(-30px);
        font-size: 2rem;
    }
    .declare{
        // 说明向下一点
        transform: translateY(30px);
        font-size: 1.2rem;
    }
}
</style>
