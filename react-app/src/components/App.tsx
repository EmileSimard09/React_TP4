import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { SnackbarProvider } from "notistack";
import Banner from "./Banner";
import Footer from "./Footer";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LeCXuQqAAAAAM5jKpV5aEGhaJWyjzVvZNnBo6YO">
    <SnackbarProvider maxSnack={3}>
      <Box paddingTop={8}>
        <Banner />
        <Outlet />
        <TawkMessengerReact
        propertyId="67c05badf65e72190d16b7ea"
        widgetId="1il3mc7ss"
      />
        <Footer />
      </Box>
    </SnackbarProvider>
    </GoogleReCaptchaProvider>
  );
}

export default App;
