import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function TelaLogin() {
  const router = useRouter();
  const [emailCpf, setEmailCpf] = useState("");
  const [password, setPassword] = useState("");
  const [emailCpfError, setEmailCpfError] = useState("");
  const [error, setError] = useState("");

  function isValidEmail(value: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return re.test(value);
  }

  function isValidCPF(cpf: string) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;

    const calc = (t: number) => {
      let sum = 0;
      for (let i = 0; i < t - 1; i++) sum += parseInt(cpf[i]) * (t - i);
      const d = (sum * 10) % 11;
      return d === 10 ? 0 : d;
    };
    return calc(10) === parseInt(cpf[9]) && calc(11) === parseInt(cpf[10]);
  }

  function validateEmailCpf(value: string) {
    if (!value) {
      setEmailCpfError("");
      return false;
    }

    if (value.includes("@")) {
      if (isValidEmail(value)) {
        setEmailCpfError("");
        return true;
      } else {
        setEmailCpfError("Email inválido");
        return false;
      }
    } else {
      const digits = value.replace(/\D/g, "");
      if (digits.length === 0) {
        setEmailCpfError("");
        return false;
      }
      if (digits.length !== 11) {
        setEmailCpfError("CPF deve ter 11 dígitos");
        return false;
      }
      if (!isValidCPF(digits)) {
        setEmailCpfError("CPF inválido");
        return false;
      }
      setEmailCpfError("");
      return true;
    }
  }

  function handleLogin() {
    setError("");

    if (!emailCpf.trim() || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    if (!validateEmailCpf(emailCpf)) {
      setError("Email ou CPF inválido.");
      return;
    }

    if (password.length < 6) {
      setError("Senha deve ter pelo menos 6 caracteres.");
      return;
    }

    console.log("Login attempted:", emailCpf, password);
    router.replace("/(tabs)");
  }

  const isFormValid =
    emailCpf.trim().length > 0 &&
    password.length >= 6 &&
    emailCpfError === "" &&
    validateEmailCpf(emailCpf);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>Vai de Ferry</Text>
        <Text style={styles.subtitle}>Conectando você ao seu destino</Text>
      </View>

      <View style={styles.overlayContainer}>
        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => router.push("/criar-conta/criar-conta")}
          >
            <Text style={styles.switchText}>Criar Conta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.switchButtonSelected}>
            <Text style={styles.switchTextSelected}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email ou CPF"
          placeholderTextColor="#7a8a97"
          value={emailCpf}
          onChangeText={(v) => {
            setEmailCpf(v);
            validateEmailCpf(v);
          }}
        />
        {emailCpfError ? <Text style={styles.fieldError}>{emailCpfError}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#7a8a97"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity 
          style={[styles.loginButton, !isFormValid && styles.disabledButton]}
          onPress={handleLogin}
          disabled={!isFormValid}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.footer}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F4C75", // fundo principal (pode animar para "descer")
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
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    marginHorizontal: 6,
  },
  switchButtonSelected: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderBottomWidth: 2,
    borderBottomColor: "#0F4C75",
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
  loginButton: {
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
  loginButtonText: {
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
  fieldError: {
    color: "#c0392b",
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 6,
  },
  errorText: {
    color: "#c0392b",
    textAlign: "center",
    marginBottom: 8,
  },
  disabledButton: {
    backgroundColor: "#6b8aa6",
    opacity: 0.9,
  },
})
