import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Ionicons } from "@expo/vector-icons";

export function CheckinScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <View style={styles.header}>
            <Ionicons name="qr-code" size={48} color="#2563eb" />
            <Text style={styles.title}>Check-in</Text>
            <Text style={styles.subtitle}>
              Escaneie o QR code da sua passagem para fazer o check-in
            </Text>
          </View>
          <Button style={styles.scanButton}>
            <Ionicons name="camera" size={20} color="#fff" />
            <Text style={styles.scanButtonText}>Escanear QR Code</Text>
          </Button>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  content: {
    padding: 20,
  },
  card: {
    padding: 24,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1f2937",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
  scanButton: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  scanButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

