import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { login, setAuthHeader, signUp } from "../services/api";

function AuthProvider({ children }) {
  const [activeUser, setActiveUser] = useState(
    localStorage.activeUser ? JSON.parse(localStorage.activeUser) : null
  );
  // save token to localStorage:
  // const [token, setToken] = useState(localStorage.token);
  const [isModalShow, setIsModalShow] = useState(false);
  const navigate = useNavigate();

  // save localStorage-token to the req.header,happen before each render, even when refreshing page, useMemo save it to the header again, cookie dont need to set header.
  // useMemo(() => {
  //   setAuthHeader(token);
  // }, [token]);

  const handleModalShow = () => {
    setIsModalShow(true);
  };
  const handleModalClose = () => setIsModalShow(false);

  const handleLogin = async (email, password) => {
    // const { user, token } = await login(email, password);
    const user = await login(email, password);
    if (user) {
      localStorage.activeUser = JSON.stringify(user);
      // localStorage.token = token;
      // console.log(user);
      setActiveUser(user);
      // setToken(token);
      handleModalClose();
      navigate("/");
    }
  };

  function handleSignUp(user) {
    if (user) {
      localStorage.activeUser = JSON.stringify(user);
      setActiveUser(user);
      console.log(user);
      handleModalClose();
      navigate("/");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("activeUser");
    // localStorage.removeItem("token");
    setActiveUser(null);
    // setToken("");
    // navigate("/");
  };

  function handleProfileChange(newUserProfile) {
      localStorage.activeUser = JSON.stringify(newUserProfile);
      setActiveUser(newUserProfile);

  }

  return (
    <AuthContext.Provider
      value={{
        activeUser,
        isModalShow,
        onModalShow: handleModalShow,
        onModalClose: handleModalClose,
        onLogin: handleLogin,
        onSignUp: handleSignUp,
        onLogout: handleLogout,
        onProfileChange: handleProfileChange
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
