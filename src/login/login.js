import { renderHeaderFooter, getParam} from "../js/utils.mjs";
import {login} from "../js/auth.mjs";

document.getElementById("loginButton").addEventListener("click", function () {
   loginEvent()
});
  
function loginEvent() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const param = getParam("redirect");
    login({email: email, password: password}, param)
}

// HAVING AN ISSUE
renderHeaderFooter();