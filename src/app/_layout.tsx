import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'
import { color } from '../constants/color'
import LoginScreen from '../components/LoginScreen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuth } from '../hooks/useAuth'
import { View, ActivityIndicator } from 'react-native'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)'
}

// Create QueryClient instance once
const queryClient = new QueryClient()

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticatedApp />
    </QueryClientProvider>
  )
}

function AuthenticatedApp() {
  const { isAuthenticated, isLoading, loadStoredAuth } = useAuth()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await loadStoredAuth()
      } finally {
        await SplashScreen.hideAsync()
      }
    }

    initializeAuth()
  }, [loadStoredAuth])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color.appBackground }}>
        <ActivityIndicator size="large" color={color.primary} />
      </View>
    )
  }

  return isAuthenticated ? <RootLayoutNav /> : <LoginScreen />
}

function RootLayoutNav() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: color.appBackground }
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="job-description"
        options={{
          headerShown: false,
          presentation: 'card'
        }}
      />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  )
}
