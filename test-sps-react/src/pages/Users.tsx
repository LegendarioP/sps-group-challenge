import React from "react";
import { useUserManagement } from "../hooks/useUserManagement.ts";

const Users: React.FC = () => {
  const { users, loading, error, refetch, deleteUser } = useUserManagement();


  const handleDelete = async (userId: string) => {
    if (window.confirm('Tem certeza que deseja deletar este usuário?')) {
      await deleteUser(userId);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>Carregando usuários...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <div>Erro: {error}</div>
        <button onClick={refetch}>Tentar novamente</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Usuários</h1>

      <div style={{ marginTop: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Nome</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Tipo</th>
              <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>{user.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  {user.nome}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  {user.email}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  {user.type}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <a
                      href={`/users/${user.id}`}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Editar
                    </a>
                    <button
                      onClick={() => handleDelete(user.id!)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Deletar
                    </button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
            Nenhum usuário encontrado.
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={refetch}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          Atualizar Lista
        </button>
      </div>
    </div>
  );
};

export default Users;