import React from "react";
import { Button, Modal } from "react-bootstrap";

const DashboardModal = ({ title, show, closeModal, children }) => {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      style={{ zIndex: "2000" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default DashboardModal;
