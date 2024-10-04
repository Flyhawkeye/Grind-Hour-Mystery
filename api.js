const axios = require('axios');
const api = axios.create({
baseURL: process.env.API_URL || 'http://localhost:3000/api',
headers: { 'Content-Type': 'application/json' }
});

module.exports = api;u