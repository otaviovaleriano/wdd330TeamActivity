<script>
   import { onMount } from "svelte";
   import { getLocalStorage } from "../utils.mjs";
   import { setLocalStorage } from "../utils.mjs";

   let cartItems = getLocalStorage("so-cart");
   const baseURL = "http://server-nodejs.cit.byui.edu:3000/"

    let tax = 0;
    let total = 0;
    let itemSubtotal = 0;
    let shipping = 0;
    let itemsCount = 0;

let packagedItems = {};

function packageItems() {
    packagedItems = { 
        orderDate: new Date().toJSON(),
        fname: document.getElementById("fname").value,
        lname: document.getElementById("lname").value,
        street: document.getElementById("street").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        zip: document.getElementById("zip").value,
        cardNumber: document.getElementById("cardNumber").value, // REMEMBER TO USE THIS #: 1234123412341234 EXPIRATION: 10/25 CODE: 123
        expiration: document.getElementById("expiration").value,
        code: document.getElementById("code").value,
        orderTotal: itemSubtotal,
        shipping: shipping,
        tax: tax
    }
    let itemsSelected = cartItems.map((item) => {
      return {
        id: item.id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    packagedItems.items = itemsSelected;
    return packagedItems;
}

async function handleSubmit(e) {
  e.preventDefault();
  var myForm = document.forms[0];
  var chk_status = myForm.checkValidity();
  myForm.reportValidity();

  if(chk_status)
  {
    packageItems();
    try {
      const res = await checkout();
      if (res.message = 'Order Placed')
      {
        const PopupBox = document.getElementById("registrationModal");
        PopupBox.classList.remove('hide')
        const popUp = 
        `<div class="modal-content">
            <span class="close" id="closeModal">&times;</span>
            <h2>Order Placed Successfully!!</h2>
            <p>Thank you for your money!</p>
          </div>`
        await PopupBox.insertAdjacentHTML('beforeend', popUp);
        document.getElementById("closeModal").addEventListener("click", function () {
            document.getElementById("registrationModal").style.display = "none";
            document.location.href="/";
        });
        setLocalStorage("so-cart", []);
      }
    } catch (error)
    {
      for (let i = 0; i < Object.keys(error.message).length; i++) {
        let key = Object.keys(error.message)[i];
        let ErrorMessage = String(error.message[key]);
        document.getElementById("errorLog").insertAdjacentHTML('beforeend', '<div id="errorBox"><text class="error">' + ErrorMessage + '</text> <text>X</text></div>');
        const ErrorBox = document.getElementById("errorBox");
        ErrorBox.addEventListener("click", function () {
          ErrorBox.remove()
        });
      }
    }
  }
}

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    const errors = await res.json();
    throw { name: 'servicesError', message: errors };
  }
}

export async function checkout() {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(packagedItems),
  };
  return await fetch(baseURL + "checkout/", options).then(convertToJson);
}

function init()
{
  itemsCount = cartItems.length;
  calculateItemSummary();


  calculateShipping();
  calculateTax();
  calculateItemOrderTotal();
}

function calculateShippingTaxTotal()
{
  calculateShipping();
  calculateTax();
  calculateItemOrderTotal();
}

function calculateItemSummary()
{
  for (let i = 0; i < cartItems.length; i++) {
    itemSubtotal = itemSubtotal + parseInt(cartItems[i].FinalPrice)
  }
}

function calculateShipping()
{
  let counter = 0;
  for (let i = 0; i < cartItems.length; i++) {
    if (counter === 0)
    {shipping = shipping + 10}
    else
    {shipping = shipping + 2}
    counter += 1
  }
}

function calculateTax()
{
  tax = (itemSubtotal * 0.06).toFixed(2);
 }

function calculateItemOrderTotal()
{
  total = parseFloat(tax) + parseFloat(shipping) + parseFloat(itemSubtotal);
}

onMount(() => {
  // Attach the event listener to the submit button
  document.querySelector("#submit-button").addEventListener("click", handleSubmit);
});

init()
</script>
  
<section class="checkout">
  <div id="errorLog">

  </div>
    <h2>Review & Place your Order</h2>

  <form action="">
  <div>
  <label for="fname">First Name:</label>
  <input type="text" required ="fname" id="fname" value="matthew">
</div>
<div>
  <label for= "lname">Last Name:</label>
  <input type="text" required name="lname" id="lname" value="scoresby">
</div>
<div>
  <label for="street">Street:</label>
  <input type="text" required name="street" id="street" value="111">
</div>
<div>
  <label for="city">City:</label>
  <input type="text" required name="city" id="city" value="Howard">
</div>
<div>
  <label for="state">State:</label>
  <input type="text" required name="state" id="state" value="Idaho">
</div>
<div>
  <label for="zip">Zip:</label>
  <input type="text" required name="zip" id="zip" value="83440">
</div>
<div>
  <label for="cardNumber">Card Number:</label>
  <input type="text" required name="cardNumber" id="cardNumber" value="1234123412341234">
</div>
<div>
  <label for="expiration">Expiration:</label>
  <input type="text" required name="expiration" id="expiration" value="10/25">
</div>
<div>
  <label for="code">Security Code:</label>
  <input type="text" required name="code" id="code" value="123">
</div>
    
</form>
<fieldset class="checkout-summary">
    <legend>Order Summary</legend>
    <p id="subtotal">Item Subtotal({itemsCount}): ${itemSubtotal}</p>
    <p id="shipping">Shipping Estimate: ${shipping}</p>
    <p id="tax">Tax: ${tax}</p>
    <p id="total">Order Total: ${total}</p>
    ...

    <input type="submit" value="Submit" id="submit-button">
</section>
