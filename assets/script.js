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