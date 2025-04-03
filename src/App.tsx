import React, {useState, useEffect } from "react";
import StudentForm from "./components/StudentForm";
import ContactsTable from "./components/ContactsTable";
import PhonesTable from "./components/PhonesTable";
import RecordsTable from "./components/RecordsTable";
import Contactos from "./data/Contactos.json";
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {
  const clearContacts = () => {
    setSelectedContacts([]); // Limpiar contactos
  };
  const [selectedContacts, setSelectedContacts] = useState<any[]>([]);

  // Función para actualizar los contactos relacionados con el alumno seleccionado
  const handleSelectStudent = (alumnoId: number) => {
    const relatedContacts = Contactos.filter(
      (contact: any) => contact.alumno_id === alumnoId
    );
    setSelectedContacts(relatedContacts);
  };

  useEffect(() => {
    // Initialize IndexedDB and load data from Registro.json
    const dbName = "StudentDB";
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = request.result;

      db.createObjectStore("students", { keyPath: "id", autoIncrement: true });
      db.createObjectStore("contacts", { keyPath: "id", autoIncrement: true });
      db.createObjectStore("phones", { keyPath: "id", autoIncrement: true });
      db.createObjectStore("records", { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = () => {
      const db = request.result;

      fetch("/data/Registro.json")
        .then((response) => response.json())
        .then((data) => {
          const transaction = db.transaction(
            ["students", "contacts", "phones", "records"],
            "readwrite"
          );

          data.students.forEach((student: any) =>
            transaction.objectStore("students").add(student)
          );
          data.contacts.forEach((contact: any) =>
            transaction.objectStore("contacts").add(contact)
          );
          data.phones.forEach((phone: any) =>
            transaction.objectStore("phones").add(phone)
          );
          data.records.forEach((record: any) =>
            transaction.objectStore("records").add(record)
          );

          transaction.oncomplete = () => console.log("Data loaded successfully");
        });
    };

    request.onerror = () => {
      console.error("Error opening IndexedDB");
    };
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <button>Crear</button>
          <button>Leer</button>
          <button>Actualizar</button>
          <button>Eliminar</button>
          <button>Exportar</button>
          <button>Imprimir</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <StudentForm 
            onSelectStudent={handleSelectStudent} 
            onClearContacts={() => setSelectedContacts([])} 
          />
        </div>
        <div className="col">
          <ContactsTable contacts={selectedContacts} />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <img src="placeholder.jpg" alt="Foto del Alumno" />
        </div>
        <div className="col">
          <PhonesTable />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <RecordsTable />
        </div>
      </div>
    </div>
  );
};

export default App;
