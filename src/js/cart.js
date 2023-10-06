import { getLocalStorage } from "./utils.mjs";

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

let itemCount = 0;

function updateCartItemCount() {
  const itemCountElement = document.getElementById('item-count');
  itemCountElement.textContent = itemCount;
  //get total of items in local storage
  localStorage.setItem('cartItemCount', itemCount);
}
// get the local storage count when the page loads
document.addEventListener("DOMContentLoaded", function () {
  // item count from local storage or 0
  itemCount = parseInt(localStorage.getItem('cartItemCount')) || 0;
  updateCartItemCount();
});

renderCartContents();
