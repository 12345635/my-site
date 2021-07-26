import ins from "./request"

async function getBanner(){
    const reqs = await ins("/api/banner");
    return reqs.data.data;
}

export default getBanner;