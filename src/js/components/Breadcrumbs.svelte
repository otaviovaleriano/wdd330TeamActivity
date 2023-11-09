<script>
  export let breadcrumbs = [];

  let currentBreadcrumbs = [{ label: 'Home', url: '/' }];

  function generateBreadcrumbs() {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const newBreadcrumbs = [];

    for (let i = 0; i < pathSegments.length; i++) {
      if (pathSegments[i] !== "index.html") {
        let url = "/" + pathSegments.slice(0, i + 1).join('/');
        newBreadcrumbs.push({ label: pathSegments[i], url });
      }
    }

    currentBreadcrumbs = currentBreadcrumbs.concat(newBreadcrumbs);
    
  }
  generateBreadcrumbs();
  $: breadcrumbs = currentBreadcrumbs;
  
</script>

<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    {#each breadcrumbs as crumb (crumb)}
      <li class="breadcrumb-item">
        {#if crumb.url}
          <a href={crumb.url}>{crumb.label}</a>
        {:else}
          <span>{crumb.label}</span>
        {/if}
      </li>
    {/each}
  </ol>
</nav>

<style>
  .breadcrumb {
    display: flex;
    align-items: left;
    list-style: none;
    padding: 0;
  }

  .breadcrumb-item {
    margin: 0;
    padding: 0 5px;
  }

  .breadcrumb-item a {
    text-decoration: none;
    color: black; 
    font-weight: bold;
  }

  .breadcrumb-item:not(:last-child) a::after {
    content: "→"; 
    margin: 0 5px;
  }

  .breadcrumb-item:last-child::after {
    content: "";
  }


  .breadcrumb-item:last-child a {
    font-weight: bold;
    color: #A4B8C4;
    text-decoration: underline;
      }
</style>
