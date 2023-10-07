import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { doc } from "prettier";

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

  // Increment the item count
  itemCount++;

  // Update the cart item count and local storage
  updateCartItemCount();

  playCartAnimation();
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Adds the addtocart animation to the cart icon then removes it after 1 second
async function playCartAnimation() {
  const cart = document.getElementById('cart')
  cart.classList.add('AddToCartAnimation');
  await setTimeout(() => { cart.classList.remove('AddToCartAnimation'); }, 1000);
}

// Setting Product Detail Page Dynamically
async function GetProductDetails(productID){
  const product = await findProductById(productID);
  // const discountValue = await calcDiscount(product);
  document.getElementById("ProductName").innerHTML = product.Name;
  document.getElementById("NameWithoutBrand").innerHTML = product.NameWithoutBrand;
  document.getElementById("Image").src = product.Image;
  document.getElementById("Image").alt = product.Name;
  document.getElementById("ListPrice").innerHTML = product.ListPrice;
  document.getElementById("ColorName").innerHTML = product.Colors[0].ColorName;
  document.getElementById("DescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.getElementById("addToCart").setAttribute("data-id",String(productID));
  // document.getElementById("RetailPrice").innerHTML = product.SuggestedRetailPrice;  
  // document.getElementById("Discount").innerHTML = discountValue.toFixed(2);

}

// async function calcDiscount(product){
//   let retail = product.SuggestedRetailPrice;
//   let finalPrice = product.ListPrice;
//   let discountValue = 100 - (finalPrice / retail * 100);
//   return discountValue;
// }

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

document.addEventListener("DOMContentLoaded", function(){
  const urlParams = new URLSearchParams(window.location.search);
  let productID = urlParams.get('productID');
  GetProductDetails(productID)
});


// cart number of itens
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


// Fill the HTML for elements on the screen