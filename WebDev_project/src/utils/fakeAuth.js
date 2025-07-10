import { users } from './mockUsers';

export function fakeLogin(username, password) {
  return new Promise((resolve, reject) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    setTimeout(() => {
      user ? resolve(user) : reject('Credenziali non valide');
    }, 500);
  });
}
