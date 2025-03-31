import axios, { Axios } from 'axios';


const localStorage = window.localStorage.getItem('User');
let token = localStorage ? JSON.parse(localStorage).token : '';

const Api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API!,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    }
});
export default Api;
