import axios, { AxiosRequestConfig } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const instance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

instance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (error) {
      console.warn('Failed to get access token from storage:', error)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle 401 errors and logout
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token might be expired, clear stored data
      try {
        await AsyncStorage.removeItem('accessToken')
        await AsyncStorage.removeItem('driver')
        console.warn('Token expired, cleared stored auth data')
      } catch (storageError) {
        console.warn('Failed to clear auth data:', storageError)
      }
    }
    return Promise.reject(error)
  }
)

export const api = {
  get: (url: string, config?: AxiosRequestConfig) => instance.get(url, config).then((res) => res.data),
  post: (url: string, body: unknown, config?: AxiosRequestConfig) => instance.post(url, body, config).then((res) => res.data),
  put: (url: string, body: unknown, config?: AxiosRequestConfig) => instance.put(url, body, config).then((res) => res.data),
  delete: (url: string, config?: AxiosRequestConfig) => instance.delete(url, config).then((res) => res.data)
}
