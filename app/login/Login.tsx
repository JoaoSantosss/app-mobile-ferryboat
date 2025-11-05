import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function TelaLogin() {
  const router = useRouter();
  const [emailCpf, setEmailCpf] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    console.log("Login attempted:", emailCpf, password);
    router.replace("/(tabs)");
    // depois chamar a API

//     async function handleLogin() {
//   const response = await fetch("http://BACKEND/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ emailCpf, password }),
//   });

//   const data = await response.json();

//   if (data.authenticated) {
//     router.push("/trips");
//   } else {
//     alert("Credenciais inválidas");
//   }
// }
  }

  return (
    <View style={styles.container}>
      
      {/* Logo / Nome do app */}
      <Text style={styles.logo}>FerryBoat</Text>
      <Text style={styles.subtitle}>Conectando você ao seu destino</Text>

      {/* Alternadores (Criar Conta / Entrar) */}
      <View style={styles.switchContainer}>
        <TouchableOpacity
          style={[styles.switchButton]}
          onPress={() => router.push("/create-account")}
        >
          <Text style={styles.switchText}>Criar Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.switchButtonSelected]}>
          <Text style={styles.switchTextSelected}>Entrar</Text>
        </TouchableOpacity>
      </View>

      {/* Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Email ou CPF"
        value={emailCpf}
        onChangeText={setEmailCpf}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Botão Entrar */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Rodapé */}
      <Text style={styles.footer}>
        Esqueceu a senha? Contate o suporte.
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 40,
    color: "#555",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  switchButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  switchButtonSelected: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#007aff",
  },
  switchText: {
    color: "#999",
    fontSize: 16,
  },
  switchTextSelected: {
    color: "#007aff",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: "#007aff",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
