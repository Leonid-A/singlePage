import { RequestAPI } from "../RequestAPI/RequestAPI.js";
import { Router } from "../routing/router.js";
import {RepoController} from "./RepoController.js"

class ReposController{
    constructor(rootElement,getParams){
        this.pageLastRepoId = 0;
        this.rootElement = rootElement;
        this.pageNumber= Number(getParams && getParams.page ? getParams.page : 1);
        this.getParams = getParams || {};
        this.search= getParams && getParams.search ? getParams.search : '';
        this.perPage=30;
        this.init()
        this.reposCont=document.getElementById("repos-cont");
        this.canGetRepos = true;
    }

    init(){
        const reposCont = document.createElement("div");
        reposCont.id = "repos-cont";
        this.rootElement.appendChild(reposCont);
        this.getRepos();
        this.drawSearch();
        window.onscroll = (ev) => {
            if(this.canGetRepos && document.body.clientHeight - document.documentElement.scrollTop - window.innerHeight < 50){
                this.canGetRepos = false;
                this.pageNumber++;
                this.getRepos(this.pageNumber);
            }
        }
    }

    getRepos(currentPage=1){
        const requestURL = this.search ? `search/repositories?q=${this.search}&page=${this.pageNumber}`
                                   : `repositories?since=${this.pageLastRepoId}`;
        const request = new RequestAPI();
        request.get(`https://api.github.com/${requestURL}&per_page=${this.perPage}`)
            .then((result)=>{
                if (this.search) {
                    this.drawRepos(result.items);
                } else {
                    this.drawRepos(result);
                }
            } );
    }

    drawRepos(repos){
        if(!repos.length) {
            this.reposCont.innerHTML = '<h1>there are not repos</h1>';
        } else {
            const reposView = repos.reduce((str, item) => {
                this.pageLastRepoId = item.id;
                return str+= `<div data-user="${item.full_name}" class="repo-item row">
                <div class="col s12">
                    <div class="card card-item">
                        <div class="card-image">
                            <img src ="${item.owner.avatar_url}">
                        </div>
                        <div class="card-action center">
                            <span>${item.name}</span><br>
                            <a class="repos-url" href="#${item.url}">URL</a>
                        </div>
                    </div>
                </div>
            </div>`
            },"")
            
            this.reposCont.insertAdjacentHTML( 'beforeend', reposView )
            this.canGetRepos = true;
            this.addRepoListener();

        }
    }

    addRepoListener(){
        const repoItems = document.getElementsByClassName("repo-item");
 
        for (let i=0; i< repoItems.length; i++){
            repoItems[i].addEventListener("click", () => {
                this.getParams.repo = repoItems[i].getAttribute("data-user");
                const getParamsString = Router.stringifyGetParams(this.getParams);
                Router.changeHash(`#repo${getParamsString}`);
            },false);
        }
     }

    drawSearch(){
        const searchDiv = document.createElement("nav");
        searchDiv.classList = "row indigo darken-3";
        searchDiv.innerHTML = `<div class="nav-wrapper col s3">
                <div class="input-field">
                    <input id="search" type="search" required value="${this.search}">
                    <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                    <i class="material-icons">close</i>
                </div>
            </div>`      
        
        this.rootElement.prepend(searchDiv);

        const reposSearchInput = document.getElementById("search");

        reposSearchInput.addEventListener("keypress", (event) => {
            if(event.key === "Enter"){
                this.getParams.search = reposSearchInput.value;
                this.getParams.page = 1;
                const getParamsString = Router.stringifyGetParams(this.getParams);
                Router.changeHash(`#repos${getParamsString}`);
            }
        })
    }

}

export {ReposController}