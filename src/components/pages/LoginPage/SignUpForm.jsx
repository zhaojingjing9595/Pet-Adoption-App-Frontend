import React, { useState } from "react";
import { Form, FloatingLabel, Button, Alert, Spinner } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import { signUp } from "../../../services/api";
import './SignUpForm.css'

function SignUpForm() {
  const { onModalClose, onSignUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [mismatchPassword, setMismatchPassword] = useState(false);
  const [ isSigningUp, setIsSigningUp ] = useState(false);
  const [ schemaError, setSchemaError ] = useState();

  async function handleSignUp() {
    setEmptyFieldError(false);
    setMismatchPassword(false);
    setSchemaError('');
    if (
      !email ||
      !password ||
      !rePassword ||
      !firstName ||
      !lastName ||
      !phoneNumber
    ) {
      setEmptyFieldError(true);
    }
    else if (password !== rePassword) {
      setMismatchPassword(true);
    } else { 
      setIsSigningUp(true);
      const newUser = {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
      };
      console.log(phoneNumber);
      console.log(typeof phoneNumber);
      try {
        const user = await signUp(newUser);
        onSignUp(user);
        setEmptyFieldError(false);
        setIsSigningUp(false);
      } catch (error) {
        const errors = error.response.data.map((e) => e.message);
        console.log(errors);
        setSchemaError(errors);
        // setTimeout(() => {
        //   setSchemaError('');
        // }, 3000);

        setEmptyFieldError(false);
        setIsSigningUp(false);
      }

    }
  }
  return (
    <Form>
      <h5 className="mb-3 px-2 ">Sign Up</h5>
      {emptyFieldError && (
        <Alert variant="danger">Error: please complete all fields!</Alert>
      )}
      {mismatchPassword && (
        <Alert variant="danger">Please retype password!</Alert>
      )}
      {schemaError &&
        schemaError.map((error, index) => (
          <Alert key={index} variant="danger">
            {error}
          </Alert>
        ))}
      <FloatingLabel
        controlId="floatingEmailAddress"
        label="Email address"
        className="mb-2"
      >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingPassword"
        label="Password"
        className="mb-2"
      >
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingPassword2"
        label="Retype Password"
        className="mb-2"
      >
        <Form.Control
          type="password"
          placeholder="Retype Password"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingFirstName"
        label="First Name"
        className="mb-2"
      >
        <Form.Control
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingLastName"
        label="Last Name"
        className="mb-2"
      >
        <Form.Control
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingPhoneNumber"
        label="Phone Number"
        className="mb-2"
      >
        <Form.Control
          type="number"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </FloatingLabel>
      <div className="text-end">
        <Button
          disabled={isSigningUp ? true : false}
          variant="link"
          style={{ color: "#563d7c", textDecoration: "none" }}
          onClick={onModalClose}
        >
          CANCEL
        </Button>
        <Button
          disabled={isSigningUp ? true : false}
          variant="link"
          style={{ color: "#563d7c", textDecoration: "none" }}
          onClick={handleSignUp}
        >
          SIGNUP
        </Button>
        {isSigningUp && <Spinner animation="border" size="sm" />}
      </div>
    </Form>
  );
}

export default SignUpForm;
