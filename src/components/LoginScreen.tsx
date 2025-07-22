import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  Alert,
  ActivityIndicator
} from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { LoginAPI } from '../api'
import { useAuth } from '../hooks/useAuth'
import { color } from '../constants/color'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()

  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: () => LoginAPI.post(email, password),
    onSuccess: async (res) => {
      try {
        setError('')
        await login(res.driver, res.accessToken)

        if (Platform.OS === 'android') {
          ToastAndroid.show('Login successful!', ToastAndroid.SHORT)
        } else {
          Alert.alert('Success', 'Login successful!')
        }
      } catch (err) {
        setError('Failed to save login data')
        if (Platform.OS === 'android') {
          ToastAndroid.show('Failed to save login data', ToastAndroid.SHORT)
        } else {
          Alert.alert('Error', 'Failed to save login data')
        }
      }
    },
    onError: (err) => {
      setError(err.message)
      if (Platform.OS === 'android') {
        ToastAndroid.show(err.message || 'Login failed', ToastAndroid.SHORT)
      } else {
        Alert.alert('Error', err.message || 'Login failed')
      }
    }
  })

  const handleSubmit = () => {
    if (email && password) {
      mutate()
      Keyboard.dismiss() // Close the keyboard after submitting
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your driver account</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!isPending}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!isPending}
          />

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.loginButton, isPending && styles.loginButtonDisabled]}
            onPress={handleSubmit}
            disabled={isPending || !email || !password}
          >
            {isPending ? (
              <ActivityIndicator color={color.white} size="small" />
            ) : (
              <Text style={styles.loginButtonText}>Sign In</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.appBackground,
    justifyContent: 'center',
    padding: 20
  },
  formContainer: {
    backgroundColor: color.cardBackground,
    padding: 32,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: color.textPrimary,
    textAlign: 'center',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: color.textSecondary,
    textAlign: 'center',
    marginBottom: 32
  },
  input: {
    height: 56,
    borderColor: color.border,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: color.white,
    color: color.textPrimary
  },
  error: {
    color: '#DC2626',
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14
  },
  loginButton: {
    backgroundColor: color.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8
  },
  loginButtonDisabled: {
    backgroundColor: color.textSecondary,
    opacity: 0.7
  },
  loginButtonText: {
    color: color.white,
    fontSize: 18,
    fontWeight: '600'
  }
})
