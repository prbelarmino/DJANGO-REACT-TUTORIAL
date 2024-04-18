// Layout.js

import Topbar from "../components/Topbar"; 
import Sidebar from "../components/Sidebar"; 
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import { useState } from "react";
import EquipmentForm from "../components/EquipmentForm"
//const Layout = ({ children }) => {
function Layout({children}){
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  // Conditionally render the top bar based on the route and authentication status
  return (

        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
              {children}
            </main>
        </div>


  );
};

export default Layout;
