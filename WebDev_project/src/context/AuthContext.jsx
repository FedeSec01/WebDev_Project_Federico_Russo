import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Aggiungi dati di profilo di default se non presenti
    const completeUserData = {
      ...userData,
      email: userData.email || (userData.role === 'teacher' ? 'marta@accademia.it' : 'luca@studente.it'),
      telefono: userData.telefono || '',
      indirizzo: userData.indirizzo || '',
      dataNascita: userData.dataNascita || ''
    };
    setUser(completeUserData);
  };

  const logout = () => setUser(null);

  const updateProfile = (newData) => {
    return new Promise((resolve, reject) => {
      // Simula una chiamata API
      setTimeout(() => {
        try {
          // Verifica password attuale se è stata fornita una nuova password
          if (newData.newPassword) {
            // In un'app reale, dovresti verificare la password attuale con il server
            if (!newData.currentPassword) {
              reject('Password attuale richiesta');
              return;
            }
            
            // Simula verifica password (in realtà dovrebbe essere sul server)
            const correctPassword = user.role === 'teacher' ? 'prof2024' : 'studente1';
            if (newData.currentPassword !== correctPassword) {
              reject('Password attuale non corretta');
              return;
            }
          }

          // Aggiorna i dati dell'utente
          const updatedUser = {
            ...user,
            nome: newData.nome,
            email: newData.email,
            telefono: newData.telefono || user.telefono,
            indirizzo: newData.indirizzo || user.indirizzo,
            dataNascita: newData.dataNascita || user.dataNascita
          };

          // Se è stata cambiata la password, aggiorna anche quella (in realtà dovrebbe essere hashata)
          if (newData.newPassword) {
            updatedUser.password = newData.newPassword;
          }

          setUser(updatedUser);
          resolve('Profilo aggiornato con successo!');
        } catch (error) {
          reject('Errore durante l\'aggiornamento del profilo');
        }
      }, 1000); // Simula delay di rete
    });
  };

  const changePassword = (currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simula verifica password attuale
        const correctPassword = user.role === 'teacher' ? 'prof2024' : 'studente1';
        if (currentPassword !== correctPassword) {
          reject('Password attuale non corretta');
          return;
        }

        // Aggiorna password
        setUser(prev => ({
          ...prev,
          password: newPassword
        }));

        resolve('Password cambiata con successo!');
      }, 800);
    });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateProfile,
      changePassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}