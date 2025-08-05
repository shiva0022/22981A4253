import axios from 'axios';

// API base configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens or other headers
api.interceptors.request.use(
  (config) => {
    // Add any global request configurations here
    // For example, add auth tokens:
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for handling global errors
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.message);
    
    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.log('Unauthorized access - redirecting to login');
      // You could redirect to login page here
    } else if (error.response?.status === 429) {
      // Handle rate limiting
      console.log('Rate limit exceeded');
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.log('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

// API endpoints
export const urlShortenerAPI = {
  // Shorten a URL
  shortenUrl: (originalUrl) => {
    return api.post('/api/shorten', { originalUrl });
  },
  
  // Get URL info (for analytics/stats)
  getUrlInfo: (shortCode) => {
    return api.get(`/api/url/${shortCode}`);
  },
  
  // Get user's URL history (if authentication is implemented)
  getUserUrls: () => {
    return api.get('/api/user/urls');
  },
  
  // Delete a shortened URL (if authentication is implemented)
  deleteUrl: (shortCode) => {
    return api.delete(`/api/url/${shortCode}`);
  }
};

export default api;
