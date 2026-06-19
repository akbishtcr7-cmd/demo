import axios from 'axios'
import { getToken } from '../../utils/tokenStorage'

const normalizeApiBaseUrl = (url) => {
  const trimmedUrl = url.replace(/\/+$/, '')
  return trimmedUrl.endsWith('/api') ? trimmedUrl : `${trimmedUrl}/api`
}

const API_BASE_URL = normalizeApiBaseUrl(
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
)

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

api.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      if (error.code === 'ECONNABORTED') {
        return Promise.reject({
          message: `Request timed out while reaching ${API_BASE_URL}${error.config?.url || ''}`,
        })
      }

      return Promise.reject({
        message: `Network Error: could not reach ${API_BASE_URL}${error.config?.url || ''}`,
      })
    }

    return Promise.reject({
      ...(error.response.data || {}),
      status: error.response.status,
    })
  },
)

export default api
