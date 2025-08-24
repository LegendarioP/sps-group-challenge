import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";

const Home: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h1>SPS REACT TEST</h1>
      
      {isAuthenticated ? (
        <div>
          <p>Bem-vindo, {user?.nome}!</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '200px' }}>
            <Link to="/users">Usuários</Link>
            <button onClick={logout} style={{ padding: '8px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '200px' }}>
          <Link to="/signin">Login</Link>
          <Link to="/signup">Cadastrar</Link>
          <p style={{ color: '#666', fontSize: '14px' }}>
            Você precisa fazer login para acessar a área de usuários.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;