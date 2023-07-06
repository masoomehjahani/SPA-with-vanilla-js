// import for modular js:
import Dashboard from './pages/Dashboard.js';
import Products from './pages/products.js';
import Posts from './pages/Posts.js';
import NotFound from './pages/NotFound.js';


// what view show to user based on route?
function router(){
//routs" dashboard,products,posts
const routes = [
    {path : '/',view : Dashboard},
    {path : '/products',view : Products},
    {path : '/posts',view : Posts},
    ];
    const potentialRouts= routes.map( item => {
        return {
          route : item,
          isMatch : location.pathname === item.path,
        };
    });

    //find match true:
    let match = potentialRouts.find((route) => route.isMatch);
    if (!match){
        match ={
            route : {path : '/not-found',view : NotFound},
            isMatch : true
        };
    }
    document.querySelector("#app").innerHTML = match.route.view();
}

//2. push user to new url:
function navigateTo (url){
history.pushState(null,null,url);
router();
}

// if user select back on browser
window.addEventListener("popstate" , router );

document.addEventListener("DOMContentLoaded" , () => {
    // to prevent of refresh page on link click
    document.body.addEventListener("click" , e => {
        if (e.target.hasAttribute("data-link")){
           e.preventDefault(); 
           navigateTo(e.target.href);
        }
    });
router();
});

// sidebar toggler:
const sidebarToggler = document.querySelector(".sidebar-toggler");
const nav = document.querySelector(".nav");
//root select:
const root =document.documentElement;

sidebarToggler.addEventListener("click" , e => {
    nav.classList.toggle("mini-sidebar");
    //if define width nav in root and want to change root element:
//    if (nav.classList.contains("mini-sidebar")){
//      root.style.setProperty("--nav-width" , 70 + "px");
//    }
//    else{
//     root.style.setProperty("--nav-width" , 250 + "px");
//    }
});
