import axios from 'axios';

// Create an instance of axios with default settings
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Adjust the baseURL according to your backend server
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
