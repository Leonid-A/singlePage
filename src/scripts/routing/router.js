import {Request} from "../RequestAPI/RequestAPI.js";
import { Helper } from "../helper/helper.js";
import { UI } from "../ui/ui.js";
import {UsersController} from "../pages/UsersController.js";


class Router{
    constructor(routes= Helper.isRequired("routes")) {

        if (!!Router.instance) {
            return Router.instance;
        }

        Router.instance = this;

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

    goToRoute(currentRoute, getParams){
        //call controller
        switch(currentRoute.name){

        case "users":
           new UsersController(this.rootElement, getParams);
        
        }

    }

    hashchanged(){
        const {currentHash, getParams} = this.setGetParams();
        console.log(currentHash, getParams)
        const currentRoute = currentHash === "" ?  this.defaultRoute
         : this.routes.find(item => item.name === currentHash) || this.notFoundRoute;

         this.goToRoute(currentRoute, getParams);

    }

    setGetParams(getParamsString){
        let {hash: currentHash} = window.location;
        let paramsString;
        
        currentHash = currentHash.substring(1);
        [currentHash, paramsString] = currentHash.split("?");
        const getParams = paramsString ? paramsString.split("&").reduce((obj,item)=>{
            let key,value;
            [key,value] = item.split("=");
            obj[key] = value;

            return obj;
        },{}): null;

        return {
            currentHash,
            getParams
        }
    }
}

export { Router };
