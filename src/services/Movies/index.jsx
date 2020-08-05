import { API_URL, moviesEndpoint } from '../../consts/index'
import axios from 'axios'

export const getMovies = async () => {

    try {
        const response = await axios.get(`${API_URL}${moviesEndpoint}`)
        if (response.data) {
            return response.data
        }
    } catch (e) {
        return {
            hasError: true,
            e
        }
    }
}

export const getMovie = async (movieId) => {
    try {
        const response = await axios.get(`${API_URL}${moviesEndpoint}/${movieId}`)
        if (response.data) {
            return response.data
        }
    } catch (e) {
        return {
            hasError: true,
            e
        }
    }
}

export const createMovie = async (data) => {
    try {
        const response = await axios.post(`${API_URL}${moviesEndpoint}`, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        return {
            hasError: true,
            error,
        }
    }
}

export const updateMovie = async (movieId, data) => {
    try {
        const response = await axios.put(`${API_URL}${moviesEndpoint}/${movieId}`, data)
        if (response.data) {
            return response.data
        }
    } catch (error) {
        return {
            hasError: true,
            error
        }
    }

}

export const deleteMovie = async (movieId) => {
    try {
        const response = await axios.delete(`${API_URL}${moviesEndpoint}/${movieId}`)

        if (response.data) {
            return response.data
        }
    } catch (error) {
        return {
            hasError: true,
            error
        }
    }
}