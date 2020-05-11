import { Helper } from "../helper/helper.js";

class Route{
    constructor(name = Helper.isRequired('name'), htmlName = Helper.isRequired('htmlName'), type){
        this.name = name;
        this.htmlName = htmlName;
        this.type = type;
    }
    isActive(){
        //todo check active
    }
}

export default Route;