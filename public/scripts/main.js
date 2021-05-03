$('.show-filters').on('click', function() {

  if ($('.filters-list').is(':visible')) {

    $('.filters-list').slideUp();
    $('.show-filters').text('Show filters');

  } else {

    $('.filters-list').slideDown();
    $('.show-filters').text('Hide filters');

  }
//   this will block the default beavior of the # href jumping to the top of the page
  return false

});

$('.filters-list a').on('click', function() {

	var filter = $(this).attr('data-filter');

	console.log(filter);

  $('.product').hide();
  $(filter).show();

	$('.filters-list a').removeClass('selected')
  // this will add a class name of selected to the current filter link the we've just     	clicked on.
	//
  $(this).addClass('selected');
	// 1. hide all the products
	// 2. show the products with a particular filter

	// his blocks the link from following the href
  return false

});
