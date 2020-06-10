export class NotFoundController{
    constructor(rootElement){
        this.rootElement = rootElement;
        this.init();
    }
    init(){
        this.rootElement.innerHTML = `<div class="center">
                                       <p> Page Not Found<p>
                                       <a href="#home" class="btn waves-effect waves-light">GO TO HOME
                                            <i class="material-icons right">send</i>
                                       </button>
                                       </div>`
    }
}