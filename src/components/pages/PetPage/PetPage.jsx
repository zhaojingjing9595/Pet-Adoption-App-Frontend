import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  adoptOrFosterPet,
  deleteSavedPet,
  getPetBtId,
  returnPet,
  savePet,
} from "../../../services/api.js";
import useAuth from "../../../hooks/useAuth";
import { getSavedPetsByUserId } from "../../../services/api.js";
import { useNavigate } from "react-router-dom";

function PetPage() {
  const { activeUser } = useAuth();
  const { id } = useParams();
  const [pet, setPet] = useState();
  const [isAvailable, setIsAvailable] = useState(); //true);
  const [isFostered, setIsFostered] = useState(); //false);
  const [isOwnedByActiveUser, setIsOwnedByActiveUser] = useState(); //false);
  const [isSavedByActiveUser, setIsSavedByActiveUser] = useState(); //true);
  const [savedPets, setSavedPets] = useState(null);
  const navigate = useNavigate();
 
  useEffect(() => {
    async function getPet() {
      const response = await getPetBtId(id);
      setPet(response);
    }
    getPet();
  }, [id]);

  useEffect(() => {
    async function fetchSavedPets() {
      const result = await getSavedPetsByUserId(activeUser.userId);
      if (result.length > 0) {
        setSavedPets(result);
      }
    }
    activeUser && fetchSavedPets();
  }, [activeUser, isSavedByActiveUser]);

  useEffect(() => {
    if (activeUser) {
      if (pet && pet.adoptionStatus === "Available") {
        setIsAvailable(true);
        setIsFostered(false);
        setIsOwnedByActiveUser(false);
      } else if (pet && pet.adoptionStatus === "Fostered") {
        setIsAvailable(false);
        setIsFostered(true);
        if (pet.ownerId === activeUser.userId) {
          setIsOwnedByActiveUser(true);
        } else {
          setIsOwnedByActiveUser(false);
        }
      } else if (pet && pet.adoptionStatus === "Adopted") {
        setIsAvailable(false);
        setIsFostered(false);
        if (pet.ownerId === activeUser.userId) {
          setIsOwnedByActiveUser(true);
        } else {
          setIsOwnedByActiveUser(false);
        }
      }
      if (savedPets && pet) {
        const isSaved = savedPets.filter((e) => e.petId === pet.petId);
        if (isSaved.length > 0) {
          setIsSavedByActiveUser(true);
        } else {
          setIsSavedByActiveUser(false);
        }
      } else {
        setIsSavedByActiveUser(false);
      }
    }
  }, [activeUser, pet, savedPets]);

  async function handleReturn() {
    const returnedPet = await returnPet(activeUser.userId, id);
    setPet(returnedPet);
    // console.log(returnedPet);
  }

  async function handleAdopt() {
    const adoptOrFosterType = "Adopted";
    const adoptedPet = await adoptOrFosterPet(
      activeUser.userId,
      id,
      adoptOrFosterType
    );
    // console.log(adoptedPet);
    setPet(adoptedPet);
  }

  async function handleFoster() {
    const adoptOrFosterType = "Fostered";
    const fosteredPet = await adoptOrFosterPet(
      activeUser.userId,
      id,
      adoptOrFosterType
    );
    // console.log(fosteredPet);
    setPet(fosteredPet);
  }

  async function handleSave() {
    // const savedPet =
      await savePet(activeUser.userId, id);
    // console.log(savedPet);
    setIsSavedByActiveUser(true);
  }

  async function handleUnSave() {
    await deleteSavedPet(activeUser.userId, id);
    setIsSavedByActiveUser(false);
  }

  return (
    <Container>
      <Row className="justify-content-center my-4">
        <Col xs="10" lg="6">
          {pet && (
            <Card
              //   sx={{ maxWidth: 345 }}
              className="mb-4"
              style={{ margin: "auto" }}
            >
              <CardMedia
                className="mt-3 text-center"
                component="img"
                height="350"
                style={{ width: "100%", objectFit: "contain" }}
                image={pet.picture}
                alt="pet image"
              />
              <CardContent className="px-5">
                <Typography
                  className="text-center"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {pet.name}
                </Typography>
                <Typography className="text-center" variant="body" color="text">
                  {pet.name}'s breed is {pet.breed}. {pet.name} is {pet.height}{" "}
                  cm tall, and weights {pet.weight} kg.
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Bio: {pet.bio}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Color: {pet.color}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Adoption Status: {pet.adoptionStatus}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hypoallergenic: {pet.hypoallergenic === 1 ? "Yes" : "No"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dietary Restrictions: {pet.dietary}
                </Typography>
              </CardContent>
              <CardActions className="px-5">
                {activeUser && (
                  <>
                    {isOwnedByActiveUser && (
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ color: "#563d7c", borderColor: "#563d7c" }}
                        onClick={handleReturn}
                      >
                        Return
                      </Button>
                    )}
                    {(isAvailable || (isFostered && isOwnedByActiveUser)) && (
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ color: "#563d7c", borderColor: "#563d7c" }}
                        onClick={handleAdopt}
                      >
                        Adopt
                      </Button>
                    )}
                    {isAvailable && (
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ color: "#563d7c", borderColor: "#563d7c" }}
                        onClick={handleFoster}
                      >
                        Foster
                      </Button>
                    )}
                    {!isSavedByActiveUser && (
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ color: "#563d7c", borderColor: "#563d7c" }}
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                    )}
                    {isSavedByActiveUser && (
                      <Button
                        variant="outlined"
                        size="small"
                        style={{ color: "#563d7c", borderColor: "#563d7c" }}
                        onClick={handleUnSave}
                      >
                        Unsave
                      </Button>
                    )}
                  </>
                )}
                {activeUser && activeUser.admin === 1 && (
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ color: "#563d7c", borderColor: "#563d7c" }}
                    onClick={() => navigate(`/editPet/${id}`)}
                  >
                    Edit pet
                  </Button>
                )}
                {!activeUser && (
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ color: "#563d7c", borderColor: "#563d7c" }}
                    onClick={() => navigate("/login")}
                  >
                    Signup/Login to Adopt
                  </Button>
                )}
              </CardActions>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PetPage;
