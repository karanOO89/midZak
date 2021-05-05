$(() => {

  const $main = $('#main-content');

  window.views_manager = {};

  window.views_manager.show = function(item) {
    $newProductForm.detach();
    $productListings.detach();
    $searchProductForm.detach();
    $logInForm.detach();

    switch (item) {
      case 'listings':
        $productListings.appendTo($main);
        break;
      case 'newProduct':
        $newProductForm.appendTo($main);
        break;
      case 'searchProduct':
        $searchProductForm.appendTo($main);
        break;
      case 'logIn':
        $logInForm.appendTo($main);
        break;
      case 'error': {
        const $error = $(`<p>${arguments[1]}</p>`);
        $error.appendTo('body');
        setTimeout(() => {
          $error.remove();
          views_manager.show('listings');
        }, 2000);

        break;
      }
    }
  }

});
