import { getLocalStorage } from "./utils.mjs";
import { setLocalStorage } from "./utils.mjs";
import { renderHeaderFooter } from "./utils.mjs";
import { cartCount } from "./stores.mjs";

// (SAI) Function to check if there are items in the cart
function checkCartItems() {
  // Check if there are items in local storage
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems.length > 0) {
    // There are items in the cart, show the cart footer
    cartFooter.classList.remove("hide");

    // Calculate the total amount
    let totalAmount = 0;

    // Sets the totalAmount
    for (let i = 0; i < cartItems.length; i++) {
      const product = cartItems[i];
      totalAmount += product.FinalPrice;
    }

    // Create HTML to display the total
    const totalHTML = document.createElement("p");
    totalHTML.textContent = `Total: $${totalAmount.toFixed(2)}`;
    totalHTML.classList.add("cart-total");

    // Insert the total HTML into the cart footer element
    cartFooter.appendChild(totalHTML);
  } else {
    // There are no items in the cart, you can perform other actions
    cartFooter.classList.add("hide");
  }
}

// Call the function when the cart page loads
window.addEventListener("load", checkCartItems);

function renderCartContents() {
  //OS - cart.html error handling
  let cartItems = getLocalStorage("so-cart");

  if (cartItems === null || cartItems.length < 1) {
    cartItems = [];
    const cartFooter = document.querySelector(".cart-footer");
    cartFooter.classList.add("hide");
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
      src="${item.Images.PrimaryMedium}"
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

      // Updates cartCount
      cartCount.set(cartItems.length);

      // OS - updating itemCount in the cart based on local storage:
      // let itemCount = cartItems.length;
      // updateCartItemCount();

      // Re-render the cart contents
      renderCartContents();
    }
  });
renderCartContents();

renderHeaderFooter();
