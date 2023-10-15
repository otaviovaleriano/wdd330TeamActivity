<script>
    import ProductSummary from "./ProductSummary.svelte";
    import { getData } from "../productData.mjs";
    
    // this is how we make a prop in svelte
    export let category;
    // if you are looking at this thinking that's strange to just stop with a promise
    // you would be right.  This will make more sense in a bit...stay tuned.
    let promise = getData(category);

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

</script>

<h2>Top Products: {category}</h2>
{#await promise}
  Loading
{:then products}
<ul class="product-list">
{#each products as product}
  {#if product.Id == "880RR" || product.Id == "985RF" || product.Id == "985PR" || product.Id == "344YJ"}
  <li class="product-card"><ProductSummary {product} /></li>
  {/if}
{/each}
</ul> 
{/await} 