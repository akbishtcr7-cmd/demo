import api from './api/axiosInstance'

export const loginRequest = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials)
  return data
}

export const registerRequest = async (payload) => {
  const { data } = await api.post('/auth/register', payload)
  return data
}

export const fetchDashboardStats = async () => {
  const { data } = await api.get('/dashboard')
  return data
}
