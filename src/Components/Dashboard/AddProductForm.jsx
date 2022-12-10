import {
  Box,
  FormHelperText,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import swal from "@sweetalert/with-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const AddProductForm = (props) => {
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);
  const [cakeTypes, setCakeTypes] = useState([]);
  const [cakeFlavors, setCakeFlavors] = useState([]);
  const [partyPackTypes, setPartyPackTypes] = useState([]);
  const [partyPackFlavors, setPartyPackFlavors] = useState([]);

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
    fetch("/typesAndFlavours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setCakeTypes(data.cakeType);
        setCakeFlavors(data.cakeFlavour);
        setPartyPackTypes(data.partyType);
        setPartyPackFlavors(data.partyFlavour);
      })
      .catch((error) => {
        console.log("error fetching:", error);
      });

    // localStorage.clear();
  }, []);

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
        swal("Success", "Successfully Added", "success", {
          button: false,
          timer: 1500,
        }).then((value) => {
          props.handleShow();
        });
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
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const [typeOpen, setTypeOpen] = React.useState(false);
  const [flavorOpen, setFlavorOpen] = React.useState(false);
  const handleTypeOpen = () => setTypeOpen(true);
  const handleTypeClose = () => setTypeOpen(false);
  const handleFlavorOpen = () => setFlavorOpen(true);
  const handleFlavorClose = () => setFlavorOpen(false);
  const [typeAndFlavors, setTypesAndFlavors] = useState({
    cakeType: "",
    cakeFlavour: "",
    partyPackType: "",
    partyPackFlavor: "",
  });

  const handleSubmitTypeAdd = async (event) => {
    event.preventDefault();
    const { cakeType, cakeFlavour, partyPackType, partyPackFlavor } =
      typeAndFlavors;
    if (props.category === "Cake") {
      cakeTypes.push(cakeType);
      handleTypeClose();
    } else {
      partyPackTypes.push(partyPackType);
      handleTypeClose();
    }
  };
  const handleTypeAdd = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    console.log(value);
    setTypesAndFlavors({ ...typeAndFlavors, [name]: value });
  };
  const handleSubmitFlavorAdd = async (event) => {
    event.preventDefault();
    const { cakeType, cakeFlavour, partyPackType, partyPackFlavor } =
      typeAndFlavors;
    if (props.category === "Cake") {
      cakeFlavors.push(cakeFlavour);
      handleFlavorClose();
    } else {
      partyPackFlavors.push(partyPackFlavor);
      handleFlavorClose();
    }
  };

  const handleFlavorAdd = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    console.log(value);
    setTypesAndFlavors({ ...typeAndFlavors, [name]: value });
  };

  return (
    <>
      <Modal
        open={typeOpen}
        onClose={handleTypeClose}
        onSubmit={handleSubmitTypeAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form
            noValidate
            validated={validated}
            method="POST"
            enctype="multipart/form-data"
            style={{ margin: "1%" }}
          >
            <Row className="mb-3">
              <Form.Group as={Row} md="12" controlId="validationCustom01">
                <Form.Label column lg={3}>
                  New Type:
                </Form.Label>
                <Col lg={9}>
                  <Form.Control
                    required
                    type="text"
                    name={
                      props.category === "Cake" ? "cakeType" : "partyPackType"
                    }
                    placeholder="New Type"
                    onChange={handleTypeAdd}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a New Type.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Row>
            <Stack direction="horizontal">
              <div className="ms-auto mt-1">
                <Button variant="info" type="submit">
                  Add
                </Button>
              </div>
            </Stack>
          </Form>
        </Box>
      </Modal>

      <Modal
        open={flavorOpen}
        onClose={handleFlavorClose}
        onSubmit={handleSubmitFlavorAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form
            noValidate
            validated={validated}
            method="POST"
            enctype="multipart/form-data"
            style={{ margin: "1%" }}
          >
            <Row className="mb-3">
              <Form.Group as={Row} md="12" controlId="validationCustom01">
                <Form.Label column lg={4}>
                  New Flavor:
                </Form.Label>
                <Col lg={8}>
                  <Form.Control
                    required
                    type="text"
                    name={
                      props.category === "Cake"
                        ? "cakeFlavour"
                        : "partyPackFlavor"
                    }
                    placeholder="New Flavor"
                    onChange={handleFlavorAdd}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a New Flavor.
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            </Row>
            <Stack direction="horizontal">
              <div className="ms-auto mt-1">
                <Button variant="info" type="submit">
                  Add
                </Button>
              </div>
            </Stack>
          </Form>
        </Box>
      </Modal>

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
            {/* can use mui autocomplete */}
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
                    {cakeTypes.map((type) => {
                      return <option value={type}>{type}</option>;
                    })}
                  </>
                ) : (
                  <>
                    <option>Type</option>
                    {partyPackTypes.map((type) => {
                      return <option value={type}>{type}</option>;
                    })}
                  </>
                )}
              </Form.Select>
            </Col>
            <Col lg={6}>
              <FormHelperText>
                <Tooltip title="Add">
                  <IconButton color="primary" onClick={handleTypeOpen}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                Your product type is not available? Click the + to add new type
              </FormHelperText>
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
                {props.category === "Cake" ? (
                  <>
                    <option>Flavor</option>
                    {cakeFlavors.map((type) => {
                      return <option value={type}>{type}</option>;
                    })}
                  </>
                ) : (
                  <>
                    <option>Flavor</option>
                    {partyPackFlavors.map((type) => {
                      return <option value={type}>{type}</option>;
                    })}
                  </>
                )}
              </Form.Select>
            </Col>
            <Col lg={6}>
              <FormHelperText>
                <Tooltip title="Add">
                  <IconButton color="primary" onClick={handleFlavorOpen}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
                Your flavour type is not available? Click the + to add new type
              </FormHelperText>
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
    </>
  );
};

export default AddProductForm;
