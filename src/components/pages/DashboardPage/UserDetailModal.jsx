import React, { useState, useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import { addOrCancelAdmin, getOwnedPetsByUserId, getUserById } from "../../../services/api";
import PetCard from "../../PetCard";

function UserDetailModal({ show, onModalClose, userId }) {
  // maybe use getUserFullInfoById API:
  const { activeUser } = useAuth();
  const [ user, setUser ] = useState();
  const [ ownedPets, setOwnedPets ] = useState(null);
  const [ adminStatus, setAdminStatus ] = useState();
  
  useEffect(() => {
    async function fetchOwnedPets() {
      const result = await getOwnedPetsByUserId(userId);
      if (result.length > 0) {
        setOwnedPets(result);
      }
    }
    async function fetchUser(userId) {
      const response = await getUserById(userId);
      if (response) {
        setUser(response);
        setAdminStatus(response.admin===1?"Admin":"User")
      }
    }
    userId && fetchUser(userId);
    userId && fetchOwnedPets();
  }, [userId]);

  function handleModalClose() {
    onModalClose();
    setOwnedPets(null);
    setAdminStatus();
    
  }

  async function handleAddAdmin() {
    const newUser = await addOrCancelAdmin(userId, { admin: 1 });
    setAdminStatus("Admin")
    console.log(newUser);
  }

   async function handleCancelAdmin() {
     const newUser = await addOrCancelAdmin(userId, { admin: 0 });
     setAdminStatus("User");
     console.log(newUser);
   }
  return (
    <Modal
      size="lg"
      show={show}
      fullscreen={"lg-down"}
      centered
      onHide={handleModalClose}
    >
      <Modal.Header closeButton>
        {user && (
          <Modal.Title style={{ color: "white" }}>User detail:</Modal.Title>
        )}
      </Modal.Header>
      {user && adminStatus && (
        <Modal.Body>
          <Row>
            <Col>First name: {user.firstName}</Col>
            <Col>Last name: {user.lastName}</Col>
          </Row>
          <Row className="mt-2">
            <Col>Phone number: {user.phoneNumber}</Col>
            <Col>Email address: {user.email}</Col>
          </Row>
          <Row className="mt-2">
            <Col>Bio: {user.bio}</Col>
            <Col>
              {" "}
              User Type:{" "}
              <strong>
                <u>
                  {adminStatus
                    ? adminStatus
                    : user.admin === 1
                    ? "Admin"
                    : "User"}
                </u>{" "}
                &nbsp;&nbsp;
              </strong>
              {user.userId !== activeUser.userId && adminStatus==="Admin" && (
                <Button
                  variant="outlined"
                  size="small"
                  style={{ color: "#563d7c", borderColor: "#563d7c" }}
                  onClick={handleCancelAdmin}
                >
                  Remove admin
                </Button>
              )}
              {user.userId !== activeUser.userId &&
                adminStatus==="User" && (
                  <Button
                    variant="outlined"
                    size="small"
                    style={{ color: "#563d7c", borderColor: "#563d7c" }}
                    onClick={handleAddAdmin}
                  >
                    Add admin
                  </Button>
                )}
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col xs={10}>
              {!ownedPets && (
                <h5 className="text-center">
                  The User currently doesn't own or foster any pets.
                </h5>
              )}
              {ownedPets && (
                <>
                  <Row className="mt-2">
                    <Col>
                      <h5>
                        {user.firstName} is adopting / fostering the following
                        pets:
                      </h5>
                    </Col>
                  </Row>
                  <Row xs={1} sm={2} md={3} className="g-4 py-3">
                    {ownedPets.map((eachPet) => (
                      <Col key={eachPet.petId}>
                        <PetCard pet={eachPet} />
                      </Col>
                    ))}
                  </Row>
                </>
              )}
            </Col>
          </Row>
        </Modal.Body>
      )}
    </Modal>
  );
}

export default UserDetailModal;
