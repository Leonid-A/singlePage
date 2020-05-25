class UI {
    constructor(){
        this.pageBody = document.getElementById("pageBody");
        this.rootElement = document.getElementById("app");
        this.header();
        this.footer();
    }

    header(){
      const nav =document.createElement("nav");
      nav.classList="deep-purple lighten-2"
      //create from router object
      nav.innerHTML = `
        <div class="nav-wrapper">
            <ul class="left hide-on-med-and-down">
                <li id = "#home" class="active"><a href="#home" >Home</a></li>
                <li id = "#users"><a href="#users">Users</a></li>
                <li id = "#repos"><a href="#repos">Repos</a></li>
                <li id = "#about"><a href="#about">About</a></li>
                <li id = "#contacts"><a href="#contacts">Contacts</a></li>
            </ul>
        </div>`
           // <div class="nav-wrapper">
        //     <form>
        //         <div class="input-field">
        //             <input id="search" type="search" required>
        //             <label class="label-icon" for="search"><i class="material-icons">search</i></label>
        //             <i class="material-icons">close</i>
        //         </div>
        //     </form>
        // </div>`
      
        this.pageBody.insertBefore(nav, this.rootElement)
    }

    footer(){
        const footer = document.createElement("footer");
        footer.classList = "page-footer deep-purple lighten-2";
        footer.id= "footer";
        footer.innerHTML = `
            <div class="footer-copyright">
                <div class="container center-align"> © 2020 Copyright Text
                </div>
             </div>`
        
    this.pageBody.appendChild(footer);
    }
}



export { UI };