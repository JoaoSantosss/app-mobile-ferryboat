import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Ionicons } from "@expo/vector-icons";

interface ProfileScreenProps {
  onLogout: () => void;
  isGuestMode?: boolean;
  onSwitchToLogin?: () => void;
}

export function ProfileScreen({ onLogout, isGuestMode = false, onSwitchToLogin }: ProfileScreenProps) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.card}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={48} color="#2563eb" />
            </View>
            <Text style={styles.name}>
              {isGuestMode ? "Convidado" : "Usuário"}
            </Text>
            {isGuestMode && (
              <Text style={styles.guestText}>
                Modo Convidado - Funcionalidades limitadas
              </Text>
            )}
          </View>

          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="person-outline" size={24} color="#6b7280" />
              <Text style={styles.menuText}>Meu Perfil</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="ticket-outline" size={24} color="#6b7280" />
              <Text style={styles.menuText}>Minhas Passagens</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Ionicons name="settings-outline" size={24} color="#6b7280" />
              <Text style={styles.menuText}>Configurações</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            {isGuestMode ? (
              <Button
                onPress={onSwitchToLogin}
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>Fazer Login</Text>
              </Button>
            ) : (
              <Button
                onPress={onLogout}
                variant="outline"
                style={styles.logoutButton}
              >
                <Text style={styles.logoutButtonText}>Sair</Text>
              </Button>
            )}
          </View>
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
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#dbeafe",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 8,
  },
  guestText: {
    fontSize: 14,
    color: "#f59e0b",
  },
  menu: {
    gap: 8,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    gap: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
  },
  loginButton: {
    marginTop: 16,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 16,
    borderColor: "#dc2626",
  },
  logoutButtonText: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "600",
  },
});

