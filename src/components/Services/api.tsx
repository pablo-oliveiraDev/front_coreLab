import axios, { Axios } from 'axios';

const api:Axios = axios.create({
    baseURL: process.env.API
});
export default api;