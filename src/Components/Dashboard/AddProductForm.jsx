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
import { useRef } from "react";

const AddProductForm = (props) => {
  const navigate = useNavigate();
  const formRef = useRef();

  const [validated, setValidated] = useState(false);
  const [cakeTypes, setCakeTypes] = useState([]);
  const [cakeFlavors, setCakeFlavors] = useState([]);
  const [partyPackTypes, setPartyPackTypes] = useState([]);
  const [partyPackFlavors, setPartyPackFlavors] = useState([]);
  //validations
  const [updateFormError, setUpdateFormError] = useState({
    nameErrorMsg: {
      message: "",
      isVisible: false,
    },
    typeErrorMsg: {
      message: "",
      isVisible: false,
    },
    flavorErrorMsg: {
      message: "",
      isVisible: false,
    },
    weightErrorMsg: {
      message: "",
      isVisible: false,
    },
    priceErrorMsg: {
      message: "",
      isVisible: false,
    },
    descriptionErrorMsg: {
      message: "",
      isVisible: false,
    },
    mainImageErrorMsg: {
      message: "",
      isVisible: false,
    },
    optionalImage1ErrorMsg: {
      message: "",
      isVisible: false,
    },
    optionalImage2ErrorMsg: {
      message: "",
      isVisible: false,
    },
  });
  const [typeError, setTypeError] = useState("");
  const [flavorError, setFlavorError] = useState("");

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
    fetch("/admin/products/typesAndFlavours", {
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

  const validateProductInput = () => {
    let updateFormErrors = updateFormError;

    if (product.name.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        nameErrorMsg: {
          message: "Please Enter The Product Name",
          isVisible: true,
        },
      };
    } else if (/\d+/.test(product.name)) {
      updateFormErrors = {
        ...updateFormErrors,
        nameErrorMsg: {
          message: "Name Cannot Contain Numbers",
          isVisible: true,
        },
      };
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(product.name)) {
      updateFormErrors = {
        ...updateFormErrors,
        nameErrorMsg: {
          message: "Product Name Cannot Contain Special Characters",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        nameErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (product.type.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        typeErrorMsg: {
          message: "Please Enter The Product Type",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        typeErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (product.flavor.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        flavorErrorMsg: {
          message: "Please Enter The Product Flavor",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        flavorErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (product.weight.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        weightErrorMsg: {
          message: "Please Enter The Product Weight",
          isVisible: true,
        },
      };
    } else if (
      /[a-zA-Z]/.test(product.weight) ||
      /[!@#$%^&*(),?":{}|<>]/.test(product.weight)
    ) {
      updateFormErrors = {
        ...updateFormErrors,
        weightErrorMsg: {
          message: "Product Weight Can Be A Numeric Value Only",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        weightErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (product.price.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        priceErrorMsg: {
          message: "Please Enter The Product Price",
          isVisible: true,
        },
      };
    } else if (
      /[a-zA-Z]/.test(product.price) ||
      /[!@#$%^&*(),.?":{}|<>]/.test(product.price)
    ) {
      updateFormErrors = {
        ...updateFormErrors,
        priceErrorMsg: {
          message: "Product Price Can Be A Numeric Value Only",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        priceErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (product.description.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        descriptionErrorMsg: {
          message: "Please Enter The Product Description",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        descriptionErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (product.mainImage.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        mainImageErrorMsg: {
          message: "Please Enter The Main Product Image",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        mainImageErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (product.optionalImage1.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        optionalImage1ErrorMsg: {
          message: "Please Enter The Optional Product Image",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        optionalImage1ErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    if (product.optionalImage2.length === 0) {
      updateFormErrors = {
        ...updateFormErrors,
        optionalImage2ErrorMsg: {
          message: "Please Enter The Optional Product Image",
          isVisible: true,
        },
      };
    } else {
      updateFormErrors = {
        ...updateFormErrors,
        optionalImage2ErrorMsg: {
          message: "",
          isVisible: false,
        },
      };
    }

    setUpdateFormError(updateFormErrors);
    return (
      updateFormErrors.nameErrorMsg.isVisible ||
      updateFormErrors.typeErrorMsg.isVisible ||
      updateFormErrors.flavorErrorMsg.isVisible ||
      updateFormErrors.weightErrorMsg.isVisible ||
      updateFormErrors.priceErrorMsg.isVisible ||
      updateFormErrors.descriptionErrorMsg.isVisible ||
      updateFormErrors.mainImageErrorMsg.isVisible ||
      updateFormErrors.optionalImage1ErrorMsg.isVisible ||
      updateFormErrors.optionalImage2ErrorMsg.isVisible
    );
  };
  useEffect(() => {
    console.log(
      updateFormError.nameErrorMsg.message,
      updateFormError.nameErrorMsg.isVisible
    );
  }, [updateFormError]);
  useEffect(() => {
    console.log(props.category);
  }, [props.category]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validated = validateProductInput();

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

    if (!validated) {
      setValidated(true);
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
          setProduct({
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
          formRef.current.reset();
          setValidated(false);
        }
      } catch (error) {
        console.log("ERROR IS", error);
      }
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

    if (typeError.length === 0) {
      swal("Added Successfully!", {
        icon: "success",
        button: false,
        timer: 1000,
      });
      if (props.category === "Cake") {
        cakeTypes.push(cakeType);
        handleTypeClose();
      } else {
        partyPackTypes.push(partyPackType);
        handleTypeClose();
      }
    }
  };
  const handleTypeAdd = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (value.length === 0) {
      setTypeError("Please Enter A New Type");
    } else if (/\d+/.test(value)) {
      setTypeError("Type Cannot Contain Numbers");
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      setTypeError("Type Cannot Contain Special Characters");
    } else {
      setTypeError("");
      setTypesAndFlavors({ ...typeAndFlavors, [name]: value });
    }
    console.log(value);
  };
  const handleSubmitFlavorAdd = async (event) => {
    event.preventDefault();
    const { cakeType, cakeFlavour, partyPackType, partyPackFlavor } =
      typeAndFlavors;

    if (flavorError.length === 0) {
      swal("Added Successfully!", {
        icon: "success",
        button: false,
        timer: 1000,
      });
      if (props.category === "Cake") {
        cakeFlavors.push(cakeFlavour);
        handleFlavorClose();
      } else {
        partyPackFlavors.push(partyPackFlavor);
        handleFlavorClose();
      }
    }
  };

  const handleFlavorAdd = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    if (value.length === 0) {
      setFlavorError("Please Enter A New Type");
    } else if (/\d+/.test(value)) {
      setFlavorError("Type Cannot Contain Numbers");
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      setFlavorError("Type Cannot Contain Special Characters");
    } else {
      setFlavorError("");
      setTypesAndFlavors({ ...typeAndFlavors, [name]: value });
    }
    console.log(value);
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
                    isInvalid={typeError.length !== 0}
                  />
                  <Form.Control.Feedback type="invalid">
                    {typeError}
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
                    isInvalid={flavorError.length !== 0}
                  />

                  <Form.Control.Feedback type="invalid">
                    {flavorError}
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
        ref={formRef}
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
                isInvalid={updateFormError.nameErrorMsg.isVisible}
              />

              <Form.Control.Feedback type="invalid">
                {updateFormError.nameErrorMsg.message}
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
                isInvalid={updateFormError.typeErrorMsg.isVisible}
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
              <Form.Control.Feedback type="invalid">
                {updateFormError.typeErrorMsg.message}
              </Form.Control.Feedback>
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
                isInvalid={updateFormError.flavorErrorMsg.isVisible}
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
              <Form.Control.Feedback type="invalid">
                {updateFormError.flavorErrorMsg.message}
              </Form.Control.Feedback>
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
                isInvalid={updateFormError.weightErrorMsg.isVisible}
              />
              <Form.Control.Feedback type="invalid">
                {updateFormError.weightErrorMsg.message}
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
                isInvalid={updateFormError.priceErrorMsg.isVisible}
              />
              <Form.Control.Feedback type="invalid">
                {updateFormError.priceErrorMsg.message}
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
                isInvalid={updateFormError.descriptionErrorMsg.isVisible}
              />
              <Form.Control.Feedback type="invalid">
                {updateFormError.descriptionErrorMsg.message}
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
                  isInvalid={updateFormError.mainImageErrorMsg.isVisible}
                />
                <Form.Control.Feedback type="invalid">
                  <div style={{ fontSize: "15px" }}>
                    {updateFormError.mainImageErrorMsg.message}
                  </div>
                </Form.Control.Feedback>
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
                  isInvalid={updateFormError.optionalImage1ErrorMsg.isVisible}
                />
                <Form.Control.Feedback type="invalid">
                  <div style={{ fontSize: "15px" }}>
                    {updateFormError.optionalImage1ErrorMsg.message}
                  </div>
                </Form.Control.Feedback>
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
                  isInvalid={updateFormError.optionalImage2ErrorMsg.isVisible}
                />
                <Form.Control.Feedback type="invalid">
                  <div style={{ fontSize: "15px" }}>
                    {updateFormError.optionalImage2ErrorMsg.message}
                  </div>
                </Form.Control.Feedback>
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
