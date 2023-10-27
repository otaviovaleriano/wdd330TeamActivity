<script>
   import { onMount } from "svelte";
   import { getLocalStorage } from "../utils.mjs";

   let cartItems = getLocalStorage("so-cart");
   const baseURL = "http://server-nodejs.cit.byui.edu:3000/checkout"

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
    console.log(packagedItems);
    return packagedItems;
}

async function handleSubmit(e) {
    e.preventDefault();

    packageItems();

    const response = await fetch(baseURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(packagedItems)
    });
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
  console.log(tax)
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
    <h2>Review & Place your Order</h2>

  <form action="">
  <div>
  <label for="fname">First Name:</label>
  <input type="text" name="fname" id="fname">
</div>
<div>
  <label for= "lname">Last Name:</label>
  <input type="text" name="lname" id="lname">
</div>
<div>
  <label for="street">Street:</label>
  <input type="text" name="street" id="street">
</div>
<div>
  <label for="city">City:</label>
  <input type="text" name="city" id="city">
</div>
<div>
  <label for="state">State:</label>
  <input type="text" name="state" id="state">
</div>
<div>
  <label for="zip">Zip:</label>
  <input type="text" name="zip" id="zip">
</div>
<div>
  <label for="cardNumber">Card Number:</label>
  <input type="text" name="cardNumber" id="cardNumber">
</div>
<div>
  <label for="expiration">Expiration:</label>
  <input type="text" name="expiration" id="expiration">
</div>
<div>
  <label for="code">Security Code:</label>
  <input type="text" name="code" id="code">
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
