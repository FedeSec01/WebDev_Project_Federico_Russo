import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
      <span>🎵 Accademia Musicale</span>
      {user && (
        <div>
          <span style={{ marginRight: "1rem" }}>{user.nome}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;