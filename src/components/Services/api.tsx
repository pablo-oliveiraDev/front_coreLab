import axios, { Axios } from 'axios';

const api= axios.create({
    baseURL: "https://apicorelab-iqxx.onrender.com"
});
export default api;