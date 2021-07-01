import React from "react";
import { Toaster } from "react-hot-toast";
import Routes from "./Routes";
import { AuthProvider } from "./context/AuthContext";
import {
  ThemeProvider,
  createMuiTheme,
  colors,
  StylesProvider,
} from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.blue[500],
    },
  },
});

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <StylesProvider injectFirst>
              <Routes />
            </StylesProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
