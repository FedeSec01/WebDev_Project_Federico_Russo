import { strumenti } from '../utils/mockStrumenti';
import { useNavigate } from 'react-router-dom';
import '../styles/app.css';

function RegistroStrumenti() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid dashboard-background text-white py-4 min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4 px-3">
        <h2 className="mb-0">Registro Strumenti Assegnati</h2>
        <button className="btn btn-outline-light" onClick={() => navigate('/dashboard')}>
          Torna alla Dashboard
        </button>
      </div>

      <div className="table-responsive px-3">
        <table className="table table-dark table-bordered table-striped align-middle text-center">
          <thead>
            <tr>
              <th>Strumento</th>
              <th>Codice</th>
              <th>Data Prestito</th>
              <th>Rientro Previsto</th>
              <th>Cauzione (€)</th>
            </tr>
          </thead>
          <tbody>
            {strumenti.map((s) => (
              <tr key={s.id}>
                <td>
                  <button
                    className="btn btn-link text-white text-decoration-underline p-0"
                    onClick={() => navigate(`/storico-strumento/${s.codice}`)}
                  >
                    {s.nome}
                  </button>
                </td>
                <td>{s.codice}</td>
                <td>{s.dataPrestito}</td>
                <td>{s.dataRientro}</td>
                <td>{s.cauzione}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RegistroStrumenti;