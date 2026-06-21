import React, { useState } from 'react';
import { View, StyleSheet, Alert, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const validarFormulario = () => {
    if (!nome.trim() || !matricula.trim() || !email.trim() || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return false;
    }
    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.');
      return false;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return false;
    }
    return true;
  };

  const handleCadastro = async () => {
    if (!validarFormulario()) return;

    setLoading(true);
    try {
      // 1. Cria o usuário no Firebase Authentication
      const credenciais = await createUserWithEmailAndPassword(auth, email, senha);

      // 2. Cria o documento de perfil correspondente no Firestore
      await setDoc(doc(db, 'usuarios', credenciais.user.uid), {
        nome,
        matricula,
        email,
        papel: 'usuario',
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Erro ao cadastrar', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.logoText}>Avalia+</Text>
        <Text style={styles.subTitle}>Criar Conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#a0a0a0"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Matrícula"
          placeholderTextColor="#a0a0a0"
          value={matricula}
          onChangeText={setMatricula}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#a0a0a0"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha (mín. 6 caracteres)"
          placeholderTextColor="#a0a0a0"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          placeholderTextColor="#a0a0a0"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'CADASTRANDO...' : 'Cadastrar'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.voltarLink} onPress={() => navigation.goBack()}>
          <Text style={styles.voltarLinkText}>Já tem conta? Entrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoText: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#0b3168',
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  subTitle: {
    fontSize: 18,
    color: '#555555',
    marginBottom: 30,
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
  voltarLink: {
    marginTop: 20,
    padding: 10,
  },
  voltarLinkText: {
    color: '#0b3168',
    fontSize: 15,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
