import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api-integrador.herokuapp.com/'
})

export default api;