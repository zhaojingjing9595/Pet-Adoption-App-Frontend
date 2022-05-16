import React from "react";
import { Col, Container, Row } from 'react-bootstrap';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import usePets from '../../../hooks/usePets'


function SearchPage() {
 const { searchResults } = usePets();
    return (
      <Container>
        <h2 className="text-center my-3">Search for a pet</h2>
        <Row className="justify-content-center">
          <Col xs="10" lg="6">
            <SearchBar />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs="10" lg="6" className="text-center">
            {searchResults && <SearchResults />}
          </Col>
        </Row>
      </Container>
    );
}

export default SearchPage;