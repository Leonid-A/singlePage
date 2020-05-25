import {RequestAPI} from "../RequestAPI/RequestAPI.js";

class UsersController{
    constructor(rootElement,getParams){
        this.pageLastUserId=0;
        //todo-make more proper checks for pageNumbers
        this.pageNumber= Number(getParams ? getParams.page : 1);
        this.rootElement=rootElement;
        this.init();

    }

    init(){
        this.getUsers(this.pageNumber)
        //paginate
    }

    getUsers(currentPage = 1){
        const perPage = 30;
        if (currentPage === 1){
            this.pageLastUserId = 0;
        } else if (currentPage - this.pageNumber === 1){
            this.pageLastUserId++;
        } else {
            this.pageLastUserId = (currentPage-1) * perPage;
        }
        this.pageNumber = currentPage;
        console.log(this.pageNumber,this.pageLastUserId)

        const request = new RequestAPI();
        request.get(`https://api.github.com/users?since=${this.pageLastUserId}&per_page=${perPage}`)
        .then((users) => this.drawUsers(users))
    }

    drawUsers(users){
        
        const usersView = users.reduce((str, item) => {
                this.pageLastUserId = item.id;
                return str += `<div onclick = "getUser('${item.login}', false)" data-user="${item.login}" class="user-item row">
                                    <div class="col s12 m7">
                                        <div class="card">
                                            <div class="card-image">
                                                <img src ="${item.avatar_url}">
                                            </div>
                                            <div class="card-action">
                                                <span class="center-align">${item.login}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

        }, "");

        this.rootElement.innerHTML = usersView;
        this.drawPagination();
    }

    drawPagination(){
        let currentPage = this.pageNumber;
        const breakpoint = currentPage;
        currentPage = currentPage === 1 ? currentPage + 2 : (currentPage === 2 ? currentPage + 1: currentPage)
        console.log(typeof this.pageNumber)
        const pagin = document.createElement("ul");
        pagin.classList = "pagination center-align";
        pagin.innerHTML = ` 
            <li class="waves-effect ${breakpoint < 11 ? 'disabled' : ''}"><a href="#users?page=${currentPage-10}"><i class="material-icons">first_page</i></a></li> 
            <li class="waves-effect ${breakpoint < 6 ? 'disabled' : ''}"><a href="#users?page=${currentPage-5}"><i class="material-icons">chevron_left</i></a></li>
            <li class="waves-effect ${breakpoint === 1 ? 'active' : ''}"><a href="#users?page=${currentPage-2}">${currentPage-2}</a></li>
            <li class="waves-effect ${breakpoint === 2 ? 'active' : ''}"><a href="#users?page=${currentPage-1}">${currentPage-1}</a></li>
            <li class="waves-effect ${breakpoint > 2 ? 'active' : ''}"><a href="#users?page=${currentPage}">${currentPage}</a></li>
            <li class="waves-effect"><a href="#users?page=${currentPage+1}">${currentPage+1}</a></li>
            <li class="waves-effect"><a href="#users?page=${currentPage+2}">${currentPage+2}</a></li>
            <li class="waves-effect"><a href="#users?page=${currentPage+5}"><i class="material-icons">chevron_right</i></a></li>
            <li class="waves-effect"><a href="#users?page=${currentPage+10}"><i class="material-icons">last_page</i></a></li>`
        
        this.rootElement.appendChild(pagin);

    }

}

export {UsersController}