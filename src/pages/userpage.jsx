import { AccountBox, Check, Close } from "@mui/icons-material";
import { styled, Container, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

const CustomContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  height: theme.spacing(75),
}));

function Userpage() {
  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35, activated: false },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      age: 42,
      user_icon: "https://cdn.myanimelist.net/images/characters/12/451497.jpg",
      activated: true,
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      age: 45,
      activated: true,
    },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16, activated: true },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      age: null,
      activated: true,
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: null,
      age: 150,
      activated: false,
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      age: 44,
      activated: false,
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      age: 36,
      activated: true,
    },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65, activated: true },
  ];
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 90,
    },
    {
      field: "account",
      headerName: "Account",
      width: 160,
      renderCell: (params) => {
        var user_icon_element, user_icon_url;
        if ((user_icon_url = params.row.user_icon)) {
          user_icon_element = (
            <img
              src={user_icon_url}
              alt="User Icon"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "2px",
                marginRight: "10px",
                objectFit: "fill",
              }}
            />
          );
        } else {
          user_icon_element = (
            <AccountBox
              style={{
                width: "32px",
                height: "32px",
                marginRight: "10px",
              }}
            />
          );
        }
        return (
          <div
            className="account"
            style={{ display: "flex", alignItems: "center" }}
          >
            {user_icon_element}
            {params.row.firstName}
          </div>
        );
      },
    },
    {
      field: "activated",
      headerName: "Account Active",
      width: 150,
      renderCell: (params) => {
        if (params.value) {
          return <Check />;
        } else {
          return <Close />;
        }
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();

          const api = params.api;
          const thisRow = {};

          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );

          return alert(JSON.stringify(thisRow, null, 4));
        };

        return <Button onClick={onClick}>Click</Button>;
      },
    },
  ];
  return (
    <CustomContainer>
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        Users
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </CustomContainer>
  );
}

export default Userpage;
