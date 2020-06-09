import { RequestAPI } from "../RequestAPI/RequestAPI.js";

class UserController{
    constructor(rootElement, getParams){
        this.user = getParams && getParams.user ? getParams.user : '';
        this.userView = rootElement;
        this.init()
    }

    init(){
        this.getUser();
    }

    getUser(){
        const request = new RequestAPI();
        request.get(`https://api.github.com/users/${this.user}`)
            .then((result)=> this.drawUser(result) );
    }

    drawUser(result){
        const output =` <div class="col s12">
                            <div class="card horizontal">
                                <div class="card-image">
                                    <img src="${result.avatar_url}">
                                </div>
                                <div class="card-stacked">
                                    <div class="card-content item-descr">
                                        <h5>Name: ${result.name}</h5>
                                        <h6>Login: ${result.login}</h6>
                                        <h6>Followers: ${result.followers}</h6>
                                        <h6>Location: ${result.location}</h6>
                                    </div>
                                    <div class="card-action">
                                        <a href="${result.blog}">My Blog</a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        this.userView.innerHTML= output;
    }
}

export {UserController}