import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import UserProfile from './pages/UserProfile';
import RegistroStudenti from './pages/RegistroStudenti';
import RegistroStrumenti from './pages/RegistroStrumenti';
import StoricoStrumento from './pages/StoricoStrumento';
import CalendarioCompleto from './pages/CalendarioCompleto';
import ProgrammaSvolto from './pages/ProgrammaSvolto';
import StrumentiStudente from './pages/StrumentiStudente';
import LezioniStudente from './pages/LezioniStudente';
import CompitiStudente from './pages/CompitiStudente';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {user?.role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />}
            </ProtectedRoute>
          }
        />

        {/* Profilo - Accessibile sia a docenti che studenti */}
        <Route
          path="/profilo"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        {/* Rotte per Docenti */}
        <Route
          path="/registro-studenti"
          element={
            <ProtectedRoute>
              {user?.role === 'teacher' ? <RegistroStudenti /> : <TeacherDashboard />}
            </ProtectedRoute>
          }
        />

        <Route
          path="/strumenti-assegnati"
          element={
            <ProtectedRoute>
              {user?.role === 'teacher' ? <RegistroStrumenti /> : <TeacherDashboard />}
            </ProtectedRoute>
          }
        />

        <Route
          path="/storico-strumento/:id"
          element={
            <ProtectedRoute>
              {user?.role === 'teacher' ? <StoricoStrumento /> : <TeacherDashboard />}
            </ProtectedRoute>
          }
        />

        <Route
          path="/calendario"
          element={
            <ProtectedRoute>
              {user?.role === 'teacher' ? <CalendarioCompleto /> : <TeacherDashboard />}
            </ProtectedRoute>
          }
        />

        {/* Rotte per Studenti */}
        <Route
          path="/programma-svolto"
          element={
            <ProtectedRoute>
              {user?.role === 'student' ? <ProgrammaSvolto /> : <StudentDashboard />}
            </ProtectedRoute>
          }
        />

        <Route
          path="/strumenti-studente"
          element={
            <ProtectedRoute>
              {user?.role === 'student' ? <StrumentiStudente /> : <StudentDashboard />}
            </ProtectedRoute>
          }
        />

        <Route
          path="/lezioni-studente"
          element={
            <ProtectedRoute>
              {user?.role === 'student' ? <LezioniStudente /> : <StudentDashboard />}
            </ProtectedRoute>
          }
        />

        <Route
          path="/compiti-studente"
          element={
            <ProtectedRoute>
              {user?.role === 'student' ? <CompitiStudente /> : <StudentDashboard />}
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;