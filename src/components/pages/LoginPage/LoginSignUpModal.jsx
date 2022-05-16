import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import './LoginSignUpModal.css'
import useAuth from "../../../hooks/useAuth";

function LoginSignUpModal() {
  const { isModalShow, onModalClose } = useAuth();
  const [isLoginModal, setIsLoginModal] = useState(false);
  return (
    <Modal
      show={isModalShow}
      onHide={onModalClose}
      centered
    >
      <Modal.Header className="modal-header">
        <Modal.Title>
          <Button
            className="modal-header-btn-link me-3"
            variant="link"
            onClick={() => setIsLoginModal(false)}
          >
            SIGNUP
          </Button>
          <Button
            className="modal-header-btn-link ms-3"
            variant="link"
            onClick={() => setIsLoginModal(true)}
          >
            LOGIN
          </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-5">
        {isLoginModal ? <LoginForm /> : <SignUpForm />}
      </Modal.Body>
    </Modal>
  );
}

export default LoginSignUpModal;
