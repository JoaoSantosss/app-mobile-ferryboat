import React, { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type UserTrip = {
  id: string;
  tripId: string;
  route: string;
  dateISO: string;
  time: string;
  seat: string;
};

const MOCK_USER_TRIPS: UserTrip[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `ut_${i + 1}`,
  tripId: String(i + 1),
  route: 'Terminal A → Terminal B',
  dateISO: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
  time: `${10 + (i % 6)}:00`,
  seat: `P-${100 + i}`,
}));

export default function MyTripsScreen() {
  const [selected, setSelected] = useState<UserTrip | null>(null);

  const data = useMemo(() => MOCK_USER_TRIPS, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Minhas Viagens</ThemedText>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.item} onPress={() => setSelected(item)}>
            <Text style={styles.itemTitle}>{item.route}</Text>
            <Text style={styles.itemSub}>{item.dateISO} • {item.time}</Text>
            <Text style={styles.itemMeta}>Assento: {item.seat}</Text>
          </Pressable>
        )}
        contentContainerStyle={{ gap: 12, paddingVertical: 8 }}
      />

      <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <ThemedText type="title">Detalhes da Viagem</ThemedText>
            {selected && (
              <View style={{ gap: 8 }}>
                <Text>Rota: {selected.route}</Text>
                <Text>Data: {selected.dateISO}</Text>
                <Text>Hora: {selected.time}</Text>
                <Text>Assento: {selected.seat}</Text>
              </View>
            )}
            <Pressable style={styles.modalClose} onPress={() => setSelected(null)}>
              <Text style={{ fontWeight: '700' }}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { marginBottom: 8 },
  item: { padding: 12, borderRadius: 12, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e5e7eb' },
  itemTitle: { fontWeight: '700', fontSize: 16, marginBottom: 4 },
  itemSub: { color: '#6b7280', marginBottom: 6 },
  itemMeta: { fontWeight: '600' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', alignItems: 'center', justifyContent: 'center', padding: 16 },
  modalCard: { width: '100%', borderRadius: 12, backgroundColor: '#ffffff', padding: 16, gap: 12 },
  modalClose: { marginTop: 8, alignSelf: 'flex-end', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: '#d1d5db' },
});


