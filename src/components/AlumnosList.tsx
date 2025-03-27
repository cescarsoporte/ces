import React, { useEffect, useState } from 'react';
import { getAll } from '../utils/db';
import GitHubSync from './GitHubSync'; // Import GitHubSync component

interface Alumno {
  alumno_id: number;
  nombre: string;
  curso: string;
}

const AlumnosList: React.FC = () => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);

  useEffect(() => {
    const fetchAlumnos = async () => {
      const data = await getAll('Alumnos');
      setAlumnos(data);
    };
    fetchAlumnos();
  }, []);

  const handleSync = () => {
    console.log('Sincronización completada');
  };

  return (
    <div>
      <h1>Lista de Alumnos</h1>
      <ul>
        {alumnos.map((alumno) => (
          <li key={alumno.alumno_id}>
            {alumno.nombre} - {alumno.curso}
          </li>
        ))} 
      </ul>
      <GitHubSync onSync={handleSync} /> {/* Add GitHubSync button */}
    </div>
  );
};

export default AlumnosList;