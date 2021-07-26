<template>
    <form id="data-form-container" 
    @submit.prevent="handleSubmit"
    ref="form"
    >
        <div class="form-item">
            <div class="input-area">
                <input
                type="text"
                maxlength="10"
                v-model="formData.nickname"
                placeholder="用户昵称"
                >
                <span class="tip">{{ formData.nickname.length }}/10</span>
            </div>
            <div class="error">{{error.nickname}}</div>
        </div>
        <div class="form-item">
            <div class="textarea">
                <textarea
                maxlength="300"
                placeholder="输入内容"
                v-model="formData.content"
                ></textarea>
                <span class="tip">{{formData.content.length}}/300</span>
            </div>
            <div class="error">{{error.content}}</div>
        </div>
        <div class="form-item">
            <div class="button-area">
                <button :disabled="isSubimting">
                    {{ !isSubimting?"提交":"提交中。。。" }}
                </button>
            </div>
        </div>
    </form>
</template>
<script>
export default {
    data(){
        return {
            formData:{
                nickname:"",
                content:"",
            },
            error:{
                nickname:"",
                content:""
            },
            isSubimting:false,
        }
    },
    methods:{
        handleSubmit(){
            this.error.nickname = this.formData.nickname ? "" : "请填写昵称";
            this.error.content = this.formData.content ? "" : "请填写内容";
            if(!this.error.nickname||!this.error.content){
                this.isSubimting = true;
                this.$emit("submit",this.formData,(resp)=>{
                    this.$showMessage({
                        content:resp,
                        dration:1000,
                        container:this.$refs.form,
                        type:"success",
                        callback:()=>{
                            this.formData.nickname = "",
                            this.formData.content = "",
                            this.isSubimting = false;
                        }
                    })
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import "~@/styles/var.less";
.data-form-container{
    margin-bottom: 20px;
    overflow: hidden;
}
.form-item{
    margin-bottom:8px;
}
.input-area{
    width: 50%;
    position: relative;
}
.textarea{
    position: relative;
}
.tip{
    position: absolute;
    right: 5px;
    bottom: 5px;
    color: #b4b8bc;
    font-size: 12px;
}
input,
textarea{
    display: block;
    width: 100%;
    box-sizing: border-box;
    border: 1px dashed @gray;
    outline: none;
    color: @words;
    font-size: 14px;
    border-radius: 4px;
    &:focus{
        border-color: @primary;
    }
}
input{
    padding: 0 15px;
    height: 40px;
}
textarea{
    resize: none;
    padding: 8px 15px;
    height: 120px;
}
.error{
    margin-top: 6px;
    color: @danger;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
}
button{
    position: relative;
    cursor: pointer;
    border:none;
    outline: none;
    width:100px;
    height: 34px;
    border-radius: 4px;
    background: @primary;
    &:hover{
        background: darken(@primary,10%);
    }
    &:disabled{
        background: lighten(@primary,20%);
        cursor: not-allowed;
    }
}
</style>