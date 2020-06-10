export default class HomeController{
    constructor(rootElement){
        this.rootElement= rootElement;
        this.init()
    }

    init(){
        this.rootElement.innerHTML=`<div class = "pad-20">
                                        <h3>This is Single Page Application made with vanilla JavaScript</h3>
                                        <h4> HOW IS MADE??</h4>
                                        <ol>
                                            <li>Application is written with modern JS (ES6),</li>
                                            <li>For responsive UI used Materialize framework,</li>
                                            <li>Webpack is used for bundling,</li>
                                            <li>For styling used SASS,</li>
                                            <li>Router is listening URL hash changes,</li>
                                            <li>Corresponding controller draws the page,</li>
                                            <li>As an API used Github public API.</li>
                                        </ol>
                                        <h4>ABOUT APPLICATION</h4>
                                        <ol>
                                            <li>Users Page - Based on fetch calls draws Github users with pagination. Also you can search specific user by username.</li>
                                            <li>User Page - By clicking on a "user tile" you can get detailed info about user.</li>
                                            <li>Repos Page -  Based on fetch calls draws Github repositories with infinite scrollig. Also you can search specific repository by repo-name.</li>
                                            <li>Repo Page - By clicking on a "repo tile" you can get detailed info about repository.</li>
                                            <li>404 Page - 404 page is shown, when hash route is not found.</li>
                                            <li>About Page - Based on fetch call you can get info about me. :)</li>
                                        </ol>
                                    </div>`
    }

}