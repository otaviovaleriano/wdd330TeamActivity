const baseURL = "http://server-nodejs.cit.byui.edu:3000/"

export async function login(creds, redirect) {
    const tokenKey = "so-token";
    console.log(creds)
    try {
    const token = await loginRequest(creds);
    setLocalStorage(tokenKey, token);
    console.log("here")
    window.location = redirect;

    } catch (err){
        console.log(err.message.message)
    }
}

function checkLogin() {
    
}

function isTokenValid() {
    
}


async function loginRequest(creds) {
    const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
    };
    return await fetch(baseURL + "login/", options).then(convertToJson);
}