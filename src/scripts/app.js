import '../styles/main.scss';
import { UI } from "./ui/ui.js";
import { Router } from "./routing/router.js";
import Route from "./routing/route.js";
import img from '../../image/og-image.png';


const home = new Route("home", "home", 'default');
const users = new Route("users","users");
const user = new Route("user","user");
const repos = new Route("repos","repos");
const repo = new Route("repo","repo");
const about = new Route("about", "about");
const notFound = new Route ("notFound","notFound");

new UI([home.name, users.name, repos.name, about.name]);
new Router([home, users, user, repos, about, repo, notFound]);