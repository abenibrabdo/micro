// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Box from "@mui/material/Box";
import Sidebar from "./components/common/Sidebar";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/common/Navbar";
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/store';
import {
  AddProject,
  AllProjects,

  Projects,

  ReportGenerator,

  AssignedProjects,

} from "./pages";
import Footer from "./components/common/Footer";
import { useDispatch, useSelector } from 'react-redux';
import AssignProjects from "./pages/AssignProject";
import Track from "./pages/track";
const sideBarWidth = 280;
function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Provider store={store}>
      <Router>
        <Box sx={{ display: "flex" }}>
             <Navbar />
          <Sidebar
            sideBarWidth={sideBarWidth}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              px: { xs: 1, md: 2 },
              width: { xs: "100%", md: `calc(100% - ${sideBarWidth}px)` },
            }}
          >
            <Routes>
             <Route path="/" element={<Dashboard />} />
             <Route path="/frontend" element={<Dashboard />} />
              <Route path="/create" element={<AddProject />} />
              <Route path="/manage" element={<Projects />} />
              <Route path="/list" element={<AllProjects />} />
              <Route path="/assign" element={<AssignProjects />} />
              <Route path="/assigned" element={<AssignedProjects/>} />
              <Route path="/track" element={<Track/>} />
              <Route path="/report" element={< ReportGenerator/>} />

            </Routes>
            <Footer />
          </Box>
        </Box>
      </Router>
    </Provider>
  );
}
export default App;