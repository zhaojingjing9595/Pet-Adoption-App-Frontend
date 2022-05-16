import React from "react";
import {  Row, Col, Container } from "react-bootstrap";
import ProfileForm from "./ProfileForm";


function ProfilePage() {
  
  return (
    <Container>
      <h3 className="text-center my-3">My Profile</h3>
      <Row className="justify-content-center">
        <Col xs="10" md="10" lg="8" xl="6">
          <ProfileForm />
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
