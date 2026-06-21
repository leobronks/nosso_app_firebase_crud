import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function AlunoListScreen({ navigation }) {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(false);

  const carregarAlunos = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'alunos'));
      const alunosData = [];
      querySnapshot.forEach((docSnap) => {
        alunosData.push({ id: docSnap.id, ...docSnap.data() });
      });
      setAlunos(alunosData);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar alunos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarAlunos();
    const unsubscribe = navigation.addListener('focus', () => {
      carregarAlunos();
    });
    return unsubscribe;
  }, [navigation]);

  const excluirAluno = (id, nome) => {
    Alert.alert(
      'Confirmar exclusão',
      `Deseja mesmo excluir o aluno ${nome}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'alunos', id));
              await carregarAlunos();
              Alert.alert('Sucesso', 'Aluno removido com sucesso!');
            } catch (error) {
              Alert.alert('Erro', 'Erro ao remover: ' + error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 30 }} color="#0b3168" />
        ) : alunos.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum aluno cadastrado.</Text>
        ) : (
          alunos.map((aluno) => (
            <View key={aluno.id} style={styles.card}>
              <Text style={styles.cardTitle}>{aluno.nome}</Text>

              <Text style={styles.cardText}>Matrícula: {aluno.matricula}</Text>
              <Text style={styles.cardText}>Curso: {aluno.curso}</Text>
              <Text style={styles.cardText}>Período: {aluno.periodo}</Text>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.btnEditar}
                  onPress={() => navigation.navigate('AlunoForm', { aluno })}
                >
                  <Text style={styles.btnTextEditar}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnExcluir}
                  onPress={() => excluirAluno(aluno.id, aluno.nome)}
                >
                  <Text style={styles.btnTextExcluir}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f6fa',
  },
  scrollView: {
    flex: 1,
    overflowY: 'scroll',
  },
  contentContainer: {
    padding: 12,
    paddingBottom: 60,
  },
  card: {
    marginBottom: 10,
    backgroundColor: '#4a5568',
    borderRadius: 10,
    elevation: 2,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cardTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22,
  },
  cardText: {
    color: '#e2e8f0',
    fontSize: 13,
    marginTop: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btnEditar: {
    flex: 1,
    height: 32,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  btnTextEditar: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  btnExcluir: {
    flex: 1,
    height: 32,
    backgroundColor: '#ff4d4d',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  btnTextExcluir: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
    fontSize: 16,
  },
});
