let routeTitle = '';
let sitTitle = '';

function setTitle(){
    if(!routeTitle && !sitTitle){
        document.title = "loading...";
    }else if(routeTitle && !sitTitle){
        document.title = routeTitle;
    }else if(!routeTitle && sitTitle){
        document.title = sitTitle;
    }else{
        document.title = `${routeTitle} - ${sitTitle}`
    }
}
export default {
    setRouteTitle(title){
        routeTitle = title,
        setTitle();
    },
    setSiteTitle(title){
        sitTitle = title;
        setTitle();
    },
}