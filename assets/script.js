const apiKey="3f899b32efb4f563be09ef8dd895a9e0";
const searchColEl = $('#search-column');
const cityInputEl = $('#city-input');
const searchBtnEl = $('#search-btn');
const cityBtnsEl = $('#city-btns');
const cityContainer = $('#city-container');
const forecastContainerEl = $('#forecast-container');

class User {
    constructor(userName = 'default') {
      this.name = userName,
      this.lastCitySearched = "",
      this.lat = 0,
      this.lon = 0,
      this.searchedCities = [],
      this.isNewUser = true
    }
  }

  function save(user) {
    // Save User city and saved searched cities to localStorage
    user.isNewUser = false;
    console.log(user, ' SAVED')
    localStorage.setItem('userWeather', JSON.stringify(user));
  }

  function load() {
    // Load User city and searched cities from localStorage
    let userData = JSON.parse(localStorage.getItem('userWeather'));
    console.log(userData, ' LOADED')
    
    return userData;
  }

  class RequestType {
    constructor(name, urlSegment, params={}) {
      this.name = name;
      this.urlSegment = urlSegment;
      this.params = params;
      this.requestUrl = "";
    }
  }

  const openWeatherApi = {
    baseUrl: "https://api.openweathermap.org/",
    createRequestUrl: function(requestTypeObject) {
        let requestUrl = openWeatherApi.baseUrl;
        let paramCount = 0;
        requestUrl += requestTypeObject.urlSegment;
        for (let [key, value] of Object.entries(requestTypeObject.params)) {

            if (paramCount < 1) {
              requestUrl += `?${key}=${value}`;
            } else {
              requestUrl += `&${key}=${value}`;
            }
            paramCount++;
          }

          requestUrl += `&appid=${apiKey}`
          requestTypeObject.requestUrl = requestUrl;
          return requestUrl;
        }
    }

    class CurrentWeather {
        constructor(data, name = 'default') {
          this.name = name;
          this.date = data.current.dt;
          this.icon = data.current.weather[0].icon;
          this.temp = data.current.temp;
          this.wind = data.current.wind_speed;
          this.humidity = data.current.humidity;
          this.uvi = data.current.uvi;
          this.uvi_color = this.getUviColor(this.uvi);
        }
        fillCityCurrentContainerInfo() {
            let date = moment(this.date * 1000).format('MM/DD/YY');
            let icon = `http://openweathermap.org/img/wn/${this.icon}@4x.png`
            let currentDiv = $('<div>').addClass('current-card-1 card m-2 p-2 border border-1 border-dark');
    let currentDate = $('<h3>').addClass('current-date').text(`${this.name} ${date}`);
    let currentIcon = $('<img>').addClass('current-weather-icon').attr({'src': icon, 'alt': 'Weather Icon', 'width': '10%'});
    let currentTemp = $('<p>').addClass('current-temp').text(`Temp: ${this.temp}°F`);
    let currentWind = $('<p>').addClass('current-wind').text(`Wind: ${this.wind} mph`);
    let currentHumidity = $('<p>').addClass('current-humidity').text(`Humidity: ${this.humidity}%`);
    let currentUvi = $('<p>').addClass('current-uvi').text('UV Index: ');
    let currentUviSpan = $('<span>').text(this.uvi).css({'color': 'white', 'background-color': this.uvi_color, 'padding': '3px 10px', 'border-radius': '5px'});
    currentUvi.append(currentUviSpan);
    currentDiv.append(currentDate);
    currentDiv.append(currentIcon);
    currentDiv.append(currentTemp);
    currentDiv.append(currentWind);
    currentDiv.append(currentHumidity);
    currentDiv.append(currentUvi);
    
    return currentDiv;
  }
  getUviColor(uvi) {
    if (uvi < 2) {
      return "green";
      
    } else if (uvi > 2 && uvi < 6) {
      return "yellow";
    
    } else if (uvi > 6 && uvi < 8) {
      return "orange";
    
    } else if (uvi > 7) {
      return "red";
    }
  }
}

class ForecastCard {
    constructor(cardName, daily, index) {
      this.name = cardName;
      this.date = daily[index].dt;
      this.icon = daily[index].weather[0].icon;
      this.temp = daily[index].temp.max;
      this.wind = daily[index].wind_speed;
      this.humidity = daily[index].humidity;
    }

    createCard() {
        let date = moment(this.date * 1000).format('MM/DD/YY');
        let icon = `http://openweathermap.org/img/wn/${this.icon}@4x.png`
        let cardDiv = $('<div>').addClass('h-100 forecast-card-1 card m-2 border border-1 border-dark').attr('style', "width: 10rem;");
        let cardDate = $('<h3>').addClass('forecast-date').text(date);
        let cardIcon = $('<img>').addClass('card-weather-icon').attr({'src': icon, 'alt': 'Weather Icon'});
        let cardTemp = $('<p>').addClass('card-temp').text(`Temp: ${this.temp}°F`);
        let cardWind = $('<p>').addClass('card-wind').text(`Wind: ${this.wind} mph`);
        let cardHumidity = $('<p>').addClass('card-humidity').text(`Humidity: ${this.humidity}%`);
        cardDiv.append(cardDate);
        cardDiv.append(cardIcon);
        cardDiv.append(cardTemp);
        cardDiv.append(cardWind);
        cardDiv.append(cardHumidity);
        
        return cardDiv;
      }
    }

    