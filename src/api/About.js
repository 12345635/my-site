import request from "./request"
export default async ()=>{
    const resp = await request.get("/api/about");
    return resp.data.data;
}