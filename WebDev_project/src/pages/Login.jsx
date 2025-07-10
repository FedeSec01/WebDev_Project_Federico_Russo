import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fakeLogin } from '../utils/fakeAuth';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaLock, FaMusic, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../styles/app.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const user = await fakeLogin(username, password);
      login(user);
      
      // Animazione di successo
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      alert(err);
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-background min-vh-100 d-flex align-items-center justify-content-center">
      <div className="bg-animation"></div>
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">
            {/* Login Card */}
            <div className="modern-glass-card fade-in" style={{ padding: '3rem 2rem' }}>
              {/* Logo e Titolo */}
              <div className="text-center mb-5">
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #71b280, #4a9d8e)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  fontSize: '2rem',
                  color: 'white',
                  boxShadow: '0 10px 30px rgba(113, 178, 128, 0.3)',
                  animation: 'pulse 3s ease-in-out infinite'
                }}>
                  <FaMusic />
                </div>
                <h2 style={{ 
                  color: 'white', 
                  fontWeight: '700',
                  fontSize: '2rem',
                  marginBottom: '0.5rem'
                }}>
                  Accademia Musicale
                </h2>
                <p style={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: '1rem',
                  marginBottom: '0'
                }}>
                  Accedi alla tua area personale
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="position-relative">
                    <FaUser style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '1rem'
                    }} />
                    <input
                      type="text"
                      className="modern-form-control"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{ paddingLeft: '3rem' }}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="position-relative">
                    <FaLock style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '1rem'
                    }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="modern-form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                      required
                    />
                    <button
                      type="button"
                      style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="modern-btn-primary w-100 d-flex align-items-center justify-content-center"
                  style={{ 
                    padding: '1rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginRight: '0.5rem'
                      }}></div>
                      Accesso in corso...
                    </>
                  ) : (
                    'Accedi'
                  )}
                </button>
              </form>
            </div>

            {/* Info Card sotto il login */}
            <div className="modern-glass-card mt-3 text-center slide-up" style={{ 
              padding: '1.5rem',
              animationDelay: '0.2s'
            }}>
              <p style={{ 
                color: 'rgba(255,255,255,0.8)', 
                fontSize: '0.9rem',
                marginBottom: '0'
              }}>
                🎵 Benvenuto nell'Accademia Musicale digitale
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes per animazioni */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Login;