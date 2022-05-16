import React from 'react';
import PetCard from '../../PetCard';
import usePets from '../../../hooks/usePets';


function SearchResults() {
  const { searchResults } = usePets();
    return (
      <>
        {
          searchResults.length > 0 &&
          searchResults.map((result, index) => (
            <PetCard pet={result} key={index} />
          ))}
        {searchResults.length === 0 && <h3>No such results</h3>}
      </>
    );
}

export default SearchResults;