$(document).ready(function () {
  function citySearch() {
    //empties divs of dynamically created content
    $(".test").empty();
    $(".forecastCont").empty();
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
      var dateReal = new Date(response.dt * 1000).toLocaleDateString("en-US");
      var temp = (response.main.temp - 273.15) * 1.8 + 32;
      var humidity = response.main.humidity;
      var wind = response.wind.speed;
      var iconCode = response.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
      $("#weatherDiv").removeClass("hidden");
      $("#city").text(cityName + "  " + dateReal);
      $("#temp").text("Temperature: " + temp.toFixed(2) + " (F)");
      $("#humidity").text("Humidity: " + humidity + "%");
      $("#wind").text("Wind Speed: " + wind + " MPH");
      $("#wicon").attr("src", iconUrl);

      var newButton = $("<button>").text(input);
      newButton.addClass(
        "savedCity btn btn-outline-light container-fluid bg-secondary"
      );
      newButton.attr("value", input);
      $(".searchedCities").append(newButton);

      var longitude = response.coord.lon;
      var latitude = response.coord.lat;

      var uvApi =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=ab246c1d8eb84670d81cd395b2a799e9";

      $.ajax({
        url: uvApi,
        method: "GET",
      }).then(function (uvResponse) {
        $("#UV").text("UV Index: " + uvResponse.value);
        if (parseInt(uvResponse.value) < 2) {
          $("#UV").addClass("bg-success");
        }
        if (
          parseInt(uvResponse.value) >= 2 &&
          parseInt(uvResponse.value) <= 5
        ) {
          $("#UV").addClass("bg-warning");
        }
        if (parseInt(uvResponse.value) > 5) {
          $("#UV").addClass("bg-danger");
        }
      });
    });
    //Creates the forecast section
    var forecastApi =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      input +
      "&appid=ab246c1d8eb84670d81cd395b2a799e9";
    //loops through 5 days of forecasts at the same time of day
    $.ajax({
      url: forecastApi,
      method: "GET",
    }).then(function (forecast) {
      var forecastArray = [
        forecast.list[6],
        forecast.list[14],
        forecast.list[22],
        forecast.list[30],
        forecast.list[38],
      ];

      for (let i = 0; i < forecastArray.length; i++) {
        var forecastHumid = forecastArray[i].main.humidity;
        var humidDiv = $("<div>").text("Humidity: " + forecastHumid + "%");

        var fixedTemp = (forecastArray[i].main.temp - 273.15) * 1.8 + 32;
        var tempDivs = $("<div>").text(
          "Temperature: " + fixedTemp.toFixed(2) + " (F)"
        );

        var forecastDate = new Date(
          forecastArray[i].dt * 1000
        ).toLocaleDateString("en-US");

        var forecastDateDiv = $("<div>").text(forecastDate);

        var fIconUrl =
          "https://openweathermap.org/img/wn/" +
          forecastArray[i].weather[0].icon +
          "@2x.png";
        var forecastIcon = $("<img>").attr("src", fIconUrl);

        var div = $("<div>");
        div.addClass(
          "col-md btn-outline-light container-fluid bg-secondary margin"
        );
        div.append(forecastDateDiv, tempDivs, humidDiv, forecastIcon);
        $(".forecastCont").append(div);
      }
    });
  }
  //does the same thing as the search button, but on saved click
  function savedCitySearch() {
    $(".test").empty();
    $(".forecastCont").empty();
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
      var dateReal = new Date(response.dt * 1000).toLocaleDateString("en-US");
      var temp = (response.main.temp - 273.15) * 1.8 + 32;
      var humidity = response.main.humidity;
      var wind = response.wind.speed;
      var iconCode = response.weather[0].icon;
      var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";

      $("#city").text(cityName + "  " + dateReal);
      $("#temp").text("Temperature: " + temp.toFixed(2) + " (F)");
      $("#humidity").text("Humidity: " + humidity + "%");
      $("#wind").text("Wind Speed: " + wind + " MPH");
      $("#wicon").attr("src", iconUrl);

      var longitude = response.coord.lon;
      var latitude = response.coord.lat;

      var uvApi =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=ab246c1d8eb84670d81cd395b2a799e9";

      $.ajax({
        url: uvApi,
        method: "GET",
      }).then(function (uvResponse) {
        $("#UV").text("UV Index: " + uvResponse.value);
        if (parseInt(uvResponse.value) < 2) {
          $("#UV").addClass("bg-success");
        }
        if (
          parseInt(uvResponse.value) >= 2 &&
          parseInt(uvResponse.value) <= 5
        ) {
          $("#UV").addClass("bg-warning");
        }
        if (parseInt(uvResponse.value) > 5) {
          $("#UV").addClass("bg-danger");
        }
      });
    });
    var forecastApi =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      input +
      "&appid=ab246c1d8eb84670d81cd395b2a799e9";
    //loops through 5 days of forecasts at the same time of day
    $.ajax({
      url: forecastApi,
      method: "GET",
    }).then(function (forecast) {
      var forecastArray = [
        forecast.list[6],
        forecast.list[14],
        forecast.list[22],
        forecast.list[30],
        forecast.list[38],
      ];

      for (let i = 0; i < forecastArray.length; i++) {
        var forecastHumid = forecastArray[i].main.humidity;
        var humidDiv = $("<div>").text("Humidity: " + forecastHumid + "%");

        var fixedTemp = (forecastArray[i].main.temp - 273.15) * 1.8 + 32;
        var tempDivs = $("<div>").text(
          "Temperature: " + fixedTemp.toFixed(2) + " (F)"
        );

        var forecastDate = new Date(
          forecastArray[i].dt * 1000
        ).toLocaleDateString("en-US");

        var forecastDateDiv = $("<div>").text(forecastDate);

        var fIconUrl =
          "https://openweathermap.org/img/wn/" +
          forecastArray[i].weather[0].icon +
          "@2x.png";
        var forecastIcon = $("<img>").attr("src", fIconUrl);

        var div = $("<div>");
        div.addClass(
          "col-md btn-outline-light container-fluid bg-secondary margin"
        );
        div.append(forecastDateDiv, tempDivs, humidDiv, forecastIcon);
        $(".forecastCont").append(div);
      }
    });
  }

  $(document).on("click", "#button", citySearch);
  $(document).on("click", ".savedCity", savedCitySearch);
});
