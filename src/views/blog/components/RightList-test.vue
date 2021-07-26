<template>
    <div class="test-container">
        <RightList :list="data" @select="handleSelect"/>
    </div>
</template>
<script>
import  RightList  from './RightList'
import fetchData from "@/mixins/fetchData"
import * as blogApi from "@/api/blog"
import "@/mock"
export default {
    mixins:[fetchData([])],
    components:{
        RightList,
    },
    data() {
        return {
            list: [],
        };
    },
  methods:{
      fetchData(){
          return blogApi.getBlogtype();
      },
      handleSelect(item){
          console.log(item)
      }
  }
}
</script>
<style scoped lang="less">
@import "~@/styles/minix.less";
.test-container{
    .self-center();
}
</style>
