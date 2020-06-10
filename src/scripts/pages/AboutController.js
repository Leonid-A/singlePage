import { RequestAPI } from "../RequestAPI/RequestAPI.js";


export class AboutController{
    constructor(rootElement){
        this.rootElement = rootElement;
        this.init();
    }

    init(){
        this.getMyRepos();
    }

    getMyRepos(){
        const request = new RequestAPI();
        request.get(`https://api.github.com/users/Leonid-A/repos`)
            .then((result) => this.drawRepos(result));
    }

    drawRepos(result){
        let output=`<div class = "container">
                    <div class="col s12">
                        <div class="card horizontal">
                            <div class="card-image">
                                <img src="${result[1].owner.avatar_url}">
                            </div>
                            <div class="card-stacked">
                                <div class="card-content item-descr">
                                    <h5>Name: Leonid Arzumanyan</h5>
                                    <h6> My Repositories</h6>`

        for(let i=0; i<result.length;i++){
            output+= `<p> ${i+1}. <a href="${result[i].html_url}" target="_blank"> ${result[i].name} </a></p>`
        }
        output+=`</div></div></div></div></div>`
        this.rootElement.innerHTML= output;
    }
}