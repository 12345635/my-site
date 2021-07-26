import style from "./style.module.less"
import url from "@/assets/loading.svg"
// 该函数返回一个img对象
function createLoadingImg(){
    const img = document.createElement("img");
    img.src = url;
    // 给img赋值一个特有的class
    img.className = `${style.loading} loading-img`;
    return img;
}
// 获取传进来的dom 带有loading-img class的img元素
function getLoadingImage(dom){
    return dom.querySelector(".loading-img");
}
// 导出一个方法 用来同时绑定bind 和 update 函数
export default function(el,binding){ 
    // 获取当前dom 下className 为 loading-img 的img元素
    const curImg = getLoadingImage(el);
    // 根据传过来的属性进行下一步判断
   if (binding.value) {
    // 判断一下是否有这个元素
    if (!curImg) {
        // 没有这个元素就需要创建一个img元素
      const img = createLoadingImg();
    //   把元素插入到传过来的dom中去
      el.appendChild(img);
    }
  } else {
    //不需要创建 判断一下是否有这个img元素
    if (curImg) {
        // 如果有就删除这个元素
      curImg.remove();
    }
  }
}