class UI {
    constructor(){
        this.pageBody = document.getElementById("pageBody");
        this.rootElement = document.getElementById("app");
        this.header();
        this.footer();
        this.paginat();

    }

    header(){
      const nav =document.createElement("nav");
      nav.classList="deep-purple lighten-2"
      //create from router object
      nav.innerHTML = `
        <div class="nav-wrapper">
            <form>
                <div class="input-field">
                    <input id="search" type="search" required>
                    <label class="label-icon" for="search"><i class="material-icons">search</i></label>
                    <i class="material-icons">close</i>
                </div>
            </form>
        </div>`
    
        // <div class="nav-wrapper">
        //     <ul class="left hide-on-med-and-down">
        //         <li id = "#home" class="active"><a href="#home" >Home</a></li>
        //         <li id = "#about"><a href="#about">About</a></li>
        //         <li id = "#users"><a href="#users">Users</a></li>
        //     </ul>
        // </div>`
      
        this.pageBody.insertBefore(nav, this.rootElement)
    }

    paginat(){
        const pagin = document.createElement("ul");
        pagin.classList = "pagination center-align";
        pagin.innerHTML = `  
        <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
        <li class="active"><a href="#!">1</a></li>
        <li class="waves-effect"><a href="#!">2</a></li>
        <li class="waves-effect"><a href="#!">3</a></li>
        <li class="waves-effect"><a href="#!">4</a></li>
        <li class="waves-effect"><a href="#!">5</a></li>
        <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>`
        
        this.pageBody.insertBefore(pagin, document.getElementById("footer"))

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