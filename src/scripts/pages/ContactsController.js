export class ContactsController{
    constructor(rootElement){
        this.rootElement = rootElement;
        this.init();
    }
    init(){
        this.rootElement.innerHTML = `  <div>
                                            <h2>Contacts</h2>
                                            <p> Email: leonidarzumanyan9@gmail.com</p>
                                            <p> Tel: +374 5553 5554
                                        </div>`
    }
}