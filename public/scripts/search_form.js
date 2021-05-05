$(() => {

  const $searchproductForm = $(`
  <form action="/products" method="get" id="search-product-form" class="search-product-form">
      <div class="search-product-form__field-wrapper">
        <label for="search-product-form__category">Category</label>
        <input type="text" name="category" placeholder="Category" id="search-product-form__category">
      </div>

      <div class="search-product-form__field-wrapper">
        <label for="search-product-form__minimum-price-per-unit">Minimum Prise</label>
        <input type="number" name="minimum_price_per_unit" placeholder="Minimum Price" id="search-product-form__minimum-price-per-unit">
        <label for="search-product-form__maximum-price-per-night">Maximum Price</label>
        <input type="number" name="maximum_price_per_night" placeholder="Maximum Price" id="search-product-form__maximum-price-per-unit">
      </div>

      <div class="search-product-form__field-wrapper">
        <label for="search-product-form__minimum-rating">Minimum Rating</label>
        <input type="number" name="minimum_rating" placeholder="Minimum Rating" id="search-product-form__minimum-rating">
      </div>

      <div class="search-product-form__field-wrapper">
          <button>Search</button>
          <a id="search-product-form__cancel" href="#">Cancel</a>
      </div>
    </form>
  `)
  window.$searchProductForm = $searchProductForm;

  $searchProductForm.on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    getAllListings(data).then(function( json ) {
      productListings.addProduct(json.products);
      views_manager.show('listings');
    });
  });

  $('body').on('click', '#search-product-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });

});
