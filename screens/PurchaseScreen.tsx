import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

interface PurchaseScreenProps {
  initialOrigin?: string;
  isGuestMode?: boolean;
  onSwitchToLogin?: () => void;
}

export function PurchaseScreen({ initialOrigin, isGuestMode = false, onSwitchToLogin }: PurchaseScreenProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <Text style={styles.title}>Tela de Compra</Text>
          <Text style={styles.subtitle}>
            Esta tela precisa ser implementada completamente.
          </Text>
          {isGuestMode && (
            <Button
              onPress={onSwitchToLogin}
              style={styles.loginButton}
            >
              <Text style={styles.loginButtonText}>Fazer Login para Comprar</Text>
            </Button>
          )}
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
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

