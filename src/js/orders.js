import { renderHeaderFooter } from "./utils.mjs";
import { checkLogin } from "./auth.mjs"
import { doc } from "prettier";

const baseURL = "http://server-nodejs.cit.byui.edu:3000/"

async function getOrders(token) {
    console.log(token)
    const options = {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const response = await fetch(baseURL + "orders", options);
    const responseData = await response.json();
    console.log(responseData)
    displayOrders(responseData)
}

function displayOrders(responseData)
{
    console.log(responseData[2])
    const OrderBox = document.getElementById("OrderBox");
    for (let i = 0; i < 10; i++) {
        const Order = `
        <div class="Order">
            <h5 class="OrderText">${responseData[i].fname} ${responseData[i].lname}</h5>
            <h5 class="OrderText">${responseData[i].orderDate}</h5>
            <h5 class="OrderText">${responseData[i].orderTotal}</h5>
        </div>
        `
        OrderBox.insertAdjacentHTML("beforeend", Order)
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const validToken = checkLogin();
    if(validToken)
    {
        getOrders(validToken)
    }
});

renderHeaderFooter();