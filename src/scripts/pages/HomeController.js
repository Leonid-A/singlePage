export default class HomeController{
    constructor(rootElement){
        this.rootElement = rootElement;
        this.init()
    }

    init(){
        this.rootElement.innerHTML = "<div>This is home page</div>"
    }




}