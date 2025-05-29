const axios = require('axios');
const { parseRSCPayload } = require('../utils/parseRSCPayload');

const commonHeaders = {
  'RSC': '1',
  'Next-Url': '/stocks',
  'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K)',
  'Referer': 'https://growagarden.gg/stocks?page=stocks',
  'Accept': 'text/x-component',
};

const axiosInstance = axios.create({
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
});

module.exports = axiosInstance;
