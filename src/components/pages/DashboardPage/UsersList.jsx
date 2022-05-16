import React, { useState} from "react";
import { DataGrid } from '@mui/x-data-grid';
import UserDetailModal from "./UserDetailModal";


const columns = [
  { field: "id", headerName: "No.", width: 40 },
  { field: "userId", headerName: "User ID", type: "number", width: 60 },
  {
    field: "firstName",
    headerName: "First name",
    width: 100,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 100,
},
{
  field: "admin",
  headerName: "Admin",
  width: 60,
},
  {
    field: "email",
    headerName: "Email",
    width: 130,
  },
  {
    field: "phoneNumber",
    headerName: "Phone",
    width: 100,
  },
  // {
  //   field: "create_at",
  //   headerName: "Created at",
  //   width: 100,
  //   // editable: true,
  // },
  {
    field: "bio",
    headerName: "Bio",
    width: 100,
  },
];


function UsersList({ users, OnClose }) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState();

  function handleOnClick(rowData) {
    // console.log(rowData);
    setShow(true);
    setUser(rowData);
  }

  function handleOnClose() {
    OnClose();
    setShow(false);
    setUser();
  }

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
        onRowClick={(params) => {
          handleOnClick(params.row);
        }}
      />
      <UserDetailModal
        show={show}
        onModalClose={handleOnClose}
        userId={user && user.userId}
      />
    </div>
  );
}

export default UsersList;