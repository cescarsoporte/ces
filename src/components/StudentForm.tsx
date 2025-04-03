import React, { useState } from "react";
import Alumnos from "../data/Alumnos.json";

interface Alumno {
  alumno_id: number;
  nombre: string;
  apellido: string;
  curso: string;
  seccion: string;
  nivel: string;
  num_orden: number;
}

interface StudentFormProps {
  onSelectStudent: (alumnoId: number) => void;
  onClearContacts: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ onSelectStudent, onClearContacts }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    curso: "",
    seccion: "",
    nivel: "",
    numOrden: "",
  });

  const [filteredStudents, setFilteredStudents] = useState<Alumno[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = () => {
    const results = Alumnos.filter((alumno: Alumno) => {
      return (
        (!formData.nombre || alumno.nombre.toLowerCase().includes(formData.nombre.toLowerCase())) &&
        (!formData.apellido || alumno.apellido.toLowerCase().includes(formData.apellido.toLowerCase())) &&
        (!formData.curso || alumno.curso.toLowerCase() === formData.curso.toLowerCase()) &&
        (!formData.seccion || alumno.seccion.toLowerCase() === formData.seccion.toLowerCase()) &&
        (!formData.nivel || alumno.nivel.toLowerCase() === formData.nivel.toLowerCase()) &&
        (!formData.numOrden || alumno.num_orden.toString() === formData.numOrden)
      );
    });

    if (results.length === 1) {
      fillForm(results[0]);
      setErrorMessage(null);
    } else if (results.length > 1) {
      setFilteredStudents(results);
      setShowModal(true);
      setErrorMessage(null);
    } else {
      setErrorMessage("No se encontraron alumnos con los criterios especificados.");
    }
  };

  const fillForm = (alumno: Alumno) => {
    setFormData({
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      curso: alumno.curso,
      seccion: alumno.seccion,
      nivel: alumno.nivel,
      numOrden: alumno.num_orden.toString(),
    });

    onSelectStudent(alumno.alumno_id);
    setShowModal(false);
  };

  return (
    <div>
      <form>
        <h3>Información del Alumno</h3>
        <label htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
        />
        <label htmlFor="apellido">Apellido:</label>
        <input
          id="apellido"
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleInputChange}
        />
        <label htmlFor="curso">Curso:</label>
        <input
          id="curso"
          type="text"
          name="curso"
          value={formData.curso}
          onChange={handleInputChange}
        />
        <label htmlFor="seccion">Sección:</label>
        <input
          id="seccion"
          type="text"
          name="seccion"
          value={formData.seccion}
          onChange={handleInputChange}
        />
        <label htmlFor="nivel">Nivel:</label>
        <input
          id="nivel"
          type="text"
          name="nivel"
          value={formData.nivel}
          onChange={handleInputChange}
        />
        <label htmlFor="numOrden">Número de Orden:</label>
        <input
          id="numOrden"
          type="text"
          name="numOrden"
          value={formData.numOrden}
          onChange={handleInputChange}
        />
        <button type="button" onClick={handleSearch}>
          Buscar Alumno
        </button>
        <button
          type="button"
          onClick={() => {
            setFormData({
              nombre: "",
              apellido: "",
              curso: "",
              seccion: "",
              nivel: "",
              numOrden: "",
            });
            if (onClearContacts) {
              onClearContacts();
            }
          }}
        >
          Limpiar todos
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {showModal && (
        <div className="modal">
          <h4>Selecciona un Alumno</h4>
          <ul>
            {filteredStudents.map((alumno) => (
              <li key={alumno.alumno_id}>
                {alumno.nombre} {alumno.apellido} - {alumno.curso} {alumno.seccion}
                <button onClick={() => fillForm(alumno)}>Seleccionar</button>
              </li>
            ))}
          </ul>
          <button onClick={() => setShowModal(false)}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default StudentForm;