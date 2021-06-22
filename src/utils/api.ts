import axios from 'axios'

const { NODE_ENV, REACT_APP_API_BASE_URL_PROD, REACT_APP_API_BASE_URL_DEV } = process.env

const API = axios.create({
	baseURL: NODE_ENV === 'production' ? REACT_APP_API_BASE_URL_PROD : REACT_APP_API_BASE_URL_DEV,
})

export { API }
