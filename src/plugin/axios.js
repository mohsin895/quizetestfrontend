import { ref } from 'vue';

// Import Axios
import axios from 'axios';

// Create a ref for Axios instance
const axiosInstance = ref(null);

// Set up Axios instance
const setupAxios = () => {
  axiosInstance.value = axios.create({
    baseURL: 'http://localhost/loyelapi/public/api/staff/',
  });
};

// Call the setup function
setupAxios();
