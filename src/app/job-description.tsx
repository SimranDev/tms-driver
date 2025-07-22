import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { MaterialIcons, Entypo, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { color } from '../constants/color'
import { jobs } from '../seed/data'

export default function JobDescription() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()

  // Find the job by ID
  const job = jobs.find((j) => j.id === Number(id))

  if (!job) {
    return (
      <View style={s.container}>
        <Text style={s.errorText}>Job not found</Text>
      </View>
    )
  }

  return (
    <ScrollView style={s.container} contentContainerStyle={s.contentContainer}>
      {/* Header */}
      <View style={s.header}>
        <Pressable onPress={() => router.back()} style={s.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={color.secondary} />
        </Pressable>
        <Text style={s.title}>Job Details</Text>
        <View style={s.placeholder} />
      </View>

      {/* Job ID and Status */}
      <View style={s.card}>
        <View style={s.row}>
          <Text style={s.jobId}>JOB {job.id}</Text>
          <MaterialIcons name="work" size={28} color={color.secondaryLight} />
        </View>
        <View style={s.divider} />
        <View style={s.statusContainer}>
          <Text style={s.statusLabel}>Status:</Text>
          <Text style={[s.status, { color: getStatusColor(job.status) }]}>{job.status.toUpperCase()}</Text>
        </View>
      </View>

      {/* Pickup Information */}
      <View style={s.card}>
        <Text style={s.sectionTitle}>Pickup Information</Text>
        <View style={s.locationRow}>
          <Entypo name="location-pin" size={24} color={color.secondary} />
          <View style={s.locationInfo}>
            <Text style={s.locationLabel}>Pickup Address</Text>
            <Text style={s.locationText}>{job.pickupAddress}</Text>
          </View>
        </View>
        <View style={s.timeRow}>
          <MaterialIcons name="schedule" size={24} color={color.secondary} />
          <View style={s.timeInfo}>
            <Text style={s.timeLabel}>Scheduled Pickup</Text>
            <Text style={s.timeText}>
              {new Date(job.scheduledPickup).toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </Text>
            <Text style={s.timeText}>
              {new Date(job.scheduledPickup).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}
            </Text>
          </View>
        </View>
        {job.actualPickup && (
          <View style={s.timeRow}>
            <MaterialIcons name="check-circle" size={24} color="green" />
            <View style={s.timeInfo}>
              <Text style={s.timeLabel}>Actual Pickup</Text>
              <Text style={s.timeText}>
                {new Date(job.actualPickup).toLocaleDateString('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </Text>
              <Text style={s.timeText}>
                {new Date(job.actualPickup).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Delivery Information */}
      <View style={s.card}>
        <Text style={s.sectionTitle}>Delivery Information</Text>
        <View style={s.locationRow}>
          <MaterialCommunityIcons name="flag-triangle" size={24} color={color.secondary} />
          <View style={s.locationInfo}>
            <Text style={s.locationLabel}>Delivery Address</Text>
            <Text style={s.locationText}>{job.deliveryAddress}</Text>
          </View>
        </View>
        <View style={s.timeRow}>
          <MaterialIcons name="schedule" size={24} color={color.secondary} />
          <View style={s.timeInfo}>
            <Text style={s.timeLabel}>Scheduled Delivery</Text>
            <Text style={s.timeText}>
              {new Date(job.scheduledDelivery).toLocaleDateString('en-US', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </Text>
            <Text style={s.timeText}>
              {new Date(job.scheduledDelivery).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}
            </Text>
          </View>
        </View>
        {job.actualDelivery && (
          <View style={s.timeRow}>
            <MaterialIcons name="check-circle" size={24} color="green" />
            <View style={s.timeInfo}>
              <Text style={s.timeLabel}>Actual Delivery</Text>
              <Text style={s.timeText}>
                {new Date(job.actualDelivery).toLocaleDateString('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </Text>
              <Text style={s.timeText}>
                {new Date(job.actualDelivery).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true
                })}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Freight Information */}
      <View style={s.card}>
        <Text style={s.sectionTitle}>Freight Information</Text>
        <View style={s.row}>
          <FontAwesome name="cube" size={20} color={color.secondary} />
          <View style={s.infoContent}>
            <Text style={s.infoLabel}>Description</Text>
            <Text style={s.infoText}>{job.freightDescription}</Text>
          </View>
        </View>
        <View style={s.row}>
          <MaterialIcons name="inventory" size={20} color={color.secondary} />
          <View style={s.infoContent}>
            <Text style={s.infoLabel}>Container ID</Text>
            <Text style={s.infoText}>{job.containerId}</Text>
          </View>
        </View>
      </View>

      {/* Additional Information */}
      <View style={s.card}>
        <Text style={s.sectionTitle}>Additional Information</Text>
        <View style={s.row}>
          <MaterialIcons name="person" size={20} color={color.secondary} />
          <View style={s.infoContent}>
            <Text style={s.infoLabel}>Customer ID</Text>
            <Text style={s.infoText}>{job.customerId}</Text>
          </View>
        </View>
        <View style={s.row}>
          <MaterialIcons name="local-shipping" size={20} color={color.secondary} />
          <View style={s.infoContent}>
            <Text style={s.infoLabel}>Vehicle ID</Text>
            <Text style={s.infoText}>{job.vehicleId}</Text>
          </View>
        </View>
        <View style={s.row}>
          <MaterialIcons name="drive-eta" size={20} color={color.secondary} />
          <View style={s.infoContent}>
            <Text style={s.infoLabel}>Driver ID</Text>
            <Text style={s.infoText}>{job.driverId}</Text>
          </View>
        </View>
        {job.notes && (
          <View style={s.row}>
            <MaterialIcons name="note" size={20} color={color.secondary} />
            <View style={s.infoContent}>
              <Text style={s.infoLabel}>Notes</Text>
              <Text style={s.infoText}>{job.notes}</Text>
            </View>
          </View>
        )}
        <View style={s.row}>
          <MaterialIcons name="date-range" size={20} color={color.secondary} />
          <View style={s.infoContent}>
            <Text style={s.infoLabel}>Created</Text>
            <Text style={s.infoText}>
              {new Date(job.createdAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'pending':
      return '#f59e0b'
    case 'in_progress':
      return '#3b82f6'
    case 'completed':
      return '#10b981'
    case 'cancelled':
      return '#ef4444'
    default:
      return color.textPrimary
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.appBackground
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: 10
  },
  backButton: {
    padding: 8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: color.secondary
  },
  placeholder: {
    width: 40
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderColor: color.border,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  jobId: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.secondary,
    textTransform: 'uppercase'
  },
  divider: {
    height: 1,
    backgroundColor: color.secondaryLight,
    marginVertical: 12
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  statusLabel: {
    fontSize: 16,
    color: color.textPrimary,
    fontWeight: '600'
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.secondary,
    marginBottom: 16
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12
  },
  locationInfo: {
    flex: 1
  },
  locationLabel: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
    fontWeight: '600'
  },
  locationText: {
    fontSize: 16,
    color: color.textPrimary,
    lineHeight: 22
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12
  },
  timeInfo: {
    flex: 1
  },
  timeLabel: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
    fontWeight: '600'
  },
  timeText: {
    fontSize: 16,
    color: color.textPrimary,
    marginBottom: 2
  },
  infoContent: {
    flex: 1,
    marginLeft: 12
  },
  infoLabel: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 2,
    fontWeight: '600'
  },
  infoText: {
    fontSize: 16,
    color: color.textPrimary
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50
  }
})
