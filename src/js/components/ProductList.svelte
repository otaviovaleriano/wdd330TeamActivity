<script>
  import ProductSummary from "./ProductSummary.svelte";
  import { getData } from "../productData.mjs";
  import { onMount } from "svelte";

  export let category;

  let promise = getData(category);
  let products = [];

  // State to track sorting criteria
  let sortBy = "name";

  // Function to sort products based on criteria
  function sortProducts() {
    if (sortBy === "name") {
      products.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sortBy === "FinalPrice") {
      products.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
  }

  // Fetch data and sort on component mount
  onMount(async () => {
    products = await promise;
    sortProducts();
  });

  // Function to handle sorting change
  function handleSortChange(event) {
    sortBy = event.target.value;
    sortProducts();
  }
  console.log(handleSortChange);
</script>

<h2>Top Products: {category}</h2>

<!-- Dropdown for sorting -->
<label for="sort">Sort by:</label>
<select id="sort" bind:value={sortBy} on:change={handleSortChange}>
  <option value="name">Name</option>
  <option value="FinalPrice">Price</option>
</select>

{#if products.length === 0}
  <p>Loading</p>
{:else}
  <ul class="product-list">
    {#each products as product}
      <li class="product-card"><ProductSummary {product} /></li>
    {/each}
  </ul>
{/if}
