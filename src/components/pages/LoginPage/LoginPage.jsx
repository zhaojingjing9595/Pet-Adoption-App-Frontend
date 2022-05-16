import React,{ useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import ImageGallery from "../HomePage/ImageGallery";
import LoginSignUpModal from "./LoginSignUpModal";

function LoginPage() {
  const { onModalShow } = useAuth();
  useEffect(() => {
    onModalShow();
  }, []);
  return (
    <div className="text-center mt-3">
      <h3 className="my-2">Welcome to the pet adoption agency!</h3>
      <p className="my-2">
        Go ahead and sign up to adopt your pet today, or use our search to find
        your perfect match first!
      </p>
      <ImageGallery />
      <LoginSignUpModal />
    </div>
  );
}

export default LoginPage;
