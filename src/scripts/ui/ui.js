class UI {
    constructor(navParams){
        this.pageBody = document.getElementById("pageBody");
        this.rootElement = document.getElementById("app");
        this.navMenuParams = navParams;
        this.header();
        this.footer();

    }

    header(){
        const nav =document.createElement("nav");
        nav.classList="indigo darken-4";
        let output = `<div class="nav-wrapper">
                      <ul class="left hide-on-med-and-down">`
        let navMenu = this.navMenuParams.reduce((str,item) => {
            return str+= `<li id = "#${item}" class = "menuItem"><a href="#${item}" >${item[0].toUpperCase() + item.substr(1)}</a></li>`
        }, output)
        navMenu += `</ul> </div>`
        nav.innerHTML = navMenu;
        this.pageBody.prepend(nav);

    }

    footer(){
        const footer = document.createElement("footer");
        footer.classList = "page-footer indigo darken-4";
        footer.id= "footer";
        footer.innerHTML = `
            <div class="footer-copyright">
                <div class="container center-align"> © 2020 Copyright Text
                </div>
             </div>`
        
    this.pageBody.append(footer);
    }

    static changeMenuActiveItem(activePageName){
       let arr = document.getElementsByClassName("menuItem")

       for (let i = 0; i < arr.length; i++){
        arr[i].classList = "menuItem";
      }
      const activeItem = document.getElementById(`#${activePageName}`)

      if(activeItem){
        activeItem.classList.add("active");

      }

    }
}

export { UI };