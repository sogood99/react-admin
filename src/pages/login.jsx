import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../config";

export default function Login() {
  const navigate = useNavigate();

  const HandleLogin = () => {
    global.config.isLogin = true;
    navigate("/");
  };

  return (
    <div>
      Login
      <Button onClick={HandleLogin}>Login</Button>
    </div>
  );
}
