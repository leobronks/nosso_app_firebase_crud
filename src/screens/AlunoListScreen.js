import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity, Text } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { auth, db } from '../config/firebase';

export default function AlunoListScreen({ navigation }) {
  const [colaboradores, setColaboradores] = useState([]);
  const [loading, setLoading] = useState(false);

  const carregarColaboradores = () => {
    setLoading(true);
    try {
      const colaboradoresRef = db.ref('alunos'); 
      colaboradoresRef.on('value', (snapshot) => {
        const colaboradoresData = [];
        snapshot.forEach((childSnapshot) => {
          colaboradoresData.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        setColaboradores(colaboradoresData);
        setLoading(false);
      });
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar colaboradores: ' + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarColaboradores();
    return () => db.ref('alunos').off();
  }, []);

  const excluirColaborador = (id, nome) => {
    const confirmar = confirm(`Deseja mesmo excluir o colaborador ${nome}?`);
    if (confirmar) {
      try {
        db.ref(`alunos/${id}`).remove();
        alert('Colaborador removido com sucesso!');
      } catch (error) {
        alert('Erro ao remover: ' + error.message);
      }
    }
  };

  return (
    // 🔲 Forçamos a View principal a ocupar estritamente 100% da altura da tela do navegador
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={true}
      >
        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 30 }} color="#0b3168" />
        ) : colaboradores.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum colaborador cadastrado.</Text>
        ) : (
          colaboradores.map((colaborador) => (
            <Card key={colaborador.id} style={styles.card}>
              {/* 🔍 Reduzido o padding interno do card para achatar o retângulo */}
              <Card.Content style={styles.cardContent}>
                <Title style={styles.cardTitle}>{colaborador.nome}</Title>
                
                <Paragraph style={styles.cardText}>Identificação/Matrícula: {colaborador.matricula}</Paragraph>
                <Paragraph style={styles.cardText}>Setor/Curso: {colaborador.curso}</Paragraph>
                
                <View style={styles.actions}>
                  <TouchableOpacity 
                    style={styles.btnEditar} 
                    onPress={() => navigation.navigate('AlunoForm', { aluno: colaborador })}
                  >
                    <Text style={styles.btnTextEditar}>✏️ Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.btnExcluir} 
                    onPress={() => excluirColaborador(colaborador.id, colaborador.nome)}
                  >
                    <Text style={styles.btnTextExcluir}>🗑️ Excluir</Text>
                  </TouchableOpacity>
                </View>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    position: 'absolute', // Força o travamento nas dimensões do F12
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f5f6fa',
  },
  scrollView: {
    flex: 1,
    // @ts-ignore: Propriedade para garantir que os navegadores Web liberem a rolagem do mouse
    overflowY: 'scroll', 
  },
  contentContainer: { 
    padding: 12,
    paddingBottom: 60 // Espaço de folga reforçado no fim da página
  },
  card: { 
    marginBottom: 10, // Menos espaço entre os cards
    backgroundColor: '#4a5568', 
    borderRadius: 10,
    elevation: 2,
  },
  cardContent: {
    paddingHorizontal: 12, // Padding reduzido nas laterais
    paddingVertical: 8,    // Padding reduzido verticalmente para achatar o retângulo cinza
  },
  cardTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18, // Letra do nome menor e mais discreta
    lineHeight: 22,
  },
  cardText: {
    color: '#e2e8f0',
    fontSize: 13, // Reduzido o texto dos dados de 15 para 13
    marginTop: 1, // Colado no título
  },
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10 // Aproximou os botões do texto
  },
  btnEditar: { 
    flex: 1, 
    height: 32, // Botão bem mais magro (era 38)
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
    height: 32, // Botão bem mais magro (era 38)
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
    fontSize: 16 
  }
});