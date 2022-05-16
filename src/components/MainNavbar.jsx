import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaDog, FaHome, } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import {  GiCat } from "react-icons/gi";
import { MdPets, MdLogout, MdOutlineDashboard } from "react-icons/md";
import { GoSignIn } from 'react-icons/go';
import { BsPersonCircle } from "react-icons/bs";
import { AiFillStar, AiTwotoneHeart } from "react-icons/ai";
import { BiMessageSquareAdd } from "react-icons/bi";
import "./MainNavbar.css";
import useAuth from "../hooks/useAuth";
import usePets from "../hooks/usePets";

function MainNavbar() {
  const { activeUser, onModalShow, onLogout } = useAuth();
  const { OnNavigateSearch } = usePets();
  
  return (
    <Navbar className="navbar" collapseOnSelect expand="xl" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <FaDog />
          &nbsp; Pet Adoption Agency&nbsp; <GiCat />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} eventKey="1" to="/">
              <FaHome /> &nbsp;Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              eventKey="2"
              to="/search"
              onClick={OnNavigateSearch}
            >
              <ImSearch /> &nbsp; Search
            </Nav.Link>
            {activeUser && activeUser.admin === 1 && (
              <>
                <Nav.Link as={NavLink} eventKey="3" to="/dashboard">
                  <MdOutlineDashboard /> &nbsp; Dashboard
                </Nav.Link>
                <Nav.Link as={NavLink} eventKey="4" to="/addPet">
                  <BiMessageSquareAdd /> &nbsp; Add Pet
                </Nav.Link>
              </>
            )}

            {activeUser && (
              <>
                <Nav.Link as={NavLink} eventKey="5" to="/profile">
                  <BsPersonCircle /> &nbsp; My Profile
                </Nav.Link>
                <NavDropdown
                  title={
                    <>
                      <MdPets /> &nbsp; My Pets Page
                    </>
                  }
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item
                    className="navbar-dropdown-item"
                    as={NavLink}
                    eventKey="6"
                    to="/myPets"
                  >
                    <AiTwotoneHeart />
                    &nbsp; My pets
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    className="navbar-dropdown-item"
                    as={NavLink}
                    eventKey="7"
                    to="/savedPets"
                  >
                    <AiFillStar /> &nbsp; Saved pets
                  </NavDropdown.Item>
                </NavDropdown>{" "}
              </>
            )}
          </Nav>
          <Nav>
            {activeUser ? (
              <Nav.Link as={NavLink} eventKey="8" to="/" onClick={onLogout}>
                Log out &nbsp; <MdLogout />
              </Nav.Link>
            ) : (
              <Nav.Link
                as={NavLink}
                eventKey="9"
                to="/login"
                onClick={onModalShow}
              >
                Login &nbsp;
                <GoSignIn />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
