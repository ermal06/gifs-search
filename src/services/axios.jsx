import axios from 'axios';

const apiKey = `${import.meta.env.VITE_API_KEY}`;

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/v1/gifs`,
    timeout: 5000, // Adjust the timeout as needed
    params: {
        api_key: apiKey
    }
});

export default instance;