function getMyDetails() {
  console.log("getMyDetails");
  return $.ajax({
    url: "/users/me",
  });
}

function logOut() {
  return $.ajax({
    method: "POST",
    url: "/logout",
  })
}

function logIn(data) {
  return $.ajax({
    method: "POST",
    url: "/login",
    data
  });
}


function getAllListings(params) {
  let url = "/products";
  if (params) {
    url += "?" + params;
  }
  return $.ajax({
    url,
  });
}

function getAllFavourites() {
  let url = "/favourites";
  return $.ajax({
    url,
  });
}

const submitProduct = function(data) {
  return $.ajax({
    method: "POST",
    url: "/products",
    data,
  });
}
