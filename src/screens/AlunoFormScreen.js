import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TextInput, TouchableOpacity, Text } from 'react-native';
import { auth, db } from '../config/firebase';

export default function AlunoFormScreen({ route, navigation }) {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('');
  const [loading, setLoading] = useState(false);

  const alunoEdicao = route.params?.aluno || null;

  useEffect(() => {
    if (alunoEdicao) {
      setNome(alunoEdicao.nome);
      setMatricula(alunoEdicao.matricula);
      setCurso(alunoEdicao.curso);
    }
  }, [alunoEdicao]);

  const salvarAluno = async () => {
    if (!nome || !matricula || !curso) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      if (alunoEdicao) {
        // Modo Edição
        await db.ref(`alunos/${alunoEdicao.id}`).update({ nome, matricula, curso });
        Alert.alert('Sucesso', 'Dados do aluno atualizados!');
      } else {
        // Modo Cadastro Novo
        await db.ref('alunos').push({ nome, matricula, curso });
        Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🚀 A barra preta antiga com "Novo Aluno" foi COMPLETAMENTE ELIMINADA daqui! */}

      <View style={styles.form}>
        <Text style={styles.label}>Nome do Aluno *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome completo"
          placeholderTextColor="#a0a0a0"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Matrícula *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a matrícula"
          placeholderTextColor="#a0a0a0"
          value={matricula}
          onChangeText={setMatricula}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Curso *</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do curso"
          placeholderTextColor="#a0a0a0"
          value={curso}
          onChangeText={setCurso}
        />

        <TouchableOpacity style={styles.button} onPress={salvarAluno} disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'SALVANDO...' : alunoEdicao ? 'ATUALIZAR CADASTRO' : 'SALVAR CADASTRO'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Mesmo fundo claro e limpo do protótipo
  },
  form: {
    padding: 20,
    marginTop: 10,
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
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#003366', // Azul escuro idêntico ao padrão corporativo do QualiMed
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});