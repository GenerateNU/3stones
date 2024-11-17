import axios from "axios";

export function dumpAxiosError(error: any) {
    if (axios.isAxiosError(error)) {
        // This is an Axios error, you can access the error properties here:
        if (error.response) {
          // The request was made, and the server responded with a status code
          // that falls out of the range of 2xx (e.g., 4xx or 5xx)
          console.log('Status Code:', error.response.status);
          console.log('Response Data:', error.response.data);
          console.log('Headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser
          console.log('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error Message:', error.message);
        }
        console.log('Request Config:', error.config);
      } else {
        // Handle any non-Axios errors
        console.error('Non-Axios error:', error);
      }
}