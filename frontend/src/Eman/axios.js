// axios.js (create a separate file for axios configuration)

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5500/blogs/posts', // Update this with your API URL
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const tokenn = localStorage.getItem('token');
    if (tokenn) {
      config.headers.token = tokenn;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
