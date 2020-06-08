export class ContactsController{
    constructor(rootElement){
        this.rootElement = rootElement;
        this.init();
    }
    init(){
        this.rootElement.innerHTML = "<div>Contacts</div>"
    }
}