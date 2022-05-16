import { Box, Paper } from '@mui/material';
import React, { useState, useEffect } from "react";
import { Col, Container, Row } from 'react-bootstrap';
// import DashboardDrawer from './DashboardDrawer'
import PetsList from './PetsList';
import UsersList from './UsersList';
import { getAllPets, getAllUsers } from '../../../services/api';
import './DashboardPage.css';
import { HiUserGroup } from "react-icons/hi";
import { MdAdminPanelSettings, MdEventAvailable,  MdPets } from 'react-icons/md';
import { GiDogBowl, GiDogHouse, GiFlamingo, GiSeatedMouse, GiSittingDog, GiTropicalFish, GiTurtle } from 'react-icons/gi';
import { FaCat } from 'react-icons/fa';

function DashboardPage() {
  const [ users, setUsers ] = useState([]);
  const [ pets, setPets ] = useState([]);
  const [ reloadPage, setReloadPage ] = useState(false);

  
   useEffect(() => {
     async function fetchUsers() {
       const usersArray = [];
       const result = await getAllUsers();
       if (result) {
         result.forEach((element, index) => {
           element.id = index + 1;
           element.admin = element.admin === 1 ? "Yes" : "No";
           usersArray.push(element);
         });
         setUsers(usersArray);
       }
     }
     fetchUsers();
   }, [reloadPage]);
  
  useEffect(() => {
    async function fetchPets() {
      const petsArray = [];
      const result = await getAllPets();
      result.forEach((element, index) => {
        element.id = index + 1;
        petsArray.push(element);
      });
      setPets(petsArray);
    }
    fetchPets();
  }, []);

  function onModalClose() {
    setReloadPage(!reloadPage);
  }
  
    return (
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
        {/* <DashboardDrawer /> */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* <DrawerHeader /> */}
          <Container>
            <Row className="my-3">
              <Col className="mt-3" xs={6} sm={6} md={4}>
                <Paper className="p-2" elevation={3}>
                  <h5>
                    <MdAdminPanelSettings /> &nbsp; Total of Admin{" "}
                  </h5>
                  <h4>{users.filter((e) => e.admin === "Yes").length}</h4>
                </Paper>
              </Col>
              <Col className="mt-3" xs={6} sm={6} md={4}>
                <Paper className="p-2" elevation={3}>
                  <h5>
                    <HiUserGroup /> &nbsp; Total of Users
                  </h5>
                  <h4>{users.length}</h4>
                </Paper>
              </Col>
              <Col className="mt-3" xs={6} sm={6} md={4}>
                <Paper className="p-2" elevation={3}>
                  <h5>
                    <MdPets /> &nbsp; Total of Pets
                  </h5>
                  <h4>{pets.length}</h4>
                </Paper>
              </Col>
              <Col className="mt-3" xs={6} sm={6} md={4}>
                <Paper className="p-2" elevation={3}>
                  <h5>
                    <MdEventAvailable />
                    &nbsp; Available Pets
                  </h5>
                  <h4>
                    {
                      pets.filter((e) => e.adoptionStatus === "Available")
                        .length
                    }
                  </h4>
                </Paper>
              </Col>
              <Col className="mt-3" xs={6} sm={6} md={4}>
                <Paper className="p-2" elevation={3}>
                  <h5>
                    <GiDogHouse /> &nbsp; Adopted Pets
                  </h5>
                  <h4>
                    {pets.filter((e) => e.adoptionStatus === "Adopted").length}
                  </h4>
                </Paper>
              </Col>
              <Col className="mt-3" xs={6} sm={6} md={4}>
                <Paper className="p-2" elevation={3}>
                  <h5>
                    <GiDogBowl />
                    &nbsp; Fostered Pets{" "}
                  </h5>
                  <h4>
                    {pets.filter((e) => e.adoptionStatus === "Fostered").length}
                  </h4>
                </Paper>
              </Col>
            </Row>

            <Paper className="p-2 mt-3" elevation={3}>
              <Row>
                <Col xs={6} sm={4} md={2}>
                  <h6>
                    <GiSittingDog /> &nbsp; Dog
                  </h6>
                  <h4>{pets.filter((e) => e.type === "Dog").length}</h4>
                </Col>
                <Col xs={6} sm={4} md={2}>
                  <h6>
                    <FaCat /> &nbsp; Cat
                  </h6>
                  <h4> {pets.filter((e) => e.type === "Cat").length}</h4>
                </Col>
                <Col xs={6} sm={4} md={2}>
                  <h6>
                    <GiSeatedMouse /> &nbsp;Hamster{" "}
                  </h6>
                  <h4>{pets.filter((e) => e.type === "Hamster").length}</h4>
                </Col>
                <Col xs={6} sm={4} md={2}>
                  <h6>
                    <GiTropicalFish /> &nbsp; Fish{" "}
                  </h6>
                  <h4>{pets.filter((e) => e.type === "Fish").length}</h4>
                </Col>
                <Col xs={6} sm={4} md={2}>
                  <h6>
                    <GiTurtle /> &nbsp; Turtle{" "}
                  </h6>
                  <h4>{pets.filter((e) => e.type === "Turtle").length}</h4>
                </Col>
                <Col xs={6} sm={4} md={2}>
                  <h6>
                    <GiFlamingo /> &nbsp; Other
                  </h6>
                  <h4>{pets.filter((e) => e.type === "Other").length}</h4>
                </Col>
              </Row>
            </Paper>
            <Row className="mt-3">
              <Col className="mt-3" lg>
                <h3>Users List</h3>
                <Paper className="p-2" elevation={3}>
                  <UsersList users={users} OnClose={onModalClose} />
                </Paper>
              </Col>
              <Col className="mt-3" lg>
                <h3>Pets List</h3>
                <Paper className="p-2" elevation={3}>
                  <PetsList pets={pets} />
                </Paper>
              </Col>
            </Row>
          </Container>
        </Box>
      </Box>
    );
}

export default DashboardPage;