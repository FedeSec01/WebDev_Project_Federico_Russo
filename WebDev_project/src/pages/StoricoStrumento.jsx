import { useParams, useNavigate } from 'react-router-dom';
import { storicoStrumenti } from '../utils/mockStoricoStrumenti';
import '../styles/app.css';

function StoricoStrumento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const storico = storicoStrumenti[id] || [];

  return (
    <div className="container-fluid dashboard-background text-white py-4 min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4 px-3">
        <h2 className="mb-0">Storico Prestiti - {id}</h2>
        <button className="btn btn-outline-light" onClick={() => navigate(-1)}>
          Torna Indietro
        </button>
      </div>

      {storico.length === 0 ? (
        <p className="text-center">Nessun prestito precedente registrato per questo strumento.</p>
      ) : (
        <div className="table-responsive px-3">
          <table className="table table-dark table-bordered table-striped align-middle text-center">
            <thead>
              <tr>
                <th>Studente</th>
                <th>Data Prestito</th>
                <th>Data Rientro</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {storico.map((record, idx) => (
                <tr key={idx}>
                  <td>{record.studente}</td>
                  <td>{record.dataPrestito}</td>
                  <td>{record.dataRientro}</td>
                  <td>{record.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default StoricoStrumento;