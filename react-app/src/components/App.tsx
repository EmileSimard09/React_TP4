import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { SnackbarProvider } from "notistack";
import Banner from "./Banner";
import Footer from "./Footer";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Box paddingTop={8}>
        <Banner />
        <Outlet />
        <Footer />
      </Box>
    </SnackbarProvider>
  );
}

export default App;
