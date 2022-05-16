import React, { useEffect , useState} from "react";
import PetsContext from "../contexts/PetsContext";
import useAuth from "../hooks/useAuth";
import {  searchPets } from "../services/api.js";

function PetsProvider({ children }) {
  const {  activeUser } = useAuth();
  const [ searchResults, setSearchResults ] = useState();

  useEffect(() => { 
    setSearchResults();
  },[activeUser])
  

  function handleClearSearch() {
    setSearchResults();
  }

  function navigateSearch() { 
    setSearchResults();
  }

  async function handleSearch(type, adoptionStatus, name, values) {
    const queries = {
      type,
      adoptionStatus,
      name,
      minHeight: values.minHeight,
      maxHeight: values.maxHeight,
      minWeight: values.minWeight,
      maxWeight:values.maxWeight
    };
    const petsResults = await searchPets(queries);
    setSearchResults(petsResults)
  };

   

  

  return (
    <PetsContext.Provider
      value={{
        searchResults,
        onSearch: handleSearch,
        onClearSearch: handleClearSearch,
        OnNavigateSearch: navigateSearch,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}

export default PetsProvider;
