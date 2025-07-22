import { create } from 'zustand/react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Driver } from '../types/dto'

interface AuthStore {
  user: Driver | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: Driver | null) => void
  setAccessToken: (token: string | null) => void
  login: (user: Driver, token: string) => Promise<void>
  logout: () => Promise<void>
  loadStoredAuth: () => Promise<void>
}

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) => set({ user, isAuthenticated: !!user }),

  setAccessToken: (token) => set({ accessToken: token }),

  login: async (user: Driver, token: string) => {
    try {
      // Store in AsyncStorage
      await AsyncStorage.setItem('accessToken', token)
      await AsyncStorage.setItem('driver', JSON.stringify(user))

      // Update store
      set({
        user,
        accessToken: token,
        isAuthenticated: true,
        isLoading: false
      })
    } catch (error) {
      console.error('Error storing login data:', error)
      throw error
    }
  },

  logout: async () => {
    try {
      // Remove from AsyncStorage
      await AsyncStorage.removeItem('accessToken')
      await AsyncStorage.removeItem('driver')

      // Clear store
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false
      })
    } catch (error) {
      console.error('Error clearing login data:', error)
      throw error
    }
  },

  loadStoredAuth: async () => {
    try {
      set({ isLoading: true })

      const [storedToken, storedDriver] = await Promise.all([AsyncStorage.getItem('accessToken'), AsyncStorage.getItem('driver')])

      if (storedToken && storedDriver) {
        const user = JSON.parse(storedDriver) as Driver
        set({
          user,
          accessToken: storedToken,
          isAuthenticated: true,
          isLoading: false
        })
      } else {
        set({ isLoading: false })
      }
    } catch (error) {
      console.error('Error loading stored auth:', error)
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false
      })
    }
  }
}))

export default useAuthStore
