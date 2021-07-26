import Mock from "mockjs"
Mock.mock("/api/about","get",{
    code:0,
    msg:"about数据没有拿到",
    data:"http://www.baidu.com"
})