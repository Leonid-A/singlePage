import { Helper } from "../helper/helper.js";
import { UI } from "../ui/ui.js";
import {UsersController} from "../pages/UsersController.js";
import {ReposController} from "../pages/ReposController.js";
import {RepoController} from "../pages/RepoController.js";
import {UserController} from "../pages/UserController.js";
import HomeController from "../pages/HomeController.js";
import {NotFoundController} from "../pages/NotFoundController.js";
import {AboutController} from "../pages/AboutController.js";


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
            switch(currentRoute && currentRoute.name){
                case "users":
                    new UsersController(this.rootElement, getParams);
                    break;
                case "user":
                    new UserController(this.rootElement, getParams);
                    break;
                case "repos":
                    new ReposController(this.rootElement, getParams);
                    break;
                case "repo":
                    new RepoController(this.rootElement, getParams);
                    break;
                case "home":
                    new HomeController(this.rootElement);
                    break;
                case "about":
                    new AboutController(this.rootElement);
                    break;
                default:
                    new NotFoundController(this.rootElement)
            }
    }

    hashchanged(){
        const {currentHash, getParams} = this.setGetParams();
        const currentRoute = currentHash === "" ?  this.defaultRoute
        : this.routes.find(item => item.name === currentHash) || this.notFoundRoute;

        this.rootElement.innerHTML = ''; 
        this.goToRoute(currentRoute, getParams);
        UI.changeMenuActiveItem(currentRoute && currentRoute.name)
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
