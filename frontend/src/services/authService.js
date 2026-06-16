import api from './api/axiosInstance'

export const loginRequest = async (credentials) => {
  const { data } = await api.post('/auth/login', credentials)
  return data
}

export const verifyLoginOtpRequest = async (payload) => {
  const { data } = await api.post('/auth/verify-login-otp', payload)
  return data
}

export const registerRequest = async (payload) => {
  const { data } = await api.post('/auth/register', payload)
  return data
}

export const verifyRegisterOtpRequest = async (payload) => {
  const { data } = await api.post('/auth/verify-register-otp', payload)
  return data
}

export const fetchProfileRequest = async () => {
  const { data } = await api.get('/auth/profile')
  return data
}
