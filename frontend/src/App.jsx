import { Box, useColorModeValue } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Box minH={"100vh"} bg={useColorModeValue('gray.100','gray.900')}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/create" exact element={<CreatePage />} />
          </Routes>
        </Router>
      </Box>
    </>
  );
}

export default App;
