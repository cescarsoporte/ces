import { openDB } from 'idb';

const DB_NAME = 'registrosDB';
const DB_VERSION = 1;

const objectStores = [
  { name: 'alumnos', keyPath: 'alumno_id', indexes: [{ name: 'curso', key: 'curso' }] },
  // Agrega más definiciones de object stores aquí, por ejemplo:
  // { name: 'contactos', keyPath: 'contacto_id', indexes: [{ name: 'nombre', key: 'nombre' }] },
];

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      objectStores.forEach(({ name, keyPath, indexes }) => {
        if (!db.objectStoreNames.contains(name)) {
          const store = db.createObjectStore(name, { keyPath });
          indexes.forEach(({ name, key }) => store.createIndex(name, key));
        }
      });
    },
  });
};

// Operaciones CRUD genéricas
export const getAll = async (storeName: string) => {
  const db = await initDB();
  return db.getAll(storeName);
};

export const getByKey = async (storeName: string, key: any) => {
  const db = await initDB();
  return db.get(storeName, key);
};

export const addItem = async (storeName: string, item: any) => {
  const db = await initDB();
  return db.add(storeName, item);
};

export const updateItem = async (storeName: string, item: any) => {
  const db = await initDB();
  return db.put(storeName, item);
};

export const deleteItem = async (storeName: string, key: any) => {
  const db = await initDB();
  return db.delete(storeName, key);
};