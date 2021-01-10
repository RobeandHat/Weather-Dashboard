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
      var cityName = response.name;
      var temp = (response.main.temp - 273.15) * 1.8 + 32;
      var humidity = response.main.humidity;
      var wind = response.wind.speed;
      var iconCode = response.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";

      $("#city").text(cityName);
      $("#temp").text("Temperature: " + temp.toFixed(2) + " (F)");
      $("#humidity").text("Humidity: " + humidity + "%");
      $("#wind").text("Wind Speed: " + wind + " MPH");
      //   $("#weatherDiv").append($("<img>").attr("src", iconUrl));
      $("#wicon").attr("src", iconUrl);
    });
  });
});

//Top block needs City name, date, icon for current weather, temp, humidity, windspeed
