import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TextInput, TouchableOpacity, Text, ScrollView, ActivityIndicator } from 'react-native';
import { signOut, deleteUser } from 'firebase/auth';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export default function PerfilScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const usuarioAtual = auth.currentUser;

  // READ - carrega os dados do perfil do usuário logado
  const carregarPerfil = async () => {
    if (!usuarioAtual) return;
    setLoading(true);
    try {
      const docSnap = await getDoc(doc(db, 'usuarios', usuarioAtual.uid));
      if (docSnap.exists()) {
        const dados = docSnap.data();
        setNome(dados.nome || '');
        setMatricula(dados.matricula || '');
        setEmail(dados.email || usuarioAtual.email || '');
      } else {
        setEmail(usuarioAtual.email || '');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar perfil: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPerfil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // UPDATE - salva alterações do nome/matrícula
  const salvarPerfil = async () => {
    if (!nome.trim() || !matricula.trim()) {
      Alert.alert('Erro', 'Nome e matrícula são obrigatórios.');
      return;
    }
    setSalvando(true);
    try {
      await updateDoc(doc(db, 'usuarios', usuarioAtual.uid), {
        nome,
        matricula,
      });
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar perfil: ' + error.message);
    } finally {
      setSalvando(false);
    }
  };

  // DELETE - exclui a conta e o documento de perfil do usuário
  const excluirConta = () => {
    Alert.alert(
      'Excluir conta',
      'Esta ação é permanente. Deseja realmente excluir sua conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setSalvando(true);
            try {
              await deleteDoc(doc(db, 'usuarios', usuarioAtual.uid));
              await deleteUser(usuarioAtual);
              navigation.replace('Login');
            } catch (error) {
              Alert.alert('Erro', 'Erro ao excluir conta: ' + error.message);
            } finally {
              setSalvando(false);
            }
          },
        },
      ]
    );
  };

  const sair = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0b3168" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput style={[styles.input, styles.inputDisabled]} value={email} editable={false} />

        <Text style={styles.label}>Nome *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome completo"
          placeholderTextColor="#a0a0a0"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Matrícula *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua matrícula"
          placeholderTextColor="#a0a0a0"
          value={matricula}
          onChangeText={setMatricula}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={salvarPerfil} disabled={salvando}>
          <Text style={styles.buttonText}>{salvando ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sairButton} onPress={sair} disabled={salvando}>
          <Text style={styles.sairButtonText}>SAIR DA CONTA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.excluirButton} onPress={excluirConta} disabled={salvando}>
          <Text style={styles.excluirButtonText}>EXCLUIR MINHA CONTA</Text>
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
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 55,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333333',
  },
  inputDisabled: {
    backgroundColor: '#eeeeee',
    color: '#777777',
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#0b3168',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  sairButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0b3168',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  sairButtonText: {
    color: '#0b3168',
    fontSize: 15,
    fontWeight: 'bold',
  },
  excluirButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#ff4d4d',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 30,
  },
  excluirButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
