import React from "react";

const PhonesTable: React.FC = () => {
  return (
    <div>
      <h3>Teléfonos</h3>
      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Tipo</th>
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

export default PhonesTable;