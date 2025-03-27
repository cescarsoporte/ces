import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { updateFile } from '../utils/github';
import { getAllAlumnos } from '../utils/db';

export const GitHubSync = ({ onSync }: any) => {
  const [show, setShow] = useState(false);

  const handleSync = async () => {
    const data = await getAllAlumnos();
    await updateFile(JSON.stringify(data, null, 2));
    onSync();
    setShow(false);
  };

  return (
    <>
      <Button variant="success" onClick={() => setShow(true)}>
        Guardar en GitHub
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar sincronización</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres guardar los cambios en GitHub?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSync}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};