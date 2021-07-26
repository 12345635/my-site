<template>
<!-- 关于联系方式的组件 -->
<!--  该组件需要横向撑满容器，背景色透明 -->
    <ul class="contact-container">
        <li>
            <a :href="data.github" :target="data.github ? '_bluk':'_self'">
                <div class="icon">
                    <icon :type="'github'" />
                </div>
                <span>{{data.githubName}}</span>
            </a>
        </li>
        <li>
             <a :href="`tencent:message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`">
                <div class="icon">
                    <icon :type="'qq'" />
                </div>
                <span>{{data.qq}}</span>
            </a>
           
            <div class="pop">
                <img
                    :src="data.qqQrCode"
                    alt=""
                />
            </div>
        </li>
        <li>
             <a >
                <div class="icon">
                    <icon :type="'weixin'" />
                </div>
                <span>{{data.weixin}}</span>
            </a>
           
            <div class="pop">
                <img
                    :src="data.weixinQrCode"
                    alt=""
                />
            </div>
        </li> 
        <li>
             <a :href="`mailto:${data.mail}`">
                <div class="icon">
                    <icon :type="'mail'" />
                </div>
                <span>{{data.mail}}</span>
            </a>
        </li> 
    </ul>
</template>
<script>
import "@/styles/global.less";
import icon from "@/components/icon";
import {mapState} from "vuex"
export default {
    computed:mapState("setting",["data"]),
    components:{
        icon,
    },
    created(){
        this.$store.dispatch("setting/fetchSetting");
    }
}
</script>
<style scoped lang="less">
@import "~@/styles/var.less";
.contact-container {
  list-style: none;
  padding: 20px;
  margin: 0;
  color: @gray;
  @itemHeight: 30px;
  li {
    height: @itemHeight;
    line-height: 30px;
    margin: 14px 0;
    position: relative;
    &:hover{
        .pop{
            transform: scaleY(1);
        }
    }
  }
  a,.contact {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  .icon {
    font-size: 26px;
    width: 36px;
    &.weixin{
        font-size: 32px;
    }
  }
  .pop {
    position: absolute;
    left: 0;
    bottom: @itemHeight + 5px;
    padding: 10px 15px;
    border-radius: 5px;
    background: #fff;
    transform: scaleY(0);
    transform-origin: center bottom; 
    transition: .3s;
    img{
        width: 150px;
        height: 150px;
    }
    &::after{
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      background: #fff;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      bottom: -4px;
    }
  }
}
</style>