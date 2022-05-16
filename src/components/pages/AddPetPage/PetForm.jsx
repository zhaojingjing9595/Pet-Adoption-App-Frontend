import React, { useState, useLayoutEffect, useRef } from "react";
import { Form, Row, Col, Button, Alert, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { addPet, editPet, getPetBtId } from "../../../services/api";



function PetForm() {
  const { petId } = useParams();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [breed, setBreed] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [color, setColor] = useState("");
  const [bio, setBio] = useState("");
  const [hypoallergenic, setHypoallergenic] = useState("");
  const [dietary, setDietary] = useState("");
  const fileImgRef = useRef();
  const [ isSaved, setIsSaved ] = useState(false);
  const [ heightError, setHeightError ] = useState(false);
  const [ emptyFieldError, setEmptyFieldError ] = useState(false);
  
 

  useLayoutEffect(() => {
    async function getPet(id) {
      const pet = await getPetBtId(id);
      setName(pet.name);
      setType(pet.type);
      setAdoptionStatus(pet.adoptionStatus);
      fileImgRef.current.value = null;
      setBreed(pet.breed);
      setColor(pet.color);
      setHeight(pet.height);
      setWeight(pet.weight);
      setDietary(pet.dietary);
      setHypoallergenic(pet.hypoallergenic == true ? "true" : "false");
      setBio(pet.bio || "");
    }
    if (petId) {
      getPet(petId);
    }
  }, [petId]);

  async function handleAddOrEditPet(e) {
    e.preventDefault();
    setEmptyFieldError(false);
    setHeightError(false);
    const hypoallergenicValue = hypoallergenic === "true" ? 1 : 0;
    const newPet = {
      type,
      name,
      adoptionStatus,
      picture: fileImgRef.current.files[0],
      breed,
      height: parseFloat(height),
      weight: parseFloat(weight),
      color,
      hypoallergenic: hypoallergenicValue,
      dietary,
      bio,
    };
    // console.log("newPet", newPet);
    if (
      !type ||
      !name ||
      !adoptionStatus ||
      !breed ||
      !height ||
      !weight ||
      !color ||
      !hypoallergenic ||
      !dietary ||
      !bio ||
      (!newPet.picture && !petId)
    ) {
      setEmptyFieldError(true);
    } else if (newPet.height <= 0 || newPet.weight <= 0) {
      setHeightError(true);
    } else {
      // setErrors(petFormValidate(newPet));
      try {
        if (!petId) {
          setIsSaved(true);
          const addedPet = await addPet(newPet);
          if (addedPet) {
            // console.log("addedPet", addedPet);
            setName("");
            setType("");
            setAdoptionStatus("");
            fileImgRef.current.value = null;
            setBio("");
            setBreed("");
            setColor("");
            setDietary("");
            setHeight(0);
            setWeight(0);
            setHypoallergenic("");
            // setTimeout(() => {
              setIsSaved(false);
            // }, 3000);
          }
        } else if (petId) {
          setIsSaved(true);
          const editedPet = await editPet(petId, newPet);
          if (editedPet) {
            console.log("editedPet", editedPet);
            setTimeout(() => {
              setIsSaved(false);
            }, 3000);
          }
        }
      } catch (error) {
        const errors = error.response.data.map((e) => e.message);
        console.log(errors);
      }
    }
  }
  return (
    <Form className="p-form my-3">
      {isSaved && !petId && (
        <Alert variant="success">Added a new pet successfully!</Alert>
      )}
      {isSaved && petId && (
        <Alert variant="success">Changes saved successfully!</Alert>
      )}
      {emptyFieldError && (
        <Alert variant="danger">Please complete all fields!</Alert>
      )}
      {heightError && (
        <Alert variant="danger">
          Height and weight should not be less than 0!
        </Alert>
      )}
      <Row className="mb-3">
        <Col xs="12" md="4">
          <Form.Group controlId="formGridName" className="mb-3">
            <Form.Label>Pet Name</Form.Label>
            <Form.Control
              disabled={isSaved ? true : false}
              type="text"
              placeholder="Enter pet's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs="12" md="4" className="mb-3">
          <Form.Group>
            <Form.Label>Type</Form.Label>
            <Form.Select
              value={type}
              disabled={isSaved ? true : false}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Choose...</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Fish">Fish</option>
              <option value="Turtle">Turtle</option>
              <option value="Hamster">Hamster</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs="12" md="4">
          <Form.Group>
            <Form.Label>Adoption Status</Form.Label>
            <Form.Select
              value={adoptionStatus}
              onChange={(e) => setAdoptionStatus(e.target.value)}
              disabled={isSaved ? true : false}
            >
              <option value="">Choose...</option>
              <option value="Available">Available</option>
              <option value="Adopted">Adopted</option>
              <option value="Fostered">Fostered</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs="12" md="4" className="mb-3">
          <Form.Group controlId="formGridBreed">
            <Form.Label>Breed</Form.Label>
            <Form.Control
              disabled={isSaved ? true : false}
              type="text"
              placeholder="Enter pet's breed"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs="12" md="4" className="mb-3">
          <Form.Group controlId="formGridHeight">
            <Form.Label>Height</Form.Label>
            <InputGroup>
              <Form.Control
                disabled={isSaved ? true : false}
                type="number"
                placeholder="Enter height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <InputGroup.Text id="basic-addon1">cm</InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col xs="12" md="4">
          <Form.Group controlId="formGridWeight">
            <Form.Label>Weight</Form.Label>
            <InputGroup>
              <Form.Control
                disabled={isSaved ? true : false}
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
              <InputGroup.Text id="basic-addon1">kg</InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs="12" md="4" className="mb-3">
          <Form.Group controlId="formGridColor">
            <Form.Label>Color</Form.Label>
            <Form.Control
              disabled={isSaved ? true : false}
              type="text"
              placeholder="Enter pet's color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs="12" md="4" className="mb-3">
          <Form.Group>
            <Form.Label>Hypoallergenic</Form.Label>
            <Form.Select
              value={hypoallergenic}
              disabled={isSaved ? true : false}
              onChange={(e) => setHypoallergenic(e.target.value)}
            >
              <option value="">Choose...</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs="12" md="4">
          <Form.Group controlId="formGridDietary">
            <Form.Label>Dietary</Form.Label>
            <Form.Control
              disabled={isSaved ? true : false}
              type="text"
              placeholder="Enter pet's dietary"
              value={dietary}
              onChange={(e) => setDietary(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="formGridFile" className="mb-3">
          {!petId && <Form.Label>Add Picture</Form.Label>}
          {petId && <Form.Label>Change Picture</Form.Label>}
          <Form.Control
            disabled={isSaved ? true : false}
            ref={fileImgRef}
            type="file"
            name="picture"
            accept="image/*"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="formGridBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            disabled={isSaved ? true : false}
            as="textarea"
            rows={5}
            placeholder="Add a bio for the pet..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
      </Row>
      <div style={{ display: "flex" }}>
        {!petId && (
          <Button
            className="p-form-btn"
            style={{
              marginLeft: "auto",
              backgroundColor: "#563d7c",
              borderColor: "#563d7c",
            }}
            type="submit"
            onClick={handleAddOrEditPet}
          >
            Add
          </Button>
        )}
        {petId && (
          <Button
            className="p-form-btn"
            style={{
              marginLeft: "auto",
              backgroundColor: "#563d7c",
              borderColor: "#563d7c",
            }}
            type="submit"
            onClick={handleAddOrEditPet}
          >
            Edit
          </Button>
        )}
      </div>
    </Form>
  );
}

export default PetForm;
