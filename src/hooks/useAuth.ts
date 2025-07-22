import { useEffect } from 'react'
import useAuthStore from '../store'

/**
 * Custom hook to manage authentication state
 * Provides easy access to auth state and actions
 */
export const useAuth = () => {
  const { user, accessToken, isAuthenticated, isLoading, login, logout, loadStoredAuth, setUser, setAccessToken } = useAuthStore()

  return {
    // State
    user,
    accessToken,
    isAuthenticated,
    isLoading,

    // Actions
    login,
    logout,
    loadStoredAuth,
    setUser,
    setAccessToken,

    // Computed values
    isDriver: !!user,
    driverName: user ? `${user.firstname} ${user.lastname}` : null,
    driverEmail: user?.email || null
  }
}

/**
 * Hook to ensure user is authenticated
 * Can be used in protected screens to redirect if not authenticated
 */
export const useRequireAuth = () => {
  const { isAuthenticated, isLoading, user } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Could add navigation logic here if needed
      console.warn('User is not authenticated')
    }
  }, [isAuthenticated, isLoading])

  return {
    isAuthenticated,
    isLoading,
    user,
    isReady: !isLoading && isAuthenticated
  }
}
