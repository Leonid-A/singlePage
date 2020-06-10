import { RequestAPI } from "../RequestAPI/RequestAPI.js";

class RepoController{
    constructor(rootElement, getParams){
        this.repo = getParams && getParams.repo ? getParams.repo : '';
        this.repoView = rootElement;
        this.init()
    }

    init(){
        this.getRepo();
    }

    getRepo(){
        const request = new RequestAPI();
        request.get(`https://api.github.com/repos/${this.repo}`)
            .then((result)=> this.drawRepo(result))
    }

    drawRepo(result){
        const output =` <div class="container">
                            <div class="col s12">
                                <div class="card horizontal">
                                    <div class="card-image">
                                        <img src="${result.owner.avatar_url}">
                                    </div>
                                    <div class="card-stacked">
                                        <div class="card-content item-descr">
                                            <h5>Login: ${result.owner.login}</h5>
                                            <h6>Repo Name: ${result.name}</h6>
                                            <h6>Watchers: ${result.watchers}</h6>
                                            <h6>Description: ${result.description}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        this.repoView.innerHTML = output ;
    }
}

export {RepoController}