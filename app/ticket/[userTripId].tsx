import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import QRCode from 'react-native-qrcode-svg';

// We will render a simple textual QR placeholder first; actual QR depends on dependency

export default function TicketQrScreen() {
  const { userTripId } = useLocalSearchParams<{ userTripId: string }>();

  const payload = useMemo(() => ({
    userTripId,
    issuedAt: new Date().toISOString(),
    type: 'ferry_ticket',
  }), [userTripId]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Ticket</ThemedText>
      <View style={styles.qrBox}>
        <QRCode value={JSON.stringify(payload)} size={200} />
      </View>
      <ThemedText style={{ marginTop: 8 }}>Apresente este QR no embarque.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  qrBox: { marginTop: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e5e7eb', padding: 16, alignItems: 'center', justifyContent: 'center', minHeight: 240 },
});


