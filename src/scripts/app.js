import '../styles/main.scss';
import {RequestAPI} from "./RequestAPI/RequestAPI.js";
import { UI } from "./ui/ui.js";
import { Router } from "./routing/router.js";
import Route from "./routing/route.js";


const home = new Route("home", "home", 'default');
const users = new Route("users","users");
const repos = new Route("repos","repos");
const about = new Route("about", "about");
const contacts = new Route("contacts","contacts");
const notFound = new Route ("404","404", '404');
const ui = new UI([home.name, users.name, repos.name, about.name, contacts.name]);
new Router([home, users, repos, about, contacts, notFound]);