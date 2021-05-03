$(() => {
  // View: product-page.ejs
  const productID = 0
  const product = {
    id: 12,
    name: "product",
    description: "Great product buy now",
    price: 99,
    stock: 123,
    is_approved: false,
    is_for_sale: true,
    user_id: 123,
    thumbnail: "picture",
    img_id: 122
  }

  $("#product-name").text(product.name);
  $("#product-description").text(product.description);
  $("#product-price").text(product.price);
  $("#product-stock").text(product.stock);
  $("#main-product-image").text(product.thumbnail);
  // $.ajax({
  //   method: "GET",
  //   url: "/products/"+productID
  // }).done((product) => {
  //
  // });
});




