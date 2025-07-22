import Card from '@/src/components/Card'
import { jobs } from '@/src/seed/data'
import { FlatList, StyleSheet } from 'react-native'

export default function Requests() {
  return (
    <FlatList
      data={jobs}
      renderItem={({ item }) => <Card job={item} />}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={s.container}
    />
  )
}

//

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 16
  }
})
