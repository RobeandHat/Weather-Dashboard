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

  function citySearch() {
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
      $("#wicon").attr("src", iconUrl);

      var newButton = $("<button>").text(input);
      newButton.addClass("savedCity");
      newButton.attr("value", input);
      $(".col-md-3").append(newButton);
    });
  }

  function savedCitySearch() {
    var input = $(this).val();

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
      $("#wicon").attr("src", iconUrl);
    });
  }

  $(document).on("click", "#button", citySearch);
  $(document).on("click", ".savedCity", savedCitySearch);
});
