import { createContext, useCallback, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { loginRequest, registerRequest } from '../services/authService'

export const AuthContext = createContext({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('frontend_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const updateUser = useCallback((userData) => {
    setUser(userData)
    localStorage.setItem('frontend_user', JSON.stringify(userData))
  }, [])

  const login = async (credentials) => {
    const data = await loginRequest(credentials)
    updateUser(data.user ?? data)
    toast.success('Logged in successfully')
    return data
  }

  const register = async (payload) => {
    const data = await registerRequest(payload)
    updateUser(data.user ?? data)
    toast.success('Account created successfully')
    return data
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('frontend_user')
    toast.success('You have been logged out')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
