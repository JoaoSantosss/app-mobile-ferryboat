import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import Animated, { FadeInDown } from "react-native-reanimated";

interface LoginScreenProps {
  onLogin: () => void;
  onGuestLogin?: () => void;
}

export function LoginScreen({ onLogin, onGuestLogin }: LoginScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1");
    }
    return cpf;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
    }
    return phone;
  };

  const handleSubmit = () => {
    console.log(isLogin ? "Login" : "Cadastro", { 
      email, 
      password, 
      name, 
      cpf, 
      birthDate, 
      phone 
    });
    onLogin();
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setName("");
    setConfirmPassword("");
    setCpf("");
    setBirthDate("");
    setPhone("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={["#2563eb", "#3b82f6"]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Animated.View
            entering={FadeInDown.duration(500)}
            style={styles.iconContainer}
          >
            <Ionicons name="boat" size={40} color="#2563eb" />
          </Animated.View>
          <Animated.Text
            entering={FadeInDown.duration(500).delay(200)}
            style={styles.title}
          >
            Vai de Ferry
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.duration(500).delay(300)}
            style={styles.subtitle}
          >
            {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
          </Animated.Text>
        </View>
      </LinearGradient>

      <View style={styles.formContainer}>
        <Animated.View entering={FadeInDown.duration(500).delay(400)}>
          <Card style={styles.card}>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[styles.toggleButton, isLogin && styles.toggleButtonActive]}
                onPress={() => !isLogin && toggleMode()}
              >
                <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>
                  Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.toggleButton, !isLogin && styles.toggleButtonActive]}
                onPress={() => isLogin && toggleMode()}
              >
                <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>
                  Cadastro
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.form}>
              {!isLogin && (
                <View style={styles.field}>
                  <Label>Nome Completo</Label>
                  <View style={styles.inputContainer}>
                    <Ionicons name="person" size={20} color="#9ca3af" style={styles.inputIcon} />
                    <Input
                      placeholder="Digite seu nome completo"
                      value={name}
                      onChangeText={setName}
                      style={styles.inputWithIcon}
                    />
                  </View>
                </View>
              )}

              {!isLogin && (
                <View style={styles.field}>
                  <Label>CPF</Label>
                  <View style={styles.inputContainer}>
                    <Ionicons name="card" size={20} color="#9ca3af" style={styles.inputIcon} />
                    <Input
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChangeText={(text) => setCpf(formatCPF(text))}
                      style={styles.inputWithIcon}
                      maxLength={14}
                    />
                  </View>
                </View>
              )}

              {!isLogin && (
                <View style={styles.field}>
                  <Label>Data de Nascimento</Label>
                  <View style={styles.inputContainer}>
                    <Ionicons name="calendar" size={20} color="#9ca3af" style={styles.inputIcon} />
                    <Input
                      placeholder="DD/MM/AAAA"
                      value={birthDate}
                      onChangeText={setBirthDate}
                      style={styles.inputWithIcon}
                    />
                  </View>
                </View>
              )}

              {!isLogin && (
                <View style={styles.field}>
                  <Label>Telefone</Label>
                  <View style={styles.inputContainer}>
                    <Ionicons name="call" size={20} color="#9ca3af" style={styles.inputIcon} />
                    <Input
                      placeholder="(00) 00000-0000"
                      value={phone}
                      onChangeText={(text) => setPhone(formatPhone(text))}
                      style={styles.inputWithIcon}
                      maxLength={15}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>
              )}

              <View style={styles.field}>
                <Label>E-mail</Label>
                <View style={styles.inputContainer}>
                  <Ionicons name="mail" size={20} color="#9ca3af" style={styles.inputIcon} />
                  <Input
                    placeholder="seu@email.com"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.inputWithIcon}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.field}>
                <Label>Senha</Label>
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed" size={20} color="#9ca3af" style={styles.inputIcon} />
                  <Input
                    placeholder="Digite sua senha"
                    value={password}
                    onChangeText={setPassword}
                    style={styles.inputWithIcon}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off" : "eye"} 
                      size={20} 
                      color="#9ca3af" 
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {!isLogin && (
                <View style={styles.field}>
                  <Label>Confirmar Senha</Label>
                  <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed" size={20} color="#9ca3af" style={styles.inputIcon} />
                    <Input
                      placeholder="Confirme sua senha"
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                      style={styles.inputWithIcon}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={styles.eyeButton}
                    >
                      <Ionicons 
                        name={showConfirmPassword ? "eye-off" : "eye"} 
                        size={20} 
                        color="#9ca3af" 
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {isLogin && (
                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              )}

              <Button onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>
                  {isLogin ? "Entrar" : "Criar Conta"}
                </Text>
              </Button>

              {onGuestLogin && (
                <Button
                  onPress={onGuestLogin}
                  variant="outline"
                  style={styles.guestButton}
                >
                  <Ionicons name="person-outline" size={16} color="#6b7280" />
                  <Text style={styles.guestButtonText}>Entrar como Convidado</Text>
                </Button>
              )}
            </View>
          </Card>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dbeafe",
  },
  header: {
    paddingTop: 64,
    paddingBottom: 128,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    maxWidth: 400,
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#bfdbfe",
  },
  formContainer: {
    maxWidth: 400,
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 24,
    marginTop: -80,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  toggleContainer: {
    flexDirection: "row",
    gap: 8,
    backgroundColor: "#dbeafe",
    padding: 4,
    borderRadius: 12,
    marginBottom: 24,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#2563eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: 16,
    color: "#6b7280",
    fontWeight: "600",
  },
  toggleTextActive: {
    color: "#fff",
  },
  form: {
    gap: 16,
  },
  field: {
    gap: 8,
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: 12,
    zIndex: 1,
  },
  inputWithIcon: {
    paddingLeft: 44,
  },
  eyeButton: {
    position: "absolute",
    right: 12,
    zIndex: 1,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -8,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#2563eb",
  },
  submitButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#2563eb",
    borderRadius: 16,
    marginTop: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  guestButton: {
    width: "100%",
    height: 48,
    borderWidth: 2,
    borderColor: "#d1d5db",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 16,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  guestButtonText: {
    color: "#6b7280",
    fontSize: 16,
    fontWeight: "600",
  },
});

