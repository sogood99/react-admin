import { Grid } from "@mui/material";
import Leftbar from "./components/leftbar/Leftbar";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./pages/homepage";

function App() {
  return (
    <div>
      <Navbar />
      <Grid container>
        <Grid item sm={2}>
          <Leftbar></Leftbar>
        </Grid>
        <Grid item sm={10}>
          <Homepage></Homepage>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
