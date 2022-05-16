import { Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import MainNavbar from "./components/MainNavbar";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import MyPetsPage from "./components/pages/MyPetsPage/MyPetsPage";
import SavedPetsPage from "./components/pages/MyPetsPage/SavedPetsPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import AuthProvider from "./contextProviders/AuthProvider";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PetsProvider from "./contextProviders/PetsProvider";
import PetPage from "./components/pages/PetPage/PetPage";
import AddPetPage from "./components/pages/AddPetPage/AddPetPage";
import DashboardPage from "./components/pages/DashboardPage/DashboardPage";
import ProtectedToAdminRoute from "./components/ProtectedToAdminRoute";
import EditPetPage from "./components/pages/AddPetPage/EditPetPage";

function App() {
  return (
    <AuthProvider>
      <PetsProvider>
          <MainNavbar />
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/pet/:id" element={<PetPage />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/myPets"
                element={
                  <ProtectedRoute>
                    <MyPetsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/savedPets"
                element={
                  <ProtectedRoute>
                    <SavedPetsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/addPet"
                element={
                  <ProtectedToAdminRoute>
                    <AddPetPage />
                  </ProtectedToAdminRoute>
                }
              />
              <Route
                path="/editPet/:petId"
                element={
                  <ProtectedToAdminRoute>
                    <EditPetPage />
                  </ProtectedToAdminRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedToAdminRoute>
                    <DashboardPage />
                  </ProtectedToAdminRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
      </PetsProvider>
    </AuthProvider>
  );
}

export default App;
