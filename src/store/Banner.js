import  getBanner  from "@/api/banner"
export default {
    namespaced: true,
    state:{
        loading:false,
        data:[],
    },
    mutations:{
        setLoading(state,play){
            state.loading = play;
        },
        setData(state,play){
            state.data = play;
        },
    },
    actions:{
        async fetchBanner(ctx){
            ctx.commit("setLoading",true);
            if(ctx.state.data.length){
                ctx.commit("setLoading",false);
                return;
            }
            const resp = await getBanner();
            ctx.commit("setData",resp);
            ctx.commit("setLoading",false);
        }
    }
}