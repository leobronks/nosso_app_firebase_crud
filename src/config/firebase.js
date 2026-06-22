// Configuração real do Firebase (Firestore + Authentication)
// Pacote instalado: npm install firebase (versão 12+)
// Usamos a API modular (firebase/app, firebase/auth, firebase/firestore),
// que é a forma oficialmente suportada pelo Expo/Expo Go hoje.
import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Credenciais do projeto Firebase (avalia-plus-mobile)
const firebaseConfig = {
  apiKey: "AIzaSyAJ_jDvm02ppjFmloAEW7eJFXO62UCKPZk",
  authDomain: "avalia-plus-mobile.firebaseapp.com",
  projectId: "avalia-plus-mobile",
  storageBucket: "avalia-plus-mobile.firebasestorage.app",
  messagingSenderId: "1090267567734",
  appId: "1:1090267567734:web:1a61f0b43cd8e8a73ef157",
};

const app = initializeApp(firebaseConfig);

// No nativo (Android/iOS via Expo Go), o Auth precisa de uma persistência
// explícita baseada em AsyncStorage. Sem isso o SDK não consegue manter a
// sessão e o fluxo de login/cadastro falha silenciosamente no app nativo,
// mesmo funcionando no preview web (que usa localStorage do navegador).
export const auth =
  Platform.OS === 'web'
    ? getAuth(app)
    : initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });

export const db = getFirestore(app);
export default app;

