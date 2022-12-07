import swal from "@sweetalert/with-react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UpdateProductForm = ({ dataToUpdate, handleShow }, props) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [data, setData] = useState({});
  const [show, setShow] = useState({
    showMain: true,
    showOpt1: true,
    showOpt2: true,
  });
  const [product, setProduct] = useState({});

  useEffect(() => {
    setData(dataToUpdate[0]);
    setProduct(dataToUpdate[0]);
  }, []);

  useEffect(() => {
    console.log(product);
  }, []);

  const handleInput = (event) => {
    console.log(event.target.value);
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

  const handleUploadShow = (event) => {
    if (event.target.id === "main") {
      setShow({ ...show, showMain: false });
    } else if (event.target.id === "op1") {
      setShow({ ...show, showOpt1: false });
    } else if (event.target.id === "op2") {
      setShow({ ...show, showOpt2: false });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      _id,
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
      const res = await fetch("/admin/products/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
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
        swal("Success", "Successfully Updated", "success", {
          button: false,
          timer: 1500,
        }).then((value) => {
          handleShow();
        });
      }
    } catch (error) {
      console.log("ERROR IS", error);
    }
  };

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      style={{ margin: "2% 5% " }}
    >
      <Row className="mb-3">
        <Form.Group as={Row} md="6" controlId="validationCustom01">
          <Form.Label column lg={2}>
            Cake Name:
          </Form.Label>
          <Col lg={10}>
            <Form.Control
              required
              type="text"
              name="name"
              defaultValue={product.name}
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
            >
              <option>{product.type}</option>
              <option value="Birthday Cake">Birthday Cake</option>
              <option value="Wedding Cakes">Wedding Cakes</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Kids Birthday">Kids Birthday</option>
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
            >
              <option>{product.flavor}</option>
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
              defaultValue={product.weight}
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
              defaultValue={product.price}
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
              defaultValue={product.description}
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
              <Stack direction="horizontal">
                <div className="ms-auto mt-1">
                  <Button
                    id="main"
                    variant="secondary"
                    size="sm"
                    className={show.showMain ? "block mt-1" : "d-none"}
                    onClick={handleUploadShow}
                  >
                    Change Image
                  </Button>
                </div>
              </Stack>

              <Form.Control
                type="file"
                name="mainImage"
                className={show.showMain ? "d-none" : "block mt-1"}
                onClick={handleMainImages}
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
              <Stack direction="horizontal">
                <div className="ms-auto mt-1">
                  <Button
                    id="op1"
                    variant="secondary"
                    size="sm"
                    className={show.showOpt1 ? "block mt-1" : "d-none"}
                    onClick={handleUploadShow}
                  >
                    Change Image
                  </Button>
                </div>
              </Stack>
              <Form.Control
                type="file"
                name="optionalImage1"
                className={show.showOpt1 ? "d-none" : "block mt-1"}
                onClick={handleOptionalImage1}
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
              <Stack direction="horizontal">
                <div className="ms-auto mt-1">
                  <Button
                    id="op2"
                    variant="secondary"
                    size="sm"
                    className={show.showOpt2 ? "block mt-1" : "d-none"}
                    onClick={handleUploadShow}
                  >
                    Change Image
                  </Button>
                </div>
              </Stack>
              <Form.Control
                type="file"
                name="optionalImage2"
                className={show.showOpt2 ? "d-none" : "block mt-1"}
                onClick={handleOptionalImage2}
              />
            </Card.Title>
          </Card>
        </Col>
      </Row>

      <Stack direction="horizontal">
        <div className="ms-auto mt-1">
          <Button variant="info" type="submit">
            Save Changes
          </Button>
        </div>
      </Stack>
    </Form>
  );
};

export default UpdateProductForm;
