import React from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { QuantityPicker } from "react-qty-picker";

const ProductViewCard = (props) => {
  const [image, setMainImage] = useState(props.image);
  const [optionalImage, setOptionalImage] = useState(props.optionalImages[0]);

  const getPickerValue = (value) => {
    console.log(value);
  };
  return (
    <Container>
      <Row>
        <Col lg={5} xs={12}>
          <Row>
            <img
              className="rounded-1"
              src={image}
              alt={props.name}
              style={{ height: "13rem" }}
            />
          </Row>

          <Row className="mt-2 ">
            <Col className="d-flex justify-content-center align-items-center">
              <img
                className="rounded-1"
                src={optionalImage}
                alt={props.name}
                style={{ width: "8rem", marginTop: "1px" }}
                onClick={() => {
                  setMainImage(props.optionalImages[0]);
                  setOptionalImage(image);
                }}
              />
            </Col>

            <Col className="d-flex justify-content-center align-items-center">
              <img
                className="rounded-1"
                src={props.optionalImages[1]}
                alt={props.name}
                style={{ width: "8rem", marginTop: "1px" }}
                onClick={() => {
                  setMainImage(props.optionalImages[1]);
                  setOptionalImage(image);
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col lg={7} xs={12} style={{ paddingLeft: "20px" }}>
          <h3>{props.name}</h3>
          <ul class="list-unstyled">
            <li className="mb-2">{props.price} </li>
            <li className="mb-2">Weight: {props.weight} </li>
            <li className="mb-2">
              <QuantityPicker
                smooth
                min={1}
                value={1}
                onChange={getPickerValue}
              />
            </li>
            <li className="mb-1">Description:</li>
            <li>{props.description}</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductViewCard;
