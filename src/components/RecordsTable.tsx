import React from "react";

const RecordsTable: React.FC = () => {
  return (
    <div>
      <h3>Registros de Entrada y Salida</h3>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora de Entrada</th>
            <th>Hora de Salida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Datos dinámicos */}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsTable;