import { openDB } from 'idb';

const DB_NAME = 'alumnosDB';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('alumnos')) {
        const alumnosStore = db.createObjectStore('alumnos', {
          keyPath: 'alumno_id'
        });
        alumnosStore.createIndex('curso', 'curso');
      }
      // Repite para contactos, telefonos y registros
    },
  });
};

// Operaciones CRUD básicas
export const getAllAlumnos = async () => {
  const db = await initDB();
  return db.getAll('alumnos');
};

export const addAlumno = async (alumno: any) => {
  const db = await initDB();
  return db.add('alumnos', alumno);
};
// Implementa update y delete de manera similar