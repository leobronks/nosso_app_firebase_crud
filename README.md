# Avalia+ Mobile

Aplicativo mobile desenvolvido para a disciplina de Engenharia de Aplicações Móveis (PUC Minas), integrado ao projeto QualiMed/Avalia+.

## Funcionalidades

* **Login** — autenticação real via Firebase Authentication (e-mail/senha).
* **Cadastro de usuário** — criação de conta (Firebase Authentication + Firestore).
* **Perfil** — CRUD completo do próprio usuário (ler, atualizar dados, excluir conta, sair).
* **Alunos** — CRUD completo de alunos/residentes (criar, listar, editar, excluir), persistido no Firestore.

## Tecnologias

* React Native + Expo
* React Navigation (stack)
* Firebase (Authentication + Firestore), com persistência de sessão via AsyncStorage no app nativo

## Como rodar

```
npm install
npx expo start
```

Escaneie o QR Code com o app Expo Go (Android/iOS).

## Integrantes

* Leonardo Gabriel de Moraes Carvalho
* Luiz Gustavo Julio Salles
