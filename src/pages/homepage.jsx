import { styled, Container, Grid } from "@mui/material";
import React from "react";
import FeaturedInfo from "../components/featuredInfo/FeaturedInfo";

const CustomContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  height: "100vh",
}));

function Homepage() {
  return (
    <CustomContainer>
      <Grid container spacing={4}>
        <Grid item sm={4}>
          <FeaturedInfo></FeaturedInfo>
        </Grid>
        <Grid item sm={4}>
          <FeaturedInfo></FeaturedInfo>
        </Grid>
        <Grid item sm={4}>
          <FeaturedInfo></FeaturedInfo>
        </Grid>
      </Grid>
    </CustomContainer>
  );
}

export default Homepage;
