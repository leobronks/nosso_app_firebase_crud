# Avalia+ 

Fala, professor! Este é o **Avalia+**, o nosso aplicativo mobile desenvolvido para a disciplina de **Engenharia de Aplicações Móveis** do curso de Ciência da Computação da PUC Minas. 

O foco principal do app é resolver um problema prático do dia a dia de gerenciamento corporativo: o controle, listagem e cadastro de colaboradores dentro de uma área administrativa.

---

## O que o app faz? (Funcionalidades)

Montamos um fluxo completo de interface que conta com:
* **Área de Acesso:** Tela de login limpa para a entrada na Área Administrativa corporativa.
* **Painel Geral (Read):** Listagem dinâmica que exibe os colaboradores cadastrados em formato de cards.
* **Inclusão (Create):** Tela de formulário dedicada para adicionar novos colaboradores (recolhendo nome, matrícula e curso).
* **Atualização (Update):** Sistema de edição integrada para corrigir dados de qualquer colaborador diretamente pela lista.
* **Remoção (Delete):** Mecanismo assíncrono para dar baixa ou excluir um registro da listagem.

---

## Tecnologias e Arquitetura

O projeto foi construído utilizando o ecossistema moderno do desenvolvimento híbrido:
* **React Native & Expo (SDK mais recente):** Para garantir uma interface fluida, nativa e com navegação estruturada via `React Navigation`.
* **Persistência de Dados (Mock de Alta Fidelidade):** Durante os testes de homologação, identificamos uma incompatibilidade crítica de arquitetura entre as diretivas locais de segurança do Android e as chamadas legadas do Firebase v8 no ecossistema do Expo Go. 
  Para contornar o problema de ambiente sem travar o desenvolvimento, adotamos o padrão de engenharia **Mock Service**. Desenvolvemos uma simulação completa de banco de dados rodando em memória local no arquivo `src/config/firebase.js`. Isso permitiu manter o ciclo de vida dos componentes, Hooks e as respostas assíncronas do CRUD rodando perfeitamente e sem travamentos.

---

## Integrantes do Grupo
* Leonardo Gabriel de Moraes Carvalho
* Luiz Gustavo Julio Salles
* Vinicius Azevedo de Ávila
  

---
*Desenvolvido com dedicação (e algumas xícaras de café na madrugada) no 5º período - 2026.*
