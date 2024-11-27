import React, { useEffect, useState } from "react";


function App() {

  const [users, setUsers] = useState([]); // Estado para armazenar os usuários
  const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento
  const [error, setError] = useState(null); // Estado para erros

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3333/usuarios"); // URL do backend
        if (!response.ok) {
          throw new Error("Erro ao buscar os usuários");
        }
        const data = await response.json();
        setUsers(data); // Atualiza o estado com os usuários
      } catch (error) {
        setError(error.message); // Armazena a mensagem de erro
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchUsers(); // Chama a função de busca
  }, []); // O array vazio faz com que a requisição ocorra apenas uma vez após a montagem

  if (loading) return <p className="text-center text-indigo-600">Carregando usuários...</p>; // Exibe o carregamento
  if (error) return <p className="text-center text-red-600">Erro: {error}</p>; // Exibe erro, se houver


  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Lista de Usuários</h1>
      {users.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum usuário encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold text-indigo-700">{user.nome}</h2>
              <p className="text-gray-600 mt-2">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-600 mt-2">
                <strong>Celular:</strong> {user.celular}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default App
