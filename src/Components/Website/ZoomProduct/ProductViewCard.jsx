import React from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { QuantityPicker } from "react-qty-picker";

const ProductViewCard = (props) => {
  const [mainImage, setMainImage] = useState(props.mainImage);
  const [optionalImage1, setOptionalImage1] = useState(props.optionalImage1);
  const [optionalImage2, setOptionalImage2] = useState(props.optionalImage2);

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
              src={mainImage}
              alt={props.name}
              style={{ height: "13rem" }}
            />
          </Row>

          <Row className="mt-2 ">
            <Col className="d-flex justify-content-center align-items-center">
              <img
                className="rounded-1"
                src={optionalImage1}
                alt={props.name}
                style={{ width: "8rem", marginTop: "1px" }}
                onClick={() => {
                  setMainImage(optionalImage1);
                  setOptionalImage1(mainImage);
                }}
              />
            </Col>

            <Col className="d-flex justify-content-center align-items-center">
              <img
                className="rounded-1"
                src={optionalImage2}
                alt={props.name}
                style={{ width: "8rem", marginTop: "1px" }}
                onClick={() => {
                  setMainImage(optionalImage2);
                  setOptionalImage2(mainImage);
                }}
              />
            </Col>
          </Row>
        </Col>
        <Col lg={7} xs={12} style={{ paddingLeft: "20px" }}>
          <h3>{props.name}</h3>
          <ul class="list-unstyled">
            <li className="mb-2">Rs. {props.price} </li>
            <li className="mb-2">Weight: {props.weight}kg </li>
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
