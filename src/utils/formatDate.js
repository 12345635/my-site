export default function(time,showTime = false){
    if(!time){
        return
    }
    const date = new Date(+time);
    let newDate = date.toJSON().split(".");
    if(showTime){
        return newDate[0].split("T").join(" ");
    }else{
        return date.toJSON().split("T")[0];
    }
}