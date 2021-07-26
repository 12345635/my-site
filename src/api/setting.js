import request from "./request"
export default async ()=>{
    const resp = await request.get("/api/setting");
    return resp.data.data;
}