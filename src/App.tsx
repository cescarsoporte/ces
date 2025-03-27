import { useEffect, useState } from 'react';
import { getAll } from './utils/db';
import AlumnosList from './components/AlumnosList';
import GitHubSync from './components/GitHubSync';

function App() {
  const [alumnos, setAlumnos] = useState<any[]>([]);

  const loadData = async () => {
    const data = await getAll('Alumnos');
    setAlumnos(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Administración de Alumnos</h1>
      <GitHubSync onSync={loadData} />
      <AlumnosList />
    </div>
  );
}

export default App;