$(document).ready(function () {
  $("#btnSeller").on("click", function (e) {
    $(".fcf-body").slideDown();
    $(this).hide();
  });

  $("#btnHide").on("click", function (e) {
    $(".fcf-body").hide();
    $("#btnSeller").show();
  });
  $("#fcf-button").on("click", function (e) {
    getMessages();

    const message = $("#Message").val();
    let productId = $("#fcf-button").data("productid");
    // console.log(productId)

    $.ajax({
      url: "/messages/" + productId,
      type: "POST",
      data: { productId: productId, message: message },
      success: function (result) {
        console.log(result);
      },
      error: function (error) {
        console.log("There was an error" + error);
      },
    });
  });
  // loop through messages[], if existingMessages[...].id === messages.id, this message exists, don't append
  // else, append

  //ajax call to backend to get messages which is an array
  existingMessages = []; // messages returned from backend
  function displayMessage(id) {
    if (existingMessages.includes(id)) {
      return true;
    }
  }

  const getMessages = () => {
    let productId = $("#fcf-button").data("productid");
    userId = 1;
    $.ajax({
      url: `/messages/${productId}?userId=${userId}`,
      type: "GET",
      success: function (result) {


        
        for (let ele in result) {
          existingMessages.push(Number(result[ele]["id"]));
          console.log(existingMessages)
          // console.log("existing :", existingMessages[0]);
          if (!displayMessage(Number(result[ele]["id"]))) {
            
            $("#showMessages").append(`<span>${result[ele]["message"]}</span>` + " ");
            getMessages();
            
          }
          // $("#showMessages").val(`<span>${ele.message}</span>` + " ");
        }


      },
      error: function (error) {
        console.log("There was an error" + error);
      },
    });
  };
  // setInterval( () => {
  getMessages();
  // // you're going to get the whole thread of messages, which you will append all the messages every second (not what you want), so you might want to do a comparison of messages on the frontend where you can check if the ids exist
  // }, 1000)
});
