
import React, { useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import { changeProfile } from "../../../services/api.js";

function ProfileForm() {
  const { activeUser, onProfileChange } = useAuth();
  const [firstName, setFirstName] = useState(activeUser.firstName);
  const [lastName, setLastName] = useState(activeUser.lastName);
  const [email, setEmail] = useState(activeUser.email);
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(activeUser.phoneNumber);
  const [ bio, setBio ] = useState(activeUser.bio? activeUser.bio : '');
  const [ isSaved, setIsSaved ] = useState(false);
  const [ errors, setErrors ] = useState('');
  const [ showPwdChange, setShowPwdChange ] = useState(false);

  async function handleSaveChanges() {
    setErrors('');
    const userId = activeUser.userId;
    const newProfile = {
      email,
      firstName,
      lastName,
      phoneNumber,
      bio,
    };
    if (password) {
      newProfile.password = password;
    }
    try {
      const newUserProfile = await changeProfile(userId, newProfile);
      // console.log(newUserProfile)
      if (newUserProfile) {
        onProfileChange(newUserProfile);
        setIsSaved(true);
        setShowPwdChange(false);
        setPassword('');
        setTimeout(() => {
          setIsSaved(false);
        }, 3000);
      }
    } catch (error) {
      const errors = error.response.data.map((e) => e.message);
      // console.log(errors);
      setErrors(errors);
    }
  }

  function handleShowPwdChange() { 
    setShowPwdChange(!showPwdChange)
  }

  return (
    <Form className="p-form my-3">
      {isSaved && <Alert variant="success">Profile changes saved!</Alert>}
      {errors &&
        errors.map((e, index) => (
          <Alert key={index} variant="danger">
            {e}
          </Alert>
        ))}
      <Row className="mb-3">
        <Col xs="12" md="6" lg="6" className="mb-3">
          <Form.Group controlId="formGridFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              disabled={isSaved ? true : false}
              type="first name"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs="12" md="6" lg="6">
          <Form.Group controlId="formGridLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              disabled={isSaved ? true : false}
              type="last name"
              placeholder="Enter Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs="12" md="6" lg="6" className="mb-3">
          <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              disabled={isSaved ? true : false}
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col xs="12" md="6" lg="6">
          {" "}
          <Form.Group as={Col} controlId="formGridPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              disabled={isSaved ? true : false}
              type="number"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="my-3">
        <Col xs="12" md="6" className="my-3">
          <Button
            variant="outlined"
            className="p-form-btn justify-content-center"
            style={{
              marginLeft: "auto",
              borderColor: "#563d7c",
              color: "#563d7c",
            }}
            type="button"
            onClick={handleShowPwdChange}
          >
            Change to a new password?
          </Button>
        </Col>
        <Col xs="12" md="6" className="my-3">
          {showPwdChange && (
            <Form.Group controlId="formGridPassword">
              {/* <Form.Label>Change Password</Form.Label> */}
              <Form.Control
                disabled={isSaved ? true : false}
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Form.Group controlId="formGridBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            disabled={isSaved ? true : false}
            as="textarea"
            rows={5}
            placeholder="Add a bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </Form.Group>
      </Row>
      <div style={{ display: "flex" }}>
        <Button
          disabled={isSaved ? true : false}
          className="p-form-btn"
          style={{
            marginLeft: "auto",
            backgroundColor: "#563d7c",
            borderColor: "#563d7c",
          }}
          type="button"
          onClick={handleSaveChanges}
        >
          Save Change
        </Button>
      </div>
    </Form>
  );
}

export default ProfileForm;
