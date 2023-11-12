import { jwtDecode } from "jwt-decode";
import { setLocalStorage, getLocalStorage} from "../js/utils.mjs";

const baseURL = "http://server-nodejs.cit.byui.edu:3000/"

export async function login(creds, redirect) {
    console.log(creds)
    const tokenKey = "so-token";
    try {
        const token = await loginRequest(creds);
        console.log(token)
        setLocalStorage(tokenKey, token);
        window.location = redirect;
    
    } catch (err){
        console.log(err.message.message)
    }
}

export function checkLogin() {
    const tokenKey = "so-token";
    const token = getLocalStorage(tokenKey)
    if(!isTokenValid(token))
    {
        setLocalStorage(tokenKey, "");
        const winLocation = String(window.location);
        window.location = `/login/index.html?redirect=${winLocation}`
    }
    else{
        return token;
    }
}

function isTokenValid(token) {
    const date = new Date();
    var seconds = date.getTime();
    try
    {
        const decoded = jwtDecode(token);
        if (seconds > decoded.exp * 1000)
        {
            return false;
        }
        else {
            return true;
        }
    }
    catch {
        return false;
    }

}

export async function loginRequest(creds) {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
    };

    const response = await fetch(baseURL + "login", options);
    const responseData = await response.json();
    return responseData.accessToken;
}