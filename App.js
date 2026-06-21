import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native'; 

import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import PerfilScreen from './src/screens/PerfilScreen';
import AlunoListScreen from './src/screens/AlunoListScreen';
import AlunoFormScreen from './src/screens/AlunoFormScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0b3168',
          },
          headerTintColor: '#ffffff', 
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ title: 'Criar Conta' }} 
        />
        <Stack.Screen
          name="Main"
          component={AlunoListScreen}
          options={({ navigation }) => ({
            title: 'Alunos',
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Perfil')}
                style={{ marginLeft: 15, padding: 5 }}
              >
                <Text style={{ color: '#ffffff', fontSize: 14, fontWeight: 'bold' }}>Perfil</Text>
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('AlunoForm')}
                style={{ marginRight: 15, padding: 5 }}
              >
                <Text style={{ color: '#ffffff', fontSize: 28, fontWeight: 'bold' }}>+</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="AlunoForm"
          component={AlunoFormScreen}
          options={{ title: 'Cadastro de Aluno' }}
        />
        <Stack.Screen 
          name="Perfil" 
          component={PerfilScreen} 
          options={{ title: 'Meu Perfil' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}