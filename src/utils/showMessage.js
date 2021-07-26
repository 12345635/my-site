import styles from "./showMessage.module.less"
import getComponentRootDom from "./getComponteRootDom.js"
import icon from "@/components/icon"
/**
 * 弹出消息
 * @param {String} content 消息内容
 * @param {String} type 消息类型  info  error  success  warn
 * @param {Number} duration 多久后消失
 * @param {HTMLElement} container 容器，消息会显示到该容器的正中；如果不传，则显示到页面正中
 */
export default function(options){
    const content = options.content || "";
    const type = options.type || "info";
    const duration = options.duration || 2000;
    const container = options.container || document.body;
    //创建元素
    const div = document.createElement("div");
    const iconDom = getComponentRootDom(icon,{
        type
    });
    
    div.innerHTML = `<span class=${styles.icon}>${iconDom.outerHTML}</span><div>${content}</div>`;
    //设置样式
    const typeClass = styles[`message-${type}`];
    div.className = `${styles.message} ${typeClass}`;
    //将div加入到容器中
    container.append(div);
    if(options.container){
        if(getComputedStyle(container).position === "static"){
            container.style.position = "relative";
        }
    }
    
    //浏览器强行渲染,读取这个元素的位置或者尺寸
    div.clientHeight;
    //回归到正常位置
    div.style.opacity = 1;
    div.style.transform = `translate(-50%,-50%)`;
    //等一段事件消失
    setTimeout(function(){
        div.style.opacity = 0;
        div.style.transform = `translate(-50%,-50%) translateY(-25px)`;
        div.addEventListener("transitionend",function(){
            div.remove();
            options.callback && options.callback();
        },{once:true})
    },duration)
}

