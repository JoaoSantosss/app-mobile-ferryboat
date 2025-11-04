import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  Alert 
} from 'react-native';

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (usuario === 'admin@gmail.com' && senha === '1234567') {
      Alert.alert('Login realizado com sucesso!');
    } else {
      Alert.alert('E-mail/CPF ou senha incorretos.');
    }
  };

  return (
    <View style={styles.container}>
      {/* LOGO E NOME DO APP */}
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/295/295128.png' }} 
          style={styles.logo} 
        />
        <Text style={styles.Nomeapp}>VAI DE FERRY</Text>
      </View>

      {/* ÁREA DE LOGIN */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="E-mail ou CPF"
          value={usuario}
          onChangeText={setUsuario}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// 🎨 ESTILOS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  Nomeapp: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  link: {
    color: '#4CAF50',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 15,
  },
});
