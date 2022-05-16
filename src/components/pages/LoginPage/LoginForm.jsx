import React, { useState } from "react";
import { Form, FloatingLabel, Button, Alert, Spinner } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";

function LoginForm() {
  const { onModalClose, onLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [emptyFieldError, setEmptyFieldError] = useState(false);

  async function handleLogin(email, password) {
    setLoginError(false);
    setEmptyFieldError(false);
    setLoginError("");
    if (!email || !password) {
      setEmptyFieldError(true);
    } else {
      try {
         setIsLoggingIn(true);
        await onLogin(email, password);
        setIsLoggingIn(false);
      } catch (error) {
        console.log(error.response.data[0].message);
        const errors = error.response.data.map((e) => e.message);
        setLoginError(errors);
        // setTimeout(() => {
        //   setLoginError("");
        // }, 3000);
        setIsLoggingIn(false);
      }
    }
  }
  return (
    <Form>
      <h5 className="mb-3 px-2">Login</h5>
      {emptyFieldError && (
        <Alert variant="danger">Error: please complete all fields!</Alert>
      )}
      {loginError &&
        loginError.map((error, index) => (
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
      <div className="text-end">
        <Button
          disabled={isLoggingIn ? true : false}
          variant="link"
          style={{ color: "#563d7c", textDecoration: "none" }}
          onClick={onModalClose}
        >
          CANCEL
        </Button>
        {/* onClick Login button, need to setIsLoginModal(false) */}
        <Button
          disabled={isLoggingIn ? true : false}
          variant="link"
          style={{ color: "#563d7c", textDecoration: "none" }}
          onClick={() => handleLogin(email, password)}
        >
          LOGIN
        </Button>
        {isLoggingIn && <Spinner animation="border" size="sm" />}
      </div>
    </Form>
  );
}

export default LoginForm;
