import { createContext, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  loginRequest,
  registerRequest,
  verifyLoginOtpRequest,
  verifyRegisterOtpRequest,
} from '../services/authService'
import {
  getStoredUser,
  getToken,
  removeStoredUser,
  removeToken,
  saveStoredUser,
  saveToken,
} from '../utils/tokenStorage'

export const AuthContext = createContext({
  user: null,
  token: null,
  login: async () => {},
  register: async () => {},
  verifyLoginOtp: async () => {},
  verifyRegisterOtp: async () => {},
  setAuthUser: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    setUser(getStoredUser())
    setToken(getToken())
  }, [])

  const setAuthUser = useCallback((userData) => {
    setUser(userData)
    saveStoredUser(userData)
  }, [])

  const login = async (credentials) => {
    const data = await loginRequest(credentials)
    toast.success(data.message || 'Login OTP sent to your email')
    return data
  }

  const register = async (payload) => {
    const data = await registerRequest(payload)
    toast.success(data.message || 'Registration OTP sent to your email')
    return data
  }

  const completeAuth = useCallback((data) => {
    if (data.token) {
      saveToken(data.token)
      setToken(data.token)
    }

    if (data.user) {
      setAuthUser(data.user)
    }

    return data
  }, [setAuthUser])

  const verifyRegisterOtp = async (payload) => {
    const data = await verifyRegisterOtpRequest(payload)
    completeAuth(data)
    toast.success(data.message || 'Email verified successfully')
    return data
  }

  const verifyLoginOtp = async (payload) => {
    const data = await verifyLoginOtpRequest(payload)
    completeAuth(data)
    toast.success(data.message || 'Logged in successfully')
    return data
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    removeToken()
    removeStoredUser()
    toast.success('You have been logged out')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, verifyLoginOtp, verifyRegisterOtp, setAuthUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
