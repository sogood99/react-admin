import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControlLabel,
  FormGroup,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../config";
import { Box } from "@mui/system";

const CustomContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  height: theme.spacing(75),
}));

export default function Courseinfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({
    id: -1,
    name: "",
    teacher: "",
    department: 0,
    type: 0,
    credit: 0,
    time: "",
    verified: false,
  });
  const [dataJsx, setDataJsx] = useState(<></>);
  const loadingJsx = (
    <div
      className="loading"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Typography variant="h5">Loading Course</Typography>
      <CircularProgress />
    </div>
  );

  useEffect(() => {
    axios
      .post(global.config.backendUrl + "/api/v1.0/admin_get_item", {
        secret_code: localStorage.getItem("secretCode"),
        id: id,
        class: 1,
      })
      .then((res) => {
        setData(res.data.item);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    setDataJsx(
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            label="User Id"
            variant="standard"
            value={data.id}
          />
          <TextField
            required
            label="Course Name"
            variant="standard"
            value={data.name}
            onChange={(e) => {
              setData((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            required
            label="Teacher"
            variant="standard"
            value={data.email}
            onChange={(e) => {
              setData((prev) => ({ ...prev, teacher: e.target.value }));
            }}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={data.verified}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      verified: e.target.checked,
                    }));
                  }}
                />
              }
              label="Verified"
            />
          </FormGroup>
        </div>
        <div>
          <Button
            variant="outlined"
            color="success"
            fullWidth
            onClick={() => {
              axios
                .post(global.config.backendUrl + "/api/v1.0/edit_item", {
                  secret_code: localStorage.getItem("secretCode"),
                  item: data,
                })
                .then((res) => {
                  navigate("/courses");
                });
            }}
          >
            Change
          </Button>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => {
              axios
                .post(global.config.backendUrl + "/api/v1.0/delete_item", {
                  secret_code: localStorage.getItem("secretCode"),
                  id: data.id,
                  class: 1,
                })
                .then((res) => {
                  navigate("/courses");
                });
            }}
          >
            Delete
          </Button>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => {
              navigate("/users");
            }}
          >
            Back
          </Button>
        </div>
      </Box>
    );
  }, [data, navigate]);

  return (
    <CustomContainer
      style={{ display: "flex", justifyContent: "space-evenly" }}
    >
      {loaded ? dataJsx : loadingJsx}
    </CustomContainer>
  );
}
