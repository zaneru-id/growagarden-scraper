const axiosInstance = require('./axiosInstance');

async function fetchStocks() {
  try {
    const response = await axiosInstance.get('/stocks', {
      params: {
        page: 'stocks',
        _rsc: 'a2qln'
      },
      headers: {
        'Next-Router-State-Tree': '%5B%22%22%2C%7B%22children%22%3A%5B%22stocks%22%2C%7B%22children%22%3A%5B%22__PAGE__%3F%7B%5C%22page%5C%22%3A%5C%22weather%5C%22%7D%22%2C%7B%7D%2C%22%2Fstocks%3Fpage%3Dweather%22%2C%22refresh%22%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stocks data:', error);
    throw error;
  }
}

module.exports = fetchStocks;
