import { Router } from "./routing/router.js";
import Route from "./routing/route.js";

const about = new Route("about", "about");
const home = new Route("home", "home", 'default');
const users = new Route("users","users");
const notFound = new Route ("404","404", '404');
// todo - allow Router only onnce!
new Router([about, home, users, notFound])
