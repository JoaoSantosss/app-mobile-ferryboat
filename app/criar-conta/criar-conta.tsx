import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function CreateAccountScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [emailCpf, setEmailCpf] = useState("");
  const [password, setPassword] = useState("");

  function handleCreateAccount() {
    console.log("Criar conta:", { name, emailCpf, password });
    // futuramente chamar API aqui
    router.replace("/login/Login");
  }

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>Vai de Ferry</Text>
        <Text style={styles.subtitle}>Conectando você ao seu destino</Text>
      </View>

      <View style={styles.overlayContainer}>
        <View style={styles.switchContainer}>
          <TouchableOpacity style={styles.switchButton}>
            <Text style={styles.switchTextSelected}>Criar Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => router.push("/login/Login")}
          >
            <Text style={styles.switchText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#7a8a97"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email ou CPF"
          placeholderTextColor="#7a8a97"
          value={emailCpf}
          onChangeText={setEmailCpf}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#7a8a97"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.primaryButton} onPress={handleCreateAccount}>
          <Text style={styles.primaryButtonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login/Login")}>
          <Text style={styles.footer}>Já possui conta? Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F4C75",
  },
  hero: {
    paddingTop: 80,
    paddingBottom: 24,
    alignItems: "center",
  },
  logo: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: "rgba(255,255,255,0.85)",
    marginTop: 6,
    fontSize: 14,
  },
  overlayContainer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.98)",
    marginTop: -10,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingVertical: 28,
    paddingHorizontal: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 8,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 18,
    alignItems: "center",
  },
  switchButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginHorizontal: 6,
  },
  switchText: {
    color: "#8b98a6",
    fontSize: 16,
  },
  switchTextSelected: {
    color: "#0F4C75",
    fontSize: 16,
    fontWeight: "700",
  },
  input: {
    backgroundColor: "#f6fbff",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e6f0fa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: "#0F4C75",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  footer: {
    textAlign: "center",
    marginTop: 18,
    color: "#6d7b86",
    fontSize: 14,
  },
});