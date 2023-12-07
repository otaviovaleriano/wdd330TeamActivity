import ProductList from "./components/ProductList.svelte";
import { renderHeaderFooter } from "./utils.mjs";

// new ProductList({
//   target: document.querySelector(".products"),
//   props: { category: "tents" },
// });

// Call to action-register with site
// Check if user has visited before
// If not, show modal
// If so, do nothing

if (!localStorage.getItem("visitedBefore")) {
  console.log("here")
  document.getElementById("registrationModal").style.display = "block";
  window.open('./registration.html', '_blank');
}
document.querySelector(".close").addEventListener("click", function () {
  document.getElementById("registrationModal").style.display = "none";
});

localStorage.setItem("visitedBefore", "true");

renderHeaderFooter();
