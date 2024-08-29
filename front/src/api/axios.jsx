import axios from "axios";

// const BASE_URL = 'http://54.85.64.192:8000/' 
const BASE_URL = 'http://127.0.0.1:8000/' 
// const BASE_URL_NODE = 'http://127.0.0.1:9090/' 

export default axios.create({
    baseURL: BASE_URL
})

export const axiosPrivate = axios.create({
    baseURL: BASE_URL, 
    //Attaching interceptors
    headers: { 'Content-Type':'applicaction/json'},
    withCredentials: true
})

