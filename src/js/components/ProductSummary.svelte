<script>
    export let product = {};
</script>

<section>
    <a href={"/product_pages/index.html?productID="+(product.Id)}>
        <img id="product-img"
            src={product.Images.PrimaryMedium} 
            srcset={`
                ${product.Images.PrimaryMedium} 500w,   
                ${product.Images.PrimaryLarge} 900w,  
                ${product.Images.PrimaryExtraLarge} 1200w  
            `}
            alt={`Image of ${product.Name}`}
        />
        <h3 class="card__brand">{product.Brand.Name}</h3>
        <h2 class="card__name">{product.NameWithoutBrand}</h2>
        <div id="discount-div">      
            <p id="Discount" class="discount-percentage"> - {100 - ( product.FinalPrice / product.SuggestedRetailPrice * 100).toFixed(0)}%</p>
            <p class="product-card__price" id="ListPrice">${product.FinalPrice}</p>                    
        </div>
        <p id="retail-price">List Price: ${product.SuggestedRetailPrice}</p>    
    </a>
        
</section>