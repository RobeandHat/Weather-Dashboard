$(document).ready(function () {
  //   var forecastApi =
  //     "api.openweathermap.org/data/2.5/forecast?q=" +
  //     input +
  //     "&appid=ab246c1d8eb84670d81cd395b2a799e9";

  //   var uvApi =
  //     "api.openweathermap.org/data/2.5/uvi?lat=" +
  //     latitude +
  //     "&lon=" +
  //     longitude +
  //     "&appid=ab246c1d8eb84670d81cd395b2a799e9";

  // var longitude = response.coord.lon;
  // var latitude = response.coord.lat;
  $("#button").on("click", function () {
    var input = $("#search").val();
    var weatherApi =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      input +
      "&appid=ab246c1d8eb84670d81cd395b2a799e9";
    $.ajax({
      url: weatherApi,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  });
});

//Top block needs City name, date, icon for current weather, temp, humidity, windspeed
