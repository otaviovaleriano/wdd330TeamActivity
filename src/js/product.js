import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { doc } from "prettier";
import { renderHeaderFooter } from "./utils.mjs";
import { cartCount } from "./stores.mjs";

function addProductToCart(product) {
  // Creating an array to hold the carts items

  // Getting whats already saved to local storage
  var tempCart = getLocalStorage("so-cart");

  // If there is nothing in local storage then make tempCart an array
  if (tempCart === null) {
    tempCart = [];
  }

  // Add the new product to the array
  tempCart.push(product);

  // Set the Local Storage to the new array
  setLocalStorage("so-cart", tempCart);

  cartCount.set(tempCart.length);

  playCartAnimation();
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Adds the addtocart animation to the cart icon then removes it after 1 second
async function playCartAnimation() {
  const cart = document.getElementById("cart");
  cart.classList.add("AddToCartAnimation");
  await setTimeout(() => {
    cart.classList.remove("AddToCartAnimation");
  }, 1000);
}

async function CalculateDiscountPercentage(product) {
  return (100 - ( product.FinalPrice / product.SuggestedRetailPrice * 100).toFixed(0));
}

// Setting Product Detail Page Dynamically
async function GetProductDetails(productID) {
  const product = await findProductById(productID);
  const discount = await CalculateDiscountPercentage(product)
  // This will run if the product is found
  if (product != undefined) {
    document.getElementById("ProductName").innerHTML = product.Name;
    document.getElementById("NameWithoutBrand").innerHTML =
      product.NameWithoutBrand;
    document.getElementById("Image").src = product.Image;
    document.getElementById("Image").alt = product.Name;
    document.getElementById("ListPrice").innerHTML = product.ListPrice;
    document.getElementById("Discount").innerHTML = "- " + discount + "%";
    document.getElementById("retail-price").innerText = "List Price: $" + product.SuggestedRetailPrice;
    document.getElementById("ColorName").innerHTML =
      product.Colors[0].ColorName;
    document.getElementById("DescriptionHtmlSimple").innerHTML =
      product.DescriptionHtmlSimple;
    document
      .getElementById("addToCart")
      .setAttribute("data-id", String(productID));
    //This will run if product is not found
  } else {
    document.getElementById("product-section").innerHTML = `
      <h3>Product Not Found</h3>
      <img src="../images/sleeping_employee.png" alt="sleeping_employee" />
      <a href="../index.html" class="product-detail__add">
        <button>Home Page</button>
      </a>`;
    document
      .getElementById("product-section")
      .classList.add("product-not-found");
    document
      .getElementById("product-section")
      .classList.remove("product-detail");
  }
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  let productID = urlParams.get("productID");
  GetProductDetails(productID);
});

// Fill the HTML for elements on the screen

renderHeaderFooter();
