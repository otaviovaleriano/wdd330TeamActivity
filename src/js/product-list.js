import ProductList from "./components/ProductList.svelte";
import { renderHeaderFooter, getParam } from "./utils.mjs";

// let category = ""
const category = getParam("type");
console.log(category)

document.title = "Sleep Outside | " + category;
new ProductList({
  target: document.querySelector(".product-list"),
  props: { category: category },
});

renderHeaderFooter();