import request from "./request"
export default async ()=>{ return await (await request.get("/api/project")).data.data};