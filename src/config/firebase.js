// 🚀 Simulador Universal com Atualização Forçada de Exclusão e Edição
const mockStorage = {};
const listeners = {};

export const db = {
  ref: (path) => {
    if (!mockStorage[path]) {
      mockStorage[path] = {
        "id_1": { nome: "Leonardo Carvalho", cargo: "Desenvolvedor", email: "leo@puc.br", matricula: "961544" }
      };
    }

    // Função interna para forçar o refresh visual imediato na tela
    const forceRefresh = (basePath) => {
      if (listeners[basePath]) {
        listeners[basePath]({
          val: () => mockStorage[basePath] || {},
          forEach: (childCallback) => {
            const currentData = mockStorage[basePath] || {};
            Object.keys(currentData).forEach((key) => {
              childCallback({
                key: key,
                val: () => currentData[key]
              });
            });
          }
        });
      }
    };

    return {
      on: (event, callback) => {
        listeners[path] = callback;
        
        const triggerUpdate = () => {
          const currentData = mockStorage[path] || {};
          callback({
            val: () => currentData,
            forEach: (childCallback) => {
              Object.keys(currentData).forEach((key) => {
                childCallback({
                  key: key,
                  val: () => currentData[key]
                });
              });
            }
          });
        };
        
        triggerUpdate();
      },
      push: (data) => {
        const id = "id_" + Math.random().toString(36).substring(7);
        mockStorage[path][id] = data;
        forceRefresh(path);
        return Promise.resolve();
      },
      update: (data) => {
        const parts = path.split('/');
        if (parts.length > 1) {
          const basePath = parts[0];
          const id = parts[1];
          if (mockStorage[basePath] && mockStorage[basePath][id]) {
            mockStorage[basePath][id] = { ...mockStorage[basePath][id], ...data };
            forceRefresh(basePath);
          }
        }
        return Promise.resolve();
      },
      set: (data) => {
        const parts = path.split('/');
        if (parts.length > 1 && data === null) {
          const basePath = parts[0];
          const id = parts[1];
          if (mockStorage[basePath]) {
            delete mockStorage[basePath][id];
            forceRefresh(basePath); // 🔥 Avisa a tela de listagem na mesma hora!
          }
        }
        return Promise.resolve();
      },
      remove: () => {
        const parts = path.split('/');
        if (parts.length > 1) {
          const basePath = parts[0];
          const id = parts[1];
          if (mockStorage[basePath]) {
            delete mockStorage[basePath][id];
            forceRefresh(basePath); // 🔥 Avisa a tela de listagem na mesma hora!
          }
        }
        return Promise.resolve();
      }
    };
  }
};

export const auth = {
  signInWithEmailAndPassword: (email, password) => Promise.resolve({ user: { email } }),
  createUserWithEmailAndPassword: (email, password) => Promise.resolve({ user: { email } }),
  signOut: () => Promise.resolve(),
  currentUser: { email: 'professor@pucminas.br' }
};

const firebaseMock = {
  auth: () => auth,
  database: () => db,
};

export { firebaseMock as default };

