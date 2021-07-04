import React from "react";
import { Toaster } from "react-hot-toast";
import Routes from "./Routes";
import { AuthProvider } from "./context/AuthContext";
import {
  ThemeProvider,
  createMuiTheme,
  StylesProvider,
  colors,
} from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import {WordPreferenceProvider} from './context/WordsPreferenceContext';

const { blue } = colors;

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      main: "#c2185b",
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
              <WordPreferenceProvider>
                <Routes />
              </WordPreferenceProvider>
            </StylesProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
