const axios = require('axios');

exports.handler = async function(event, context) {
  const apiUrl = 'https://youdosudoku.com/api/';

  try {
    const response = await axios.get(apiUrl);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error fetching data from API", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to fetch data' }),
    };
  }
};
