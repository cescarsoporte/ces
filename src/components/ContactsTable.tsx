import React from "react";

interface Contact {
  nombre: string;
  apellido: string;
  parentesco: string;
}

interface ContactsTableProps {
  contacts: Contact[];
}

const ContactsTable: React.FC<ContactsTableProps> = ({ contacts }) => {
  return (
    <div>
      <h3>Contactos</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Parentesco</th>
            <th>Accion | <button>+</button></th>
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <tr key={index}>
                <td>{contact.nombre}</td>
                <td>{contact.apellido}</td>
                <td>{contact.parentesco}</td>
                <td>                  
                  <button>B</button>
                  <button>X</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No hay contactos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsTable;