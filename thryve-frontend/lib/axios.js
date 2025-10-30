import axios from 'axios';
import { getSession } from 'next-auth/react';
import { toast } from 'sonner';
import { handleApiError } from './handleApiError';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the authorization token
axiosInstance.interceptors.request.use( async (config) => {
    const session = await getSession();
    if (session?.user?.jwt) {
        config.headers['Authorization'] = `Bearer ${session.user.jwt}`;
    }
    return config;
});

//Response interceptor to handle errors globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = handleApiError(error);
        toast.error(errorMessage); //Show toast automatically.
        return Promise.reject(error); //Reject the promise so that individual calls can also handle errors if needed.
    });

export default axiosInstance;