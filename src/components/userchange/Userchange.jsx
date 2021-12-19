import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../config";

export default function UserChange() {
  const [count, setcount] = useState(0);
  const [percent, setpercent] = useState(0);
  useEffect(() => {
    axios
      .post(global.config.backendUrl + "/api/v1.0/get_user_change", {
        secret_code: localStorage.getItem("secretCode"),
      })
      .then((res) => {
        setcount(res.data.change);
        setpercent(res.data.percent);
      });
  }, []);
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          New User Count
        </Typography>
        <span>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Since Last Month
          </Typography>
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
            {count >= 0 ? "+" : null}
            {count} Users
          </Typography>
          <span style={{ display: "flex", alignItems: "bottom" }}>
            {count >= 0 ? (
              <ArrowUpward color="success" />
            ) : (
              <ArrowDownward color="error" />
            )}
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {percent}%
            </Typography>
          </span>
        </span>
      </CardContent>
      <CardActions>
        <Link to="/analytics">
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
