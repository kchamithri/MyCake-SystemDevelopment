import React from "react";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddProductForm = (props) => {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    category: props.category,
    type: "",
    flavor: "",
    weight: "",
    price: "",
    description: "",
    mainImage: "",
    // optionalImage: "",
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setProduct({ ...product, [name]: value });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleImages = async (event) => {
    const file = event.target.files[0];

    const base64 = await convertToBase64(file);
    setProduct({ ...product, mainImage: base64 });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      name,
      category,
      type,
      flavor,
      weight,
      price,
      description,
      mainImage,
    } = product;

    try {
      const res = await fetch("/admin/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          type,
          flavor,
          weight,
          price,
          description,
          mainImage,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("Invalid Credentials");
      } else {
        window.alert("Successfully Added");

        console.log(event.target);
        props.handleShow();
      }
    } catch (error) {
      console.log("ERROR IS", error);
    }
  };

  return (
    <Form
      noValidate
      validated={validated}
      method="POST"
      onSubmit={handleSubmit}
      enctype="multipart/form-data"
      style={{ margin: "2% 5% " }}
    >
      <Row className="mb-3">
        <Form.Group as={Row} md="6" controlId="validationCustom01">
          <Form.Label column lg={2}>
            Name:
          </Form.Label>
          <Col lg={10}>
            <Form.Control
              required
              type="text"
              name="name"
              placeholder="Food name"
              value={product.name}
              onChange={handleInput}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a Cake Name.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Row} md="6" controlId="validationCustom01">
          <Form.Label column lg={2}>
            Type
          </Form.Label>
          <Col lg={4}>
            <Form.Select
              aria-label="Default select example"
              name="type"
              onChange={handleInput}
              value={product.type}
            >
              {props.category === "Cake" ? (
                <>
                  <option>Type</option>
                  <option value="Birthday Cake">Birthday Cake</option>
                  <option value="Wedding Cakes">Wedding Cakes</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Kids Birthday">Kids Birthday</option>
                </>
              ) : (
                <>
                  <option>Type</option>
                  <option value="Buns">Buns</option>
                  <option value="Cutlet">Cutlet</option>
                  <option value="Sandwiches">Sandwiches</option>
                </>
              )}
            </Form.Select>
          </Col>
          <Form.Control.Feedback type="invalid">
            Please provide a Type
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Row} md="6" controlId="validationCustom01">
          <Form.Label column lg={2}>
            Flavor
          </Form.Label>
          <Col lg={4}>
            <Form.Select
              aria-label="Default select example"
              name="flavor"
              onChange={handleInput}
              value={product.flavor}
            >
              <option>Flavor</option>
              <option value="Milk Chocolate">Milk Chocolate</option>
              <option value="Strawberry">Strawberry</option>
              <option value="Vanilla">Vanilla</option>
            </Form.Select>
          </Col>
          <Form.Control.Feedback type="invalid">
            Please provide a Type
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Row} md="6" controlId="validationCustom02">
          <Form.Label column lg={2}>
            Weight:
          </Form.Label>
          <Col lg={4}>
            <Form.Control
              required
              type="text"
              name="weight"
              placeholder="kg"
              value={product.weight}
              onChange={handleInput}
            />
            <Form.Control.Feedback type="invalid">
              Please provide the weight.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Row} md="6" controlId="validationCustom03">
          <Form.Label column lg={2}>
            Price:
          </Form.Label>
          <Col lg={4}>
            <Form.Control
              required
              type="text"
              name="price"
              placeholder="Rs."
              value={product.price}
              onChange={handleInput}
            />
            <Form.Control.Feedback type="invalid">
              Please provide the Price.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Row} md="6" controlId="validationCustom04">
          <Form.Label column lg={2}>
            Product Description:
          </Form.Label>
          <Col lg={10}>
            <Form.Control
              required
              as="textarea"
              rows={3}
              placeholder="Product Description"
              name="description"
              value={product.description}
              onChange={handleInput}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a description.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Row} controlId="formFile" className="mb-3">
          <Form.Label column lg={2}>
            Main Image:
          </Form.Label>
          <Col lg={10}>
            <Form.Control
              type="file"
              name="mainImage"
              onChange={handleImages}
            />
          </Col>
        </Form.Group>
      </Row>
      {/* <Row className="mb-3">
        <Form.Group as={Row} controlId="formFileMultiple" className="mb-3">
          <Form.Label column lg={2}>
            Optional Images:
          </Form.Label>
          <Col lg={10}>
            <Form.Control
              type="file"
              name="optionalImage"
              multiple
              onChange={handleImages}
            />
          </Col>
        </Form.Group>
      </Row> */}

      <Button type="submit">Add</Button>
    </Form>
  );
};

export default AddProductForm;
