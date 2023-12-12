<script>
  import ProductSummary from "./ProductSummary.svelte";
  import { getData } from "../productData.mjs";
  import { onMount } from "svelte";

  export let category;

  let promise = getData(category);
  let products = [];
  let sortBy = localStorage.getItem("sortBy") || "name";

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
    console.log(sortBy)
    localStorage.setItem("sortBy", sortBy);
    sortProducts();
    location.reload();

  }

  // Function to get random product recommendations
  function getRandomRecommendations(products, count) {
    // Clone the array to avoid modifying the original
    const clonedProducts = [...products];

    // Shuffle the array randomly
    for (let i = clonedProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [clonedProducts[i], clonedProducts[j]] = [clonedProducts[j], clonedProducts[i]];
    }

    // Take the first 'count' products as recommendations
    return clonedProducts.slice(0, count);
  }
</script>

<h2>Top Products: {category}</h2>

<!-- Dropdown menu for sorting -->
<div>
<label for="sortSelector">Sort By:</label>
<select id="sortSelector" bind:value={sortBy} on:change={handleSortChange}>
  <option value="name">Name</option>
  <option value="FinalPrice">Price</option>
</select>
</div>

<!-- Product list -->
{#if products.length === 0}
  <p>Loading</p>
{:else}
  <ul class="product-list">
    {#each products as product}
      <li class="product-card"><ProductSummary {product} /></li>
    {/each}
  </ul>

  <!-- Recommendations Section -->
  <h3>Recommended Products</h3>
  <ul class="recommendations-list">
    {#each getRandomRecommendations(products, 3) as recommendedProduct}
      <li class="product-card"><ProductSummary product={recommendedProduct} /></li>
    {/each}
  </ul>
{/if}

