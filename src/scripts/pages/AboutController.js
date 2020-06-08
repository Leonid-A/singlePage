import { RequestAPI } from "../RequestAPI/RequestAPI.js";


export class AboutController{
    constructor(rootElement){
        this.rootElement = rootElement;
        this.init();
    }

    init(){
        console.log("asdsaj")
        this.getMe();
    }


    getMe(){
        const request = new RequestAPI();
        request.get(`https://api.github.com/users/Leonid-A`)
            .then((result)=> this.drawUser(result) );
    }

    drawUser(result){
        const output =` <div class="col s12 m7">
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
        this.rootElement.innerHTML= output;
    }
}