import { Container } from "react-bootstrap";
import React from "react";
import useAuth from "../../../hooks/useAuth";
import ImageGallery from "./ImageGallery";


function HomePage() {
  const { activeUser } = useAuth();
  return (
    <div className="text-center mt-2">
      {activeUser ? (
        <>
          <h3>
            Hi! {activeUser.firstName} {activeUser.lastName}!
          </h3>
          <h3>Welcome back to the pet adoption agency!</h3>
        </>
      ) : (
        <>
          <h3 className="my-2">Welcome to the pet adoption agency!</h3>
          <p className="my-2">
            Go ahead and sign up to adopt your pet today, or use
            our search to find your perfect match first!
          </p>
        </>
      )}
      <Container className=" mt-1">
        <ImageGallery />
      </Container>
    </div>
  );
}

export default HomePage;
