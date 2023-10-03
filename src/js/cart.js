import { getLocalStorage } from "./utils.mjs";

// (SAI)Assuming you have calculated the total amount and want to show it
// and the Checkout button:
const cartFooter = document.querySelector('.cart-footer');
cartFooter.classList.remove('hide');

// (SAI) Function to check if there are items in the cart
function checkCartItems() {
  // Check if there are items in local storage
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  if (cartItems.length > 0) {
    // There are items in the cart, show the cart footer
    const cartFooter = document.querySelector('.cart-footer');
    cartFooter.classList.remove('hide');

    // Calculate the total amount
    let totalAmount = 0;
    for (const item of cartItems) {
      totalAmount += item.price * item.quantity;
    }

    // Create HTML to display the total
    const totalHTML = document.createElement('p');
    totalHTML.textContent = `Total: $${totalAmount.toFixed(2)}`;
    totalHTML.classList.add('cart-total');

    // Insert the total HTML into the cart footer element
    cartFooter.appendChild(totalHTML);
  } else {
    // There are no items in the cart, you can perform other actions
    console.log('The cart is empty.');
  }
}

// Call the function when the cart page loads
window.addEventListener('load', checkCartItems);


function renderCartContents() {

  //OS - cart.html error handling
  let cartItems = getLocalStorage("so-cart");
  
  if (cartItems === null){cartItems = [];}

  //const cartItems = getLocalStorage("so-cart");
  // Added this
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
