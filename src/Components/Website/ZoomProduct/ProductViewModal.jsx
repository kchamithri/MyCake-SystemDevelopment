import React from "react";
import { Button, Modal } from "react-bootstrap";

const ProductViewModal = (props) => {
  return (
    <Modal centered size="lg" show={props.show} onHide={props.close}>
      <Modal.Header closeButton>
        
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close}>
          Add to cart
        </Button>
        <Button variant="primary" onClick={props.close}>
          Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductViewModal;
