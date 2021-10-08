import axios from 'axios';
import config from '../config/environmentConfig';

const api = axios.create({
    baseURL: config.backendUrl
});

export default api;