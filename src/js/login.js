import { renderHeaderFooter, getParam} from "./utils.mjs";
import {login} from "./auth.mjs";

let redirect = "/"
renderHeaderFooter();

document.getElementById("loginButton").addEventListener("click", function () {
   loginEvent()
});
  
function loginEvent() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login({email, password}, redirect)
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const foundRedirect = urlParams.get("redirect");
    console.log(foundRedirect)
    if (foundRedirect != null)
    {
        redirect = foundRedirect
    }
  });