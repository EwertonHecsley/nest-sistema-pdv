import axios, { AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.BREVO_URL_EMAIL,
    headers: {
        'Accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY_EMAIL,
        'Content-Type': 'application/json',
    }

});