import axios from "axios";
const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://pet-adoption-server-side.herokuapp.com"
      : "http://localhost:8080",
  withCredentials: true,
});

// localStorage-token setting header solution:
// function setAuthHeader(token) { 
//   api.defaults.headers["authorization"] = `Bearer ${token}`
// }

async function login(email, password) {
  // try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  // } catch (error) {
  //   console.log(error);
  // }
}

async function signUp(newUser) {
  // try {
    const response = await api.post("/auth/signup", newUser);
    return response.data;
  // } catch (error) {
  //   console.log(error.response.data);
  // }
}

async function searchPets(queries) {
  try {
    const response = await api.get(
      `/pet?type=${queries.type}&adoptionStatus=${queries.adoptionStatus}&name=${queries.name}&minHeight=${queries.minHeight}&maxHeight=${queries.maxHeight}&minWeight=${queries.minWeight}&maxWeight=${queries.maxWeight}`,
      queries
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getPetBtId(petId) {
  try {
    const response = await api.get(`/pet/${petId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function changeProfile(userId, newProfile) {
  // try {
    const response = await api.put(`/user/${userId}`, newProfile);
    return response.data;
  // } catch (error) {
  //   console.log(error.response.data);
    
  // }
}

async function addOrCancelAdmin(userId, adminProp) {
  // addOrCancel should be {admin:0/1}
  try {
    const response = await api.put(`/user/${userId}/admin`, adminProp);
    return response.data;
  } catch (error) {
     console.log(error);
  }
}

async function getOwnedPetsByUserId(userId) {
  try {
    const response = await api.get(`/pet/user/${userId}`);
    const ownedPets = response.data[0];
    return ownedPets;
  } catch (error) {
    console.log(error);
  }
}

async function getSavedPetsByUserId(userId) {
  try {
    const response = await api.get(`/pet/user/${userId}`);
    const savedPets = response.data[1];
    return savedPets;
  } catch (error) {
    console.log(error);
  }
}

async function returnPet(userId, petId) {
  try {
    const response = await api.post(`/pet/${petId}/return`, { userId });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function adoptOrFosterPet(userId, petId, adoptOrFosterType) {
  try {
    const response = await api.post(`/pet/${petId}/adopt`, {
      userId,
      adoptOrFosterType,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function savePet(userId, petId) {
  try {
    const response = await api.post(`/pet/${petId}/save`, { userId });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function deleteSavedPet(userId, petId) {
  try {
    const response = await api.delete(`/pet/${petId}/save`, {
      data: { userId },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

function createPetFormData(newPet) { 
  const formData = new FormData();
  formData.append("type", newPet.type);
  formData.append("name", newPet.name);
  formData.append("adoptionStatus", newPet.adoptionStatus);
  formData.append("color", newPet.color);
  formData.append("breed", newPet.breed);
  formData.append("height", newPet.height);
  formData.append("weight", newPet.weight);
  formData.append("dietary", newPet.dietary);
  formData.append("hypoallergenic", newPet.hypoallergenic);
  formData.append("bio", newPet.bio);
  if (newPet.picture) {
    formData.append("picture", newPet.picture, newPet.picture.name);
  }
  return formData;
}

async function addPet(newPet) {
  try {
  const formData = createPetFormData(newPet);
  const response = await api.post("/pet", formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function editPet(petId, newPet) {
  try {
    const formData = createPetFormData(newPet);
    console.log(formData);
    const response = await api.put(`/pet/${petId}`, formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getAllUsers() { 
  try {
    const response = await api.get('/user')
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

async function getAllPets() { 
  try {
     const response = await api.get("/pet/all");
     return response.data;
  } catch (error) {
        console.log(error);

  }
}

async function getUserById(userId) { 
try {
  const response = await api.get(`/user/${userId}`);
  return response.data;
} catch (error) {
   console.log(error);
}
}
export {
  // setAuthHeader,
  login,
  signUp,
  searchPets,
  changeProfile,
  getPetBtId,
  getOwnedPetsByUserId,
  getSavedPetsByUserId,
  returnPet,
  adoptOrFosterPet,
  savePet,
  deleteSavedPet,
  addPet,
  editPet,
  getAllUsers,
  addOrCancelAdmin,
  getAllPets,
  getUserById,
};
