import React from 'react';
import { Row, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Nav} from "react-bootstrap";
import './MyPetsNavbar.css'
import { AiFillStar, AiTwotoneHeart } from 'react-icons/ai';

export default function MyPetsNavbar() {
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Nav className="me-auto justify-content-center">
          <Nav.Link id="my-pet-link" as={NavLink} to="/myPets">
            <AiTwotoneHeart />
            &nbsp; My Pets
          </Nav.Link>
          <Nav.Link id="saved-pet-link" as={NavLink} to="/savedPets">
            <AiFillStar /> &nbsp; Saved Pets
          </Nav.Link>
        </Nav>

      </Row>
    </Container>
  );
}
