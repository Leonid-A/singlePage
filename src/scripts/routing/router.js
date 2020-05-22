import {Request} from "../request/request.js";
import { Helper } from "../helper/helper.js";
import { UI } from "../ui/ui.js";

class Router{
    constructor(routes= Helper.isRequired("routes")) {

        if (!!Router.instance) {
            console.log('already exists', Router.instance);
            return Router.instance;
        }

        Router.instance = this;

        this.routes = routes;
        this.rootElement = document.getElementById("app");
        this.defaultRoute = this.routes.find(item => item.type ==="default")
        this.notFoundRoute = this.routes.find(item => item.type === '404')
        this.init();
        console.log('creating new one', Router.instance)

    }

    init(){
        window.addEventListener("hashchange", () => this.hashchanged())
        this.hashchanged();
    }

    goToRoute(currentRoute){

        const request = new Request();
        const perPage = 100;
        const pages  = 4;
        const since = pages * perPage;

        let page = request.get("https://api.github.com/users?since=0&per_page=30")
        .then((page) =>  {
            // page

            let output = page.reduce((str, item) => {
                console.log(str)
                return str += `<div onclick = "getUser('${item.login}', false)" data-user="${item.login}" class="user-item row">
                                    <div class="col s12 m7">
                                        <div class="card">
                                            <div class="card-image">
                                                <img src ="${item.avatar_url}">
                                            </div>
                                            <div class="card-action">
                                                <a href="#" class="center-align">${item.login}</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                }, '');
        
        
            this.rootElement.innerHTML = output;
        
        
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
