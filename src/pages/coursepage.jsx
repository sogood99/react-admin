import { Check, Close } from "@mui/icons-material";
import { styled, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CustomContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  height: theme.spacing(75),
}));

function Coursepage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .post(global.config.backendUrl + "/api/admin/get_course_list", {
        secretCode: localStorage.getItem("secretCode"),
      })
      .then((res) => {
        setData(res.data.courseList);
      });
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
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
      width: 300,
    },
  ];
  return (
    <CustomContainer>
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        Courses
      </Typography>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </CustomContainer>
  );
}

export default Coursepage;
