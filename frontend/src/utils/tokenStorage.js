const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const getStoredUser = () => {
  const storedUser = localStorage.getItem(USER_KEY)
  return storedUser ? JSON.parse(storedUser) : null
}

export const saveStoredUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const removeStoredUser = () => {
  localStorage.removeItem(USER_KEY)
}
