$(() => {
  // View: product-page.ejs
  const productID = 0
  $.ajax({
    method: "GET",
    url: "/products/"+productID
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
});
