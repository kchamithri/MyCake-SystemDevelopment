import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => (
  <Container
    className=" footer mt-2 relative"
    fluid
    style={{ width: "100", backgroundColor: "#F6DFEB" }}
  >
    <Row>
      <Col>
        <p className="about">
          <span> About the company</span> Ut congue augue non tellus bibendum,
          in varius tellus condimentum. In scelerisque nibh tortor, sed rhoncus
          odio condimentum in. Sed sed est ut sapien ultrices eleifend. Integer
          tellus est, vehicula eu lectus tincidunt, ultricies feugiat leo.
          Suspendisse tellus elit, pharetra in hendrerit ut, aliquam quis augue.
          Nam ut nibh mollis, tristique ante sed, viverra massa.
        </p>
        <div className="icons">
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fa fa-google-plus"></i>
          </a>
          <a href="#">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </Col>
      <Col>
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span> Street name and number</span> City, Country
          </p>
        </div>
        <div>
          <i className="fa fa-phone"></i>
          <p> (+00) 0000 000 000</p>
        </div>
        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a href="#"> office@company.com</a>
          </p>
        </div>
      </Col>
      <Col lg={4}>
        <h2>
          {" "}
          Company<span> logo</span>
        </h2>
        <p className="menu">
          <a href="#"> Home</a> |<a href="#"> About</a> |
          <a href="#"> Services</a> |<a href="#"> Portfolio</a> |
          <a href="#"> News</a> |<a href="#"> Contact</a>
        </p>
        <p className="name"> Company Name &copy; 2016</p>
      </Col>
    </Row>
  </Container>
);

export default Footer;
