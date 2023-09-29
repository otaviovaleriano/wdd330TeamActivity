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

// Setting Product Detail Page Dynamically
async function GetProductDetails(productID){
  const product = await findProductById(productID);
  document.getElementById("ProductName").innerHTML = product.Name;
  document.getElementById("NameWithoutBrand").innerHTML = product.NameWithoutBrand;
  document.getElementById("Image").src = product.Image;
  document.getElementById("Image").alt = product.Name;
  document.getElementById("ListPrice").innerHTML = product.ListPrice;
  document.getElementById("ColorName").innerHTML = product.Colors[0].ColorName;
  document.getElementById("DescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
  document.getElementById("addToCart").setAttribute("data-id",String(productID));
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

document.addEventListener("DOMContentLoaded", function(){
  const urlParams = new URLSearchParams(window.location.search);
  let productID = urlParams.get('productID');
  GetProductDetails(productID)
});

// Fill the HTML for elements on the screen