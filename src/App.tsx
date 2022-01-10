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
import { WordPreferenceProvider } from "./context/WordsPreferenceContext";
import { WordPractiseProvider } from "./context/WordPractiseContext";

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
              <WordPractiseProvider>
                <WordPreferenceProvider>
                  <Routes />
                </WordPreferenceProvider>
              </WordPractiseProvider>
            </StylesProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
