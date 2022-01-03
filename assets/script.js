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