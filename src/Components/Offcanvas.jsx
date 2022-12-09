import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Offcanvas = ({ show, closeModal }) => {
  return (
    <>
      <Offcanvas show={show} onHide={closeModal}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Offcanvas;
