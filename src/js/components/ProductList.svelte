<script>
  import ProductSummary from "./ProductSummary.svelte";
  import { getData } from "../productData.mjs";
  import { onMount, afterUpdate } from "svelte";

  export let category;

  let promise = getData(category);
  let products = [];
  let filteredProducts = [];
  let sortBy = localStorage.getItem("sortBy") || "name";
  let searchQuery = "";

  // Function to sort products based on criteria
  function sortProducts() {
    if (sortBy === "name") {
      filteredProducts.sort((a, b) => a.Name.localeCompare(b.Name));
    } else if (sortBy === "FinalPrice") {
      filteredProducts.sort((a, b) => a.FinalPrice - b.FinalPrice);
    }
  }

  // Fetch data and sort on component mount
  onMount(async () => {
    products = await promise;
    filteredProducts = products.slice(); // Initial copy of products
    sortProducts();
  });

  //handle sorting change
  function handleSortChange(event) {
    sortBy = event.target.value;
    // console.log(sortBy)
    localStorage.setItem("sortBy", sortBy);
    sortProducts();
    location.reload();
  }

  // handle search - Search bar task OS
  function handleSearchInput(event) {
    searchQuery = event.target.value;
    filterProducts();
  }

  // filter the search - Search bar task OS
  function filterProducts() {
    filteredProducts = products.filter((product) =>
      product.Name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    sortProducts();
  }

  // get random product recommendations
  function getRandomRecommendations(products, count) {
    // Clone the array to avoid modifying the original
    const clonedProducts = [...products];

    // Shuffle the array randomly
    for (let i = clonedProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [clonedProducts[i], clonedProducts[j]] = [
        clonedProducts[j],
        clonedProducts[i],
      ];
    }

    // Take the first 'count' products as recommendations
    return clonedProducts.slice(0, count);
  }

  // Update the filtered products after the original products change - search bar task - OS
  afterUpdate(() => {
    filteredProducts = products.slice();
    filterProducts();
  });

</script>

<div id="filters">
  <div class="search-form">
    <input
      type="text"
      bind:value={searchQuery}
      placeholder="Search for products"
      on:input={handleSearchInput}
    />
  </div>

  <!-- Dropdown menu for sorting -->
  <div class="sort-selectors">
    <label for="sortSelector">Sort By:</label>
    <select id="sortSelector" bind:value={sortBy} on:change={handleSortChange}>
      <option value="name">Name</option>
      <option value="FinalPrice">Price</option>
    </select>
  </div>
  <div>
    <h2>Top Products: {category}</h2>
  </div>
</div>



<!-- Product list -->
{#if filteredProducts.length === 0}
  <p>Loading</p>
{:else}
  <ul class="product-list">
    {#each filteredProducts as product}
      <li class="product-card"><ProductSummary {product} /></li>
    {/each}
  </ul>

  <!-- Recommendations Section -->
  <h3>Recommended Products</h3>
  <ul class="recommendations-list">
    {#each getRandomRecommendations(products, 3) as recommendedProduct}
      <li class="product-card">
        <ProductSummary product={recommendedProduct} />
      </li>
    {/each}
  </ul>
{/if}
