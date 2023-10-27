import ProductList from "./components/ProductList.svelte";
import { renderHeaderFooter } from "./utils.mjs";

// new ProductList({
//   target: document.querySelector(".products"),
//   props: { category: "tents" },
// });

// Call to action-register with site
if (!localStorage.getItem("visitedBefore")) {
  document.getElementById("registrationModal").style.display = "block";
}

document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("registrationModal").style.display = "none";
});

localStorage.setItem("visitedBefore", "true");

renderHeaderFooter();
