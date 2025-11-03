import React, { useState } from "react";
import {View,Text,TextInput,StyleSheet,TouchableOpacity,KeyboardAvoidingView,Platform,ActivityIndicator,Alert,} from "react-native";

export default function Login(): JSX.Element {
const [emailOrCpf, setEmailOrCpf] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

const handleLogin = () => {
    if (!emailOrCpf.trim() || !password) {
        Alert.alert("Erro", "Preencha e-mail/CPF e senha.");
        return;
    }

    setLoading(true);
    // Simulação de requisição de login
    setTimeout(() => {
        setLoading(false);
        // Aqui você chamaria sua API e trataria resposta/erros reais
        Alert.alert("Sucesso", "Login efetuado (simulado).");
    }, 1200);
};

return (
    <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
        <View style={styles.card}>
            <Text style={styles.title}>Entrar</Text>

            <Text style={styles.label}>E-mail ou CPF</Text>
            <TextInput
                style={styles.input}
                placeholder="seu@email.com ou 000.000.000-00"
                value={emailOrCpf}
                onChangeText={setEmailOrCpf}
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
            />

            <Text style={[styles.label, { marginTop: 12 }]}>Senha</Text>
            <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                returnKeyType="done"
            />

            <TouchableOpacity
                style={[styles.button, loading ? styles.buttonDisabled : null]}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Entrar</Text>
                )}
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
screen: {
    flex: 1,
    backgroundColor: "#f6f7fb",
    justifyContent: "center",
    padding: 24,
},
card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
},
title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
},
label: {
    fontSize: 13,
    color: "#444",
    marginBottom: 6,
},
input: {
    height: 46,
    borderWidth: 1,
    borderColor: "#e2e6ef",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fbfdff",
},
button: {
    height: 48,
    backgroundColor: "#1e90ff",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
},
buttonDisabled: {
    opacity: 0.7,
},
buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
},
});