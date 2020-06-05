import { RequestAPI } from "../RequestAPI/RequestAPI.js";

class RepoController{
    constructor(itemName){
        this.itemName = itemName;
        this.repoView = document.getElementById("repos-cont")
        this.init()
    }

    init(){
        this.repoView.innerHTML = "";
        this.getRepo();
    }

    getRepo(){
        const request = new RequestAPI();
        request.get(`https://api.github.com/repos/${this.itemName}`)
            .then((result)=> this.drawRepo(result))
    }

    drawRepo(result){
        const output = `<div id="item-img"><img src ="${result.owner.avatar_url}" id="user-image"></div>
                          <div id="curent-user"><h1>Login: ${result.owner.login}</h1>
                             <h2>Repo Name: ${result.name}</h2>
                             <h3>Watchers: ${result.watchers}</h3>
                             <h3>Description: ${result.description}</h3>
                             </div>`;
                             this.repoView.innerHTML = output ;
    }
}

export {RepoController}