import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Imports the index.css file for global styles
import App from "./App"; // Imports the main App component
import reportWebVitals from "./reportWebVitals"; // Imports Web Vitals reporting
import { ChakraProvider, extendTheme } from "@chakra-ui/react"; // Imports Chakra UI components and theming utilities

const theme = extendTheme({ 
  styles: {
    global: {
      body: {
        bg: 'dark', // Change this to your preferred background color
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
