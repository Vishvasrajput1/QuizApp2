// axiosClient.js
import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://56aeb5f636c7.ngrok-free.app/', // your API base URL
})

// ✅ Request Interceptor - Attach Token
axiosClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2OGJlYzZlMzgwNTAwNWEwOTg0YmM5OTEiLCJpYXQiOjE3NTczMzU1MDQsImV4cCI6MTc1NzMzNzMwNCwidHlwZSI6ImFkbWluIn0.0mj7iJYI6mF6MyzhFW-fBeDRa1pyQj6hmjUx04JIdCM'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// ✅ Response Interceptor - Handle Token Refresh
axiosClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      try {
        // Call refresh token endpoint
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) throw new Error('No refresh token')

        const { data } = await axios.post(
          'https://api.example.com/auth/refresh',
          { refreshToken }
        )

        // Store new token
        localStorage.setItem('accessToken', data.accessToken)

        // Retry original request with new token
        error.config.headers.Authorization = `Bearer ${data.accessToken}`
        return axiosClient(error.config)
      } catch (refreshError) {
        console.error('Token refresh failed. Redirecting to login...')
        localStorage.clear()
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default axiosClient
