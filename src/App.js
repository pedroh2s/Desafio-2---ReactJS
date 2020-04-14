import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(res=>{
      setRepository(res.data);
    });
  }, [])

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: 'Test',
      url: 'teste@test.com',
      techs: ['Node.js', 'ReactJS'],
    });

    const repo = res.data;

    setRepository([...repository, repo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepository(repository.filter(
      repository=>repository.id !== id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map(repository=>(
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
