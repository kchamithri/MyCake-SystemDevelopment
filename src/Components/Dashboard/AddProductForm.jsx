import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
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
    optionalImage1: "",
    optionalImage2: "",
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

  const handleMainImages = async (event) => {
    const file = event.target.files[0];

    const base64 = await convertToBase64(file);
    setProduct({ ...product, mainImage: base64 });
  };

  const handleOptionalImage1 = async (event) => {
    const file = event.target.files[0];

    const base64 = await convertToBase64(file);
    setProduct({
      ...product,
      optionalImage1: base64,
    });
    // setProduct((prev) => ({
    //   ...prev,
    //   optionalImage: [...prev.optionalImage, "newImage"],
    // }));
  };

  const handleOptionalImage2 = async (event) => {
    const file = event.target.files[0];

    const base64 = await convertToBase64(file);
    setProduct({
      ...product,
      optionalImage2: base64,
    });
  };

  useEffect(() => {
    console.log(product);
  }, [product]);

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
      optionalImage1,
      optionalImage2,
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
          optionalImage1,
          optionalImage2,
        }),
      });
      if (res.status === 400 || !res) {
        window.alert("Invalid Credentials");
      } else {
        window.alert("Successfully Added");
        setProduct(...product, {
          name: "",
          type: "",
          flavor: "",
          weight: "",
          price: "",
          description: "",
          mainImage: "",
          optionalImage1: "",
          optionalImage2: "",
        });

        console.log(event.target);
      }
    } catch (error) {
      console.log("ERROR IS", error);
    }
    props.handleShow();
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
              rows={2}
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

      <Row xs={1} md={3} className="g-4">
        <Col>
          <Card style={{ width: "18rem" }} border="light">
            <Card.Body className="p-0 ">
              <Card.Title className="fs-6">Main Image</Card.Title>
            </Card.Body>
            <Card.Img
              style={{ height: "230px" }}
              variant="bottom"
              src={product.mainImage}
            />
            <Card.Title>
              <Form.Control
                type="file"
                name="mainImage"
                className="mt-1"
                onChange={handleMainImages}
              />
            </Card.Title>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem" }} border="light">
            <Card.Body className="p-0 ">
              <Card.Title className="fs-6 ">Optional Image 1</Card.Title>
            </Card.Body>
            <Card.Img
              style={{ height: "230px" }}
              variant="bottom"
              src={product.optionalImage1}
            />
            <Card.Title>
              <Form.Control
                type="file"
                name="optionalImage1"
                className="mt-1"
                onChange={handleOptionalImage1}
              />
            </Card.Title>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem" }} border="light">
            <Card.Body className="p-0 ">
              <Card.Title className="fs-6 ">Optional Image 2</Card.Title>
            </Card.Body>
            <Card.Img
              style={{ height: "230px" }}
              variant="bottom"
              src={product.optionalImage2}
            />
            <Card.Title>
              <Form.Control
                type="file"
                name="optionalImage2"
                className="mt-1"
                onChange={handleOptionalImage2}
              />
            </Card.Title>
          </Card>
        </Col>
      </Row>

      <Stack direction="horizontal">
        <div className="ms-auto mt-1">
          <Button variant="info" type="submit">
            Add
          </Button>
        </div>
      </Stack>
    </Form>
  );
};

export default AddProductForm;
