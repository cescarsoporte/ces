import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { updateFile } from '../utils/github';
import { getAll } from '../utils/db';

interface GitHubSyncProps {
  onSync: () => void;
}

const GitHubSync: React.FC<GitHubSyncProps> = ({ onSync }) => {
  const [show, setShow] = useState(false);

  const toggleModal = () => setShow((prev) => !prev);

  const handleSync = async () => {
    try {
      const data = await getAll('Alumnos');
      await updateFile(JSON.stringify({ Alumnos: data }, null, 2));
      onSync();
    } catch (error) {
      console.error('Error al sincronizar con GitHub:', error);
    } finally {
      toggleModal();
    }
  };

  return (
    <>
      <Button variant="success" onClick={toggleModal}>
        Guardar en GitHub
      </Button>

      <Modal show={show} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar sincronización</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres guardar los cambios en GitHub?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
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

export default GitHubSync;