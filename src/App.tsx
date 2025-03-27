import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllAlumnos } from './utils/db';
import AlumnosList from './components/AlumnosList';
import GitHubSync from './components/GitHubSync';

function App() {
  const [alumnos, setAlumnos] = useState<any[]>([]);

  const loadData = async () => {
    const data = await getAllAlumnos();
    setAlumnos(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Administración de Alumnos</h1>
      <GitHubSync onSync={loadData} />
      <AlumnosList alumnos={alumnos} refreshData={loadData} />
    </div>
  );
}

export default App;