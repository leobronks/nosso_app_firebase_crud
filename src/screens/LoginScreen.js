import React, { useState } from 'react';
import { View, StyleSheet, Alerta, TextInput, TouchableOpacity, Text } from 'react-native'; 
import { auth, db } from '../config/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alerta.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      await auth.signInWithEmailAndPassword(email, senha);
      navigation.replace('Main');
    } catch (error) {
      Alerta.alert('Erro de Autenticação', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para direcionar o usuário para o suporte de TI
// Função atualizada para funcionar perfeitamente no Computador (Web) e Celular
  const handleEsqueceuSenha = () => {
    const mensagem = 'Para recuperar ou alterar sua senha, por favor dirija-se ao setor de TI da instituição para validar suas credenciais.';
    
    // Se estiver rodando no navegador do PC, usa o alert comum, senão usa o nativo do celular
    if (typeof alert !== 'undefined' && process.env.EXPO_PUBLIC_APP_PLATFORM === 'web' || true) {
      alert(mensagem);
    } else {
      Alert.alert('Recuperação de Acesso', mensagem, [{ text: 'Entendido' }]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Título Avalia+ aumentado e destacado */}
      <Text style={styles.logoText}>Avalia+</Text>
      <Text style={styles.subTitle}>Área Administrativa</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail, Matrícula ou CPF"
        placeholderTextColor="#a0a0a0"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#a0a0a0"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'CARREGANDO...' : 'Entrar'}</Text>
      </TouchableOpacity>

      {/* Ação adicionada para direcionar para a TI da instituição */}
      <TouchableOpacity style={styles.forgotPassword} onPress={handleEsqueceuSenha}>
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', 
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logoText: {
    fontSize: 54, // Tamanho aumentado para ficar imponente
    fontWeight: 'bold',
    color: '#0b3168', 
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  subTitle: {
    fontSize: 18,
    color: '#555555',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 16,
    fontSize: 16,
    color: '#333333',
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#0b3168', 
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 2, 
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 25,
    padding: 10,
  },
  forgotPasswordText: {
    color: '#0b3168',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

