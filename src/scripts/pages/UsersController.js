import { RequestAPI } from "../RequestAPI/RequestAPI.js";
import { Router } from "../routing/router.js";
import {UserController} from "./UserController.js";


class UsersController{
    constructor(rootElement,getParams){
        this.pageLastUserId = 0;
        this.pageNumber= Number(getParams && getParams.page ? getParams.page : 1);
        this.search= getParams && getParams.search ? getParams.search : '';
        this.rootElement=rootElement;
        this.perPage = 30;
        this.getParams = getParams || {};
        this.init();
        this.usersCont=document.getElementById("users-cont");
    }

    init(){
        const usersCont = document.createElement("div");
        usersCont.id = "users-cont";
        this.rootElement.appendChild(usersCont);
        this.getUsers(this.pageNumber);
        this.drawSearch();
    }

    getUsers(currentPage = 1){
        if (currentPage === 1){
            this.pageLastUserId = 0;
        } else if (currentPage - this.pageNumber === 1){
            this.pageLastUserId++;
        } else {
            this.pageLastUserId = (currentPage-1) * this.perPage;
        }
        this.pageNumber = currentPage;
        const requestURL=this.search ? `search/users?q=${this.search}&page=${this.pageNumber}`
                                   : `users?since=${this.pageLastUserId}`;
        const request = new RequestAPI();
        request.get(`https://api.github.com/${requestURL}&per_page=${this.perPage}`)
        .then((result) => {
            if (this.search) {
                this.drawUsers(result.items, result.total_count);
                if ( result.total_count && result.total_count > this.perPage) {
                    this.drawPagination(result.total_count);
                }
            } else {
                this.drawUsers(result);
                this.drawPagination();
            }
        })
    }

    drawUsers(users){
        if(!users.length) {
            this.usersCont.innerHTML = '<h1>there are not users</h1>';
        } else {
            const usersView = users.reduce((str, item) => {
                this.pageLastUserId = item.id;
                return str += `<div data-user="${item.login}" class="user-item row">
                                    <div class="col s12">
                                        <div class="card card-item">
                                            <div class="card-image">
                                                <img src ="${item.avatar_url}">
                                            </div>
                                            <div class="card-action center">
                                                <span>${item.login}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
            }, "");
            this.usersCont.innerHTML = usersView;

            this.addUserListener()
        }
    }

    addUserListener(){
       const userItems = document.getElementsByClassName("user-item");
       for (let i=0; i< userItems.length; i++){
           userItems[i].addEventListener("click", () => {
            this.getParams.user = userItems[i].getAttribute("data-user");
            const getParamsString = Router.stringifyGetParams(this.getParams);
            Router.changeHash(`#user${getParamsString}`);
            },false);
       }
    }

    drawPagination(totalCount){
        const { search } = this;
        let searchURL = "";
        if (search) {
            searchURL = `&search=${search}`
        }

        let currentPage = this.pageNumber;
        const breakpoint = currentPage;
        currentPage = currentPage === 1 ? currentPage + 2 : (currentPage === 2 ? currentPage + 1: currentPage)
        const pagin = document.createElement("ul");
        pagin.classList = "pagination center-align";
        pagin.innerHTML = ` 
            <li class="waves-effect ${breakpoint < 11 ? 'disabled' : ''}"><a title = "-10 pages" href="#users?page=${currentPage-10}${searchURL}"><i class="material-icons">first_page</i></a></li> 
            <li class="waves-effect ${breakpoint < 6 ? 'disabled' : ''}"><a title = "-5 pages" href="#users?page=${currentPage-5}${searchURL}"><i class="material-icons">chevron_left</i></a></li>
            <li class="waves-effect ${breakpoint === 1 ? 'active' : ''}"><a href="#users?page=${currentPage-2}${searchURL}">${currentPage-2}</a></li>
            <li class="waves-effect ${breakpoint === 2 ? 'active' : ''}"><a href="#users?page=${currentPage-1}${searchURL}">${currentPage-1}</a></li>
            <li class="waves-effect ${breakpoint > 2 ? 'active' : ''}"><a href="#users?page=${currentPage}${searchURL}">${currentPage}</a></li>
            <li class="waves-effect"><a href="#users?page=${currentPage+1}${searchURL}">${currentPage+1}</a></li>
            <li class="waves-effect"><a href="#users?page=${currentPage+2}${searchURL}">${currentPage+2}</a></li>
            <li class="waves-effect"><a title = "+5 pages" href="#users?page=${currentPage+5}${searchURL}"><i class="material-icons">chevron_right</i></a></li>
            <li class="waves-effect"><a title = "+10 pages" href="#users?page=${currentPage+10}${searchURL}"><i class="material-icons">last_page</i></a></li>`
        this.rootElement.appendChild(pagin);
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
        const usersSearchInput = document.getElementById("search");
        usersSearchInput.addEventListener("keypress", (event) => {
            if(event.key === "Enter"){
                this.getParams.search = usersSearchInput.value;
                this.getParams.page = 1;
                const getParamsString = Router.stringifyGetParams(this.getParams);
                Router.changeHash(`#users${getParamsString}`);
            }
        })
    }
}

export {UsersController}