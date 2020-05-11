import { Helper } from "../helper/helper.js";

class Router{
    constructor(routes= Helper.isRequired("routes")) {
        this.routes = routes;
        this.rootElement = document.getElementById("app");
        this.defaultRoute = this.routes.find(item => item.type ==="default")
        this.notFoundRoute = this.routes.find(item => item.type === '404')
        this.init();
    }

    init(){
        window.addEventListener("hashchange", () => this.hashchanged())
        this.hashchanged();
    }

    goToRoute(currentRoute){
        // todo - move to request-api
        fetch(`views/${currentRoute.htmlName}.html`)
        .then ((res)=> res.text())
        .then((page)=>{
            this.rootElement.innerHTML = page;
        });
    }

    hashchanged(){
        let {hash: currentHash} = window.location;
        currentHash = currentHash.substring(1);
        const currentRoute = currentHash === "" ?  this.defaultRoute
         : this.routes.find(item => item.name === currentHash) || this.notFoundRoute;

        this.goToRoute(currentRoute);
    }
}

export { Router };
