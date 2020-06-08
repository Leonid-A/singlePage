export class NotFoundController{
    constructor(rootElement){
        this.rootElement = rootElement;
        this.init();
    }
    init(){
        this.rootElement.innerHTML = `<div>
                                       <p> Page Not Found<p>
                                       <a href="#home">GO TO HOME</a>
                                       </div>`
    }
}