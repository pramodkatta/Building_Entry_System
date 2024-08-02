import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api', // Update this URL if your backend runs on a different port or host
});

export default instance;
