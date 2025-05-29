const fetchStocks = require('./api/fetchStocks');
const fetchWeather = require('./api/fetchWeather');

(async () => {
  try {
    const stocksData = await fetchStocks();
    console.log('Parsed Stocks Data:', stocksData);

    const weatherData = await fetchWeather();
    console.log('Parsed Weather Data:', weatherData);
  } catch (error) {
    console.error('Error in main execution:', error);
  }
})();
