import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import usePets from "../../../hooks/usePets";

const columns = [
  { field: "id", headerName: "No.", width: 40 },
  { field: "petId", headerName: "Pet ID", type: "number", width: 60 },
  {
    field: "name",
    headerName: "Name",
    width: 100,
    editable: true,
  },
  {
    field: "adoptionStatus",
    headerName: "Adoption Status",
    width: 100,
    editable: true,
  },
  {
    field: "ownerId",
    headerName: "Owner ID",
    width: 100,
    editable: true,
  },
  {
    field: "breed",
    headerName: "Breed",
    width: 100,
    editable: true,
  },
  {
    field: "height",
    headerName: "Height(cm)",
    width: 100,
    editable: true,
  },
  {
    field: "weight",
    headerName: "Weight(kg)",
    width: 100,
    editable: true,
  },
  {
    field: "color",
    headerName: "Color",
    width: 100,
    editable: true,
  },
  {
    field: "hypoallergenic",
    headerName: "Hypoallergenic",
    width: 100,
    editable: true,
  },
  {
    field: "dietary",
    headerName: "Dietary",
    width: 100,
    editable: true,
  },
  {
    field: "bio",
    headerName: "Bio",
    width: 100,
    editable: true,
  },
];

function PetsList({pets}) {
  const navigate = useNavigate();

  function handleOnClick(rowData) {
    console.log(rowData);
    navigate("/pet/" + rowData.petId);
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={pets}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
        onRowClick={(params) => {
          handleOnClick(params.row);
        }}
      />
    </div>
  );
}

export default PetsList;
