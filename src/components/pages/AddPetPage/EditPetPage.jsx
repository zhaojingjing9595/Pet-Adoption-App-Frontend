import React from 'react';
import { Row, Col, Container } from "react-bootstrap";
import PetForm from "./PetForm";

function EditPetPage() {
    return (
      <Container>
        <h3 className="text-center my-3">Edit this pet </h3>
        <Row className="justify-content-center">
          <Col xs="10" lg="8" xl="6">
            <PetForm />
          </Col>
        </Row>
      </Container>
    );
}

export default EditPetPage;