import { Button, StyleSheet, Text, View, Alert } from 'react-native'
import { useEffect } from 'react'
import * as Notifications from 'expo-notifications'

// Configure notifications to be persistent and not clearable
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true
  })
})

export default function LiveJobScreen() {
  useEffect(() => {
    // Request notification permissions on component mount
    requestPermissions()
  }, [])

  const requestPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Notification permission is needed for this feature')
    }
  }

  const addPersistNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Active Job Running',
          body: 'This notification will persist until manually removed',
          data: { persistent: true },
          sticky: true, // Makes notification persistent on Android
          priority: Notifications.AndroidNotificationPriority.HIGH,
          sound: true
        },
        trigger: null // Show immediately
      })

      Alert.alert('Success', 'Persistent notification added')
    } catch (error) {
      Alert.alert('Error', 'Failed to add notification')
    }
  }

  const removePersistNotification = async () => {
    try {
      // Cancel all notifications
      await Notifications.cancelAllScheduledNotificationsAsync()
      await Notifications.dismissAllNotificationsAsync()

      Alert.alert('Success', 'All notifications removed')
    } catch (error) {
      Alert.alert('Error', 'Failed to remove notifications')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Job</Text>
      <View style={styles.separator} />
      <Button title="Add Persist Notification" onPress={addPersistNotification} />
      <View style={{ height: 10 }} />
      <Button title="Remove Persist Notification" onPress={removePersistNotification} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee'
  }
})
