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
        const currentRoute = currentHash === "" ?  this.defaultRoute
         : this.routes.find(item => item.name === currentHash) || this.notFoundRoute;

        this.rootElement.innerHTML = ''; 
        this.goToRoute(currentRoute, getParams);
        UI.changeMenuActiveItem(currentRoute.name)
    }

    static changeHash(url) {
        window.location.hash = url;
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

    static stringifyGetParams(params){
        let str="?";
        for (let i in params){
            if (params.hasOwnProperty(i)) {
                str += i + "=" + params[i] + "&";
              }
        }
        return str = str.substring(0, str.length - 1);
        
    }
}

export { Router };
