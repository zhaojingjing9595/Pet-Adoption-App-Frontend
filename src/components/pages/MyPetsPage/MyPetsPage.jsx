import { Row, Col, Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import MyPetsNavbar from "./MyPetsNavbar";
import PetCard from "../../PetCard";
import useAuth from "../../../hooks/useAuth";
import { getOwnedPetsByUserId } from "../../../services/api";

function MyPetsPage() {
  const { activeUser } = useAuth();
  const [ownedPets, setOwnedPets] = useState(null);

  useEffect(() => {
    async function fetchOwnedPets() {
      const result = await getOwnedPetsByUserId(activeUser.userId);
      if (result.length > 0) {
        setOwnedPets(result);
      }
    }
    fetchOwnedPets();
  }, [activeUser.userId]);

  return (
    <Container className="pt-3">
      <MyPetsNavbar />
      <Row className="justify-content-center">
        <Col md="12" lg="10" xl="8">
          {!ownedPets && (
            <h5 className="text-center">
              You currently don't own or foster any pets.
            </h5>
          )}
          {ownedPets && (
            <Row xs={1} sm={2} md={3} className="g-4 py-3">
              {ownedPets.map((eachPet) => (
                <Col key={eachPet.petId}>
                  <PetCard pet={eachPet} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MyPetsPage;
