import axios from 'axios'

// https://api.themoviedb.org/3
// https://api.themoviedb.org/3/movie/now_playing?api_key=f9adf22fb6db92f336a19d18f2e0874d&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export default api

