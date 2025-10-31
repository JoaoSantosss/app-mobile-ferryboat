import React, { useMemo, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type TripDetail = {
  id: string;
  route: string;
  dateISO: string;
  time: string;
  capacityPassengers: number;
  capacityVehiclesSmall: number;
  capacityVehiclesLarge: number;
  bookedPassengers: number;
  bookedVehiclesSmall: number;
  bookedVehiclesLarge: number;
};

function getMockTrip(id: string): TripDetail | null {
  const idx = Number(id);
  if (Number.isNaN(idx)) return null;
  const date = new Date();
  date.setDate(date.getDate() + (idx % 5));
  const dateISO = date.toISOString().slice(0, 10);
  return {
    id,
    route: 'Terminal A → Terminal B',
    dateISO,
    time: `${8 + (idx % 8)}:00`,
    capacityPassengers: 300,
    capacityVehiclesSmall: 50,
    capacityVehiclesLarge: 20,
    bookedPassengers: 50 + (idx * 7) % 140,
    bookedVehiclesSmall: 10 + (idx * 3) % 20,
    bookedVehiclesLarge: 5 + (idx * 2) % 10,
  };
}

export default function TripPurchaseScreen() {
  const router = useRouter();
  const { tripId } = useLocalSearchParams<{ tripId: string }>();
  const trip = useMemo(() => (tripId ? getMockTrip(String(tripId)) : null), [tripId]);
  const [buying, setBuying] = useState(false);

  if (!trip) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Viagem não encontrada.</ThemedText>
      </ThemedView>
    );
  }

  function handleBuy() {
    setBuying(true);
    setTimeout(() => {
      setBuying(false);
      Alert.alert('Compra realizada', 'Sua passagem foi comprada com sucesso!');
      // Navigate to QR ticket with a fake user_trip id
      router.push(`/ticket/ut_${trip.id}`);
    }, 800);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Comprar Viagem</ThemedText>

      <View style={styles.card}>
        <Text style={styles.titleRow}>{trip.route}</Text>
        <Text style={styles.subRow}>{trip.dateISO} • {trip.time}</Text>

        <View style={styles.capacityBox}>
          <Text style={styles.capacityTitle}>Lotação</Text>
          <Text>Passageiros: {trip.bookedPassengers}/{trip.capacityPassengers}</Text>
          <Text>Veículos Pequenos: {trip.bookedVehiclesSmall}/{trip.capacityVehiclesSmall}</Text>
          <Text>Veículos Grandes: {trip.bookedVehiclesLarge}/{trip.capacityVehiclesLarge}</Text>
        </View>

        <TouchableOpacity onPress={handleBuy} disabled={buying} style={[styles.buyBtn, buying && { opacity: 0.6 }]}>
          <Text style={styles.buyBtnText}>{buying ? 'Processando...' : 'Comprar viagem'}</Text>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { marginBottom: 8 },
  card: { padding: 16, borderRadius: 12, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e7eb', gap: 12 },
  titleRow: { fontWeight: '700', fontSize: 16 },
  subRow: { color: '#6b7280' },
  capacityBox: { padding: 12, borderRadius: 8, backgroundColor: '#f9fafb', borderWidth: 1, borderColor: '#e5e7eb', gap: 4 },
  buyBtn: { marginTop: 8, paddingVertical: 12, borderRadius: 8, backgroundColor: '#0a7ea4', alignItems: 'center' },
  buyBtnText: { color: '#ffffff', fontWeight: '700' },
});


