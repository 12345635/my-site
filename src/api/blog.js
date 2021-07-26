import ins from "./request"
// 获取博客数据
export async function getBlogs(page=1,limit = 10,categoryid = -1){
    const reqs = await ins("/api/blog",{
        categoryid,//所属分类
        limit,//页容量
        page//当前页码
    });
    return reqs.data.data;
}
// 获取博客分类
export async function getBlogType(){
    const reqs = await ins("/api/blogtype");
    return reqs.data.data;
}
// 获取个人博客
export async function getBlog(id){
    return await ins(`/api/blog/${id}`).then((reqs)=>{
        return reqs.data.data;
    });
}
// 提交评论
export async function postComment(commentInfo){
    return await ins.post("/api/comment",commentInfo).then((reqs)=>{
        return reqs.data.data
    });
};
// 获取评论
export async function getComments(blogId,page=1,limit=10){
    return await ins("/api/comment",{
        params:{
            blogId,
            page,
            limit,
        }
    }).then((r)=>{
        return r.data.data;
    });
};

    
    
