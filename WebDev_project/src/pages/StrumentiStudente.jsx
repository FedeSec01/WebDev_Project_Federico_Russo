import { strumentiStudente } from '../utils/mockStrumentiStudente';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaGuitar, FaCalendarAlt, FaEuroSign, FaBarcode, FaMusic } from 'react-icons/fa';
import '../styles/app.css';

function StrumentiStudente() {
  const navigate = useNavigate();

  const getStatusColor = (dataRientro) => {
    const oggi = new Date();
    const rientro = new Date(dataRientro);
    const diffTime = rientro.getTime() - oggi.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) return '#ff6b6b'; // Rosso - scadenza vicina
    if (diffDays < 30) return '#feca57'; // Giallo - attenzione
    return '#71b280'; // Verde - tutto ok
  };

  const getDaysRemaining = (dataRientro) => {
    const oggi = new Date();
    const rientro = new Date(dataRientro);
    const diffTime = rientro.getTime() - oggi.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="dashboard-background min-vh-100">
      <div className="bg-animation"></div>
      
      {/* Header Moderno */}
      <header className="modern-header fade-in">
        <div className="header-content">
          <div className="modern-logo">
            <div className="logo-icon">
              <FaMusic />
            </div>
            <span>Accademia Musicale</span>
          </div>
          <div className="user-section">
            <button className="modern-btn-secondary d-flex align-items-center" onClick={() => navigate('/dashboard')}>
              <FaArrowLeft className="me-2" />
              Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="container-fluid py-4">
        {/* Page Header */}
        <div className="modern-welcome-section slide-up mb-4">
          <div className="welcome-content">
            <h1 className="modern-welcome-title d-flex align-items-center justify-content-center">
              <FaGuitar className="me-3" />
              I Tuoi Strumenti
            </h1>
            <p className="modern-welcome-subtitle">
              Qui puoi visualizzare tutti gli strumenti che hai attualmente in prestito, 
              con le relative scadenze e informazioni di cauzione.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            {strumentiStudente.length > 0 ? (
              <div className="row g-4">
                {strumentiStudente.map((strumento, idx) => {
                  const daysRemaining = getDaysRemaining(strumento.dataRientro);
                  const statusColor = getStatusColor(strumento.dataRientro);
                  
                  return (
                    <div key={idx} className="col-12 col-md-6 col-lg-4">
                      <div className="modern-glass-card slide-up h-100" style={{ 
                        animationDelay: `${0.1 * idx}s`,
                        cursor: 'default'
                      }}>
                        {/* Status Indicator */}
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div style={{
                            background: `linear-gradient(135deg, ${statusColor}, ${statusColor}dd)`,
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: 'white'
                          }}>
                            {daysRemaining > 0 ? `${daysRemaining} giorni` : 'Scaduto'}
                          </div>
                          <FaGuitar style={{ 
                            fontSize: '2rem', 
                            color: 'rgba(255,255,255,0.3)' 
                          }} />
                        </div>

                        {/* Strumento Info */}
                        <h4 className="modern-card-title mb-3">
                          {strumento.nome}
                        </h4>

                        {/* Details */}
                        <div className="space-y-3">
                          <div className="d-flex align-items-center mb-2">
                            <FaBarcode className="me-2" style={{ color: '#71b280', fontSize: '0.9rem' }} />
                            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                              Codice: <strong style={{ color: 'white' }}>{strumento.codice}</strong>
                            </span>
                          </div>

                          <div className="d-flex align-items-center mb-2">
                            <FaCalendarAlt className="me-2" style={{ color: '#71b280', fontSize: '0.9rem' }} />
                            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                              Prestito: <strong style={{ color: 'white' }}>{strumento.dataPrestito}</strong>
                            </span>
                          </div>

                          <div className="d-flex align-items-center mb-2">
                            <FaCalendarAlt className="me-2" style={{ color: '#71b280', fontSize: '0.9rem' }} />
                            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                              Rientro: <strong style={{ color: statusColor }}>{strumento.dataRientro}</strong>
                            </span>
                          </div>

                          <div className="d-flex align-items-center">
                            <FaEuroSign className="me-2" style={{ color: '#71b280', fontSize: '0.9rem' }} />
                            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                              Cauzione: <strong style={{ color: 'white' }}>{strumento.cauzione}€</strong>
                            </span>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-4">
                          {daysRemaining <= 7 && daysRemaining > 0 && (
                            <div style={{
                              background: 'rgba(255, 107, 107, 0.2)',
                              padding: '0.75rem',
                              borderRadius: '8px',
                              textAlign: 'center',
                              border: '1px solid rgba(255, 107, 107, 0.3)'
                            }}>
                              <small style={{ color: '#ff6b6b', fontWeight: '600' }}>
                                ⚠️ Scadenza vicina!
                              </small>
                            </div>
                          )}
                          {daysRemaining <= 0 && (
                            <div style={{
                              background: 'rgba(255, 107, 107, 0.3)',
                              padding: '0.75rem',
                              borderRadius: '8px',
                              textAlign: 'center',
                              border: '1px solid rgba(255, 107, 107, 0.5)'
                            }}>
                              <small style={{ color: '#ff6b6b', fontWeight: '600' }}>
                                🚨 Restituire urgentemente!
                              </small>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="modern-glass-card slide-up text-center py-5">
                <FaGuitar style={{ 
                  fontSize: '4rem', 
                  color: 'rgba(255,255,255,0.3)', 
                  marginBottom: '1rem' 
                }} />
                <h5 style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem' }}>
                  Nessuno strumento assegnato
                </h5>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Contatta il tuo docente per richiedere uno strumento in prestito
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Summary Stats */}
        {strumentiStudente.length > 0 && (
          <div className="row justify-content-center mt-4">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="modern-glass-card slide-up text-center" style={{ animationDelay: '0.4s' }}>
                <h5 className="mb-3" style={{ color: 'white' }}>Riepilogo Prestiti</h5>
                <div className="row">
                  <div className="col-4">
                    <div className="modern-stat-number" style={{ fontSize: '2rem' }}>
                      {strumentiStudente.length}
                    </div>
                    <div className="modern-stat-label">Strumenti</div>
                  </div>
                  <div className="col-4">
                    <div className="modern-stat-number" style={{ fontSize: '2rem' }}>
                      {strumentiStudente.filter(s => getDaysRemaining(s.dataRientro) > 7).length}
                    </div>
                    <div className="modern-stat-label">In Regola</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StrumentiStudente;