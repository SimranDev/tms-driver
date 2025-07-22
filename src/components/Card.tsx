import { View, Text, StyleSheet, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { color } from '../constants/color'
import { Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Job } from '../types/dto'

interface CardProps {
  job: Job
}

export default function Card({ job }: CardProps) {
  const router = useRouter()

  const handlePress = () => {
    router.push(`/(tabs)/../job-description?id=${job.id}` as any)
  }

  return (
    <Pressable style={s.container} onPress={handlePress}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={s.label}>{'JOB ' + job.id}</Text>
        <MaterialIcons name="work" size={24} color={color.secondaryLight} />
      </View>
      <View
        style={{ height: 1, width: '100%', backgroundColor: color.secondaryLight, marginTop: 2, marginBottom: 4 }}
      />
      <View style={{ gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Entypo name="location-pin" size={20} color="gray" />
          <Text style={{ color: 'gray' }}>{job.pickupAddress}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <MaterialCommunityIcons name="flag-triangle" size={20} color="gray" />
          <Text style={{ color: 'gray' }}>{job.deliveryAddress}</Text>
        </View>
      </View>
      <View style={{ alignSelf: 'flex-end' }}>
        <Text id="date" style={s.datetime}>
          {new Date(job.scheduledPickup).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short'
          })}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={s.datetime}>
            {new Date(job.scheduledPickup).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })}
          </Text>
          <Text style={s.datetime}> --- </Text>
          <Text style={s.datetime}>
            {new Date(job.scheduledDelivery).toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            })}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}

// .cardcss {
//     background-color: var(--palette-background-paper);
//     color: var(--palette-text-primary);
//     background-image: none;
//     position: relative;
//     box-shadow: var(--card-shadow, var(--customShadows-card));
//     z-index: 0;
//     transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
//     overflow: hidden;
//     border-radius: var(--card-radius, 16px);
// }

const s = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.secondary,
    textTransform: 'uppercase'
  },
  container: {
    backgroundColor: 'white',
    color: color.textPrimary,
    borderColor: color.border,
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 4
  },
  datetime: {
    fontFamily: 'monospace',
    color: color.accent,
    alignSelf: 'flex-end',
    fontWeight: 'bold'
  }
})
