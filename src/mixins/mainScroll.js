// 处理滚动条的监听事件
/**
 * 
 * @param  refValue 需要监听哪个dom元素的滚动条
 */
export default function(refValue){
    return {
        // 元素挂载之前添加一个监听函数
        mounted(){
            this.$bus.$on("mainScrollTop",this.setMainScrollToTop);
            this.$refs[refValue].addEventListener("scroll",this.handleMainScroll);
        },
        // 组件销毁之前，销毁掉监听函数
        beforeDestroy(){
            this.$emit("mainScroll")
            this.$bus.$off("mainScrollTop",this.setMainScrollToTop);
            this.$refs[refValue].removeEventListener("scroll",this.handleMainScroll);
        },
        methods:{
            // 将元素的scrolltop滚动到传进来的scrolltop
            setMainScrollToTop(scrollTop){
                this.$refs[refValue].scrollTop = scrollTop;
            },
            // 注册一个全局函数
            handleMainScroll(){
                this.$bus.$emit("mainScroll",this.$refs[refValue]);
            }
        }
    }
}