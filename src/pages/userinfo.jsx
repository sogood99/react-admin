import React, { useEffect, useState } from "react";
import { Container, styled } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const CustomContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  height: theme.spacing(75),
}));

export default function Userinfo() {
  const { uid } = useParams();
  const [loadjsx, setLoadJsx] = useState(<></>);

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/admin")
      .then((res) => {
        setLoadJsx(<div>Loaded</div>);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CustomContainer>
      {uid}
      {loadjsx}
    </CustomContainer>
  );
}
