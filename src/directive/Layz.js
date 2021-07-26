import eventBus from "@/eventBus"
import {debounce} from "@/utils"
import defaultGif from "@/assets/default.gif"
let imgs = [];
function setimage(img){
    img.dom.src = defaultGif;
    const rect = img.dom.getBoundingClientRect();
    const height = rect.height || 150;
    const top = rect.top;
    const clientHeight = document.documentElement.clientHeight;
    if(top >= -height && top<= clientHeight){
        img.dom.src = img.src;
        imgs = imgs.filter((i)=>i !== img);
    }
}
function setimages(){
    for (const img of imgs) {
        setimage(img);
    }
}
function handleScroll(){
    setimages();
}
eventBus.$on("mainScroll",debounce(handleScroll));
export default {
    inserted(el,bindings){
        const img = {
            dom : el,
            src : bindings.value
        }
        imgs.push(img);
        setimage(img);
    },
    unbind(el){
        imgs = imgs.filter(()=>imgs.dom !== el);
    }
}