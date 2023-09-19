import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function addProductToCart(product) {
  // Creating an array to hold the carts items

  // Getting whats already saved to local storage
  var tempCart = getLocalStorage("so-cart");

  // If there is nothing in local storage then make tempCart an array
  if (tempCart === null){tempCart = [];}

  // Add the new product to the array
  tempCart.push(product)

  // Set the Local Storage to the new array
  setLocalStorage("so-cart", tempCart);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
