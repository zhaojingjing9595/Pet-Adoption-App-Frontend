import React from "react";
import PetForm from "./PetForm";
import { Row, Col, Container } from "react-bootstrap";


function AddPetPage() {
  
  return (
    <Container>
      <h3 className="text-center my-3">Add a new pet </h3>
      <Row className="justify-content-center">
        <Col xs="10" lg="8" xl="6">
          <PetForm  />
        </Col>
      </Row>
    </Container>
  );
}

export default AddPetPage;
