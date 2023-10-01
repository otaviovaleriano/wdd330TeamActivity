import { getLocalStorage } from "./utils.mjs";
import { setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  //OS - cart.html error handling
  let cartItems = getLocalStorage("so-cart");

  if (cartItems === null) {
    cartItems = [];
  }

  //const cartItems = getLocalStorage("so-cart");
  // Added this
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__remove" data-id="${item.Id}">X</a>
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

document
  .querySelector(".product-list")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("cart-card__remove")) {
      // Retrieve the item's unique identifier (data-id)
      const itemId = event.target.getAttribute("data-id");

      // Remove the item from the cartItems array
      let cartItems = getLocalStorage("so-cart");
      if (cartItems === null) {
        cartItems = [];
      }

      cartItems = cartItems.filter((item) => item.Id !== itemId);

      // Update the cart in localStorage
      setLocalStorage("so-cart", cartItems);

      // Re-render the cart contents
      renderCartContents();
    }
  });
renderCartContents();
