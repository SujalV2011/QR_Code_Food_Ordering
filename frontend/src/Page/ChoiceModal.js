import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ChoiceModal = ({ show, handleClose, handleChoice }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Choose Your Preference</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you want your Dosa with oil or butter?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleChoice('Oil')}>
          Oil
        </Button>
        <Button variant="primary" onClick={() => handleChoice('Butter')}>
          Butter
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChoiceModal;
