// 处理滚动条的监听事件
/**
 * 
 * @param  refValue 需要监听哪个dom元素的滚动条
 */
export default function(refValue){
    return {
        mounted(){
            this.$bus.$on("mainScrollTop",this.setMainScrollToTop);
            this.$refs[refValue].addEventListener("scroll",this.handleMainScroll);
        },
        beforDestroyed(){
            this.$emit("mainScroll")
            this.$bus.$off("mainScrollTop",this.setMainScrollToTop);
            this.$refs[refValue].removeEventListener("scroll",this.handleMainScroll);
        },
        methods:{
            setMainScrollToTop(scrollTop){
                this.$refs[refValue].scrollTop = scrollTop;
            },
            handleMainScroll(){
                this.$bus.$emit("mainScroll",this.$refs[refValue]);
            }
        }
    }
}