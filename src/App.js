import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Navbar from "./components/Navbar";
import { CssBaseline, Toolbar } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAppContext } from "./context/AppContext";
import ErrorPage from "./pages/errorPage";
const App = () => {
  const { darkMode } = useAppContext();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Apply theme globally */}
      <Router>
        <Navbar />
        <Toolbar /> {/* Push content below fixed AppBar */}
        <Routes>
          <Route path="/emicalculator" element={<Home />} />
          <Route path="/exchange-rate" element={<About />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
