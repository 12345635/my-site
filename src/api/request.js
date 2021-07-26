import axios from "axios"
import {showMessage} from "@/utils"
//生成一个axios实例对象
const ins = axios.create();
//设置一个拦截规则
ins.interceptors.response.use(reqs=>{
    if(reqs.data.code !== 0){
        showMessage({
            content:reqs.data.msg,
            type:"error"
        });
    }
    return reqs;
});
export default ins;
