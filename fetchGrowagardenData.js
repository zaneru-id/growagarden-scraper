const axios = require('axios');

const commonHeaders = {
 'RSC': '1',
 'Next-Url': '/stocks',
 'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Mobile Safari/537.36',
 'Referer': 'https://growagarden.gg/stocks?page=stocks',
 'Accept': 'text/x-component',
};

const baseConfig = {
 baseURL: 'https://growagarden.gg',
 decompress: true,
 headers: commonHeaders,
 responseType: 'text',
 transformResponse: [(data) => {
 try {
 return parseRSCPayload(data);
 } catch (error) {
 console.error('Error parsing RSC payload:', error);
 return data;
 }
 }]
};

function parseRSCPayload(data) {
 const lines = data.split('\n');
 const result = {};

 for (const line of lines) {
 if (!line.trim()) continue;

 const colonIndex = line.indexOf(':');
 if (colonIndex === -1) continue;

 const key = line.substring(0, colonIndex);
 const value = line.substring(colonIndex + 1).trim();

 try {
 result[key] = JSON.parse(value);
 } catch {
 result[key] = value;
 }
 }

 const raw = result['2'];
 if (Array.isArray(raw) && raw[3]?.stockDataSSR) {
 return raw[3].stockDataSSR;
 }

 return result;
}

async function fetchStocks() {
 try {
 const response = await axios({
 ...baseConfig,
 url: '/stocks',
 params: {
 page: 'stocks',
 _rsc: 'a2qln'
 },
 headers: {
 ...baseConfig.headers,
 'Next-Router-State-Tree': '%5B%22%22%2C%7B%22children%22%3A%5B%22stocks%22%2C%7B%22children%22%3A%5B%22__PAGE__%3F%7B%5C%22page%5C%22%3A%5C%22weather%5C%22%7D%22%2C%7B%7D%2C%22%2Fstocks%3Fpage%3Dweather%22%2C%22refresh%22%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D'
 }
 });

 return response.data;
 } catch (error) {
 console.error('Error fetching stocks data:', error);
 throw error;
 }
}

async function fetchWeather() {
 try {
 const response = await axios({
 ...baseConfig,
 url: '/stocks',
 params: {
 page: 'weather',
 _rsc: 'a2qln'
 },
 headers: {
 ...baseConfig.headers,
 'Next-Router-State-Tree': '%5B%22%22%2C%7B%22children%22%3A%5B%22stocks%22%2C%7B%22children%22%3A%5B%22__PAGE__%3F%7B%5C%22page%5C%22%3A%5C%22weather%5C%22%7D%22%2C%7B%7D%2C%22%2Fstocks%3Fpage%3Dweather%22%2C%22refresh%22%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D'
 }
 });

 return response.data;
 } catch (error) {
 console.error('Error fetching weather data:', error);
 throw error;
 }
}

(async () => {
 try {
 const stocksData = await fetchStocks();
 console.log('Parsed Stocks Data:', stocksData);

 const weatherData = await fetchWeather();
 console.log('Parsed Weather Data:', weatherData);
 } catch (error) {
 console.error('Error in example usage:', error);
 }
})();
