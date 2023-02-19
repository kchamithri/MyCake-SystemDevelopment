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
import { useRef } from "react";
import { Box, FormHelperText, IconButton, Modal, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const UpdateProductForm = ({ dataToUpdate, handleShow }) => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const [data, setData] = useState({});
  const [show, setShow] = useState({
    showMain: true,
    showOpt1: true,
    showOpt2: true,
  });
  const [product, setProduct] = useState({});
  const formRef = useRef();
  const [cakeTypes, setCakeTypes] = useState([]);
  const [cakeFlavors, setCakeFlavors] = useState([]);
  const [partyPackTypes, setPartyPackTypes] = useState([]);
  const [partyPackFlavors, setPartyPackFlavors] = useState([]);
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
  const [typeError, setTypeError] = useState("");
  const [flavorError, setFlavorError] = useState("");
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

  useEffect(() => {
    setData(dataToUpdate[0]);
    setProduct(dataToUpdate[0]);
    let category = dataToUpdate[0].category;
    setProductCategory(category);
  }, [dataToUpdate]);

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
          message: "Product Name Cannot Contain Numbers",
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    let validated = validateProductInput();
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

    if (!validated) {
      setValidated(true);
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
      if (productCategory === "Cake") {
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
      if (productCategory === "Cake") {
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
                      productCategory === "Cake" ? "cakeType" : "partyPackType"
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
                      productCategory === "Cake"
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
        onSubmit={handleSubmit}
        style={{ margin: "2% 5% " }}
        enctype="multipart/form-data"
        method="POST"
        ref={formRef}
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
            <Col lg={4}>
              <Form.Select
                aria-label="Default select example"
                name="type"
                onChange={handleInput}
                value={product.type}
                isInvalid={updateFormError.typeErrorMsg.isVisible}
              >
                {productCategory === "Cake" ? (
                  <>
                    {cakeTypes.map((type) => {
                      return <option value={type}>{type}</option>;
                    })}
                  </>
                ) : (
                  <>
                    {partyPackTypes.map((type) => {
                      return <option value={type}>{type}</option>;
                    })}
                  </>
                )}
                {/* <option>{product.type}</option>
                <option value="Birthday Cake">Birthday Cake</option>
                <option value="Wedding Cakes">Wedding Cakes</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Kids Birthday">Kids Birthday</option> */}
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
                {productCategory === "Cake" ? (
                  <>
                    {cakeFlavors.map((type) => {
                      return <option value={type}>{type}</option>;
                    })}
                  </>
                ) : (
                  <>
                    {partyPackFlavors.map((type) => {
                      return <option value={type}>{type}</option>;
                    })}
                  </>
                )}
                {/* <option>{product.flavor}</option>
                <option value="Milk Chocolate">Milk Chocolate</option>
                <option value="Strawberry">Strawberry</option>
                <option value="Vanilla">Vanilla</option> */}
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
              Save Changes
            </Button>
          </div>
        </Stack>
      </Form>
    </>
  );
};

export default UpdateProductForm;
