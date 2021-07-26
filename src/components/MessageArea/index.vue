<template>
    <div class="MessageArea-container">
        <FormData v-on="$listeners"/>
        <h3 class="subTitle">
            {{ title }}
            <span>
                {{ subTitle }}
            </span>
            
        </h3>
        <DataList :rows="list" />
        <div class="loading" v-loading="isListLoading"></div>
    </div>
</template>
<script>
import FormData from "./FormData"
import DataList from "./DataList"
export default {
    props:{
        list:{
            type:Array,
            default:()=>[],
        },
        title:{
            type:String,
            default:"",
        },
        subTitle:{
            type:String,
            default:"",
        },
        isListLoading:{
            type:Boolean,
            default:false
        }
    },
    components:{
        FormData,
        DataList
    }
}
</script>
<style lang="less" scoped>
.MessageArea-container{
    padding-top: 20px;
}
.loading{
    position: relative;
    height: 100px;
}
</style>