function Route(name = isRequired('name'), htmlName = isRequired('htmlName'), type){
    this.name = name;
    this.htmlName = htmlName;
    this.type = type;
}

Route.prototype.isActive = function(){
    //todo check active route
}

const about = new Route("about", "about");
const home = new Route("home", "home", 'default');
const users = new Route("users","users");
const notFound = new Route ("404","404", '404');


console.log(about);

function isRequired(param) {
    throw `${param} - parameter is required!`;
}

