import { RequestAPI } from "../RequestAPI/RequestAPI.js";

class UserController{
    constructor(itemName){
        this.itemName = itemName;
        this.itemView = document.getElementById("users-cont");
        this.init()
    }

    init(){
        this.itemView.innerHTML = "";
        this.getUser();
    }

    getUser(){
        const request = new RequestAPI();
        request.get(`https://api.github.com/users/${this.itemName}`)
            .then((result)=> this.drawUser(result) );
    }

    drawUser(result){
            const output = `<div id="item-img"><img src ="${result.avatar_url}" id="user-image"></div>
                          <div id="curent-user"><h1>Name: ${result.name}</h1>
                             <h2>Login: ${result.login}</h2>
                             <h3>Followers: ${result.followers}</h3>
                             <h3>Location: ${result.location}</h3>
                             <a id = "user-blog-url" href="${result.blog}">My Blog</a></div>`;
                             this.itemView.innerHTML= output;
    }
}

export {UserController}