import { StyleSheet, Text, View, TouchableOpacity, Alert, Platform, ToastAndroid } from 'react-native'
import { useAuth } from '../../hooks/useAuth'
import { color } from '../../constants/color'

export default function SettingsScreen() {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout()
            if (Platform.OS === 'android') {
              ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT)
            }
          } catch (error) {
            if (Platform.OS === 'android') {
              ToastAndroid.show('Error logging out', ToastAndroid.SHORT)
            } else {
              Alert.alert('Error', 'Failed to logout')
            }
          }
        }
      }
    ])
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        {user && (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {user.firstname} {user.lastname}
            </Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        )}
      </View>

      <View style={styles.separator} />

      <View style={styles.content}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.appBackground,
    padding: 20
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.textPrimary,
    marginBottom: 20
  },
  userInfo: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: color.cardBackground,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: color.textPrimary,
    marginBottom: 4
  },
  userEmail: {
    fontSize: 14,
    color: color.textSecondary
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
    backgroundColor: color.border
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600'
  }
})
