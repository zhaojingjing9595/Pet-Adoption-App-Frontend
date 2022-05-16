import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import MyPetsNavbar from "./MyPetsNavbar";
import PetCard from "../../PetCard";
import useAuth from "../../../hooks/useAuth";
import { getSavedPetsByUserId } from "../../../services/api";

function SavedPetsPage() {
  const { activeUser } = useAuth();
    const [ savedPets, setSavedPets ] = useState(null);
    
    useEffect(() => {
      async function fetchSavedPets() {
          const result = await getSavedPetsByUserId(activeUser.userId);
           if (result.length > 0) {
               setSavedPets(result);
           }
      }
      fetchSavedPets();
    }, [ activeUser.userId ]);
    
  return (
    <Container className="pt-3">
      <MyPetsNavbar />
      <Row className="justify-content-center">
        <Col md="12" lg="10" xl="8">
          {!savedPets && (
            <h5 className="text-center">You didn't save any pets in here.</h5>
          )}
          {savedPets && (
            <Row xs={1} sm={2} md={3} className="g-4 py-3 ">
              {savedPets.map((eachPet, index) => (
                <Col key={index}>
                  <PetCard pet={eachPet}/>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default SavedPetsPage;
