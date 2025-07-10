# 🎵 Accademia Musicale - Portale Docenti & Studenti

Questo progetto è una web app sviluppata con **React** per la gestione di una accademia musicale. È pensata per due ruoli principali:

- 👩‍🏫 **Docenti**: possono gestire lezioni, strumenti e programmi
- 👨‍🎓 **Studenti**: possono visualizzare il proprio programma, calendario lezioni, compiti e strumenti assegnati

---

## 🚀 Funzionalità principali

### 🔐 Autenticazione
- Login differenziato per docenti e studenti
- Sistema di routing protetto tramite `ProtectedRoute`

### 👩‍🏫 Dashboard Docente
- Visualizzazione delle lezioni mensili con grafico a linee
- Quattro card funzionali:
  - Registro Studenti
  - Prenotazione Aule (con EventModal)
  - Calendario Completo
  - Registro Strumenti
- Possibilità di assegnare eventi a studenti specifici

### 👨‍🎓 Dashboard Studente
- Quattro card funzionali:
  - Programma Svolto
  - Strumenti Assegnati
  - Lezioni Programmate (sincronizzate con quelle del docente)
  - Compiti da Svolgere

### 📅 Calendari (react-big-calendar)
- Eventi con gestione dinamica (orari, aule, durata)
- Viste settimanali, mensili, giornaliere
- Eventi filtrati per studente con `CalendarContext`

---

## 📁 Struttura del progetto

```
src/
├── components/          # Componenti riutilizzabili (EventModal, ProtectedRoute...)
├── context/             # AuthContext & CalendarContext
├── pages/               # Tutte le pagine di routing (login, dashboard, registri, calendari...)
├── utils/               # File mock con utenti, strumenti, lezioni, programma...
├── styles/              # Stile globale (app.css)
└── App.jsx              # Gestione delle rotte
```

---

## 🧪 Utenti Mock (login)

```js
// Teacher
username: marta
password: prof2024

// Student
username: luca
password: studente1
```

---

## 🛠️ Tech stack

- React + Vite
- React Router DOM
- React Big Calendar + Moment
- Bootstrap + Flexbox
- Context API per stato globale (Auth e Calendar)

---

## 📦 Avvio del progetto

```bash
npm install
npm run dev
```

---

## 📌 Note

- I dati sono simulati tramite file `mock*.js`
- Il progetto è pensato per una futura integrazione con un **database PostgreSQL** e un backend API
- L’interfaccia è stata costruita con uno stile ispirato a Netflix/Disney+: sfumature scure, effetti vetro (glassmorphism), layout responsivo

---

## 💡 Espansioni future

- Modifica ed eliminazione eventi
- Upload materiali didattici per studenti
- Statistiche di progresso
- Notifiche in tempo reale

---

