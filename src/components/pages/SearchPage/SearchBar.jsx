import {
  FilledInput,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import usePets from '../../../hooks/usePets'


function SearchBar() {
  const { onSearch, onClearSearch } = usePets();
  const [ isToggled, setIsTogged ] = useState(false);
  const [ isSearching, setIsSearching ] = useState(false);
  const initialValues = {
    minWeight: "",
    maxWeight: "",
    minHeight: "",
    maxHeight: "",
  };
  const [type, setType] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [name, setName] = useState("");
  const [values, setValues] = useState(initialValues);

  const handleSearch = async() => {
    setIsSearching(true);
    await onSearch(type, adoptionStatus, name, values);
    setIsSearching(false)
   }

  const handleClearSearch = () => {
    onClearSearch();
    setType("");
    setAdoptionStatus('');
    setName('');
    setValues(initialValues);
  };


  return (
    <Form className="s-form my-3 ">
      <Row className="advanced-search-btn mb-3">
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={isToggled}
                onChange={(e) => setIsTogged(e.target.checked)}
                inputProps={{ "aria-label": "controlled" }}
                color="secondary"
              />
            }
            label="Advanced Search"
            labelPlacement="start"
          />
        </FormGroup>
      </Row>
      <Row className="type-search" style={{ margin: "0px 0px 16px 0px " }}>
        <FormControl variant="filled">
          <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={""}>Choose...</MenuItem>
            <MenuItem value={"Dog"}>Dog</MenuItem>
            <MenuItem value={"Cat"}>Cat</MenuItem>
            <MenuItem value={"Fish"}>Fish</MenuItem>
            <MenuItem value={"Turtle"}>Turtle</MenuItem>
            <MenuItem value={"Hamster"}>Hamster</MenuItem>
            <MenuItem value={"Other"}>Other</MenuItem>
          </Select>
        </FormControl>
      </Row>
      {isToggled ? (
        <>
          <Row
            className="adoption-status-search"
            style={{ margin: "0px 0px 16px 0px " }}
          >
            <FormControl variant="filled">
              <InputLabel id="simple-select-filled-label">
                Adoption Status
              </InputLabel>
              <Select
                labelId="simple-select-filled-label"
                id="simple-select-filled"
                value={adoptionStatus}
                onChange={(e) => setAdoptionStatus(e.target.value)}
              >
                <MenuItem value={""}>Choose...</MenuItem>
                <MenuItem value={"Available"}>Available</MenuItem>
                <MenuItem value={"Adopted"}>Adopted</MenuItem>
                <MenuItem value={"Fostered"}>Fostered</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          </Row>
          <Row className="name-search" style={{ margin: "0px 0px 16px 0px " }}>
            <TextField
              id="filled-basic"
              label="Name"
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Row>
          <Row className="weight-search mb-3">
            <Col className="text-center">
              <FormControl variant="filled">
                <FilledInput
                  type="number"
                  id="filled-adornment-weight"
                  value={values.minWeight}
                  onChange={(e) =>
                    setValues({ ...values, minWeight: e.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">kg</InputAdornment>
                  }
                  aria-describedby="filled-weight-helper-text"
                  inputProps={{
                    "aria-label": "minWeight",
                  }}
                />
                <FormHelperText id="filled-weight-helper-text">
                  Min Weight
                </FormHelperText>
              </FormControl>
            </Col>
            <Col className="text-center">
              <FormControl variant="filled">
                <FilledInput
                  fullWidth
                  type="number"
                  id="filled-adornment-weight"
                  value={values.maxWeight}
                  onChange={(e) =>
                    setValues({ ...values, maxWeight: e.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">kg</InputAdornment>
                  }
                  aria-describedby="filled-weight-helper-text"
                  inputProps={{
                    "aria-label": "maxWeight",
                  }}
                />
                <FormHelperText id="filled-weight-helper-text">
                  Max Weight
                </FormHelperText>
              </FormControl>
            </Col>
          </Row>
          <Row className="height-search mb-3">
            <Col className="text-center">
              <FormControl variant="filled">
                <FilledInput
                  type="number"
                  id="filled-adornment-height"
                  value={values.minHeight}
                  onChange={(e) =>
                    setValues({ ...values, minHeight: e.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">cm</InputAdornment>
                  }
                  aria-describedby="filled-height-helper-text"
                  inputProps={{
                    "aria-label": "minHeight",
                  }}
                />
                <FormHelperText id="filled-height-helper-text">
                  Min Height
                </FormHelperText>
              </FormControl>
            </Col>
            <Col className="text-center">
              <FormControl variant="filled">
                <FilledInput
                  fullWidth
                  type="number"
                  id="filled-adornment-height"
                  value={values.maxHeight}
                  onChange={(e) =>
                    setValues({ ...values, maxHeight: e.target.value })
                  }
                  endAdornment={
                    <InputAdornment position="end">cm</InputAdornment>
                  }
                  aria-describedby="filled-height-helper-text"
                  inputProps={{
                    "aria-label": "maxHeight",
                  }}
                />
                <FormHelperText id="filled-height-helper-text">
                  Max Height
                </FormHelperText>
              </FormControl>
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}

      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="outline"
          style={{
            marginRight: "auto",
            color: "#563d7c",
            borderColor: "#563d7c",
          }}
          type="button"
          onClick={handleClearSearch}
        >
          Clear Search
        </Button>
        <Button
          disabled={isSearching ? true : false}
          className="p-form-btn"
          style={{
            marginLeft: "auto",
            backgroundColor: "#563d7c",
            borderColor: "#563d7c",
          }}
          type="button"
          onClick={handleSearch}
        >
          Search
        </Button>
        {isSearching && (
          <Spinner className="mx-1" animation="border" size="sm" />
        )}
      </div>
    </Form>
  );
}

export default SearchBar;
