function Router(routes){
    this.routes = routes;
    this.rootElement = document.getElementById("app");
    this.defaultRoute = this.routes.find(item => item.type ==="default")
    this.notFoundRoute = this.routes.find(item => item.type === '404')
    this.init();
}

Router.prototype.goToRoute = function(currentRoute){
    fetch(`views/${currentRoute.htmlName}.html`)
    .then ((res)=> res.text())
    .then((page)=>{
        this.rootElement.innerHTML = page;
    })
    
}

Router.prototype.hashchanged = function(){
    console.log("222",this)
    let currentRoute;
    let {hash: currentHash} = window.location;
    currentHash = currentHash.substring(1);
    if (currentHash === ""){
        currentRoute = this.defaultRoute
    }
    else {
        currentRoute = this.routes.find(item => item.name === currentHash) || this.notFoundRoute;
    console.log(currentRoute)
    }
    this.goToRoute(currentRoute);
}

Router.prototype.init = function(){
    window.addEventListener("hashchange", this.hashchanged.bind(this))
    this.hashchanged();
}

new Router([about, home, users, notFound])

