// import "nprogress/nprogress.css";
// import { start, done, configure } from "nprogress";
function delay(duration) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }
function getComponents(pageCompResolver){
    return async () => {
        // start();
        if (process.env.NODE_ENV === "development") {
          await delay(2000);
        }
        const comp = await pageCompResolver();
        // done();
        return comp;
      };
}
export default [
    {
        name:"home",
        path:"/",
        component:getComponents(()=>
        import(/* webpackChunkName: "home" */ "@/views/home")),
        meta:{
            title:"首页"
        }
    },
    {
        name:"about",
        path:"/about",
        component:getComponents(()=>
        import(/* webpackChunkName: "about" */ "@/views/about")),
        meta:{
            title:"关于我"
        }
    },
    {
        name:"blog",
        path:"/article",
        component:getComponents(()=>
        import(/* webpackChunkName: "blog" */ "@/views/blog")),
        meta:{
            title:"文章"
        }
    },
    {
        name:"CategoryBlog",
        path:"/article/cate:categoryId",
        component:getComponents(()=>
        import(/* webpackChunkName: "blog" */ "@/views/blog")),
        meta:{
            title:"文章"
        }
    },
    {
        name:"BlogDateil",
        path:"/article/cate:categoryId/blogdateil/:id",
        component:getComponents(()=>
        import(/* webpackChunkName: "blogdateil" */ "@/views/blog/Dateil")),
        meta:{
            title:"文章详情"
        }
    },
    {
        name:"Message",
        path:"/Message",
        component:getComponents(()=>
        import(/* webpackChunkName: "meseage" */ "@/views/Message")),
        meta:{
            title:"评论"
        }
    },
    {
        name:"Project",
        path:"/project",
        component:getComponents(()=>
        import(/* webpackChunkName: "porject" */ "@/views/Project")),
        meta:{
            title:"项目"
        }
    }
]
