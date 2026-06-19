import 'react-native-gesture-handler'; // 🚀 IMPORTANTE: Precisa ser a primeira linha do app!
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text } from 'react-native'; 

import LoginScreen from './src/screens/LoginScreen';
import AlunoListScreen from './src/screens/AlunoListScreen';
import AlunoFormScreen from './src/screens/AlunoFormScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0b3168', // 🎨 Azul oficial do Avalia+
          },
          headerTintColor: '#ffffff', 
          headerTitleAlign: 'center',
        }}
      >
        {/* Tela de Login */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        
        {/* Tela de Listagem */}
        <Stack.Screen 
          name="Main" 
          component={AlunoListScreen} 
          options={({ navigation }) => ({ 
            title: 'Avalia+     Colaboradores', 
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
        
        {/* Tela de Cadastro */}
        <Stack.Screen 
          name="AlunoForm" 
          component={AlunoFormScreen} 
          options={{ title: 'Cadastro de Colaborador' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}