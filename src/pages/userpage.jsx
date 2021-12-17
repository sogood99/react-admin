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
    { id: 1, username: "first", email: "abc", activated: false },
    {
      id: 2,
      username: "Jon",
      email: "def",
      user_icon: "https://cdn.myanimelist.net/images/characters/12/451497.jpg",
      activated: true,
    },
    {
      id: 3,
      username: "Joe Mamma",
      email: "abd",
      activated: true,
    },
  ];
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "account",
      headerName: "Account",
      headerAlign: "center",
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
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            {user_icon_element}
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "activated",
      headerName: "Account Active",
      headerAlign: "center",
      width: 200,
      renderCell: (params) => {
        if (params.value) {
          return <Check style={{ width: "100%" }} />;
        } else {
          return <Close style={{ width: "100%" }} />;
        }
      },
    },
    {
      field: "action",
      headerName: "Actions",
      headerAlign: "center",
      sortable: false,
      width: 200,
      renderCell: (params) => {
        const jsonDetail = (e) => {
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

        const activateUser = (params) => {
          params.row.activated = true;
          params.api.forceUpdate();
        };

        return (
          <>
            <Button
              onClick={jsonDetail}
              variant="outlined"
              style={{ marginRight: "10px" }}
            >
              JSON
            </Button>
            {params.row.activated ? null : (
              <Button
                variant="outlined"
                onClick={(e) => {
                  e.stopPropagation();
                  activateUser(params);
                }}
              >
                Activate
              </Button>
            )}
          </>
        );
      },
    },
  ];
  return (
    <CustomContainer>
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        Users
      </Typography>
      <DataGrid
        id="datagrid"
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
