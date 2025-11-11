import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

type Trip = {
  id: string;
  route: string;
  dateISO: string; // yyyy-mm-dd
  time: string; // HH:mm
  capacityPassengers: number;
  capacityVehiclesSmall: number;
  capacityVehiclesLarge: number;
  bookedPassengers: number;
  bookedVehiclesSmall: number;
  bookedVehiclesLarge: number;
};

const MOCK_TRIPS: Trip[] = Array.from({ length: 20 }).map((_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + (i % 5));
  const dateISO = date.toISOString().slice(0, 10);
  return {
    id: String(i + 1),
    route: `Terminal A → Terminal B`,
    dateISO,
    time: `${8 + (i % 8)}:00`,
    capacityPassengers: 300,
    capacityVehiclesSmall: 50,
    capacityVehiclesLarge: 20,
    bookedPassengers: 50 + (i * 7) % 140,
    bookedVehiclesSmall: 10 + (i * 3) % 20,
    bookedVehiclesLarge: 5 + (i * 2) % 10,
  } as Trip;
});

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export default function TripsSearchScreen() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const dateKey = formatDate(date);
  const tripsForDate = useMemo(
    () => MOCK_TRIPS.filter(t => t.dateISO === dateKey),
    [dateKey]
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Viagens</ThemedText>

      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>Data</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>{dateKey}</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={(_, d) => {
            setShowPicker(false);
            if (d) setDate(d);
          }}
        />
      )}

      <FlatList
        data={tripsForDate}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/trips/${item.id}`)}
          >
            <Text style={styles.cardTitle}>{item.route}</Text>
            <Text style={styles.cardSub}>{item.dateISO} • {item.time}</Text>
            <Text style={styles.cardMeta}>
              Passageiros: {item.bookedPassengers}/{item.capacityPassengers}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<ThemedText>Nenhuma viagem para esta data.</ThemedText>}
        contentContainerStyle={{ gap: 12, paddingVertical: 8 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { marginBottom: 8 },
  filterRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  filterLabel: { fontWeight: '600' },
  dateButton: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#d1d5db' },
  dateButtonText: { fontWeight: '600' },
  card: { padding: 12, borderRadius: 12, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e7eb' },
  cardTitle: { fontWeight: '700', fontSize: 16, marginBottom: 4 },
  cardSub: { color: '#6b7280', marginBottom: 6 },
  cardMeta: { fontWeight: '600' },
});


